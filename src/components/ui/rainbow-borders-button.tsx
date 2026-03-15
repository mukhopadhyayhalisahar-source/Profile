
"use client";
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const RainbowBorderButton = ({ children = "Button", className, ...props }: ButtonProps) => {
  return (
    <div className={cn("relative inline-block", className)}>
      <button 
        {...props}
        className="rainbow-border relative min-w-[140px] h-12 flex items-center justify-center gap-2.5 px-6 bg-black rounded-xl border-none text-white cursor-pointer font-bold transition-all duration-200 hover:scale-105 active:scale-95"
      >
        {children}
      </button>
      
      <style jsx>{`
        .rainbow-border::before,
        .rainbow-border::after {
          content: '';
          position: absolute;
          left: -2px;
          top: -2px;
          border-radius: 12px;
          background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000);
          background-size: 400%;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          z-index: -1;
          animation: rainbow 10s linear infinite;
        }
        .rainbow-border::after {
          filter: blur(20px);
          opacity: 0.5;
        }
        @keyframes rainbow {
          0% { background-position: 0 0; }
          100% { background-position: 400% 0; }
        }
      `}</style>
    </div>
  );
};
