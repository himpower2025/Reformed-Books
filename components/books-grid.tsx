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
    <section className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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

        {/* Books Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 mb-12">
          {books.map((book, index) => {
            // Create asymmetric layout - alternating spans
            const isLarge = [0, 3].includes(index % 6)
            const colSpan = isLarge ? 'md:col-span-2' : 'md:col-span-2'
            const rowSpan = isLarge ? 'md:row-span-2' : ''

            return (
              <div
                key={book.id}
                className={`group cursor-pointer relative overflow-hidden rounded-sm transition-all duration-500 hover:shadow-2xl ${colSpan} ${rowSpan}`}
              >
                {/* Book Image */}
                <div className={`relative bg-gradient-to-br from-primary/20 to-accent/20 ${isLarge ? 'h-96' : 'h-64'} overflow-hidden`}>
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Book Info - Positioned over image */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="mb-3">
                    <span className="inline-block text-xs font-medium text-accent/80 uppercase tracking-widest mb-2">
                      {book.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white leading-tight">
                      {book.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/80 mb-4">{book.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent font-medium">${book.price}</span>
                    <button className="inline-flex items-center gap-2 text-white text-xs uppercase tracking-wide font-medium hover:text-accent transition-colors">
                      View Details
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border border-accent opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-sm" />
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
