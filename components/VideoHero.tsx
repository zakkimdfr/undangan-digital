// "use client";

// interface VideoHeroProps {
//   videoUrl: string;
// }

// export default function VideoHero({ videoUrl }: VideoHeroProps) {
//   return (
//     <section className="relative w-full h-screen overflow-hidden">
//       <video
//         src={videoUrl}
//         className="absolute inset-0 w-full h-full object-contain"
//         autoPlay
//         muted
//         loop
//         playsInline
//       />
//     </section>
//   );
// }

"use client";

interface VideoHeroProps {
  videoUrl: string;
}

export default function VideoHero({ videoUrl }: VideoHeroProps) {
  return (
    <section className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <video
        src={videoUrl}
        className="max-h-full max-w-full object-contain"
        autoPlay
        muted
        // loop
        playsInline
      />
    </section>
  );
}

