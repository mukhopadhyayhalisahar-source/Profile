
"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Stethoscope, Syringe, Microscope, Dna, HeartPulse, 
  ClipboardList, BookOpen, Rocket, Target, Activity,
  Baby, Scissors, GraduationCap, ChevronRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TimelineData = [
  {
    date: "2023 – Present",
    title: "MBBS Student",
    institution: "Jhargram Government Medical College",
    details: "Clinical Training Exposure: OBGY | Surgery | Medicine | ENT | ICTC | Community Health",
    projects: "Projects: Gameox | Clipper 360 | Public Health Projects"
  }
];

const ClinicalRotations = [
  { name: "Obstetrics & Gynecology (OBGY)", icon: Baby },
  { name: "General Surgery", icon: Scissors },
  { name: "General Medicine", icon: Stethoscope },
  { name: "ENT", icon: Activity },
  { name: "ICTC", icon: ClipboardList, desc: "Integrated Counselling & Testing Centre" },
  { name: "Preventive & Social Medicine (PSM)", icon: HeartPulse, desc: "Field visits and Public health surveys" },
];

const Procedures = [
  "Hernia repair surgery",
  "Lipofibroma removal surgery",
  "Routine surgical ward procedures",
  "Patient diagnostic evaluations"
];

export function MedicalPortfolio() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 1. Medical Journey */}
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary mb-6"
          >
            <GraduationCap className="w-4 h-4" />
            Medical Journey
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8">
            Medical Student Exploring the <br /> <span className="text-primary">Future of Healthcare</span>
          </h2>
          <p className="max-w-3xl mx-auto text-neutral-400 text-lg md:text-xl leading-relaxed font-body">
            I am currently pursuing my MBBS at Jhargram Government Medical College with an expected graduation in 2029. 
            My medical journey combines traditional clinical training with a deep interest in technology, 
            neuroscience, and healthcare innovation. Alongside my medical education, I actively explore how AI, 
            software systems, and data-driven tools can improve diagnosis, hospital efficiency, and patient care.
          </p>
        </div>

        {/* 2 & 3. Clinical Depth */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Stethoscope className="w-6 h-6 text-primary" />
              Clinical Exposure
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {ClinicalRotations.map((rotation, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6">
                    <rotation.icon className="w-8 h-8 text-primary mb-4" />
                    <h4 className="font-bold text-sm mb-1">{rotation.name}</h4>
                    {rotation.desc && <p className="text-[10px] text-neutral-500">{rotation.desc}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Scissors className="w-6 h-6 text-primary" />
              Observed Clinical Procedures
            </h3>
            <div className="space-y-4">
              {Procedures.map((procedure, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm md:text-base text-neutral-300 font-medium">{procedure}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Medical Projects */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Rocket className="w-8 h-8 text-secondary" />
            Medical Projects & Explorations
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Gameox", 
                desc: "A gesture-operated game designed to generate medical reports related to neurological conditions such as Parkinson’s disease based on gameplay analysis.",
                tag: "AI & Neuro"
              },
              { 
                title: "PSM Project", 
                desc: "Participation in public health initiatives and field-based research exploring community healthcare challenges.",
                tag: "Public Health"
              },
              { 
                title: "Pathology Museum Work", 
                desc: "Engagement in academic activities involving specimen observation and pathological learning through museum-based study.",
                tag: "Academia"
              },
              { 
                title: "Clipper 360", 
                desc: "An ongoing project exploring new diagnostic approaches and healthcare tools to improve diagnostics.",
                tag: "Diagnostics"
              }
            ].map((project, i) => (
              <Card key={i} className="bg-white/5 border-white/10 h-full">
                <CardContent className="p-8 flex flex-col h-full">
                  <Badge variant="secondary" className="w-fit mb-4 text-[10px]">{project.tag}</Badge>
                  <h4 className="text-xl font-bold mb-4">{project.title}</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed font-body flex-grow">
                    {project.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 5, 6 & 7. Learning, Research & Vision */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          <Card className="bg-gradient-to-b from-primary/10 to-transparent border-primary/20">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                Learning
              </h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Clinical medicine</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Pathology mechanisms</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Neuroscience</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Diagnostic reasoning</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-secondary/10 to-transparent border-secondary/20">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Microscope className="w-6 h-6 text-secondary" />
                Research
              </h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> AI in medicine</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Neuroscience</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Hospital system design</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Public health systems</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-white/10 to-transparent border-white/20">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Target className="w-6 h-6 text-white" />
                Vision
              </h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white" /> AI-assisted diagnostics</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white" /> Intelligent infrastructure</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white" /> Medical automation</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white" /> Data-driven management</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Timeline</h3>
          <div className="relative border-l border-white/10 ml-6 pl-12 space-y-12">
            {TimelineData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="absolute -left-[3.75rem] top-0 w-6 h-6 rounded-full bg-primary border-4 border-black z-20" />
                <span className="text-primary font-bold text-sm">{item.date}</span>
                <h4 className="text-2xl font-bold mt-2">{item.title}</h4>
                <p className="text-neutral-300 font-medium">{item.institution}</p>
                <p className="text-neutral-500 text-sm mt-4">{item.details}</p>
                <p className="text-neutral-500 text-sm mt-1">{item.projects}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
