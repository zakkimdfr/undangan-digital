"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CONFIG from "@/config";
import Section from "./Section";
import CopyBadge from "./CopyBadge";
import { MapPin } from "lucide-react";
import React from "react";

export default function Events() {
  return (
    <Section id="events" title="Detail Acara" icon={<MapPin className="h-5 w-5" />}>
      <div className="grid md:grid-cols-2 gap-4">
        {CONFIG.events.map((ev, i) => (
          <Card key={i} className="rounded-2xl">
            <CardContent className="p-6 space-y-3 text-center">
              <div className="text-sm uppercase tracking-widest opacity-70">{ev.type}</div>
              <div className="text-lg font-medium">
                {new Date(ev.date).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",    
                  year: "numeric",
                })}
              </div>
              {ev.time && <div className="text-sm opacity-80">{ev.time}</div>}
              <p className="text-sm whitespace-pre-line">{ev.address}</p>
              {ev.mapUrl && (
                <div className="flex justify-center gap-2">
                  <Button size="sm" variant="secondary" onClick={() => window.open(ev.mapUrl!, "_blank")}>
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
  );
}
