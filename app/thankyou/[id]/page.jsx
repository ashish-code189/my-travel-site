import { connectToDB } from "@/app/lib/mongodb";
import Contact from "@/app/lib/contactModel";
import styles from "./ThankYouPage.module.css";
import Link from "next/link";

export default async function ThankYouPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  await connectToDB();
  const message = await Contact.findById(id);

  if (!message) {
    return (
      <div className={styles.thankyouContainer}>
        <h1 className={styles.title}>Message not found ❌</h1>
        <Link href="/" className={styles.homeButton}>
          ⬅️ Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.thankyouContainer}>
      <div className={styles.thankyouCard}>
        <h1 className={styles.title}>✅ Thank You, {message.name}!</h1>
        <p className={styles.message}>
          We’ve received your message:
          <br />
          <span className={styles.highlight}>"{message.message}"</span>
        </p>
        <Link href="/" className={styles.homeButton}>
          ⬅️ Back to Home
        </Link>
      </div>
    </div>
  );
}
