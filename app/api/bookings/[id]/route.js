import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import Booking from "@/app/lib/bookingModel";
export const dynamic = "force-dynamic";

// GET SINGLE BOOKING
export async function GET(req, context) {
  try {
    await connectToDB();

    // ⭐ FIX: Unwrap params promise
    const params = await context.params;
    const id = params.id;

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// UPDATE BOOKING
export async function PUT(req, context) {
  try {
    await connectToDB();

    const params = await context.params;
    const id = params.id;

    const body = await req.json();

    const updated = await Booking.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// DELETE BOOKING
export async function DELETE(req, context) {
  try {
    await connectToDB();

    const params = await context.params;
    const id = params.id;

    const deleted = await Booking.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, deleted: true });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
