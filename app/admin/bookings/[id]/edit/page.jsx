"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditBooking({ params }) {
  const router = useRouter();
  
  const [bookingId, setBookingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: "",
    travelers: "",
    price: "",
  });

  // ✅ unwrap params (Next.js 15)
  useEffect(() => {
    if (!params) return;

    params.then((p) => {
      setBookingId(p.id);
    });
  }, [params]);

  // Fetch booking
  useEffect(() => {
    if (!bookingId) return;

    fetch(`/api/bookings/${bookingId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setForm(data);
      });
  }, [bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/bookings/${bookingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Booking Updated!");
    router.push("/admin/bookings");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Edit Booking</h1>

        {!bookingId ? (
          <p>Loading booking...</p>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            {Object.keys(form).map((key) => (
              <input
                key={key}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                style={styles.input}
              />
            ))}

            <button type="submit" style={styles.button}>Update</button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    background: "#f7f7f7",
    minHeight: "100vh",
  },
  card: {
    width: "420px",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "10px",
    border: "1px solid #e5e5e5",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "600",
    color: "#444",
  },
  form: {
    display: "grid",
    gap: "14px",
  },
  input: {
    padding: "12px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#fafafa",
  },
  button: {
    padding: "12px",
    borderRadius: "6px",
    background: "#333",
    color: "#fff",
    fontSize: "15px",
    border: "none",
    cursor: "pointer",
  },
};
