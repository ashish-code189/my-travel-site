"use client";

import { FaMountain, FaUmbrellaBeach, FaCity, FaUsers, FaPlane, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "3rem 1.5rem",
        background: "linear-gradient(135deg, #0a0a0a, #1c1c1c, #111827)",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          textAlign: "center",
          marginBottom: "2.3rem",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            background: "linear-gradient(90deg, #4facfe, #38f9d7)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          About TripWaale
        </h1>
        <p
          style={{
            maxWidth: "750px",
            margin: "0 auto",
            fontSize: "1.15rem",
            color: "#d1d5db",
          }}
        >
          TripWaale helps people explore the world with curated travel packages,
          luxurious stays, adventure destinations & premium experiences.  
          Your journey begins here.
        </p>
      </motion.div>

      {/* FEATURE ICONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2.2rem",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        {featureCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.08 }}
            style={cardStyle}
          >
            <card.icon size={45} style={{ marginBottom: "0.7rem" }} />
            <h3 style={cardTitle}>{card.title}</h3>
            <p style={cardText}>{card.subtitle}</p>
          </motion.div>
        ))}
      </div>

      {/* BOTTOM SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          marginTop: "4rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "600",
            marginBottom: "1rem",
            color: "#4facfe",
          }}
        >
          Why Choose TripWaale?
        </h2>

        <p
          style={{
            maxWidth: "750px",
            margin: "0 auto",
            fontSize: "1.1rem",
            color: "#d1d5db",
            lineHeight: "1.7",
          }}
        >
          ✈️ Handpicked destinations • 🌍 Beautiful stays • ⭐ 24/7 support  
          We ensure every trip gives you memories that last forever.
        </p>
      </motion.div>
    </div>
  );
}

/* ----- REUSABLE CARD CONTENT ----- */
const featureCards = [
  {
    title: "Mountains",
    subtitle: "Trekking, Hiking, Scenic peaks.",
    icon: FaMountain,
  },
  {
    title: "Beaches",
    subtitle: "Luxury seaside & sunsets.",
    icon: FaUmbrellaBeach,
  },
  {
    title: "Cities",
    subtitle: "Modern, vibrant destinations.",
    icon: FaCity,
  },
  {
    title: "Community",
    subtitle: "Trusted by thousands.",
    icon: FaUsers,
  },
  {
    title: "Premium Trips",
    subtitle: "Top-rated packages.",
    icon: FaStar,
  },
];

/* -------- INLINE STYLES -------- */
const cardStyle = {
  width: "200px",
  padding: "1.7rem 1.4rem",
  borderRadius: "22px",
  textAlign: "center",
  background: "rgba(255, 255, 255, 0.06)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow: "0 0 25px rgba(0, 180, 255, 0.25)",
  cursor: "pointer",
  transition: "0.3s",
};

const cardTitle = {
  fontSize: "1.25rem",
  fontWeight: "600",
  marginBottom: "0.3rem",
};

const cardText = {
  fontSize: "0.95rem",
  color: "#d1d5db",
};
