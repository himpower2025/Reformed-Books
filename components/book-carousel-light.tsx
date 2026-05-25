'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

const BOOKS_DATA = [
  {
    id: 1,
    title: "Reformed Theology",
    description: "A comprehensive exploration of reformed theological thought and its relevance to contemporary faith.",
    author: "Dr. James Mitchell",
    color: "from-primary/20 to-accent/20"
  },
  {
    id: 2,
    title: "Faith & Culture",
    description: "Examining the intersection of Christian faith with modern cultural movements and worldview.",
    author: "Rev. Sarah Williams",
    color: "from-accent/20 to-primary/10"
  },
  {
    id: 3,
    title: "Biblical Worldview",
    description: "Developing a comprehensive biblical perspective on life, society, and Christian living.",
    author: "Dr. Michael Chen",
    color: "from-secondary/20 to-accent/10"
  },
  {
    id: 4,
    title: "Doctrine & Practice",
    description: "Bridging theological doctrine with practical application in everyday Christian life.",
    author: "Rev. Elizabeth Turner",
    color: "from-primary/10 to-secondary/20"
  }
]

const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
}

const pageTransition = {
  x: { type: 'spring', stiffness: 300, damping: 30 },
  opacity: { duration: 0.5 }
}

export function BookCarouselLight() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % BOOKS_DATA.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlay])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % BOOKS_DATA.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + BOOKS_DATA.length) % BOOKS_DATA.length)
  }

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const currentBook = BOOKS_DATA[currentIndex]

  return (
    <section className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-xs uppercase tracking-widest font-medium text-accent mb-3">
              Discover Our Works
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Books
            </h2>
          </div>

          {/* Book Carousel Container */}
          <div className="relative">
            {/* Main Book Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-96">
              {/* Left Side - Book Stack */}
              <div className="relative h-96 flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={pageTransition}
                    className={`absolute w-full h-full flex items-center justify-center`}
                  >
                    {/* Book Cover */}
                    <div className={`w-56 h-72 rounded-sm shadow-2xl bg-gradient-to-br ${currentBook.color} p-8 flex flex-col justify-between border border-border/20 transform hover:scale-105 transition-transform duration-300`}>
                      <div>
                        <div className="text-primary text-sm uppercase tracking-widest font-medium mb-4">Book {currentIndex + 1}</div>
                        <h3 className="font-serif text-2xl font-bold text-foreground mb-2 leading-tight">
                          {currentBook.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {currentBook.description}
                        </p>
                      </div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                        {currentBook.author}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Side - Book Info */}
              <div className="space-y-8">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={`info-${currentIndex}`}
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={pageTransition}
                    className="space-y-6"
                  >
                    {/* Page Number */}
                    <div className="flex items-center gap-4">
                      <span className="text-6xl font-serif font-bold text-accent/30">
                        {String(currentIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm uppercase tracking-widest text-muted-foreground">
                        of {BOOKS_DATA.length}
                      </span>
                    </div>

                    {/* White Page Effect */}
                    <div className="bg-white rounded-sm p-8 shadow-lg border border-border/20 min-h-64">
                      <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
                        {currentBook.title}
                      </h3>
                      <p className="text-base text-foreground/80 leading-relaxed mb-6">
                        {currentBook.description}
                      </p>
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
                          {currentBook.author}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex flex-col gap-8 mt-12">
              {/* Previous/Next Buttons */}
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  className="p-3 rounded-full border border-border text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  aria-label="Previous book"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                {/* Progress Dots */}
                <div className="flex gap-3">
                  {BOOKS_DATA.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`rounded-full transition-all ${
                        index === currentIndex
                          ? 'bg-accent w-8 h-2'
                          : 'bg-border w-2 h-2 hover:bg-muted-foreground'
                      }`}
                      aria-label={`Go to book ${index + 1}`}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="p-3 rounded-full border border-border text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  aria-label="Next book"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Auto-play Toggle */}
              <div className="flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="flex items-center gap-2 px-4 py-2 rounded-sm border border-border text-muted-foreground hover:text-foreground hover:border-accent transition-colors text-xs uppercase tracking-widest font-medium"
                >
                  {isAutoPlay ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Play
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
