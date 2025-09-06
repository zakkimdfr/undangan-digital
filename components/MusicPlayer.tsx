"use client";

import { Button } from "@/components/ui/button";
import { Music2 } from "lucide-react";
import { RefObject } from "react";

type MusicPlayerProps = {
  audioRef: RefObject<HTMLAudioElement | null>;
  playing: boolean;
  setPlaying: (value: boolean) => void;
};

export default function MusicPlayer({
  audioRef,
  playing,
  setPlaying,
}: MusicPlayerProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50">
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
    </div>
  );
}
