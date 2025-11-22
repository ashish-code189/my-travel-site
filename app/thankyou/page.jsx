"use client";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./Thankyou.module.css";

export default function ThankyouPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name") || "Traveler";

  return (
    <div className={styles.wrapper}>
      <h1>🎉 Thank You, {name}!</h1>
      <p>Your booking has been confirmed successfully.</p>
      <button onClick={() => router.push("/destinations")}>
        Back to Destinations
      </button>
    </div>
  );
}
