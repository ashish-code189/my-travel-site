import { connectToDB } from "@/app/lib/mongodb";
import Booking from "@/app/lib/bookingModel";

export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.json();
    const newBooking = new Booking(data);
    await newBooking.save();

    return Response.json({ success: true, booking: newBooking });
  } catch (err) {
    console.error("Booking error:", err);
    return Response.json({ success: false, error: err.message });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return Response.json(bookings);
  } catch (err) {
    return Response.json({ error: "Failed to fetch bookings" });
  }
}
