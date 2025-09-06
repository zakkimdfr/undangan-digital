"use client";
import { useEffect, useState } from "react";
import { TimerReset } from "lucide-react";

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [remaining, setRemaining] = useState<string>("");

  useEffect(() => {
    const t = setInterval(() => {
      const end = new Date(targetDate).getTime();
      const now = Date.now();
      const diff = Math.max(end - now, 0);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setRemaining(`${d} hari ${h} jam ${m} menit ${s} detik`);
    }, 1000);

    return () => clearInterval(t);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-2 text-sm opacity-80">
      <TimerReset className="h-4 w-4" />
      <span>{remaining}</span>
    </div>
  );
}
