'use client';

import { useEffect, useState } from 'react';
import { 
  Activity, Zap, BrainCircuit, HeartPulse
} from "lucide-react";

export function HeroAscii() {
  const [randomHeights, setRandomHeights] = useState<number[]>([]);

  useEffect(() => {
    // Prevent hydration mismatch by generating heights only on client
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
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black flex flex-col border-t border-white/5">
      {/* Vitruvian animation - strictly absolute and contained */}
      <div className="absolute inset-0 w-full h-full hidden lg:block opacity-40">
        <div 
          data-us-project="whwOGlfJ5Rz2rHaEUgHl" 
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} 
        />
      </div>

      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-20 border-b border-white/20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
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
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 lg:px-16">
        <div className="w-full max-w-4xl">
          <div className="max-w-xl relative">
            <div className="flex items-center gap-2 mb-3 opacity-60">
              <div className="w-8 h-px bg-primary"></div>
              <span className="text-primary text-[10px] font-mono tracking-wider">MED_FOUNDATION</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute -left-3 top-0 bottom-0 w-1 dither-pattern opacity-40"></div>
              <h2 className="text-3xl lg:text-6xl font-bold text-white mb-4 leading-tight font-headline tracking-tight uppercase">
                MEDICAL
                <span className="block text-primary mt-2 opacity-90 animate-glow">
                  JOURNEY
                </span>
              </h2>
            </div>

            <div className="relative space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg text-white font-bold font-headline tracking-wide border-l-2 border-primary pl-4 uppercase">
                  Pursuing MBBS at JGMCH (2029)
                </h3>
                <p className="text-sm lg:text-base text-gray-300 leading-relaxed font-mono opacity-80">
                  Bridging traditional clinical training with advanced AI and neuroscience protocols to redesign healthcare delivery.
                </p>
              </div>
              
              <div className="hidden lg:flex gap-1 py-2 opacity-40">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-0.5 bg-primary rounded-full"></div>
                ))}
              </div>
              
              <p className="text-[10px] lg:text-xs text-primary font-mono opacity-90 italic flex items-center gap-2">
                <Zap className="w-3 h-3" />
                SYSTEM MODE: THINKER INNOVATOR BUILDER
              </p>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => document.getElementById('clinical-dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative px-6 py-2.5 bg-primary/10 text-primary font-mono text-xs border border-primary/40 hover:bg-primary hover:text-white transition-all duration-300"
              >
                RESEARCH VISION
              </button>
              <button 
                onClick={() => document.getElementById('clinical-dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative px-6 py-2.5 bg-transparent border border-white/20 text-white font-mono text-xs hover:bg-white/10 transition-all duration-300"
              >
                CLINICAL DEPTH
              </button>
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
    </div>
  );
}
