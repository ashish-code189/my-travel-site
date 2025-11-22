import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });

  // ❌ Remove cookie
  response.cookies.set("admin_auth", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // Expire immediately
  });

  return response;
}
