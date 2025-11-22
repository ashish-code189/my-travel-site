import clientPromise from "@/app/lib/mongodb";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    // simple validation
    if (!body.name || !body.email || !body.message) {
      return new Response(JSON.stringify({ success: false, error: "Missing fields" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("tripwaale");
    const result = await db.collection("contacts").insertOne({
      name: body.name,
      email: body.email,
      message: body.message,
      createdAt: new Date()
    });

    return new Response(JSON.stringify({ success: true, id: result.insertedId }), { status: 201 });
  } catch (err) {
    console.error("Contact POST error:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
