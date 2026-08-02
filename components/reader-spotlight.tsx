'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Mail, CheckCircle2, Sparkles, Quote, BookOpen, Heart } from 'lucide-react'

export function ReaderSpotlight() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
    }, 3000)
  }

  const testimonials = [
    {
      name: "Dr. Arthur Pendelton",
      role: "Professor of Systematic Theology",
      avatar: "👨‍🏫",
      quote: "Reformed Books House produces volumes that combine historical rigor with breathtaking typography and binding quality. Unmatched in modern Christian publishing.",
      rating: 5,
      book: "The Doctrine of God"
    },
    {
      name: "Rev. Rebecca Sterling",
      role: "Pastoral Counselor & Author",
      avatar: "👩‍💼",
      quote: "Finding high-quality reformed literature that speaks directly to modern cultural challenges used to be difficult. Reformed Books House does it with grace.",
      rating: 5,
      book: "Christ and Culture"
    },
    {
      name: "Marcus Vance",
      role: "Seminary Scholar & Reader",
      avatar: "🎓",
      quote: "The physical feel of the paper, the clear serif fonts, and the instant availability of digital EPUBs make reading an absolute delight.",
      rating: 5,
      book: "A Reformed Worldview"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden border-t border-border/40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-extrabold text-accent bg-accent/10 px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Voices from Our Community
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Loved by Scholars & Readers Worldwide
          </h2>
          <p className="text-muted-foreground text-base mt-3 font-serif">
            Read what our fellowship of readers, pastors, and scholars have to say about our publications.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="bg-white rounded-2xl p-8 border border-border/60 shadow-lg hover:shadow-2xl transition-all relative flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
              
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, r) => (
                    <Star key={r} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="font-serif text-foreground/90 leading-relaxed text-sm mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center gap-3">
                <span className="text-3xl p-2 bg-secondary rounded-full">{t.avatar}</span>
                <div>
                  <h4 className="font-serif font-bold text-sm text-foreground">{t.name}</h4>
                  <p className="text-[11px] text-muted-foreground font-sans">{t.role}</p>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mt-0.5">
                    📖 Reviewing: {t.book}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reader Circle Newsletter Subscription Card */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 md:p-14 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 text-amber-200 px-3 py-1 rounded-full inline-block mb-3">
                Join The Reformed Reader Circle
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-black tracking-tight mb-2">
                Receive Free Chapter Previews & Editorial Essays
              </h3>
              <p className="text-white/80 font-serif text-sm leading-relaxed max-w-xl">
                Subscribe to our monthly journal to get early publication announcements, exclusive discounts on hardcovers, and free downloadable PDF resources.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-300 mx-auto mb-2" />
                  <h4 className="font-serif text-xl font-bold">Welcome to the Reader Circle!</h4>
                  <p className="text-xs text-white/90 mt-1">Check your inbox for your complimentary PDF sample chapter.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white rounded-xl text-xs font-serif text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-inner"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-accent hover:bg-amber-500 text-accent-foreground font-serif text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>Subscribe to Reader Journal</span>
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
