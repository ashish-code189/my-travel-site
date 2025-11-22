import mongoose from "mongoose";

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "tripwaale",
    });
    return new Response("✅ MongoDB connected successfully!", { status: 200 });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    return new Response("❌ Connection failed", { status: 500 });
  }
}
