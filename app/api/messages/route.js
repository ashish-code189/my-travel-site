import clientPromise from "@/app/lib/mongodb";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("tripwaale");

    const messages = await db
      .collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(messages);
  } catch (err) {
    console.error("GET /api/messages error:", err);
    return Response.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
