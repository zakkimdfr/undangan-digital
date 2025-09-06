"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Gift } from "lucide-react";
import CONFIG from "@/config";
import Section from "./Section";
import CopyBadge from "./CopyBadge";
import Image from "next/image";

export default function GiftSection() {
  if (!CONFIG.gift.enabled) return null;

  return (
    <Section id="gift" title="Kado & Tanda Kasih" icon={<Gift className="h-5 w-5" />}>
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {CONFIG.gift.accounts.map((a, i) => (
              <div key={i} className="p-4 rounded-xl border flex flex-col items-center text-center">
                <div className="relative w-20 h-10 mb-2">
                  <Image src={a.logo} alt={a.bank} fill className="object-contain" />
                </div>
                <div className="text-sm opacity-70">{a.bank}</div>
                <div className="text-lg font-medium">{a.number}</div>
                <div className="text-sm">a.n. {a.name}</div>
                <CopyBadge className="mt-3" text={a.number} />
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl border text-center">
            <div className="text-sm opacity-70 mb-1">Alamat Pengiriman</div>
            <div className="text-sm">{CONFIG.gift.address}</div>
            <CopyBadge className="mt-3" text={CONFIG.gift.address} />
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}
