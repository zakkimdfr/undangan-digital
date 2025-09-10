"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import CONFIG from "@/config";

// Sections
import Couple from "@/components/Couple";
import Events from "@/components/Events";
import RsvpForm from "@/components/RsvpForm";
import Gallery from "@/components/Gallery";
import GiftSection from "@/components/GiftSection";
import Footer from "@/components/Footer";
import VideoHero from "@/components/VideoHero";

// Floating Component
import MusicPlayer from "@/components/MusicPlayer";

// Cover
import Cover from "@/components/Cover";

export default function Content({ guestName }: { guestName?: string }) {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null!);
  const [playing, setPlaying] = useState(false);

  const firstEventDate = CONFIG.events[0].date;

  // 🎵 fungsi buka undangan + play musik
  const handleOpen = () => {
    setOpen(true);

    const a = audioRef.current;
    if (a) {
      a.muted = false;
      a.play()
        .then(() => setPlaying(true))
        .catch((err) => console.warn("Autoplay dicegah:", err));
    }
  };

  // 🌟 Parallax untuk hero
//   const { scrollYProgress } = useScroll();
//   const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
//   const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // 🎬 Variants untuk animasi masuk tiap section
  const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }, // fix TS error
  },
};

  return (
    <div className="min-h-screen text-neutral-100 relative">
      {/* 🎵 Audio harus selalu ada di DOM */}
      <audio ref={audioRef} src="/music.mp3" loop muted />

      {!open ? (
        <Cover
          guestName={guestName ?? "Tamu Undangan"}
          eventDate={firstEventDate}
          onOpen={() => setOpen(true)}
          audioRef={audioRef}
          setPlaying={setPlaying}
        />
      ) : (
        <div
          className="min-h-screen text-neutral-800"
          style={{
            background: `
              linear-gradient(rgba(189,213,170,0.3), rgba(189,213,170,0.3)),
              url('/bg-pattern.jpg')
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Hero pakai video */}
          <VideoHero videoUrl="/VideoHero.mp4" />

          {/* Sections dengan animasi fade/slide */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="py-5"
          >
            <Couple />
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="py-5"
          >
            <Events />
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="py-5"
          >
            <RsvpForm />
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="py-5"
          >
            <Gallery />
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="py-5"
          >
            <GiftSection />
          </motion.section>

          {/* Floating Music */}
          <MusicPlayer
            audioRef={audioRef}
            playing={playing}
            setPlaying={setPlaying}
          />

          {/* Footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}
