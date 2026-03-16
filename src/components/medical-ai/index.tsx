
'use client';

import React from 'react';
import { ClinicalSimulator } from './ClinicalSimulator';
import { WorkflowSimulator } from './WorkflowSimulator';
import { NeuroScreening } from './NeuroScreening';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Hospital, Search, Sparkles } from 'lucide-react';

export function AdvancedAILab() {
  return (
    <section id="ai-lab" className="py-24 px-6 bg-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary mb-2"
            >
              <Sparkles className="w-4 h-4" />
              ADVANCED MEDICAL AI LAB
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-white">
              Experimental <br /> <span className="text-primary animate-glow">Systems Prototype.</span>
            </h2>
            <p className="text-neutral-400 font-body text-lg leading-relaxed">
              Bridging the gap between clinical theory and practical intelligent systems. These prototypes explore the future of automated diagnostics and hospital infrastructure.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="text-[10px] font-mono text-neutral-600 tracking-[0.5em] uppercase border-l border-white/10 pl-6 h-20 flex items-center">
              SYSTEM_PHASE: INNOVATOR_PROTOTYPING
            </div>
          </div>
        </div>

        <Tabs defaultValue="clinical" className="space-y-12">
          <TabsList className="bg-white/5 border border-white/10 p-1 h-auto rounded-[2rem] gap-2">
            <TabsTrigger 
              value="clinical" 
              className="rounded-[1.5rem] px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-white gap-2 transition-all"
            >
              <Brain className="w-4 h-4" />
              Differential Diagnosis
            </TabsTrigger>
            <TabsTrigger 
              value="workflow" 
              className="rounded-[1.5rem] px-8 py-3 data-[state=active]:bg-secondary data-[state=active]:text-white gap-2 transition-all"
            >
              <Hospital className="w-4 h-4" />
              Workflow Optimizer
            </TabsTrigger>
            <TabsTrigger 
              value="neuro" 
              className="rounded-[1.5rem] px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-white gap-2 transition-all"
            >
              <Search className="w-4 h-4" />
              Neuro-Screening
            </TabsTrigger>
          </TabsList>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TabsContent value="clinical">
              <ClinicalSimulator />
            </TabsContent>
            <TabsContent value="workflow">
              <WorkflowSimulator />
            </TabsContent>
            <TabsContent value="neuro">
              <NeuroScreening />
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </section>
  );
}
