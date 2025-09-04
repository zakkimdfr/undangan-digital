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
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { Gift, Heart, MapPin, Music2, Send, Share2, TimerReset, Users, Copy, Check, Phone } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// shadcn/ui components (if not present, replace with native elements)
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CONFIG = {
  couple: {
    bride: { name: "Aisyah Nur", parents: "Putri dari Bapak Ahmad & Ibu Siti" },
    groom: { name: "Muhammad Yusuf", parents: "Putra dari Bapak Ali & Ibu Fatimah" },
    hashtag: "#AisyahYusufForever",
    cover: "/cover.jpg",
  },
  events: [
    { type: "Akad Nikah", date: "2025-10-12", time: "08:00 - 10:00 WIB", address: "Masjid Agung Al-Ikhlas, Jl. Merpati No. 12, Bandung", mapUrl: "https://maps.google.com/?q=Masjid+Agung+Al-Ikhlas+Bandung" },
    { type: "Resepsi", date: "2025-10-12", time: "11:00 - 15:00 WIB", address: "Gedung Serbaguna Nusa, Jl. Kenanga No. 5, Bandung", mapUrl: "https://maps.google.com/?q=Gedung+Serbaguna+Nusa+Bandung" },
  ],
  rsvp: { enabled: true, endpoint: "/api/rsvp" },
  gift: { enabled: true, accounts: [ { bank: "BCA", name: "Aisyah Nur", number: "1234567890" }, { bank: "Mandiri", name: "Muhammad Yusuf", number: "9876543210" } ], address: "Jalan Mawar No. 10, Bandung 40123" },
  gallery: { enabled: true, images: [] /* fallback: will fetch from Supabase if configured */ },
  music: { autoplay: false, src: "/music.mp3" },
};

// ---------------------- Helpers ----------------------
function useQuery() {
  const params = useMemo(() => new URLSearchParams(typeof window !== "undefined" ? window.location.search : ""), []);
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

function CopyBadge({ text, className = "" }: { text: string; className?: string }) {
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
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Disalin" : "Salin"}
    </Button>
  );
}

