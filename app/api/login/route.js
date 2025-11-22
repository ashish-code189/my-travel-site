export const dynamic = "force-dynamic";


export async function POST(req) {
    const { password } = await req.json();
    console.log("ADMIN_PASSWORD from env:", process.env.ADMIN_PASSWORD);

  // Change this password later for production
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (password === ADMIN_PASSWORD) {
    return Response.json({ success: true });
  } else {
    return Response.json({ success: false });
  }
}
