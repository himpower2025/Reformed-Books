'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Book {
  id: number
  title: string
  description: string
  author: string
  image: string
  category: string
}

const sampleBooks: Book[] = [
  {
    id: 1,
    title: 'The Gospel & Culture',
    description: 'Exploring the intersection of faith and contemporary society with theological depth.',
    author: 'Dr. James Wilson',
    image: 'https://images.unsplash.com/photo-150784272343-583f20270319?w=300&h=400&fit=crop',
    category: 'Theology',
  },
  {
    id: 2,
    title: 'Reformed Worldview',
    description: 'A comprehensive guide to understanding the world through a reformed theological lens.',
    author: 'Prof. Sarah Mitchell',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop',
    category: 'Worldview',
  },
  {
    id: 3,
    title: 'Doctrine & Life',
    description: 'How biblical doctrine shapes our daily lives and transforms our understanding of faith.',
    author: 'Rev. Thomas Harper',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    category: 'Doctrine',
  },
  {
    id: 4,
    title: 'Christ & Culture Today',
    description: 'A modern exploration of how Christianity engages with contemporary cultural issues.',
    author: 'Dr. Elizabeth Brown',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
    category: 'Culture',
  },
]

export function BookCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-rotate every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setCurrentIndex((prev) => (prev + 1) % sampleBooks.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getVisibleBooks = () => {
    const books = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % sampleBooks.length
      books.push({ ...sampleBooks[index], position: i })
    }
    return books
  }

  const visibleBooks = getVisibleBooks()
  const currentBook = sampleBooks[currentIndex]

  return (
    <section className="relative overflow-hidden bg-background py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Carousel Container */}
        <div className="relative h-96 md:h-[500px] flex items-center justify-center">
          {/* Books Stack - Overlapping Effect */}
          <div className="relative w-full h-full flex items-center justify-center">
            {visibleBooks.map((book, idx) => {
              const rotation = idx === 0 ? 0 : idx === 1 ? -8 : -16
              const translateX = idx === 0 ? 0 : idx === 1 ? 60 : 120
              const scale = 1 - idx * 0.08
              const zIndex = 3 - idx

              return (
                <div
                  key={`${book.id}-${currentIndex}`}
                  className={`absolute transition-all duration-700 ease-out cursor-grab active:cursor-grabbing`}
                  style={{
                    transform: `translateX(${translateX}px) rotateZ(${rotation}deg) scale(${scale})`,
                    zIndex: zIndex,
                    opacity: idx < 3 ? 1 : 0,
                  }}
                >
                  {/* Book Card */}
                  <div className="relative group">
                    <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-sm overflow-hidden shadow-2xl">
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />

                      {/* Gradient Overlay - Only on front book */}
                      {idx === 0 && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      )}

                      {/* Book Info - Only show on front book */}
                      {idx === 0 && (
                        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <p className="text-xs uppercase tracking-widest text-white/80">
                                {book.category}
                              </p>
                              <h2 className="font-serif text-2xl md:text-3xl font-bold">
                                {book.title}
                              </h2>
                            </div>
                            <p className="text-sm md:text-base leading-relaxed text-white/90 line-clamp-2">
                              {book.description}
                            </p>
                            <p className="text-xs text-white/70 pt-2">{book.author}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Hand Cursor Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-foreground/50 text-xs uppercase tracking-widest pointer-events-none animate-bounce">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H7V5h6v12zm2-5h4v6h-4z" />
            </svg>
            <span>Auto-turning</span>
          </div>
        </div>

        {/* Page Indicators */}
        <div className="mt-12 flex justify-center gap-3">
          {sampleBooks.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 transition-all duration-700 ${
                idx === currentIndex
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Description Section */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <div className="inline-block px-4 py-2 mb-4 border border-border rounded-sm">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Page {currentIndex + 1} of {sampleBooks.length}
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Discover our curated collection of Reformed books. Each page reveals thought-provoking works 
            designed to deepen your understanding of faith, theology, and worldview. Auto-turning pages 
            every 2 seconds for an immersive reading experience.
          </p>
        </div>
      </div>
    </section>
  )
}
