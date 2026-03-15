"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { generateProjectInsightSummary, type GenerateProjectInsightSummaryOutput } from "@/ai/flows/generate-project-insight-summary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Sparkles, Loader2, Lightbulb } from "lucide-react";

export function ProjectInsights() {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<GenerateProjectInsightSummaryOutput | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName || !projectDescription) return;

    setLoading(true);
    try {
      const result = await generateProjectInsightSummary({
        projectName,
        projectDescription,
        targetAudience: "Technical stakeholders and general public"
      });
      setInsight(result);
    } catch (error) {
      console.error("Failed to generate insight", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-headline font-bold">AI Insight Generator</h2>
          <p className="text-lg text-muted-foreground">Experience the power of GenAI. Provide a project overview and let our engine distill its essence.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="border-primary/10 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Input Parameters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Name</label>
                  <Input 
                    placeholder="e.g., Lynex AI" 
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="bg-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    placeholder="Describe your project's core functionality and innovation..." 
                    className="min-h-[150px] bg-muted/50"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>
                <Button disabled={loading} className="w-full">
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  Analyze with AI
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {insight ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card className="border-primary/10 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-xl">Vision Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{insight.summary}</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/10 bg-secondary/5">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-secondary" />
                      Key Innovations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {insight.keyInnovations.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-muted rounded-xl bg-muted/20">
                <Cpu className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
                <p className="text-muted-foreground italic">Analysis engine awaiting input...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}