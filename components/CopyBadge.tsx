"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function CopyBadge({ text, className = "" }: { text: string; className?: string }) {
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
