"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { Activity, Gamepad2, HeartPulse, Target, ShieldCheck } from "lucide-react";

export function ProjectGameox() {
  const gameoxImage = PlaceHolderImages.find(img => img.id === 'gameox-showcase');

  return (
    <section className="py-32 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Gamepad2 className="w-12 h-12 text-secondary mx-auto mb-4" />
          </motion.div>
          <h2 className="text-5xl font-headline font-bold">Gameox</h2>
          <p className="text-xl text-muted-foreground">Gesture-Operated Health Analytics Game. Gamifying rehabilitation and physical assessment through cutting-edge computer vision.</p>
        </div>

        <div className="relative mx-auto max-w-4xl aspect-[16/10] rounded-t-3xl border-t-8 border-x-8 border-muted bg-muted overflow-hidden shadow-2xl">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full h-full relative"
          >
            <Image 
              src={gameoxImage?.imageUrl || "https://picsum.photos/seed/gameox/1200/800"} 
              alt="Gameox Interface"
              fill
              className="object-cover"
              data-ai-hint="medical game interface"
            />
            <div className="absolute inset-0 bg-secondary/10 hover:bg-transparent transition-colors duration-500" />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: Activity, title: "Real-time Tracking", desc: "Latency-free motion capturing for precise movement analysis." },
            { icon: HeartPulse, title: "Biofeedback", desc: "Integrates with wearable devices for comprehensive health metrics." },
            { icon: Target, title: "Precision Drills", desc: "Gamified physical therapy routines tailored to patient needs." },
            { icon: ShieldCheck, title: "Clinical Validated", desc: "Built on medical protocols for reliable diagnostic data." },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <feature.icon className="w-8 h-8 text-secondary" />
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}