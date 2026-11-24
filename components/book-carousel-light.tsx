'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

import { useSiteContent } from '@/hooks/use-site-content'
import { CAROUSEL_THEMES, FeaturedCarouselBook } from '@/lib/site-content'

interface ResolvedCarouselBook extends FeaturedCarouselBook {
  coverColor: string
  accentColor: string
  textColor: string
}

// ─── 3D Page Flip core styling ───
const flipStyles = `
  .book-scene {
    perspective: 2200px;
    perspective-origin: center center;
  }
  .book-spread {
    transform-style: preserve-3d;
    transform: rotateX(6deg) rotateY(0deg);
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .book-spread:hover {
    transform: rotateX(4deg) rotateY(1.5deg);
  }
  .page-flip {
    transform-origin: left center;
    transform-style: preserve-3d;
    will-change: transform;
  }
  .page-face {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    will-change: transform;
  }
  .page-back-face {
    transform: rotateY(180deg);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    will-change: transform;
  }
  .spine-glow {
    background: linear-gradient(to right,
      rgba(0,0,0,0.0) 0%,
      rgba(0,0,0,0.3) 30%,
      rgba(0,0,0,0.55) 48%,
      rgba(0,0,0,0.65) 50%,
      rgba(0,0,0,0.55) 52%,
      rgba(0,0,0,0.3) 70%,
      rgba(0,0,0,0.0) 100%
    );
  }
  .book-ground-shadow {
    background: radial-gradient(ellipse 65% 25% at 50% 100%, rgba(0,0,0,0.35) 0%, transparent 80%);
  }
  @keyframes flipForward {
    0%   { transform: rotateY(0deg); z-index: 25; }
    50%  { z-index: 35; }
    100% { transform: rotateY(-180deg); z-index: 15; }
  }
  @keyframes flipBackward {
    0%   { transform: rotateY(-180deg); z-index: 15; }
    50%  { z-index: 35; }
    100% { transform: rotateY(0deg); z-index: 25; }
  }
  .flip-forward  { animation: flipForward  1.1s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
  .flip-backward { animation: flipBackward 1.1s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
`

