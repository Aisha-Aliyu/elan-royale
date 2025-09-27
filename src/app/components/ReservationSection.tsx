"use client";

import React, { memo } from "react";
import ReservationForm from "./ReservationForm";

export const metadata = {
  title: "ELÁN ROYALE — Reservations",
  description:
    "Reserve your table at ELÁN ROYALE. Experience fine dining, private koshitsu rooms, and Edomae-inspired cuisine with ease.",
};

function ReservationSection() {
  return (
    <section
      id="reserve-section"
      role="region"
      aria-labelledby="reserve-heading"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 
                 bg-gradient-to-br from-black via-neutral-900 to-black text-center overflow-hidden"
    >
      {/* Subtle pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10 before:content-[''] before:absolute before:inset-0
                   before:bg-[radial-gradient(circle_at_1px_1px,#d4af37_1px,transparent_0)]
                   before:bg-[length:40px_40px]"
      ></div>

      {/* Glow effect behind form */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[500px] h-[500px] rounded-full bg-[#d4af37] blur-3xl opacity-10"></div>
      </div>

      {/* Section Heading */}
      <div className="relative z-10 mb-12">
        <h2
          id="reserve-heading"
          className="text-4xl md:text-5xl font-serif text-[#d4af37] tracking-wide"
        >
          An Evening to Remember
        </h2>
        <div className="mt-4 h-1 w-32 mx-auto bg-[#d4af37] rounded-full"></div>
        <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
          Reserve your table at{" "}
          <span className="font-semibold">ELÁN ROYALE</span> and indulge in an
          unforgettable dining experience.
        </p>
      </div>

      {/* Form */}
      <div className="relative z-10 w-full max-w-2xl">
        <ReservationForm />
      </div>
    </section>
  );
}

export default memo(ReservationSection);