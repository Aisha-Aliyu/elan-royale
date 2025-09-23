"use client";

import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  partySize: number;
  reservationTime: string;
  area: string;
  notes: string;
};

export default function ReservationForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    partySize: 2,
    reservationTime: "",
    area: "Main Dining",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setMessage("Reservation received! Check your email for confirmation (demo)");
      setForm({
        name: "",
        email: "",
        phone: "",
        partySize: 2,
        reservationTime: "",
        area: "Main Dining",
        notes: "",
      });
    } catch (err: unknown) {
      setMessage(
        typeof err === "object" && err !== null && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      id="reserve"
      onSubmit={onSubmit}
      className="max-w-xl bg-white p-8 rounded-lg shadow-lg text-black 
                 dark:bg-neutral-900 dark:text-white border border-[#d4af37]/40"
    >
      <h2 className="text-3xl font-serif font-bold mb-6 text-center text-[#d4af37]">
        Reserve a Table
      </h2>

      {/* Input fields */}
      {[
        { label: "Name", type: "text", value: form.name, key: "name" },
        { label: "Email", type: "email", value: form.email, key: "email" },
        { label: "Phone", type: "text", value: form.phone, key: "phone" },
      ].map((field) => (
        <label
          key={field.key}
          className="block mb-4 text-sm font-medium text-black dark:text-gray-200"
        >
          {field.label}
          <input
            required
            type={field.type}
            value={field.value}
            onChange={(e) => update(field.key as keyof FormState, e.target.value)}
            className="w-full mt-1 p-3 border rounded bg-white dark:bg-neutral-800 
                       text-black dark:text-white border-gray-300 dark:border-gray-700
                       focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37] 
                       transition duration-300"
          />
        </label>
      ))}

      {/* Party size + Area */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        <label className="block text-sm font-medium text-black dark:text-gray-200">
          Party size
          <input
            required
            type="number"
            min={1}
            value={form.partySize}
            onChange={(e) => update("partySize", Number(e.target.value))}
            className="w-full mt-1 p-3 border rounded bg-white dark:bg-neutral-800 
                       text-black dark:text-white border-gray-300 dark:border-gray-700
                       focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]
                       transition duration-300"
          />
        </label>

        <label className="block text-sm font-medium text-black dark:text-gray-200">
          Area
          <select
            value={form.area}
            onChange={(e) => update("area", e.target.value)}
            className="w-full mt-1 p-3 border rounded bg-white dark:bg-neutral-800 
                       text-black dark:text-white border-gray-300 dark:border-gray-700
                       focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]transition duration-300"
          >
            <option>Main Dining</option>
            <option>Sushi Bar</option>
            <option>Koshitsu</option>
          </select>
        </label>
      </div>

      {/* Date & Time */}
      <label className="block mb-4 text-sm font-medium text-black dark:text-gray-200">
        Reservation date & time
        <input
          required
          type="datetime-local"
          value={form.reservationTime}
          onChange={(e) => update("reservationTime", e.target.value)}
          className="w-full mt-1 p-3 border rounded bg-white dark:bg-neutral-800 
                     text-black dark:text-white border-gray-300 dark:border-gray-700
                     focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37] 
                     transition duration-300"
        />
      </label>

      {/* Notes */}
      <label className="block mb-6 text-sm font-medium text-black dark:text-gray-200">
        Notes
        <textarea
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          className="w-full mt-1 p-3 border rounded bg-white dark:bg-neutral-800 
                     text-black dark:text-white border-gray-300 dark:border-gray-700
                     focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37] 
                     transition duration-300"
        />
      </label>

      {/* Button + Message */}
      <div className="flex flex-col items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-[#d4af37] text-black font-semibold rounded 
                     hover:bg-[#c9a236] active:bg-[#b38e2e] 
                     transition duration-300 shadow-md disabled:opacity-50"
        >
          {loading ? "Sending..." : "Book Now"}
        </button>
        {message && (
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}