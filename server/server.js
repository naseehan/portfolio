import express from "express";
import cors from "cors";
import { Resend } from "resend";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;

app.set("trust proxy", 1); // Render/Vercel sit behind a proxy; needed for per-IP rate limiting
app.use(cors());
app.use(express.json({ limit: "20kb" }));

// Validate first, so a rejected submission does not use up the visitor's rate-limit allowance.
const validateContact = (req, res, next) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const message = String(req.body?.message || "").trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill in your name, email and message." });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  if (name.length > MAX_NAME_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: "Your message is too long." });
  }

  req.contact = { name, email, message };
  next();
};

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 2, // 2 successful-looking requests per IP per minute
  handler: (req, res) => {
    console.log("Rate limit reached for IP:", req.ip);
    res.status(429).json({
      error: "Too many requests from this IP, please try again later.",
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.post("/contact", validateContact, limiter, async (req, res) => {
  const { name, email, message } = req.contact;

  try {
    const { error } = await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>",
      to: process.env.EMAIL_RECEIVER,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    res.json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
