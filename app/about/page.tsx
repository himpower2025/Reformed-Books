'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { aboutData } from '@/lib/db-data'
import { motion } from 'framer-motion'
import { Compass, BookOpen, Feather, ShieldCheck } from 'lucide-react'

export default function AboutPage() {
  const iconMap = [Compass, BookOpen, Feather];

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-border/60 bg-gradient-to-b from-secondary/30 to-background">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#27453d_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="mx-auto max-w-[1200px] px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-accent/40" />
              <span className="text-xs uppercase tracking-widest font-semibold text-accent">Our Calling</span>
              <div className="w-8 h-px bg-accent/40" />
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl font-extrabold tracking-tight mb-8 text-foreground max-w-4xl mx-auto leading-tight">
              Bridging Elegant Aesthetics with Orthodox Truth
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-serif leading-relaxed italic">
              "We believe that true, historic theology should be both intellectually satisfying and visually beautiful, inspiring minds and hearts."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-background border-b border-border/40">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-stretch">
            {/* Vision card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 md:p-12 rounded-2xl bg-secondary/20 border border-border/50 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-primary mb-3 block">Our Vision</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">A Vision of Excellence</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-serif">
                  {aboutData.vision}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-border/30 flex items-center gap-3 text-xs text-primary font-medium">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <span>Faithful to Historic Confessions</span>
              </div>
            </motion.div>

            {/* Mission card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 md:p-12 rounded-2xl bg-secondary/20 border border-border/50 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-primary mb-3 block">Our Mission</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">To Inspire Every Reader</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-serif">
                  {aboutData.mission}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-border/30 flex items-center gap-3 text-xs text-primary font-medium">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <span>Designed for Modern Families & Scholars</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-secondary/10">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-px bg-primary/30" />
            <h2 className="text-xs uppercase tracking-wider font-bold text-primary">Core Values</h2>
            <div className="w-6 h-px bg-primary/30" />
          </div>
          <h3 className="font-serif text-3xl font-bold tracking-tight mb-16 text-foreground">What Anchors Our Publishing</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutData.values.map((val, idx) => {
              const Icon = iconMap[idx % iconMap.length];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-background border border-border/40 p-8 rounded-xl text-center shadow-sm hover:border-accent/40 transition-all group"
                >
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-foreground mb-3">{val.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-[800px] px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">The Reformed Books Story</h2>
            <div className="w-12 h-0.5 bg-accent mx-auto" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-stone mx-auto text-muted-foreground leading-relaxed font-serif space-y-6 text-sm md:text-base text-justify"
          >
            <p>{aboutData.story}</p>
            <p className="border-l-2 border-accent/60 pl-4 italic text-foreground bg-secondary/20 p-4 rounded-r-lg">
              "We serve pastors preparing theological expositions, parents seeking beautiful covenants storybooks for their children, and minds hungry for timeless, sovereign truths."
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
