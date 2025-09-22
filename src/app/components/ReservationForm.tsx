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
    setForm(prev => ({ ...prev, [k]: v }));
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
    <form id="reserve" onSubmit={onSubmit} className="max-w-xl bg-white p-6 rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4">Reserve a table</h2>

      <label className="block mb-2">Name
        <input required value={form.name} onChange={e => update("name", e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </label>

      <label className="block mb-2">Email
        <input required type="email" value={form.email} onChange={e => update("email", e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </label>

      <label className="block mb-2">Phone
        <input value={form.phone} onChange={e => update("phone", e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </label>

      <div className="grid grid-cols-2 gap-4 mb-2">
        <label>Party size
          <input required type="number" min={1} value={form.partySize} onChange={e => update("partySize", Number(e.target.value))} className="w-full mt-1 p-2 border rounded" />
        </label>

        <label>Area
          <select value={form.area} onChange={e => update("area", e.target.value)} className="w-full mt-1 p-2 border rounded">
            <option>Main Dining</option>
            <option>Sushi Bar</option>
            <option>Koshitsu</option>
          </select>
        </label>
      </div>

      <label className="block mb-2">Reservation date & time
        {/* use native datetime-local for demo */}
        <input required type="datetime-local" value={form.reservationTime} onChange={e => update("reservationTime", e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </label>

      <label className="block mb-4">Notes
        <textarea value={form.notes} onChange={e => update("notes", e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </label>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={loading} className="px-5 py-2 bg-charcoal text-white rounded">
          {loading ? "Sending..." : "Request Reservation"}
        </button>
        {message && <p className="text-sm text-gray-600">{message}</p>}
      </div>
    </form>
  );
}