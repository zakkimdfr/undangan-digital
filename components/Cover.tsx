"use client";

<<<<<<< HEAD
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
=======
import { motion } from "framer-motion";

interface CoverProps {
  guestName?: string;
  eventDate: string;
  onOpen: () => void;
}

export default function Cover({ guestName = "Tamu Undangan", eventDate, onOpen }: CoverProps) {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-pink-50 to-white"
      style={{
        backgroundImage: "url('/cover.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 max-w-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-white">Undangan Syukuran Pernikahan</h1>
        <h1 className="text-2xl font-bold text-white">Salma & Zakki</h1>
        <p className="mt-4 text-white/90">Kepada Yth.</p>
        <p className="text-2xl font-semibold text-white">{guestName}</p>
        <p className="mt-2 text-white/70">{eventDate}</p>

        <button
          onClick={onOpen}
          className="mt-6 px-6 py-3 bg-white text-black font-medium rounded-xl shadow-md hover:bg-neutral-100 transition"
        >
          Buka Undangan
>>>>>>> e11ec40 (kelengkapan kosmetik + gallery + videohero)
        </button>
      </motion.div>
    </div>
  );
}
