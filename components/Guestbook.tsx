"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

  useEffect(() => {
    fetchEntries();

    // subscribe realtime
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
    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setEntries(data as GuestbookEntry[]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !message) return;
    await supabase.from("guestbook").insert([{ name, message }]);
    setName("");
    setMessage("");
  }

  return (
    <Section
      id="guestbook"
      title="Buku Tamu"
      icon={<BookOpen className="h-5 w-5" />}
    >
      <Card className="rounded-2xl max-h-[500px] flex flex-col">
        <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
          {/* Form input */}
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
            />
            <input
              type="text"
              placeholder="Ucapan & Doa"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg text-sm"
            >
              Kirim
            </button>
          </form>

          {/* Daftar komentar */}
          <div className="overflow-y-auto flex-1 space-y-3 pr-2">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-3 border rounded-lg bg-neutral-50"
              >
                <div className="flex justify-between items-center text-sm font-medium">
                  <span>{entry.name}</span>
                </div>

                <p className="text-sm mt-1">{entry.message}</p>

                <div className="text-xs text-neutral-500 mt-2 text-left">
                  {formatDistanceToNow(new Date(entry.created_at), {
                    addSuffix: true,
                    locale: id,
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}
