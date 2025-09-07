"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type CoverProps = {
  onOpen: () => void;
};

export default function Cover({ onOpen }: CoverProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[url('/bg-pattern.jpg')] bg-cover bg-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-white/70 rounded-xl shadow-lg cursor-pointer hover:scale-105"
        onClick={onOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <h2 className="text-lg text-gray-600 mb-2">WEDDING INVITATION</h2>
        <h1 className="text-4xl font-serif text-gray-800 mb-2">SALMA & ZAKKI</h1>
        <p className="text-gray-600 mb-4">Kepada Yth.</p>
        <button
          className={`px-6 py-2 rounded-full text-white font-medium ${
            hovered ? "bg-green-700" : "bg-green-600"
          } transition-colors`}
        >
          BUKA UNDANGAN
        </button>
      </motion.div>
    </div>
  );
}
