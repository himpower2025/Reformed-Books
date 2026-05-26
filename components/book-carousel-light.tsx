'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// TODO: 실제 출판사 도서 데이터로 교체하세요
// 각 book의 color는 Tailwind gradient 클래스 (from-*/to-*)
// coverImage: '/images/book-cover-1.jpg' 형태로 추가 가능
// ─────────────────────────────────────────────────────────────
const BOOKS_DATA = [
  {
    id: 1,
    title: "Reformed Theology",
    description: "A comprehensive exploration of reformed theological thought and its relevance to contemporary faith.",
    author: "Dr. James Mitchell",
    genre: "Theology",
    color: "from-primary/20 to-accent/20"
  },
  {
    id: 2,
    title: "Faith & Culture",
    description: "Examining the intersection of Christian faith with modern cultural movements and worldview.",
    author: "Rev. Sarah Williams",
    genre: "Culture",
    color: "from-accent/20 to-primary/10"
  },
  {
    id: 3,
    title: "Biblical Worldview",
    description: "Developing a comprehensive biblical perspective on life, society, and Christian living.",
    author: "Dr. Michael Chen",
    genre: "Biblical Studies",
    color: "from-secondary/20 to-accent/10"
  },
  {
    id: 4,
    title: "Doctrine & Practice",
    description: "Bridging theological doctrine with practical application in everyday Christian life.",
    author: "Rev. Elizabeth Turner",
    genre: "Doctrine",
    color: "from-primary/10 to-secondary/20"
  }
]

// ─── 3D Page Flip 핵심 스타일 (Tailwind로 표현 불가한 부분만 인라인) ───
const flipStyles = `
  .book-scene {
    perspective: 2000px;
    perspective-origin: center center;
  }
  .book-spread {
    transform-style: preserve-3d;
    transform: rotateX(4deg);
    transition: transform 0.4s ease;
  }
  .book-spread:hover {
    transform: rotateX(2deg) rotateY(1deg);
  }
  .page-flip {
    transform-origin: left center;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .page-face {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .page-back-face {
    transform: rotateY(180deg);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .spine-glow {
    background: linear-gradient(to right,
      rgba(180,150,90,0.0) 0%,
      rgba(180,150,90,0.6) 40%,
      rgba(220,190,130,0.9) 50%,
      rgba(180,150,90,0.6) 60%,
      rgba(180,150,90,0.0) 100%
    );
  }
  .page-shadow-left {
    box-shadow: inset -12px 0 24px rgba(0,0,0,0.12), -4px 0 12px rgba(0,0,0,0.08);
  }
  .page-shadow-right {
    box-shadow: inset 12px 0 24px rgba(0,0,0,0.12), 4px 0 12px rgba(0,0,0,0.08);
  }
  .book-ground-shadow {
    background: radial-gradient(ellipse 70% 30% at 50% 100%, rgba(0,0,0,0.22) 0%, transparent 70%);
  }
  @keyframes flipForward {
    0%   { transform: rotateY(0deg); z-index: 20; }
    40%  { z-index: 30; }
    100% { transform: rotateY(-180deg); z-index: 10; }
  }
  @keyframes flipBackward {
    0%   { transform: rotateY(-180deg); z-index: 10; }
    40%  { z-index: 30; }
    100% { transform: rotateY(0deg); z-index: 20; }
  }
  .flip-forward  { animation: flipForward  0.9s cubic-bezier(0.645, 0.045, 0.355, 1.000) forwards; }
  .flip-backward { animation: flipBackward 0.9s cubic-bezier(0.645, 0.045, 0.355, 1.000) forwards; }

  .page-curl::after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 0; height: 0;
    transition: all 0.25s ease;
  }
  .page-hover:hover .page-curl::after {
    width: 28px; height: 28px;
    background: linear-gradient(225deg,
      #ede8df 45%,
      rgba(180,150,90,0.15) 50%,
      transparent 55%
    );
    box-shadow: -3px -3px 6px rgba(0,0,0,0.1);
  }
`

