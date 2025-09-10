"use client";
import { TimerReset } from "lucide-react";
import Section from "@/components/Section";
import Countdown from "@/components/Countdown";
import CONFIG from "@/config";

export default function CountdownSection() {
  return (
    <Section id="countdown" title="Hitung Mundur" icon={<TimerReset className="h-5 w-5" />}>
      {/* Background card sama style seperti section lain */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-lg"
        style={{
          backgroundImage: "url('/countdown.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay biar teks tetap terbaca */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Countdown timer */}
        <div className="relative z-10 flex flex-col items-center justify-center py-10 text-white">
          <Countdown targetDate={CONFIG.countdownDate} />
        </div>
      </div>
    </Section>
  );
}
