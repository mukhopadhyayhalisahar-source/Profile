
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Info, Stethoscope, ChevronRight, Activity, AlertCircle } from 'lucide-react';

const SYMPTOMS = [
  "Resting Tremor", "Rigidity", "Bradykinesia", "Postural Instability",
  "Memory Loss", "Confusion", "Aphasia", "Personality Changes",
  "Headache", "Nausea", "Photophobia", "Visual Aura",
  "Dizziness", "Fatigue", "Muscle Weakness", "Numbness"
];

const DISEASE_MAPPING = [
  {
    name: "Parkinson's Disease",
    symptoms: ["Resting Tremor", "Rigidity", "Bradykinesia", "Postural Instability"],
    reasoning: "Classic triad of tremor, rigidity, and bradykinesia suggests dopamine depletion in the substantia nigra.",
    confidence: 0.85
  },
  {
    name: "Alzheimer's Dementia",
    symptoms: ["Memory Loss", "Confusion", "Aphasia", "Personality Changes"],
    reasoning: "Progressive cognitive decline with memory impairment as the hallmark feature.",
    confidence: 0.75
  },
  {
    name: "Migraine with Aura",
    symptoms: ["Headache", "Nausea", "Photophobia", "Visual Aura"],
    reasoning: "Cortical spreading depression manifesting as visual aura followed by intense headache.",
    confidence: 0.90
  },
  {
    name: "Multiple Sclerosis",
    symptoms: ["Muscle Weakness", "Numbness", "Fatigue", "Dizziness"],
    reasoning: "Demyelinating lesions in the CNS presenting with multi-focal neurological deficits.",
    confidence: 0.65
  }
];

export function ClinicalSimulator() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom) 
        : [...prev, symptom]
    );
  };

  const results = useMemo(() => {
    if (selectedSymptoms.length === 0) return [];
    
    return DISEASE_MAPPING.map(disease => {
      const matchCount = disease.symptoms.filter(s => selectedSymptoms.includes(s)).length;
      const matchScore = matchCount / disease.symptoms.length;
      return { ...disease, matchScore };
    })
    .filter(d => d.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
  }, [selectedSymptoms]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
          <BrainCircuit className="text-primary w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-headline font-bold text-white uppercase tracking-widest">Clinical Thinking Simulator</h3>
          <p className="text-[10px] font-mono text-primary opacity-70 italic">MODE: DIFFERENTIAL_DIAGNOSIS_ENGINE</p>
        </div>
      </div>

      <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-primary" />
            SELECT PRESENTING SYMPTOMS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {SYMPTOMS.map((symptom) => (
              <Button
                key={symptom}
                variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSymptom(symptom)}
                className={`rounded-full text-[10px] h-8 px-4 transition-all ${
                  selectedSymptoms.includes(symptom) 
                    ? "bg-primary text-white border-primary" 
                    : "border-white/10 text-white/60 hover:border-primary/40"
                }`}
              >
                {symptom}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-white/5 rounded-3xl p-6 h-full min-h-[300px]">
          <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-6">Differential Probability</h4>
          <AnimatePresence mode="wait">
            {results.length > 0 ? (
              <div className="space-y-6">
                {results.map((res, i) => (
                  <motion.div
                    key={res.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold text-white">{res.name}</span>
                      <span className="text-[10px] font-mono text-primary">{(res.matchScore * 100).toFixed(0)}% Match</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${res.matchScore * 100}%` }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-30">
                <Activity className="w-12 h-12 text-primary" />
                <p className="text-[10px] font-mono uppercase tracking-widest">Awaiting symptomatic input...</p>
              </div>
            )}
          </AnimatePresence>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 via-black to-black border border-primary/20 rounded-3xl p-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
            <BrainCircuit className="w-full h-full text-primary" />
          </div>
          <h4 className="text-[10px] font-mono text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
            <Info className="w-3 h-3" />
            Clinical Reasoning Flow
          </h4>
          <div className="space-y-4">
            {results.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-xs text-neutral-400 italic leading-relaxed">
                    "{results[0].reasoning}"
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                    <span className="text-[10px] font-mono text-neutral-300">Confidence Threshold: {results[0].confidence}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="text-[10px] font-mono text-neutral-300">Pathophysiological Mapping: ACTIVE</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-20">
                <AlertCircle className="w-8 h-8 text-neutral-500" />
                <p className="text-[10px] font-mono">Differential engine offline</p>
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-6 right-6 pt-4 border-t border-white/5">
            <p className="text-[8px] text-neutral-600 font-mono italic">
              DISCLAIMER: For educational/research demonstration only. Not for medical diagnosis.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
