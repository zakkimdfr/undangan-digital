"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { Users } from "lucide-react";

export default function Gallery() {
  const [gallery, setGallery] = useState<string[]>([]);

  useEffect(() => {
    // Ambil gambar dari folder public/gallery
    const baseUrl = "/gallery";
    const urls = Array.from({ length: 15 }, (_, i) => `${baseUrl}/${i + 1}.jpeg`);
    setGallery(urls);
  }, []);

  if (!gallery.length) return null;

  return (
    <Section id="gallery" title="Galeri" icon={<Users className="h-5 w-5" />}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {gallery.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`gallery-${i + 1}`}
            className="w-full h-44 md:h-56 object-cover rounded-2xl cursor-pointer shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onClick={() => window.open(src, "_blank")}
          />
        ))}
      </div>
    </Section>
  );
}
