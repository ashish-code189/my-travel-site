"use client";
export const dynamic = "force-dynamic";
import styles from "./Booking.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 1,
    date: "",
  });

  const destination = searchParams.get("destination") || "Unknown";
  const price = searchParams.get("price") || "N/A";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, destination, price }),
    });

    const data = await res.json();
    if (data.success) {
      alert("✅ Booking Confirmed!");
      router.push(`/thankyou?name=${form.name}`);
    } else {
      alert("❌ Booking failed, please try again.");
    }
  };

  return (
    <div className={styles.container} style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center" }}>
      <h1>🧳 Book Your Trip</h1>
      <p><strong>Destination:</strong> {destination}</p>
      <p><strong>Price:</strong> {price}</p>

<form onSubmit={handleSubmit} className={styles.form}>
  <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
  <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
  <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
  <input type="number" name="travelers" placeholder="No. of Travelers" min="1" required onChange={handleChange} />
  <input type="date" name="date" required onChange={handleChange} />
  <button type="submit">Confirm Booking</button>
</form>
    </div>
  );
}
