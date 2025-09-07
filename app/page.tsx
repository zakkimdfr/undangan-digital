// "use client";

// import { useRef, useState } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// import CONFIG from "@/config";

// // Sections
// import Hero from "@/components/Hero";
// import Section from "@/components/Section";
// import CopyBadge from "@/components/CopyBadge";
// import Couple from "@/components/Couple";
// import Events from "@/components/Events";
// import RsvpForm from "@/components/RsvpForm";
// import Gallery from "@/components/Gallery";
// import GiftSection from "@/components/GiftSection";
// import Footer from "@/components/Footer";


// // Floating Component
// import MusicPlayer from "@/components/MusicPlayer";

// export default function Page() {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [playing, setPlaying] = useState(false);

//   // Scroll animation for hero parallax
//   const { scrollY } = useScroll();
//   const y = useTransform(scrollY, [0, 200], [0, -100]);

//   // Ambil tanggal event pertama dari config
//   const firstEventDate = CONFIG.events[0].date;

//   return (
//     <div className="min-h-screen text-neutral-100 relative">
//       {/* Background */}
//       <div
//         className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-neutral-800"
//         style={{
//           backgroundImage: "url('/bg-pattern.jpg')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         {/* Hero Section */}
//         <Hero
//           y={y}
//           guestName="Tamu Undangan"
//           firstEventDate={firstEventDate}
//           audioRef={audioRef}
//           playing={playing}
//           setPlaying={setPlaying}
//         />

//         {/* Couple Section */}
//         <Couple />

//         {/* Events Section */}
//         <Events />

//         {/* RSVP Section */}
//         <RsvpForm />

//         {/* Gallery Section */}
//         <Gallery />

//         {/* Gift Section */}
//         <GiftSection />

//         {/* Floating Music Player */}
//         <MusicPlayer
//           audioRef={audioRef}
//           playing={playing}
//           setPlaying={setPlaying}
//         />

//         {/* Footer */}
//         <Footer />
//       </div>
//     </div>
//   );
// }

// console.log("CONFIG:", CONFIG);

"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

import CONFIG from "@/config";

// Sections
<<<<<<< HEAD
import Cover from "@/components/Cover";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CopyBadge from "@/components/CopyBadge";
=======
// import Hero from "@/components/Hero";
>>>>>>> e11ec40 (kelengkapan kosmetik + gallery + videohero)
import Couple from "@/components/Couple";
import Events from "@/components/Events";
import RsvpForm from "@/components/RsvpForm";
import Gallery from "@/components/Gallery";
import GiftSection from "@/components/GiftSection";
import Footer from "@/components/Footer";
<<<<<<< HEAD
=======
import VideoHero from "@/components/VideoHero";
>>>>>>> e11ec40 (kelengkapan kosmetik + gallery + videohero)

// Floating Component
import MusicPlayer from "@/components/MusicPlayer";

// Cover
import Cover from "@/components/Cover";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [opened, setOpened] = useState(false);

  // Scroll animation for hero parallax
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 200], [0, -100]);

  // Guest name default (tanpa slug)
  const guestName = "Tamu Undangan";
  const firstEventDate = CONFIG.events[0].date;

<<<<<<< HEAD
const handleOpenEnvelope = () => {
  setOpened(true);
  audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
};
=======
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
         {/* Hero pakai video */}
      <VideoHero
        videoUrl="https://cfsoedqtdrmqptfcudra.supabase.co/storage/v1/object/sign/assets/VideoHero.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mOGI5MGI1MS0wYzA1LTRkNTAtYmFkMS1jOWNiM2M4NWIzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvVmlkZW9IZXJvLm1wNCIsImlhdCI6MTc1NzI0ODM5MiwiZXhwIjoxNzg4Nzg0MzkyfQ.Kwn5EnY2SYp9gFvkOlvnQj-kk7TVOP1PUVj__CqrRII"
        // guestName={guestName}
        // eventDate={firstEventDate}
      />
>>>>>>> e11ec40 (kelengkapan kosmetik + gallery + videohero)

return (
  <>
    {!opened && <Cover onOpen={handleOpenEnvelope} />}
    {opened && (
      <>
        {/* Konten Undangan */}
      {opened && (
        <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-neutral-800 relative">
          <Hero
            y={y}
            guestName="Tamu Undangan"
            firstEventDate={firstEventDate}
            audioRef={audioRef}
            playing={playing}
            setPlaying={setPlaying}
          />

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
      )}
      </>
    )}
    <audio
  ref={audioRef}
  src="/music.mp3" // harus string
  loop
  autoPlay={playing} // boolean terpisah
/>


<<<<<<< HEAD

  </>
);
      }
=======
        {/* Floating Music Player */}
        <MusicPlayer
          audioRef={audioRef}
          playing={playing}
          setPlaying={setPlaying}
        />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
>>>>>>> e11ec40 (kelengkapan kosmetik + gallery + videohero)
