import React from "react";

export default function Hero() {
  return (
    <section className="min-h-[60vh] flex items-center">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-serif leading-tight">ELÁN ROYALE</h1>
        <p className="mt-4 max-w-xl text-gray-600">
          A refined Edomae tasting experience — bespoke tasting menus and private koshitsu rooms.
        </p>
        <div className="mt-8 flex gap-4">
          <a href="#reserve" className="px-6 py-3 border border-black rounded-md hover:shadow">
            Reserve
          </a>
          <a href="#menu" className="px-6 py-3 rounded-md bg-black text-white">
            View Menu
          </a>
        </div>
      </div>
    </section>
  );
}