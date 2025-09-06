"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CONFIG from "@/config";
import Section from "./Section";
import { Users } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = (() => {
  if (typeof window === "undefined") return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? createClient(url, key) : null;
})();

export default function Gallery() {
  const [gallery, setGallery] = useState<string[]>(CONFIG.gallery.images);

  useEffect(() => {
    async function fetchGallery() {
      if (!supabase) return;
      const { data } = await supabase.from("gallery").select("path").limit(12);
      if (data) {
        const urls = data.map((d: { path: string }) =>
          supabase.storage.from("gallery").getPublicUrl(d.path).data.publicUrl
        );
        setGallery(urls);
      }
    }
    fetchGallery();
  }, []);

  if (!gallery.length) return null;

  return (
    <Section id="gallery" title="Galeri" icon={<Users className="h-5 w-5" />}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {gallery.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`gallery-${i}`}
            className="w-full h-44 md:h-56 object-cover rounded-2xl cursor-pointer shadow-sm"
            whileHover={{ scale: 1.02 }}
            onClick={() => window.open(src, "_blank")}
          />
        ))}
      </div>
    </Section>
  );
}
