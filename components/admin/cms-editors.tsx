'use client'

import React, { useState, useEffect } from 'react'
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Upload,
  Check,
  Sparkles,
  BookOpen,
  FileText,
  Calendar,
  BellRing,
  Quote,
  Download,
  RotateCcw,
  Eye,
  X,
  Star,
  AlertTriangle
} from 'lucide-react'
import {
  SiteContent,
  FeaturedCarouselBook,
  MonthlySpotlightBook,
  ManagedBook,
  TestimonialItem,
  CAROUSEL_THEMES,
  MONTHLY_THEMES,
  CarouselThemeId,
  MonthlyThemeId,
  EmblemType,
  DEFAULT_SITE_CONTENT,
  compressImageFile
} from '@/lib/site-content'
import { Article, EventItem } from '@/lib/db-data'

interface EditorProps {
  content: SiteContent
  onSave: (next: SiteContent, successMsg: string) => Promise<void>
  isSaving: boolean
}

// Shared helper for uploading a compressed cover image
function ImageField({
  label,
  value,
  onChange,
  helperText
}: {
  label: string
  value: string
  onChange: (url: string) => void
  helperText?: string
}) {
  const [uploading, setUploading] = useState(false)
  const [uploadErr, setUploadErr] = useState('')

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadErr('')
    try {
      const dataUrl = await compressImageFile(file, 720, 0.82)
      onChange(dataUrl)
    } catch (err: any) {
      setUploadErr(err?.message || 'Unable to process image file.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-serif font-bold text-slate-700">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row gap-3 items-start">
        <div className="w-20 h-24 rounded-xl border border-slate-200 bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] text-slate-400 font-sans text-center px-1">No Image</span>
          )}
        </div>
        <div className="flex-1 w-full space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL (https://...) or upload a file below"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
          />
          <div className="flex flex-wrap items-center gap-2">
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-serif font-bold rounded-lg transition-colors">
              <Upload className="w-3.5 h-3.5 text-amber-300" />
              <span>{uploading ? 'Processing Image...' : 'Upload Image from Computer'}</span>
              <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </label>
            {helperText && <span className="text-[11px] text-slate-500">{helperText}</span>}
          </div>
          {uploadErr && <p className="text-[11px] text-rose-600">{uploadErr}</p>}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// 1. FEATURED BOOKS (3D CAROUSEL) EDITOR
// ============================================================================
export function FeaturedBooksEditor({ content, onSave, isSaving }: EditorProps) {
  const [editingItem, setEditingItem] = useState<FeaturedCarouselBook | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [eyebrow, setEyebrow] = useState(content.homeSections.featuredBooksEyebrow)
  const [heading, setHeading] = useState(content.homeSections.featuredBooksHeading)
  const [warningMsg, setWarningMsg] = useState('')

  useEffect(() => {
    setEyebrow(content.homeSections.featuredBooksEyebrow)
    setHeading(content.homeSections.featuredBooksHeading)
  }, [content.updatedAt, content.homeSections.featuredBooksEyebrow, content.homeSections.featuredBooksHeading])

  const list = content.featuredBooks

  const handleOpenNew = () => {
    setWarningMsg('')
    setIsNew(true)
    setEditingItem({
      id: `fb-${Date.now()}`,
      title: '',
      subtitle: '',
      description: '',
      author: '',
      genre: 'Reformed Theology',
      themeId: 'emerald',
      emblemType: 'shield',
      paperPageNum: 24,
      linkUrl: '/books/all'
    })
  }

  const handleSaveHeading = async (e: React.FormEvent) => {
    e.preventDefault()
    setWarningMsg('')
    await onSave(
      {
        ...content,
        homeSections: {
          ...content.homeSections,
          featuredBooksEyebrow: eyebrow,
          featuredBooksHeading: heading
        }
      },
      'Featured Books section title saved and published!'
    )
  }

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return
    setWarningMsg('')
    const nextList = isNew
      ? [...list, editingItem]
      : list.map((b) => (b.id === editingItem.id ? editingItem : b))

    await onSave(
      { ...content, featuredBooks: nextList },
      isNew ? `"${editingItem.title}" added to 3D Featured Books!` : `"${editingItem.title}" updated on homepage!`
    )
    setEditingItem(null)
  }

  const handleDelete = async (id: string, title: string) => {
    if (list.length <= 1) {
      setWarningMsg('At least 1 book must remain in the Featured Books 3D showcase.')
      return
    }
    setWarningMsg('')
    const nextList = list.filter((b) => b.id !== id)
    await onSave({ ...content, featuredBooks: nextList }, `Removed "${title}" from 3D Featured Books.`)
  }

  const handleMove = async (idx: number, dir: -1 | 1) => {
    const target = idx + dir
    if (target < 0 || target >= list.length) return
    const next = [...list]
    const temp = next[idx]
    next[idx] = next[target]
    next[target] = temp
    await onSave({ ...content, featuredBooks: next }, 'Featured Books display order updated.')
  }

  return (
    <div className="space-y-6">
      {/* Explanation Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold block mb-1">
            Homepage Top Showcase
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
            Featured Books (3D Page-Flip Showcase)
          </h3>
          <p className="text-xs text-slate-500 font-serif mt-1 max-w-2xl">
            Update the books shown in the interactive 3D leather-bound book display at the very top of your homepage. The website keeps its exact 3D page-turning design automatically.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-serif font-semibold flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Homepage</span>
          </a>
          <button
            type="button"
            onClick={handleOpenNew}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-serif font-bold flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Showcase Book</span>
          </button>
        </div>
      </div>

      {/* Section Heading Settings */}
      <form onSubmit={handleSaveHeading} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-end gap-4">
        <div className="flex-1 w-full">
          <label className="block text-xs font-serif font-bold text-slate-700 mb-1">Small Top Label</label>
          <input
            type="text"
            value={eyebrow}
            onChange={(e) => setEyebrow(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-xs font-serif font-bold text-slate-700 mb-1">Main Section Title</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-serif font-bold flex items-center gap-1.5 shrink-0"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Heading</span>
        </button>
      </form>

      {warningMsg && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{warningMsg}</span>
          </div>
          <button type="button" onClick={() => setWarningMsg('')} className="text-amber-700 hover:text-amber-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Books List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((book, idx) => {
          const theme = CAROUSEL_THEMES[book.themeId] || CAROUSEL_THEMES.emerald
          return (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex gap-4 justify-between items-start"
            >
              {/* Mini Cover Preview */}
              <div
                className="w-20 h-28 rounded-lg shrink-0 flex flex-col items-center justify-center p-2 text-center text-white shadow-md border border-amber-400/30"
                style={{ backgroundColor: theme.swatch }}
              >
                <span className="text-[8px] uppercase tracking-widest text-amber-200/80 mb-1 line-clamp-1">
                  {book.genre}
                </span>
                <span className="font-serif text-[11px] font-bold leading-tight line-clamp-3">
                  {book.title}
                </span>
              </div>

              {/* Info & Actions */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    Slide #{idx + 1}
                  </span>
                  <span className="text-[10px] font-serif text-slate-500 truncate">{book.genre}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-slate-900 truncate">{book.title}</h4>
                <p className="text-xs text-slate-500 font-serif truncate">by {book.author}</p>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">{book.description}</p>

                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <button
                    type="button"
                    onClick={() => { setIsNew(false); setEditingItem({ ...book }) }}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-serif font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(idx, -1)}
                    disabled={idx === 0}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg disabled:opacity-40"
                    title="Move earlier"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(idx, 1)}
                    disabled={idx === list.length - 1}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg disabled:opacity-40"
                    title="Move later"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(book.id, book.title)}
                    className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg ml-auto"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Edit / Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-hidden">
          <form
            onSubmit={handleSaveItem}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 shadow-2xl"
          >
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                  3D Book Showcase Editor
                </span>
                <h4 className="font-serif text-base font-bold">
                  {isNew ? 'Add New 3D Showcase Book' : `Edit: ${editingItem.title}`}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Book Title *</label>
                  <input
                    required
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="e.g. Reformed Theology"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Author Name *</label>
                  <input
                    required
                    type="text"
                    value={editingItem.author}
                    onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                    placeholder="e.g. Dr. James Mitchell"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={editingItem.subtitle}
                    onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                    placeholder="Short book subtitle"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Genre / Category Label</label>
                  <input
                    type="text"
                    value={editingItem.genre}
                    onChange={(e) => setEditingItem({ ...editingItem, genre: e.target.value })}
                    placeholder="e.g. Sovereign Grace"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-serif font-bold text-slate-700 mb-1">
                  Page Text &amp; Description (Shown inside the open 3D book &amp; info card) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 font-serif leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Link to Library Book Page</label>
                  <select
                    value={editingItem.linkUrl || '/books/all'}
                    onChange={(e) => setEditingItem({ ...editingItem, linkUrl: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="/books/all">All Catalog (/books/all)</option>
                    {content.books.map((b) => (
                      <option key={b.id} value={`/books/${b.id}`}>
                        Book: {b.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Sample Page Number</label>
                  <input
                    type="number"
                    value={editingItem.paperPageNum}
                    onChange={(e) => setEditingItem({ ...editingItem, paperPageNum: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Cover Color Swatches */}
              <div>
                <label className="block font-serif font-bold text-slate-700 mb-2">Cover Leather Color Theme</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(Object.keys(CAROUSEL_THEMES) as CarouselThemeId[]).map((tid) => {
                    const preset = CAROUSEL_THEMES[tid]
                    const active = editingItem.themeId === tid
                    return (
                      <button
                        key={tid}
                        type="button"
                        onClick={() => setEditingItem({ ...editingItem, themeId: tid })}
                        className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                          active ? 'border-slate-900 bg-slate-100 ring-2 ring-slate-900/20' : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full shrink-0 border border-black/20" style={{ backgroundColor: preset.swatch }} />
                        <span className="text-[11px] font-serif font-semibold truncate">{preset.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Gold Emblem Selector */}
              <div>
                <label className="block font-serif font-bold text-slate-700 mb-2">Cover Gold Emblem Icon</label>
                <div className="flex flex-wrap gap-2">
                  {(['shield', 'leaves', 'sunburst', 'star', 'lamp'] as EmblemType[]).map((emb) => (
                    <button
                      key={emb}
                      type="button"
                      onClick={() => setEditingItem({ ...editingItem, emblemType: emb })}
                      className={`px-3.5 py-1.5 rounded-xl border text-xs font-serif capitalize transition-all ${
                        editingItem.emblemType === emb
                          ? 'bg-slate-900 text-white border-slate-900 font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {emb}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-xs font-serif text-slate-600 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-serif font-bold rounded-xl shadow flex items-center gap-1.5"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>{isSaving ? 'Saving...' : 'Save & Publish Live'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// 2. FEATURED THIS MONTH & HOMEPAGE BANNERS EDITOR
// ============================================================================
export function MonthlySpotlightEditor({ content, onSave, isSaving }: EditorProps) {
  const [editingCard, setEditingCard] = useState<MonthlySpotlightBook | null>(null)
  const [isNewCard, setIsNewCard] = useState(false)
  const [sections, setSections] = useState(content.homeSections)
  const [warningMsg, setWarningMsg] = useState('')

  useEffect(() => {
    setSections(content.homeSections)
  }, [content.updatedAt, content.homeSections])

  const handleSaveSections = async (e: React.FormEvent) => {
    e.preventDefault()
    setWarningMsg('')
    await onSave(
      { ...content, homeSections: sections },
      'Homepage banners, stats, and manifesto updated live!'
    )
  }

  const handleSaveCard = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCard) return
    setWarningMsg('')
    const nextCards = isNewCard
      ? [...content.featuredThisMonth, editingCard]
      : content.featuredThisMonth.map((c) => (c.id === editingCard.id ? editingCard : c))

    await onSave(
      { ...content, featuredThisMonth: nextCards },
      `"${editingCard.title}" saved in Featured This Month!`
    )
    setEditingCard(null)
  }

  const handleDeleteCard = async (id: string, title: string) => {
    if (content.featuredThisMonth.length <= 1) {
      setWarningMsg('Keep at least 1 card in Featured This Month.')
      return
    }
    setWarningMsg('')
    const nextCards = content.featuredThisMonth.filter((c) => c.id !== id)
    await onSave({ ...content, featuredThisMonth: nextCards }, `Removed "${title}" from Featured This Month.`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold block mb-1">
            Monthly Highlights &amp; Homepage Text
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
            Featured This Month &amp; Homepage Ribbons
          </h3>
          <p className="text-xs text-slate-500 font-serif mt-1 max-w-2xl">
            Manage the 3 colorful monthly spotlight cards, the top announcement bar, publisher statistics, and manifesto quote.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsNewCard(true)
            setEditingCard({
              id: `ftm-${Date.now()}`,
              linkedBookId: content.books[0]?.id || '1',
              title: '',
              author: '',
              genre: 'Featured Pick',
              themeId: 'sapphire',
              emblem: '📖'
            })
          }}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-serif font-bold flex items-center gap-1.5 shadow shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add Monthly Card</span>
        </button>
      </div>

      {warningMsg && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{warningMsg}</span>
          </div>
          <button type="button" onClick={() => setWarningMsg('')} className="text-amber-700 hover:text-amber-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Monthly Spotlight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {content.featuredThisMonth.map((card) => {
          const theme = MONTHLY_THEMES[card.themeId] || MONTHLY_THEMES.sapphire
          return (
            <div key={card.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between gap-4">
              <div
                className="aspect-[4/3] rounded-xl p-5 text-white flex flex-col justify-between items-center text-center shadow-inner"
                style={{ backgroundColor: theme.swatch }}
              >
                <span className="text-[10px] uppercase tracking-widest text-white/80 font-bold">{card.genre}</span>
                <div>
                  <div className="text-3xl mb-2">{card.emblem}</div>
                  <h4 className="font-serif text-lg font-bold leading-tight">{card.title}</h4>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-white/85 font-semibold">by {card.author}</span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => { setIsNewCard(false); setEditingCard({ ...card }) }}
                  className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-serif font-bold flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Spotlight Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCard(card.id, card.title)}
                  className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl"
                  title="Remove Card"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Homepage Texts, Top Bar, Stats & Manifesto */}
      <form onSubmit={handleSaveSections} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h4 className="font-serif text-base font-bold text-slate-900">Homepage Section Texts &amp; Top Announcement Bar</h4>
          <p className="text-xs text-slate-500 font-serif">Edit the text ribbons and section titles across your homepage.</p>
        </div>

        {/* Top Announcement Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="md:col-span-2 text-xs font-serif font-bold text-slate-800">Top Website Announcement Bar</div>
          <div>
            <label className="block text-[11px] font-serif text-slate-600 mb-1">Badge Text</label>
            <input
              type="text"
              value={sections.announcementBadge}
              onChange={(e) => setSections({ ...sections, announcementBadge: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-serif text-slate-600 mb-1">Link Label</label>
            <input
              type="text"
              value={sections.announcementLinkText}
              onChange={(e) => setSections({ ...sections, announcementLinkText: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-serif text-slate-600 mb-1">Main Message</label>
            <input
              type="text"
              value={sections.announcementText}
              onChange={(e) => setSections({ ...sections, announcementText: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-serif text-slate-600 mb-1">Sub-Message</label>
            <input
              type="text"
              value={sections.announcementSubtext}
              onChange={(e) => setSections({ ...sections, announcementSubtext: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
            />
          </div>
        </div>

        {/* Section Titles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-serif font-bold text-slate-700 mb-1">Monthly Section Title</label>
            <input
              type="text"
              value={sections.monthlyHeading}
              onChange={(e) => setSections({ ...sections, monthlyHeading: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-serif font-bold text-slate-700 mb-1">Monthly Section Subtitle</label>
            <input
              type="text"
              value={sections.monthlyDescription}
              onChange={(e) => setSections({ ...sections, monthlyDescription: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>
        </div>

        {/* 4 Stats Ribbon */}
        <div>
          <label className="block text-xs font-serif font-bold text-slate-700 mb-2">4 Publisher Stats Highlights</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sections.stats.map((st, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <input
                  type="text"
                  value={st.value}
                  onChange={(e) => {
                    const nextStats = sections.stats.map((item, i) => (i === idx ? { ...item, value: e.target.value } : item))
                    setSections({ ...sections, stats: nextStats })
                  }}
                  placeholder="50+"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                />
                <input
                  type="text"
                  value={st.label}
                  onChange={(e) => {
                    const nextStats = sections.stats.map((item, i) => (i === idx ? { ...item, label: e.target.value } : item))
                    setSections({ ...sections, stats: nextStats })
                  }}
                  placeholder="Label"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Publishing Manifesto Quote */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="text-xs font-serif font-bold text-slate-800">Publishing Manifesto Quote Banner</div>
          <input
            type="text"
            value={sections.manifestoLabel}
            onChange={(e) => setSections({ ...sections, manifestoLabel: e.target.value })}
            placeholder="Badge label"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
          />
          <textarea
            rows={2}
            value={sections.manifestoQuote}
            onChange={(e) => setSections({ ...sections, manifestoQuote: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-serif"
          />
          <input
            type="text"
            value={sections.manifestoAuthor}
            onChange={(e) => setSections({ ...sections, manifestoAuthor: e.target.value })}
            placeholder="Attribution"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-serif font-bold rounded-xl shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>{isSaving ? 'Saving...' : 'Save All Homepage Texts'}</span>
          </button>
        </div>
      </form>

      {/* Edit Monthly Card Modal */}
      {editingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-hidden">
          <form
            onSubmit={handleSaveCard}
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 shadow-2xl"
          >
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <h4 className="font-serif text-base font-bold">
                {isNewCard ? 'Add Monthly Spotlight Card' : `Edit: ${editingCard.title}`}
              </h4>
              <button type="button" onClick={() => setEditingCard(null)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto text-xs flex-1">
              <div>
                <label className="block font-serif font-bold text-slate-700 mb-1">Display Title *</label>
                <input
                  required
                  type="text"
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Author / Series *</label>
                  <input
                    required
                    type="text"
                    value={editingCard.author}
                    onChange={(e) => setEditingCard({ ...editingCard, author: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Category Label</label>
                  <input
                    type="text"
                    value={editingCard.genre}
                    onChange={(e) => setEditingCard({ ...editingCard, genre: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Opens Book Page</label>
                  <select
                    value={editingCard.linkedBookId}
                    onChange={(e) => setEditingCard({ ...editingCard, linkedBookId: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {content.books.map((b) => (
                      <option key={b.id} value={b.id}>{b.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Cover Symbol / Icon</label>
                  <input
                    type="text"
                    value={editingCard.emblem}
                    onChange={(e) => setEditingCard({ ...editingCard, emblem: e.target.value })}
                    placeholder="e.g. 🛡️ or 🌿 or ☀️"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block font-serif font-bold text-slate-700 mb-2">Card Gradient Color</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(MONTHLY_THEMES) as MonthlyThemeId[]).map((tid) => {
                    const preset = MONTHLY_THEMES[tid]
                    return (
                      <button
                        key={tid}
                        type="button"
                        onClick={() => setEditingCard({ ...editingCard, themeId: tid })}
                        className={`p-2 rounded-xl border flex items-center gap-2 ${
                          editingCard.themeId === tid ? 'border-slate-900 bg-slate-100 ring-2 ring-slate-900/20' : 'border-slate-200'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full shrink-0" style={{ backgroundColor: preset.swatch }} />
                        <span className="text-[11px] font-serif font-semibold">{preset.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2 shrink-0">
              <button type="button" onClick={() => setEditingCard(null)} className="px-4 py-2 text-xs text-slate-600 rounded-xl">
                Cancel
              </button>
              <button type="submit" disabled={isSaving} className="px-5 py-2 bg-slate-900 text-white text-xs font-serif font-bold rounded-xl shadow flex items-center gap-1.5">
                <Save className="w-4 h-4 text-amber-400" />
                <span>Save &amp; Publish</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// 3. EXPLORE OUR LIBRARY (FULL BOOK CATALOG) EDITOR
// ============================================================================
export function LibraryCatalogEditor({ content, onSave, isSaving }: EditorProps) {
  const [editingBook, setEditingBook] = useState<ManagedBook | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [libHeading, setLibHeading] = useState(content.homeSections.libraryHeading)
  const [libDesc, setLibDesc] = useState(content.homeSections.libraryDescription)
  const [warningMsg, setWarningMsg] = useState('')

  useEffect(() => {
    setLibHeading(content.homeSections.libraryHeading)
    setLibDesc(content.homeSections.libraryDescription)
  }, [content.updatedAt, content.homeSections.libraryHeading, content.homeSections.libraryDescription])

  const filtered = content.books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenAdd = () => {
    setWarningMsg('')
    setIsNew(true)
    setEditingBook({
      id: `${Date.now()}`,
      title: '',
      subtitle: '',
      author: '',
      category: 'Sovereign Grace',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      description: '',
      paperPageNum: 220,
      isbn: '978-1-68359-010',
      sampleExcerpt: '"To know God in truth is to rest in His eternal decree..."',
      inStock: true
    })
  }

  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingBook) return
    setWarningMsg('')
    const nextBooks = isNew
      ? [...content.books, editingBook]
      : content.books.map((b) => (b.id === editingBook.id ? editingBook : b))

    await onSave(
      { ...content, books: nextBooks },
      isNew ? `New book "${editingBook.title}" published to Library!` : `Updated "${editingBook.title}" across the website!`
    )
    setEditingBook(null)
  }

  const handleDeleteBook = async (id: string, title: string) => {
    if (content.books.length <= 1) {
      setWarningMsg('At least 1 book must remain in your library catalog.')
      return
    }
    setWarningMsg('')
    const nextBooks = content.books.filter((b) => b.id !== id)
    await onSave({ ...content, books: nextBooks }, `Deleted "${title}" from library catalog.`)
  }

  const handleSaveLibraryHeading = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSave(
      {
        ...content,
        homeSections: {
          ...content.homeSections,
          libraryHeading: libHeading,
          libraryDescription: libDesc
        }
      },
      'Explore Our Library heading updated!'
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold block mb-1">
            Full Bookstore Catalog
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
            Explore Our Library ({content.books.length} Books)
          </h3>
          <p className="text-xs text-slate-500 font-serif mt-1 max-w-2xl">
            Add new books, upload cover images, update prices, or edit descriptions. Changes appear immediately on the Homepage Library, All Books page, Categories page, and Book Detail pages.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-serif font-bold flex items-center gap-1.5 shadow shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add New Book</span>
        </button>
      </div>

      {/* Section Title & Search */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <form onSubmit={handleSaveLibraryHeading} className="lg:col-span-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1 w-full">
            <label className="block text-[11px] font-serif font-bold text-slate-700 mb-1">Library Section Title</label>
            <input
              type="text"
              value={libHeading}
              onChange={(e) => setLibHeading(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-[11px] font-serif font-bold text-slate-700 mb-1">Library Subtitle</label>
            <input
              type="text"
              value={libDesc}
              onChange={(e) => setLibDesc(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <button type="submit" disabled={isSaving} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-serif font-bold shrink-0">
            Save Title
          </button>
        </form>

        <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-end">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter catalog by title, author, category..."
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
          />
        </div>
      </div>

      {warningMsg && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{warningMsg}</span>
          </div>
          <button type="button" onClick={() => setWarningMsg('')} className="text-amber-700 hover:text-amber-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((book) => (
          <div key={book.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-5 space-y-3">
              <div className="flex gap-4">
                <div className="w-20 h-28 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 space-y-1">
                  <span className="text-[10px] font-mono uppercase bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-bold inline-block">
                    {book.category}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-slate-900 line-clamp-2">{book.title}</h4>
                  <p className="text-xs text-slate-500 font-serif truncate">by {book.author}</p>
                  <div className="text-xs font-mono font-bold text-slate-900 pt-1">
                    ${book.price.toFixed(2)} • {book.paperPageNum || 240} pages
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 font-serif line-clamp-2 leading-relaxed">{book.description}</p>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
              <a
                href={`/books/${book.id}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 hover:text-slate-900 flex items-center gap-1 font-serif underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Page</span>
              </a>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => { setIsNew(false); setEditingBook({ ...book }) }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-serif font-bold rounded-lg flex items-center gap-1 text-[11px]"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteBook(book.id, book.title)}
                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg"
                  title="Delete book"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Book Modal */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-hidden">
          <form
            onSubmit={handleSaveBook}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 shadow-2xl"
          >
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                  Library Catalog Editor
                </span>
                <h4 className="font-serif text-base font-bold">
                  {isNew ? 'Add New Book to Catalog' : `Edit Book: ${editingBook.title}`}
                </h4>
              </div>
              <button type="button" onClick={() => setEditingBook(null)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Book Title *</label>
                  <input
                    required
                    type="text"
                    value={editingBook.title}
                    onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Author *</label>
                  <input
                    required
                    type="text"
                    value={editingBook.author}
                    onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={editingBook.subtitle || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Category *</label>
                  <input
                    required
                    type="text"
                    value={editingBook.category}
                    onChange={(e) => setEditingBook({ ...editingBook, category: e.target.value })}
                    placeholder="e.g. Sovereign Grace, Christian Living"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Paperback Price ($) *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={editingBook.price}
                    onChange={(e) => setEditingBook({ ...editingBook, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Page Count</label>
                  <input
                    type="number"
                    value={editingBook.paperPageNum || 200}
                    onChange={(e) => setEditingBook({ ...editingBook, paperPageNum: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">ISBN</label>
                  <input
                    type="text"
                    value={editingBook.isbn || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, isbn: e.target.value })}
                    placeholder="978-1-..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <ImageField
                label="Book Cover Image"
                value={editingBook.image}
                onChange={(url) => setEditingBook({ ...editingBook, image: url })}
                helperText="Recommended ratio 2:3 (portrait)"
              />

              <div>
                <label className="block font-serif font-bold text-slate-700 mb-1">Full Book Description / Synopsis *</label>
                <textarea
                  required
                  rows={4}
                  value={editingBook.description}
                  onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-serif leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-serif font-bold text-slate-700 mb-1">Sample E-Book Preview Excerpt</label>
                <textarea
                  rows={2}
                  value={editingBook.sampleExcerpt || ''}
                  onChange={(e) => setEditingBook({ ...editingBook, sampleExcerpt: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-serif italic"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2 shrink-0">
              <button type="button" onClick={() => setEditingBook(null)} className="px-4 py-2 text-xs text-slate-600 rounded-xl">
                Cancel
              </button>
              <button type="submit" disabled={isSaving} className="px-5 py-2 bg-slate-900 text-white text-xs font-serif font-bold rounded-xl shadow flex items-center gap-1.5">
                <Save className="w-4 h-4 text-amber-400" />
                <span>{isSaving ? 'Saving...' : 'Save & Publish Live'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// 4. ARTICLES & ESSAYS EDITOR
// ============================================================================
export function ArticlesEditor({ content, onSave, isSaving }: EditorProps) {
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [isNew, setIsNew] = useState(false)

  const handleOpenNew = () => {
    setIsNew(true)
    setEditingArticle({
      id: `a-${Date.now()}`,
      title: '',
      excerpt: '',
      content: '',
      author: 'Editorial Board',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      category: 'Practical Faith',
      image: 'https://images.unsplash.com/photo-1491841573190-7111a62d00f4?w=600&h=400&fit=crop'
    })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingArticle) return
    const next = isNew
      ? [editingArticle, ...content.articles]
      : content.articles.map((a) => (a.id === editingArticle.id ? editingArticle : a))
    await onSave(
      { ...content, articles: next },
      isNew ? `Article "${editingArticle.title}" published!` : `Article "${editingArticle.title}" updated!`
    )
    setEditingArticle(null)
  }

  const handleDelete = async (id: string, title: string) => {
    const next = content.articles.filter((a) => a.id !== id)
    await onSave({ ...content, articles: next }, `Removed article "${title}".`)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold block mb-1">
            Articles &amp; Essays (/articles)
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
            Manage Articles &amp; Insights ({content.articles.length} Articles)
          </h3>
          <p className="text-xs text-slate-500 font-serif mt-1 max-w-2xl">
            Publish pastoral reflections, book excerpts, and theological essays. They immediately appear on the Articles page with your website&apos;s exact editorial layout.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/articles"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-serif font-semibold flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Articles Page</span>
          </a>
          <button
            type="button"
            onClick={handleOpenNew}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-serif font-bold flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Write New Article</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {content.articles.map((art) => (
          <div key={art.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded">
                  {art.category}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <div className="text-[11px] text-slate-500 font-mono">
                  {art.date} • {art.readTime}
                </div>
                <h4 className="font-serif text-base font-bold text-slate-900 line-clamp-2">{art.title}</h4>
                <p className="text-xs text-slate-500 font-serif">by {art.author}</p>
                <p className="text-xs text-slate-600 line-clamp-2">{art.excerpt}</p>
              </div>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => { setIsNew(false); setEditingArticle({ ...art }) }}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-serif font-bold flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit Article</span>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(art.id, art.title)}
                className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg"
                title="Delete article"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Editor Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-hidden">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 shadow-2xl"
          >
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <h4 className="font-serif text-base font-bold">
                {isNew ? 'Publish New Article' : `Edit Article: ${editingArticle.title}`}
              </h4>
              <button type="button" onClick={() => setEditingArticle(null)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div>
                <label className="block font-serif font-bold text-slate-700 mb-1">Article Headline *</label>
                <input
                  required
                  type="text"
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Author *</label>
                  <input
                    required
                    type="text"
                    value={editingArticle.author}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Category *</label>
                  <input
                    required
                    type="text"
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Publish Date</label>
                  <input
                    type="text"
                    value={editingArticle.date}
                    onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingArticle.readTime}
                    onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <ImageField
                label="Article Header Image"
                value={editingArticle.image}
                onChange={(url) => setEditingArticle({ ...editingArticle, image: url })}
                helperText="Recommended landscape image (16:9)"
              />

              <div>
                <label className="block font-serif font-bold text-slate-700 mb-1">Short Summary / Excerpt *</label>
                <textarea
                  required
                  rows={2}
                  value={editingArticle.excerpt}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-serif"
                />
              </div>

              <div>
                <label className="block font-serif font-bold text-slate-700 mb-1">Full Article Body *</label>
                <textarea
                  required
                  rows={7}
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  placeholder="Write your full essay paragraphs here..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-serif leading-relaxed"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2 shrink-0">
              <button type="button" onClick={() => setEditingArticle(null)} className="px-4 py-2 text-xs text-slate-600 rounded-xl">
                Cancel
              </button>
              <button type="submit" disabled={isSaving} className="px-5 py-2 bg-slate-900 text-white text-xs font-serif font-bold rounded-xl shadow flex items-center gap-1.5">
                <Save className="w-4 h-4 text-amber-400" />
                <span>{isSaving ? 'Publishing...' : 'Save & Publish Article'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// 5. EVENTS & HOMEPAGE POPUP EDITOR
// ============================================================================
export function EventsAndPopupEditor({
  content,
  onSave,
  isSaving,
  popupActive,
  setPopupActive,
  popupTitle,
  setPopupTitle,
  popupSubtitle,
  setPopupSubtitle,
  popupDate,
  setPopupDate,
  popupVenue,
  setPopupVenue,
  onSavePopup
}: EditorProps & {
  popupActive: boolean
  setPopupActive: (v: boolean) => void
  popupTitle: string
  setPopupTitle: (v: string) => void
  popupSubtitle: string
  setPopupSubtitle: (v: string) => void
  popupDate: string
  setPopupDate: (v: string) => void
  popupVenue: string
  setPopupVenue: (v: string) => void
  onSavePopup: (e: React.FormEvent) => void
}) {
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null)
  const [isNew, setIsNew] = useState(false)

  const handleOpenNew = () => {
    setIsNew(true)
    setEditingEvent({
      id: `e-${Date.now()}`,
      title: '',
      subtitle: '',
      category: 'book-release',
      categoryLabel: 'Book Release',
      status: 'UPCOMING',
      date: '',
      time: '14:00 - 17:00',
      location: 'Reformed Books House Hall',
      badge: 'Special Event',
      discountRate: '',
      description: '',
      highlights: ['Free study guide for attendees', 'Live Q&A with author'],
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=500&fit=crop',
      registrationUrl: '/books/all'
    })
  }

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingEvent) return
    const next = isNew
      ? [editingEvent, ...content.events]
      : content.events.map((ev) => (ev.id === editingEvent.id ? editingEvent : ev))
    await onSave(
      { ...content, events: next },
      isNew ? `Event "${editingEvent.title}" added!` : `Event "${editingEvent.title}" updated!`
    )
    setEditingEvent(null)
  }

  const handleDeleteEvent = async (id: string, title: string) => {
    const next = content.events.filter((ev) => ev.id !== id)
    await onSave({ ...content, events: next }, `Deleted event "${title}".`)
  }

  return (
    <div className="space-y-8">
      {/* PART A: EVENTS PAGE LIST */}
      <div className="space-y-4">
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold block mb-1">
              Events Page (/events)
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
              Publisher Events, Fairs &amp; Special Sales ({content.events.length})
            </h3>
            <p className="text-xs text-slate-500 font-serif mt-1">
              Create or edit book launches, special discounts, and symposia displayed on your Events page.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenNew}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-serif font-bold flex items-center gap-1.5 shadow shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add New Event</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.events.map((ev) => (
            <div key={ev.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between gap-3">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 space-y-1">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    ev.status === 'ONGOING' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                  }`}>
                    {ev.status}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-slate-900 line-clamp-2">{ev.title}</h4>
                  <p className="text-[11px] text-slate-500">{ev.date} • {ev.location}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsNew(false); setEditingEvent({ ...ev }) }}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-serif font-bold flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Event</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(ev.id, ev.title)}
                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PART B: HOMEPAGE POPUP SWITCH */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900">Homepage Visitor Notice Popup</h3>
            <p className="text-xs text-slate-500 font-serif">
              Currently disabled by default. Turn ON anytime you want to show a special notice when visitors open the homepage.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPopupActive(!popupActive)}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-2 shrink-0 ${
              popupActive ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-200 text-slate-700'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${popupActive ? 'bg-white' : 'bg-slate-500'}`} />
            <span>{popupActive ? 'POPUP ACTIVE (Visible)' : 'POPUP OFF (Hidden)'}</span>
          </button>
        </div>

        <form onSubmit={onSavePopup} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5 text-xs">
          <div>
            <label className="block font-serif font-bold text-slate-700 mb-1">Popup Headline</label>
            <input
              type="text"
              value={popupTitle}
              onChange={(e) => setPopupTitle(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-serif font-bold text-slate-700 mb-1">Subtitle</label>
            <input
              type="text"
              value={popupSubtitle}
              onChange={(e) => setPopupSubtitle(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-serif font-bold text-slate-700 mb-1">Event Date</label>
            <input
              type="text"
              value={popupDate}
              onChange={(e) => setPopupDate(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-serif font-bold text-slate-700 mb-1">Venue / Location</label>
            <input
              type="text"
              value={popupVenue}
              onChange={(e) => setPopupVenue(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
          <div className="md:col-span-2 flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-serif font-bold rounded-xl shadow flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Save Popup Settings</span>
            </button>
          </div>
        </form>
      </div>

      {/* Event Editor Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-hidden">
          <form
            onSubmit={handleSaveEvent}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 shadow-2xl"
          >
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <h4 className="font-serif text-base font-bold">{isNew ? 'Add New Event' : `Edit Event: ${editingEvent.title}`}</h4>
              <button type="button" onClick={() => setEditingEvent(null)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div>
                <label className="block font-serif font-bold text-slate-700 mb-1">Event Title *</label>
                <input
                  required
                  type="text"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-serif font-bold text-slate-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingEvent.subtitle}
                  onChange={(e) => setEditingEvent({ ...editingEvent, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingEvent.category}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="special-sale">Special Sale</option>
                    <option value="book-release">Book Release</option>
                    <option value="symposium">Symposium / Fair</option>
                  </select>
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingEvent.status}
                    onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="ONGOING">ONGOING</option>
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="ENDED">ENDED</option>
                  </select>
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Discount Badge (Optional)</label>
                  <input
                    type="text"
                    value={editingEvent.discountRate || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, discountRate: e.target.value })}
                    placeholder="e.g. 25% OFF"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Date *</label>
                  <input
                    required
                    type="text"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-serif font-bold text-slate-700 mb-1">Location *</label>
                  <input
                    required
                    type="text"
                    value={editingEvent.location}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <ImageField
                label="Event Cover Image"
                value={editingEvent.image}
                onChange={(url) => setEditingEvent({ ...editingEvent, image: url })}
              />

              <div>
                <label className="block font-serif font-bold text-slate-700 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-serif"
                />
              </div>

              <div>
                <label className="block font-serif font-bold text-slate-700 mb-1">Event Highlights (One per line)</label>
                <textarea
                  rows={3}
                  value={editingEvent.highlights.join('\n')}
                  onChange={(e) => setEditingEvent({ ...editingEvent, highlights: e.target.value.split('\n').filter(Boolean) })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-serif"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2 shrink-0">
              <button type="button" onClick={() => setEditingEvent(null)} className="px-4 py-2 text-xs text-slate-600 rounded-xl">
                Cancel
              </button>
              <button type="submit" disabled={isSaving} className="px-5 py-2 bg-slate-900 text-white text-xs font-serif font-bold rounded-xl shadow flex items-center gap-1.5">
                <Save className="w-4 h-4 text-amber-400" />
                <span>Save &amp; Publish Event</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// 6. READER TESTIMONIALS & ABOUT US PAGE EDITOR
// ============================================================================
export function CommunityAboutEditor({ content, onSave, isSaving }: EditorProps) {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(content.testimonials)
  const [about, setAbout] = useState(content.about)

  useEffect(() => {
    setTestimonials(content.testimonials)
    setAbout(content.about)
  }, [content.updatedAt, content.testimonials, content.about])

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSave(
      { ...content, testimonials, about },
      'Reader Testimonials and About Us page saved live!'
    )
  }

  return (
    <form onSubmit={handleSaveAll} className="space-y-6">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold block mb-1">
            Reader Reviews &amp; Publisher Story
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
            Community Testimonials &amp; About Us Page
          </h3>
          <p className="text-xs text-slate-500 font-serif mt-1">
            Edit the 3 scholar/reader endorsements shown on the homepage and update your Vision, Mission, and Publisher Story on `/about`.
          </p>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-serif font-bold flex items-center gap-1.5 shadow shrink-0 self-start sm:self-auto"
        >
          <Save className="w-4 h-4 text-amber-400" />
          <span>{isSaving ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>

      {/* Reader Testimonials */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h4 className="font-serif text-base font-bold text-slate-900 border-b pb-2">
          Homepage Reader Testimonials
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <div key={t.id || idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="font-bold text-slate-700 font-serif">Testimonial #{idx + 1}</div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Reviewer Name</label>
                <input
                  type="text"
                  value={t.name}
                  onChange={(e) => setTestimonials(testimonials.map((item, i) => (i === idx ? { ...item, name: e.target.value } : item)))}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Role / Title</label>
                <input
                  type="text"
                  value={t.role}
                  onChange={(e) => setTestimonials(testimonials.map((item, i) => (i === idx ? { ...item, role: e.target.value } : item)))}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Book Reviewed</label>
                <input
                  type="text"
                  value={t.book}
                  onChange={(e) => setTestimonials(testimonials.map((item, i) => (i === idx ? { ...item, book: e.target.value } : item)))}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Quote</label>
                <textarea
                  rows={3}
                  value={t.quote}
                  onChange={(e) => setTestimonials(testimonials.map((item, i) => (i === idx ? { ...item, quote: e.target.value } : item)))}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-serif"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Us Page */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <h4 className="font-serif text-base font-bold text-slate-900 border-b pb-2">
          About Us Page (/about)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-serif font-bold text-slate-700 mb-1">Main Headline</label>
            <input
              type="text"
              value={about.heroTitle}
              onChange={(e) => setAbout({ ...about, heroTitle: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-serif font-bold text-slate-700 mb-1">Hero Quote</label>
            <input
              type="text"
              value={about.heroQuote}
              onChange={(e) => setAbout({ ...about, heroQuote: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-serif font-bold text-slate-700 mb-1">Our Vision</label>
            <textarea
              rows={3}
              value={about.vision}
              onChange={(e) => setAbout({ ...about, vision: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-serif"
            />
          </div>
          <div>
            <label className="block font-serif font-bold text-slate-700 mb-1">Our Mission</label>
            <textarea
              rows={3}
              value={about.mission}
              onChange={(e) => setAbout({ ...about, mission: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-serif"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-serif font-bold text-slate-700 mb-1">The Reformed Books Story</label>
            <textarea
              rows={3}
              value={about.story}
              onChange={(e) => setAbout({ ...about, story: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-serif"
            />
          </div>
        </div>
      </div>
    </form>
  )
}

// ============================================================================
// 7. BACKUP & RESTORE SAFETY PANEL
// ============================================================================
export function BackupRestorePanel({ content, onSave, isSaving }: EditorProps) {
  const [importError, setImportError] = useState('')

  const handleDownloadBackup = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reformed-books-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleUploadBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImportError('')
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const parsed = JSON.parse(reader.result as string)
        if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.books)) {
          setImportError('Invalid backup file. Please choose a valid Reformed Books House JSON backup.')
          return
        }
        await onSave(parsed as SiteContent, 'Website content restored from your backup file!')
      } catch {
        setImportError('Could not read JSON file. Please verify the file is not corrupted.')
      }
    }
    reader.readAsText(file)
  }

  const handleResetDefaults = async () => {
    await onSave(DEFAULT_SITE_CONTENT, 'Website content restored to original default catalog.')
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold block mb-1">
          Safety &amp; Portability
        </span>
        <h3 className="font-serif text-xl font-bold text-slate-900">
          Website Content Backup &amp; Restore
        </h3>
        <p className="text-xs text-slate-500 font-serif mt-1 max-w-2xl">
          Download a single backup file containing all your books, articles, events, and homepage texts before moving servers or making major changes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-4">
          <div className="space-y-1.5">
            <h4 className="font-serif text-sm font-bold text-slate-900">1. Download Backup</h4>
            <p className="text-xs text-slate-600 font-serif leading-relaxed">
              Save a copy of your entire website catalog, articles, and settings to your computer.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownloadBackup}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-serif font-bold flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Download Backup (.json)</span>
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-4">
          <div className="space-y-1.5">
            <h4 className="font-serif text-sm font-bold text-slate-900">2. Restore from Backup</h4>
            <p className="text-xs text-slate-600 font-serif leading-relaxed">
              Upload a previously saved backup file to restore all books and articles instantly.
            </p>
            {importError && <p className="text-[11px] text-rose-600">{importError}</p>}
          </div>
          <label className="cursor-pointer w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-serif font-bold flex items-center justify-center gap-2">
            <Upload className="w-4 h-4" />
            <span>Choose Backup File</span>
            <input type="file" accept=".json,application/json" onChange={handleUploadBackup} className="hidden" />
          </label>
        </div>

        <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 flex flex-col justify-between gap-4">
          <div className="space-y-1.5">
            <h4 className="font-serif text-sm font-bold text-rose-950">3. Reset to Original Defaults</h4>
            <p className="text-xs text-rose-800/80 font-serif leading-relaxed">
              Restore the original launch catalog and sample articles if you ever wish to start fresh.
            </p>
          </div>
          <button
            type="button"
            disabled={isSaving}
            onClick={handleResetDefaults}
            className="w-full py-2.5 bg-white hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-xl text-xs font-serif font-bold flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restore Original Defaults</span>
          </button>
        </div>
      </div>
    </div>
  )
}
