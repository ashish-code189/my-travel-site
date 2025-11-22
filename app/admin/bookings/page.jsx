"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  // Fetch all bookings
  useEffect(() => {
    async function fetchBookings() {
      const res = await fetch("/api/bookings", { cache: "no-store" });
      const data = await res.json();
      setBookings(data);
    }
    fetchBookings();
  }, []);

  // DELETE handler
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    await fetch(`/api/bookings/${id}`, {
      method: "DELETE",
    });

    // Refresh UI
    setBookings(bookings.filter((b) => b._id !== id));
    alert("Booking Deleted!");
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>All Bookings</h1>

      <div style={styles.grid}>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((b) => (
            <div key={b._id} style={styles.card}>
              <h2 style={styles.name}>{b.name}</h2>
              <p><strong>Destination:</strong> {b.destination}</p>
              <p><strong>Date:</strong> {b.date}</p>

              <div style={styles.btnRow}>
                <Link href={`/admin/bookings/${b._id}`} style={styles.viewBtn}>
                  View
                </Link>

                <Link href={`/admin/bookings/${b._id}/edit`} style={styles.editBtn}>
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(b._id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ---------------------------------------
// CLEAN, MODERN, NEUTRAL CSS (NO BAD COLORS)
// ---------------------------------------
const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    background: "#f5f5f5",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "600",
    marginBottom: "25px",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e5e5e5",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
  },
  name: {
    margin: "0 0 10px",
    fontSize: "20px",
    fontWeight: "600",
  },
  btnRow: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },
  viewBtn: {
    padding: "8px 12px",
    background: "#333",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
  },
  editBtn: {
    padding: "8px 12px",
    background: "#555",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
  },
  deleteBtn: {
    padding: "8px 12px",
    background: "#b00020",
    color: "#fff",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
};
