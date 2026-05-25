'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Book {
  id: number
  title: string
  description: string
  author: string
  color: string
}

const BOOKS_DATA: Book[] = [
  {
    id: 1,
    title: 'The Reformed Worldview',
    description: 'Explore how a reformed perspective shapes our understanding of faith, culture, and society in the modern world.',
    author: 'John Calvin',
    color: 'from-primary/40 to-accent/40',
  },
  {
    id: 2,
    title: 'Christ and Culture',
    description: 'A comprehensive examination of the relationship between Christian faith and contemporary cultural movements.',
    author: 'Richard Niebuhr',
    color: 'from-accent/40 to-primary/40',
  },
  {
    id: 3,
    title: 'Doctrine of Grace',
    description: 'Delve deep into the theological foundations of grace and its transformative power in Christian life.',
    author: 'Charles Spurgeon',
    color: 'from-primary/30 to-secondary/30',
  },
  {
    id: 4,
    title: 'Faith and Reason',
    description: 'Bridging the gap between intellectual inquiry and spiritual conviction in contemporary theology.',
    author: 'Alvin Plantinga',
    color: 'from-secondary/40 to-accent/30',
  },
]

export function BookFlip() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)

  const currentBook = BOOKS_DATA[currentIndex]

  useEffect(() => {
    if (!autoPlay || isFlipping) return

    const timer = setTimeout(() => {
      handleNext()
    }, 5000) // 5 seconds per page

    return () => clearTimeout(timer)
  }, [currentIndex, autoPlay, isFlipping])

  const handleNext = () => {
    if (isFlipping) return
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % BOOKS_DATA.length)
      setIsFlipping(false)
    }, 600)
  }

  const handlePrev = () => {
    if (isFlipping) return
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + BOOKS_DATA.length) % BOOKS_DATA.length)
      setIsFlipping(false)
    }, 600)
  }

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="inline-block text-xs uppercase tracking-widest font-medium text-accent mb-4">Interactive Collection</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Our Books
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
            Flip through our curated selection of reformed theological works. Click through to discover transformative ideas.
          </p>
        </div>

        {/* 3D Book Flip Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-[500px]">
          {/* Left Page (Previous Book Stack) */}
          <div className="hidden lg:flex flex-col items-center gap-3">
            <div className="relative w-32 h-40">
              {[2, 1, 0].map((offset) => (
                <motion.div
                  key={`left-${offset}`}
                  className={`absolute inset-0 rounded-sm bg-gradient-to-br ${BOOKS_DATA[(currentIndex - 1 - offset + BOOKS_DATA.length) % BOOKS_DATA.length]?.color || 'from-primary/20 to-accent/20'} border border-border/50`}
                  style={{
                    transform: `translateY(${offset * 4}px) translateX(${offset * 2}px)`,
                    zIndex: -offset,
                  }}
                />
              ))}
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Previous</p>
          </div>

          {/* Main Book Flip Area */}
          <div className="flex-1 flex flex-col items-center">
            {/* Book Container with 3D Perspective */}
            <div style={{ perspective: '1200px' }} className="w-full max-w-md">
              <motion.div
                className="relative w-full aspect-[3/4] mx-auto"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentBook.id}
                    className="absolute inset-0"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: 'easeInOut',
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Book Cover */}
                    <div
                      className={`w-full h-full rounded-sm bg-gradient-to-br ${currentBook.color} border-2 border-border shadow-2xl flex flex-col items-center justify-center p-8 text-center`}
                      style={{
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      <div className="space-y-6">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Book {currentIndex + 1} of {BOOKS_DATA.length}</p>
                          <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight">
                            {currentBook.title}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {currentBook.description}
                        </p>
                        <div className="pt-4 border-t border-border/50">
                          <p className="text-xs uppercase tracking-widest text-accent font-medium">
                            {currentBook.author}
                          </p>
                        </div>
                      </div>

                      {/* Bookmark Accent */}
                      <div className="absolute top-4 right-4 w-1 h-12 bg-accent rounded-full opacity-60" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Navigation Controls */}
            <div className="flex flex-col items-center gap-6 mt-10">
              {/* Flip Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  disabled={isFlipping}
                  className="inline-flex items-center justify-center h-12 w-12 rounded-sm border border-border text-foreground hover:bg-secondary hover:text-secondary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  disabled={isFlipping}
                  className="inline-flex items-center justify-center h-12 w-12 rounded-sm border border-border text-foreground hover:bg-secondary hover:text-secondary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Progress Indicator */}
              <div className="flex gap-2">
                {BOOKS_DATA.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      if (!isFlipping) {
                        setIsFlipping(true)
                        setTimeout(() => {
                          setCurrentIndex(index)
                          setIsFlipping(false)
                        }, 600)
                      }
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-accent'
                        : 'w-2 bg-border hover:bg-muted-foreground'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>

              {/* Auto-play Toggle */}
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
              >
                {autoPlay ? '⏸ Pause' : '▶ Play'} Auto-advance
              </button>
            </div>
          </div>

          {/* Right Page (Next Book Stack) */}
          <div className="hidden lg:flex flex-col items-center gap-3">
            <div className="relative w-32 h-40">
              {[2, 1, 0].map((offset) => (
                <motion.div
                  key={`right-${offset}`}
                  className={`absolute inset-0 rounded-sm bg-gradient-to-br ${BOOKS_DATA[(currentIndex + 1 + offset) % BOOKS_DATA.length]?.color || 'from-primary/20 to-accent/20'} border border-border/50`}
                  style={{
                    transform: `translateY(${offset * 4}px) translateX(-${offset * 2}px)`,
                    zIndex: -offset,
                  }}
                />
              ))}
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Next</p>
          </div>
        </div>

        {/* Bottom Quote Section */}
        <div className="mt-20 pt-12 border-t border-border text-center">
          <p className="text-sm text-muted-foreground italic leading-relaxed max-w-2xl mx-auto">
            "Every great book shapes the mind that reads it, challenging assumptions and expanding possibilities."
          </p>
        </div>
      </div>
    </section>
  )
}
