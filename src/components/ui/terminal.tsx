
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalProps {
  commands: string[];
  outputs: Record<number, string[]>;
  typingSpeed?: number;
  delayBetweenCommands?: number;
  onComplete?: () => void;
}

export function Terminal({
  commands,
  outputs,
  typingSpeed = 45,
  delayBetweenCommands = 1000,
  onComplete,
}: TerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<{ type: 'cmd' | 'out', text: string }[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentCommandIndex >= commands.length) {
      setTimeout(() => onComplete?.(), 1500);
      return;
    }

    const command = commands[currentCommandIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < command.length) {
        setCurrentText(command.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        
        // Add command to history
        setDisplayedLines(prev => [...prev, { type: 'cmd', text: command }]);
        setCurrentText("");

        // Show outputs if any
        if (outputs[currentCommandIndex]) {
          setTimeout(() => {
            setDisplayedLines(prev => [
              ...prev,
              ...outputs[currentCommandIndex].map(text => ({ type: 'out' as const, text }))
            ]);
            
            // Move to next command
            setTimeout(() => {
              setCurrentCommandIndex(prev => prev + 1);
            }, delayBetweenCommands);
          }, 200);
        } else {
          setTimeout(() => {
            setCurrentCommandIndex(prev => prev + 1);
          }, delayBetweenCommands);
        }
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [currentCommandIndex, commands, outputs, typingSpeed, delayBetweenCommands, onComplete]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines, currentText]);

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-3xl mx-auto h-[400px] bg-black/90 rounded-xl border border-white/10 p-6 font-mono text-sm md:text-base overflow-y-auto scrollbar-hide shadow-2xl"
    >
      <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="ml-2 text-white/30 text-xs">mukho@neural-canvas ~ bash</span>
      </div>
      
      <div className="space-y-1">
        {displayedLines.map((line, i) => (
          <div key={i} className={line.type === 'cmd' ? "text-primary" : "text-white/70"}>
            {line.type === 'cmd' ? `> ${line.text}` : line.text}
          </div>
        ))}
        {currentCommandIndex < commands.length && (
          <div className="text-primary">
            {`> ${currentText}`}
            <span className="animate-pulse inline-block w-2 h-4 bg-primary ml-1 align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
