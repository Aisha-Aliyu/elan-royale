import React from "react";

export default function Hero() {
  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/hero.jpg')" }} 
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-serif leading-tight">
          ELÁN <span className="text-[#d4af37]">ROYALE</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-200 text-lg">
          A refined Edomae tasting experience — bespoke tasting menus and
          private koshitsu rooms.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#reserve-section" 
            className="px-6 py-3 border border-white rounded-md hover:bg-white hover:text-black transition scroll-smooth"
          >
            Reserve
          </a>
          <a
            href="../menu"
            className="px-6 py-3 rounded-md bg-white text-black hover:bg-gray-200 transition"
          >
            View Menu
          </a>
        </div>
      </div>
    </section>
  );
}