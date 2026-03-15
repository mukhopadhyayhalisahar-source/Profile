"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalIntroProps {
  onComplete: () => void;
}

export function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const bootSequence = [
    "> NEURAL_CANVAS v1.0.4 BOOTING...",
    "> INITIALIZING_CORE_KERNELS... [OK]",
    "> CONNECTING_TO_GLOBAL_NETWORK... [OK]",
    "> ACCESSING_FOUNDER_VISION... [OK]",
    "> LOADING_PROJECT_OVEXIS... [OK]",
    "> LOADING_PROJECT_GAMEOX... [OK]",
    "> ESTABLISHING_IMMERSIVE_INTERFACE...",
    "> WELCOME TO THE FUTURE OF COGNITION.",
    "> SYSTEM READY."
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        setLines((prev) => [...prev, bootSequence[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 1000);
        }, 1000);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center p-6 font-code"
        >
          <div className="max-w-2xl w-full text-primary">
            <div className="mb-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="space-y-2">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-lg md:text-xl font-medium tracking-tight"
                >
                  {line}
                </motion.p>
              ))}
              {!isFinished && (
                <span className="terminal-cursor" />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
