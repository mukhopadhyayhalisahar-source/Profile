
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Stethoscope, Syringe, Microscope, Dna, HeartPulse, 
  ClipboardList, BookOpen, Rocket, Target, Activity,
  Baby, Scissors, GraduationCap, ChevronRight, BrainCircuit,
  Info, ShieldCheck, Zap, Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function MedicalPortfolio() {
  useEffect(() => {
    const embedScript = document.createElement('script');
    embedScript.type = 'text/javascript';
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    const style = document.createElement('style');
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }
      [data-us-project] canvas {
        clip-path: inset(0 0 10% 0) !important;
      }
      [data-us-project] * {
        pointer-events: none !important;
      }
      .dither-pattern {
        background-image: 
          repeating-linear-gradient(0deg, transparent 0px, transparent 1px, white 1px, white 2px),
          repeating-linear-gradient(90deg, transparent 0px, transparent 1px, white 1px, white 2px);
        background-size: 3px 3px;
      }
    `;
    document.head.appendChild(style);

    const hideBranding = () => {
      const projectDiv = document.querySelector('[data-us-project]');
      if (projectDiv) {
        const allElements = projectDiv.querySelectorAll('*');
        allElements.forEach(el => {
          const text = (el.textContent || '').toLowerCase();
          if (text.includes('made with') || text.includes('unicorn')) {
            el.remove();
          }
        });
      }
    };

    hideBranding();
    const interval = setInterval(hideBranding, 500);
    
    return () => {
      clearInterval(interval);
      document.head.removeChild(embedScript);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-black border-t border-white/10 overflow-hidden pt-20">
      {/* Vitruvian Background Background */}
      <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none hidden lg:block">
        <div 
          data-us-project="whwOGlfJ5Rz2rHaEUgHl" 
          style={{ width: '100%', height: '100%', minHeight: '100vh' }}
        />
      </div>

      {/* Frame Accents */}
      <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-primary/30 z-20"></div>
      <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 border-primary/30 z-20"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10 py-20">
        <div className="max-w-5xl space-y-32">
          
          {/* 1. Medical Journey (Hero Style) */}
          <div className="space-y-8 relative">
            <div className="flex items-center gap-2 mb-3 opacity-60">
              <div className="w-8 h-px bg-primary"></div>
              <span className="text-primary text-[10px] font-mono tracking-wider">MED-CORE-001</span>
              <div className="flex-1 h-px bg-primary"></div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-3 top-0 bottom-0 w-1 dither-pattern opacity-40"></div>
              <h2 className="text-4xl lg:text-7xl font-bold text-white leading-tight font-headline tracking-tight">
                MEDICAL <br />
                <span className="text-primary animate-glow">JOURNEY</span>
              </h2>
            </div>

            <div className="max-w-2xl space-y-6">
              <p className="text-lg lg:text-2xl text-white/80 font-body leading-relaxed">
                Medical Student Exploring the Future of Healthcare
              </p>
              <p className="text-sm lg:text-lg text-neutral-400 font-body leading-relaxed">
                Currently pursuing MBBS at Jhargram Government Medical College (Expected 2029). 
                I bridge the gap between traditional clinical training and advanced technology—designing 
                AI systems that don&apos;t just think, but understand the complexities of human biology.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Badge variant="outline" className="px-4 py-2 border-primary/50 text-primary font-mono text-[10px]">SYSTEM.MBBS_CANDIDATE</Badge>
              <Badge variant="outline" className="px-4 py-2 border-white/20 text-white/50 font-mono text-[10px]">LOCATION.JGMCH_WB</Badge>
            </div>
          </div>

          {/* 2 & 3. Clinical Exposure & Procedures (Technical Grid) */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8 p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Stethoscope className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold font-headline uppercase tracking-widest">Clinical Exposure</h3>
              </div>
              <p className="text-sm text-neutral-500 font-body leading-relaxed">
                Gained deep exposure to hospital-based medicine and community healthcare systems through rigorous department rotations.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "OBGY", icon: Baby },
                  { name: "General Surgery", icon: Scissors },
                  { name: "General Medicine", icon: HeartPulse },
                  { name: "ENT", icon: Activity },
                  { name: "ICTC", icon: ClipboardList },
                  { name: "PSM", icon: Target }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/5 bg-black/40 flex items-center gap-3 group hover:border-primary/40 transition-colors">
                    <item.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-neutral-300 font-mono">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 dither-pattern opacity-10" />
               <div className="flex items-center gap-3">
                <Scissors className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold font-headline uppercase tracking-widest">Clinical Procedures</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Hernia repair surgery",
                  "Lipofibroma removal surgery",
                  "Routine surgical ward procedures",
                  "Patient diagnostic evaluations"
                ].map((proc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 group hover:bg-white/5 transition-all">
                    <span className="text-xs text-neutral-400 font-mono tracking-tighter">{proc}</span>
                    <ChevronRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Medical Projects (ASCII/Technical Cards) */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <Rocket className="w-8 h-8 text-primary" />
              <h3 className="text-3xl font-bold font-headline">Medical Projects & Explorations</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  title: "Gameox", 
                  desc: "Gesture-operated game generating neurological reports for conditions like Parkinson's based on gameplay motion analysis.",
                  tag: "NEURO_AI"
                },
                { 
                  title: "PSM Project", 
                  desc: "Field-based research exploring community healthcare challenges and public health initiatives.",
                  tag: "PUBLIC_HEALTH"
                },
                { 
                  title: "Pathology Museum", 
                  desc: "Academic engagement in pathological learning through museum-based specimen observation.",
                  tag: "ACADEMIA"
                },
                { 
                  title: "Clipper 360", 
                  desc: "Ongoing exploratory project focused on new diagnostic approaches and healthcare tools.",
                  tag: "DIAGNOSTICS"
                }
              ].map((project, i) => (
                <div key={i} className="group p-8 border border-white/10 bg-black hover:border-primary/50 transition-all relative">
                   <div className="absolute top-2 right-2 text-[8px] font-mono text-primary opacity-50 tracking-widest">{project.tag}</div>
                   <h4 className="text-xl font-bold mb-4 font-headline text-white group-hover:text-primary transition-colors">{project.title}</h4>
                   <p className="text-sm text-neutral-400 font-body leading-relaxed">{project.desc}</p>
                   <div className="mt-6 h-px w-full bg-white/5 group-hover:bg-primary/20 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* 5, 6 & 7. Learning, Research & Vision */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-primary font-mono tracking-widest uppercase flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> 01. Learning
              </h4>
              <ul className="space-y-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary" /> Clinical Medicine</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary" /> Pathology Mechanisms</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary" /> Neuroscience</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary" /> Diagnostic Reasoning</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-primary font-mono tracking-widest uppercase flex items-center gap-2">
                <Microscope className="w-4 h-4" /> 02. Research
              </h4>
              <ul className="space-y-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary" /> AI in Medicine</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary" /> Neuroscience Protocols</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary" /> Hospital Infrastructure</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary" /> Public Health Systems</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-primary font-mono tracking-widest uppercase flex items-center gap-2">
                <Target className="w-4 h-4" /> 03. Vision
              </h4>
              <ul className="space-y-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary" /> AI-Assisted Diagnostics</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary" /> Intelligent Hospitals</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary" /> Medical Automation</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary" /> Data-Driven Care</li>
              </ul>
            </div>
          </div>

          {/* Final Advice / Positioning */}
          <div className="pt-24 border-t border-white/5 text-center space-y-4">
            <div className="flex justify-center gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-1 h-3 bg-primary/20" style={{ height: `${Math.random() * 12 + 4}px` }}></div>
              ))}
            </div>
            <p className="text-[10px] font-mono text-neutral-500 tracking-[0.3em] uppercase">
              Medical Student → Thinker → Innovator → Future System Builder
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
