"use client";

import { motion, MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Music2 } from "lucide-react";
import CONFIG from "@/config";
import Countdown from "./Countdown";
import { RefObject } from "react";
import Image from "next/image";


type HeroProps = {
  y: MotionValue<number>;
  guestName: string;
  firstEventDate: string;
  audioRef: RefObject<HTMLAudioElement | null>;
  playing: boolean;
  setPlaying: (value: boolean) => void;
};

export default function Hero({
  y,
  guestName,
  firstEventDate,
  audioRef,
  playing,
  setPlaying,
}: HeroProps) {
  return (
    <motion.div
      style={{ y }}
      className="relative h-[70vh] w-full overflow-hidden"
    >
      {/* Background Image */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src={CONFIG.couple.cover}
          alt="cover"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm tracking-widest uppercase">
            Undangan Pernikahan
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold mt-2">
            {CONFIG.couple.bride.name} & {CONFIG.couple.groom.name}
          </h1>
          <p className="mt-3 text-sm opacity-90">Kepada Yth. {guestName}</p>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button
              onClick={() =>
                document
                  .getElementById("rsvp")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-2xl px-5"
            >
              <Users className="h-4 w-4 mr-2" /> RSVP
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                document
                  .getElementById("events")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-2xl px-5"
            >
              <MapPin className="h-4 w-4 mr-2" /> Detail Acara
            </Button>
          </div>

          {/* Countdown */}
          <div className="mt-6 flex items-center justify-center gap-3 text-sm">
            <Countdown targetDate={firstEventDate} />
            <span className="opacity-80">{CONFIG.couple.hashtag}</span>
          </div>
        </motion.div>
      </div>

      {/* Music Control */}
      <div className="absolute bottom-5 right-5 z-10">
        <Button
          size="icon"
          className="rounded-full shadow-lg"
          onClick={() => {
            const a = audioRef.current;
            if (!a) return;
            if (playing) {
              a.pause();
              setPlaying(false);
            } else {
              a.play().catch(() => {});
              setPlaying(true);
            }
          }}
        >
          <Music2 className="h-5 w-5" />
        </Button>
        <audio ref={audioRef} src={CONFIG.music.src} preload="none" loop />
      </div>
    </motion.div>
  );
}