function renderEmblem(type: string, colorClass: string) {
  if (type === 'shield') {
    return (
      <svg className={`w-14 h-14 ${colorClass}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M24 6 L38 12 V24 C38 32.5 32 38.5 24 42 C16 38.5 10 32.5 10 24 V12 Z" />
        <path d="M24 9 L35 14 V23 C35 30 30.5 35 24 38 C17.5 35 13 30 13 23 V14 Z" strokeDasharray="1 1" />
        <path d="M19 22H24V28H19Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M24 22H29V28H24Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M24 21 V29" />
        <path d="M18 22 C21 22 24 21 24 21 C24 21 27 22 30 22 M18 28 C21 28 24 27 24 27 C24 27 27 28 30 28" />
      </svg>
    )
  }
  if (type === 'leaves') {
    return (
      <svg className={`w-14 h-14 ${colorClass}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="24" cy="24" r="18" strokeDasharray="3 3" />
        <path d="M24 38 C24 38 23 30 24 24 C25 20 28 14 28 10" />
        <path d="M24 32 C21 32 18 30 18 30 C18 30 21 28 24 29" fill="currentColor" fillOpacity="0.1" />
        <path d="M24 26 C27 26 30 28 30 28 C30 28 27 30 24 29" fill="currentColor" fillOpacity="0.1" />
        <path d="M24 20 C20 20 17 18 17 18 C17 18 20 16 24 17" fill="currentColor" fillOpacity="0.1" />
        <path d="M24 14 C27 14 31 16 31 16 C31 16 27 18 24 17" fill="currentColor" fillOpacity="0.1" />
        <polygon points="28,8 29.5,11 32.5,11.5 30,13.5 31,16.5 28,15 25,16.5 26,13.5 23.5,11.5 26.5,11" fill="currentColor" />
      </svg>
    )
  }
  if (type === 'sunburst') {
    return (
      <svg className={`w-14 h-14 ${colorClass}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="24" cy="24" r="16" />
        <path d="M24 4 V44 M4 24 H44" />
        <path d="M10 10 L38 38 M10 38 L38 10" strokeWidth="0.8" />
        <circle cx="24" cy="24" r="5" fill="currentColor" fillOpacity="0.2" />
        <polygon points="24,14 27,21 34,24 27,27 24,34 21,27 14,24 21,21" fill="currentColor" />
      </svg>
    )
  }
  if (type === 'star') {
    return (
      <svg className={`w-14 h-14 ${colorClass}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="24" cy="24" r="16" strokeDasharray="2 2" />
        <path d="M24 8 L24 40 M8 24 L40 24" strokeWidth="0.8" />
        <path d="M24 12 L27 21 L36 24 L27 27 L24 36 L21 27 L12 24 L21 21 Z" fill="currentColor" fillOpacity="0.25" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg className={`w-14 h-14 ${colorClass}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="24" cy="24" r="16" />
      <path d="M24 12 L24 28 M16 20 H32" />
      <path d="M18 26 C20 32 28 32 30 26" fill="currentColor" fillOpacity="0.1" />
      <path d="M24 10 C26 10 27 12 24 15 C21 12 22 10 24 10 Z" fill="currentColor" />
      <circle cx="24" cy="28" r="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" />
    </svg>
  )
}

function BookCoverPage({
  book,
  side
}: {
  book: ResolvedCarouselBook
  side: 'left' | 'right'
}) {
  const isLeft = side === 'left';
  return (
    <div
      className={`
        w-full h-full flex flex-col justify-between p-10 relative overflow-hidden select-none
        ${book.coverColor} border-2 rounded-[4px] shadow-inner
      `}
      style={{
        boxShadow: isLeft 
          ? 'inset -15px 0 30px rgba(0,0,0,0.6), inset 3px 3px 10px rgba(255,255,255,0.08)' 
          : 'inset 15px 0 30px rgba(0,0,0,0.6), inset -3px 3px 10px rgba(255,255,255,0.08)'
      }}
    >
      {/* Texture pattern overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Decorative Borders */}
      <div className="absolute inset-4 border border-amber-500/15 rounded-[2px] pointer-events-none" />
      <div className="absolute inset-5 border-2 border-amber-500/25 rounded-[1px] pointer-events-none" />

      {/* Decorative Corner Ornaments */}
      <span className="absolute top-7 left-7 text-amber-500/30 font-mono text-[10px] select-none pointer-events-none">✦</span>
      <span className="absolute top-7 right-7 text-amber-500/30 font-mono text-[10px] select-none pointer-events-none">✦</span>
      <span className="absolute bottom-7 left-7 text-amber-500/30 font-mono text-[10px] select-none pointer-events-none">✦</span>
      <span className="absolute bottom-7 right-7 text-amber-500/30 font-mono text-[10px] select-none pointer-events-none">✦</span>

      {/* Top Header */}
      <div className="text-center mt-2 z-10">
        <span className="text-[10px] uppercase tracking-[0.3em] font-serif font-bold text-amber-500/40">
          Reformed Classics Library
        </span>
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 my-4 z-10">
        <div className="mb-6 transform hover:scale-105 transition-transform duration-500">
          {renderEmblem(book.emblemType, book.accentColor)}
        </div>

        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/35 to-transparent mb-4" />

        <h3 className="font-serif text-3xl font-extrabold text-white tracking-wide uppercase leading-tight mb-2 drop-shadow-md">
          {book.title}
        </h3>
        
        <p className="text-[11px] font-serif italic text-amber-100/60 leading-relaxed max-w-[210px] mx-auto">
          {book.subtitle}
        </p>
      </div>

      {/* Bottom info */}
      <div className="text-center mb-2 z-10">
        <div className="w-8 h-px bg-amber-500/25 mx-auto mb-2" />
        <p className="text-[11px] uppercase tracking-[0.25em] font-medium text-amber-500/60 font-sans">
          {book.author}
        </p>
      </div>

      {/* Spine hinge line shadowing */}
      {isLeft ? (
        <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-l from-black/55 to-transparent pointer-events-none" />
      ) : (
        <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-black/55 to-transparent pointer-events-none" />
      )}
    </div>
  )
}

function BookTextPage({
  book,
  side,
  pageNum
}: {
  book: ResolvedCarouselBook
  side: 'left' | 'right'
  pageNum: number
}) {
  const isLeft = side === 'left';
  const firstLetter = book.description.trim().charAt(0);
  const remainingDescription = book.description.trim().slice(1);

  return (
    <div
      className={`
        w-full h-full flex flex-col justify-between p-8 pt-10 pb-6 relative overflow-hidden select-none
        bg-[#faf8f4] text-[#1c1a16] border border-[#ebe0cc]/80 rounded-[3px] shadow-sm
      `}
    >
      {/* Paper Fibers background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="absolute top-4 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#dcd0ba] to-transparent pointer-events-none" />
      <div className="absolute bottom-6 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#dcd0ba] to-transparent pointer-events-none" />

      {/* Top Genre Header */}
      <div className="text-center z-10 flex items-center justify-center gap-2">
        <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8a7f6c]">
          {book.genre}
        </span>
      </div>

      {/* Text block */}
      <div className="flex-1 flex flex-col justify-center px-4 mt-2 z-10">
        <h4 className="font-serif text-[21px] font-bold text-[#201c13] leading-tight text-center tracking-wide mb-1">
          {book.title}
        </h4>
        
        <p className="text-[10px] uppercase font-sans font-medium text-center text-[#9c8e78] tracking-[0.2em] mb-4">
          By {book.author}
        </p>

        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-px bg-[#e3dbc9]" />
          <div className="w-1.5 h-1.5 rotate-45 border border-[#c1b59c] bg-[#faf8f4]" />
          <div className="w-10 h-px bg-[#e3dbc9]" />
        </div>

        {/* Drop Cap */}
        <div className="text-xs text-[#2b271f] font-serif leading-relaxed text-justify tracking-wide">
          <span 
            className="float-left mr-2.5 text-4xl font-semibold font-serif text-[#9b8352] mt-1 text-[2.7rem] leading-[0.8] select-none"
            style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.05)' }}
          >
            {firstLetter}
          </span>
          {remainingDescription}
        </div>
      </div>

      {/* Running Footer */}
      <div className="flex items-center justify-between text-[10px] font-sans text-[#a49883] px-2 z-10 pt-2">
        <span className="text-[8px] uppercase tracking-widest font-semibold font-mono text-[#b3a691]">
          LUMINA PRESS CO.
        </span>
        <span className="font-serif italic font-bold">
          p. {pageNum}
        </span>
      </div>

      {/* Crease Shadows */}
      {isLeft ? (
        <>
          <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black/[0.08] via-black/[0.02] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-[1px] h-full bg-[#e3dbc8]" />
        </>
      ) : (
        <>
          <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black/[0.08] via-black/[0.02] to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 w-[1px] h-full bg-[#e3dbc8]" />
        </>
      )}

      {/* Outside Cover Lip Shadowing */}
      {isLeft ? (
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-r from-white/30 to-transparent pointer-events-none" />
      ) : (
        <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-l from-white/30 to-transparent pointer-events-none" />
      )}
    </div>
  )
}

function OpenBook({
  books,
  currentIndex,
  flippingDir,
  isFlipping,
  onFlipEnd,
}: {
  books: ResolvedCarouselBook[]
  currentIndex: number
  flippingDir: 'forward' | 'backward' | null
  isFlipping: boolean
  onFlipEnd: () => void
}) {
  const flipRef = useRef<HTMLDivElement>(null)

  const totalBooks = books.length
  const safeIndex = totalBooks > 0 ? currentIndex % totalBooks : 0
  const currentBook = books[safeIndex]

  const nextIndex = totalBooks > 0 ? (safeIndex + 1) % totalBooks : 0
  const prevIndex = totalBooks > 0 ? (safeIndex - 1 + totalBooks) % totalBooks : 0

  const nextBook = books[nextIndex]
  const prevBook = books[prevIndex]

  const currentPageNumLeft = safeIndex * 2 + 12
  const currentPageNumRight = safeIndex * 2 + 13
  const nextPageNumLeft = nextIndex * 2 + 12
  const nextPageNumRight = nextIndex * 2 + 13
  const prevPageNumLeft = prevIndex * 2 + 12
  const prevPageNumRight = prevIndex * 2 + 13

  useEffect(() => {
    if (!isFlipping || !flipRef.current) return
    const el = flipRef.current
    el.classList.remove('flip-forward', 'flip-backward')
    void el.offsetWidth
    el.classList.add(flippingDir === 'forward' ? 'flip-forward' : 'flip-backward')

    const handleEnd = () => onFlipEnd()
    el.addEventListener('animationend', handleEnd, { once: true })
    return () => el.removeEventListener('animationend', handleEnd)
  }, [isFlipping, flippingDir, onFlipEnd])

  const BOOK_W = 740
  const BOOK_H = 480
  const PAGE_W = BOOK_W / 2

  return (
    <div className="book-scene w-full flex justify-center pt-8 md:pt-16 h-[277px] min-[400px]:h-[327px] sm:h-[449px] md:h-[519px] lg:h-[589px] xl:h-[669px] 2xl:h-[749px]">
      {/* Fully fluid scaling anchored at top-center for multiple screens including extra-large 16"+ devices */}
      <div 
        className="relative origin-top transition-transform duration-500 scale-[0.45] min-[400px]:scale-[0.55] sm:scale-[0.72] md:scale-[0.86] lg:scale-100 xl:scale-[1.15] 2xl:scale-[1.30]" 
        style={{ width: BOOK_W, height: BOOK_H }}
      >
        {/* Soft realistic Drop Shadow */}
        <div
          className="book-ground-shadow absolute pointer-events-none"
          style={{ bottom: -35, left: '-3%', right: '-3%', height: 45, opacity: 0.9 }}
        />

        {/* Paper Layers at Bottom edge */}
        <div 
          className="absolute -bottom-2 inset-x-3 bg-[#e8dec9] border-t border-[#d5cbb4] shadow-md rounded-b-[4px]" 
          style={{ 
            height: '10px', 
            zIndex: 0,
            backgroundImage: 'repeating-linear-gradient(90deg, #f0e6d2, #f0e6d2 1px, #d8ccb0 1px, #d8ccb0 2px)'
          }} 
        />
        <div 
          className="absolute -bottom-4 inset-x-6 bg-[#ded3bd] border-t border-[#cca485]/30 shadow-md rounded-b-[6px]" 
          style={{ 
            height: '10px', 
            zIndex: -1,
            backgroundImage: 'repeating-linear-gradient(90deg, #e5d9bf, #e5d9bf 1px, #d2c5a9 1px, #d2c5a9 2px)'
          }} 
        />

        {/* Left Book edge page stacks */}
        <div 
          className="absolute left-[-6px] top-1 bottom-1 bg-[#ede4d0] border-r border-[#eddab7]/40 shadow-sm rounded-l-[4px]" 
          style={{ 
            width: '8px', 
            zIndex: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, #eedfb4, #eedfb4 1px, #cebc93 1px, #cebc93 2px)'
          }} 
        />
        {/* Right Book edge page stacks */}
        <div 
          className="absolute right-[-6px] top-1 bottom-1 bg-[#ede4d0] border-l border-[#eddab7]/40 shadow-sm rounded-r-[4px]" 
          style={{ 
            width: '8px', 
            zIndex: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, #eedfb4, #eedfb4 1px, #cebc93 1px, #cebc93 2px)'
          }} 
        />

        <div className="book-spread" style={{ width: BOOK_W, height: BOOK_H, position: 'relative' }}>
          {/* Left fixed page */}
          <div
            className="absolute overflow-hidden rounded-l-[4px]"
            style={{
              left: 0, top: 0,
              width: PAGE_W, height: BOOK_H,
              zIndex: 5,
            }}
          >
            <BookCoverPage
              book={isFlipping && flippingDir === 'backward' ? prevBook : currentBook}
              side="left"
            />
          </div>

          {/* Right fixed page */}
          <div
            className="absolute overflow-hidden rounded-r-[4px]"
            style={{
              right: 0, top: 0,
              width: PAGE_W, height: BOOK_H,
              zIndex: 5,
            }}
          >
            <BookTextPage
              book={isFlipping && flippingDir === 'forward' ? nextBook : currentBook}
              pageNum={isFlipping && flippingDir === 'forward' ? nextPageNumRight : currentPageNumRight}
              side="right"
            />
          </div>

          {/* Center Spine */}
          <div
            className="spine-glow absolute pointer-events-none"
            style={{
              left: PAGE_W - 8,
              top: 0,
              width: 16,
              height: BOOK_H,
              zIndex: 25,
            }}
          />

          {/* Turning Page layer */}
          {isFlipping && (
            <div
              ref={flipRef}
              className="page-flip page-hover absolute"
              style={{
                left: PAGE_W,
                top: 0,
                width: PAGE_W,
                height: BOOK_H,
                zIndex: 20,
                transformOrigin: 'left center',
              }}
            >
              {/* Front side */}
              <div
                className="page-face absolute inset-0 overflow-hidden"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                <BookTextPage
                  book={flippingDir === 'forward' ? currentBook : prevBook}
                  pageNum={flippingDir === 'forward' ? currentPageNumRight : prevPageNumRight}
                  side="right"
                />
                
                <div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{
                    mixBlendMode: 'screen',
                    zIndex: 30,
                  }}
                />
              </div>

              {/* Back side */}
              <div
                className="page-back-face absolute inset-0 overflow-hidden"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                <BookCoverPage
                  book={flippingDir === 'forward' ? nextBook : currentBook}
                  side="left"
                />
              </div>
            </div>
          )}

          {/* Overall border shadows */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[4px]"
            style={{
              boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.12)',
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Main Carousel Component ───
export function BookCarouselLight() {
  const { content } = useSiteContent()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flippingDir, setFlippingDir] = useState<'forward' | 'backward' | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const pendingIndex = useRef<number | null>(null)

  const booksList: ResolvedCarouselBook[] = (content.featuredBooks.length > 0 ? content.featuredBooks : []).map((b) => {
    const theme = CAROUSEL_THEMES[b.themeId] || CAROUSEL_THEMES.emerald
    return {
      ...b,
      coverColor: theme.coverColor,
      accentColor: theme.accentColor,
      textColor: theme.textColor
    }
  })

  const totalCount = booksList.length
  const safeIndex = totalCount > 0 ? currentIndex % totalCount : 0
  const currentBook = booksList[safeIndex]

  useEffect(() => {
    if (totalCount > 0 && currentIndex >= totalCount) {
      setCurrentIndex(0)
    }
  }, [totalCount, currentIndex])

  useEffect(() => {
    if (!isAutoPlay || totalCount <= 1) return
    const timer = setInterval(() => {
      if (!isFlipping) triggerFlip('forward')
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlay, isFlipping, totalCount])

  const triggerFlip = (dir: 'forward' | 'backward') => {
    if (isFlipping || totalCount <= 1) return
    setFlippingDir(dir)
    setIsFlipping(true)
  }

  const handleFlipEnd = () => {
    setIsFlipping(false)
    if (totalCount > 0) {
      if (pendingIndex.current !== null) {
        setCurrentIndex(pendingIndex.current % totalCount)
        pendingIndex.current = null
      } else if (flippingDir === 'forward') {
        setCurrentIndex((prev) => (prev + 1) % totalCount)
      } else {
        setCurrentIndex((prev) => (prev - 1 + totalCount) % totalCount)
      }
    }
    setFlippingDir(null)
  }

  const handleDotClick = (index: number) => {
    if (isFlipping || index === safeIndex) return
    const dir = index > safeIndex ? 'forward' : 'backward'
    pendingIndex.current = index
    triggerFlip(dir)
  }

  if (!currentBook) return null

  return (
    <>
      <style>{flipStyles}</style>

      <section className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
        {/* Floating background ambient graphics */}
        <motion.div 
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-primary/15 via-secondary/15 to-transparent rounded-full blur-3xl pointer-events-none" 
        />
        <motion.div 
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -60, 0],
            scale: [1, 0.9, 1.15, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-gradient-to-tr from-accent/15 via-amber-200/15 to-transparent rounded-full blur-3xl pointer-events-none" 
        />
        <motion.div 
          animate={{
            y: [0, -30, 20, 0],
            scale: [0.8, 1.1, 0.8]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-[#9c8eff]/10 to-transparent rounded-full blur-3xl pointer-events-none" 
        />

        {/* Large background typography */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute select-none pointer-events-none font-serif font-bold"
          style={{
            fontSize: 'clamp(8rem, 18vw, 18rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(var(--accent), 0.08)',
            opacity: 0.6,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.02em',
          }}
        >
          BOOKS
        </motion.div>

        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 xl:px-16 2xl:px-24">

            {/* Section Header */}
            <div className="text-center pt-10 md:pt-16 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="text-accent text-lg"
                >
                  ✦
                </motion.div>
                <span className="text-xs uppercase tracking-widest font-extrabold text-accent">
                  {content.homeSections.featuredBooksEyebrow}
                </span>
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="text-accent text-lg"
                >
                  ✦
                </motion.div>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-black text-foreground tracking-tight drop-shadow-sm flex items-center justify-center gap-2">
                {content.homeSections.featuredBooksHeading}
                <motion.span 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block text-accent text-3xl md:text-4xl"
                >
                  ✨
                </motion.span>
              </h2>
            </div>

            {/* ── 3D Book Display Area ── */}
            <OpenBook
              books={booksList}
              currentIndex={safeIndex}
              flippingDir={flippingDir}
              isFlipping={isFlipping}
              onFlipEnd={handleFlipEnd}
            />

            {/* Book Info Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBook.id || safeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="mt-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12"
              >
                {/* Page number counter */}
                <div className="flex items-baseline gap-3 shrink-0">
                  <span className="font-serif text-6xl font-bold text-accent/25 leading-none">
                    {String(safeIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    of {booksList.length}
                  </span>
                </div>

                {/* Information Card */}
                <div className="flex-1 bg-gradient-to-r from-white via-white to-secondary/20 rounded-2xl p-6 shadow-xl border border-border/50 hover:shadow-2xl transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 font-extrabold px-3 py-1 rounded-full">
                      {currentBook.genre}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      ★ 4.9 Verified Reader Choice
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-black text-foreground mb-2 tracking-tight">
                    {currentBook.title}
                  </h3>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-4 font-serif">
                    {currentBook.description}
                  </p>
                  <div className="pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                      Author: <span className="text-foreground">{currentBook.author}</span>
                    </p>
                    <Link
                      href={currentBook.linkUrl || "/books/all"}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-accent transition-colors bg-white px-4 py-2 rounded-full border border-primary/20 shadow-sm hover:shadow"
                    >
                      <span>Order Paperback or E-Book</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex flex-col gap-5 mt-8">
              <div className="flex items-center justify-center gap-4">

                {/* Previous Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => !isFlipping && triggerFlip('backward')}
                  disabled={isFlipping}
                  className="p-3 rounded-full border border-border text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors disabled:opacity-40"
                  aria-label="Previous book"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                {/* Dot Indicators */}
                <div className="flex gap-3">
                  {booksList.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`rounded-full transition-all ${
                        index === safeIndex
                          ? 'bg-accent w-8 h-2'
                          : 'bg-border w-2 h-2 hover:bg-muted-foreground'
                      }`}
                      aria-label={`Go to book ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => !isFlipping && triggerFlip('forward')}
                  disabled={isFlipping}
                  className="p-3 rounded-full border border-border text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors disabled:opacity-40"
                  aria-label="Next book"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Auto play toggle */}
              <div className="flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="flex items-center gap-2 px-4 py-2 rounded-sm border border-border text-muted-foreground hover:text-foreground hover:border-accent transition-colors text-xs uppercase tracking-widest font-medium"
                >
                  {isAutoPlay ? (
                    <><Pause className="w-4 h-4" /> Pause</>
                  ) : (
                    <><Play className="w-4 h-4" /> Play</>
                  )}
                </motion.button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
