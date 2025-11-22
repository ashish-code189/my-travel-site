"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarInner}>
        {/* Brand / Logo */}
        <Link href="/" className={styles.brand}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" fill="url(#g)"></circle>
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="#22C1C3" />
                <stop offset="1" stopColor="#0D6EFD" />
              </linearGradient>
            </defs>
            <path
              d="M6 15c2-2 4-3 6-3s4 1 6 3"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>TripWaale.com</span>
        </Link>

        {/* Desktop links */}
        <nav className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login" className={styles.btnPrimary}>Sign in</Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={styles.menuToggle}
          aria-controls="mobile-menu"
          aria-expanded={open ? "true" : "false"}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M6 6 L18 18 M6 18 L18 6" stroke="var(--pc-text)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="var(--pc-text)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu (only visible when open) */}
      {open && (
        <nav id="mobile-menu" className={styles.mobileMenu}>
          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login" className={styles.btnPrimary}>Sign in</Link>
        </nav>
      )}
    </header>
  );
}