function Section({ id, title, icon, children, subtitle }: any) {
  return (
    <section id={id} className="max-w-3xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-4">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
        {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
        {children}
      </motion.div>
    </section>
  );
}

// ---------------------- Supabase client (browser) ----------------------
const supabase = (function () {
  try {
    if (typeof window === "undefined") return null;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
  } catch (e) {
    return null;
  }
})();

export default function WeddingInvite() {
  const query = useQuery();
  const guestSlug = query.get("to") || undefined;
  const [guestName, setGuestName] = useState<string>("Tamu Undangan");

  const [rsvp, setRsvp] = useState({ name: "", phone: "", attendees: 1, message: "", status: "Hadir" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const [gallery, setGallery] = useState<string[]>(CONFIG.gallery.images.slice(0, 6));

  useEffect(() => {
    if (CONFIG.music.autoplay && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }, []);

  // load guest name from Apps Script (if slug present)
  useEffect(() => {
    async function lookup() {
      if (!guestSlug) return;
      const base = process.env.NEXT_PUBLIC_APPSCRIPT_URL;
      if (!base) return;
      try {
        const res = await fetch(`${base}?action=getGuest&slug=${encodeURIComponent(guestSlug)}`);
        const j = await res.json();
        if (j.found && j.name) setGuestName(j.name);
        else setGuestName(guestSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
      } catch (_) {
        setGuestName(guestSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
      }
    }
    lookup();
  }, [guestSlug]);

  // fetch gallery from Supabase if available
  useEffect(() => {
    async function fetchGallery() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase.from("gallery").select("path").order("uploaded_at", { ascending: false }).limit(12);
        if (error) return;
        const urls = data.map((d: any) => supabase.storage.from("gallery").getPublicUrl(d.path).publicURL);
        setGallery(urls);
      } catch (e) {
        // ignore
      }
    }
    fetchGallery();
  }, []);

  const firstEventDate = CONFIG.events[0]?.date || new Date().toISOString().slice(0, 10);

  async function submitRSVP() {
    setSending(true);
    try {
      const appsUrl = process.env.NEXT_PUBLIC_APPSCRIPT_URL;
      const payload = { ...rsvp, slug: guestSlug || "" };
      if (appsUrl) {
        const res = await fetch(appsUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const j = await res.json();
        if (j.success !== false) {
          setSent(true);
        }
      } else {
        // fallback: store to localStorage (for dev)
        const queue = JSON.parse(localStorage.getItem("rsvp_local") || "[]");
        queue.push({ ...payload, timestamp: new Date().toISOString() });
        localStorage.setItem("rsvp_local", JSON.stringify(queue));
        setSent(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  // parallax example: shift bg image up on scroll
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 400], [0, -120]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-neutral-800">
      {/* HERO */}
      <motion.div style={{ y }} className="relative h-[70vh] w-full overflow-hidden">
        <img src={CONFIG.couple.cover} alt="cover" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-sm tracking-widest uppercase">Undangan Pernikahan</div>
            <h1 className="text-4xl md:text-6xl font-semibold mt-2">{CONFIG.couple.bride.name} & {CONFIG.couple.groom.name}</h1>
            <p className="mt-3 text-sm opacity-90">Kepada Yth. {guestName}</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })} className="rounded-2xl px-5"><Users className="h-4 w-4 mr-2" /> RSVP</Button>
              <Button variant="secondary" onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })} className="rounded-2xl px-5"><MapPin className="h-4 w-4 mr-2" /> Detail Acara</Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3 text-sm">
              <Countdown targetDate={firstEventDate} />
              <span className="opacity-80">{CONFIG.couple.hashtag}</span>
            </div>
          </motion.div>
        </div>

        {/* Music control */}
        <div className="absolute bottom-5 right-5 z-10">
          <Button size="icon" className="rounded-full shadow-lg" onClick={() => {
            const a = audioRef.current;
            if (!a) return;
            if (playing) { a.pause(); setPlaying(false); } else { a.play().catch(() => {}); setPlaying(true); }
          }}>
            <Music2 className="h-5 w-5" />
          </Button>
          <audio ref={audioRef} src={CONFIG.music.src} preload="none" loop />
        </div>
      </motion.div>

      {/* COUPLE */}
      <Section id="couple" title="Mempelai" icon={<Heart className="h-5 w-5" />}>
        <Card className="rounded-2xl">
          <CardContent className="p-6 grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{CONFIG.couple.bride.name}</h3>
              <p className="text-sm opacity-80">{CONFIG.couple.bride.parents}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{CONFIG.couple.groom.name}</h3>
              <p className="text-sm opacity-80">{CONFIG.couple.groom.parents}</p>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* EVENTS */}
      <Section id="events" title="Detail Acara" icon={<MapPin className="h-5 w-5" />}>
        <div className="grid md:grid-cols-2 gap-4">
          {CONFIG.events.map((ev, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <div className="text-sm uppercase tracking-widest opacity-70">{ev.type}</div>
                <div className="text-lg font-medium">{new Date(ev.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
                <div className="text-sm opacity-80">{ev.time}</div>
                <p className="text-sm">{ev.address}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => window.open(ev.mapUrl, "_blank")}>Buka Peta</Button>
                  <CopyBadge text={ev.mapUrl} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      {gallery.length > 0 && (
        <Section id="gallery" title="Galeri" icon={<Users className="h-5 w-5" />}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <motion.img key={i} src={src} alt={`gallery-${i}`} className="w-full h-44 md:h-56 object-cover rounded-2xl cursor-pointer shadow-sm" whileHover={{ scale: 1.02 }} onClick={() => window.open(src, "_blank")} />
            ))}
          </div>
        </Section>
      )}

      {/* RSVP */}
      {CONFIG.rsvp.enabled && (
        <Section id="rsvp" title="Konfirmasi Kehadiran" icon={<Users className="h-5 w-5" />} subtitle="Mohon kesediaannya untuk mengisi formulir berikut.">
          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm">Nama</label>
                  <Input placeholder="Nama lengkap" value={rsvp.name} onChange={(e: any) => setRsvp({ ...rsvp, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">No. HP</label>
                  <div className="flex gap-2">
                    <Input placeholder="08xxxxxxxxxx" value={rsvp.phone} onChange={(e: any) => setRsvp({ ...rsvp, phone: e.target.value })} />
                    <Button variant="outline" size="icon" onClick={() => rsvp.phone && window.open(`https://wa.me/62${rsvp.phone.replace(/^0/, "")}`, "_blank")}>
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Jumlah Tamu</label>
                  <Input type="number" min={1} value={rsvp.attendees} onChange={(e: any) => setRsvp({ ...rsvp, attendees: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Status</label>
                  <select className="w-full h-10 rounded-md border px-3" value={rsvp.status} onChange={(e: any) => setRsvp({ ...rsvp, status: e.target.value })}>
                    <option>Hadir</option>
                    <option>Mungkin</option>
                    <option>Tidak Hadir</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm">Ucapan</label>
                  <Textarea placeholder={`Ucapan untuk ${CONFIG.couple.bride.name} & ${CONFIG.couple.groom.name}`} value={rsvp.message} onChange={(e: any) => setRsvp({ ...rsvp, message: e.target.value })} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button disabled={sending || sent} onClick={submitRSVP} className="rounded-2xl px-5">
                  {sent ? <Check className="h-4 w-4 mr-2" /> : <Send className="h-4 w-4 mr-2" />} {sent ? "Terkirim" : sending ? "Mengirim..." : "Kirim RSVP"}
                </Button>
                <Button variant="secondary" className="rounded-2xl px-5" onClick={() => window.open(process.env.NEXT_PUBLIC_APPSCRIPT_URL || "", "_blank")}>
                  <Share2 className="h-4 w-4 mr-2" /> Lihat Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </Section>
      )}

      {/* GIFT */}
      {CONFIG.gift.enabled && (
        <Section id="gift" title="Kado & Tanda Kasih" icon={<Gift className="h-5 w-5" />}>
          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {CONFIG.gift.accounts.map((a, i) => (
                  <div key={i} className="p-4 rounded-xl border">
                    <div className="text-sm opacity-70">{a.bank}</div>
                    <div className="text-lg font-medium">{a.number}</div>
                    <div className="text-sm">a.n. {a.name}</div>
                    <CopyBadge className="mt-3" text={a.number} />
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl border">
                <div className="text-sm opacity-70 mb-1">Alamat Pengiriman</div>
                <div className="text-sm">{CONFIG.gift.address}</div>
                <CopyBadge className="mt-3" text={CONFIG.gift.address} />
              </div>
            </CardContent>
          </Card>
        </Section>
      )}

      {/* SHARE */}
      <Section id="share" title="Bagikan Undangan" icon={<Share2 className="h-5 w-5" />}>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" onClick={() => navigator.share ? navigator.share({ url: shareUrl, title: "Undangan Pernikahan" }) : window.open(shareUrl, "_blank")}>Bagikan Link</Button>
          <CopyBadge text={shareUrl} />
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="max-w-3xl mx-auto px-4 pb-16 text-center text-sm opacity-70">
        <div className="flex items-center justify-center gap-2">
          <Heart className="h-4 w-4" />
          <span>Terima kasih atas doa dan kehadiran Anda.</span>
        </div>
        <div className="mt-2">© {new Date().getFullYear()} {CONFIG.couple.bride.name} & {CONFIG.couple.groom.name}</div>
      </footer>
    </div>
  );
}

/*
README NOTES (put into project root as .env.example):

NEXT_PUBLIC_APPSCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key

Install required packages:

npm install framer-motion lucide-react @supabase/supabase-js

If you don't use shadcn/ui, replace Card/Button/Input/Textarea with normal elements or your UI lib.

*/
