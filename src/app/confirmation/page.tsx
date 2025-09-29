"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

type Reservation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  partySize: number;
  reservationTime: string;
  area: string;
  notes?: string;
};

export default function ConfirmationPage() {
  const params = useSearchParams();
  const success = params?.get("success");
  const canceled = params?.get("canceled");
  const reservationId = params?.get("reservationId");

  const [reservation, setReservation] = useState<Reservation | null>(null);

  // Fetch reservation details if we have an ID
  useEffect(() => {
    if (reservationId) {
      fetch(`/api/reservations?id=${reservationId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.reservation) {
            setReservation(data.reservation);
          }
        })
        .catch(() => {
          console.error("Failed to fetch reservation details");
        });
    }
  }, [reservationId]);

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-6 animate-bounce">
          🎉 Reservation Confirmed!
        </h1>
        <p className="text-lg md:text-xl text-center max-w-md mb-4">
          Thank you for booking with <span className="font-semibold">Elan Royale</span>.
          <br /> A confirmation email will be sent shortly.
        </p>

        {reservation && (
          <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-lg mb-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-3 text-[#d4af37]">Your Reservation</h2>
            <ul className="space-y-2 text-sm md:text-base">
              <li><span className="font-semibold">Reservation ID:</span> {reservation.id}</li>
              <li><span className="font-semibold">Name:</span> {reservation.name}</li>
              <li><span className="font-semibold">Party Size:</span> {reservation.partySize}</li>
              <li><span className="font-semibold">Area:</span> {reservation.area}</li>
              <li><span className="font-semibold">Date & Time:</span> {new Date(reservation.reservationTime).toLocaleString()}</li>
              {reservation.notes && <li><span className="font-semibold">Notes:</span> {reservation.notes}</li>}
            </ul>
          </div>
        )}

        <Link
          href="/"
          className="px-6 py-3 bg-[#d4af37] text-black font-semibold rounded hover:bg-[#c9a236] transition duration-300 shadow-md"
        >
          Return Home
        </Link>
      </div>
    );
  }

  if (canceled) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-6">
          ❌ Payment Canceled
        </h1>
        <p className="text-lg md:text-xl text-center max-w-md mb-6">
          Your reservation was not completed. Please try again.
        </p>
        <Link
          href="/reservation"
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300 shadow-md"
        >
          Try Again
        </Link>
      </div>
    );
  }

  return null;
}