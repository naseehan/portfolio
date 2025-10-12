import express from "express";
import cors from "cors";
import { Resend } from "resend";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());




const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 1, // Limit each IP to 1 requests per windowMs
    handler: (req, res) => {
      console.log("Rate limit reached for IP:", req.ip);
    res.status(429).json({
      
      error: "Too many requests from this IP, please try again later."
    });
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // Disable `X-RateLimit-*` headers
});

app.post("/contact", limiter , async (req, res) => {
  const { name, email, phone, what, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>",
      to: process.env.EMAIL_RECEIVER,
      subject: `New message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Regarding: ${what}
        Message: ${message}
      `,
    });

    res.json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
