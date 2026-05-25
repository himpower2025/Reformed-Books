'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const BOOKS_DATA = [
  {
    id: 1,
    title: 'Rediscovering the Christ of Scripture',
    cover: '/book-cover-1.jpg',
    description: 'An in-depth exploration of biblical Christology',
  },
  {
    id: 2,
    title: 'Reformed Theology in Modern Times',
    cover: '/book-cover-2.jpg',
    description: 'Understanding faith in the contemporary world',
  },
  {
    id: 3,
    title: 'The Doctrine of Grace Explained',
    cover: '/book-cover-3.jpg',
    description: 'A comprehensive study of divine grace',
  },
  {
    id: 4,
    title: 'Worldview: Building Faith Foundation',
    cover: '/book-cover-4.jpg',
    description: 'Constructing a biblical perspective on life',
  },
]

export function BookPageTurner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [autoPlay, setAutoPlay] = useState(false)

  // 페이지 로드 후 1초 후에 첫 OPEN 버튼 자동 작동
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setAutoPlay(true)
      handlePageTurn()
    }, 1000)

    return () => clearTimeout(initialTimer)
  }, [])

  // 컨텐츠 표시 후 2초 후 다음 페이지로 자동 넘어감
  useEffect(() => {
    if (showContent && !isInitialLoad) {
      const contentTimer = setTimeout(() => {
        handlePageTurn()
      }, 2000)

      return () => clearTimeout(contentTimer)
    }
  }, [showContent, isInitialLoad])

  const handlePageTurn = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setShowContent(false)

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % BOOKS_DATA.length)
      setShowContent(true)
      setIsInitialLoad(false)
      setIsAnimating(false)
    }, 600)
  }

  const currentBook = BOOKS_DATA[currentIndex]

  return (
    <section className="relative w-full bg-gradient-to-b from-background via-background to-background/95 py-16 md:py-24 overflow-hidden">
      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 h-96 md:h-[500px] flex items-center justify-center relative">
        
        {/* Left Books Stack */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 md:w-48 h-64 md:h-96 z-10">
          <div className="relative w-full h-full">
            {[2, 1, 0].map((offset) => (
              <div
                key={offset}
                className="absolute w-full h-full bg-gradient-to-br from-primary/40 to-primary/20 rounded-sm border border-primary/30 shadow-lg"
                style={{
                  transform: `translateX(${offset * 8}px) translateY(${offset * 12}px) rotateZ(${offset * 2}deg)`,
                  zIndex: -offset,
                }}
              >
                <div className="w-full h-full bg-muted/50 flex items-center justify-center text-muted-foreground text-xs font-medium">
                  Book Cover
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center - Book Open Animation */}
        <div className="relative w-full max-w-md h-80 md:h-96 mx-auto flex items-center justify-center">
          {/* White Paper/Page Effect */}
          <div className={`absolute inset-0 bg-white rounded-sm shadow-2xl transition-all duration-600 ${
            showContent ? 'opacity-100 scale-100' : 'opacity-80 scale-95'
          }`} />

          {/* Left Page - Book Cover */}
          <div className={`absolute left-0 inset-y-0 w-1/2 bg-gradient-to-br from-primary/60 to-primary/40 rounded-l-sm overflow-hidden transition-all duration-600 ${
            isAnimating ? 'translate-x-0 opacity-0' : 'translate-x-0 opacity-100'
          }`}>
            <div className="w-full h-full flex items-center justify-center bg-muted/40 text-muted-foreground text-xs">
              <div className="text-center px-4">
                <div className="text-2xl font-serif font-bold text-foreground mb-2">Book</div>
                <div className="text-xs">Cover</div>
              </div>
            </div>
          </div>

          {/* Right Page - Book Title */}
          <div className={`absolute right-0 inset-y-0 w-1/2 bg-white flex flex-col items-center justify-center transition-all duration-600 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="px-8 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                {currentBook.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentBook.description}
              </p>
              <div className="mt-6 text-xs text-accent font-medium">
                Book {currentIndex + 1} of {BOOKS_DATA.length}
              </div>
            </div>
          </div>

          {/* Yellow Bookmark with OPEN Button */}
          <div className="absolute top-6 right-6 z-20 flex flex-col items-center gap-2">
            {/* Bookmark */}
            <div className="w-12 h-32 bg-accent rounded-sm shadow-md flex items-center justify-center relative">
              <button
                onClick={handlePageTurn}
                disabled={isAnimating}
                className="relative z-10 text-white font-serif font-bold text-sm hover:opacity-80 transition-opacity disabled:opacity-50 uppercase tracking-wider"
              >
                OPEN
              </button>
              {/* Bookmark Ribbon */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-accent/70" />
            </div>

            {/* Auto-play Indicator */}
            {autoPlay && !isInitialLoad && (
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Auto-turning...
              </div>
            )}
          </div>
        </div>

        {/* Right Books Stack */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 md:w-48 h-64 md:h-96 z-10">
          <div className="relative w-full h-full">
            {[0, 1, 2].map((offset) => (
              <div
                key={offset}
                className="absolute w-full h-full bg-gradient-to-br from-primary/40 to-primary/20 rounded-sm border border-primary/30 shadow-lg"
                style={{
                  transform: `translateX(${-offset * 8}px) translateY(${offset * 12}px) rotateZ(${-offset * 2}deg)`,
                  zIndex: -offset,
                }}
              >
                <div className="w-full h-full bg-muted/50 flex items-center justify-center text-muted-foreground text-xs font-medium">
                  Book Cover
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-12">
        {BOOKS_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setCurrentIndex(index)
                setShowContent(true)
                setIsInitialLoad(false)
              }
            }}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-accent w-8'
                : 'bg-border hover:bg-muted-foreground'
            }`}
            aria-label={`Go to book ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  )
}
