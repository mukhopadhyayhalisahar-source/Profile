"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconSearch,
  IconWorld,
  IconCommand,
  IconCaretLeftFilled,
  IconCaretDownFilled
} from "@tabler/icons-react";

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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calibrated scaling to fit screen without over-zooming
  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, isMobile ? 1.1 : 2.4]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, isMobile ? 1.1 : 2.4]
  );
  
  // Controlled translation to keep video in view and prevent overlap
  const translate = useTransform(scrollYProgress, [0, 0.5], [0, 400]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.2, 0.4], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div
      ref={ref}
      className="flex min-h-[250vh] flex-col items-center justify-start py-20 [perspective:1200px] bg-black overflow-hidden relative"
    >
      <motion.div
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="mb-20 text-center z-50 px-6"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white font-headline max-w-2xl leading-tight">
          {title}
        </h2>
      </motion.div>

      <div className="sticky top-[15vh] flex flex-col items-center z-40 w-full h-full">
        <Lid
          src={src}
          scaleX={scaleX}
          scaleY={scaleY}
          rotate={rotate}
          translate={translate}
        />
        
        {/* Macbook Base */}
        <div className="relative -z-10 h-[22rem] w-[32rem] rounded-2xl bg-[#272729] shadow-2xl border border-white/5 mt-[-1px]">
          <div className="relative h-10 w-full">
            <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505] rounded-b-xl" />
          </div>
          <div className="relative flex px-2 h-[10rem]">
            <div className="mx-auto h-full w-[8%]">
              <SpeakerGrid />
            </div>
            <div className="mx-auto h-full w-[84%]">
              <Keypad />
            </div>
            <div className="mx-auto h-full w-[8%]">
              <SpeakerGrid />
            </div>
          </div>
          <Trackpad />
          <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-24 rounded-t-xl bg-gradient-to-t from-[#3a3a3c] to-[#050505]" />
          
          {showGradient && (
            <div className="absolute inset-x-0 bottom-0 z-40 h-32 w-full bg-gradient-to-t from-black via-black/40 to-transparent" />
          )}
          
          {badge && (
            <div className="absolute bottom-6 left-6 z-50">
              {badge}
            </div>
          )}
        </div>
      </div>
      
      {/* Spacer to prevent section overlap */}
      <div className="h-[100vh]" />
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
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  src?: string;
}) => {
  return (
    <div className="relative [perspective:1200px] z-50">
      {/* Back of Lid */}
      <div
        style={{
          transform: "perspective(1200px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#0a0a0a] border border-white/5" />
      </div>

      {/* Screen Lid */}
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="absolute inset-0 h-[20rem] w-[32rem] rounded-2xl bg-[#010101] p-[6px] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        <div className="absolute inset-0 rounded-lg bg-[#111]" />
        <div className="relative w-full h-full rounded-md overflow-hidden bg-black border border-white/5">
          {src?.includes('assets') || src?.endsWith('.mp4') || src?.endsWith('.webm') ? (
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <img 
              src={src} 
              alt="Screen Content" 
              className="w-full h-full object-contain"
            />
          )}
          {/* Bezel Overlay */}
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
        </div>
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="mx-auto my-4 h-24 w-[42%] rounded-xl bg-[#0a0a0a]/50 border border-white/5 shadow-inner"
    />
  );
};

export const Keypad = () => {
  return (
    <div className="h-full rounded-lg bg-[#050505] p-2 border border-white/5 shadow-2xl flex flex-col gap-[2px]">
      {/* Row 1 */}
      <div className="flex w-full gap-[2px] h-[12%]">
        <KBtn className="w-10">esc</KBtn>
        {Array.from({ length: 12 }).map((_, i) => (
          <KBtn key={i} className="flex-1">F{i+1}</KBtn>
        ))}
        <KBtn className="w-10"><div className="w-2 h-2 rounded-full bg-white/20" /></KBtn>
      </div>

      {/* Row 2 */}
      <div className="flex w-full gap-[2px] h-[16%]">
        {["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+"].map((char, i) => (
          <KBtn key={i} className="flex-1">{char}</KBtn>
        ))}
        <KBtn className="w-12">delete</KBtn>
      </div>

      {/* Row 3 */}
      <div className="flex w-full gap-[2px] h-[16%]">
        <KBtn className="w-12">tab</KBtn>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"].map((char, i) => (
          <KBtn key={i} className="flex-1">{char}</KBtn>
        ))}
      </div>

      {/* Row 4 */}
      <div className="flex w-full gap-[2px] h-[16%]">
        <KBtn className="w-14">caps</KBtn>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"].map((char, i) => (
          <KBtn key={i} className="flex-1">{char}</KBtn>
        ))}
        <KBtn className="w-14">return</KBtn>
      </div>

      {/* Row 5 */}
      <div className="flex w-full gap-[2px] h-[16%]">
        <KBtn className="w-16">shift</KBtn>
        {["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"].map((char, i) => (
          <KBtn key={i} className="flex-1">{char}</KBtn>
        ))}
        <KBtn className="w-16">shift</KBtn>
      </div>

      {/* Row 6 */}
      <div className="flex w-full gap-[2px] h-[16%]">
        <KBtn className="flex-1">fn</KBtn>
        <KBtn className="flex-1">ctrl</KBtn>
        <KBtn className="flex-1">opt</KBtn>
        <KBtn className="w-10">cmd</KBtn>
        <KBtn className="w-[8rem]"></KBtn>
        <KBtn className="w-10">cmd</KBtn>
        <KBtn className="flex-1">opt</KBtn>
        <div className="flex flex-col gap-[1px] w-10">
          <KBtn className="h-1/2 w-full"><IconCaretUpFilled className="w-2 h-2" /></KBtn>
          <div className="flex h-1/2 w-full gap-[1px]">
            <KBtn className="w-1/3"><IconCaretLeftFilled className="w-2 h-2" /></KBtn>
            <KBtn className="w-1/3"><IconCaretDownFilled className="w-2 h-2" /></KBtn>
            <KBtn className="w-1/3"><IconCaretRightFilled className="w-2 h-2" /></KBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

const KBtn = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-[3px] bg-[#1a1a1a] border border-white/5 flex items-center justify-center text-[6px] text-white/70 select-none uppercase",
        className
      )}
    >
      {children}
    </div>
  );
};

const SpeakerGrid = () => {
  return (
    <div
      className="grid grid-cols-4 gap-[2px] h-full w-full opacity-20 p-1"
    >
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="w-[1px] h-[1px] bg-white rounded-full" />
      ))}
    </div>
  );
};
