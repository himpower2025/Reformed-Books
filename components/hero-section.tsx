export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-32 md:py-40 lg:py-48">
      {/* Decorative gradient line */}
      <div className="absolute top-32 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <span className="inline-block text-xs uppercase tracking-widest font-medium text-accent mb-4">Since 2020</span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4">
              Where Faith Meets <span className="text-accent">Wisdom</span>
            </h1>
          </div>
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-12 leading-relaxed font-light">
            Discover transformative works on reformed theology, faith, and worldview. We publish books that challenge, inspire, and deepen your understanding of Christianity in the modern world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium hover:bg-opacity-90 transition-all duration-300 rounded-sm hover:shadow-lg group">
              <span className="uppercase tracking-wide text-sm font-medium">Explore Collection</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground font-medium hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 rounded-sm">
              <span className="uppercase tracking-wide text-sm font-medium">Learn Our Story</span>
            </button>
          </div>
        </div>

        {/* Featured Section Hint */}
        <div className="mt-20 pt-12 border-t border-border">
          <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-8">Featured This Month</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 rounded-sm mb-4 overflow-hidden relative">
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="font-serif text-sm text-foreground group-hover:text-accent transition-colors">Featured Book {i}</h3>
                <p className="text-xs text-muted-foreground mt-1">Author Name</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
