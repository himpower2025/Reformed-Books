'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { eventsData, EventItem } from '@/lib/db-data'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Sparkles, Tag, Check, ArrowRight, Bell, Gift, BookOpen, Share2 } from 'lucide-react'

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null)
  const [rsvpSuccess, setRsvpSuccess] = useState<boolean>(false)
  const [rsvpEmail, setRsvpEmail] = useState<string>('')

  const categories = [
    { key: 'all', label: 'All Events' },
    { key: 'special-sale', label: 'Special Sales & Bundles' },
    { key: 'book-release', label: 'Release Ceremonies' },
    { key: 'symposium', label: 'Exhibitions & Fairs' }
  ]

  const filteredEvents = eventsData.filter(event => {
    if (selectedCategory === 'all') return true
    return event.category === selectedCategory
  })

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!rsvpEmail) return
    setRsvpSuccess(true)
    setTimeout(() => {
      setRsvpSuccess(false)
      setActiveModalEvent(null)
      setRsvpEmail('')
    }, 2500)
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Hero Header Banner */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-amber-500/20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="mx-auto max-w-[1280px] px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-amber-300 bg-amber-400/10 border border-amber-400/20 px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              Reformed Books House Special Events
            </span>
            
            <h1 className="font-serif text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
              Special Publisher Events & Promotions
            </h1>
            
            <p className="text-amber-100/80 max-w-2xl mx-auto font-serif text-base leading-relaxed">
              Explore our special book sales, hardcover launch ceremonies, author symposia, and exclusive limited edition press offers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Container */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16 border-b border-border/60 pb-8">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-white hover:bg-secondary text-foreground/80 border border-border/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-12">
            <AnimatePresence mode="wait">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-3xl border border-border/70 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
                >
                  {/* Event Image */}
                  <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[420px] bg-slate-900">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md text-white ${
                        event.status === 'ONGOING' ? 'bg-emerald-600' : 'bg-primary'
                      }`}>
                        {event.status === 'ONGOING' ? '🔥 NOW ONGOING' : '🗓️ UPCOMING'}
                      </span>
                      {event.discountRate && (
                        <span className="text-xs font-black bg-amber-500 text-slate-950 px-3 py-1 rounded-full shadow-md font-mono">
                          SPECIAL OFFER {event.discountRate}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-serif mb-3">
                        <span className="text-primary font-bold uppercase tracking-wider bg-primary/10 px-2.5 py-0.5 rounded-md">
                          {event.categoryLabel}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-accent" /> {event.date}
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl md:text-3xl font-black text-foreground mb-2 leading-tight">
                        {event.title}
                      </h2>
                      
                      <p className="text-sm font-serif font-semibold text-primary mb-4">
                        {event.subtitle}
                      </p>

                      <p className="text-xs md:text-sm text-muted-foreground font-serif leading-relaxed mb-6">
                        {event.description}
                      </p>

                      {/* Event Meta info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-secondary/30 border border-border/40 text-xs">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary shrink-0" />
                          <div>
                            <span className="text-[10px] text-muted-foreground block font-mono">TIME</span>
                            <span className="font-bold">{event.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent shrink-0" />
                          <div>
                            <span className="text-[10px] text-muted-foreground block font-mono">LOCATION</span>
                            <span className="font-bold">{event.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2 mb-8">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground">Event Highlights:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {event.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/50">
                      <button
                        onClick={() => setActiveModalEvent(event)}
                        className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-serif text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
                      >
                        <Bell className="w-4 h-4" />
                        <span>RSVP & Event Info</span>
                      </button>

                      {event.category === 'special-sale' && (
                        <Link
                          href="/books/all"
                          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-serif text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
                        >
                          <Gift className="w-4 h-4" />
                          <span>Shop Special Bundles</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Interactive RSVP Modal */}
      <AnimatePresence>
        {activeModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 border border-border shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setActiveModalEvent(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-foreground font-bold text-lg"
              >
                ✕
              </button>

              <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full inline-block mb-3">
                {activeModalEvent.badge}
              </span>

              <h3 className="font-serif text-2xl font-black text-foreground mb-2">
                {activeModalEvent.title}
              </h3>

              <p className="text-xs text-muted-foreground font-serif mb-6">
                {activeModalEvent.date} • {activeModalEvent.location}
              </p>

              {rsvpSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center my-4">
                  <Check className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-serif font-bold text-emerald-900 text-lg">RSVP Confirmed!</h4>
                  <p className="text-xs text-emerald-700 mt-1">We have sent a confirmation and calendar invitation to {rsvpEmail}.</p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-foreground mb-1.5">
                      Enter Email Address for Registration & Exclusive Vouchers:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@domain.com"
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-xs font-serif text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary text-primary-foreground font-serif text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-all shadow-md"
                  >
                    Confirm RSVP / Request Special Discount Link
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
