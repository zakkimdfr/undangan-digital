"use client";

import { useRef, useState } from "react";

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

export default function HomePage() {
  const [opened, setOpened] = useState(false);
  // const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null!); // ✅ paksa non-null

  const [playing, setPlaying] = useState(false);

  const guestName = "Tamu Undangan";
  const firstEventDate = CONFIG.events[0].date;

  const handleOpenEnvelope = () => {
    setOpened(true);

    // ✅ mainkan musik langsung setelah klik amplop
    const a = audioRef.current;
    if (a) {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => console.warn("Browser blokir autoplay"));
    }
  };

  if (!opened) {
    // Amplop (Cover) muncul dulu
    return (
      <Cover
        guestName={guestName}
        eventDate={firstEventDate}
        onOpen={handleOpenEnvelope}
      />
    );
  }

  return (
    <div className="min-h-screen text-neutral-100 relative">
      {/* Background */}
      <div
        className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-neutral-800"
        style={{
          backgroundImage: "url('/bg-pattern.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* VideoHero full screen */}
        <VideoHero videoUrl="https://cfsoedqtdrmqptfcudra.supabase.co/storage/v1/object/sign/assets/VideoHero.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mOGI5MGI1MS0wYzA1LTRkNTAtYmFkMS1jOWNiM2M4NWIzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvVmlkZW9IZXJvLm1wNCIsImlhdCI6MTc1NzMzNzA4MiwiZXhwIjoxNzg4ODczMDgyfQ.BR5TRm8GYy08X0TMwWQJuchsswrVLlUNZeKUO_wGlxA" />

        {/* Section lain */}
        <Couple />
        <Events />
        <RsvpForm />
        <Gallery />
        <GiftSection />

        {/* Floating Music Player */}
        <MusicPlayer
          audioRef={audioRef}
          playing={playing}
          setPlaying={setPlaying}
        />

        <Footer />
      </div>

      {/* Audio element */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
    </div>
  );
}
