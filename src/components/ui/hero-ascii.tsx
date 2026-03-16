'use client';

import { useEffect, useState } from 'react';
import { 
  ClipboardList, Rocket, Activity,
  Scissors, GraduationCap, ChevronRight, BrainCircuit,
  Zap, Microscope, BookOpen, Target, Info, ShieldCheck, HeartPulse
} from "lucide-react";
import { FallingPattern } from "@/components/ui/falling-pattern";
import { ScrollArea } from "@/components/ui/scroll-area";

export function HeroAscii() {
  const [randomHeights, setRandomHeights] = useState<number[]>([]);

  useEffect(() => {
    // Prevent hydration mismatch
    setRandomHeights(Array.from({ length: 12 }).map(() => Math.random() * 12 + 4));

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
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
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
    const interval = setInterval(hideBranding, 100);
    return () => {
      clearInterval(interval);
      document.head.removeChild(embedScript);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-black flex flex-col">
      {/* Vitruvian man animation - strictly absolute and contained */}
      <div className="absolute inset-0 w-full h-full hidden lg:block opacity-40">
        <div 
          data-us-project="whwOGlfJ5Rz2rHaEUgHl" 
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} 
        />
      </div>

      {/* Top Header - Fixed pinning */}
      <div className="absolute top-0 left-0 right-0 z-20 border-b border-white/20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="font-mono text-primary text-xl lg:text-2xl font-bold tracking-widest italic transform -skew-x-12">
              LYNEX.MED
            </div>
            <div className="h-4 w-px bg-white/40"></div>
            <span className="text-white/60 text-[10px] font-mono tracking-tighter uppercase">MED FOUNDATION_V2.9</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-3 text-[10px] font-mono text-white/60">
            <Activity className="w-3 h-3 text-primary animate-pulse" />
            <span>HEART_RATE: 72_BPM</span>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <span>SYSTOLIC: 120</span>
          </div>
        </div>
      </div>

      {/* Corner Frame Accents */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/40 z-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/40 z-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary/40 z-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/40 z-20 pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-1 items-center justify-center pt-20 pb-16 px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-7xl h-[75vh]">
          
          {/* Narrative Column: 1. Medical Journey */}
          <div className="max-w-xl relative flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 mb-3 opacity-60">
              <div className="w-8 h-px bg-primary"></div>
              <span className="text-primary text-[10px] font-mono tracking-wider">MED_JOURNEY_01</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute -left-3 top-0 bottom-0 w-1 dither-pattern opacity-40"></div>
              <h2 className="text-3xl lg:text-6xl font-bold text-white mb-4 leading-tight font-headline tracking-tight uppercase">
                MEDICAL
                <span className="block text-primary mt-2 opacity-90 animate-glow">
                  FOUNDATION
                </span>
              </h2>
            </div>

            <div className="relative space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg text-white font-bold font-headline tracking-wide border-l-2 border-primary pl-4 uppercase">Medical Student Exploring the Future of Healthcare</h3>
                <p className="text-xs lg:text-base text-gray-300 leading-relaxed font-mono opacity-80">
                  I am currently pursuing my MBBS at Jhargram Government Medical College with an expected graduation in 2029. My medical journey combines traditional clinical training with a deep interest in technology, neuroscience, and healthcare innovation.
                </p>
                <p className="text-xs lg:text-base text-gray-300 leading-relaxed font-mono opacity-80">
                  Alongside my medical education, I actively explore how AI, software systems, and data-driven tools can improve diagnosis, hospital efficiency, and patient care.
                </p>
              </div>
              
              <div className="hidden lg:flex gap-1 py-2 opacity-40">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-0.5 bg-primary rounded-full"></div>
                ))}
              </div>
              
              <p className="text-[10px] lg:text-xs text-primary font-mono opacity-90 italic flex items-center gap-2">
                <Zap className="w-3 h-3" />
                SYSTEM_MODE: THINKER_INNOVATOR_BUILDER
              </p>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button className="relative px-6 py-2.5 bg-primary/10 text-primary font-mono text-xs border border-primary/40 hover:bg-primary hover:text-white transition-all duration-300">
                RESEARCH_VISION
              </button>
              <button className="relative px-6 py-2.5 bg-transparent border border-white/20 text-white font-mono text-xs hover:bg-white/10 transition-all duration-300">
                CLINICAL_DEPTH
              </button>
            </div>
          </div>

          {/* Dashboard Column: Sections 2-7 */}
          <div className="h-full border border-white/10 bg-black/60 backdrop-blur-xl rounded-xl overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 z-0 opacity-20">
              <FallingPattern 
                color="hsl(var(--primary))" 
                blurIntensity="4px" 
                density={1.5}
              />
            </div>
            
            <div className="relative z-10 h-full flex flex-col p-6">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-primary">
                  <BrainCircuit className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold tracking-widest">CLINICAL_DASHBOARD_CORE</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>

              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-10 pb-12">
                  
                  {/* 2. Clinical Exposure */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-primary font-bold flex items-center gap-2 uppercase tracking-[0.2em]">
                      <ClipboardList className="w-3 h-3" /> 02. Clinical Exposure
                    </h4>
                    <p className="text-[10px] text-white/50 font-mono leading-relaxed">
                      Department Rotations: Gained deep exposure to hospital-based medicine and community healthcare systems through rigorous department rotations.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Obstetrics & Gynecology (OBGY)", 
                        "General Surgery", 
                        "General Medicine", 
                        "ENT", 
                        "ICTC (Counselling & Testing)", 
                        "PSM Field Visits",
                        "Community Health Programs",
                        "Public Health Surveys"
                      ].map((item, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 p-2 rounded text-[9px] font-mono text-white/70 hover:bg-primary/10 hover:border-primary/20 transition-colors">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Observed Clinical Procedures */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-primary font-bold flex items-center gap-2 uppercase tracking-[0.2em]">
                      <Scissors className="w-3 h-3" /> 03. Observed Procedures
                    </h4>
                    <p className="text-[10px] text-white/50 font-mono leading-relaxed">
                      Exposure to real clinical procedures fundamental to understanding surgical workflow, patient preparation, and clinical decision making.
                    </p>
                    <ul className="space-y-2">
                      {[
                        { title: "Hernia repair surgery", icon: ChevronRight },
                        { title: "Lipofibroma removal surgery", icon: ChevronRight },
                        { title: "Routine surgical ward procedures", icon: ChevronRight },
                        { title: "Patient diagnostic evaluations", icon: ChevronRight },
                      ].map((proc, i) => (
                        <li key={i} className="flex items-center gap-3 p-2 bg-white/[0.02] border-l-2 border-primary/40 text-[9px] font-mono text-white/80">
                          <proc.icon className="w-2.5 h-2.5 text-primary" />
                          {proc.title}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 4. Medical Projects & Explorations */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-primary font-bold flex items-center gap-2 uppercase tracking-[0.2em]">
                      <Rocket className="w-3 h-3" /> 04. Medical Projects
                    </h4>
                    <div className="space-y-4">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] text-white font-bold tracking-widest">GAMEOX</p>
                          <span className="text-[8px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">ACTIVE</span>
                        </div>
                        <p className="text-[9px] text-white/40 leading-relaxed italic">
                          A gesture-operated game designed to generate medical reports related to neurological conditions such as Parkinson’s disease based on gameplay analysis.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                          <p className="text-[10px] text-white font-bold mb-1">PSM PROJECT</p>
                          <p className="text-[9px] text-white/40 italic">Public health initiatives and field-based research exploring community healthcare challenges.</p>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                          <p className="text-[10px] text-white font-bold mb-1">CLIPPER 360</p>
                          <p className="text-[9px] text-white/40 italic">Ongoing project exploring new diagnostic approaches and healthcare tools.</p>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                          <p className="text-[10px] text-white font-bold mb-1">PATHOLOGY MUSEUM</p>
                          <p className="text-[9px] text-white/40 italic">Academic engagement involving specimen observation and pathological learning.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5. Medical Learning & Educational Content */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-primary font-bold flex items-center gap-2 uppercase tracking-[0.2em]">
                      <BookOpen className="w-3 h-3" /> 05. Learning & Education
                    </h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <p className="text-[9px] text-white font-bold uppercase">Current Focus Area:</p>
                        <div className="flex flex-wrap gap-2">
                          {["Clinical Medicine", "Pathology Mechanisms", "Neuroscience", "Diagnostic Reasoning"].map((item, i) => (
                            <span key={i} className="text-[8px] font-mono text-white/60 bg-white/5 px-2 py-1 rounded border border-white/5">{item}</span>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="text-[9px] text-primary font-bold mb-2 uppercase flex items-center gap-2">
                          <Info className="w-2.5 h-2.5" /> Future Integration Pipeline:
                        </p>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[8px] font-mono text-white/50">
                          <li>• Medical explanations</li>
                          <li>• Educational articles</li>
                          <li>• Case-based learning</li>
                          <li>• Visual diagrams</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 6. Research Interests */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-primary font-bold flex items-center gap-2 uppercase tracking-[0.2em]">
                      <Microscope className="w-3 h-3" /> 06. Research Interests
                    </h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { title: "Neuroscience", desc: "Mapping neural interface protocols" },
                          { title: "AI in Medicine", desc: "Algorithmic diagnostic optimization" },
                          { title: "Diagnostic Technology", desc: "Next-gen screening hardware" },
                          { title: "Hospital System Design", desc: "AI-native infrastructure" },
                          { title: "Public Health Systems", desc: "Data-driven population care" }
                        ].map((interest, i) => (
                          <div key={i} className="flex flex-col p-2 bg-white/5 border border-white/10 rounded">
                            <span className="text-[9px] font-bold text-white">{interest.title}</span>
                            <span className="text-[8px] text-white/40 font-mono italic">{interest.desc}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-2 border border-dashed border-primary/30 rounded flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                        <p className="text-[8px] text-primary/80 font-mono italic">
                          Academic status: Actively planning research opportunities as medical training progresses.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 7. Vision for the Future of Healthcare */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-primary font-bold flex items-center gap-2 uppercase tracking-[0.2em]">
                      <Target className="w-3 h-3" /> 07. Future Vision
                    </h4>
                    <div className="space-y-4">
                      <p className="text-[9px] text-white/60 font-mono italic leading-relaxed border-l-2 border-primary/20 pl-3">
                        "Long-term goal: Contribute to the development of technology-driven healthcare systems that improve medical decision-making and hospital efficiency."
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { title: "AI-Assisted Diagnostics", icon: BrainCircuit },
                          { title: "Intelligent Infrastructure", icon: Activity },
                          { title: "Medical Automation", icon: Zap },
                          { title: "Data-Driven Management", icon: HeartPulse }
                        ].map((v, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5 hover:border-primary/40 transition-colors">
                            <v.icon className="w-3 h-3 text-primary" />
                            <span className="text-[8px] font-bold text-white/80">{v.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section Indicators */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/20 bg-black/60 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 lg:gap-6 text-[9px] font-mono text-white/50">
            <span className="hidden lg:inline text-primary tracking-widest uppercase">Medical Student → Thinker → Innovator → Future System Builder</span>
            <div className="hidden lg:flex gap-1 items-end">
              {randomHeights.map((height, i) => (
                <div key={i} className="w-1 bg-primary/30" style={{ height: `${height}px` }}></div>
              ))}
            </div>
            <span>LOC.JGMCH_WB_IN</span>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4 text-[9px] font-mono text-white/50 uppercase tracking-widest">
             <span className="hidden lg:inline">◐ DIAGNOSTIC_ENGINE_SYNCED</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span>V2.9.0_CORE</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dither-pattern {
          background-image: 
            repeating-linear-gradient(0deg, transparent 0px, transparent 1px, white 1px, white 2px),
            repeating-linear-gradient(90deg, transparent 0px, transparent 1px, white 1px, white 2px);
          background-size: 3px 3px;
        }
      `}</style>
    </main>
  );
}
