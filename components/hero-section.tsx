export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24 lg:py-32">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-amber-400" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
            Discover Profound <span className="text-blue-600">Theological Works</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-neutral-600 mb-10 leading-relaxed">
            We are dedicated to publishing books that explore the intersection of faith, theology, and contemporary culture. Our collection features works by respected scholars and thoughtful writers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-8 py-3 bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors rounded">
              Explore Books
            </button>
            <button className="inline-flex items-center justify-center px-8 py-3 border-2 border-neutral-900 text-neutral-900 font-medium hover:bg-neutral-50 transition-colors rounded">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
