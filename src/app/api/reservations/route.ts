import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// Handle POST → Create reservation
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const reservation = await prisma.reservation.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        partySize: body.partySize,
        reservationTime: new Date(body.reservationTime),
        area: body.area,
        notes: body.notes || "",
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("Reservation Error:", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}

// Handle GET → Fetch reservation by ID
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Reservation ID required" },
        { status: 400 }
      );
    }

    const reservation = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ reservation }, { status: 200 });
  } catch (error) {
    console.error("GET Reservation Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservation" },
      { status: 500 }
    );
  }
}