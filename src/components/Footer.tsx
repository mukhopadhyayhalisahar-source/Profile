
"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black py-8 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side (Branding) */}
        <div className="text-neutral-400 text-sm text-center md:text-left font-body">
          © 2026 Mukho. Building the future of MedTech.
        </div>

        {/* Middle (Links) */}
        <div className="flex gap-8">
          <a 
            href="https://github.com/SONIC445-BYTE" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-white transition-colors text-sm font-medium"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/ayan-mukhopadhyay1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-white transition-colors text-sm font-medium"
          >
            LinkedIn
          </a>
        </div>

        {/* Right Side (Back to Top) */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors font-bold border border-white/5 px-4 py-2 rounded-full hover:bg-white/5"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}
