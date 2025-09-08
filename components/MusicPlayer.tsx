"use client";

import { Button } from "@/components/ui/button";
import { Music2 } from "lucide-react";
import { RefObject, useEffect } from "react";

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
  // Auto-play saat mount
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Jika browser blokir auto-play, tetap false
        setPlaying(false);
      });
  }, [audioRef, setPlaying]);

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

// "use client";

// import { Button } from "@/components/ui/button";
// import { Music2 } from "lucide-react";
// import { RefObject } from "react";
// import { motion } from "framer-motion";

// type MusicPlayerProps = {
//   audioRef: RefObject<HTMLAudioElement>;
//   playing: boolean;
//   setPlaying: (value: boolean) => void;
// };

// export default function MusicPlayer({
//   audioRef,
//   playing,
//   setPlaying,
// }: MusicPlayerProps) {
//   return (
//     <div className="fixed bottom-5 right-5 z-50">
//       <Button
//         size="icon"
//         className="rounded-full shadow-lg bg-white text-black hover:bg-gray-200"
//         onClick={() => {
//           const a = audioRef.current;
//           if (!a) return;
//           if (playing) {
//             a.pause();
//             setPlaying(false);
//           } else {
//             a.play().catch(() => {});
//             setPlaying(true);
//           }
//         }}
//       >
//         <motion.div
//           animate={{ rotate: playing ? 360 : 0 }}
//           transition={{ repeat: playing ? Infinity : 0, duration: 3, ease: "linear" }}
//         >
//           <Music2 className="h-5 w-5" />
//         </motion.div>
//       </Button>
//     </div>
//   );
// }
