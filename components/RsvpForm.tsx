"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Send, Share2, Phone, Users } from "lucide-react";
import CONFIG from "@/config";
import Section from "./Section";

export default function RSVPForm() {
  const [rsvp, setRsvp] = useState({ name: "", phone: "", attendees: 1, message: "", status: "Hadir" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function submitRSVP() {
    setSending(true);
    try {
      const appsUrl = process.env.NEXT_PUBLIC_APPSCRIPT_URL;
      const payload = { ...rsvp, timestamp: new Date().toISOString() };
      if (appsUrl) {
        await fetch(appsUrl, { method: "POST", body: JSON.stringify(payload) });
      } else {
        const queue = JSON.parse(localStorage.getItem("rsvp_local") || "[]");
        queue.push(payload);
        localStorage.setItem("rsvp_local", JSON.stringify(queue));
      }
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  if (!CONFIG.rsvp.enabled) return null;

  return (
    <Section
      id="rsvp"
      title="Konfirmasi Kehadiran"
      icon={<Users className="h-5 w-5" />}
      subtitle="Mohon kesediaannya untuk mengisi formulir berikut."
    >
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4 text-left">
          <div className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Nama" value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} />
            <Input placeholder="No. HP" value={rsvp.phone} onChange={(e) => setRsvp({ ...rsvp, phone: e.target.value })} />
            <Input
              type="number"
              min={1}
              value={rsvp.attendees}
              onChange={(e) => setRsvp({ ...rsvp, attendees: Number(e.target.value) })}
            />
            <select className="w-full h-10 rounded-md border px-3" value={rsvp.status} onChange={(e) => setRsvp({ ...rsvp, status: e.target.value })}>
              <option>Hadir</option>
              <option>Mungkin</option>
              <option>Tidak Hadir</option>
            </select>
            <Textarea placeholder="Ucapan" value={rsvp.message} onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })} />
          </div>
          <div className="flex justify-center items-center gap-3">
            <Button disabled={sending || sent} onClick={submitRSVP}>
              {sent ? <Check className="h-4 w-4 mr-2" /> : <Send className="h-4 w-4 mr-2" />} {sent ? "Terkirim" : "Kirim RSVP"}
            </Button>
            <Button variant="secondary" onClick={() => window.open(process.env.NEXT_PUBLIC_APPSCRIPT_URL || "", "_blank")}>
              <Share2 className="h-4 w-4 mr-2" /> Lihat Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}
