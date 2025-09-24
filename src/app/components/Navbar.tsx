"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("menu");
  const [scrolled, setScrolled] = useState(false);

  // Scroll spy
  useEffect(() => {
    const sections = ["menu", "reserve-section", "about", "contact"];

    const handleScroll = () => {
      // Navbar background change
      setScrolled(window.scrollY > 50);

      // Scroll spy logic
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
    { name: "About", id: "about", type: "section" },
    { name: "Contact", id: "contact", type: "section" },
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
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-end z-50">
          <div className="w-3/4 max-w-xs bg-neutral-900 h-full p-6 flex flex-col gap-6">
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="self-end text-gray-400 hover:text-white"
            >
              ✕
            </button>{/* Mobile Links */}
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
                    onClick={() => setIsOpen(false)}
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
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}