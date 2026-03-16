'use client';

import React from 'react';
import { FallingPattern } from '@/components/ui/falling-pattern';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ClipboardList, Scissors, Rocket, BookOpen, Microscope, Target,
  ChevronRight, BrainCircuit, Activity, Zap, HeartPulse, Info, ShieldCheck
} from 'lucide-react';

export function MedicalDashboard() {
  return (
    <section id="clinical-dashboard" className="relative min-h-screen bg-black border-t border-white/10 overflow-hidden flex flex-col">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <FallingPattern 
          color="hsl(var(--primary))" 
          blurIntensity="4px" 
          density={1.5}
        />
      </div>

      {/* Cinematic Header Overlay */}
      <div className="relative z-20 w-full bg-black/60 backdrop-blur-md border-b border-white/10 py-6 px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
            <ClipboardList className="text-primary w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-headline font-bold text-white uppercase tracking-widest">Clinical Dashboard</h2>
            <p className="text-[10px] font-mono text-primary opacity-70">SYSTEM_MODE: UNCOMPRESSED_DATA_STREAM</p>
          </div>
        </div>
        <div className="hidden lg:flex gap-4">
          <div className="px-4 py-2 border border-white/5 bg-white/5 rounded-lg text-[10px] font-mono text-white/40">
            <span className="text-primary">CORE:</span> ACTIVE_SYNC
          </div>
          <div className="px-4 py-2 border border-white/5 bg-white/5 rounded-lg text-[10px] font-mono text-white/40">
            <span className="text-primary">LOC:</span> JGMCH_WEST_BENGAL
          </div>
        </div>
      </div>

      {/* Main Data Content */}
      <div className="relative z-10 flex-1 container mx-auto px-6 lg:px-16 py-12">
        <div className="grid lg:grid-cols-12 gap-12 h-full">
          
          {/* Left Column: Exposure & Procedures */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* 2. Clinical Exposure */}
            <div className="space-y-6">
              <h3 className="text-2xl font-headline font-bold text-white border-l-4 border-primary pl-4 uppercase">
                02. Clinical Exposure & Rotations
              </h3>
              <p className="text-neutral-400 font-body leading-relaxed">
                During my clinical training at Jhargram Government Medical College, I have gained deep exposure to hospital-based medicine and community healthcare systems through rigorous rotations across multiple departments.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Obstetrics & Gynecology (OBGY)", desc: "Comprehensive exposure to labor room protocols and antenatal care." },
                  { title: "General Surgery", desc: "Observing pre-op, operative, and post-operative management." },
                  { title: "General Medicine", desc: "Diagnostic evaluation and chronic disease management." },
                  { title: "ENT", desc: "Specialized assessment of otolaryngological conditions." },
                  { title: "ICTC", desc: "Integrated Counselling & Testing Centre protocols." },
                  { title: "PSM Field Visits", desc: "Public Health surveys and community healthcare initiatives." },
                  { title: "Community Programs", desc: "Participation in government public health outreach." }
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/40 transition-colors group">
                    <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-[11px] text-neutral-500 mt-2 italic">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Observed Clinical Procedures */}
            <div className="space-y-6 pt-12 border-t border-white/5">
              <h3 className="text-2xl font-headline font-bold text-white border-l-4 border-primary pl-4 uppercase">
                03. Observed Clinical Procedures
              </h3>
              <p className="text-neutral-400 font-body leading-relaxed">
                Hands-on exposure to surgical workflows and patient preparation has been fundamental to my understanding of practical aspects of surgery and patient management.
              </p>
              <div className="space-y-3">
                {[
                  { title: "Hernia Repair Surgery", icon: ChevronRight },
                  { title: "Lipofibroma Removal Surgery", icon: ChevronRight },
                  { title: "Routine Surgical Ward Procedures", icon: ChevronRight },
                  { title: "Patient Diagnostic Evaluations", icon: ChevronRight },
                ].map((proc, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-black/40 border border-white/5 rounded-xl hover:bg-primary/5 hover:border-primary/20 transition-all group">
                    <proc.icon className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm font-medium text-neutral-200">{proc.title}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-neutral-500 font-mono italic">
                * Strengthening understanding of surgical workflow, patient preparation, and clinical decision making.
              </p>
            </div>
          </div>

          {/* Right Column: Projects, Research & Vision */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* 4. Medical Projects */}
            <div className="space-y-6">
              <h3 className="text-xl font-headline font-bold text-white border-l-4 border-primary pl-4 uppercase tracking-wider">
                04. Medical Projects
              </h3>
              <div className="space-y-4">
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-4 right-6 text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded">ACTIVE</div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-primary" /> GAMEOX
                  </h4>
                  <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                    A gesture-operated game designed to generate medical reports related to neurological conditions such as Parkinson’s disease based on gameplay analysis. Focuses on motor stability tracking.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                    <h5 className="text-xs font-bold text-white uppercase">PSM Project</h5>
                    <p className="text-[11px] text-neutral-500 mt-1 italic">Field-based research exploring community healthcare challenges.</p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                    <h5 className="text-xs font-bold text-white uppercase">Clipper 360</h5>
                    <p className="text-[11px] text-neutral-500 mt-1 italic">Exploring new diagnostic approaches and healthcare tools.</p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                    <h5 className="text-xs font-bold text-white uppercase">Pathology Museum</h5>
                    <p className="text-[11px] text-neutral-500 mt-1 italic">Academic specimen observation and pathological learning.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6 & 7. Research & Vision */}
            <div className="p-8 bg-gradient-to-br from-primary/10 via-black to-black border border-primary/20 rounded-[3rem] shadow-2xl space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                  <Microscope className="w-5 h-5 text-primary" /> 06. Research Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Neuroscience", "AI in Medicine", "Diagnostic Technology", "Hospital Design", "Public Health"].map((item, i) => (
                    <span key={i} className="text-[10px] font-mono text-primary/80 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">{item}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                  <Target className="w-5 h-5 text-primary" /> 07. Future Vision
                </h3>
                <p className="text-sm text-neutral-400 italic leading-relaxed border-l-2 border-primary/20 pl-4">
                  "Contribute to the development of technology-driven healthcare systems that improve medical decision-making and hospital efficiency."
                </p>
                <ul className="space-y-2 text-[11px] font-mono text-neutral-500">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> AI-Assisted Diagnostics</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> Intelligent Infrastructure</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> Medical Automation Systems</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> Data-Driven Care</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Section Footer */}
      <div className="w-full py-8 border-t border-white/5 bg-black/40 text-center">
        <p className="text-[10px] font-mono text-neutral-500 tracking-[0.4em] uppercase">
          Medical Student → Thinker → Innovator → Future System Builder
        </p>
      </div>
    </section>
  );
}
