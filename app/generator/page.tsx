"use client";
import { useState } from "react";
import { Copy, Share2 } from "lucide-react";

type TemplateKey = "islami" | "gaul" | "formal";

const defaultTemplates: Record<TemplateKey, string> = {
  islami: `Assalamu’alaikum Warahmatullahi Wabarakatuh

Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta’ala, serta tanpa mengurangi rasa hormat, kami bermaksud mengundang Saudara/i $nama_tamu untuk hadir pada acara pernikahan kami.

Berikut tautan undangan kami untuk informasi lengkap acara:

$link_undangan

Kami memohon doa restu agar Allah SWT meridhai dan memberkahi pernikahan kami, serta menjadikannya rumah tangga yang Sakinah, Mawaddah, wa Rahmah. Kehadiran dan doa dari Saudara/i akan menjadi kebahagiaan serta kehormatan bagi kami.

Atas doa, restu, dan kehadiran Saudara/i, kami ucapkan terima kasih. Semoga Allah SWT membalas dengan kebaikan yang berlipat ganda.

Wassalamu’alaikum Warahmatullahi Wabarakatuh

Mohon konfirmasi kehadiran melalui tautan undangan yang tertera.`,
  gaul: `Halo $nama_tamu! Kamu diundang di acara pernikahan kami, jangan sampai kelewatan ya. Lihat detailnya di link berikut:

$link_undangan

Sampai jumpa!`,
  formal: `Kepada $nama_tamu

Dengan hormat, kami mengundang Saudara/i untuk hadir pada acara pernikahan kami. Detail lengkap bisa dilihat di:

$link_undangan

Terima kasih atas perhatian dan kehadiran Saudara/i.`,
};

export default function GeneratorPage() {
  const [names, setNames] = useState<string>("");
  const [templateKey, setTemplateKey] = useState<TemplateKey>("islami");
  const [customTemplate, setCustomTemplate] = useState<string>(defaultTemplates[templateKey]);

  const undanganBase = "https://undangan-digital-brown-iota.vercel.app/";

  // Update custom template saat ganti pilihan
  const handleTemplateChange = (key: TemplateKey) => {
    setTemplateKey(key);
    setCustomTemplate(defaultTemplates[key]);
  };

  // Generate pesan per nama
  const generateMessages = () => {
    const list = names
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n.length > 0)
      .map((n) => {
        const slug = encodeURIComponent(n.replace(/\s+/g, "-"));
        const link = `${undanganBase}${slug}`;
        const text = customTemplate
          .replace(/\$nama_tamu/g, n)
          .replace(/\$link_undangan/g, link);
        return { name: n, slug, text, link };
      });
    return list;
  };

  const messages = generateMessages();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Undangan Digital Generator</h1>

      {/* Input Nama */}
      <div>
        <label className="block font-semibold mb-1">Daftar Nama Tamu (pisah per baris)</label>
        <textarea
          className="w-full border rounded p-2 h-32"
          value={names}
          onChange={(e) => setNames(e.target.value)}
        />
      </div>

      {/* Template Pilihan */}
      <div className="flex gap-2 items-center">
        <label className="font-semibold">Pilih Template:</label>
        {(["islami", "gaul", "formal"] as TemplateKey[]).map((k) => (
          <button
            key={k}
            className={`px-3 py-1 rounded ${
              templateKey === k ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTemplateChange(k)}
          >
            {k.charAt(0).toUpperCase() + k.slice(1)}
          </button>
        ))}
        <span className="flex-1 text-sm opacity-70">(Bisa diedit di bawah)</span>
      </div>

      {/* Editable Template */}
      <div>
        <label className="block font-semibold mb-1">Template Pesan:</label>
        <textarea
          className="w-full border rounded p-2 h-40"
          value={customTemplate}
          onChange={(e) => setCustomTemplate(e.target.value)}
        />
      </div>

      {/* Hasil */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Preview Nama Tamu</h2>
        <div className="space-y-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 border rounded hover:shadow-sm"
            >
              <span>{m.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(m.text)}
                  className="p-1 rounded hover:bg-gray-200"
                  title="Copy pesan"
                >
                  <Copy className="h-5 w-5" />
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(m.text)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded hover:bg-green-200"
                  title="Share ke WhatsApp"
                >
                  <Share2 className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
