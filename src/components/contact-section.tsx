"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-headline font-bold tracking-tighter">Let&apos;s Build the Future</h2>
            <p className="text-xl text-muted-foreground">Open for collaborations in HealthTech, AI, and immersive interface design. Always looking for the next challenging frontier.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Email Address</p>
                <p>contact@neuralcanvas.ai</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Location</p>
                <p>Global Hub / Remote</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Github, label: "GitHub", href: "#" },
              { icon: Linkedin, label: "LinkedIn", href: "#" },
              { icon: Twitter, label: "Twitter", href: "#" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl border border-primary/20 bg-background/50 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-10 -mt-10" />
          
          <form className="space-y-6 relative z-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name</label>
                <input 
                  type="text" 
                  className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea 
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all min-h-[150px]"
                placeholder="Tell me about your project or vision..."
              />
            </div>
            <Button size="lg" className="w-full h-14 text-lg">Send Connection Request</Button>
          </form>
        </motion.div>
      </div>
      
      <div className="mt-32 pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto opacity-50 text-sm">
        <p>© 2024 Neural Canvas. Designed at the intersection of mind and machine.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </section>
  );
}