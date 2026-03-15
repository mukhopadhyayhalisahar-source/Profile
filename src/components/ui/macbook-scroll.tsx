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

  // Aggressive scaling for "fit screen" effect
  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.4],
    [1, isMobile ? 1.2 : 3.2]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.4],
    [1, isMobile ? 1.2 : 3.2]
  );
  
  // Translation to clear the section and fit into view
  const translate = useTransform(scrollYProgress, [0, 0.6], [0, 1400]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.15, 0.4], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={ref}
      className="flex min-h-[300vh] shrink-0 transform flex-col items-center justify-start py-20 [perspective:1200px] bg-black overflow-clip"
    >
      <motion.div
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="mb-20 text-center z-50"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white font-headline max-w-2xl px-6 leading-tight">
          {title}
        </h2>
      </motion.div>

      <div className="sticky top-[15%] flex flex-col items-center z-40">
        <Lid
          src={src}
          scaleX={scaleX}
          scaleY={scaleY}
          rotate={rotate}
          translate={translate}
        />
        
        {/* Macbook Base Area */}
        <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-[#272729] shadow-2xl border border-white/5">
          <div className="relative h-10 w-full">
            <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505] rounded-b-xl" />
          </div>
          <div className="relative flex px-2">
            <div className="mx-auto h-full w-[10%]">
              <SpeakerGrid />
            </div>
            <div className="mx-auto h-full w-[80%]">
              <Keypad />
            </div>
            <div className="mx-auto h-full w-[10%]">
              <SpeakerGrid />
            </div>
          </div>
          <Trackpad />
          <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-24 rounded-t-xl bg-gradient-to-t from-[#3a3a3c] to-[#050505]" />
          
          {showGradient && (
            <div className="absolute inset-x-0 bottom-0 z-40 h-32 w-full bg-gradient-to-t from-black via-black/40 to-transparent" />
          )}
          
          {badge && (
            <div className="absolute bottom-6 left-6 z-50 hover:scale-110 transition-transform duration-300">
              {badge}
            </div>
          )}
        </div>
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
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#0a0a0a] border border-white/5">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
             <div className="w-4 h-4 rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      {/* Interactive Screen Lid */}
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="absolute inset-0 h-[20rem] w-[32rem] rounded-2xl bg-[#010101] p-3 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        <div className="absolute inset-0 rounded-lg bg-[#111]" />
        <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 bg-black">
          {src?.includes('assets') || src?.endsWith('.mp4') || src?.endsWith('.webm') ? (
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={src} 
              alt="Screen Content" 
              className="w-full h-full object-cover"
            />
          )}
          {/* Bezel reflections */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="mx-auto my-4 h-28 w-[45%] rounded-2xl bg-[#0a0a0a]/50 border border-white/5 shadow-inner"
      style={{
        boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
      }}
    />
  );
};

export const Keypad = () => {
  return (
    <div className="mx-1 h-full [transform:translateZ(0)] rounded-xl bg-[#050505] p-2 border border-white/5 shadow-2xl">
      {/* Row 1: Function Keys */}
      <div className="mb-1 flex w-full shrink-0 gap-1">
        <KBtn className="w-12 items-end justify-start pb-1 pl-1" childrenClassName="items-start text-[6px]">esc</KBtn>
        {[
          { icon: IconBrightnessDown, f: "F1" },
          { icon: IconBrightnessUp, f: "F2" },
          { icon: IconTable, f: "F3" },
          { icon: IconSearch, f: "F4" },
          { icon: IconMicrophone, f: "F5" },
          { icon: IconMoon, f: "F6" },
          { icon: IconPlayerTrackPrev, f: "F7" },
          { icon: IconPlayerSkipForward, f: "F8" },
          { icon: IconPlayerTrackNext, f: "F9" },
          { icon: IconVolume3, f: "F10" },
          { icon: IconVolume2, f: "F11" },
          { icon: IconVolume, f: "F12" },
        ].map((item, i) => (
          <KBtn key={i} className="flex-1">
            <item.icon className="h-2 w-2" />
            <span className="text-[5px] mt-0.5">{item.f}</span>
          </KBtn>
        ))}
        <KBtn className="w-8"><div className="h-3 w-3 rounded-full bg-neutral-900 border border-white/10" /></KBtn>
      </div>

      {/* Row 2: Numbers */}
      <div className="mb-1 flex w-full shrink-0 gap-1">
        {["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+"].map((char, i) => (
          <KBtn key={i} className="flex-1 text-[8px] font-medium">{char}</KBtn>
        ))}
        <KBtn className="w-12 items-end justify-end pr-1 pb-1" childrenClassName="items-end text-[7px]">delete</KBtn>
      </div>

      {/* Row 3: QWERTY */}
      <div className="mb-1 flex w-full shrink-0 gap-1">
        <KBtn className="w-12 items-end justify-start pb-1 pl-1" childrenClassName="items-start text-[7px]">tab</KBtn>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"].map((char, i) => (
          <KBtn key={i} className="flex-1 text-[9px] font-bold">{char}</KBtn>
        ))}
      </div>

      {/* Row 4: ASDF */}
      <div className="mb-1 flex w-full shrink-0 gap-1">
        <KBtn className="w-14 items-end justify-start pb-1 pl-1" childrenClassName="items-start text-[7px]">caps lock</KBtn>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"].map((char, i) => (
          <KBtn key={i} className="flex-1 text-[9px] font-bold">{char}</KBtn>
        ))}
        <KBtn className="w-14 items-end justify-end pr-1 pb-1" childrenClassName="items-end text-[7px]">return</KBtn>
      </div>

      {/* Row 5: ZXCV */}
      <div className="mb-1 flex w-full shrink-0 gap-1">
        <KBtn className="w-16 items-end justify-start pb-1 pl-1" childrenClassName="items-start text-[7px]">shift</KBtn>
        {["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"].map((char, i) => (
          <KBtn key={i} className="flex-1 text-[9px] font-bold">{char}</KBtn>
        ))}
        <KBtn className="w-16 items-end justify-end pr-1 pb-1" childrenClassName="items-end text-[7px]">shift</KBtn>
      </div>

      {/* Row 6: Controls */}
      <div className="flex w-full shrink-0 gap-1">
        <KBtn className="flex-1" childrenClassName="h-full justify-between py-1">
          <span className="text-[6px] pl-1">fn</span>
          <IconWorld className="h-2 w-2 pr-1" />
        </KBtn>
        <KBtn className="flex-1" childrenClassName="h-full justify-between py-1">
          <IconChevronUp className="h-2 w-2 pl-1" />
          <span className="text-[6px] pr-1">ctrl</span>
        </KBtn>
        <KBtn className="flex-1" childrenClassName="h-full justify-between py-1">
          <OptionKey className="h-2 w-2 pl-1" />
          <span className="text-[6px] pr-1">opt</span>
        </KBtn>
        <KBtn className="w-10" childrenClassName="h-full justify-between py-1">
          <IconCommand className="h-2 w-2 pl-1" />
          <span className="text-[6px] pr-1">cmd</span>
        </KBtn>
        <KBtn className="w-[8rem] h-6"></KBtn>
        <KBtn className="w-10" childrenClassName="h-full justify-between py-1">
          <IconCommand className="h-2 w-2 pl-1" />
          <span className="text-[6px] pr-1">cmd</span>
        </KBtn>
        <KBtn className="flex-1" childrenClassName="h-full justify-between py-1">
          <OptionKey className="h-2 w-2 pl-1" />
          <span className="text-[6px] pr-1">opt</span>
        </KBtn>
        <div className="flex flex-col gap-0.5">
          <KBtn className="h-3 w-10"><IconCaretUpFilled className="h-2 w-2" /></KBtn>
          <div className="flex gap-0.5">
            <KBtn className="h-3 w-[1.2rem]"><IconCaretLeftFilled className="h-2 w-2" /></KBtn>
            <KBtn className="h-3 w-[1.2rem]"><IconCaretDownFilled className="h-2 w-2" /></KBtn>
            <KBtn className="h-3 w-[1.2rem]"><IconCaretRightFilled className="h-2 w-2" /></KBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

const KBtn = ({
  className,
  children,
  childrenClassName,
}: {
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "p-[0.5px] rounded-[3px] bg-gradient-to-b from-[#464646] to-[#040404] shadow-md",
        className
      )}
    >
      <div
        className={cn(
          "h-full w-full rounded-[2.5px] bg-[#050505] flex flex-col items-center justify-center text-white/90 select-none",
          childrenClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

const SpeakerGrid = () => {
  return (
    <div
      className="flex px-[1px] gap-[2px] mt-4 h-full w-full flex-wrap opacity-40"
      style={{
        backgroundImage: "radial-gradient(circle, #888 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
};

const OptionKey = ({ className }: { className?: string }) => {
  return (
    <svg fill="none" viewBox="0 0 22 22" className={className}>
      <path fill="currentColor" d="M6,22L6,22L6,22C6,22,6,22,6,22z M15,6h6v2h-6V6z M10.2,6h2.2L6,22H3.8L10.2,6z M15,22h6v-2h-6V22z" />
    </svg>
  );
};