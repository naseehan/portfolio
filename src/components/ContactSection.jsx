"use client";

import React, { useState } from "react";
import { personalInfo, socialLinks } from "../data/portfolioData";

const CONTACT_ENDPOINT = "https://portfolio-phdb.onrender.com/contact";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context); the mailto link still works
    }
  };

  const validate = ({ name, email, message }) => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      return "Please fill in your name, email and message.";
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate(formData);
    if (validationError) {
      setStatus({ type: "error", message: validationError });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    // The API is on a free hosting tier that sleeps when idle; tell the visitor if waking it is slow.
    const slowTimer = setTimeout(() => {
      setStatus({ type: "info", message: "Waking up the mail server — this can take up to a minute on the first message." });
    }, 4000);
    const controller = new AbortController();
    const abortTimer = setTimeout(() => controller.abort(), 75000);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        }),
        signal: controller.signal
      });

      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please wait a moment before sending another message.");
      }
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message. Please try reaching out directly via email.");
      }

      setStatus({
        type: "success",
        message: "Message received! Thank you for reaching out, Naseeh will get back to you shortly."
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.name === "AbortError"
            ? `The server took too long to respond. Please email directly at ${personalInfo.email}.`
            : err.message || `Something went wrong. Please email directly at ${personalInfo.email}.`
      });
    } finally {
      clearTimeout(slowTimer);
      clearTimeout(abortTimer);
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding contact-section" aria-label="Contact Naseeh AN">
      <div className="content-width">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-glyph" aria-hidden="true">✉</span>
            <span>05 // CO-OP & CONTACT</span>
          </div>
          <h2 className="section-title">
            Let&apos;s build something <span className="title-accent">together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind, an open developer role, or a question? Send a note or reach out directly.
          </p>
        </div>

        <div className="contact-grid">
          {/* Form Column */}
          <div className="contact-form-card">
            <div className="form-card-header">
              <span className="form-header-title">SEND_TRANSMISSION.FORM</span>
              <span className="form-header-status">
                <span className="status-indicator-dot" /> ONLINE
              </span>
            </div>

            {status.message && (
              <div
                className={`contact-alert alert-${status.type}`}
                role={status.type === "error" ? "alert" : "status"}
              >
                <span className="alert-icon" aria-hidden="true">
                  {status.type === "success" ? "✓" : status.type === "info" ? "…" : "⚠"}
                </span>
                <span className="alert-text">{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-field">
                <label htmlFor="contact-name" className="field-label">
                  Your Name <span className="required-star">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="e.g. Alex Morgan"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="field-input"
                  disabled={loading}
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email" className="field-label">
                  Your Email Address <span className="required-star">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="e.g. alex@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="field-input"
                  disabled={loading}
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-message" className="field-label">
                  Your Message <span className="required-star">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project, timeline, or inquiry..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="field-textarea"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-submit"
                disabled={loading}
              >
                <span>{loading ? "Sending Transmission..." : "Send Message"}</span>
                <span className="btn-arrow" aria-hidden="true">
                  {loading ? "…" : "→"}
                </span>
              </button>
            </form>
          </div>

          {/* Quick Connect & Details Card */}
          <aside className="contact-details-card">
            <div className="connect-retro-box">
              <div className="box-header">
                <span className="tag-pixel-glyph" aria-hidden="true">▪</span>
                <span className="box-title">DIRECT CHANNELS</span>
              </div>

              <p className="connect-intro">
                Prefer direct communication? Drop an email, give me a call, or connect across social channels.
              </p>

              <div className="connect-methods">
                <div className="connect-method-item">
                  <span className="method-label">Email:</span>
                  <div className="email-copy-wrap">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="method-link"
                    >
                      {personalInfo.email}
                    </a>
                    <button
                      type="button"
                      className="copy-btn"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      title="Copy to clipboard"
                    >
                      {copiedEmail ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="connect-method-item">
                  <span className="method-label">Phone (UAE):</span>
                  <a
                    href={`tel:${personalInfo.phoneUAE}`}
                    className="method-link"
                  >
                    {personalInfo.phoneUAE}
                  </a>
                </div>

                <div className="connect-method-item">
                  <span className="method-label">Phone (India):</span>
                  <a
                    href={`tel:${personalInfo.phoneIndia}`}
                    className="method-link"
                  >
                    {personalInfo.phoneIndia}
                  </a>
                </div>

                <div className="connect-method-item">
                  <span className="method-label">Location:</span>
                  <span className="method-text">{personalInfo.location}</span>
                </div>

                <div className="connect-method-item">
                  <span className="method-label">Status:</span>
                  <span className="method-status-val">
                    <span className="status-live-dot" /> {personalInfo.status}
                  </span>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="connect-socials-block">
                <span className="socials-label">FIND ME ONLINE</span>
                <div className="socials-grid">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn"
                      aria-label={s.name}
                    >
                      <i className={s.icon} aria-hidden="true" />
                      <span>{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
