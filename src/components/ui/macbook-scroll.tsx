"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
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
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.2, isMobile ? 1 : 1.5]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 1 : 1.5]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={ref}
      className="flex min-h-[200vh] shrink-0 scale-[0.35] transform flex-col items-center justify-start py-0 [perspective:800px] sm:scale-50 md:scale-100 md:py-80"
    >
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="mb-20 text-center text-3xl font-bold text-neutral-800 dark:text-white font-headline"
      >
        {title || (
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        )}
      </motion.h2>
      <Lid
        src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      />
      <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]">
        <div className="relative h-10 w-full">
          <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
        </div>
        <div className="relative flex">
          <div className="mx-auto h-full w-[10%] overflow-hidden">
            <SpeakerGrid />
          </div>
          <div className="mx-auto h-full w-[80%]">
            <Keypad />
          </div>
          <div className="mx-auto h-full w-[10%] overflow-hidden">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
        {showGradient && (
          <div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black"></div>
        )}
        {badge && <div className="absolute bottom-4 left-4 z-50">{badge}</div>}
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
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div
          style={{
            boxShadow: "0px 2px 0px 2px #171717 inset",
          }}
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
        >
          <span className="text-white">
            <AceternityLogo />
          </span>
        </div>
      </div>
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div className="absolute inset-0 rounded-lg bg-[#272729]" />
        <img
          src={src || "https://picsum.photos/seed/gameox/1200/800"}
          alt="macbook screen"
          className="absolute inset-0 h-full w-full rounded-lg object-cover object-left-top"
        />
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    ></div>
  );
};

