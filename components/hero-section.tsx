'use client'

import { BookCarouselLight } from '@/components/book-carousel-light'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Shield, Compass, BookOpen, Award, ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <>
      {/* Light Carousel Book Showcase */}
      <BookCarouselLight />

      {/* High-Energy Publisher Stats Ribbon */}
      <section className="bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 py-10 border-y border-border/60 relative overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-border/40 shadow-sm">
              <span className="text-3xl font-extrabold font-serif text-primary block mb-1">50+</span>
              <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Classics Preserved</span>
            </div>
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-border/40 shadow-sm">
              <span className="text-3xl font-extrabold font-serif text-accent block mb-1">100%</span>
              <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Faithful Translations</span>
            </div>
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-border/40 shadow-sm">
              <span className="text-3xl font-extrabold font-serif text-primary block mb-1">100,000+</span>
              <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Copies Distributed</span>
            </div>
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-border/40 shadow-sm">
              <span className="text-3xl font-extrabold font-serif text-emerald-600 block mb-1">4.9 / 5.0</span>
              <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Reader Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured This Month Section */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        {/* Soft floating background decorative circles */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs uppercase tracking-widest font-extrabold text-accent bg-accent/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" />
                  Curated Selection
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-black text-foreground tracking-tight">
                Featured This Month
              </h2>
              <p className="text-muted-foreground max-w-2xl text-base leading-relaxed mt-2 font-serif">
                Handpicked works that showcase the breadth and depth of reformed theological thought, designed with absolute aesthetic joy
              </p>
            </div>

            <Link
              href="/books/all"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-accent bg-white border border-border px-5 py-3 rounded-full shadow-sm hover:shadow-md transition-all self-start md:self-auto"
            >
              <span>Explore All Publications</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                id: "1",
                title: "The Doctrine of God",
                author: "Reformed Theology Series",
                genre: "Sovereign Grace",
                color: "from-blue-600 via-indigo-600 to-indigo-800 border-indigo-400/20",
                textColor: "text-white",
                accentColor: "text-amber-300",
                emblem: "🛡️"
              },
              {
                id: "2",
                title: "Christ and Culture",
                author: "H. Richard Niebuhr",
                genre: "Christian Culture",
                color: "from-emerald-500 via-teal-500 to-teal-700 border-teal-300/20",
                textColor: "text-white",
                accentColor: "text-emerald-200",
                emblem: "🌿"
              },
              {
                id: "3",
                title: "A Reformed Worldview",
                author: "Contemporary Essays",
                genre: "Applied Apologetics",
                color: "from-orange-500 via-rose-500 to-pink-600 border-rose-400/20",
                textColor: "text-white",
                accentColor: "text-amber-200",
                emblem: "☀️"
              }
            ].map((book) => (
              <Link key={book.id} href={`/books/${book.id}`} className="block group">
                <motion.div 
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="bg-card rounded-2xl p-5 border border-border/50 hover:border-accent/40 shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-[3/4] rounded-xl mb-5 overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-border/20">
                    {/* Beautiful Book Cover */}
                    <div className={`w-full h-full bg-gradient-to-b ${book.color} p-8 flex flex-col justify-between items-center text-center relative transition-transform duration-500 ease-out`}>
                      {/* Spine crease shadow simulating a real book */}
                      <div className="absolute top-0 bottom-0 left-3 w-1.5 bg-black/15 shadow-inner pointer-events-none" />
                      <div className="absolute top-0 bottom-0 left-4 w-px bg-white/5 pointer-events-none" />
                      
                      {/* Top border decor */}
                      <div className="border border-white/10 w-full h-full absolute inset-3 rounded-[2px] pointer-events-none" />
                      <div className="border-2 border-white/5 w-full h-full absolute inset-4 rounded-[1px] pointer-events-none" />

                      {/* Book Metadata header */}
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/80 z-10 font-sans mt-3 font-bold">
                        {book.genre}
                      </span>

                      {/* Title & Emblem */}
                      <div className="my-auto z-10">
                        <motion.span 
                          className="text-4xl mb-4 block filter drop-shadow-md select-none"
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {book.emblem}
                        </motion.span>
                        <h3 className={`font-serif text-2xl lg:text-3xl font-black tracking-tight px-2 leading-tight ${book.textColor}`}>
                          {book.title}
                        </h3>
                        <div className="w-12 h-px bg-white/40 mx-auto mt-4" />
                      </div>

                      {/* Author footer inside cover */}
                      <p className={`text-xs uppercase tracking-[0.15em] font-sans font-bold mb-3 ${book.textColor}/90 z-10`}>
                        by {book.author}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
                    </div>
                    <span className="text-xs font-bold text-accent uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      View →
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Publisher Philosophy Quote Banner */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-amber-100 relative overflow-hidden border-y border-amber-500/20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="mx-auto max-w-[1280px] px-6 text-center relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-4 py-1 rounded-full inline-block mb-4">
            Our Publishing Manifesto
          </span>
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-relaxed max-w-4xl mx-auto italic text-white">
            "To equip the heart with sovereign faith, and illuminate the mind with timeless historical confessions."
          </blockquote>
          <p className="text-xs uppercase tracking-widest text-amber-200/80 mt-4 font-sans font-bold">
            — Reformed Books House Editorial Council
          </p>
        </div>
      </section>
    </>
  )
}

