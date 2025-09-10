"use client";

type VideoHeroProps = {
  videoUrl: string;
};

export default function VideoHero({ videoUrl }: VideoHeroProps) {
  return (
    <section
      className="relative w-full h-screen overflow-hidden flex items-center justify-center text-neutral-800"
      style={{
        background: `
          linear-gradient(rgba(189,213,170,0.3), rgba(189,213,170,0.3)),
        `,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
      }}
    >
      {/* Video */}
      <video
        src={videoUrl}
        autoPlay
        muted
        // loop
        playsInline
        className="relative z-10 max-w-full max-h-full object-contain"
      />
    </section>
  );
}
