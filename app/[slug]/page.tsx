"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

import CONFIG from "@/config";

// Sections
import Hero from "@/components/Hero";
import Couple from "@/components/Couple";
import Events from "@/components/Events";
import RsvpForm from "@/components/RsvpForm";
import Gallery from "@/components/Gallery";
import GiftSection from "@/components/GiftSection";
import Footer from "@/components/Footer";

// Floating Component
import MusicPlayer from "@/components/MusicPlayer";

// Cover
import Cover from "@/components/Cover";

export default function GuestPage({ params }: { params: { slug: string } }) {
  const [open, setOpen] = useState(false);
  // const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null!); // ✅ paksa non-null
  const [playing, setPlaying] = useState(false);

  // Scroll animation for hero parallax
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 200], [0, -100]);

  // Guest name from slug
  const guestName = decodeURIComponent(params.slug.replace(/-/g, " "));
  const firstEventDate = CONFIG.events[0].date;

  if (!open) {
    return (
      <Cover
        guestName={guestName}
        eventDate={firstEventDate}
        onOpen={() => setOpen(true)}
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
        {/* Hero Section */}
        <Hero
          y={y}
          guestName={guestName}
          firstEventDate={firstEventDate}
          audioRef={audioRef}
          playing={playing}
          setPlaying={setPlaying}
        />

        {/* Couple Section */}
        <Couple />

        {/* Events Section */}
        <Events />

        {/* RSVP Section */}
        <RsvpForm />

        {/* Gallery Section */}
        <Gallery />

        {/* Gift Section */}
        <GiftSection />

        {/* Floating Music Player */}
        <MusicPlayer
          audioRef={audioRef}
          playing={playing}
          setPlaying={setPlaying}
        />

        {/* Footer */}
        <Footer />
      </div>

      {/* Audio element */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      
    </div>
  );
}
