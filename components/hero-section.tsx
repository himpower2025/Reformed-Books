'use client'

import { BookCarouselLight } from '@/components/book-carousel-light'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <>
      {/* Light Carousel Book Showcase */}
      <BookCarouselLight />

      {/* Featured This Month Section */}
      <section className="py-20 md:py-32 bg-background border-t border-border relative overflow-hidden">
        {/* Soft floating background decorative circles */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-16 relative z-10">
          <div className="mb-16">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-xs uppercase tracking-widest font-extrabold text-accent flex items-center gap-1.5">
                <span className="animate-pulse">✨</span> Curated Selection
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
              Featured This Month
            </h2>
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              Handpicked works that showcase the breadth and depth of reformed theological thought, designed with absolute aesthetic joy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Reformed Theology",
                author: "Dr. James Mitchell",
                genre: "Sovereign Grace",
                color: "from-blue-600 via-indigo-600 to-indigo-800 border-indigo-400/20",
                textColor: "text-white",
                accentColor: "text-amber-300",
                emblem: "🛡️"
              },
              {
                title: "Faith & Culture",
                author: "Rev. Sarah Williams",
                genre: "Christian Culture",
                color: "from-emerald-500 via-teal-500 to-teal-700 border-teal-300/20",
                textColor: "text-white",
                accentColor: "text-emerald-200",
                emblem: "🌿"
              },
              {
                title: "Biblical Worldview",
                author: "Dr. Michael Chen",
                genre: "Applied Apologetics",
                color: "from-orange-500 via-rose-500 to-pink-600 border-rose-400/20",
                textColor: "text-white",
                accentColor: "text-amber-200",
                emblem: "☀️"
              }
            ].map((book, idx) => (
              <motion.div 
                key={idx} 
                className="group cursor-pointer"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <div className="aspect-[3/4] rounded-md mb-5 overflow-hidden relative shadow-md hover:shadow-2xl transition-all duration-500 border border-border/20">
                  {/* Beautiful CSS Book Cover */}
                  <div className={`w-full h-full bg-gradient-to-b ${book.color} p-8 flex flex-col justify-between items-center text-center relative transition-transform duration-500 ease-out`}>
                    {/* Spine crease shadow simulating a real book */}
                    <div className="absolute top-0 bottom-0 left-3 w-1.5 bg-black/15 shadow-inner pointer-events-none" />
                    <div className="absolute top-0 bottom-0 left-4 w-px bg-white/5 pointer-events-none" />
                    
                    {/* Top border decor */}
                    <div className="border border-white/10 w-full h-full absolute inset-3 rounded-[2px] pointer-events-none" />
                    <div className="border-2 border-white/5 w-full h-full absolute inset-4 rounded-[1px] pointer-events-none" />

                    {/* Book Metadata header */}
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/70 z-10 font-sans mt-3 font-bold">
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
                      <div className="w-12 h-px bg-white/30 mx-auto mt-4" />
                    </div>

                    {/* Author footer inside cover */}
                    <p className={`text-xs uppercase tracking-[0.15em] font-sans font-bold mb-3 ${book.textColor}/80 z-10`}>
                      by {book.author}
                    </p>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">{book.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
