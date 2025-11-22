"use client";
import styles from "./BookingModal.module.css";

export default function BookingModal({ close }) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Start Your Journey ✈️</h2>

        <form className={styles.form}>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Destination" />
          <input type="date" />
          <button type="submit" className={styles.submitBtn}>
            Submit Booking
          </button>
        </form>

        <button className={styles.closeBtn} onClick={close}>
          ✖
        </button>
      </div>
    </div>
  );
}
