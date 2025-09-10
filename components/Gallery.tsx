"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Section from "./Section";
import { Users, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [gallery, setGallery] = useState<string[]>([]);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const baseUrl = "/gallery"; // langsung dari public/gallery
    const urls = Array.from({ length: 15 }, (_, i) => `${baseUrl}/${i + 1}.jpeg`);
    setGallery(urls);
  }, []);

  if (!gallery.length) return null;

  return (
    <Section id="gallery" title="Galeri" icon={<Users className="h-5 w-5" />}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {gallery.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            onClick={() => setCurrent(i)}
            className="relative w-full h-44 md:h-56 cursor-pointer"
          >
            <Image
              src={src}
              alt={`gallery-${i + 1}`}
              fill
              className="object-cover rounded-2xl shadow-sm"
            />
          </motion.div>
        ))}
      </div>

      {/* Modal Preview */}
      {current !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          {/* Tombol Close */}
          <button
            className="absolute top-4 right-4 text-white hover:text-red-400 transition"
            onClick={() => setCurrent(null)}
          >
            <X className="h-8 w-8" />
          </button>

          {/* Tombol Prev */}
          <button
            className="absolute left-4 text-white hover:text-gray-300 transition"
            onClick={() =>
              setCurrent((prev) =>
                prev !== null ? (prev - 1 + gallery.length) % gallery.length : 0
              )
            }
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          {/* Gambar Preview */}
          <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
            <Image
              src={gallery[current]}
              alt={`preview-${current}`}
              fill
              className="object-contain rounded-lg shadow-lg"
              priority
            />
          </div>

          {/* Tombol Next */}
          <button
            className="absolute right-4 text-white hover:text-gray-300 transition"
            onClick={() =>
              setCurrent((prev) =>
                prev !== null ? (prev + 1) % gallery.length : 0
              )
            }
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        </div>
      )}
    </Section>
  );
}
