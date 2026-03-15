
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
  BrainCircuit, Activity, Shield, UserCircle, AlertCircle, Cpu, Zap, Eye, Database
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
      title: "Medical Education",
      description: "MBBS (Bachelor of Medicine and Bachelor of Surgery) at Jhargram Government Medical College & Hospital, West Bengal, India. Currently Pursuing. Focus areas include pathology, microbiology, pharmacology, and emerging intersections between medicine and technology.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 to-emerald-500 text-white p-6 text-center">
          <GraduationCap className="w-16 h-16" />
        </div>
      ),
    },
    {
      title: "Technical Interests",
      description: "Alongside medical training, I actively explore fields related to artificial intelligence, automation, and healthcare technology. My work focuses on developing experimental tools and systems that explore the role of intelligent technologies in future healthcare environments.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-6 text-center">
          <Code className="w-16 h-16" />
        </div>
      ),
    },
    {
      title: "Independent Projects",
      description: "Project Lynex: Modular AI assistant designed to automate workflows and integrate into healthcare environments. Gameox: Gesture-operated platform exploring how gameplay motion data contributes to neurological monitoring concepts.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-white p-6 text-center">
          <Rocket className="w-16 h-16" />
        </div>
      ),
    },
    {
      title: "Core Skills",
      description: "Python Programming, AI Tool Integration, Computer Vision Concepts, Voice Interface Development, Technical Writing and Documentation, Digital Content Design (Canva).",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500 text-white p-6 text-center">
          <Target className="w-16 h-16" />
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
            {/* Intro Card */}
            <Card className="w-full min-h-[600px] bg-black/[0.96] border-white/10 relative overflow-hidden rounded-3xl">
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
                      <Target className="w-5 h-5 text-primary" />
                      1. Overview
                    </h3>
                    <p className="text-neutral-400 font-body">
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

            {/* Detailed Content Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* The Problem */}
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-destructive/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold">2. The Problem</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Current digital assistants (Siri, Google Assistant, Alexa) have major limitations: 
                </p>
                <ul className="space-y-2 text-neutral-400 text-sm list-disc list-inside">
                  <li>Mostly command-based interactions</li>
                  <li>Limited contextual memory</li>
                  <li>Poor customization for individual workflows</li>
                  <li>Weak integration with specialized domains</li>
                  <li>Heavy reliance on cloud connectivity</li>
                </ul>
              </div>

              {/* The Vision */}
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">3. The Vision</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Lynex aims to create a more intelligent system capable of:
                </p>
                <ul className="space-y-2 text-neutral-400 text-sm list-disc list-inside">
                  <li>Acting as a personal digital assistant</li>
                  <li>Automating routine digital workflows</li>
                  <li>Providing contextual info support</li>
                  <li>Integrating across all devices</li>
                  <li>Supporting future intelligent hospitals</li>
                </ul>
              </div>

              {/* Core Features */}
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold">4. Core Features</h3>
                <ul className="space-y-4 text-sm">
                  <li><strong className="text-white">Voice Interaction:</strong> Hands-free control with natural language.</li>
                  <li><strong className="text-white">Dual Mode:</strong> Seamless online/offline operation for reliability.</li>
                  <li><strong className="text-white">Task Automation:</strong> Execute complex predefined workflows.</li>
                  <li><strong className="text-white">Contextual Memory:</strong> Learns and remembers user preferences.</li>
                </ul>
              </div>
            </div>

            {/* Tech Stack & Status */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-white/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-primary" />
                  5. Technology Stack
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Python (Core Development)",
                    "Speech Recognition",
                    "Text-to-Speech Systems",
                    "Automation Scripts",
                    "Advanced AI APIs",
                    "Modular Architecture"
                  ].map((tech, i) => (
                    <div key={i} className="px-4 py-2 rounded-lg bg-black/40 border border-white/5 text-xs text-neutral-300">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  6. Development Goals
                </h3>
                <ul className="space-y-3 text-sm text-neutral-400">
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> Persistent AI memory system</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> Computer vision integration</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> Device control & automation expansion</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> Cross-device synchronization</li>
                </ul>
              </div>
            </div>

            {/* Impact & Status Footer */}
            <div className="p-12 rounded-[3rem] bg-black border border-white/10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h3 className="text-3xl font-bold flex items-center gap-3">
                  <Eye className="w-8 h-8 text-primary" />
                  7. Long-Term Impact
                </h3>
                <p className="text-neutral-400 leading-relaxed font-body">
                  Project Lynex serves as an experimental platform to explore the future role of AI assistants in professional environments. The project is particularly focused on understanding how intelligent systems could eventually assist in medical workflows, hospital operations, and decision support systems.
                </p>
              </div>
              <div className="w-full md:w-[350px] p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">8. Project Status</span>
                  <span className="px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">ACTIVE</span>
                </div>
                <div className="space-y-2">
                  <p className="text-xs flex justify-between"><span>Type:</span> <span className="text-white">Independent project</span></p>
                  <p className="text-xs flex justify-between"><span>Focus:</span> <span className="text-white text-right">AI Assistants, Automation</span></p>
                </div>
                <RainbowButton className="w-full mt-4">Source Code</RainbowButton>
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Showcase */}
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
            showGradient={false}
          />
        </section>

        {/* Educational Profile Section */}
        <section id="profile" className="py-32 bg-black relative z-30 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 mb-16 text-center space-y-6">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-primary font-medium tracking-wide text-sm border border-primary/20 px-4 py-1 rounded-full inline-block"
            >
              Medical student exploring the intersection of medicine, artificial intelligence, and future healthcare systems.
            </motion.p>
            <h2 className="text-4xl md:text-6xl font-headline font-bold">Educational Qualifications</h2>
          </div>
          
          <StickyScroll content={[
            {
              title: "1. Medical Education",
              description: "MBBS (Bachelor of Medicine and Bachelor of Surgery) at Jhargram Government Medical College & Hospital, West Bengal, India. Currently Pursuing. Focus areas include pathology, microbiology, pharmacology, and emerging intersections between medicine and technology.",
              content: (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 to-emerald-500 text-white p-6 text-center">
                  <GraduationCap className="w-16 h-16" />
                </div>
              ),
            },
            {
              title: "2. Technical Interests",
              description: "Alongside medical training, I actively explore fields related to artificial intelligence, automation, and healthcare technology. Key areas: AI in Healthcare, Medical Data Systems, AI Assistants, HCI, Digital Health Innovation.",
              content: (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-6 text-center">
                  <Code className="w-16 h-16" />
                </div>
              ),
            },
            {
              title: "3. Independent Projects",
              description: "Project Lynex: Modular AI assistant for workflow automation. Gameox: Gesture-operated space shooter exploring how gameplay motion data contributes to neurological monitoring.",
              content: (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-white p-6 text-center">
                  <Rocket className="w-16 h-16" />
                </div>
              ),
            },
            {
              title: "4. Skills",
              description: "Python Programming, AI Tool Integration, Computer Vision Concepts, Voice Interface Development, Technical Writing, Digital Content Design (Canva).",
              content: (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500 text-white p-6 text-center">
                  <Target className="w-16 h-16" />
                </div>
              ),
            },
          ]} />

          {/* Contact Details Integration */}
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
                  GitHub
                </RainbowButton>
                <RainbowButton onClick={() => window.open('https://www.linkedin.com/in/ayan-mukhopadhyay1', '_blank')}>
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </RainbowButton>
              </div>
            </div>
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-6 text-center md:text-left">
              <h4 className="text-xl font-bold flex items-center justify-center md:justify-start gap-2">
                <UserCircle className="w-5 h-5 text-primary" />
                Open For
              </h4>
              <ul className="text-neutral-400 text-sm space-y-2">
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Research collaborations
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Health technology projects
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  AI and healthcare innovation
                </li>
              </ul>
              <button 
                onClick={() => window.location.href = 'mailto:lynexmedtech@gmail.com'}
                className="w-full h-12 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-colors"
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
