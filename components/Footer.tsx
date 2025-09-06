"use client";

import { Heart } from "lucide-react";
import CONFIG from "@/config";

export default function Footer() {
  return (
    <footer className="max-w-3xl mx-auto px-4 pb-16 text-center text-sm opacity-70">
      <div className="flex items-center justify-center gap-2">
        <Heart className="h-4 w-4" />
        <span>Terima kasih atas doa dan kehadiran Anda.</span>
      </div>
      <div className="mt-2">
        © {new Date().getFullYear()} {CONFIG.couple.bride.name} &{" "}
        {CONFIG.couple.groom.name}
      </div>
    </footer>
  );
}
