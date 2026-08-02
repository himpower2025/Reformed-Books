'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { booksData, Book } from '@/lib/db-data'
import { motion } from 'framer-motion'
import { BookOpen, HelpCircle, GraduationCap, Users, Bookmark, FileText, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CategoryMeta {
  name: string;
  icon: any;
  desc: string;
  theme: string;
}

export default function BookCategoriesPage() {
  const categoryMetas: CategoryMeta[] = [
    {
      name: 'Sovereign Grace',
      icon: GraduationCap,
      desc: 'Historic doctrines of Reformed theology and absolute sovereign grace.',
      theme: 'from-emerald-50 to-emerald-100/30 text-emerald-800 border-emerald-200/40'
    },
    {
      name: 'Covenant Theology',
      icon: Bookmark,
      desc: 'Exploring structural covenants across the whole story of redemption.',
      theme: 'from-amber-50 to-amber-100/30 text-amber-800 border-amber-200/40'
    },
    {
      name: 'Christian Living',
      icon: BookOpen,
      desc: 'Nurturing solitude, prayer, and authentic spiritual communion.',
      theme: 'from-slate-50 to-slate-100/30 text-slate-800 border-slate-200/40'
    },
    {
      name: 'Children & Family',
      icon: Users,
      desc: 'Lyrical and beautiful storybooks bringing grand covenants to young minds.',
      theme: 'from-indigo-50 to-indigo-100/30 text-indigo-800 border-indigo-200/40'
    },
    {
      name: 'Practical Theology',
      icon: FileText,
      desc: 'Translating rich theological truths into joyful everyday active life.',
      theme: 'from-violet-50 to-violet-100/30 text-violet-800 border-violet-200/40'
    },
    {
      name: 'History & Biography',
      icon: HelpCircle,
      desc: 'Courageous testimonies of reformation and historic Christian witness.',
      theme: 'from-rose-50 to-rose-100/30 text-rose-800 border-rose-200/40'
    }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Hero Header */}
      <section className="py-16 bg-secondary/15 border-b border-border/40 relative">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <span className="text-[10px] uppercase tracking-widest font-bold text-accent mb-2.5 block">Explore by Theme</span>
          <h1 className="font-serif text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Book Categories
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto font-serif">
            Deeper understanding begins with structure. Dive into our carefully classified departments of theological and practical wisdom.
          </p>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-16 flex-grow bg-background">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="space-y-16">
            {categoryMetas.map((cat, idx) => {
              const IconComponent = cat.icon;
              const associatedBooks = booksData.filter(b => b.category === cat.name);
              
              if (associatedBooks.length === 0) return null;

              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="pb-12 border-b border-border/30 last:border-b-0"
                >
                  {/* Category Header Card */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-start gap-4">
                      <div className={`p-3.5 rounded-xl bg-gradient-to-br border ${cat.theme} flex-shrink-0`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground leading-tight">{cat.name}</h2>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-xl font-serif">{cat.desc}</p>
                      </div>
                    </div>
                    
                    <Link href={`/books/all?cat=${cat.name}`} passHref>
                      <Button variant="outline" className="text-xs uppercase font-bold tracking-wider self-start md:self-auto hover:bg-secondary/40">
                        View Category
                        <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                      </Button>
                    </Link>
                  </div>

                  {/* Horizontal list of books inside this category */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {associatedBooks.map((book) => (
                      <div key={book.id} className="group relative">
                        <Link href={`/books/${book.id}`} className="block">
                          <div className="aspect-[2/3] w-full relative overflow-hidden rounded bg-secondary/10 border border-border/40 p-2 shadow-sm group-hover:shadow-md transition-all duration-300">
                            <img
                              src={book.image}
                              alt={book.title}
                              className="object-cover w-full h-full rounded shadow"
                            />
                          </div>
                          <div className="mt-3">
                            <h3 className="font-serif text-xs font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                              {book.title}
                            </h3>
                            <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                              {book.author}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
