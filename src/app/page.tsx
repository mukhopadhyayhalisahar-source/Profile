
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
import { ArrowRight, Zap, Shield, Database, Monitor, Github, Linkedin, Mail, MapPin, Code, GraduationCap, Rocket, Target } from "lucide-react";

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
    { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200", alt: "AI Core" },
    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", alt: "Hardware" },
    { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200", alt: "MedTech" },
    { src: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=1200", alt: "Neural" },
    { src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200", alt: "Robotics" },
    { src: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200", alt: "Data" },
    { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200", alt: "Nature" },
  ];

  const qualificationContent = [
    {
      title: "Medical Education",
      description: "MBBS (Bachelor of Medicine and Bachelor of Surgery) at Jhargram Government Medical College & Hospital, West Bengal, India. Currently pursuing, with focus areas in pathology, microbiology, pharmacology, and emerging intersections between medicine and technology.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 to-emerald-500 text-white p-6 text-center text-xl font-bold">
          <GraduationCap className="w-12 h-12 mb-4 block mx-auto" />
          MBBS Candidate
        </div>
      ),
    },
    {
      title: "Technical Interests",
      description: "Active exploration of artificial intelligence, automation, and healthcare technology. Developing experimental tools and systems to define the role of intelligent technologies in future healthcare environments.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-6 text-center text-xl font-bold">
          <Code className="w-12 h-12 mb-4 block mx-auto" />
          AI & Healthcare Automation
        </div>
      ),
    },
    {
      title: "Independent Projects",
      description: "Project Lynex: A modular AI assistant for workflow automation and healthcare integration. Gameox: A gesture-operated space shooter exploring motor-data analytics for health and neurological monitoring.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-white p-6 text-center text-xl font-bold">
          <Rocket className="w-12 h-12 mb-4 block mx-auto" />
          Lynex & Gameox
        </div>
      ),
    },
    {
      title: "Core Skills",
      description: "Proficient in Python programming, AI tool integration, computer vision concepts, and voice interface development. Experienced in technical writing and digital content design using Canva.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500 text-white p-6 text-center text-xl font-bold">
          <Target className="w-12 h-12 mb-4 block mx-auto" />
          Technical Expertise
        </div>
      ),
    },
    {
      title: "Open To Collaboration",
      description: "Open to research collaborations, health technology projects, AI and healthcare innovation initiatives, and open-source development projects globally.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 text-center text-xl font-bold">
          <Zap className="w-12 h-12 mb-4 block mx-auto" />
          Innovation Hub
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
                onClick={() => document.getElementById('lynex')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-bold text-black transition-all hover:bg-white/90 hover:scale-105"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10">
                View Documentation
              </button>
            </div>
          </div>
        </section>

        {/* 3D Scene Card */}
        <section className="px-6 py-20 bg-black">
          <div className="max-w-7xl mx-auto">
            <Card className="w-full h-[600px] bg-black/[0.96] border-white/10 relative overflow-hidden rounded-3xl">
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={600} />
              <div className="flex flex-col lg:flex-row h-full">
                <div className="flex-1 p-12 relative z-10 flex flex-col justify-center space-y-6">
                  <h2 className="text-4xl md:text-6xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                    Interactive <br /> 3D UI.
                  </h2>
                  <p className="text-neutral-300 max-w-lg text-lg leading-relaxed font-body">
                    Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
                    that capture attention and enhance your design.
                  </p>
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

        {/* Project Lynex Section */}
        <section id="lynex" className="bg-black">
          <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-4">
            <h2 className="text-5xl md:text-7xl font-headline font-bold">Project Lynex</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-body">Modular AI Assistant architecture for personal productivity and hospital automation.</p>
          </div>
          <ZoomParallax images={lynexImages} />
          
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-32 border-t border-white/5">
             <div className="space-y-8">
               <h3 className="text-3xl font-headline font-bold">Intelligent Core</h3>
               <p className="text-neutral-400 leading-relaxed font-body text-lg">Local-first inference, contextual memory modules, and cross-device synchronization designed for data security.</p>
               <div className="grid grid-cols-2 gap-6">
                 {[
                   { icon: Zap, label: "Neural Engine", desc: "Optimized edge inference." },
                   { icon: Shield, label: "Private", desc: "Local data processing." },
                   { icon: Database, label: "Context", desc: "Deep memory modules." },
                   { icon: Monitor, label: "Sync", desc: "Omni-channel presence." }
                 ].map((item, i) => (
                   <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                     <item.icon className="w-5 h-5 text-primary mb-2" />
                     <h4 className="font-bold text-sm">{item.label}</h4>
                     <p className="text-xs text-neutral-500">{item.desc}</p>
                   </div>
                 ))}
               </div>
             </div>
             <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
                  alt="Lynex AI Interface" 
                  className="object-cover w-full h-full"
                />
             </div>
          </div>
        </section>

        {/* Project Gameox Section */}
        <section id="gameox" className="bg-black relative z-20">
          <MacbookScroll 
            title={
              <span className="text-3xl md:text-5xl font-bold font-headline">
                Gameox: Gesture-Operated <br /> Health Analytics.
              </span>
            }
            src="https://github.com/user-attachments/assets/c6b07f4d-2222-4c76-9b75-e10040ddd5a9"
            showGradient={false}
          />

          <div className="max-w-4xl mx-auto px-6 py-32 space-y-12 text-center border-t border-white/5 relative z-10 bg-black">
            <h3 className="text-3xl font-headline font-bold">The Science of Movement</h3>
            <p className="text-xl text-neutral-400 leading-relaxed font-body">Analyzing gesture patterns—speed, stability, and reaction time—to monitor motor coordination via computer vision.</p>
          </div>
        </section>

        {/* Educational Profile & Contact Section */}
        <section id="profile" className="py-32 bg-black relative z-30">
          <div className="max-w-7xl mx-auto px-6 mb-16 text-center space-y-6">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-primary font-medium tracking-wide uppercase text-sm"
            >
              Medical student exploring the intersection of medicine, artificial intelligence, and future healthcare systems.
            </motion.p>
            <h2 className="text-4xl md:text-6xl font-headline font-bold">Professional Milestones</h2>
          </div>
          
          <StickyScroll content={qualificationContent} />

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
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-6">
              <h4 className="text-xl font-bold">Project Collaborations</h4>
              <p className="text-neutral-400 text-sm">Open to research collaborations, health technology projects, and AI-driven healthcare initiatives.</p>
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

