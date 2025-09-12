"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card"; // Hanya butuh Card, bukan CardContent
import Section from "./Section";
import { BookOpen } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { id } from "date-fns/locale";

type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEntries();

    const channel = supabase
      .channel("guestbook-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          setEntries((prev) => [payload.new as GuestbookEntry, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchEntries() {
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching guestbook:", error.message);
      return;
    }
    if (data) setEntries(data as GuestbookEntry[]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setLoading(true);

    const { error } = await supabase
      .from("guestbook")
      .insert([{ name, message }]);

    if (error) {
      console.error("Error inserting guestbook entry:", error.message);
    } else {
      setName("");
      setMessage("");
    }

    setLoading(false);
  }

  return (
    <Section
      id="guestbook"
      title="Ucapan dan Do'a"
      icon={<BookOpen className="h-5 w-5" />}
    >
      {/* ===========================================
        PERUBAHAN UTAMA ADA DI SINI 
        ===========================================
      */}
      <Card className="rounded-2xl h-[500px] flex flex-col">
        {/* Bagian Form (Ukuran statis) */}
        <div className="p-6 border-b">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-2"
          >
            <input
              type="text"
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Ucapan & Doa"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-lg text-sm disabled:opacity-50"
            >
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </form>
        </div>

        {/* Bagian Daftar Komentar (Fleksibel dan bisa scroll) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {entries.length === 0 && !loading && (
            <p className="text-sm text-neutral-500 text-center pt-4">
              Belum ada ucapan, jadilah yang pertama! 🎉
            </p>
          )}
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-3 border rounded-lg bg-neutral-50 text-left"
            >
              <div className="text-sm font-medium">{entry.name}</div>
              <p className="text-sm mt-1 break-words">{entry.message}</p>
              <div className="text-xs text-neutral-500 mt-2">
                {formatDistanceToNow(new Date(entry.created_at), {
                  addSuffix: true,
                  locale: id,
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}