"use client";
import { useState } from "react";
import styles from "./Hero.module.css";
import BookingModal from "./BookingModal/BookingModal";

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.hero}>
      <video
        className={styles.videoBackground}
        autoPlay
        loop
        muted
        playsInline
        poster="/images/beach-fallback.jpg" 
      >
        <source src="/videos/beach.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay}>
        <h1 className={styles.title}>
          Welcome to <span>TripWaale.com</span>
        </h1>

        <p className={styles.subtitle}>
          Discover breathtaking destinations and unforgettable experiences.
        </p>

        <button className={styles.ctaButton} onClick={() => setOpen(true)}>
          Start Your Journey
        </button>
      </div>

      {open && <BookingModal onClose={() => setOpen(false)} />}
    </section>
  );
}
