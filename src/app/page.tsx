"use client";

import React, { useState } from "react";
import { TerminalIntro } from "@/components/terminal-intro";
import { HeroSection } from "@/components/hero-section";
import { ProjectInsights } from "@/components/project-insights";
import { ProjectLynex } from "@/components/project-lynex";
import { ProjectGameox } from "@/components/project-gameox";
import { Milestones } from "@/components/milestones";
import { ContactSection } from "@/components/contact-section";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <main className="relative selection:bg-primary/40 selection:text-white">
      {!booted && (
        <TerminalIntro onComplete={() => setBooted(true)} />
      )}

      <AnimatePresence>
        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-background/20 border-b border-border/10">
              <div className="text-xl font-headline font-bold tracking-tighter">
                NEURAL<span className="text-primary">CANVAS</span>
              </div>
              <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
                <a href="#" className="hover:text-primary transition-colors">VISION</a>
                <a href="#" className="hover:text-primary transition-colors">LYNEX</a>
                <a href="#" className="hover:text-primary transition-colors">GAMEOX</a>
                <a href="#" className="hover:text-primary transition-colors">MILESTONES</a>
              </div>
              <button className="px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold hover:bg-primary hover:text-white transition-all tracking-widest uppercase">
                Connect
              </button>
            </nav>

            <HeroSection />
            <ProjectInsights />
            
            <div id="lynex">
              <ProjectLynex />
            </div>

            <div id="gameox">
              <ProjectGameox />
            </div>

            <Milestones />
            <ContactSection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}