import { connectToDB } from "@/app/lib/mongodb";
import Booking from "@/app/lib/bookingModel";

export default async function BookingDetails({ params }) {
  const { id } = await params; // Fix

  await connectToDB();

  const booking = await Booking.findById(id);

  if (!booking) {
    return <h1 style={{ padding: "30px" }}>Booking Not Found</h1>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>📄 Booking Details</h1>

        <p><strong>Name:</strong> {booking.name}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Phone:</strong> {booking.phone}</p>
        <p><strong>Destination:</strong> {booking.destination}</p>
        <p><strong>Price:</strong> {booking.price}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Travelers:</strong> {booking.travelers}</p>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "40px", display: "flex", justifyContent: "center" },
  box: {
    padding: "30px",
    width: "400px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    lineHeight: "1.8",
  },
  title: { fontSize: "28px", marginBottom: "20px" },
};
