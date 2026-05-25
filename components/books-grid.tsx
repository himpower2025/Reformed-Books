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
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Featured Books
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Carefully curated publications exploring faith, theology, and intellectual tradition
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="group cursor-pointer rounded-lg overflow-hidden border border-neutral-200 hover:border-neutral-400 transition-all duration-300 hover:shadow-lg"
            >
              {/* Book Image */}
              <div className="relative h-80 overflow-hidden bg-neutral-100">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Book Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                    {book.category}
                  </span>
                  <span className="text-xs font-medium text-blue-600">
                    ${book.price}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {book.title}
                </h3>

                <p className="text-sm text-neutral-600 mb-4">{book.author}</p>

                <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors rounded">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 text-neutral-900 font-medium hover:text-blue-600 transition-colors">
            View All Books
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
