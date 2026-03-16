
"use client";

import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { 
  Stethoscope, Syringe, Microscope, Dna, HeartPulse, 
  ClipboardList, BookOpen, Rocket, Target, Activity,
  Baby, Scissors, GraduationCap, ChevronRight, BrainCircuit
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Spline = lazy(() => import('@splinetool/react-spline'));

function HeroSplineBackground() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      pointerEvents: 'auto',
      overflow: 'hidden',
    }}>
      <Suspense fallback={<div className="w-full h-full bg-black flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
        <Spline
          style={{
            width: '100%',
            height: '100vh',
            pointerEvents: 'auto',
          }}
          scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
        />
      </Suspense>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent 30%, transparent 70%, rgba(0, 0, 0, 0.8)),
            linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.9))
          `,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

function ScreenshotSection({ screenshotRef }: { screenshotRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 mt-11 md:mt-12">
      <div ref={screenshotRef} className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 w-full md:w-[80%] lg:w-[70%] mx-auto">
        <div>
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000"
            alt="Medical Technology Interface"
            className="w-full h-auto block rounded-lg mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

function HeroContent() {
  return (
    <div className="text-left text-white pt-16 sm:pt-24 md:pt-32 px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary mb-6"
      >
        <GraduationCap className="w-4 h-4" />
        Medical Journey
      </motion.div>
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-wide font-headline">
        Medical Student Exploring <br className="hidden md:block" /> the <span className="text-primary animate-glow">Future of Healthcare</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-10 opacity-80 max-w-2xl font-body leading-relaxed">
        Currently pursuing MBBS at Jhargram Government Medical College (Class of 2029). 
        Combining traditional clinical training with a deep interest in technology, 
        neuroscience, and AI-driven healthcare innovation.
      </p>
      <div className="flex pointer-events-auto flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
        <button 
          onClick={() => document.getElementById('medical-depth')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-primary hover:bg-primary/80 text-white font-bold py-3 px-8 rounded-full transition duration-300 w-full sm:w-auto border border-white/10 shadow-lg shadow-primary/20"
        >
          Explore Journey
        </button>
        <button 
          onClick={() => document.getElementById('medical-vision')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-black/40 border border-white/10 hover:border-white/20 text-white font-bold py-3 px-8 rounded-full transition duration-300 flex items-center justify-center w-full sm:w-auto backdrop-blur-md"
        >
          Research Vision
        </button>
      </div>
    </div>
  );
}

const ClinicalRotations = [
  { name: "Obstetrics & Gynecology (OBGY)", icon: Baby },
  { name: "General Surgery", icon: Scissors },
  { name: "General Medicine", icon: Stethoscope },
  { name: "ENT", icon: Activity },
  { name: "ICTC", icon: ClipboardList, desc: "Integrated Counselling & Testing Centre" },
  { name: "PSM", icon: HeartPulse, desc: "Preventive & Social Medicine Field Visits" },
];

const Procedures = [
  "Hernia repair surgery",
  "Lipofibroma removal surgery",
  "Routine surgical ward procedures",
  "Patient diagnostic evaluations"
];

const Projects = [
  { 
    title: "Gameox", 
    desc: "Gesture-operated game analyzing motor patterns for neurological screening.",
    tag: "AI & Neuro"
  },
  { 
    title: "PSM Project", 
    desc: "Field-based research exploring community healthcare challenges.",
    tag: "Public Health"
  },
  { 
    title: "Pathology Museum", 
    desc: "Academic specimen observation and pathological learning.",
    tag: "Academia"
  },
  { 
    title: "Clipper 360", 
    desc: "Exploring new diagnostic approaches and healthcare tools.",
    tag: "Diagnostics"
  }
];

export const HeroSection = () => {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (screenshotRef.current && heroContentRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset;
          const rect = heroContentRef.current?.getBoundingClientRect();
          if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
            if (screenshotRef.current) {
              // Adjust parallax to be more subtle
              const offset = Math.max(0, (scrollPosition - 2000) * 0.1);
              screenshotRef.current.style.transform = `translateY(-${offset}px)`;
            }
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden bg-black">
      {/* Interactive 3D Hero */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        <div ref={heroContentRef} className="absolute inset-0 flex items-center z-10 pointer-events-none">
          <div className="container mx-auto px-6">
            <HeroContent />
          </div>
        </div>
      </div>

      {/* Integrated Medical Narrative */}
      <div className="bg-black relative z-10" style={{ marginTop: '-10vh' }}>
        <ScreenshotSection screenshotRef={screenshotRef} />
        
        <div id="medical-depth" className="container mx-auto px-6 py-24 space-y-32">
          {/* Clinical Exposure */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold flex items-center gap-3">
                <ClipboardList className="w-8 h-8 text-primary" />
                Clinical Exposure
              </h3>
              <p className="text-neutral-400 font-body leading-relaxed">
                During my clinical training at Jhargram Government Medical College, I have gained deep exposure to hospital-based medicine and community healthcare systems through rotations in multiple departments.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ClinicalRotations.map((rotation, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 hover:border-primary/40 transition-colors">
                    <CardContent className="p-6">
                      <rotation.icon className="w-8 h-8 text-primary mb-4" />
                      <h4 className="font-bold text-sm mb-1">{rotation.name}</h4>
                      {rotation.desc && <p className="text-[10px] text-neutral-500">{rotation.desc}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-8 bg-white/5 p-10 rounded-[2.5rem] border border-white/10">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Scissors className="w-6 h-6 text-primary" />
                Observed Clinical Procedures
              </h3>
              <p className="text-neutral-400 text-sm font-body leading-relaxed">
                Hands-on exposure to surgical workflows and patient preparation has been fundamental to my understanding of practical medicine.
              </p>
              <div className="space-y-3">
                {Procedures.map((proc, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-black/40 border border-white/5 group hover:border-primary/40 transition-colors">
                    <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm font-medium text-neutral-300">{proc}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-neutral-500 italic mt-4">
                Strengthening my understanding of surgical workflow, patient preparation, and clinical decision making.
              </p>
            </div>
          </div>

          {/* Medical Projects */}
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h3 className="text-4xl font-bold flex items-center justify-center gap-3">
                <Rocket className="w-8 h-8 text-primary" />
                Medical Projects & Explorations
              </h3>
              <p className="text-neutral-400 font-body">
                I continue to experiment with ideas aimed at improving medical diagnostics and healthcare delivery through technology.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Projects.map((project, i) => (
                <Card key={i} className="bg-white/5 border-white/10 h-full group hover:border-primary/40 transition-all">
                  <CardContent className="p-8 flex flex-col h-full">
                    <Badge variant="secondary" className="w-fit mb-4 text-[10px] bg-primary/10 text-primary border-primary/20">{project.tag}</Badge>
                    <h4 className="text-xl font-bold mb-4">{project.title}</h4>
                    <p className="text-sm text-neutral-400 leading-relaxed font-body flex-grow">
                      {project.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Learning & Vision */}
          <div id="medical-vision" className="grid lg:grid-cols-2 gap-12 pt-20 border-t border-white/5">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" />
                Learning & Educational Content
              </h3>
              <p className="text-neutral-400 font-body leading-relaxed">
                I regularly document and explore medical concepts, bridging the gap between clinical reality and digital representation. My focus areas include:
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Clinical Medicine",
                  "Pathology Mechanisms",
                  "Neuroscience",
                  "Diagnostic Reasoning"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm font-bold text-neutral-200">{item}</span>
                  </div>
                ))}
              </div>
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <p className="text-xs text-primary/80 font-medium">Coming Soon: Visual medical diagrams and case-based learning notes.</p>
              </div>
            </div>

            <div className="space-y-8 bg-gradient-to-br from-primary/10 via-black to-black p-12 rounded-[3.5rem] border border-primary/20 shadow-2xl">
              <h3 className="text-3xl font-bold flex items-center gap-3">
                <Target className="w-8 h-8 text-primary" />
                Vision for the Future
              </h3>
              <p className="text-neutral-300 font-body leading-relaxed text-lg">
                My long-term goal is to contribute to the development of technology-driven healthcare systems that improve medical decision-making and hospital efficiency.
              </p>
              <div className="space-y-4">
                {[
                  { title: "AI-Assisted Diagnostics", icon: BrainCircuit },
                  { title: "Intelligent Infrastructure", icon: Activity },
                  { title: "Medical Automation Systems", icon: Rocket }
                ].map((vision, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-black/40 border border-white/10 group">
                    <vision.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm md:text-base font-bold text-neutral-100">{vision.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Final Advice Positioning */}
          <div className="text-center pt-24 border-t border-white/5">
            <p className="text-neutral-500 text-sm font-medium tracking-widest uppercase">
              Medical Student → Thinker → Innovator → Future System Builder
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
