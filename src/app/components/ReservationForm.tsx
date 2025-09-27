"use client";

import React, { useState, useCallback, memo } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  partySize: number;
  reservationTime: string;
  area: string;
  notes: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  partySize: 2,
  reservationTime: "",
  area: "Main Dining",
  notes: "",
};

// Static config (prevents re-creation on each render)
const textFields = [
  { label: "Name", type: "text", key: "name" },
  { label: "Email", type: "email", key: "email" },
  { label: "Phone", type: "text", key: "phone" },
] as const;

// ✅ Memoized Input component to reduce re-renders
const TextInput = memo(function TextInput({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <label className="block mb-4 text-sm font-medium text-black dark:text-gray-200">
      {label}
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="w-full mt-1 p-3 border rounded bg-white dark:bg-neutral-800 
                   text-black dark:text-white border-gray-300 dark:border-gray-700
                   focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37] 
                   transition duration-300"
      />
    </label>
  );
});

export default function ReservationForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const update = useCallback(<K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  }, []);

  // ✅ Basic validation before sending request
  function validateForm(): string | null {
    if (!form.name.trim()) return "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email format";
    if (!/^[0-9+\-\s()]{6,15}$/.test(form.phone)) return "Invalid phone number";
    if (!form.reservationTime) return "Please select a reservation time";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const error = validateForm();
    if (error) {
      setMessage(error);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setMessage("Reservation received! Check your email for confirmation (demo).");
      setForm(initialForm);
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

      {/* Text Fields */}
      {textFields.map((field) => (
        <TextInput
          key={field.key}
          label={field.label}
          type={field.type}
          value={form[field.key]}
          onChange={(val) => update(field.key, val)}
        />
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
            onChange={(e) => update("partySize", Number(e.target.value))}className="w-full mt-1 p-3 border rounded bg-white dark:bg-neutral-800 
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
                       focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]
                       transition duration-300"
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
          disabled={loading || !form.name || !form.email || !form.phone}
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