// ─── 개별 페이지 컴포넌트 ───
function BookPage({
  book,
  pageNum,
  totalPages,
  side,
}: {
  book: (typeof BOOKS_DATA)[0]
  pageNum: number
  totalPages: number
  side: 'left' | 'right'
}) {
  const isLeft = side === 'left'
  return (
    <div
      className={`
        w-full h-full flex flex-col justify-between p-8 relative overflow-hidden
        ${isLeft ? 'page-shadow-left' : 'page-shadow-right'}
        bg-[oklch(0.99_0.005_70)]
      `}
    >
      {/* 장식 코너 프레임 */}
      <svg
        className="absolute top-3 left-3 opacity-30"
        width="36" height="36" viewBox="0 0 36 36"
      >
        <path d="M2 18 L2 2 L18 2" fill="none" stroke="var(--accent)" strokeWidth="0.8"/>
        <circle cx="2" cy="2" r="1.5" fill="var(--accent)"/>
      </svg>
      <svg
        className="absolute bottom-3 right-3 opacity-30"
        width="36" height="36" viewBox="0 0 36 36"
      >
        <path d="M34 18 L34 34 L18 34" fill="none" stroke="var(--accent)" strokeWidth="0.8"/>
        <circle cx="34" cy="34" r="1.5" fill="var(--accent)"/>
      </svg>

      {/* 상단: 장르 태그 */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-px bg-accent/60" />
        <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium">
          {book.genre}
        </span>
      </div>

      {/* 중앙: 책 표지 이미지 플레이스홀더 */}
      {/* TODO: <img src={book.coverImage} /> 로 교체 */}
      <div
        className={`
          w-full flex-1 my-4 rounded-[2px] overflow-hidden relative
          bg-gradient-to-br ${book.color}
          flex items-center justify-center
        `}
      >
        <div className="text-center opacity-50">
          <div className="w-8 h-8 mx-auto mb-2 border border-accent/40 rounded-[1px] flex items-center justify-center">
            <div className="w-4 h-4 border border-accent/60 rounded-[1px]" />
          </div>
          {/* TODO: 실제 책 표지 이미지로 교체 */}
          <span className="text-[9px] uppercase tracking-widest text-foreground/40">
            Book Cover
          </span>
        </div>
      </div>

      {/* 하단: 도서 정보 */}
      <div>
        <h3 className="font-serif text-sm font-bold text-foreground leading-tight mb-1">
          {book.title}
        </h3>
        <p className="text-[10px] text-muted-foreground font-medium tracking-wide">
          {book.author}
        </p>
      </div>

      {/* 페이지 번호 */}
      <span
        className="absolute font-serif font-bold text-foreground/10 select-none pointer-events-none"
        style={{
          fontSize: '3.5rem',
          lineHeight: 1,
          bottom: '1rem',
          [isLeft ? 'left' : 'right']: '1.2rem',
        }}
      >
        {String(pageNum).padStart(2, '0')}
      </span>
    </div>
  )
}

// ─── 책 펼침 효과 (열린 책 표현) ───
function OpenBook({
  currentBook,
  nextBook,
  flippingDir,
  isFlipping,
  onFlipEnd,
}: {
  currentBook: (typeof BOOKS_DATA)[0]
  nextBook: (typeof BOOKS_DATA)[0]
  flippingDir: 'forward' | 'backward' | null
  isFlipping: boolean
  onFlipEnd: () => void
}) {
  const flipRef = useRef<HTMLDivElement>(null)

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

  const BOOK_W = 560
  const BOOK_H = 380
  const PAGE_W = BOOK_W / 2

  return (
    <div className="book-scene w-full flex justify-center" style={{ height: BOOK_H + 40 }}>
      <div style={{ position: 'relative', width: BOOK_W, height: BOOK_H }}>

        {/* 바닥 그림자 */}
        <div
          className="book-ground-shadow absolute pointer-events-none"
          style={{ bottom: -28, left: '5%', right: '5%', height: 32 }}
        />

        {/* 열린 책 전체 (3D 기울기) */}
        <div className="book-spread" style={{ width: BOOK_W, height: BOOK_H, position: 'relative' }}>

          {/* ── 왼쪽 고정 페이지 (현재 책 - 왼쪽 면) ── */}
          <div
            className="page-shadow-left absolute overflow-hidden rounded-l-[2px]"
            style={{
              left: 0, top: 0,
              width: PAGE_W, height: BOOK_H,
              background: 'oklch(0.99 0.005 70)',
              zIndex: 5,
            }}
          >
            <BookPage
              book={currentBook}
              pageNum={1}
              totalPages={BOOKS_DATA.length}
              side="left"
            />
          </div>

          {/* ── 오른쪽 고정 페이지 (다음 책 - 오른쪽 면) ── */}
          <div
            className="page-shadow-right absolute overflow-hidden rounded-r-[2px]"
            style={{
              right: 0, top: 0,
              width: PAGE_W, height: BOOK_H,
              background: 'oklch(0.99 0.005 70)',
              zIndex: 5,
            }}
          >
            <BookPage
              book={nextBook}
              pageNum={2}
              totalPages={BOOKS_DATA.length}
              side="right"
            />
          </div>

          {/* ── 책 척추(Spine) ── */}
          <div
            className="spine-glow absolute pointer-events-none"
            style={{
              left: PAGE_W - 3,
              top: 0,
              width: 6,
              height: BOOK_H,
              zIndex: 25,
            }}
          />

          {/* ── 넘어가는 페이지 (flip 애니메이션) ── */}
          {isFlipping && (
            <div
              ref={flipRef}
              className="page-flip page-hover absolute overflow-hidden"
              style={{
                left: PAGE_W,
                top: 0,
                width: PAGE_W,
                height: BOOK_H,
                zIndex: 20,
                transformOrigin: 'left center',
              }}
            >
              {/* 앞면 (넘어가기 전 보이는 면) */}
              <div
                className="page-face absolute inset-0 overflow-hidden page-curl"
                style={{ background: 'oklch(0.99 0.005 70)' }}
              >
                <BookPage
                  book={flippingDir === 'forward' ? currentBook : nextBook}
                  pageNum={3}
                  totalPages={BOOKS_DATA.length}
                  side="right"
                />
                {/* 페이지 넘길 때 빛 반사 효과 */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)',
                    mixBlendMode: 'screen',
                  }}
                />
              </div>
              {/* 뒷면 (넘어간 후 보이는 면) */}
              <div
                className="page-back-face absolute inset-0 overflow-hidden"
                style={{ background: 'oklch(0.98 0.008 70)' }}
              >
                <BookPage
                  book={flippingDir === 'forward' ? nextBook : currentBook}
                  pageNum={4}
                  totalPages={BOOKS_DATA.length}
                  side="left"
                />
              </div>
            </div>
          )}

          {/* ── 책 외곽 그림자 ── */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[2px]"
            style={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.12)',
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── 메인 컴포넌트 ───
export function BookCarouselLight() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flippingDir, setFlippingDir] = useState<'forward' | 'backward' | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const pendingIndex = useRef<number | null>(null)

  // 표시 중인 책 (애니메이션 중에는 이전 책 유지)
  const displayIndex = currentIndex
  const nextDisplayIndex = (currentIndex + 1) % BOOKS_DATA.length
  const currentBook = BOOKS_DATA[displayIndex]
  const nextBook = BOOKS_DATA[nextDisplayIndex]

  useEffect(() => {
    if (!isAutoPlay) return
    const timer = setInterval(() => {
      if (!isFlipping) triggerFlip('forward')
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlay, isFlipping])

  const triggerFlip = (dir: 'forward' | 'backward') => {
    if (isFlipping) return
    setFlippingDir(dir)
    setIsFlipping(true)
  }

  const handleFlipEnd = () => {
    setIsFlipping(false)
    if (flippingDir === 'forward') {
      setCurrentIndex((prev) => (prev + 1) % BOOKS_DATA.length)
    } else {
      setCurrentIndex((prev) => (prev - 1 + BOOKS_DATA.length) % BOOKS_DATA.length)
    }
    setFlippingDir(null)
  }

  const handleDotClick = (index: number) => {
    if (isFlipping || index === currentIndex) return
    const dir = index > currentIndex ? 'forward' : 'backward'
    pendingIndex.current = index
    triggerFlip(dir)
  }

  return (
    <>
      <style>{flipStyles}</style>

      <section className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        {/* 배경 대형 장식 텍스트 */}
        <div
          className="absolute select-none pointer-events-none font-serif font-bold"
          style={{
            fontSize: 'clamp(8rem, 18vw, 18rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(var(--accent), 0.06)',
            opacity: 0.5,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.02em',
          }}
        >
          BOOKS
        </div>

        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">

            {/* 헤더 */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-8 h-px bg-accent/40" />
                <span className="text-xs uppercase tracking-widest font-medium text-accent">
                  Discover Our Works
                </span>
                <div className="w-8 h-px bg-accent/40" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                Featured Books
              </h2>
            </div>

            {/* ── 3D 책 펼침 영역 ── */}
            <OpenBook
              currentBook={currentBook}
              nextBook={nextBook}
              flippingDir={flippingDir}
              isFlipping={isFlipping}
              onFlipEnd={handleFlipEnd}
            />

            {/* 책 정보 패널 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="mt-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12"
              >
                {/* 페이지 번호 표시 */}
                <div className="flex items-baseline gap-3 shrink-0">
                  <span className="font-serif text-6xl font-bold text-accent/25 leading-none">
                    {String(currentIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    of {BOOKS_DATA.length}
                  </span>
                </div>

                {/* 흰 카드 (책 정보) */}
                <div className="flex-1 bg-white rounded-sm p-6 shadow-md border border-border/20">
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    {currentBook.title}
                  </h3>
                  <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                    {currentBook.description}
                  </p>
                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                      {currentBook.author}
                    </p>
                    <span className="text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-2 py-0.5 rounded-[2px]">
                      {currentBook.genre}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 컨트롤 */}
            <div className="flex flex-col gap-5 mt-8">
              <div className="flex items-center justify-center gap-4">

                {/* 이전 버튼 */}
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

                {/* 도트 인디케이터 */}
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

                {/* 다음 버튼 */}
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

              {/* 자동 재생 토글 */}
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
