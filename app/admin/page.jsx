"use client";
import { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuth = document.cookie.includes("admin_auth=true");
    if (!isAuth) {
      window.location.replace("/login");
      return;
    }

    let logoutTimer;

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        alert("Session expired! Logging out due to inactivity ⏰");
        handleLogout();
      }, 15 * 60 * 1000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      if (Array.isArray(data)) {
        setMessages(data);
        setFilteredMessages(data);
        setError("");
      } else {
        setError("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        alert("Message deleted successfully ✅");
        const updated = messages.filter((m) => m._id !== id);
        setMessages(updated);
        setFilteredMessages(updated);
      } else {
        alert("Failed to delete ❌");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting message!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    document.cookie =
      "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.replace("/login");
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = messages.filter(
      (msg) =>
        msg.name.toLowerCase().includes(query) ||
        msg.email.toLowerCase().includes(query) ||
        msg.message.toLowerCase().includes(query)
    );

    setFilteredMessages(filtered);
  };

  const totalMessages = messages.length;
  const latestMessage =
    totalMessages > 0
      ? new Date(
        Math.max(...messages.map((m) => new Date(m.createdAt)))
      ).toLocaleString()
      : "No messages yet";

  return (
    <div className={styles.adminContainer}>
      <div className={styles.headerBar}>
        <h1 className={styles.heading}>📩 Admin Dashboard</h1>

        <div className={styles.headerActions}>
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />

          <button onClick={fetchMessages} className={styles.refreshButton}>
            🔄 Refresh
          </button>

          {/* ✅ NEW BUTTON: View All Bookings */}
          <button
            onClick={() => router.push("/admin/bookings")}
            className={styles.bookingsButton}
          >
            📘 View All Bookings
          </button>


          <button onClick={handleLogout} className={styles.logoutButton}>
            🚪 Logout
          </button>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <h3>Total Messages</h3>
          <p>{totalMessages}</p>
        </div>

        <div className={styles.statBox}>
          <h3>Latest Message</h3>
          <p>{latestMessage}</p>
        </div>

        <div className={styles.statBox}>
          <h3>Status</h3>
          <p>{loading ? "⏳ Updating..." : "✅ Active"}</p>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {!error && filteredMessages.length === 0 && (
        <p className={styles.loading}>No messages found.</p>
      )}

      {!error && filteredMessages.length > 0 && (
        <div className={styles.messageList}>
          {filteredMessages.map((msg) => (
            <div key={msg._id} className={styles.messageCard}>
              <h3>
                <strong>Name:</strong> {msg.name}
              </h3>
              <p>
                <strong>Email:</strong> {msg.email}
              </p>
              <p>
                <strong>Message:</strong> {msg.message}
              </p>
              <p className={styles.time}>
                🕒 {new Date(msg.createdAt).toLocaleString()}
              </p>

              <button
                onClick={() => handleDelete(msg._id)}
                disabled={loading}
                className={styles.deleteButton}
              >
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
