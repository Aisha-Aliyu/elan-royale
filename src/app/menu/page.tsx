"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type MenuItem = {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
};

const menuItems: MenuItem[] = [
  // Nigiri
  { id: 1, name: "Salmon Nigiri", description: "Fresh salmon over pressed sushi rice", price: 800, category: "Nigiri" },
  { id: 2, name: "Tuna Nigiri", description: "Lean tuna slices on vinegared rice", price: 900, category: "Nigiri" },
  { id: 3, name: "Eel Nigiri", description: "Grilled eel glazed with sweet unagi sauce", price: 1200, category: "Nigiri" },
  { id: 4, name: "Shrimp Nigiri", description: "Poached shrimp with wasabi and rice", price: 850, category: "Nigiri" },
  { id: 5, name: "Tamago Nigiri", description: "Japanese omelette over sushi rice", price: 600, category: "Nigiri" },

  // Sashimi
  { id: 6, name: "Tuna Sashimi", description: "Delicate slices of premium tuna", price: 1400, category: "Sashimi" },
  { id: 7, name: "Salmon Sashimi", description: "Buttery salmon slices served raw", price: 1300, category: "Sashimi" },
  { id: 8, name: "Yellowtail Sashimi", description: "Fresh yellowtail cuts with soy & wasabi", price: 1600, category: "Sashimi" },

  // Maki Rolls
  { id: 9, name: "California Roll", description: "Crab, avocado, cucumber wrapped in rice & seaweed", price: 1000, category: "Maki Roll" },
  { id: 10, name: "Dragon Roll", description: "Eel, cucumber, topped with avocado & unagi sauce", price: 1600, category: "Maki Roll" },
  { id: 11, name: "Spicy Tuna Roll", description: "Tuna, chili mayo, cucumber, sesame", price: 1200, category: "Maki Roll" },
  { id: 12, name: "Rainbow Roll", description: "California roll topped with assorted sashimi", price: 1700, category: "Maki Roll" },
  { id: 13, name: "Futomaki", description: "Thick sushi roll with vegetables and egg", price: 1100, category: "Maki Roll" },

  // Tempura
  { id: 14, name: "Ebi Tempura", description: "Golden fried shrimp in light tempura batter", price: 1500, category: "Tempura" },
  { id: 15, name: "Vegetable Tempura", description: "Crispy fried seasonal vegetables", price: 1200, category: "Tempura" },
  { id: 16, name: "Tempura Udon", description: "Thick wheat noodles in broth with shrimp tempura", price: 1800, category: "Tempura" },

  // Soup
  { id: 17, name: "Miso Soup", description: "Traditional soybean paste soup with tofu & seaweed", price: 400, category: "Soup" },
  { id: 18, name: "Seafood Miso Soup", description: "Rich miso broth with clams and shrimp", price: 700, category: "Soup" },

  // Noodles
  { id: 19, name: "Tonkotsu Ramen", description: "Rich pork broth with noodles, egg & chashu pork", price: 1900, category: "Noodles" },
  { id: 20, name: "Shoyu Ramen", description: "Soy sauce flavored ramen with pork and egg", price: 1700, category: "Noodles" },
  { id: 21, name: "Zaru Soba", description: "Cold buckwheat noodles with dipping sauce", price: 1200, category: "Noodles" },
  { id: 22, name: "Yakisoba", description: "Stir-fried noodles with vegetables and pork", price: 1600, category: "Noodles" },

  // Bento
  { id: 23, name: "Chicken Katsu Bento", description: "Crispy chicken cutlet with rice, salad, miso soup", price: 2000, category: "Bento" },
  { id: 24, name: "Salmon Teriyaki Bento", description: "Grilled salmon glazed with teriyaki sauce", price: 2200, category: "Bento" },
  { id: 25, name: "Beef Teriyaki Bento", description: "Tender beef with sweet soy glaze", price: 2500, category: "Bento" },
  { id: 26, name: "Vegetarian Bento", description: "Seasonal vegetables, tofu, rice and miso soup", price: 1800, category: "Bento" },

  // Grill
  { id: 27, name: "Beef Yakitori", description: "Grilled skewered beef glazed with tare sauce", price: 1600, category: "Grill" },
  { id: 28, name: "Chicken Yakitori", description: "Grilled chicken skewers with scallions", price: 1400, category: "Grill" },
  { id: 29, name: "Pork Belly Skewers", description: "Crispy pork belly skewers", price: 1700, category: "Grill" },// Dessert
  { id: 30, name: "Matcha Cheesecake", description: "Creamy green tea cheesecake with biscuit base", price: 900, category: "Dessert" },
];

const categories = [
  "Show All",
  "Nigiri",
  "Sashimi",
  "Maki Roll",
  "Tempura",
  "Soup",
  "Noodles",
  "Bento",
  "Grill",
  "Dessert",
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Show All");
  const router = useRouter();

  const filtered =
    activeCategory === "Show All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="fixed top-6 left-6 w-12 h-12 rounded-full bg-[#d4af37] text-black flex items-center justify-center shadow-lg hover:scale-110 transition duration-300 z-50"
      >
        ←
      </button>

      {/* Hero */}
      <section
        className="h-[40vh] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/images/hero-menu.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative text-5xl font-serif tracking-wide text-[#d4af37]">
          Menu
        </h1>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border transition ${
                activeCategory === cat
                  ? "bg-[#d4af37] text-black border-[#d4af37]"
                  : "border-gray-500 text-gray-300 hover:bg-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Items */}
      <section className="container mx-auto px-6 pb-16 max-w-3xl">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="mb-6"
          >
            <div className="flex items-center">
              {/* Dish name shimmer on hover */}
              <span className="text-lg font-semibold text-[#d4af37] shimmer-hover transition duration-500">
                {item.name}
              </span>

              <div className="flex-1 border-b border-dotted border-gray-600 mx-3"></div>

              {/* Price shimmer always */}
              <span className="text-lg font-semibold shimmer-gold whitespace-nowrap">
                ¥{item.price.toLocaleString()}
              </span>
            </div>
            {item.description && (
              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            )}
          </motion.div>
        ))}
      </section>
    </main>
  );
}