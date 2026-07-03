'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, MapPin, BookOpen, Sparkles, Check } from 'lucide-react'

export function EventPopup() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [dontShowToday, setDontShowToday] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check if "Do not show today" is active in localStorage
    const hideUntil = localStorage.getItem('reformed_books_popup_hide_until')
    if (hideUntil) {
      const expiryTime = parseInt(hideUntil, 10)
      if (Date.now() < expiryTime) {
        setIsOpen(false)
        return
      } else {
        localStorage.removeItem('reformed_books_popup_hide_until')
      }
    }
    
    // Show popup with a tiny delay for high-quality entry feel
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])

  if (!mounted || !isOpen) return null

  const handleClose = () => {
    if (dontShowToday) {
      // Calculate midnight of today (end of the day)
      const now = new Date()
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
        999
      )
      localStorage.setItem('reformed_books_popup_hide_until', midnight.getTime().toString())
    }
    setIsOpen(false)
  }

  const handleAction = () => {
    // Elegant toast or simple registration confirmation
    alert("Thank you for your interest in the Writer's Workshop! Detailed registration information has been prepared.")
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      {/* Popup card container */}
      <div 
        id="event-popup-container"
        className="relative w-full max-w-[420px] bg-[#faf8f5] rounded-xl overflow-hidden border border-[#e8e2d5] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Accent Bar */}
        <div className="h-1.5 bg-[#0f4c81]" />

        {/* Top-Right Close Button (X) */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-black/5 hover:bg-black/10 text-neutral-600 hover:text-neutral-900 transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Elegant Card Header */}
        <div className="relative pt-10 pb-8 px-6 text-center bg-gradient-to-b from-[#f3ede2] to-[#faf8f5] border-b border-[#ebdcc5]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-[#0f4c81]/10 text-[#0f4c81] text-[11px] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Special Event
          </div>
          
          <h4 className="font-serif text-3xl font-bold tracking-tight text-[#1c2e4a] leading-tight">
            Writer's Workshop
          </h4>
          
          <p className="mt-2 text-xs font-mono tracking-wider text-neutral-500 uppercase">
            Presented by Reformed Books
          </p>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-5">
          {/* Brief Event Description */}
          <p className="text-sm text-neutral-600 leading-relaxed text-center italic font-serif">
            "Unleash your voice, refine your craft, and explore theological depth in writing under the guidance of seasoned editors."
          </p>

          {/* Event Details Grid */}
          <div className="bg-white p-4 rounded-lg border border-[#ebdcc5]/40 space-y-3.5 shadow-sm">
            {/* Date Detail */}
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded bg-amber-50 text-amber-700 mt-0.5">
                <Calendar className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="block text-xs text-neutral-400 uppercase tracking-wider font-semibold">Date &amp; Schedule</span>
                <span className="text-sm font-medium text-neutral-800">
                  Aug 2 (Sun) – Aug 4 (Tue), 2026
                </span>
                <span className="block text-[11px] text-neutral-500">3-Day Intensive Program</span>
              </div>
            </div>

            {/* Location Detail */}
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded bg-blue-50 text-blue-700 mt-0.5">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="block text-xs text-neutral-400 uppercase tracking-wider font-semibold">Venue</span>
                <span className="text-sm font-medium text-neutral-800">
                  Happy Tree Cafe
                </span>
                <span className="block text-[11px] text-neutral-500">Main Conference Hall</span>
              </div>
            </div>
          </div>

          {/* Call To Action Button */}
          <button
            onClick={handleAction}
            className="w-full py-3 px-4 bg-[#0f4c81] hover:bg-[#073256] text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            RSVP &amp; Secure Your Spot
          </button>
        </div>

        {/* Footer with "Do not show today" & "Close" options */}
        <div className="px-6 py-4 bg-[#f3ede2]/60 border-t border-[#e8e2d5] flex items-center justify-between">
          {/* Custom Checkbox for Do not show today */}
          <label className="flex items-center gap-2 cursor-pointer select-none group">
            <div className="relative">
              <input
                type="checkbox"
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                dontShowToday 
                  ? 'bg-[#0f4c81] border-[#0f4c81] text-white' 
                  : 'bg-white border-neutral-300 group-hover:border-neutral-400'
              }`}>
                {dontShowToday && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
            <span className="text-xs text-neutral-500 group-hover:text-neutral-700 transition-colors font-medium">
              Don't show this again today
            </span>
          </label>

          {/* Simple Close Button */}
          <button
            onClick={handleClose}
            className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
