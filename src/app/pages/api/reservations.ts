import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, email, phone, partySize, reservationTime, area, notes } = req.body;
      if (!name || !email || !partySize || !reservationTime) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const reservation = await prisma.reservation.create({
        data: {
          name,
          email,
          phone,
          partySize: Number(partySize),
          reservationTime: new Date(reservationTime),
          area,
          notes,
        },
      });
      return res.status(201).json({ reservation });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}