"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


type ImageType = {
  src: string;
  category: "food" | "interior" | "experience";
  width: number;
  height: number;
};

const allImages: ImageType[] = [
  { src: "/images/food1.JPG", category: "food", width: 1200, height: 800 },
  { src: "/images/food2.JPG", category: "food", width: 600, height: 900 },
  { src: "/images/food3.JPG", category: "food", width: 1200, height: 800 },
  { src: "/images/food4.JPG", category: "food", width: 800, height: 1200 },
  { src: "/images/food5.JPG", category: "food", width: 1200, height: 800 },
  { src: "/images/food6.JPG", category: "food", width: 900, height: 600 },
  { src: "/images/food7.JPG", category: "food", width: 1200, height: 800 },
  { src: "/images/food8.JPG", category: "food", width: 600, height: 900 },
  { src: "/images/food9.JPG", category: "food", width: 1200, height: 800 },
  { src: "/images/food10.JPG", category: "food", width: 1200, height: 800 },
  { src: "/images/interior1.JPG", category: "interior", width: 1200, height: 800 },
  { src: "/images/interior2.JPG", category: "interior", width: 800, height: 1200 },
  { src: "/images/interior3.JPG", category: "interior", width: 1200, height: 800 },
  { src: "/images/interior4.JPG", category: "interior", width: 1200, height: 800 },
  { src: "/images/hero.JPG", category: "interior", width: 1200, height: 800 },
  { src: "/images/interior5.JPG", category: "interior", width: 900, height: 600 },
  { src: "/images/experience1.JPG", category: "experience", width: 1200, height: 800 },
  { src: "/images/experience2.JPG", category: "experience", width: 600, height: 900 },
  { src: "/images/experience3.JPG", category: "experience", width: 1200, height: 800 },
  { src: "/images/experience4.JPG", category: "experience", width: 1200, height: 800 },
  { src: "/images/experience5.JPG", category: "experience", width: 1200, height: 800 },
  { src: "/images/experience6.JPG", category: "experience", width: 1200, height: 800 },
  { src: "/images/experience7.JPG", category: "experience", width: 1200, height: 800 },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "food" | "interior" | "experience">("all");
  const [visibleImages, setVisibleImages] = useState<ImageType[]>([]);
  const [, setPage] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const itemsPerPage = 9;

  // Memoized categories
  const categories = useMemo(() => ["all", "food", "interior", "experience"], []);

  // Memoized filtered images
  const filtered = useMemo(
    () => (activeTab === "all" ? allImages : allImages.filter((img) => img.category === activeTab)),
    [activeTab]
  );

  // Reset on tab change
  useEffect(() => {
    setPage(1);
    setVisibleImages(filtered.slice(0, itemsPerPage));
  }, [activeTab, filtered]);

  // Stable loadMore function
  const loadMore = useCallback(() => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      const newImages = filtered.slice(0, nextPage * itemsPerPage);
      if (newImages.length > visibleImages.length) {
        setVisibleImages(newImages);
        return nextPage;
      }
      return prevPage;
    });
  }, [filtered, visibleImages.length]);

  // Intersection Observer
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  // ESC key closes lightbox
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Hero */}
      <section className="h-[50vh] relative flex items-center justify-center overflow-hidden">
        <Image
          src="/images/experience7.JPG"
          alt="Gallery Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative text-5xl font-serif tracking-wide text-accentGold">Gallery</h1>

        {/* Back button */}
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="fixed top-6 left-6 w-12 h-12 rounded-full bg-[#d4af37] text-black flex items-center justify-center shadow-lg hover:scale-110 transition duration-300 z-50"
        >
          ←
        </button>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-6 pt-12">
        <div className="flex justify-center gap-8 text-sm uppercase tracking-widest mb-10" role="tablist">
          {categories.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              aria-label={`Show ${tab} images`}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`relative pb-2 transition ${
                activeTab === tab ? "text-accentGold" : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-accentGold transition-all duration-300 ${
                  activeTab === tab ? "w-full" : "w-0"
                }`}
              ></span>
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="container mx-auto px-6 pb-16">
        {visibleImages.length === 0 ? (
          <p className="text-center text-gray-400">No images available</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {visibleImages.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-lg cursor-pointer group break-inside-avoid"
                onClick={() => setSelected(img.src)}
              >
                <Image
                  src={img.src}
                  alt={`Gallery image ${i + 1}`}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition"></div>
                <span className="absolute bottom-3 left-3 text-sm uppercase tracking-wide text-accentGold opacity-0 group-hover:opacity-100 transition">
                  View
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Spinner */}
        {visibleImages.length < filtered.length && (
          <div ref={loadMoreRef} className="flex justify-center mt-8">
            <div className="w-6 h-6 border-2 border-accentGold border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            aria-label="Close lightbox"
            className="absolute top-6 right-6 flex items-center justify-center w-12 h-12 rounded-full border border-accentGold text-accentGold text-xl font-bold hover:bg-accentGold hover:text-black transition duration-300"
            onClick={() => setSelected(null)}
          >
            ✕
          </button><Image
            src={selected}
            alt="Selected gallery image"
            width={1200}
            height={800}
            className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg object-contain animate-zoomIn"
          />
        </div>
      )}
    </main>
  );
}