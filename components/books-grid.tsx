'use client'

import Image from 'next/image'

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
    title: 'The Nature of Faith',
    author: 'Christian Perspectives',
    category: 'Religion',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1543002588-d83ceddc8055?w=300&h=450&fit=crop',
  },
  {
    id: '6',
    title: 'Modern Theology',
    author: 'Critical Analysis',
    category: 'Theology',
    price: 38.99,
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=300&h=450&fit=crop',
  },
]

export function BooksGrid() {
  return (
    <section className="py-20 md:py-32 bg-background border-t border-border/40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-xs uppercase tracking-widest font-medium text-accent">New Releases</span>
            <div className="flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            Discover carefully curated publications exploring reformed theology, faith, and contemporary worldview
          </p>
        </div>

        {/* Books Grid - Refined Responsive Columns for Computer, Tablet, and Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {books.map((book) => {
            return (
              <div
                key={book.id}
                className="group cursor-pointer flex flex-col bg-slate-50/40 hover:bg-white rounded-md p-5 border border-border/5 hover:border-border/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Book Image Cover Wrapper */}
                <div className="aspect-[3/4.2] w-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-sm mb-5 overflow-hidden relative shadow-md border border-border/10">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Book Spine Depth Effect */}
                  <div className="absolute top-0 bottom-0 left-2 w-1.5 bg-black/15 shadow-inner pointer-events-none" />
                  <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-white/5 pointer-events-none" />
                </div>

                {/* Book Info Container: Completely accessible and beautiful on all viewports */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest font-semibold text-accent/80 mb-2 font-mono">
                      {book.category}
                    </span>
                    <h3 className="font-serif text-lg lg:text-xl font-bold text-foreground leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1.5 font-sans">
                      by {book.author}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-5 mt-5 border-t border-border/50">
                    <span className="text-sm font-sans font-semibold text-primary">${book.price}</span>
                    <span className="text-xs font-sans font-medium text-accent uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-300 flex items-center gap-1.5">
                      Explore <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="flex justify-center pt-8 border-t border-border">
          <button className="inline-flex items-center gap-3 text-foreground font-serif text-lg hover:text-accent transition-colors group">
            Explore Full Collection
            <span className="inline-block w-6 h-px bg-foreground group-hover:bg-accent transition-colors" />
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
