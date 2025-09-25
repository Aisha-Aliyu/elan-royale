"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-6 left-6 w-12 h-12 rounded-full bg-[#d4af37] text-black flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-gold transition duration-300 z-50"
      >
        ←
      </button>

      {/* Hero */}
      <section
        className="h-[60vh] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: "url('/images/hero-about.JPG')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-6xl font-serif text-[#d4af37] tracking-wide"
        >
          About Us
        </motion.h1>
      </section>

      {/* Philosophy */}
      <section className="container mx-auto px-6 py-16 text-center max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xl italic text-gray-300 leading-relaxed"
        >
          “Crafting timeless Japanese dining experiences, where tradition meets
          modern luxury.”
        </motion.p>
        <div className="w-24 h-[2px] bg-[#d4af37] mx-auto mt-6"></div>
      </section>

      {/* History */}
      <section className="container mx-auto px-6 py-16 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-serif text-[#d4af37] mb-6"
        >
          Our Story
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-300 leading-relaxed"
        >
          Born in the heart of Japan, our journey began with a simple promise:
          to honor the centuries-old traditions of sushi craftsmanship while
          reimagining it for the modern world. Every dish we serve is a
          testament to our devotion to authenticity, elegance, and excellence.
        </motion.p>
      </section>

      {/* Values */}
      <section className="container mx-auto px-6 py-20 grid md:grid-cols-3 gap-10 max-w-6xl">
        {[
          {
            title: "Tradition",
            desc: "Rooted in centuries of Japanese culinary artistry.",
          },
          {
            title: "Freshness",
            desc: "Only the finest seasonal ingredients make it to your plate.",
          },
          {
            title: "Hospitality",
            desc: "Omotenashi – the spirit of genuine Japanese service.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="p-8 border border-gray-700 rounded-lg text-center hover:border-[#d4af37] transition"
          >
            <h3 className="text-2xl font-serif text-[#d4af37] mb-4">
              {item.title}
            </h3>
            <p className="text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </section>

    {/* Chef Showcase */}
<section className="container mx-auto px-6 py-20 max-w-6xl">
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="text-3xl font-serif text-center text-[#d4af37] mb-12"
  >
    Meet Our Chefs
  </motion.h2>

  <div className="grid md:grid-cols-3 gap-8">
    {[
      {
        name: "Chef Hiroshi Tanaka",
        role: "Executive Chef",
        img: "/images/chef1.jpg",
      },
      {
        name: "Chef Ayaka Sato",
        role: "Sushi Artisan",
        img: "/images/chef2.jpg",
      },
      {
        name: "Chef Kenji Nakamura",
        role: "Tempura Master",
        img: "/images/chef3.jpg",
      },
    ].map((chef, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: i * 0.2 }}
        className="relative group overflow-hidden rounded-lg shadow-lg"
      >
        <Image
          src={chef.img}
          alt={chef.name}
          width={500}
          height={600}
          className="object-cover w-full h-[450px] group-hover:scale-110 transition duration-700"
        />

        {/* Desktop Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 hidden md:flex flex-col items-center justify-center text-center p-4">
          <h3 className="text-2xl font-serif text-[#d4af37]">{chef.name}</h3>
          <p className="text-gray-300">{chef.role}</p>
        </div>

        {/* Mobile Text (always visible) */}
        <div className="md:hidden text-center bg-black/80 py-4">
          <h3 className="text-xl font-serif text-[#d4af37]">{chef.name}</h3>
          <p className="text-gray-300">{chef.role}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>

      {/* Signature Quote */}
      <section className="bg-black/40 py-20 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-2xl italic font-serif text-[#d4af37] max-w-2xl mx-auto"
        >
          “In every grain of rice lies a story of patience, respect, and
          craftsmanship.”
        </motion.p>
      </section>
    </main>
  );
}