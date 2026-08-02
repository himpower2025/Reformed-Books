'use client'

import { useState, useEffect } from 'react'
import { 
  X, Save, Eye, Layout, Image as ImageIcon, Code, 
  Settings, Check, Upload, AlertCircle, RefreshCw, FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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

interface AdminPopupManagerProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminPopupManager({ isOpen, onClose }: AdminPopupManagerProps) {
  const [config, setConfig] = useState<PopupConfig>(DEFAULT_CONFIG)
  const [activeTab, setActiveTab] = useState<'general' | 'standard' | 'banner' | 'custom'>('general')
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploadError, setUploadError] = useState('')

  // Load configuration from local storage on mount
  useEffect(() => {
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
      } catch (e) {
        console.error("Failed to parse stored popup config", e)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSave = () => {
    localStorage.setItem('reformed_books_popup_config', JSON.stringify(config))
    
    // Dispatch a custom event so the main EventPopup component updates instantly
    window.dispatchEvent(new CustomEvent('reformed_books_popup_config_changed', { detail: config }))
    
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  const resetToDefault = () => {
    if (window.confirm("Are you sure you want to reset all popup settings to default?")) {
      setConfig(DEFAULT_CONFIG)
    }
  }

  // Handle Mock Image/PDF drop or upload
  const handleFileUpload = (file: File) => {
    setUploadError('')
    if (!file) return

    // If it's a PDF, we'll create a stylized PDF cover placeholder or convert it if it's an image
    if (file.type === 'application/pdf') {
      const reader = new FileReader()
      reader.onload = () => {
        setConfig(prev => ({
          ...prev,
          banner: {
            ...prev.banner,
            imageUrl: "pdf-cover", // Key to trigger specialized PDF visualizer
            isPdfPlaceholder: true,
            pdfName: file.name
          }
        }))
      }
      reader.readAsDataURL(file)
    } else if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          setConfig(prev => ({
            ...prev,
            banner: {
              ...prev.banner,
              imageUrl: e.target!.result as string,
              isPdfPlaceholder: false,
              pdfName: ""
            }
          }))
        }
      }
      reader.readAsDataURL(file)
    } else {
      setUploadError('Please upload a valid Image file (PNG/JPG) or a PDF document.')
    }
  }

  const triggerPreview = () => {
    // Clear standard "Do not show today" block so we can preview the updated modal instantly
    localStorage.removeItem('reformed_books_popup_hide_until')
    handleSave()
    window.dispatchEvent(new CustomEvent('reformed_books_popup_force_preview'))
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-[800px] h-[85vh] bg-background border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-secondary/30 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Settings className="h-5 w-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-foreground">Popup Management Terminal</h3>
              <p className="text-xs text-muted-foreground">Configure global popup notices, events, or document uploads</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Outer content container - 2 columns layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Navigation Sidebar */}
          <div className="w-56 border-r border-border bg-secondary/10 p-4 space-y-1.5 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-3">
                Configuration Tabs
              </span>
              
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'general' 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                }`}
              >
                <Settings className="w-4 h-4" />
                General Settings
              </button>

              <button
                onClick={() => setActiveTab('standard')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'standard' 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                }`}
              >
                <Layout className="w-4 h-4" />
                1. Standard Event Form
              </button>

              <button
                onClick={() => setActiveTab('banner')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'banner' 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                2. Image / PDF Banner
              </button>

              <button
                onClick={() => setActiveTab('custom')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'custom' 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                }`}
              >
                <Code className="w-4 h-4" />
                3. Custom Design / HTML
              </button>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-border space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetToDefault}
                className="w-full text-xs font-serif text-destructive hover:bg-destructive/10"
              >
                Reset to Defaults
              </Button>
            </div>
          </div>

          {/* Right Column: Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background">
            
            {/* GENERAL SETTINGS TAB */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-1">Global Visibility Switch</h4>
                  <p className="text-xs text-muted-foreground">Toggle the popup visibility for all guests visiting the Reformed Books House website.</p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-secondary/15 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold block text-foreground">
                      {config.isActive ? "● POPUP ACTIVE" : "○ POPUP DISABLED"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {config.isActive 
                        ? "The popup is currently visible and will show to users unless they click 'Don't show today'." 
                        : "The popup is disabled and will not show on any pages."
                      }
                    </span>
                  </div>
                  <button
                    onClick={() => setConfig(prev => ({ ...prev, isActive: !prev.isActive }))}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      config.isActive ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out ${
                        config.isActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Select Active Rendering Mode</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Mode 1 */}
                    <button
                      onClick={() => setConfig(prev => ({ ...prev, mode: 'standard' }))}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        config.mode === 'standard' 
                          ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                          : 'border-border hover:border-accent hover:bg-secondary/10'
                      }`}
                    >
                      <Layout className="h-5 w-5 text-primary mb-2" />
                      <span className="text-xs font-bold block text-foreground">1. Standard Form</span>
                      <span className="text-[11px] text-muted-foreground block mt-0.5">Classic structured editor with dates & venue details</span>
                    </button>

                    {/* Mode 2 */}
                    <button
                      onClick={() => setConfig(prev => ({ ...prev, mode: 'banner' }))}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        config.mode === 'banner' 
                          ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                          : 'border-border hover:border-accent hover:bg-secondary/10'
                      }`}
                    >
                      <ImageIcon className="h-5 w-5 text-primary mb-2" />
                      <span className="text-xs font-bold block text-foreground">2. Image / PDF Banner</span>
                      <span className="text-[11px] text-muted-foreground block mt-0.5">Show a custom flyer, poster, or PDF placeholder</span>
                    </button>

                    {/* Mode 3 */}
                    <button
                      onClick={() => setConfig(prev => ({ ...prev, mode: 'custom' }))}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        config.mode === 'custom' 
                          ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                          : 'border-border hover:border-accent hover:bg-secondary/10'
                      }`}
                    >
                      <Code className="h-5 w-5 text-primary mb-2" />
                      <span className="text-xs font-bold block text-foreground">3. Custom HTML</span>
                      <span className="text-[11px] text-muted-foreground block mt-0.5">Use raw HTML elements & custom CSS design styles</span>
                    </button>

                  </div>
                </div>
              </div>
            )}

            {/* STANDARD FORM TAB */}
            {activeTab === 'standard' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-1">Standard Event Card Form</h4>
                  <p className="text-xs text-muted-foreground">Update individual fields to style the classic event workshop popover.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="std-title" className="text-xs font-semibold text-muted-foreground uppercase">Event Title</Label>
                    <Input 
                      id="std-title" 
                      value={config.standard.title}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        standard: { ...prev.standard, title: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="std-subtitle" className="text-xs font-semibold text-muted-foreground uppercase">Subtitle / Presenter</Label>
                    <Input 
                      id="std-subtitle" 
                      value={config.standard.subtitle}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        standard: { ...prev.standard, subtitle: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="std-desc" className="text-xs font-semibold text-muted-foreground uppercase">Event Catchphrase / Description</Label>
                  <textarea
                    id="std-desc"
                    rows={2}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={config.standard.description}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      standard: { ...prev.standard, description: e.target.value }
                    }))}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="std-date" className="text-xs font-semibold text-muted-foreground uppercase">Dates (e.g. Aug 2 - Aug 4)</Label>
                    <Input 
                      id="std-date" 
                      value={config.standard.date}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        standard: { ...prev.standard, date: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="std-schedule" className="text-xs font-semibold text-muted-foreground uppercase">Schedule Note (e.g. 3-Day Intensive)</Label>
                    <Input 
                      id="std-schedule" 
                      value={config.standard.scheduleNote}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        standard: { ...prev.standard, scheduleNote: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="std-venue" className="text-xs font-semibold text-muted-foreground uppercase">Venue / Place</Label>
                    <Input 
                      id="std-venue" 
                      value={config.standard.venue}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        standard: { ...prev.standard, venue: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="std-venuenote" className="text-xs font-semibold text-muted-foreground uppercase">Venue Note (e.g. Happy Tree Cafe)</Label>
                    <Input 
                      id="std-venuenote" 
                      value={config.standard.venueNote}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        standard: { ...prev.standard, venueNote: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="std-btntext" className="text-xs font-semibold text-muted-foreground uppercase">Button CTA Label</Label>
                    <Input 
                      id="std-btntext" 
                      value={config.standard.buttonText}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        standard: { ...prev.standard, buttonText: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="std-btnlink" className="text-xs font-semibold text-muted-foreground uppercase">Button Redirect Link / URL</Label>
                    <Input 
                      id="std-btnlink" 
                      value={config.standard.buttonLink}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        standard: { ...prev.standard, buttonLink: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* BANNER / UPLOAD TAB */}
            {activeTab === 'banner' && (
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-1">Banner Poster &amp; PDF Uploader</h4>
                  <p className="text-xs text-muted-foreground">Upload your pre-designed workshop flyer or drop a PDF document to act as the popup flyer.</p>
                </div>

                {/* File Dropzone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDragOver(false)
                    if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0])
                  }}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    dragOver 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50 hover:bg-secondary/10'
                  }`}
                  onClick={() => document.getElementById('admin-file-picker')?.click()}
                >
                  <input
                    type="file"
                    id="admin-file-picker"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload(e.target.files[0])
                    }}
                  />
                  
                  {config.banner.isPdfPlaceholder ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-12 w-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mb-1 shadow-sm">
                        <FileText className="h-7 w-7" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{config.banner.pdfName || "Document.pdf"}</span>
                      <span className="text-xs text-muted-foreground">Successfully linked PDF as popup attachment placeholder!</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-1">
                        <Upload className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Drag &amp; Drop Flyer Image or PDF here</span>
                      <span className="text-xs text-muted-foreground">Supports JPG, PNG, WebP, or PDF files</span>
                    </div>
                  )}
                </div>

                {uploadError && (
                  <div className="p-3 text-xs bg-destructive/10 text-destructive border border-destructive/20 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {uploadError}
                  </div>
                )}

                {/* Preview Thumbnail / URL field */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="ban-url" className="text-xs font-semibold text-muted-foreground uppercase">Or Use Direct Image Link URL</Label>
                    <Input 
                      id="ban-url" 
                      value={config.banner.imageUrl}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        banner: { ...prev.banner, imageUrl: e.target.value, isPdfPlaceholder: false }
                      }))}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="ban-act" className="text-xs font-semibold text-muted-foreground uppercase">Click Action URL (Link to open when clicked)</Label>
                    <Input 
                      id="ban-act" 
                      value={config.banner.actionUrl}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        banner: { ...prev.banner, actionUrl: e.target.value }
                      }))}
                      placeholder="e.g. /books/all or external registration link"
                    />
                  </div>

                  {/* Aesthetic Banner Presets */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-muted-foreground block uppercase tracking-widest">Aesthetic Presets</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setConfig(prev => ({
                          ...prev,
                          banner: {
                            ...prev.banner,
                            imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop",
                            isPdfPlaceholder: false,
                            pdfName: ""
                          }
                        }))}
                        className="p-2 border border-border rounded text-xs hover:border-primary transition-all text-left truncate"
                      >
                        🪶 Classic Ink &amp; Quill
                      </button>
                      <button
                        onClick={() => setConfig(prev => ({
                          ...prev,
                          banner: {
                            ...prev.banner,
                            imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop",
                            isPdfPlaceholder: false,
                            pdfName: ""
                          }
                        }))}
                        className="p-2 border border-border rounded text-xs hover:border-primary transition-all text-left truncate"
                      >
                        📚 Academic Books Library
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CUSTOM HTML TAB */}
            {activeTab === 'custom' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-1">Custom Design &amp; HTML Markup</h4>
                  <p className="text-xs text-muted-foreground">Draft your customized design. You can modify background colors, text layouts, and embed code.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="cust-bg" className="text-xs font-semibold text-muted-foreground uppercase">Background Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="cust-bg" 
                        value={config.custom.backgroundColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          custom: { ...prev.custom, backgroundColor: e.target.value }
                        }))}
                      />
                      <input 
                        type="color" 
                        value={config.custom.backgroundColor.startsWith('#') ? config.custom.backgroundColor : '#faf8f5'} 
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          custom: { ...prev.custom, backgroundColor: e.target.value }
                        }))}
                        className="w-10 h-10 p-0 border border-border rounded cursor-pointer shrink-0"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="cust-text" className="text-xs font-semibold text-muted-foreground uppercase">Text Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="cust-text" 
                        value={config.custom.textColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          custom: { ...prev.custom, textColor: e.target.value }
                        }))}
                      />
                      <input 
                        type="color" 
                        value={config.custom.textColor.startsWith('#') ? config.custom.textColor : '#1c2e4a'} 
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          custom: { ...prev.custom, textColor: e.target.value }
                        }))}
                        className="w-10 h-10 p-0 border border-border rounded cursor-pointer shrink-0"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="cust-accent" className="text-xs font-semibold text-muted-foreground uppercase">Accent Accent Highlight</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="cust-accent" 
                        value={config.custom.accentColor}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          custom: { ...prev.custom, accentColor: e.target.value }
                        }))}
                      />
                      <input 
                        type="color" 
                        value={config.custom.accentColor.startsWith('#') ? config.custom.accentColor : '#0f4c81'} 
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          custom: { ...prev.custom, accentColor: e.target.value }
                        }))}
                        className="w-10 h-10 p-0 border border-border rounded cursor-pointer shrink-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cust-html" className="text-xs font-semibold text-muted-foreground uppercase">Custom HTML Content Body</Label>
                  <textarea
                    id="cust-html"
                    rows={8}
                    className="w-full rounded-md border border-input bg-background p-3 text-xs font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-neutral-900 text-green-400"
                    value={config.custom.html}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      custom: { ...prev.custom, html: e.target.value }
                    }))}
                  />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-border bg-secondary/20 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={triggerPreview}
            className="text-xs font-serif flex items-center gap-2 hover:bg-secondary/40"
          >
            <Eye className="w-4 h-4 text-[#0f4c81]" />
            Save &amp; Instantly Preview Popup
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="text-xs font-serif flex items-center gap-2 shadow-md relative overflow-hidden"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  Saved Successfully!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Apply &amp; Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
