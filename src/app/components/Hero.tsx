"use client";

import React from "react";
import { motion } from "framer-motion";

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
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-serif leading-tight"
        >
          ELÁN <span className="text-[#d4af37]">ROYALE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="mt-4 max-w-2xl mx-auto text-gray-200 text-lg"
        >
          A refined Edomae tasting experience — bespoke tasting menus and
          private koshitsu rooms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-8 flex justify-center gap-4"
        >
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
        </motion.div>
      </div>
    </section>
  );
}