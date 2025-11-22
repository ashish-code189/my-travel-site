"use client";
import { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Message sent successfully!");
        // Redirect to thank you page
        window.location.href = `/thankyou/${data.id}`;
      } else {
        setStatus("❌ Something went wrong. Try again!");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("⚠️ Server error!");
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.contactTitle}>Contact Us</h2>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className={styles.textareaField}
          required
        />
        <button type="submit" className={styles.submitButton}>
          Send Message
        </button>
      </form>
      {status && <p className={styles.statusMessage}>{status}</p>}
    </div>
  );
}
