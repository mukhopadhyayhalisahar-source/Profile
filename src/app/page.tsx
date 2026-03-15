
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
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { 
  ArrowRight, Github, 
  Linkedin, Mail, MapPin, GraduationCap, Code, Rocket, Target, 
  BrainCircuit, Activity, Shield, UserCircle, AlertCircle, Cpu, Zap, Eye, Database, Info, Sparkles
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
    "./initialize_portfolio.sh",
  ];

  const terminalOutputs = {
    0: ["Mukho. Medical Student @ Jhargram Government Medical College. Founder @ Lynex."],
    1: ["Bridging clinical healthcare and high-performance machine learning. Building AI-integrated hospital systems and computer vision diagnostics."],
    2: ["lynex_core_v2/  gameox_cv_engine.exe  clipper-360-prototype/  sign_language_translator.apk"],
    3: [" [SUCCESS] Connection established. Scroll to explore."],
  };

  const lynexParallaxImages = [
    { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&q=80', alt: 'AI Architecture' },
    { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&q=80', alt: 'Urban Cityscape' },
    { src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&q=80', alt: 'Abstract UI' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&q=80', alt: 'Mountainscape' },
    { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&q=80', alt: 'Minimalist Core' },
    { src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&q=80', alt: 'Ocean Flow' },
    { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&q=80', alt: 'Sunlight Forest' },
  ];

  const profileContent = [
    {
      title: "1. Medical Education",
      description: "MBBS (Bachelor of Medicine and Bachelor of Surgery) at Jhargram Government Medical College & Hospital, West Bengal, India. Currently Pursuing. Focus areas include pathology, microbiology, pharmacology, and emerging intersections between medicine and technology.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 to-emerald-500 text-white p-6 text-center font-bold">
          Medical Education
        </div>
      ),
    },
    {
      title: "2. Technical Interests",
      description: "Alongside medical training, I actively explore fields related to artificial intelligence, automation, and healthcare technology. Key areas of interest include: Artificial Intelligence in Healthcare, Medical Data Systems, AI Assistants and Automation, Human–Computer Interaction, Digital Health Innovation.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-6 text-center font-bold">
          Technical Interests
        </div>
      ),
    },
    {
      title: "3. Independent Projects",
      description: "Project Lynex: Development of a modular AI assistant designed to automate workflows and explore healthcare integration. Gameox: Gesture-operated space shooter game designed to explore gameplay motion data for health analytics and neurological monitoring.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-white p-6 text-center font-bold">
          Independent Projects
        </div>
      ),
    },
    {
      title: "4. Skills",
      description: "Python Programming, AI Tool Integration, Computer Vision Concepts, Voice Interface Development, Technical Writing and Documentation, Digital Content Design (Canva).",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500 text-white p-6 text-center font-bold">
          Technical Skills
        </div>
      ),
    },
    {
      title: "5. Contact & Socials",
      description: "Based in West Bengal, India. Open for research collaborations, health technology projects, AI and healthcare innovation initiatives, and open-source development.",
      content: (
        <div className="flex flex-col h-full w-full items-center justify-center bg-slate-900 p-8 gap-6">
           <RainbowButton onClick={() => window.open('https://github.com/SONIC445-BYTE', '_blank')}>
            <Github className="w-4 h-4 mr-2" />
            GitHub Profile
          </RainbowButton>
          <RainbowButton onClick={() => window.open('https://www.linkedin.com/in/ayan-mukhopadhyay1', '_blank')}>
            <Linkedin className="w-4 h-4 mr-2" />
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
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={booted ? "block relative" : "hidden"}>
        <nav className="fixed top-0 left-0 right-0 z-[60] px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
          <div className="text-xl font-headline font-bold">MUKHO<span className="text-primary">.AI</span></div>
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
            <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl text-white/60 font-body">
              Medical student at Jhargram Government Medical College building AI assistants and healthcare systems designed for the next generation of medicine.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button 
                onClick={() => document.getElementById('lynex-hq')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-bold text-black transition-all hover:bg-white/90 hover:scale-105"
              >
                Explore Lynex
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10">
                View Documentation
              </button>
            </div>
          </div>
        </section>

        {/* Project Lynex — The HQ */}
        <section id="lynex-hq" className="px-6 py-20 bg-black">
          <div className="max-w-7xl mx-auto space-y-20">
            {/* 1. Overview & Hero Card */}
            <Card className="w-full min-h-[600px] bg-black/[0.96] border-white/10 relative overflow-hidden rounded-[3rem]">
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={600} />
              <div className="flex flex-col lg:flex-row h-full">
                <div className="flex-1 p-12 relative z-10 flex flex-col justify-center space-y-6">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-6xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                  >
                    Project Lynex — <br /> <span className="text-primary text-3xl md:text-5xl">Building an Intelligent Personal AI Assistant</span>
                  </motion.h2>
                  <p className="text-neutral-300 max-w-2xl text-lg md:text-xl leading-relaxed font-body">
                    Project Lynex is a modular AI assistant designed to function as a personal companion, productivity system, and intelligent automation platform capable of operating across devices.
                  </p>
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" />
                      1. Overview
                    </h3>
                    <p className="text-neutral-400 font-body text-sm leading-relaxed">
                      Project Lynex is an AI assistant built to go beyond traditional voice assistants. Instead of simply responding to commands, Lynex is designed to understand context, learn user preferences, automate tasks, and assist in decision-making. The goal is to develop a system that functions as a digital co-pilot—capable of managing information, supporting productivity, and eventually integrating with complex environments such as healthcare systems.
                    </p>
                  </div>
                </div>
                <div className="flex-1 relative min-h-[400px]">
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </Card>

            {/* 2. The Problem & 3. The Vision */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-destructive/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold">2. The Problem</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Current digital assistants (Siri, Google Assistant, Alexa) have major limitations: 
                </p>
                <ul className="space-y-3 text-neutral-400 text-xs list-disc list-inside">
                  <li>Mostly command-based interactions</li>
                  <li>Limited contextual memory</li>
                  <li>Poor customization for individual workflows</li>
                  <li>Weak integration with specialized domains like healthcare or research</li>
                  <li>Heavy reliance on cloud connectivity</li>
                </ul>
                <p className="text-neutral-500 text-[10px] mt-4 italic border-t border-white/5 pt-4">As a result, users still spend significant time manually managing tasks, information, and tools.</p>
              </div>

              <div className="p-10 rounded-[2.5rem] bg-primary/5 border border-primary/10 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">3. The Vision</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Project Lynex aims to create a more intelligent and adaptable AI system capable of:
                </p>
                <ul className="space-y-3 text-neutral-400 text-xs list-disc list-inside">
                  <li>Acting as a personal digital assistant</li>
                  <li>Automating routine digital workflows</li>
                  <li>Providing contextual information support</li>
                  <li>Integrating across devices (phone, computer)</li>
                  <li>Supporting specialized professional environments</li>
                </ul>
                <p className="text-neutral-500 text-[10px] mt-4 italic border-t border-white/5 pt-4">The long-term goal is to explore how such assistants could support future intelligent hospitals and medical systems.</p>
              </div>
            </div>

            {/* 4. Core Features */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold flex items-center gap-3">
                <Activity className="w-8 h-8 text-secondary" />
                4. Core Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Voice Interaction", desc: "Natural language communication allowing hands-free interaction with the assistant." },
                  { title: "Dual Mode Operation", desc: "Online and offline capabilities so the assistant remains usable even without internet connectivity." },
                  { title: "Task Automation", desc: "Ability to launch applications, retrieve information, and execute predefined workflows." },
                  { title: "Contextual Assistance", desc: "Designed to remember user preferences and provide more relevant responses over time." },
                  { title: "Cross-Platform Vision", desc: "The project explores how a unified assistant can operate across mobile and desktop environments." }
                ].map((feature, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/40 transition-colors">
                    <h4 className="font-bold mb-3 text-white">{feature.title}</h4>
                    <p className="text-neutral-400 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Technology Stack & 6. Development Goals */}
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold flex items-center gap-3">
                  <Cpu className="w-8 h-8 text-primary" />
                  5. Technology Stack
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "Python", role: "Core development language" },
                    { name: "Speech Recognition", role: "Voice command processing" },
                    { name: "Text-to-Speech", role: "Voice output generation" },
                    { name: "Automation Scripts", role: "Device and application control" },
                    { name: "AI APIs", role: "Advanced language processing and reasoning" }
                  ].map((tech, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="text-sm font-medium"><span className="text-white">{tech.name}</span> — <span className="text-neutral-400">{tech.role}</span></div>
                    </div>
                  ))}
                  <p className="text-[10px] text-neutral-500 italic">The system architecture is designed to be modular, allowing future integration of vision systems and memory layers.</p>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl font-bold flex items-center gap-3">
                  <Zap className="w-8 h-8 text-yellow-500" />
                  6. Development Goals
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "Persistent AI memory system",
                    "Computer vision integration",
                    "Device control and automation expansion",
                    "Cross-device synchronization",
                    "Advanced reasoning capabilities"
                  ].map((goal, i) => (
                    <div key={i} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center gap-4">
                      <Target className="w-5 h-5 text-primary" />
                      <span className="text-xs text-neutral-300">{goal}</span>
                    </div>
                  ))}
                  <p className="text-[10px] text-neutral-500 italic">These improvements aim to transform Lynex into a fully capable AI operating companion.</p>
                </div>
              </div>
            </div>

            {/* 7. Long-Term Impact & 8. Project Status */}
            <div className="p-12 rounded-[3.5rem] bg-gradient-to-br from-primary/10 via-black to-black border border-white/10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h3 className="text-3xl font-bold flex items-center gap-3">
                  <Eye className="w-8 h-8 text-primary" />
                  7. Long-Term Impact
                </h3>
                <p className="text-neutral-300 leading-relaxed font-body text-lg">
                  Project Lynex serves as an experimental platform to explore the future role of AI assistants in professional environments. The project is particularly focused on understanding how intelligent systems could eventually assist in medical workflows, hospital operations, and decision support systems.
                </p>
              </div>
              <div className="w-full md:w-[350px] p-10 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-bold uppercase tracking-widest">8. Project Status</span>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold animate-pulse">ACTIVE</div>
                </div>
                <div className="space-y-3 border-y border-white/5 py-6">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Status:</span>
                    <span className="text-white font-bold">Active development</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Type:</span>
                    <span className="text-white font-bold">Independent project</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Focus:</span>
                    <span className="text-white font-bold text-right">AI Assistants, MedTech</span>
                  </div>
                </div>
                <RainbowButton className="w-full">View Source Code</RainbowButton>
              </div>
            </div>
          </div>
        </section>

        {/* Visualizing the Vision */}
        <section className="bg-black">
          <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-4">
            <h2 className="text-5xl md:text-7xl font-headline font-bold">Visualizing the Vision</h2>
          </div>
          <ZoomParallax images={lynexParallaxImages} />
        </section>

        {/* Project Gameox Section */}
        <section id="gameox" className="bg-black relative">
          <MacbookScroll 
            title={
              <span className="text-3xl md:text-5xl font-bold font-headline">
                Gameox: Gesture-Operated <br /> Health Analytics.
              </span>
            }
            src="https://github.com/user-attachments/assets/c6b07f4d-2222-4c76-9b75-e10040ddd5a9"
          />
        </section>

        {/* Profile Section */}
        <section id="profile" className="py-32 bg-black relative z-30 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 mb-16 text-center space-y-6">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-primary font-bold tracking-tight text-lg max-w-2xl mx-auto"
            >
              Medical student exploring the intersection of medicine, artificial intelligence, and future healthcare systems.
            </motion.p>
            <h2 className="text-4xl md:text-6xl font-headline font-bold">Educational Qualifications</h2>
          </div>
          
          <StickyScroll content={profileContent} />

          {/* Detailed Contact Footer Integration */}
          <div className="max-w-4xl mx-auto mt-32 px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl font-headline font-bold">Get In Touch</h3>
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
                  <Github className="w-4 h-4 mr-2" />
                  GitHub Profile
                </RainbowButton>
                <RainbowButton onClick={() => window.open('https://www.linkedin.com/in/ayan-mukhopadhyay1', '_blank')}>
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn Profile
                </RainbowButton>
              </div>
            </div>
            <div className="p-10 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-sm space-y-6">
              <h4 className="text-xl font-bold flex items-center gap-3">
                <UserCircle className="w-6 h-6 text-primary" />
                Open For
              </h4>
              <ul className="text-neutral-400 text-sm space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Research collaborations
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Health technology projects
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  AI and healthcare innovation initiatives
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Open-source development
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
