"use client";
import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const t = setInterval(() => {
      const end = new Date(targetDate).getTime();
      const now = Date.now();
      const diff = Math.max(end - now, 0);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(t);
  }, [targetDate]);

  const items = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 text-center">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-6 shadow-lg"
        >
          <span className="text-3xl md:text-5xl font-bold tracking-wide drop-shadow">
            {item.value}
          </span>
          <span className="mt-1 text-xs md:text-sm uppercase tracking-wider">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
