'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, MapPin, BookOpen, Sparkles, Check, FileText, ExternalLink } from 'lucide-react'

interface PopupConfig {
  isActive: boolean
  mode: 'standard' | 'banner' | 'custom'
  standard: {
    title: string
    subtitle: string
    description: string
    date: string
    scheduleNote: string
    venue: string
    venueNote: string
    buttonText: string
    buttonLink: string
  }
  banner: {
    imageUrl: string
    actionUrl: string
    isPdfPlaceholder: boolean
    pdfName: string
  }
  custom: {
    html: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

const DEFAULT_CONFIG: PopupConfig = {
  isActive: true,
  mode: 'standard',
  standard: {
    title: "Writer's Workshop",
    subtitle: "Presented by Reformed Books House",
    description: "\"Unleash your voice, refine your craft, and explore theological depth in writing under the guidance of seasoned editors.\"",
    date: "Aug 2 (Sun) – Aug 4 (Tue), 2026",
    scheduleNote: "3-Day Intensive Program",
    venue: "Happy Tree Cafe",
    venueNote: "Main Conference Hall",
    buttonText: "RSVP & Secure Your Spot",
    buttonLink: "#"
  },
  banner: {
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop", 
    actionUrl: "#",
    isPdfPlaceholder: false,
    pdfName: ""
  },
  custom: {
    html: `<div style="text-align: center; padding: 24px; font-family: 'Playfair Display', serif;">
  <h3 style="color: #0f4c81; font-size: 26px; font-weight: bold; margin-bottom: 8px;">Exclusive Literary Gala</h3>
  <p style="font-size: 14px; color: #555; line-height: 1.6; max-width: 320px; margin: 0 auto 16px;">
    An evening of deep conversations, theological inquiries, and exceptional book reveals.
  </p>
  <div style="background: #fdfbf7; border: 1px dashed #ebdcc5; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
    <strong style="color: #1c2e4a; font-size: 13px;">RSVP Required • Limited Space</strong>
  </div>
</div>`,
    backgroundColor: "#faf8f5",
    textColor: "#1c2e4a",
    accentColor: "#0f4c81"
  }
}

export function EventPopup() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [dontShowToday, setDontShowToday] = useState(false)
  const [config, setConfig] = useState<PopupConfig>(DEFAULT_CONFIG)

  // Fetch / Sync config
  const loadConfig = () => {
    const stored = localStorage.getItem('reformed_books_popup_config')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setConfig({
          ...DEFAULT_CONFIG,
          ...parsed,
          standard: { ...DEFAULT_CONFIG.standard, ...parsed.standard },
          banner: { ...DEFAULT_CONFIG.banner, ...parsed.banner },
          custom: { ...DEFAULT_CONFIG.custom, ...parsed.custom },
        })
        return parsed.isActive !== undefined ? parsed.isActive : true
      } catch (e) {
        console.error(e)
      }
    }
    return true
  }

  useEffect(() => {
    setMounted(true)
    const active = loadConfig()

    // Listen to live changes from the admin console
    const handleConfigChange = (e: Event) => {
      const customEvent = e as CustomEvent<PopupConfig>
      if (customEvent.detail) {
        setConfig(customEvent.detail)
      }
    }

    const handleForcePreview = () => {
      setIsOpen(true)
    }

    window.addEventListener('reformed_books_popup_config_changed', handleConfigChange)
    window.addEventListener('reformed_books_popup_force_preview', handleForcePreview)

    // Check if user set "Do not show today" block
    const hideUntil = localStorage.getItem('reformed_books_popup_hide_until')
    if (hideUntil) {
      const expiryTime = parseInt(hideUntil, 10)
      if (Date.now() < expiryTime) {
        setIsOpen(false)
        return () => {
          window.removeEventListener('reformed_books_popup_config_changed', handleConfigChange)
          window.removeEventListener('reformed_books_popup_force_preview', handleForcePreview)
        }
      } else {
        localStorage.removeItem('reformed_books_popup_hide_until')
      }
    }

    // Only auto-open if globally active
    if (active) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1000)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('reformed_books_popup_config_changed', handleConfigChange)
        window.removeEventListener('reformed_books_popup_force_preview', handleForcePreview)
      }
    }

    return () => {
      window.removeEventListener('reformed_books_popup_config_changed', handleConfigChange)
      window.removeEventListener('reformed_books_popup_force_preview', handleForcePreview)
    }
  }, [])

  if (!mounted || !isOpen || !config.isActive) return null

  const handleClose = () => {
    if (dontShowToday) {
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

  const handleAction = (url: string) => {
    alert(`Redirecting to registration/action: ${url}`)
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in overflow-hidden">
      {/* Popup card container */}
      <div 
        id="event-popup-container"
        className="relative w-full max-w-[440px] max-h-[88vh] bg-[#faf8f5] rounded-2xl overflow-hidden border border-[#e8e2d5] shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col my-auto"
        style={config.mode === 'custom' ? { backgroundColor: config.custom.backgroundColor } : {}}
      >
        {/* Top Accent Bar */}
        <div className="h-1.5 shrink-0 z-20" style={{ backgroundColor: config.mode === 'custom' ? config.custom.accentColor : '#0f4c81' }} />

        {/* Top-Right Close Button (X) */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 text-neutral-700 hover:text-neutral-900 transition-all z-30 flex items-center justify-center border border-black/10 shadow-sm"
          aria-label="Close popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Popup Content Body */}
        <div className="overflow-y-auto flex-1 flex flex-col">

        {/* RENDER MODE 1: STANDARD EVENT LAYOUT */}
        {config.mode === 'standard' && (
          <>
            {/* Elegant Card Header */}
            <div className="relative pt-10 pb-8 px-6 text-center bg-gradient-to-b from-[#f3ede2] to-[#faf8f5] border-b border-[#ebdcc5]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-[#0f4c81]/10 text-[#0f4c81] text-[11px] font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Special Announcement
              </div>
              
              <h4 className="font-serif text-3xl font-bold tracking-tight text-[#1c2e4a] leading-tight">
                {config.standard.title}
              </h4>
              
              <p className="mt-2 text-xs font-mono tracking-wider text-neutral-500 uppercase">
                {config.standard.subtitle}
              </p>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-5 flex-1 overflow-y-auto">
              {config.standard.description && (
                <p className="text-sm text-neutral-600 leading-relaxed text-center italic font-serif">
                  {config.standard.description}
                </p>
              )}

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
                      {config.standard.date}
                    </span>
                    {config.standard.scheduleNote && (
                      <span className="block text-[11px] text-neutral-500">{config.standard.scheduleNote}</span>
                    )}
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
                      {config.standard.venue}
                    </span>
                    {config.standard.venueNote && (
                      <span className="block text-[11px] text-neutral-500">{config.standard.venueNote}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Call To Action Button */}
              <button
                onClick={() => handleAction(config.standard.buttonLink)}
                className="w-full py-3 px-4 bg-[#0f4c81] hover:bg-[#073256] text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer font-serif"
              >
                <BookOpen className="w-4 h-4" />
                {config.standard.buttonText}
              </button>
            </div>
          </>
        )}

        {/* RENDER MODE 2: IMAGE / PDF BANNER */}
        {config.mode === 'banner' && (
          <div className="flex-1 flex flex-col">
            {config.banner.isPdfPlaceholder ? (
              /* High-fidelity custom cover preview for uploaded PDF files */
              <div 
                className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#f3ede2] to-white cursor-pointer group hover:opacity-95 transition-opacity"
                onClick={() => handleAction(config.banner.actionUrl)}
              >
                <div className="relative h-44 w-32 bg-[#faf8f5] rounded-md shadow-xl border border-neutral-300 flex flex-col justify-between p-3.5 mb-6 group-hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-1.5">
                    <span className="text-[9px] font-bold text-[#0f4c81] uppercase tracking-wider">REFORMED</span>
                    <FileText className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="my-auto flex flex-col items-center gap-1">
                    <span className="text-[11px] font-serif font-bold text-neutral-800 leading-tight line-clamp-3">
                      {config.banner.pdfName || "Workshop Flyer"}
                    </span>
                    <span className="text-[8px] text-muted-foreground uppercase tracking-widest mt-1">OFFICIAL DOCUMENT</span>
                  </div>
                  <div className="pt-1.5 border-t border-neutral-200 flex items-center justify-between">
                    <span className="text-[7px] text-neutral-400">PDF flyer v1.0</span>
                    <ExternalLink className="w-2.5 h-2.5 text-neutral-400" />
                  </div>
                </div>
                
                <h4 className="font-serif text-xl font-bold text-[#1c2e4a] mb-1">
                  {config.banner.pdfName || "Writer's Workshop Event PDF"}
                </h4>
                <p className="text-xs text-neutral-500 mb-5 max-w-[280px]">
                  Click to open, review, or print this document attachment.
                </p>
                
                <button className="py-2.5 px-5 bg-[#0f4c81] text-white text-xs font-semibold rounded-lg shadow flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  Download Flyer PDF
                </button>
              </div>
            ) : (
              /* Regular custom design image poster view */
              <div 
                className="relative cursor-pointer group overflow-hidden flex-1 aspect-[4/5] bg-neutral-100"
                onClick={() => handleAction(config.banner.actionUrl)}
              >
                <img 
                  src={config.banner.imageUrl} 
                  alt="Special Event Flyer" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop"
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                
                {/* Floating helpful action hint */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider uppercase text-neutral-800 flex items-center gap-1 shadow">
                  <ExternalLink className="w-3 h-3" />
                  View Details
                </div>
              </div>
            )}
          </div>
        )}

        {/* RENDER MODE 3: CUSTOM HTML */}
        {config.mode === 'custom' && (
          <div 
            className="p-6 flex-1 overflow-y-auto leading-relaxed"
            style={{ color: config.custom.textColor }}
            dangerouslySetInnerHTML={{ __html: config.custom.html }}
          />
        )}
        </div>

        {/* Footer with "Do not show today" & "Close" options */}
        <div className="px-6 py-4 bg-[#f3ede2]/60 border-t border-[#e8e2d5] flex items-center justify-between shrink-0">
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
              }`}
              style={dontShowToday && config.mode === 'custom' ? { backgroundColor: config.custom.accentColor, borderColor: config.custom.accentColor } : {}}
              >
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
