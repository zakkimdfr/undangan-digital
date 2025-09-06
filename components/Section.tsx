"use client";
import { motion } from "framer-motion";
import { ReactNode, ReactElement } from "react";

interface SectionProps {
  id: string;
  title: string;
  icon?: ReactElement;
  children: ReactNode;
  subtitle?: string;
}

export default function Section({ id, title, icon, children, subtitle }: SectionProps) {
  return (
    <section id={id} className="max-w-3xl mx-auto px-4 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 justify-center">
          {icon}
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
        {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
        <div className="w-full">{children}</div>
      </motion.div>
    </section>
  );
}
