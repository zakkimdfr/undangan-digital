"use client";

/**********************************************
 * app/page.tsx
 * Integrated WeddingInvite component for Next.js (App Router)
 * - Direct RSVP -> Google Apps Script (NEXT_PUBLIC_APPSCRIPT_URL)
 * - Guest slug lookup -> Apps Script GET
 * - Gallery fetch -> Supabase (NEXT_PUBLIC_SUPABASE_URL + KEY)
 * - Music control, copy badge, countdown, parallax (framer-motion)
 *
 * Place this file at: /app/page.tsx
 * Requirements:
 *  - Next.js 15 (App Router)
 *  - TailwindCSS
 *  - shadcn/ui components (or replace Card/Button/Input/Textarea)
 *  - framer-motion, lucide-react, @supabase/supabase-js
 *  - set env vars in .env.local (see README note below)
 **********************************************/

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ReactNode, ReactElement } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Gift,
  Heart,
  MapPin,
  Music2,
  Send,
  Share2,
  TimerReset,
  Users,
  Copy,
  Check,
  Phone,
  Instagram,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CONFIG from "@/config";
import Image from "next/image";
import next from "next";

interface SectionProps {
  id: string;
  title: string;
  icon?: ReactElement; // karena icon biasanya JSX <Icon />
  children: ReactNode; // untuk konten dalam section
  subtitle?: string;
}

// ---------------------- Helpers ----------------------
function useQuery() {
  const params = useMemo(
    () =>
      new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : ""
      ),
    []
  );
  return { get: (key: string) => params.get(key) };
}

