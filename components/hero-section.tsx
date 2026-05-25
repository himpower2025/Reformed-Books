import { BookFlip } from '@/components/book-flip'

export function HeroSection() {
  return (
    <>
      {/* Interactive Book Flip Section */}
      <BookFlip />

      {/* Featured This Month Section */}
      <section className="py-20 md:py-32 bg-background border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-xs uppercase tracking-widest font-medium text-accent">Curated Selection</span>
              <div className="flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured This Month
            </h2>
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              Handpicked works that showcase the breadth and depth of reformed theological thought
            </p>
          </div>

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
      </section>
    </>
  )
}
