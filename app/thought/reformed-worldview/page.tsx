'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { thoughtsData } from '@/lib/db-data'
import { motion } from 'framer-motion'
import { Calendar, User, BookOpen, ShieldCheck, Heart } from 'lucide-react'

export default function ReformedWorldviewPage() {
  // Filter for reformed-worldview thoughts
  const thoughts = thoughtsData.filter(t => t.category === 'reformed-worldview')

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Hero Banner */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-background border-b border-border/40 relative">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#27453d_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="mx-auto max-w-[900px] px-6 text-center relative z-10">
          <span className="text-xs uppercase tracking-widest font-extrabold text-accent mb-3.5 block">Our Thought • Philosophy of Truth</span>
          <h1 className="font-serif text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            Reformed Worldview
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-serif max-w-2xl mx-auto leading-relaxed italic">
            "A comprehensive biblical framework that answers life's ultimate questions with robust intellectual coherence."
          </p>
        </div>
      </section>

      {/* Editorial Content */}
      <section className="py-16 flex-grow">
        <div className="mx-auto max-w-[800px] px-6">
          {thoughts.map((thought, idx) => (
            <motion.article
              key={thought.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="prose prose-stone mx-auto"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-6 font-sans">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {thought.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {thought.date}
                </span>
              </div>

              {/* Lead Paragraph */}
              <p className="text-lg md:text-xl font-serif text-foreground leading-relaxed italic mb-8 border-l-4 border-accent/70 pl-5 bg-secondary/10 py-5 rounded-r-lg">
                {thought.excerpt}
              </p>

              {/* Main Body */}
              <div className="font-serif text-base md:text-lg leading-relaxed text-muted-foreground text-justify space-y-6 whitespace-pre-line">
                {thought.content}
                
                <p>
                  To have a Reformed worldview is to see the world as God's theatre. Every science, every history, and every beautiful sunset tells of His sovereign power and divine genius. Although sin has broken and fractured this theatre, Christ's redemption is already at work, restoring hearts, relationships, and the cosmos to its original, harmonious design.
                </p>
              </div>

              {/* Decorative block */}
              <div className="mt-16 p-8 border border-border/40 rounded-xl bg-secondary/15 flex gap-4 items-start">
                <ShieldCheck className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-foreground">A Complete Lens</h4>
                  <p className="text-xs text-muted-foreground mt-1 font-sans">
                    The structure of Creation, Fall, Redemption, and Restoration helps us interpret literature, history, economics, and our private suffering with beautiful, logical solace.
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
