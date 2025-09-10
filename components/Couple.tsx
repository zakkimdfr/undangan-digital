"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Instagram } from "lucide-react";
import CONFIG from "@/config";
import Section from "./Section";

export default function Couple() {
  return (
    <Section id="couple" title="Mempelai" icon={<Heart className="h-5 w-5" />}>
      <Card className="rounded-2xl">
        <CardContent className="p-6 grid md:grid-cols-2 gap-6 items-center">
          {/* Bride */}
          <div className="space-y-2 text-center">
            <Image
              src={CONFIG.couple.bride.photo}
              alt={CONFIG.couple.bride.name}
              width={160}
              height={160}
              className="mx-auto rounded-full object-cover shadow-lg"
            />
            <h3 className="text-xl font-semibold">{CONFIG.couple.bride.name}</h3>
            <p className="text-sm opacity-80 whitespace-pre-line">
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
            <Image
              src={CONFIG.couple.groom.photo}
              alt={CONFIG.couple.groom.name}
              width={160}
              height={160}
              className="mx-auto rounded-full object-cover shadow-lg"
            />
            <h3 className="text-xl font-semibold">{CONFIG.couple.groom.name}</h3>
            <p className="text-sm opacity-80 whitespace-pre-line">
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
  );
}