export const Keypad = () => {
  return (
    <div className="mx-1 h-full [transform:translateZ(0)] rounded-md bg-[#050505] p-1 [will-change:transform]">
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">esc</KBtn>
        <KBtn><IconBrightnessDown className="h-[6px] w-[6px]" /><span className="mt-1 inline-block text-[5px]">F1</span></KBtn>
        <KBtn><IconBrightnessUp className="h-[6px] w-[6px]" /><span className="mt-1 inline-block text-[5px]">F2</span></KBtn>
        <KBtn><IconTable className="h-[6px] w-[6px]" /><span className="mt-1 inline-block text-[5px]">F3</span></KBtn>
        <KBtn><IconSearch className="h-[6px] w-[6px]" /><span className="mt-1 inline-block text-[5px]">F4</span></KBtn>
        <KBtn><IconMicrophone className="h-[6px] w-[6px]" /><span className="mt-1 inline-block text-[5px]">F5</span></KBtn>
        <KBtn><IconMoon className="h-[6px] w-[6px]" /><span className="mt-1 inline-block text-[5px]">F6</span></KBtn>
        <KBtn><IconPlayerTrackPrev className="h-[6px] w-[6px]" /><span className="mt-1 inline-block text-[5px]">F7</span></KBtn>
        <KBtn><IconPlayerSkipForward className="h-[6px] w-[6px]" /><span className="mt-1 inline-block text-[5px]">F8</span></KBtn>
        <KBtn><IconPlayerTrackNext className="h-[6px] w-[6px]" /><span className="mt-1 inline-block text-[5px]">F9</span></KBtn>
        <KBtn><IconVolume3 className="h-[6px] w-[6px]" /><span className="mt-1 inline-block text-[5px]">F10</span></KBtn>
        <KBtn><IconVolume2 className="h-[6px] w-[6px]" /><span className="mt-1 inline-block text-[5px]">F11</span></KBtn>
        <KBtn><IconVolume className="h-[6px] w-[6px]" /><span className="mt-1 inline-block text-[5px]">F12</span></KBtn>
        <KBtn><div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px"><div className="h-full w-full rounded-full bg-black" /></div></KBtn>
      </div>

      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn><span className="block text-[6px]">~</span><span className="mt-1 block text-[6px]">`</span></KBtn>
        <KBtn><span className="block text-[6px]">!</span><span className="block text-[6px]">1</span></KBtn>
        <KBtn><span className="block text-[6px]">@</span><span className="block text-[6px]">2</span></KBtn>
        <KBtn><span className="block text-[6px]">#</span><span className="block text-[6px]">3</span></KBtn>
        <KBtn><span className="block text-[6px]">$</span><span className="block text-[6px]">4</span></KBtn>
        <KBtn><span className="block text-[6px]">%</span><span className="block text-[6px]">5</span></KBtn>
        <KBtn><span className="block text-[6px]">^</span><span className="block text-[6px]">6</span></KBtn>
        <KBtn><span className="block text-[6px]">&</span><span className="block text-[6px]">7</span></KBtn>
        <KBtn><span className="block text-[6px]">*</span><span className="block text-[6px]">8</span></KBtn>
        <KBtn><span className="block text-[6px]">(</span><span className="block text-[6px]">9</span></KBtn>
        <KBtn><span className="block text-[6px]">)</span><span className="block text-[6px]">0</span></KBtn>
        <KBtn><span className="block text-[6px]">&mdash;</span><span className="block text-[6px]">_</span></KBtn>
        <KBtn><span className="block text-[6px]">+</span><span className="block text-[6px]"> = </span></KBtn>
        <KBtn className="w-10 items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">delete</KBtn>
      </div>

      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">tab</KBtn>
        <KBtn><span className="block text-[6px]">Q</span></KBtn>
        <KBtn><span className="block text-[6px]">W</span></KBtn>
        <KBtn><span className="block text-[6px]">E</span></KBtn>
        <KBtn><span className="block text-[6px]">R</span></KBtn>
        <KBtn><span className="block text-[6px]">T</span></KBtn>
        <KBtn><span className="block text-[6px]">Y</span></KBtn>
        <KBtn><span className="block text-[6px]">U</span></KBtn>
        <KBtn><span className="block text-[6px]">I</span></KBtn>
        <KBtn><span className="block text-[6px]">O</span></KBtn>
        <KBtn><span className="block text-[6px]">P</span></KBtn>
        <KBtn><span className="block text-[6px]">{`{`}</span><span className="block text-[6px]">{`[`}</span></KBtn>
        <KBtn><span className="block text-[6px]">{`}`}</span><span className="block text-[6px]">{`]`}</span></KBtn>
        <KBtn><span className="block text-[6px]">{`|`}</span><span className="block text-[6px]">{`\\`}</span></KBtn>
      </div>

      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">caps lock</KBtn>
        <KBtn><span className="block text-[6px]">A</span></KBtn>
        <KBtn><span className="block text-[6px]">S</span></KBtn>
        <KBtn><span className="block text-[6px]">D</span></KBtn>
        <KBtn><span className="block text-[6px]">F</span></KBtn>
        <KBtn><span className="block text-[6px]">G</span></KBtn>
        <KBtn><span className="block text-[6px]">H</span></KBtn>
        <KBtn><span className="block text-[6px]">J</span></KBtn>
        <KBtn><span className="block text-[6px]">K</span></KBtn>
        <KBtn><span className="block text-[6px]">L</span></KBtn>
        <KBtn><span className="block text-[6px]">{`:`}</span><span className="block text-[6px]">{`;`}</span></KBtn>
        <KBtn><span className="block text-[6px]">{`"`}</span><span className="block text-[6px]">{`'`}</span></KBtn>
        <KBtn className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">return</KBtn>
      </div>

      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">shift</KBtn>
        <KBtn><span className="block text-[6px]">Z</span></KBtn>
        <KBtn><span className="block text-[6px]">X</span></KBtn>
        <KBtn><span className="block text-[6px]">C</span></KBtn>
        <KBtn><span className="block text-[6px]">V</span></KBtn>
        <KBtn><span className="block text-[6px]">B</span></KBtn>
        <KBtn><span className="block text-[6px]">N</span></KBtn>
        <KBtn><span className="block text-[6px]">M</span></KBtn>
        <KBtn><span className="block text-[6px]">{`<`}</span><span className="block text-[6px]">{`,`}</span></KBtn>
        <KBtn><span className="block text-[6px]">{`>`}</span><span className="block text-[6px]">{`.`}</span></KBtn>
        <KBtn><span className="block text-[6px]">{`?`}</span><span className="block text-[6px]">{`/`}</span></KBtn>
        <KBtn className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">shift</KBtn>
      </div>

      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1"><span className="block text-[5px]">fn</span></div>
          <div className="flex w-full justify-start pl-1"><IconWorld className="h-[6px] w-[6px]" /></div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1"><IconChevronUp className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block text-[5px]">control</span></div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1"><OptionKey className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block text-[5px]">option</span></div>
        </KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1"><IconCommand className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block text-[5px]">command</span></div>
        </KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1"><IconCommand className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block text-[5px]">command</span></div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1"><OptionKey className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block text-[5px]">option</span></div>
        </KBtn>
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6"><IconCaretUpFilled className="h-[6px] w-[6px]" /></KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6"><IconCaretLeftFilled className="h-[6px] w-[6px]" /></KBtn>
            <KBtn className="h-3 w-6"><IconCaretDownFilled className="h-[6px] w-[6px]" /></KBtn>
            <KBtn className="h-3 w-6"><IconCaretRightFilled className="h-[6px] w-[6px]" /></KBtn>
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
        "p-[0.5px] rounded-[4px] bg-gradient-to-b from-[#464646] via-[#282828] to-[#040404] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      <div
        className={cn(
          "h-full w-full rounded-[3.5px] bg-[#050505] flex flex-col items-center justify-center",
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
      className="flex px-[0.5px] gap-[2px] mt-2 h-full w-full flex-wrap"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080a 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    ></div>
  );
};

const OptionKey = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="none"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 22 22"
      xmlSpace="preserve"
      className={className}
    >
      <path
        fill="currentColor"
        d="M6,22L6,22L6,22C6,22,6,22,6,22z M15,6h6v2h-6V6z M10.2,6h2.2L6,22H3.8L10.2,6z M15,22h6v-2h-6V22z"
      />
    </svg>
  );
};

const AceternityLogo = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
};