function Countdown({ targetDate }: { targetDate: string }) {
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

function CopyBadge({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      variant="secondary"
      className={`h-9 gap-2 ${className}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {}
      }}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{" "}
      {copied ? "Disalin" : "Salin"}
    </Button>
  );
}

function Section({ id, title, icon, children, subtitle }: SectionProps) {
  return (
    <section id={id} className="max-w-3xl mx-auto px-4 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 justify-center">
          {icon}
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
        {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
        <div className="w-full">{children}</div>
      </motion.div>
    </section>
  );
}

// ---------------------- Supabase client (browser) ----------------------
const supabase = (() => {
  try {
    if (typeof window === "undefined") return null;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
  } catch {
    return null;
  }
})();

// ---------------------- Main Component ----------------------
export default function WeddingInvite() {
  const query = useQuery();
  const guestSlug = query.get("to") || undefined;
  const [guestName, setGuestName] = useState("Tamu Undangan");

  const [rsvp, setRsvp] = useState({
    name: "",
    phone: "",
    attendees: 1,
    message: "",
    status: "Hadir",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const [gallery, setGallery] = useState<string[]>(CONFIG.gallery.images.slice(0, 6));

  // autoplay music
  useEffect(() => {
    if (CONFIG.music.autoplay && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }, []);

  // fetch gallery from Supabase
  useEffect(() => {
    async function fetchGallery() {
      if (!supabase) return;

      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("path")
          .order("uploaded_at", { ascending: false })
          .limit(12);

        if (error || !data) return;

        const urls = data.map((d: { path: string }) => {
          const { data: urlData } = supabase.storage
            .from("gallery")
            .getPublicUrl(d.path);
          return urlData.publicUrl;
        });

        setGallery(urls);
      } catch (e) {
        console.error("Error fetchGallery:", e);
      }
    }
    fetchGallery();
  }, []);

  const firstEventDate = "2025-09-14T00:09:00";

  async function submitRSVP() {
  setSending(true);

  try {
    const appsUrl = process.env.NEXT_PUBLIC_APPSCRIPT_URL;

    if (appsUrl && typeof appsUrl === "string" && appsUrl.startsWith("http")) {
      const payload = { ...rsvp, timestamp: new Date().toISOString() };
      const res = await fetch(appsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const j = await res.json();
      if (j.success !== false) setSent(true);
    } else {
      console.warn("Apps Script URL tidak ditemukan, menyimpan ke localStorage");
      const queue = JSON.parse(localStorage.getItem("rsvp_local") || "[]");
      queue.push({ ...rsvp, timestamp: new Date().toISOString() });
      localStorage.setItem("rsvp_local", JSON.stringify(queue));
      setSent(true);
    }
  } catch (e) {
    console.error("Error submitRSVP:", e);
  } finally {
    setSending(false);
  }
}


  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  // parallax effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -120]);

  // ---------------------- JSX ----------------------
  return (
    <div
      className="min-h-screen text-neutral-100 relative"
      style={{
        backgroundImage: "url('/bg-pattern.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-neutral-800">
        {/* HERO */}
        <motion.div
          style={{ y }}
          className="relative h-[70vh] w-full overflow-hidden"
        >
          <Image
            src={CONFIG.couple.cover}
            alt="cover"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-sm tracking-widest uppercase">
                Undangan Pernikahan
              </div>
              <h1 className="text-4xl md:text-6xl font-semibold mt-2">
                {CONFIG.couple.bride.name} & {CONFIG.couple.groom.name}
              </h1>
              <p className="mt-3 text-sm opacity-90">Kepada Yth. {guestName}</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button
                  onClick={() =>
                    document
                      .getElementById("rsvp")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="rounded-2xl px-5"
                >
                  <Users className="h-4 w-4 mr-2" /> RSVP
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    document
                      .getElementById("events")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="rounded-2xl px-5"
                >
                  <MapPin className="h-4 w-4 mr-2" /> Detail Acara
                </Button>
              </div>
              <div className="mt-6 flex items-center justify-center gap-3 text-sm">
                <Countdown targetDate={firstEventDate} />
                <span className="opacity-80">{CONFIG.couple.hashtag}</span>
              </div>
            </motion.div>
          </div>

          {/* Music control */}
          <div className="absolute bottom-5 right-5 z-10">
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
            <audio ref={audioRef} src={CONFIG.music.src} preload="none" loop />
          </div>
        </motion.div>

        {/* COUPLE */}
        <Section
          id="couple"
          title="Mempelai"
          icon={<Heart className="h-5 w-5" />}
        >
          <Card className="rounded-2xl">
            <CardContent className="p-6 grid md:grid-cols-2 gap-6 items-center">
              {/* Bride */}
              <div className="space-y-2 text-center">
                <img
                  src={CONFIG.couple.bride.photo}
                  alt={CONFIG.couple.bride.name}
                  className="w-40 h-40 mx-auto rounded-full object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold">
                  {CONFIG.couple.bride.name}
                </h3>
                <p className="text-sm opacity-80">
                  {CONFIG.couple.bride.parents}
                </p>
                {CONFIG.couple.bride.insta && (
                  <a
                    href={CONFIG.couple.bride.insta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:underline flex items-center justify-center gap-1"
                  >
                    <Instagram className="h-4 w-4" /> Instagram Salma
                  </a>
                )}
              </div>

              {/* Groom */}
              <div className="space-y-2 text-center">
                <img
                  src={CONFIG.couple.groom.photo}
                  alt={CONFIG.couple.groom.name}
                  className="w-40 h-40 mx-auto rounded-full object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold">
                  {CONFIG.couple.groom.name}
                </h3>
                <p className="text-sm opacity-80">
                  {CONFIG.couple.groom.parents}
                </p>
                {CONFIG.couple.groom.insta && (
                  <a
                    href={CONFIG.couple.groom.insta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center justify-center gap-1"
                  >
                    <Instagram className="h-4 w-4" /> Instagram Zakki
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* EVENTS */}
        <Section
          id="events"
          title="Detail Acara"
          icon={<MapPin className="h-5 w-5" />}
        >
          <div className="grid md:grid-cols-2 gap-4">
            {CONFIG.events.map((ev, i) => (
              <Card key={i} className="rounded-2xl">
                <CardContent className="p-6 space-y-3 text-center">
                  <div className="text-sm uppercase tracking-widest opacity-70">
                    {ev.type}
                  </div>
                  <div className="text-lg font-medium">
                    {new Date(ev.date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>

                  {/* Tampilkan waktu hanya jika ada */}
                  {ev.time && (
                    <div className="text-sm opacity-80">{ev.time}</div>
                  )}

                  {/* Pakai whitespace-pre-line agar \n jadi baris baru */}
                  <p className="text-sm whitespace-pre-line">{ev.address}</p>

                  {/* Tombol peta hanya jika ada mapUrl */}
                  {ev.mapUrl && (
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => window.open(ev.mapUrl!, "_blank")}
                      >
                        Buka Peta
                      </Button>
                      <CopyBadge text={ev.mapUrl} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* GALLERY */}
        {gallery.length > 0 && (
          <Section
            id="gallery"
            title="Galeri"
            icon={<Users className="h-5 w-5" />}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`gallery-${i}`}
                  className="w-full h-44 md:h-56 object-cover rounded-2xl cursor-pointer shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => window.open(src, "_blank")}
                />
              ))}
            </div>
          </Section>
        )}

        {/* RSVP */}
        {CONFIG.rsvp.enabled && (
          <Section
            id="rsvp"
            title="Konfirmasi Kehadiran"
            icon={<Users className="h-5 w-5" />}
            subtitle="Mohon kesediaannya untuk mengisi formulir berikut."
          >
            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-4 text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm">Nama</label>
                    <Input
                      placeholder="Nama lengkap"
                      value={rsvp.name}
                      onChange={(e:  React.ChangeEvent<HTMLInputElement>) =>
                        setRsvp({ ...rsvp, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">No. HP</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="08xxxxxxxxxx"
                        value={rsvp.phone}
                        onChange={(e:  React.ChangeEvent<HTMLInputElement>) =>
                          setRsvp({ ...rsvp, phone: e.target.value })
                        }
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          rsvp.phone &&
                          window.open(
                            `https://wa.me/62${rsvp.phone.replace(/^0/, "")}`,
                            "_blank"
                          )
                        }
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Jumlah Tamu</label>
                    <Input
                      type="number"
                      min={1}
                      value={rsvp.attendees}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setRsvp({ ...rsvp, attendees: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Status</label>
                    <select
                      className="w-full h-10 rounded-md border px-3"
                      value={rsvp.status}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setRsvp({ ...rsvp, status: e.target.value })
                      }
                    >
                      <option>Hadir</option>
                      <option>Mungkin</option>
                      <option>Tidak Hadir</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm">Ucapan</label>
                    <Textarea
                      placeholder={`Ucapan untuk ${CONFIG.couple.bride.name} & ${CONFIG.couple.groom.name}`}
                      value={rsvp.message}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setRsvp({ ...rsvp, message: e.target.value })
                      }
                    />
                  </div>
                </div>
                {/* Tombol Aksi */}
                <div className="flex justify-center items-center gap-3">
                  <Button
                    disabled={sending || sent}
                    onClick={submitRSVP}
                    className="rounded-2xl px-5"
                  >
                    {sent ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}{" "}
                    {sent ? "Terkirim" : sending ? "Mengirim..." : "Kirim RSVP"}
                  </Button>
                  <Button
                    variant="secondary"
                    className="rounded-2xl px-5"
                    onClick={() =>
                      window.open(
                        process.env.NEXT_PUBLIC_APPSCRIPT_URL || "",
                        "_blank"
                      )
                    }
                  >
                    <Share2 className="h-4 w-4 mr-2" /> Lihat Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Section>
        )}

        {/* GIFT */}
        {CONFIG.gift.enabled && (
          <Section
            id="gift"
            title="Kado & Tanda Kasih"
            icon={<Gift className="h-5 w-5" />}
          >
            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {CONFIG.gift.accounts.map((a, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border flex flex-col items-center text-center"
                    >
                      {/* Logo bank */}
                      <img
                        src={a.logo}
                        alt={a.bank}
                        className="h-10 mb-2 object-contain"
                      />

                      {/* Nama Bank */}
                      <div className="text-sm opacity-70">{a.bank}</div>

                      {/* Nomor rekening */}
                      <div className="text-lg font-medium">{a.number}</div>

                      {/* Pemilik rekening */}
                      <div className="text-sm">a.n. {a.name}</div>

                      {/* Tombol copy */}
                      <CopyBadge className="mt-3" text={a.number} />
                    </div>
                  ))}
                </div>

                {/* Alamat pengiriman */}
                <div className="p-4 rounded-xl border text-center">
                  <div className="text-sm opacity-70 mb-1">
                    Alamat Pengiriman
                  </div>
                  <div className="text-sm">{CONFIG.gift.address}</div>
                  <CopyBadge className="mt-3" text={CONFIG.gift.address} />
                </div>
              </CardContent>
            </Card>
          </Section>
        )}

        {/* SHARE */}
        <Section
          id="share"
          title="Bagikan Undangan"
          icon={<Share2 className="h-5 w-5" />}
        >
          <div className="flex justify-center items-center gap-3">
            <Button
              variant="secondary"
              onClick={() =>
                navigator.share
                  ? navigator.share({
                      url: shareUrl,
                      title: "Undangan Pernikahan",
                    })
                  : window.open(shareUrl, "_blank")
              }
            >
              Bagikan Link
            </Button>
            <CopyBadge text={shareUrl} />
          </div>
        </Section>

        {/* FOOTER */}
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
      </div>
    </div>
  );
}
