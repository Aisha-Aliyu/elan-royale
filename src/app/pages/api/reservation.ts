// pages/api/reservation.ts
import type { NextApiRequest, NextApiResponse } from "next";

// Define ReservationStatus enum manually to match your Prisma schema
enum ReservationStatus {
  pending = "pending",
  confirmed = "confirmed",
  cancelled = "cancelled"
}
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, partySize, reservationTime, area, notes, status } = req.body;

    // Validate required fields
    if (!name || !email || !partySize || !reservationTime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate reservationTime is a valid date
    const parsedTime = new Date(reservationTime);
    if (isNaN(parsedTime.getTime())) {
      return res.status(400).json({ error: "Invalid reservation time" });
    }

    // Ensure party size is a valid positive number
    const parsedPartySize = Number(partySize);
    if (isNaN(parsedPartySize) || parsedPartySize <= 0) {
      return res.status(400).json({ error: "Invalid party size" });
    }

    // Validate status (optional: defaults to 'pending')
    // Use the enum values from Prisma's generated client via the Prisma namespace
    const validStatuses = Object.values(ReservationStatus) as string[];
    let validatedStatus = ReservationStatus.pending;

    if (status) {
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid reservation status" });
      }
      validatedStatus = status as ReservationStatus;
    }

    // Create reservation
    const reservation = await prisma.reservation.create({
      data: {
        name: String(name).trim(),
        email: String(email).toLowerCase().trim(),
        phone: phone ? String(phone).trim() : null,
        partySize: parsedPartySize,
        reservationTime: parsedTime,
        area: area ? String(area).trim() : null,
        notes: notes ? String(notes).trim() : null,
        status: validatedStatus,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        partySize: true,
        reservationTime: true,
        area: true,
        status: true,
        createdAt: true,
      },
    });

    return res.status(201).json({ success: true, reservation });
  } catch (error) {
    console.error("Reservation error:", error);
    return res.status(500).json({ error: "Server error, please try again later" });
  }
}