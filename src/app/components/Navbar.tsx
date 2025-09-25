"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("menu");
  const [scrolled, setScrolled] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Scroll spy
  useEffect(() => {
    const sections = ["menu", "reserve-section", "about", "contact"];

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      let current = "menu";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Menu", id: "../menu", type: "page" },
    { name: "Reserve", id: "reserve-section", type: "section" },
    { name: "Gallery", id: "/gallery", type: "page" },
    { name: "About", id: "/about", type: "page" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"
      } text-white`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif tracking-wider">
          E . <span className="text-[#d4af37]">R</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wide">
          {links.map((link) =>
            link.type === "page" ? (
              <Link
                key={link.id}
                href={link.id}
                className={`relative group ${
                  activeSection === link.id ? "text-[#d4af37]" : ""
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#d4af37] transition-all duration-300 ${
                    activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ) : (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative group ${
                  activeSection === link.id ? "text-[#d4af37]" : ""
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#d4af37] transition-all duration-300 ${
                    activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            )
          )}

          {/* Contact Modal Trigger */}
          <button
            onClick={() => setShowContact(true)}
            className="relative group uppercase"
          >
            Contact
            <span className="absolute left-0 -bottom-1 h-[2px] bg-[#d4af37] transition-all duration-300 w-0 group-hover:w-full"></span>
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 border rounded border-white/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-end z-50">
          <div className="w-3/4 max-w-xs bg-neutral-900 h-full p-6 flex flex-col gap-6">
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="self-end text-gray-400 hover:text-white"
            >
              ✕
            </button>

            {/* Mobile Links */}
            <nav className="flex flex-col gap-6 text-lg uppercase tracking-wide">
              {links.map((link) =>
                link.type === "page" ? (
                  <Link
                    key={link.id}
                    href={link.id}
                    onClick={() => setIsOpen(false)}
                    className={`relative group ${
                      activeSection === link.id ? "text-[#d4af37]" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`relative group ${
                      activeSection === link.id ? "text-[#d4af37]" : ""
                    }`}
                  >
                    {link.name}
                  </a>
                )
              )}

              {/* Contact Modal Trigger */}
              <button
                onClick={() => {
                  setShowContact(true);
                  setIsOpen(false);
                }}
                className="uppercase text-[#d4af37]"
              >
                Contact us
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed bottom-0 left-0 w-full bg-neutral-900 text-white p-8 z-[999] rounded-t-2xl shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif text-[#d4af37]">Contact Us</h3>
              <button
                onClick={() => setShowContact(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-300 mb-4">
              We&apos;d love to hear from you. Reach us via the following:
            </p>
            <ul className="space-y-2">
              <li>📞 +81 3-1234-5678</li>
              <li>✉️ contact@elanroyale.jp</li>
              <li>📍 Tokyo, Japan</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}