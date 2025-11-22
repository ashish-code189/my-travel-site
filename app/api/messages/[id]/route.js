// app/api/messages/[id]/route.js
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
export const dynamic = "force-dynamic";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params; // unwrap params
    const client = await clientPromise;
    const db = client.db("tripwaale");

    const result = await db.collection("contacts").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return Response.json({ success: false, error: "Message not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Message deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
