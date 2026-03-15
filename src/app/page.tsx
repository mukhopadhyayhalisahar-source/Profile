"use client";

import React, { useState, useEffect } from "react";
import { Terminal } from "@/components/ui/terminal";
import { WebcamPixelGrid } from "@/components/ui/webcam-pixel-grid";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { RainbowBorderButton } from "@/components/ui/rainbow-borders-button";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { ArrowRight, Zap, Shield, Database, Monitor } from "lucide-react";

// Peerlist style badge
const Badge = ({ className }: { className?: string }) => {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
        fill="#00AA45"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
        fill="#219653"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
        fill="#24292E"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
        fill="white"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
        fill="#24292E"
      ></path>
    </svg>
  );
};

export default function Home() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const terminalCommands = [
    "whoami",
    "cat mission.txt",
    "ls ./current_focus",
    "./initialize_portfolio.sh",
  ];

  const terminalOutputs = {
    0: ["Mukho. Medical Student @ Jhargram Government Medical College. Founder @ Lynex."],
    1: ["Bridging clinical healthcare and high-performance machine learning. Building AI-integrated hospital systems."],
    2: ["lynex_core_v2/  gameox_cv_engine.exe  clipper-360-prototype/"],
    3: [" [SUCCESS] Connection established. Scroll to explore."],
  };

  const lynexImages = [
    { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200", alt: "AI Core" },
    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", alt: "Hardware" },
    { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200", alt: "MedTech" },
    { src: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=1200", alt: "Neural" },
    { src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200", alt: "Robotics" },
    { src: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200", alt: "Data" },
  ];

  const qualificationContent = [
    {
      title: "Medical Education",
      description: "MBBS @ Jhargram Government Medical College. Focus on pathology, microbiology, and emerging MedTech intersections.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 to-emerald-500 text-white p-6 text-center text-xl font-bold">
          Bachelor of Medicine & Surgery
        </div>
      ),
    },
    {
      title: "Technical Projects",
      description: "Founder of Lynex (AI Assistant) and Gameox (Health Analytics). Bridging clinical data with automated systems.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500 to-indigo-500 text-white p-6 text-center text-xl font-bold">
          AI & Healthcare Architecture
        </div>
      ),
    },
  ];

  return (
    <main className="bg-black text-white selection:bg-primary/40 overflow-x-hidden min-h-screen">
      {/* Interactive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <WebcamPixelGrid 
          gridCols={60}
          gridRows={40}
          maxElevation={60}
          motionSensitivity={0.3}
          elevationSmoothing={0.12}
          className="opacity-40"
        />
      </div>

      <AnimatePresence mode="wait">
        {!booted && (
          <motion.div
            key="terminal"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <Terminal 
              commands={terminalCommands}
              outputs={terminalOutputs}
              typingSpeed={45}
              onComplete={() => setBooted(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={booted ? "block relative z-10" : "hidden"}>
        <nav className="fixed top-0 left-0 right-0 z-[60] px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
          <div className="text-xl font-headline font-bold">MUKHO<span className="text-primary">.AI</span></div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest opacity-60">
            <a href="#vision">Vision</a>
            <a href="#lynex">Lynex</a>
            <a href="#gameox">Gameox</a>
            <a href="#profile">Profile</a>
          </div>
          <RainbowButton onClick={() => window.open('https://linkedin.com/in/ayan-mukhopadhyay1', '_blank')}>
            Connect
          </RainbowButton>
        </nav>

        <section id="vision" className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-[1]" />
          <div className="relative z-10 max-w-5xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70 backdrop-blur-sm"
            >
              Medical Student x AI Innovator &rarr;
            </motion.div>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-headline font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              Future of <br />
              <span className="text-primary animate-glow">Intelligent Hospitals.</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-400 font-body">
              Building AI assistants and healthcare systems designed for the next generation of clinical practice.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-4">
              <button 
                onClick={() => document.getElementById('lynex')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-bold text-black transition-all hover:bg-white/90 hover:scale-105"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10">
                View Documentation
              </button>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 bg-black">
          <div className="max-w-7xl mx-auto">
            <Card className="w-full h-[600px] bg-neutral-900/50 border-white/10 relative overflow-hidden rounded-3xl">
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={600} />
              <div className="flex flex-col lg:flex-row h-full">
                <div className="flex-1 p-12 relative z-10 flex flex-col justify-center space-y-6">
                  <h2 className="text-4xl md:text-6xl font-headline font-bold text-white">
                    Interactive <br /> <span className="text-primary">Medical 3D.</span>
                  </h2>
                  <p className="text-neutral-400 max-w-lg text-lg leading-relaxed font-body">
                    Immersive experiences that bridge clinical data and intuitive 3D visualization.
                  </p>
                  <div className="pt-4">
                    <RainbowBorderButton>View Architecture</RainbowBorderButton>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="lynex" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-6 mb-20 text-center space-y-4">
            <h2 className="text-5xl md:text-7xl font-headline font-bold">Project Lynex</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-body">Modular AI Assistant architecture for personal productivity and intelligent automation.</p>
          </div>
          <ZoomParallax images={lynexImages} />
          
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-32 border-t border-white/5">
             <div className="space-y-8">
               <h3 className="text-3xl font-headline font-bold">The Vision for Lynex</h3>
               <p className="text-neutral-400 leading-relaxed font-body text-lg">Understanding context, learning preferences, and automating hospital workflows.</p>
               <div className="grid grid-cols-2 gap-6">
                 {[
                   { icon: Zap, label: "Neural Core", desc: "Edge inference optimized." },
                   { icon: Shield, label: "Private", desc: "Local-first architecture." },
                   { icon: Database, label: "Memory", desc: "Deep learning context." },
                   { icon: Monitor, label: "Sync", desc: "Cross-device automation." }
                 ].map((item, i) => (
                   <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                     <item.icon className="w-5 h-5 text-primary mb-2" />
                     <h4 className="font-bold text-sm">{item.label}</h4>
                     <p className="text-xs text-neutral-500">{item.desc}</p>
                   </div>
                 ))}
               </div>
               <RainbowBorderButton onClick={() => window.open('https://github.com/SONIC445-BYTE', '_blank')}>
                 Explore Code
               </RainbowBorderButton>
             </div>
             <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
                  alt="Lynex AI Interface" 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
             </div>
          </div>
        </section>

        <section id="gameox" className="bg-black relative z-20 overflow-visible">
          <div className="relative z-30 bg-black">
            <MacbookScroll 
              title={
                <span>
                  Gameox: Gesture-Operated <br /> Health Analytics.
                </span>
              }
              badge={
                <button onClick={() => window.open('https://github.com/mukhopadhyayhalisahar-source/Profile/issues/1', '_blank')}>
                  <Badge className="h-10 w-10 -rotate-12 transform hover:scale-110 transition-transform" />
                </button>
              }
              src="https://github.com/user-attachments/assets/c6b07f4d-2222-4c76-9b75-e10040ddd5a9"
              showGradient={false}
            />
          </div>

          <div className="max-w-4xl mx-auto px-6 py-32 space-y-12 text-center border-t border-white/5 relative z-10 bg-black">
            <h3 className="text-3xl font-headline font-bold">The Science of Movement</h3>
            <p className="text-xl text-neutral-400 leading-relaxed font-body">Analyzing gesture patterns—speed, reaction time, and stability—to monitor motor coordination via computer vision.</p>
            <div className="flex justify-center gap-6">
              <RainbowBorderButton onClick={() => window.open('https://github.com/SONIC445-BYTE/Test-gameox', '_blank')}>
                Launch Repo
              </RainbowBorderButton>
            </div>
          </div>
        </section>

        <section id="profile" className="py-20 bg-black relative z-30">
          <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
            <h2 className="text-4xl md:text-6xl font-headline font-bold">Educational Profile</h2>
          </div>
          <StickyScroll content={qualificationContent} />
          
          <div className="max-w-4xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
            <Card className="p-8 bg-neutral-900/50 border-white/5 flex flex-col items-center text-center space-y-6 group">
              <Github className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
              <RainbowButton onClick={() => window.open('https://github.com/SONIC445-BYTE', '_blank')}>
                GitHub Profile
              </RainbowButton>
            </Card>
            <Card className="p-8 bg-neutral-900/50 border-white/5 flex flex-col items-center text-center space-y-6 group">
              <Linkedin className="w-12 h-12 text-[#0A66C2] group-hover:scale-110 transition-transform" />
              <RainbowButton onClick={() => window.open('https://linkedin.com/in/ayan-mukhopadhyay1', '_blank')}>
                LinkedIn Profile
              </RainbowButton>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

function Github({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
  );
}

function Linkedin({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  );
}
