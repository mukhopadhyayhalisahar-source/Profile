"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { Monitor, Zap, Shield, Database } from "lucide-react";

export function ProjectLynex() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  const lynexImage = PlaceHolderImages.find(img => img.id === 'lynex-showcase');

  return (
    <section ref={containerRef} className="py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div style={{ scale, opacity, y }} className="space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="px-4 py-1 text-sm">Flagship Project</Badge>
            <h2 className="text-5xl md:text-6xl font-headline font-bold">Lynex AI</h2>
            <p className="text-xl text-muted-foreground">The Intelligent Personal AI Assistant designed to optimize cognitive performance and automate complex decision-making workflows.</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <Zap className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-bold">Neural Processing</h4>
              <p className="text-sm text-muted-foreground">Sub-second response times using optimized edge inference.</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <Shield className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-bold">Privacy First</h4>
              <p className="text-sm text-muted-foreground">Local-first architecture ensures your data stays yours.</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <Database className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-bold">Contextual Memory</h4>
              <p className="text-sm text-muted-foreground">Deep learning memory modules for long-term task continuity.</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <Monitor className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-bold">Omni-Channel</h4>
              <p className="text-sm text-muted-foreground">Seamlessly synchronized across all your digital touchpoints.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          style={{ 
            opacity,
            x: useTransform(scrollYProgress, [0, 0.5], [100, 0])
          }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-primary/20 bg-card">
            <Image 
              src={lynexImage?.imageUrl || "https://picsum.photos/seed/lynex/800/800"} 
              alt="Lynex AI Showcase"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              data-ai-hint="ai assistant interface"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
          
          <div className="absolute -bottom-8 -left-8 p-6 bg-card border border-border rounded-xl shadow-2xl hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold">Lynex Intelligence</p>
                <p className="text-sm text-muted-foreground">V 2.1.0-beta</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BrainCircuit(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4.5V2" />
      <path d="m4.929 7.071-1.768-1.768" />
      <path d="M2.5 12H1" />
      <path d="m4.929 16.929-1.768 1.768" />
      <path d="M12 19.5V22" />
      <path d="m19.071 16.929 1.768 1.768" />
      <path d="M21.5 12H23" />
      <path d="m19.071 7.071 1.768-1.768" />
      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}