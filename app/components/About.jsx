"use client";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.imageContainer}>
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Coastal view"
          className={styles.image}
        />
      </div>

      <div className={styles.textContainer}>
        <h2>About TripWaale.com</h2>
        <p>
          Welcome to <strong>TripWaale.com</strong> — your gateway to unforgettable coastal adventures!
          We specialize in helping travelers explore India’s most breathtaking seaside
          destinations. From golden beaches of Goa to tranquil backwaters of Kerala,
          we bring the beauty of the coast right to your fingertips.
        </p>
        <p>
          Our mission is simple: <em>make every journey joyful and effortless.</em>
          Whether you’re looking for peaceful getaways or thrilling water sports,
          TripWaale.com ensures your travel dreams come true!
        </p>
        <button className={styles.btn}>Learn More</button>
      </div>
    </section>
  );
}
