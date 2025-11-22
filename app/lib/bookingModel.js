import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  travelers: Number,
  date: String,
  destination: String,
  price: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
