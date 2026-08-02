'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { booksData } from '@/lib/db-data'
import { Search, Sparkles, Filter, Star, BookOpen, Download, ArrowRight } from 'lucide-react'

export function BooksGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = ['All', 'Theology', 'Culture', 'Worldview', 'History']

  const filteredBooks = booksData.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category.toLowerCase().includes(selectedCategory.toLowerCase())
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-secondary/20 to-background border-t border-border/40 relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-widest font-extrabold text-accent bg-accent/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" />
                Featured Publications
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-foreground tracking-tight">
              Explore Our Library
            </h2>
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed mt-2 font-serif">
              Carefully preserved works, contemporary commentary, and theological confession designed with high elegance
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative min-w-[260px]">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-full text-xs font-serif text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-xs text-muted-foreground hover:text-foreground font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-border/60 pb-6">
          <span className="text-xs uppercase tracking-wider font-extrabold text-muted-foreground mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-md scale-105'
                  : 'bg-white hover:bg-secondary text-foreground/80 border border-border/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16"
          >
            {filteredBooks.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-border/50">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="font-serif text-lg text-foreground font-bold">No books found matching your filter</p>
                <p className="text-xs text-muted-foreground mt-1">Try clearing your search query or choosing another category.</p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="mt-4 text-xs font-bold uppercase tracking-wider text-primary underline"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredBooks.map((book) => {
                return (
                  <Link key={book.id} href={`/books/${book.id}`} className="block h-full">
                    <motion.div
                      whileHover={{ y: -12, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 450, damping: 14 }}
                      className="group cursor-pointer flex flex-col bg-white rounded-2xl p-6 border border-border/60 hover:border-accent/50 shadow-md hover:shadow-2xl transition-all duration-300 h-full"
                    >
                      {/* Book Cover */}
                      <div className="aspect-[3/4.2] w-full bg-gradient-to-br from-primary/10 via-accent/5 to-secondary rounded-xl mb-5 overflow-hidden relative shadow-lg border border-border/20">
                        <Image
                          src={book.image}
                          alt={book.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-750 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Spine depth effect */}
                        <div className="absolute top-0 bottom-0 left-2 w-1.5 bg-black/15 shadow-inner pointer-events-none" />
                        <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-white/5 pointer-events-none" />

                        {/* Format Badges */}
                        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                          <span className="text-[9px] font-extrabold uppercase bg-emerald-600 text-white px-2 py-0.5 rounded shadow-sm">
                            Hardcover
                          </span>
                          <span className="text-[9px] font-extrabold uppercase bg-accent text-white px-2 py-0.5 rounded shadow-sm">
                            E-Book
                          </span>
                        </div>
                      </div>

                      {/* Book Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full font-sans">
                              {book.category}
                            </span>
                            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                              <span>4.9</span>
                            </div>
                          </div>

                          <h3 className="font-serif text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {book.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1.5 font-sans">
                            by <strong className="text-foreground/80">{book.author}</strong>
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-5 mt-5 border-t border-border/50">
                          <div>
                            <span className="text-xs text-muted-foreground block font-sans uppercase">Price</span>
                            <span className="text-lg font-serif font-black text-primary">${book.price}</span>
                          </div>
                          <span className="text-xs font-sans font-bold text-accent uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-300 flex items-center gap-1 bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
                            Details <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                )
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        <div className="flex justify-center pt-8 border-t border-border/40">
          <Link href="/books/all">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="inline-flex items-center gap-3 text-white font-serif text-base font-bold transition-all group px-8 py-4 bg-primary hover:bg-primary/90 rounded-full shadow-md hover:shadow-xl border border-primary/30 cursor-pointer"
            >
              <span>Explore Complete Catalog (6 Volumes)</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  )
}

