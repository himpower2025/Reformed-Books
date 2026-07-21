'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface Book {
  id: string
  title: string
  author: string
  category: string
  price: number
  image: string
}

const books: Book[] = [
  {
    id: '1',
    title: 'The Doctrine of God',
    author: 'Reformed Theology Series',
    category: 'Theology',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=300&h=450&fit=crop',
  },
  {
    id: '2',
    title: 'Christ and Culture',
    author: 'H. Richard Niebuhr',
    category: 'Philosophy',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1543002588-d83ceddc8055?w=300&h=450&fit=crop',
  },
  {
    id: '3',
    title: 'A Reformed Worldview',
    author: 'Contemporary Essays',
    category: 'Philosophy',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=300&h=450&fit=crop',
  },
  {
    id: '4',
    title: 'Biblical Eschatology',
    author: 'Theological Studies',
    category: 'Theology',
    price: 36.99,
    image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=300&h=450&fit=crop',
  },
  {
    id: '5',
    title: 'Little Hearts, Big Grace: A Storybook of Covenants',
    author: 'Sarah Mitchell & David Chen',
    category: 'Children & Family',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop',
  },
  {
    id: '6',
    title: 'Echoes of the Reformation: Lives of Courage',
    author: 'Historical Biographies',
    category: 'History & Biography',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop',
  },
]

export function BooksGrid() {
  return (
    <section className="py-20 md:py-32 bg-background border-t border-border/40 relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-xs uppercase tracking-widest font-extrabold text-accent flex items-center gap-1.5">
              <span className="animate-bounce text-sm">✨</span> New Releases
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
            Our Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            Discover carefully curated publications exploring reformed theology, faith, and contemporary worldview, made to spark inspiration
          </p>
        </div>

        {/* Books Grid - Refined Responsive Columns for Computer, Tablet, and Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {books.map((book) => {
            return (
              <motion.div
                key={book.id}
                whileHover={{ y: -12, scale: 1.025 }}
                transition={{ type: "spring", stiffness: 450, damping: 14 }}
                className="group cursor-pointer flex flex-col bg-card hover:bg-white rounded-xl p-5 border border-border/40 hover:border-accent/30 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Book Image Cover Wrapper */}
                <div className="aspect-[3/4.2] w-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-5 overflow-hidden relative shadow-md border border-border/10">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-750 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Book Spine Depth Effect */}
                  <div className="absolute top-0 bottom-0 left-2 w-1.5 bg-black/15 shadow-inner pointer-events-none" />
                  <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-white/5 pointer-events-none" />
                </div>

                {/* Book Info Container: Completely accessible and beautiful on all viewports */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-[10px] uppercase tracking-widest font-extrabold text-accent bg-accent/5 px-2 py-0.5 rounded-[4px] mb-3 font-mono">
                      {book.category}
                    </span>
                    <h3 className="font-serif text-lg lg:text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1.5 font-sans">
                      by {book.author}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-5 mt-5 border-t border-border/50">
                    <span className="text-base font-sans font-extrabold text-primary">${book.price}</span>
                    <span className="text-xs font-sans font-bold text-accent uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-300 flex items-center gap-1.5">
                      Explore <span>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="flex justify-center pt-8 border-t border-border/40">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="inline-flex items-center gap-3 text-foreground font-serif text-lg hover:text-accent font-bold transition-colors group px-6 py-3 bg-secondary/40 hover:bg-secondary rounded-full border border-border/30"
          >
            Explore Full Collection
            <span className="inline-block w-6 h-px bg-foreground group-hover:bg-accent transition-colors" />
            <span>→</span>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
