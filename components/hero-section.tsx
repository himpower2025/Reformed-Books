import { BookCarouselLight } from '@/components/book-carousel-light'

export function HeroSection() {
  return (
    <>
      {/* Light Carousel Book Showcase */}
      <BookCarouselLight />

      {/* Featured This Month Section */}
      <section className="py-20 md:py-32 bg-background border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-16">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Reformed Theology",
                author: "Dr. James Mitchell",
                genre: "Sovereign Grace",
                color: "from-slate-900 to-slate-950 border-amber-500/20",
                textColor: "text-slate-100",
                accentColor: "text-amber-500",
                emblem: "🛡️"
              },
              {
                title: "Faith & Culture",
                author: "Rev. Sarah Williams",
                genre: "Christian Culture",
                color: "from-[#142d25] to-[#041a12] border-teal-500/20",
                textColor: "text-teal-50",
                accentColor: "text-teal-400",
                emblem: "🌿"
              },
              {
                title: "Biblical Worldview",
                author: "Dr. Michael Chen",
                genre: "Applied Apologetics",
                color: "from-rose-950 to-[#221015] border-rose-500/20",
                textColor: "text-rose-50",
                accentColor: "text-amber-400",
                emblem: "☀️"
              }
            ].map((book, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-sm mb-5 overflow-hidden relative shadow-md hover:shadow-2xl transition-all duration-500 border border-border/20">
                  {/* Beautiful CSS Book Cover */}
                  <div className={`w-full h-full bg-gradient-to-b ${book.color} p-8 flex flex-col justify-between items-center text-center relative group-hover:scale-105 transition-transform duration-500 ease-out`}>
                    {/* Spine crease shadow simulating a real book */}
                    <div className="absolute top-0 bottom-0 left-3 w-1.5 bg-black/15 shadow-inner pointer-events-none" />
                    <div className="absolute top-0 bottom-0 left-4 w-px bg-white/5 pointer-events-none" />
                    
                    {/* Top border decor */}
                    <div className="border border-white/10 w-full h-full absolute inset-3 rounded-[2px] pointer-events-none" />
                    <div className="border-2 border-white/5 w-full h-full absolute inset-4 rounded-[1px] pointer-events-none" />

                    {/* Book Metadata header */}
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 z-10 font-sans mt-3">
                      {book.genre}
                    </span>

                    {/* Title & Emblem */}
                    <div className="my-auto z-10">
                      <span className="text-3xl mb-4 block filter drop-shadow-md select-none">{book.emblem}</span>
                      <h3 className={`font-serif text-2xl lg:text-3xl font-bold tracking-tight px-2 leading-tight ${book.textColor}`}>
                        {book.title}
                      </h3>
                      <div className="w-12 h-px bg-white/20 mx-auto mt-4" />
                    </div>

                    {/* Author footer inside cover */}
                    <p className={`text-xs uppercase tracking-[0.15em] font-sans font-medium mb-3 ${book.textColor}/60 z-10`}>
                      {book.author}
                    </p>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
