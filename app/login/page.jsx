"use client";
import { useState } from "react";
import styles from "./Login.module.css";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Set cookie for authentication
        document.cookie = "admin_auth=true; path=/; max-age=900"; // 15 min expiry
        window.location.replace("/admin"); // redirect to dashboard
      } else {
        setError("❌ Incorrect password. Try again!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginBox}>
        <h2 className={styles.heading}>Admin Login</h2>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Checking..." : "Login"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
