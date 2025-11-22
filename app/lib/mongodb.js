// app/lib/mongodb.js
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("❌ Please add MONGODB_URI to .env.local");
}

/* ---------------------------
  (1) connectToDB() — for mongoose models
----------------------------*/
let mongooseConnected = false;

export async function connectToDB() {
  if (mongooseConnected) return;
  try {
    await mongoose.connect(uri, { dbName: "tripwaale" });
    mongooseConnected = true;
    console.log("✅ Mongoose connected");
  } catch (err) {
    console.error("❌ Mongoose connection error:", err);
    throw err;
  }
}

/* ---------------------------
  (2) clientPromise — native MongoClient support (optional)
----------------------------*/
let client;
let clientPromise;
const options = {};

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
