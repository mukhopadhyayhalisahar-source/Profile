
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.3], [1.2, 1]);
  const scaleY = useTransform(scrollYProgress, [0, 0.3], [1.5, 1]);
  const translate = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const keyboardOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="min-h-[200vh] flex flex-col items-center py-0 md:py-40 justify-start flex-shrink-0 [perspective:800px] transform md:scale-100 scale-[0.35] sm:scale-50"
    >
      <motion.h2
        style={{ opacity: textOpacity }}
        className="text-neutral-800 dark:text-white text-3xl font-bold mb-20 text-center"
      >
        {title || (
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        )}
      </motion.h2>
      {/* Lid */}
      <Lid
        src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      />
      {/* Base */}
      <div className="h-[22rem] w-[32rem] bg-gray-200 dark:bg-[#272729] rounded-2xl overflow-hidden relative shadow-2xl">
        {/* Keyboard Simulation */}
        <motion.div style={{ opacity: keyboardOpacity }} className="h-full w-full p-4">
           <div className="grid grid-cols-12 gap-1 h-full opacity-20">
             {Array.from({length: 48}).map((_, i) => (
               <div key={i} className="bg-neutral-500 rounded-sm h-6 w-full" />
             ))}
           </div>
        </motion.div>
      </div>
      {badge && <div className="absolute bottom-20 right-20">{badge}</div>}
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
}: {
  scaleX: any;
  scaleY: any;
  rotate: any;
  translate: any;
  src?: string;
}) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
        }}
        className="h-[12rem] w-[32rem] bg-[#010101] rounded-2xl"
      >
        <div className="h-full w-full relative">
          <motion.div
            style={{
              scaleX: scaleX,
              scaleY: scaleY,
              rotateX: rotate,
              translateY: translate,
              transformOrigin: "top",
              transformStyle: "preserve-3d",
            }}
            className="h-full w-full absolute inset-0 bg-[#010101] rounded-2xl p-2"
          >
            <div className="h-full w-full bg-neutral-900 rounded-xl overflow-hidden relative border border-white/10">
              <img
                src={src || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1024&h=768"}
                alt="macbook cover"
                className="object-cover h-full w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
