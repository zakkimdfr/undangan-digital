"use client";

type VideoHeroProps = {
  videoUrl: string;       // default mp4
  webmUrl?: string;       // optional webm
  posterUrl?: string;     // optional poster
};

export default function VideoHero({ videoUrl, webmUrl, posterUrl }: VideoHeroProps) {
  return (
    <section
      className="relative w-full h-screen overflow-hidden flex items-center justify-center text-neutral-800"
      style={{
        background: `
          linear-gradient(rgba(189,213,170,0.3), rgba(189,213,170,0.3)),
        `,
      }}
    >
      {/* Video */}
      <video
        autoPlay
        muted
        // loop
        playsInline
        preload="metadata"
        poster={posterUrl}
        className="relative z-10 max-w-full max-h-full object-contain"
      >
        {webmUrl && <source src={webmUrl} type="video/webm" />}
        <source src={videoUrl} type="video/mp4" />
        Browser kamu tidak mendukung video.
      </video>

      {/* Overlay konten opsional */}
      <div className="relative z-10">
        {/* Kalau mau taro teks/logo di atas video, masukin sini */}
      </div>
    </section>
  );
}
