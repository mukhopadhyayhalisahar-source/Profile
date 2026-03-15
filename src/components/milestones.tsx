"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Code, Rocket, Award } from "lucide-react";

const milestones = [
  {
    year: "2018 - 2023",
    title: "Medical Education",
    subtitle: "Doctor of Medicine (M.D.)",
    description: "Specialized focus on neuropsychology and bio-medical engineering. Conducted research on neural-interface protocols.",
    icon: GraduationCap,
    color: "primary"
  },
  {
    year: "2020",
    title: "The Pivot",
    subtitle: "Self-Taught Computer Science",
    description: "Mastered full-stack development and machine learning fundamentals during clinical rotations. Started Neural Canvas as an experimental blog.",
    icon: Code,
    color: "secondary"
  },
  {
    year: "2021",
    title: "Project Gameox Launch",
    subtitle: "Innovation in HealthTech",
    description: "Developed and clinical-tested the gesture-based rehabilitation system. Received local innovation award.",
    icon: Rocket,
    color: "primary"
  },
  {
    year: "2023",
    title: "Project Lynex Beta",
    subtitle: "AI Personal Assistance",
    description: "Launched the first private beta of Lynex AI. Scaled architecture to handle concurrent neural processing.",
    icon: Award,
    color: "secondary"
  }
];

export function Milestones() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="space-y-4">
          <h2 className="text-4xl font-headline font-bold text-center">Milestones</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-[1.35rem] top-0 bottom-0 w-0.5 bg-border md:left-1/2" />

          {milestones.map((ms, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex items-center gap-8 ${
                idx % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Icon Node */}
              <div className="absolute left-0 w-11 h-11 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10 md:left-1/2 md:-translate-x-1/2">
                <ms.icon className="w-5 h-5 text-primary" />
              </div>

              {/* Content Card */}
              <div className="flex-1 ml-16 md:ml-0 md:w-1/2">
                <div className={`p-6 rounded-2xl border border-border bg-muted/30 backdrop-blur-sm transition-all hover:border-primary/50 group ${
                  idx % 2 === 0 ? "md:mr-12" : "md:ml-12"
                }`}>
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">{ms.year}</span>
                  <h3 className="text-2xl font-headline font-bold mt-1 group-hover:text-primary transition-colors">{ms.title}</h3>
                  <p className="text-sm font-medium text-secondary mb-3">{ms.subtitle}</p>
                  <p className="text-muted-foreground">{ms.description}</p>
                </div>
              </div>

              {/* Empty space for alignment */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}