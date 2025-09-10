"use client";
import { motion } from "framer-motion";
import { RefObject } from "react";

interface CoverProps {
  guestName?: string;
  eventDate: string;
  onOpen: () => void;
  audioRef: RefObject<HTMLAudioElement>;
  setPlaying: (value: boolean) => void;
}

export default function Cover({
  guestName = "Tamu Undangan",
  eventDate,
  onOpen,
  audioRef,
  setPlaying,
}: CoverProps) {
  const handleClick = () => {
    // buka undangan
    onOpen();

    // play musik
    const a = audioRef.current;
    if (a) {
      a.muted = false; // pastikan unmute
      a.play()
        .then(() => setPlaying(true))
        .catch((err) => console.warn("Autoplay dicegah:", err));
    }
  };

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
        <h1 className="text-3xl font-bold text-white">
          Undangan Syukuran Pernikahan
        </h1>
        <h1 className="text-2xl font-bold text-white">Salma & Zakki</h1>
        <p className="mt-4 text-white/90">Kepada Yth.</p>
        <p className="text-2xl font-semibold text-white">{guestName}</p>
        <p className="mt-2 text-white/70">{eventDate}</p>

        <button
          onClick={handleClick}
          className="mt-6 px-6 py-3 bg-white text-black font-medium rounded-xl shadow-md hover:bg-neutral-100 transition"
        >
          Buka Undangan
        </button>
      </motion.div>
    </div>
  );
}
