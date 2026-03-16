
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
import { HeroAscii } from "@/components/ui/hero-ascii";
import { MedicalDashboard } from "@/components/MedicalDashboard";
import { AdvancedAILab } from "@/components/medical-ai";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { 
  ArrowRight, Mail, MapPin, Rocket, Target, 
  BrainCircuit, Activity, AlertCircle, Cpu, Zap, Eye, Info
} from "lucide-react";

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
    "cat long_term_goal.txt",
    "./initialize_portfolio.sh",
  ];

  const terminalOutputs = {
    0: ["Ayan Mukhopadhyay", "Medical Student @ Jhargram Government Medical College", "AI Research Builder | Founder @ Project Ovexis"],
    1: ["Redesigning healthcare using AI, computer vision, and intelligent hospital infrastructure."],
    2: ["ovexis_core_v2/", "gameox_cv_engine/", "clipper_360_prototype/", "sign_language_translator/"],
    3: ["Building the world's first AI-native hospital ecosystem."],
    4: ["[SUCCESS] Connection established. Scroll to explore."],
  };

  const ovexisParallaxImages = [
    { src: 'https://github.com/user-attachments/assets/c466d05f-5628-4116-98e1-98fb017348bf', alt: 'Ovexis Core' },
    { src: 'https://github.com/user-attachments/assets/4e0dc5bf-5639-4aaa-a117-c665fec5f5c5', alt: 'Ovexis System Interface' },
    { src: 'https://github.com/user-attachments/assets/f0bf1cd2-96ba-4e92-b529-3cb2942f0531', alt: 'Ovexis Neural Node' },
    { src: 'https://github.com/user-attachments/assets/8b56ae54-b536-46a1-9cd6-589089dcc3d1', alt: 'Ovexis Data Analytics' },
    { src: 'https://github.com/user-attachments/assets/6c27a12c-eec8-414e-a846-2472576b7b74', alt: 'Ovexis Visual Protocol' },
  ];

  const profileContent = [
    {
      title: "1. Medical Education",
      description: "MBBS (Bachelor of Medicine and Bachelor of Surgery) at Jhargram Government Medical College & Hospital, West Bengal, India. Currently Pursuing. Focus areas include pathology, microbiology, pharmacology, and emerging intersections between medicine and technology.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 to-emerald-500 text-white p-6 text-center font-bold text-xl">
          Medical Education
        </div>
      ),
    },
    {
      title: "2. Technical Interests",
      description: "Alongside medical training, I actively explore fields related to artificial intelligence, automation, and healthcare technology. My work focuses on developing experimental tools and systems that explore the role of intelligent technologies in future healthcare environments. Key areas include Medical Data Systems, AI Assistants, and Human–Computer Interaction.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-6 text-center font-bold text-xl">
          Technical Interests
        </div>
      ),
    },
    {
      title: "3. Independent Projects",
      description: "Project Ovexis: Development of a modular AI assistant designed to automate workflows and explore healthcare integration. Gameox: Gesture-operated space shooter game designed to explore gameplay motion data for health analytics and neurological monitoring.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-white p-6 text-center font-bold text-xl">
          Independent Projects
        </div>
      ),
    },
    {
      title: "4. Skills",
      description: "Python Programming, AI Tool Integration, Computer Vision Concepts, Voice Interface Development, Technical Writing and Documentation, Digital Content Design (Canva).",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500 text-white p-6 text-center font-bold text-xl">
          Technical Skills
        </div>
      ),
    },
    {
      title: "5. Contact & Socials",
      description: "Based in West Bengal, India. Open for research collaborations, health technology projects, and AI innovation initiatives.",
      content: (
        <div className="flex flex-col h-full w-full items-center justify-center bg-slate-900 p-8 gap-6">
           <RainbowButton onClick={() => window.open('https://github.com/SONIC445-BYTE', '_blank')}>
            GitHub Profile
          </RainbowButton>
          <RainbowButton onClick={() => window.open('https://www.linkedin.com/in/ayan-mukhopadhyay1', '_blank')}>
            LinkedIn Profile
          </RainbowButton>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Mail className="w-4 h-4" />
            lynexmedtech@gmail.com
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="bg-black text-white selection:bg-primary/40 overflow-x-hidden min-h-screen">
      <AnimatePresence mode="wait">
        {!booted && (
          <motion.div
            key="terminal"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6"
          >
            <Terminal 
              commands={terminalCommands}
              outputs={terminalOutputs}
              typingSpeed={45}
              onComplete={() => setBooted(true)}
              user="lynex"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={booted ? "block relative" : "hidden"}>
        <nav className="fixed top-0 left-0 right-0 z-[60] px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
          <div className="text-xl font-headline font-bold">LYNEX</div>
          <RainbowButton onClick={() => window.open('https://linkedin.com/in/ayan-mukhopadhyay1', '_blank')}>
            Connect
          </RainbowButton>
        </nav>

        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0">
            <WebcamPixelGrid 
              gridCols={60}
              gridRows={40}
              maxElevation={50}
              motionSensitivity={0.25}
              elevationSmoothing={0.2}
              backgroundColor="#030303"
              mirror={true}
              gapRatio={0.05}
              darken={0.6}
              className="w-full h-full"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm"
            >
              Medical Student x AI Innovator &rarr;
            </motion.div>
            <h1 className="mb-6 text-4xl md:text-7xl font-headline font-bold tracking-tight text-white leading-tight">
              Medicine, AI, and the Future <br /> of <span className="text-primary animate-glow">Intelligent Hospitals.</span>
            </h1>
            <h2 className="text-sm font-mono text-primary uppercase tracking-[0.3em] mb-8">System Builder Phase: Research & Prototype</h2>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button 
                onClick={() => document.getElementById('ovexis-hq')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-bold text-black transition-all hover:bg-white/90 hover:scale-105"
              >
                Explore Ovexis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>

        {/* Project Ovexis HQ */}
        <section id="ovexis-hq" className="px-6 py-20 bg-black">
          <div className="max-w-7xl mx-auto space-y-20">
            <Card className="w-full min-h-[600px] bg-black/[0.96] border-white/10 relative overflow-hidden rounded-[3rem]">
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={600} />
              <div className="flex flex-col lg:flex-row h-full">
                <div className="flex-1 p-12 relative z-10 flex flex-col justify-center space-y-6">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-6xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                  >
                    Project Ovexis — <br /> <span className="text-primary text-3xl md:text-5xl">Intelligent AI Personal Assistant</span>
                  </motion.h2>
                  <p className="text-neutral-300 max-w-2xl text-lg md:text-xl leading-relaxed font-body">
                    A modular AI ecosystem designed to automate professional workflows and explore AI-native medical system integrations.
                  </p>
                </div>
                <div className="flex-1 relative min-h-[400px]">
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Visualizing the Vision */}
        <section className="bg-black pt-10">
          <div className="max-w-7xl mx-auto px-6 py-4 text-center space-y-2">
            <h2 className="text-5xl md:text-7xl font-headline font-bold uppercase">Vision Visualization</h2>
          </div>
          <ZoomParallax images={ovexisParallaxImages} />
        </section>

        {/* Educational Qualifications */}
        <section id="profile" className="py-20 bg-black relative z-30 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 mb-12 text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-headline font-bold">Academic Journey</h2>
          </div>
          <StickyScroll content={profileContent} />
        </section>

        {/* Section 5 - MED FOUNDATION (Hero ASCII UI) */}
        <section className="h-[100dvh] w-full overflow-hidden m-0 p-0">
          <HeroAscii />
        </section>

        {/* Section 6 - CLINICAL DASHBOARD (MedicalDashboard UI) */}
        <MedicalDashboard />

        {/* Section 7 - ADVANCED AI LAB */}
        <AdvancedAILab />

        {/* Contact Section */}
        <section className="py-32 bg-black border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl font-headline font-bold">Collaborate</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-neutral-400">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>lynexmedtech@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-neutral-400">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>West Bengal, India</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <RainbowButton onClick={() => window.open('https://github.com/SONIC445-BYTE', '_blank')}>
                  GitHub
                </RainbowButton>
                <RainbowButton onClick={() => window.open('https://www.linkedin.com/in/ayan-mukhopadhyay1', '_blank')}>
                  LinkedIn
                </RainbowButton>
              </div>
            </div>
            <div className="p-10 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-sm space-y-6">
              <h4 className="text-xl font-bold">Research Areas</h4>
              <ul className="text-neutral-400 text-sm space-y-3 font-mono">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  NEUROSCIENCE_AI
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  HOSPITAL_AUTOMATION
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  DIAGNOSTIC_DATA_SYSTEMS
                </li>
              </ul>
              <button 
                onClick={() => window.location.href = 'mailto:lynexmedtech@gmail.com'}
                className="w-full h-14 rounded-2xl bg-white text-black font-bold hover:bg-neutral-200 transition-colors mt-6 shadow-xl"
              >
                Send Message
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
