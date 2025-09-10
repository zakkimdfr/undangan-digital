"use client";
import { Card, CardContent } from "@/components/ui/card";
import Section from "./Section";
import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CONFIG from "@/config";

const images = ["/thankyou1.jpg", "/thankyou2.jpg", "/thankyou3.jpg"];

export default function ThankYou() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <Section
      id="thankyou"
      title="Ucapan Terima Kasih"
      icon={<Heart className="h-5 w-5" />}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="rounded-2xl md:col-span-2">
          <CardContent className="p-6 space-y-3 text-center">
            {/* Carousel */}
            <div className="relative w-full max-w-md mx-auto aspect-[4/3] overflow-hidden rounded-2xl shadow-md mb-6">
              {images.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`thankyou-${i}`}
                  fill
                  className={`object-cover transition-opacity duration-700 ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>

            {/* Text */}
            <p className="text-sm text-neutral-700 whitespace-pre-line">
              {/* Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda
              berkenan hadir dan memberikan do&apos;a restunya atas pernikahan
              kami. */}
              {CONFIG.thankyou.text1}
            </p>
            <p className="text-sm text-neutral-700 whitespace-pre-line">
              {/* Atas do&apos;a dan restunya{"\n"}Kami ucapkan Terima Kasih. */}
              {CONFIG.thankyou.text2    }
            </p>
            <p className="text-5xl font-handwriting text-cyan-600 mt-4">
              Salma & Zakki
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
