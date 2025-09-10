"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { Users } from "lucide-react";
// import { createClient } from "@supabase/supabase-js";

// const supabase = (() => {
//   if (typeof window === "undefined") return null;
//   const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
//   const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
//   return url && key ? createClient(url, key) : null;
// })();

export default function Gallery() {
  const [gallery, setGallery] = useState<string[]>([]);

  useEffect(() => {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/gallery";
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
            whileHover={{ scale: 1.02 }}
            onClick={() => window.open(src, "_blank")}
          />
        ))}
      </div>
    </Section>
  );
}
