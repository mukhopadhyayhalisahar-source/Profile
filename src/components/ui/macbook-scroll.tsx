"use client";
import React, { useRef } from "react";
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
  const translate = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const keyboardOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="min-h-[200vh] flex flex-col items-center py-0 md:py-80 justify-start flex-shrink-0 [perspective:1000px] transform md:scale-100 scale-[0.35] sm:scale-50"
    >
      <motion.h2
        style={{ opacity: textOpacity }}
        className="text-white text-3xl md:text-5xl font-bold mb-20 text-center px-4 font-headline"
      >
        {title}
      </motion.h2>
      
      <div className="relative [perspective:1000px]">
        <Lid
          src={src}
          scaleX={scaleX}
          scaleY={scaleY}
          rotate={rotate}
          translate={translate}
        />
        {/* Base / Keyboard */}
        <div className="h-[22rem] w-[32rem] bg-[#272729] rounded-2xl overflow-hidden relative shadow-2xl border-t-2 border-white/5">
          {/* Keyboard Surface */}
          <motion.div style={{ opacity: keyboardOpacity }} className="h-full w-full p-6">
             <div className="grid grid-cols-12 gap-1.5 h-full opacity-40">
               {Array.from({length: 60}).map((_, i) => (
                 <div key={i} className={cn(
                   "bg-neutral-800 rounded-[2px] h-6 shadow-inner border border-black/40",
                   i === 0 ? "col-span-2" : "col-span-1",
                   i === 58 ? "col-span-4" : ""
                 )} />
               ))}
             </div>
             {/* Trackpad */}
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-40 h-24 bg-neutral-900 rounded-lg border border-white/5 shadow-inner" />
          </motion.div>
          {/* Edge highlight */}
          <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {badge && (
          <div className="absolute -left-12 bottom-12 z-50">
            {badge}
          </div>
        )}
      </div>
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
    <div
      style={{
        transform: "perspective(1000px) rotateX(-25deg) translateZ(0px)",
        transformOrigin: "bottom",
      }}
      className="h-[12.5rem] w-[32rem] bg-[#010101] rounded-2xl"
    >
      <div className="h-full w-full relative">
        <motion.div
          style={{
            scaleX: scaleX,
            scaleY: scaleY,
            rotateX: rotate,
            translateY: translate,
            transformOrigin: "bottom",
            transformStyle: "preserve-3d",
          }}
          className="h-full w-full absolute inset-0 bg-[#010101] rounded-2xl p-2 border-t border-white/10"
        >
          <div className="h-full w-full bg-neutral-900 rounded-xl overflow-hidden relative border border-white/5">
            <img
              src={src || "https://picsum.photos/seed/gameox/1200/800"}
              alt="Project Showcase"
              className="object-cover h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};