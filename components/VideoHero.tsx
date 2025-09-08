interface VideoHeroProps {
  videoUrl: string;
}

export default function VideoHero({ videoUrl }: VideoHeroProps) {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      <video
        src={videoUrl}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        // loop
        playsInline
      />
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/30" /> */}
    </section>
  );
}
