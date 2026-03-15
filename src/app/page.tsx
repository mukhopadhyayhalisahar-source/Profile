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
import { RainbowBorderButton } from "@/components/ui/rainbow-borders-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { Github, Linkedin, BrainCircuit, Activity, Database, Shield, Zap, Monitor, ArrowRight } from "lucide-react";

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
    1: ["Bridging clinical healthcare and high-performance machine learning. Building AI-integrated hospital systems and computer vision diagnostics."],
    2: ["lynex_core_v2/  gameox_cv_engine.exe  clipper-360-prototype/  sign_language_translator.apk"],
    3: [" [SUCCESS] Connection established. Scroll to explore."],
  };

  const lynexImages = [
    { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200", alt: "Advanced AI Core" },
    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", alt: "Hardware Integration" },
    { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200", alt: "Medical Tech Analysis" },
    { src: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=1200", alt: "Neural Processing" },
    { src: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1200", alt: "Future Lab" },
    { src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200", alt: "Robotic Assistance" },
    { src: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200", alt: "Data Visualization" },
  ];

  const qualificationContent = [
    {
      title: "Medical Education",
      description: "MBBS (Bachelor of Medicine and Bachelor of Surgery) @ Jhargram Government Medical College & Hospital. Focus areas include pathology, microbiology, pharmacology, and emerging intersections between medicine and technology.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 to-emerald-500 text-white p-6 text-center text-xl font-bold">
          Bachelor of Medicine & Surgery
        </div>
      ),
    },
    {
      title: "Technical Interests",
      description: "Alongside medical training, I actively explore fields related to artificial intelligence, automation, and healthcare technology. Key areas: AI in Healthcare, Medical Data Systems, AI Assistants, and Human–Computer Interaction.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500 to-indigo-500 text-white p-6 text-center text-xl font-bold">
          AI & Healthcare Architecture
        </div>
      ),
    },
    {
      title: "Independent Projects",
      description: "Founder of Lynex & Gameox. Project Lynex focuses on modular AI assistants for complex environments, while Gameox explores gesture-operated gaming for health analytics.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-white p-6 text-center text-xl font-bold">
          Systemic Automation Founder
        </div>
      ),
    },
    {
      title: "Contact & Collaborations",
      description: "Open for research collaborations, health technology projects, and open-source development. Located in West Bengal, India. Reach out at lynexmedtech@gmail.com.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-black text-white p-6 text-center">
          <div className="space-y-4">
            <p className="text-sm">lynexmedtech@gmail.com</p>
            <div className="flex justify-center gap-4">
               <Github className="w-6 h-6" />
               <Linkedin className="w-6 h-6" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="bg-black text-white selection:bg-primary/40 overflow-x-hidden">
      {/* Background Pixel Grid - Render early to trigger permission prompt */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <WebcamPixelGrid 
          gridCols={60}
          gridRows={40}
          darken={0.6}
          motionSensitivity={0.5}
          maxElevation={20}
        />
      </div>

      <AnimatePresence mode="wait">
        {!booted && (
          <motion.div
            key="terminal"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6"
          >
            <Terminal 
              commands={terminalCommands}
              outputs={terminalOutputs}
              typingSpeed={45}
              delayBetweenCommands={1000}
              onComplete={() => setBooted(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={booted ? "block relative z-10" : "hidden"}>
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
          <div className="text-xl font-headline font-bold tracking-tighter">
            MUKHO<span className="text-primary">.AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase opacity-60">
            <a href="#vision" className="hover:text-primary transition-colors">Vision</a>
            <a href="#lynex" className="hover:text-primary transition-colors">Lynex</a>
            <a href="#gameox" className="hover:text-primary transition-colors">Gameox</a>
            <a href="#profile" className="hover:text-primary transition-colors">Profile</a>
          </div>
          <RainbowButton onClick={() => window.open('https://www.linkedin.com/in/ayan-mukhopadhyay1', '_blank')}>
            Connect
          </RainbowButton>
        </nav>

        {/* Hero Section */}
        <section id="vision" className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 pointer-events-none z-[1]" />
          
          <div className="relative z-10 max-w-5xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70 backdrop-blur-sm"
            >
              Medical Student x AI Innovator &rarr;
            </motion.div>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-headline font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              Medicine, AI, and the <br />
              <span className="text-primary">Future of Intelligent Hospitals.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 font-body leading-relaxed">
              Medical student at Jhargram Government Medical College building AI assistants and healthcare systems designed for the next generation of medicine.
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

        {/* 3D Showcase */}
        <section className="px-6 py-20 bg-black">
          <div className="max-w-7xl mx-auto">
            <Card className="w-full h-[600px] bg-neutral-900/50 border-white/10 relative overflow-hidden rounded-3xl group">
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={600} />
              <div className="flex flex-col lg:flex-row h-full">
                <div className="flex-1 p-12 relative z-10 flex flex-col justify-center space-y-6">
                  <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-white">
                    Interactive <br /> <span className="text-primary">Medical 3D.</span>
                  </h2>
                  <p className="text-neutral-400 max-w-lg text-lg leading-relaxed font-body">
                    Bring UI to life with beautiful 3D scenes. Creating immersive experiences that bridge the gap between clinical data and intuitive visualization.
                  </p>
                  <div className="pt-4">
                    <RainbowBorderButton>View Architecture</RainbowBorderButton>
                  </div>
                </div>
                <div className="flex-1 relative h-[300px] lg:h-full">
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Project Lynex - Zoom Parallax */}
        <section id="lynex" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-6 mb-20 text-center space-y-4">
            <h2 className="text-5xl md:text-7xl font-headline font-bold">Project Lynex</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-body">
              A modular AI assistant designed to function as a personal companion, productivity system, and intelligent automation platform.
            </p>
          </div>
          <ZoomParallax images={lynexImages} />
          
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-32 border-t border-white/5">
             <div className="space-y-8">
               <h3 className="text-3xl font-headline font-bold">The Vision for Lynex</h3>
               <p className="text-neutral-400 leading-relaxed font-body text-lg">
                 Lynex goes beyond traditional voice assistants. It's built to understand context, learn user preferences, and automate complex workflows. The long-term goal is to explore how such assistants could support future intelligent hospitals.
               </p>
               <div className="grid grid-cols-2 gap-6">
                 {[
                   { icon: Zap, label: "Neural Processing", desc: "Edge inference optimized." },
                   { icon: Shield, label: "Privacy First", desc: "Local-first architecture." },
                   { icon: Database, label: "Contextual Memory", desc: "Deep learning modules." },
                   { icon: Monitor, label: "Omni-Channel", desc: "Cross-device sync." }
                 ].map((item, i) => (
                   <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                     <item.icon className="w-5 h-5 text-primary mb-2" />
                     <h4 className="font-bold text-sm">{item.label}</h4>
                     <p className="text-xs text-neutral-500">{item.desc}</p>
                   </div>
                 ))}
               </div>
               <RainbowBorderButton onClick={() => window.open('https://github.com/SONIC445-BYTE', '_blank')}>
                 Explore Source Code
               </RainbowBorderButton>
             </div>
             <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
                  alt="Lynex AI Interface" 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
             </div>
          </div>
        </section>

        {/* Project Gameox - Macbook Scroll */}
        <section id="gameox" className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-4 mb-20">
            <h2 className="text-5xl md:text-7xl font-headline font-bold">Gameox</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-body">
              Gesture-Operated Health Analytics Game. Gamifying rehabilitation and monitoring motor functions through computer vision.
            </p>
          </div>
          
          <MacbookScroll 
            title="Gesture-Operated Space Shooter"
            src="https://images.unsplash.com/photo-1550741113-5744f66ad05a?auto=format&fit=crop&q=80&w=1200"
          />

          <div className="max-w-4xl mx-auto px-6 py-32 space-y-12 text-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-headline font-bold">The Science of Movement</h3>
              <p className="text-xl text-neutral-400 leading-relaxed font-body">
                By analyzing gesture patterns—movement speed, reaction time, and stability—Gameox generates session reports exploring indicators for motor coordination, opening possibilities for non-invasive monitoring.
              </p>
            </div>
            <div className="flex justify-center gap-6">
              <RainbowBorderButton onClick={() => window.open('https://github.com/SONIC445-BYTE/Test-gameox', '_blank')}>
                Launch GitHub Repo
              </RainbowBorderButton>
            </div>
            <p className="text-neutral-500 italic mt-20 text-xl">And much more exciting projects coming up...</p>
          </div>
        </section>

        {/* Sticky Scroll Reveal - Qualifications */}
        <section id="profile" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-center">Educational Profile</h2>
          </div>
          <StickyScroll content={qualificationContent} />
          
          <div className="max-w-4xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
            <Card className="p-8 bg-neutral-900/50 border-white/5 flex flex-col items-center text-center space-y-6 group hover:border-primary/20 transition-all">
              <Github className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="text-xl font-bold">Open Source</h4>
                <p className="text-neutral-400 text-sm mt-2">Check out my latest experiments and prototypes.</p>
              </div>
              <RainbowButton onClick={() => window.open('https://github.com/SONIC445-BYTE', '_blank')}>
                GitHub Profile
              </RainbowButton>
            </Card>
            
            <Card className="p-8 bg-neutral-900/50 border-white/5 flex flex-col items-center text-center space-y-6 group hover:border-primary/20 transition-all">
              <Linkedin className="w-12 h-12 text-[#0A66C2] group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="text-xl font-bold">Professional Network</h4>
                <p className="text-neutral-400 text-sm mt-2">Let's discuss collaborations in MedTech.</p>
              </div>
              <RainbowButton onClick={() => window.open('https://www.linkedin.com/in/ayan-mukhopadhyay1', '_blank')}>
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