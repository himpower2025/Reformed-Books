'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { booksData, Book } from '@/lib/db-data'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, ArrowUpDown, BookOpen, DollarSign, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function AllBooksPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'title' | 'price-asc' | 'price-desc'>('title')
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(booksData.map((b) => b.category)))]

  // Filter & Sort books
  const filteredBooks = booksData
    .filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || 
                            book.author.toLowerCase().includes(search.toLowerCase()) ||
                            (book.subtitle && book.subtitle.toLowerCase().includes(search.toLowerCase()))
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      return 0
    })

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Hero Header */}
      <section className="py-16 bg-secondary/15 border-b border-border/40 relative">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <span className="text-[10px] uppercase tracking-widest font-bold text-accent mb-2.5 block">Reformed Classics & Modern Treasures</span>
          <h1 className="font-serif text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Discover Our Entire Collection
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto font-serif">
            From historic sovereign grace treatises to joyful storybooks for children, browse our catalog designed to nurture the intellect and spirit.
          </p>
        </div>
      </section>

      {/* Main Catalog Area */}
      <section className="py-12 flex-grow">
        <div className="mx-auto max-w-[1200px] px-6">
          
          {/* Controls Bar: Search, Category Filter, Sorting */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-border/40">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, author, keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 text-xs bg-muted/20 border-border/60 focus-visible:ring-accent"
              />
            </div>

            {/* Category selection pill sliders */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 border ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-background hover:bg-secondary/40 text-muted-foreground border-border/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-background text-xs border border-border/60 rounded px-2.5 py-1.5 text-muted-foreground focus:outline-none focus:border-accent"
              >
                <option value="title">Alphabetical (A-Z)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Book Catalog Grid */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
                  className="group cursor-pointer flex flex-col justify-between"
                  onClick={() => setSelectedBook(book)}
                >
                  <div>
                    {/* Cover Wrapper with subtle shadow and premium alignment */}
                    <div className="aspect-[2/3] w-full relative overflow-hidden rounded bg-secondary/30 border border-border/40 p-4 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-accent/30 transition-all duration-300">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="object-cover w-full h-full rounded shadow-md transform group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Interactive Quick View badge */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-background/90 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded shadow">
                          Quick View
                        </span>
                      </div>
                    </div>

                    {/* Book Metadata */}
                    <div className="mt-4">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-accent">
                        {book.category}
                      </span>
                      <h3 className="font-serif text-sm font-bold text-foreground mt-1 line-clamp-1 leading-snug group-hover:text-primary transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground font-sans mt-0.5">
                        {book.author}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-1.5 border-t border-border/20 flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">
                      ${book.price.toFixed(2)}
                    </span>
                    <span className="text-[9px] text-muted-foreground uppercase tracking-widest">
                      {book.paperPageNum ? `${book.paperPageNum}p` : ''}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-border/60 rounded-xl bg-secondary/5">
              <BookOpen className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-foreground mb-1">No Books Found</h3>
              <p className="text-xs text-muted-foreground">Try adjusting your search query or choosing another category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Book Quick View Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={(open) => !open && setSelectedBook(null)}>
        {selectedBook && (
          <DialogContent className="sm:max-w-[620px] bg-background border border-border rounded-xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Cover image */}
              <div className="aspect-[2/3] w-full rounded-lg bg-secondary/20 border border-border/40 p-4 flex items-center justify-center">
                <img
                  src={selectedBook.image}
                  alt={selectedBook.title}
                  className="object-cover w-full h-full rounded shadow-xl"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-extrabold text-accent bg-accent/10 text-accent px-2 py-0.5 rounded-sm">
                    {selectedBook.category}
                  </span>
                  <DialogTitle className="font-serif text-xl md:text-2xl font-bold text-foreground mt-3 leading-snug text-left">
                    {selectedBook.title}
                  </DialogTitle>
                  {selectedBook.subtitle && (
                    <p className="text-xs text-muted-foreground italic font-serif mt-1 leading-normal text-left">
                      {selectedBook.subtitle}
                    </p>
                  )}

                  <p className="text-xs text-primary font-medium mt-2 text-left">
                    by <span className="underline">{selectedBook.author}</span>
                  </p>

                  <div className="mt-4 pt-3 border-t border-border/40">
                    <p className="text-xs text-muted-foreground font-sans leading-relaxed text-justify line-clamp-6">
                      {selectedBook.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-muted-foreground font-medium">Retail Price</span>
                    <span className="text-lg font-extrabold text-foreground">${selectedBook.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 text-xs uppercase font-bold tracking-wider py-5 bg-primary hover:bg-primary/90 text-primary-foreground">
                      Purchase Book
                    </Button>
                    <Button variant="outline" className="text-xs uppercase font-bold tracking-wider py-5" onClick={() => setSelectedBook(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Footer />
    </main>
  )
}
