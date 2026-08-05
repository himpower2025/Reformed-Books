'use client'

import React, { useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { booksData, Book } from '@/lib/db-data'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  ShoppingCart, 
  BookOpen, 
  Truck, 
  Share2, 
  ExternalLink, 
  Check, 
  Info, 
  Sparkles, 
  ChevronRight,
  Plus,
  Minus,
  MessageSquare,
  Award,
  Heart,
  BookMarked,
  ShieldCheck,
  Zap,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckoutModal } from '@/components/checkout-modal'

interface Review {
  id: string
  name: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const bookId = resolvedParams.id

  // Find target book or fallback to first book
  const book: Book = booksData.find((b) => b.id === bookId) || booksData[0]

  // Formats state: default select Paperback
  const [selectedFormat, setSelectedFormat] = useState<'paperback' | 'ebook'>('paperback')
  const [paperQuantity, setPaperQuantity] = useState(1)
  const [copiedShare, setCopiedShare] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [checkoutFormat, setCheckoutFormat] = useState<'paperback' | 'ebook'>('paperback')

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'r1',
      name: 'Dr. Samuel Vance',
      rating: 5,
      date: 'May 28, 2026',
      comment: 'An absolute masterpiece of historic theology. The clarity of thought and rich covenantal grounding make this essential reading for every home.',
      verified: true
    },
    {
      id: 'r2',
      name: 'Grace K. Min',
      rating: 5,
      date: 'June 14, 2026',
      comment: 'The formatting, typography, and depth of content are unmatched. Both the paperback and e-book versions are beautifully produced.',
      verified: true
    },
    {
      id: 'r3',
      name: 'Rev. Jonathan Park',
      rating: 4,
      date: 'July 02, 2026',
      comment: 'Profound insights into Reformed worldview. I purchased copies for our pastoral study group and everyone was deeply edified.',
      verified: true
    }
  ])

  // New review form state
  const [newRating, setNewRating] = useState(5)
  const [newName, setNewName] = useState('')
  const [newComment, setNewComment] = useState('')
  const [submittedReview, setSubmittedReview] = useState(false)

  // Related books (filtering out the current book)
  const relatedBooks = booksData
    .filter((b) => b.id !== book.id)
    .sort((a, b) => (a.category === book.category ? -1 : 1))
    .slice(0, 4)

  // Calculated Prices
  const paperbackPrice = book.price
  const ebookPrice = Math.round((book.price * 0.65) * 100) / 100

  // Quick Notification Handler
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopiedShare(true)
      showToast('Link copied to clipboard!')
      setTimeout(() => setCopiedShare(false), 2500)
    }
  }

  const handleAddToCart = (format: 'paperback' | 'ebook') => {
    const formatLabel = format === 'paperback' ? `Paperback (${paperQuantity} qty)` : 'E-book'
    showToast(`Added "${book.title}" [${formatLabel}] to your cart!`)
  }

  const handleBuyNow = (format: 'paperback' | 'ebook') => {
    setCheckoutFormat(format)
    setShowCheckoutModal(true)
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim() || !newComment.trim()) return

    const createdReview: Review = {
      id: `r-${Date.now()}`,
      name: newName,
      rating: newRating,
      date: 'Today',
      comment: newComment,
      verified: true
    }

    setReviews([createdReview, ...reviews])
    setNewName('')
    setNewComment('')
    setSubmittedReview(true)
    showToast('Thank you! Your review has been published.')
    setTimeout(() => setSubmittedReview(false), 4000)
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header />

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-primary text-primary-foreground px-5 py-3 rounded-lg shadow-xl border border-primary/20 flex items-center gap-3 text-xs font-semibold"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb Navigation */}
      <nav className="border-b border-border/40 bg-secondary/10 py-3">
        <div className="mx-auto max-w-[1280px] px-6 flex items-center gap-2 text-xs text-muted-foreground font-serif">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
          <Link href="/books/all" className="hover:text-primary transition-colors">Books</Link>
          <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
          <Link href={`/books/categories`} className="hover:text-primary transition-colors">{book.category}</Link>
          <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
          <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-none">{book.title}</span>
        </div>
      </nav>

      {/* Main Product Header & Details Section */}
      <section className="py-10 md:py-16 bg-background">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* LEFT COLUMN: Large Book Cover & Quick Meta Actions */}
            <div className="lg:col-span-4 flex flex-col items-center">
              {/* Book Cover Frame */}
              <div className="w-full max-w-[340px] aspect-[2/3] relative rounded-lg bg-gradient-to-br from-secondary/30 to-background border border-border/50 p-4 shadow-xl overflow-hidden group">
                <img
                  src={book.image}
                  alt={book.title}
                  className="object-cover w-full h-full rounded shadow-md transform group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subtle Book Spine Detail */}
                <div className="absolute top-0 bottom-0 left-2.5 w-1.5 bg-black/20 shadow-inner pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-3.5 w-[1px] bg-white/10 pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute top-6 right-6 bg-accent text-accent-foreground text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded shadow">
                  Reformed Classic
                </div>
              </div>

              {/* Action Buttons under image */}
              <div className="w-full max-w-[340px] mt-6 space-y-2.5">
                <button
                  onClick={handleShare}
                  className="w-full py-2.5 px-4 rounded-md border border-border/70 hover:bg-secondary/20 flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all"
                >
                  {copiedShare ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Share2 className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedShare ? 'Copied Link!' : 'Share Book'}</span>
                </button>
              </div>

              {/* Average Rating Bar */}
              <div className="w-full max-w-[340px] mt-6 p-4 rounded-lg bg-secondary/15 border border-border/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-muted-foreground font-serif mt-1 block">
                    4.9 / 5.0 ({reviews.length} Reader Ratings)
                  </span>
                </div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-2.5 py-1 rounded">
                  Highly Rated
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Book Details & Format Buying Options */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                {/* Category & Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent bg-accent/10 px-2.5 py-1 rounded-sm">
                    {book.category}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-sm flex items-center gap-1">
                    <Award className="w-3 h-3 text-emerald-600" />
                    Official Publication
                  </span>
                </div>

                {/* Title & Author */}
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
                  {book.title}
                </h1>
                {book.subtitle && (
                  <p className="text-base sm:text-lg text-muted-foreground italic font-serif mt-2 leading-relaxed">
                    {book.subtitle}
                  </p>
                )}

                <div className="mt-3 text-sm text-foreground font-serif flex items-center gap-2">
                  <span>by</span>
                  <span className="font-bold underline decoration-accent/40 text-primary">{book.author}</span>
                </div>

                {/* Awards & Badges line */}
                <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-border/30">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full border border-border/40 font-serif">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Solitude & Grace Pick
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full border border-border/40 font-serif">
                    <BookMarked className="w-3.5 h-3.5 text-indigo-500" />
                    {book.paperPageNum || 280} Pages
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full border border-border/40 font-serif">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Ecclesiastical Reviewed
                  </span>
                </div>

                {/* FORMAT PURCHASING CARDS */}
                <div className="mt-8">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4">
                    Select Available Formats
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* FORMAT 1: E-BOOK */}
                    <div
                      onClick={() => setSelectedFormat('ebook')}
                      className={`cursor-pointer p-5 rounded-xl border-2 transition-all duration-200 flex flex-col justify-between ${
                        selectedFormat === 'ebook'
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border/60 hover:border-primary/40 bg-card'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif font-bold text-base text-foreground flex items-center gap-1.5">
                            <Download className="w-4 h-4 text-accent" />
                            E-book
                          </span>
                          <span className="text-[10px] font-mono uppercase bg-accent/10 text-accent font-extrabold px-2 py-0.5 rounded">
                            EPUB / PDF
                          </span>
                        </div>
                        <div className="text-2xl font-extrabold font-sans text-primary mb-1">
                          ${ebookPrice.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground leading-normal font-serif">
                          Instant digital download. Compatible with Kindle, iPad, Android & e-readers.
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-border/40 space-y-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAddToCart('ebook')
                          }}
                          variant="outline"
                          className="w-full text-xs font-bold uppercase tracking-wider h-10 border-primary/30 text-primary hover:bg-primary/10"
                        >
                          <ShoppingCart className="w-3.5 h-3.5 mr-2" />
                          Add E-book to Cart
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowPreviewModal(true)
                          }}
                          className="w-full text-xs font-bold uppercase tracking-wider h-10 bg-accent text-accent-foreground hover:bg-accent/90"
                        >
                          <BookOpen className="w-3.5 h-3.5 mr-2" />
                          Read Preview Sample
                        </Button>
                      </div>
                    </div>

                    {/* FORMAT 2: PAPERBACK */}
                    <div
                      onClick={() => setSelectedFormat('paperback')}
                      className={`cursor-pointer p-5 rounded-xl border-2 transition-all duration-200 flex flex-col justify-between ${
                        selectedFormat === 'paperback'
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border/60 hover:border-primary/40 bg-card'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif font-bold text-base text-foreground flex items-center gap-1.5">
                            <BookMarked className="w-4 h-4 text-primary" />
                            Paperback
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1 bg-secondary px-2 py-0.5 rounded">
                            <Info className="w-3 h-3 text-accent" />
                            Physical Edition
                          </span>
                        </div>
                        <div className="text-2xl font-extrabold font-sans text-primary mb-1">
                          ${paperbackPrice.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground leading-normal flex items-center gap-1 font-serif">
                          <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          Delivery in 1–3 business days. Premium linen finish paper.
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border/40 space-y-3">
                        {/* Quantity counter */}
                        <div className="flex items-center justify-between bg-background border border-border/60 rounded p-1.5">
                          <span className="text-xs text-muted-foreground font-medium px-2">Quantity</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setPaperQuantity(Math.max(1, paperQuantity - 1))
                              }}
                              className="w-7 h-7 rounded border border-border flex items-center justify-center text-xs font-bold hover:bg-secondary"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-foreground w-6 text-center">{paperQuantity}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setPaperQuantity(paperQuantity + 1)
                              }}
                              className="w-7 h-7 rounded border border-border flex items-center justify-center text-xs font-bold hover:bg-secondary"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAddToCart('paperback')
                            }}
                            variant="outline"
                            className="text-xs font-bold uppercase tracking-wider h-10 border-primary/30 text-primary hover:bg-primary/10"
                          >
                            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                            Add Cart
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleBuyNow('paperback')
                            }}
                            className="text-xs font-bold uppercase tracking-wider h-10 bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Detailed Synopsis Description */}
                <div className="mt-10 pt-8 border-t border-border/50">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                    About This Volume & Synopsis
                  </h3>
                  <p className="text-sm text-muted-foreground font-serif leading-relaxed text-justify space-y-4">
                    {book.description}
                  </p>
                  <p className="text-sm text-muted-foreground font-serif leading-relaxed mt-4 text-justify">
                    Crafted specifically to encourage deep meditation and spiritual clarity, this volume unites rigorous historical confession with warm, accessible prose for modern readers.
                  </p>
                </div>

                {/* Publishing Specifications Table */}
                <div className="mt-8 p-5 bg-secondary/10 rounded-lg border border-border/40">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-foreground mb-3 font-mono">
                    Specifications & Metadata
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-serif">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-sans">Publisher</span>
                      <span className="font-semibold text-foreground">Reformed Books House</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-sans">Pages</span>
                      <span className="font-semibold text-foreground">{book.paperPageNum || 280} pages</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-sans">Language</span>
                      <span className="font-semibold text-foreground">English</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-sans">ISBN</span>
                      <span className="font-semibold text-foreground">978-1-68359-00{book.id}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: READER REVIEWS */}
      <section className="py-14 bg-secondary/10 border-t border-border/40">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Interactive Review Form ("Share Your Thoughts") */}
            <div className="lg:col-span-5 bg-background p-6 md:p-8 rounded-xl border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold">
                  ✍️
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-foreground">Share Your Thoughts</h3>
                  <p className="text-xs text-muted-foreground">Your review helps others make informed decisions.</p>
                </div>
              </div>

              {submittedReview ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium border border-emerald-200">
                  ✨ Thank you for sharing your feedback! Your review has been submitted successfully.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4 mt-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-muted-foreground/30'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-foreground ml-2 font-mono">{newRating}.0 / 5.0</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
                      Your Name
                    </label>
                    <Input
                      placeholder="e.g. Samuel Calvin"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="text-xs bg-muted/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
                      Your Review
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your honest review of this book..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full text-xs p-3 rounded-md bg-muted/20 border border-border focus:outline-none focus:border-accent font-serif"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full text-xs font-bold uppercase tracking-wider py-5 bg-primary hover:bg-primary/90">
                    Submit Review
                  </Button>
                </form>
              )}
            </div>

            {/* List of Reader Reviews */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">Reader Reviews</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xl font-extrabold text-foreground font-mono">4.9</span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({reviews.length} verified reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-5 rounded-lg bg-background border border-border/50 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-xs text-primary font-serif">
                            {rev.name.charAt(0)}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-foreground block">{rev.name}</span>
                            <span className="text-[10px] text-muted-foreground">{rev.date}</span>
                          </div>
                        </div>
                        <div className="flex text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground font-serif leading-relaxed pt-1">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: RELATED BOOKS */}
      <section className="py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-border/30 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent block mb-1">
                Curated Recommendations
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-foreground">
                Related Books
              </h2>
            </div>
            <Link
              href="/books/all"
              className="text-xs font-bold text-accent uppercase tracking-wider hover:underline flex items-center gap-1"
            >
              Browse Full Catalog <span>→</span>
            </Link>
          </div>

          {/* Related Books Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {relatedBooks.map((relBook) => (
              <Link
                key={relBook.id}
                href={`/books/${relBook.id}`}
                className="group flex flex-col justify-between bg-card hover:bg-white rounded-xl p-4 border border-border/40 hover:border-accent/40 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="aspect-[2/3] w-full relative overflow-hidden rounded-lg bg-secondary/20 mb-4 p-2 shadow-sm border border-border/20">
                    <img
                      src={relBook.image}
                      alt={relBook.title}
                      className="object-cover w-full h-full rounded shadow group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-accent">
                    {relBook.category}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-foreground mt-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {relBook.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground font-sans mt-0.5 truncate">
                    {relBook.author}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">${relBook.price.toFixed(2)}</span>
                  <span className="text-[10px] uppercase font-bold text-accent group-hover:translate-x-1 transition-transform">
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE E-BOOK PREVIEW MODAL */}
      <AnimatePresence>
        {showPreviewModal && (
          <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background border border-border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden my-auto"
            >
              <div className="p-4 sm:p-5 border-b border-border/60 flex items-center justify-between bg-secondary/20 shrink-0">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent">Sample Excerpt</span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-foreground line-clamp-1">{book.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 text-foreground flex items-center justify-center text-sm font-bold transition-all border border-border"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto space-y-4 font-serif text-sm leading-relaxed text-justify text-foreground/90">
                <p className="first-letter:text-4xl first-letter:font-bold first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-accent">
                  {book.description}
                </p>
                <p>
                  CHAPTER 1: THE MAJESTY OF SOVEREIGN FAITH
                </p>
                <p className="text-muted-foreground text-xs italic">
                  "To know God in truth is to rest in His eternal decree. When the heart recognizes that salvation is completely of grace, anxiety dissipates into pure worship..."
                </p>
              </div>

              <div className="p-4 border-t border-border/60 bg-secondary/10 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Previewing Chapter 1</span>
                <Button
                  onClick={() => {
                    setShowPreviewModal(false)
                    handleAddToCart('ebook')
                  }}
                  className="text-xs font-bold uppercase tracking-wider bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Buy Full E-book (${ebookPrice.toFixed(2)})
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        book={book}
        format={checkoutFormat}
        quantity={checkoutFormat === 'paperback' ? paperQuantity : 1}
        price={checkoutFormat === 'paperback' ? paperbackPrice : ebookPrice}
      />

      <Footer />
    </main>
  )
}
