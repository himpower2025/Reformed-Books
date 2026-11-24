'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  Package,
  BookOpen,
  BellRing,
  Building2,
  HelpCircle,
  CheckCircle2,
  Clock,
  Truck,
  Mail,
  Search,
  ExternalLink,
  ChevronRight,
  LogOut,
  Save,
  Check,
  AlertTriangle,
  QrCode,
  Smartphone,
  Receipt,
  Printer,
  X,
  Send,
  Sparkles,
  Layers,
  FileText,
  Quote,
  Download,
  Upload,
  Globe
} from 'lucide-react'
import {
  OrderRecord,
  BankConfig,
  getStoredOrders,
  updateOrderStatus,
  getStoredBankConfig,
  saveBankConfig,
  fetchAdminStore,
  DEFAULT_BANK_CONFIG
} from '@/lib/admin-data'
import { SiteContent, compressImageFile } from '@/lib/site-content'
import { useSiteContent } from '@/hooks/use-site-content'
import {
  FeaturedBooksEditor,
  MonthlySpotlightEditor,
  LibraryCatalogEditor,
  ArticlesEditor,
  EventsAndPopupEditor,
  CommunityAboutEditor,
  BackupRestorePanel
} from '@/components/admin/cms-editors'

type AdminTab =
  | 'orders'
  | 'bank'
  | 'featured-books'
  | 'monthly'
  | 'library'
  | 'articles'
  | 'events'
  | 'community'
  | 'guide'
  | 'backup'

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [loginInputEmail, setLoginInputEmail] = useState('')
  const [loginInputPassword, setLoginInputPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('orders')

  // Live CMS Website Content
  const { content, isLoaded: isContentLoaded, updateContent } = useSiteContent()
  const [isSavingContent, setIsSavingContent] = useState(false)
  const [saveErrorMessage, setSaveErrorMessage] = useState('')

  // Orders State
  const [orders, setOrders] = useState<OrderRecord[]>([])
  const [orderSearch, setOrderSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'CONFIRMED' | 'FULFILLED'>('ALL')
  const [formatFilter, setFormatFilter] = useState<'ALL' | 'paperback' | 'ebook'>('ALL')
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<OrderRecord | null>(null)
  const [emailModalOrder, setEmailModalOrder] = useState<OrderRecord | null>(null)
  const [trackingModalOrder, setTrackingModalOrder] = useState<OrderRecord | null>(null)
  const [inputTrackingNumber, setInputTrackingNumber] = useState('')
  const [actionSuccessMessage, setActionSuccessMessage] = useState('')

  // Bank Info State
  const [bankConfig, setBankConfig] = useState<BankConfig>(DEFAULT_BANK_CONFIG)
  const [bankSavedMessage, setBankSavedMessage] = useState(false)
  const [qrUploading, setQrUploading] = useState(false)
  const [qrUploadError, setQrUploadError] = useState('')

  // Popup Config State
  const [popupActive, setPopupActive] = useState(false)
  const [popupTitle, setPopupTitle] = useState("Writer's Workshop")
  const [popupSubtitle, setPopupSubtitle] = useState('Presented by Reformed Books House')
  const [popupDate, setPopupDate] = useState('Aug 2 (Sun) – Aug 4 (Tue), 2026')
  const [popupVenue, setPopupVenue] = useState('Happy Tree Cafe')

  // 1. Check Initial Authentication and Load Data
  useEffect(() => {
    const storedUser = localStorage.getItem('reformed_user')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        if (
          user.email === 'himpower2025@gmail.com' ||
          user.email?.toLowerCase().endsWith('@reformedbooks.com') ||
          user.email?.toLowerCase().includes('admin')
        ) {
          setIsAuthenticated(true)
          setAdminEmail(user.email)
        }
      } catch (e) {
        console.error(e)
      }
    }

    // Immediate local hydration
    setOrders(getStoredOrders())
    setBankConfig(getStoredBankConfig())

    // Server store hydration
    fetchAdminStore().then(({ orders: syncedOrders, bankConfig: syncedBank }) => {
      setOrders(syncedOrders)
      setBankConfig(syncedBank)
    })

    // Load popup config (default disabled)
    try {
      const storedPopup = localStorage.getItem('reformed_books_popup_config')
      if (storedPopup) {
        const parsed = JSON.parse(storedPopup)
        setPopupActive(parsed.isActive ?? false)
        if (parsed.standard) {
          setPopupTitle(parsed.standard.title || "Writer's Workshop")
          setPopupSubtitle(parsed.standard.subtitle || 'Presented by Reformed Books House')
          setPopupDate(parsed.standard.date || 'Aug 2 (Sun) – Aug 4 (Tue), 2026')
          setPopupVenue(parsed.standard.venue || 'Happy Tree Cafe')
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  // Handle Quick Admin Login
  const handleQuickLogin = (emailToUse: string = 'himpower2025@gmail.com') => {
    const adminUser = {
      email: emailToUse,
      name: 'Publisher Executive',
      role: 'admin'
    }
    localStorage.setItem('reformed_user', JSON.stringify(adminUser))
    setIsAuthenticated(true)
    setAdminEmail(emailToUse)
    setLoginError('')
  }

  // Handle Manual Staff Login
  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginInputEmail) {
      setLoginError('Please enter your administrator email address.')
      return
    }
    handleQuickLogin(loginInputEmail)
  }

  // Handle Log Out
  const handleLogout = () => {
    localStorage.removeItem('reformed_user')
    setIsAuthenticated(false)
    setAdminEmail('')
  }

  // Flash a success banner
  const triggerSuccess = (msg: string) => {
    setSaveErrorMessage('')
    setActionSuccessMessage(msg)
    setTimeout(() => setActionSuccessMessage(''), 4200)
  }

  // Save SiteContent wrapper for all CMS tabs
  const handleSaveSiteContent = async (next: SiteContent, successMsg: string) => {
    setIsSavingContent(true)
    setSaveErrorMessage('')
    try {
      const result = await updateContent(next)
      if (result.savedToServer) {
        triggerSuccess(successMsg)
      } else {
        triggerSuccess(`${successMsg} (Saved locally on this browser)`)
      }
    } catch {
      setSaveErrorMessage('Unable to save website changes right now. Please try again.')
    } finally {
      setIsSavingContent(false)
    }
  }

  // Order Actions
  const handleVerifyPayment = (orderId: string) => {
    const updated = updateOrderStatus(orderId, 'PAYMENT_CONFIRMED', {
      adminNotes: `Payment verified by ${adminEmail} on ${new Date().toLocaleDateString()}.`
    })
    setOrders(updated)
    triggerSuccess(`Order ${orderId} payment verified! Ready for fulfillment.`)
  }

  const handleOpenTrackingModal = (order: OrderRecord) => {
    setTrackingModalOrder(order)
    setInputTrackingNumber(order.trackingNumber || `NP-EXP-${Math.floor(10000 + Math.random() * 90000)}`)
  }

  const handleConfirmShipping = () => {
    if (!trackingModalOrder) return
    const updated = updateOrderStatus(trackingModalOrder.id, 'FULFILLED', {
      trackingNumber: inputTrackingNumber,
      adminNotes: `Dispatched with courier tracking ${inputTrackingNumber}.`
    })
    setOrders(updated)
    setTrackingModalOrder(null)
    triggerSuccess(`Order ${trackingModalOrder.id} marked as Shipped with tracking ${inputTrackingNumber}!`)
  }

  const handleFulfillEbook = (order: OrderRecord) => {
    const updated = updateOrderStatus(order.id, 'FULFILLED', {
      adminNotes: `E-Book download link delivered to ${order.buyerEmail} on ${new Date().toLocaleDateString()}.`
    })
    setOrders(updated)
    setEmailModalOrder(null)
    triggerSuccess(`E-Book link for order ${order.id} delivered to ${order.buyerEmail}!`)
  }

  // Save Bank Details
  const handleSaveBankConfig = (e: React.FormEvent) => {
    e.preventDefault()
    saveBankConfig(bankConfig)
    setBankSavedMessage(true)
    setTimeout(() => setBankSavedMessage(false), 3500)
    triggerSuccess('Bank QR and digital wallet details updated live on Checkout!')
  }

  const handleQrFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setQrUploading(true)
    setQrUploadError('')
    try {
      const dataUrl = await compressImageFile(file, 720, 0.86)
      setBankConfig((prev) => ({ ...prev, qrImageUrl: dataUrl }))
    } catch (err: any) {
      setQrUploadError(err?.message || 'Unable to process QR image file.')
    } finally {
      setQrUploading(false)
    }
  }

  // Save Popup Details
  const handleSavePopupConfig = (e: React.FormEvent) => {
    e.preventDefault()
    const currentStored = localStorage.getItem('reformed_books_popup_config')
    let base = {}
    try {
      if (currentStored) base = JSON.parse(currentStored)
    } catch {}

    const newConfig = {
      ...base,
      isActive: popupActive,
      mode: 'standard',
      standard: {
        title: popupTitle,
        subtitle: popupSubtitle,
        description:
          '"Unleash your voice, refine your craft, and explore theological depth in writing under the guidance of seasoned editors."',
        date: popupDate,
        scheduleNote: 'Special Program',
        venue: popupVenue,
        venueNote: 'Main Hall',
        buttonText: 'View Event Details',
        buttonLink: '/events'
      }
    }
    localStorage.setItem('reformed_books_popup_config', JSON.stringify(newConfig))
    window.dispatchEvent(new CustomEvent('reformed_books_popup_config_changed', { detail: newConfig }))
    triggerSuccess(
      popupActive
        ? 'Homepage Visitor Popup saved and turned ON for visitors!'
        : 'Homepage Visitor Popup settings saved (currently OFF).'
    )
  }

  // Filtered Orders Calculation
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.buyerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.buyerEmail.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.bookTitle.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.depositorName.toLowerCase().includes(orderSearch.toLowerCase())

    const matchesStatus =
      statusFilter === 'ALL'
        ? true
        : statusFilter === 'PENDING'
        ? order.status === 'PENDING_VERIFICATION'
        : statusFilter === 'CONFIRMED'
        ? order.status === 'PAYMENT_CONFIRMED'
        : order.status === 'FULFILLED'

    const matchesFormat = formatFilter === 'ALL' ? true : order.format === formatFilter

    return matchesSearch && matchesStatus && matchesFormat
  })

  // Urgent counts
  const pendingCount = orders.filter((o) => o.status === 'PENDING_VERIFICATION').length
  const readyToShipCount = orders.filter((o) => o.status === 'PAYMENT_CONFIRMED' && o.format === 'paperback').length
  const readyEbookCount = orders.filter((o) => o.status === 'PAYMENT_CONFIRMED' && o.format === 'ebook').length
  const fulfilledCount = orders.filter((o) => o.status === 'FULFILLED').length

  // Sidebar Navigation Groups
  const navGroups: {
    groupLabel: string
    items: {
      id: AdminTab
      label: string
      hint: string
      icon: React.ReactNode
      badge?: number
      dotActive?: boolean
    }[]
  }[] = [
    {
      groupLabel: 'Store Operations',
      items: [
        {
          id: 'orders',
          label: 'Orders & Fulfillment',
          hint: 'Verify QR & ship books',
          icon: <Package className="w-4 h-4 text-amber-500" />,
          badge: pendingCount > 0 ? pendingCount : undefined
        },
        {
          id: 'bank',
          label: 'Bank QR & Wallets',
          hint: 'Sanima QR, eSewa, Khalti',
          icon: <Building2 className="w-4 h-4 text-emerald-500" />
        }
      ]
    },
    {
      groupLabel: 'Website Content',
      items: [
        {
          id: 'featured-books',
          label: 'Featured Books (3D)',
          hint: 'Top 3D showcase slider',
          icon: <Sparkles className="w-4 h-4 text-amber-400" />
        },
        {
          id: 'monthly',
          label: 'Featured This Month',
          hint: 'Monthly picks & ribbons',
          icon: <Layers className="w-4 h-4 text-sky-400" />
        },
        {
          id: 'library',
          label: 'Explore Our Library',
          hint: `All ${content.books.length} catalog books`,
          icon: <BookOpen className="w-4 h-4 text-indigo-400" />
        },
        {
          id: 'articles',
          label: 'Articles & Essays',
          hint: `${content.articles.length} published essays`,
          icon: <FileText className="w-4 h-4 text-teal-500" />
        },
        {
          id: 'events',
          label: 'Events & Popups',
          hint: 'Events page & popup bar',
          icon: <BellRing className="w-4 h-4 text-rose-400" />,
          dotActive: popupActive
        },
        {
          id: 'community',
          label: 'Community & About',
          hint: 'Reviews & publisher story',
          icon: <Quote className="w-4 h-4 text-violet-400" />
        }
      ]
    },
    {
      groupLabel: 'Help & Safety',
      items: [
        {
          id: 'guide',
          label: 'Staff Quick Guide',
          hint: 'Simple 5-step handbook',
          icon: <HelpCircle className="w-4 h-4 text-purple-400" />
        },
        {
          id: 'backup',
          label: 'Backup & Reset',
          hint: 'Download or restore JSON',
          icon: <Download className="w-4 h-4 text-slate-400" />
        }
      ]
    }
  ]

  // ==========================================
  // VIEW: LOGIN SCREEN (IF NOT AUTHENTICATED)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 sm:p-6 text-foreground">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white text-center border-b border-amber-500/20">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4 text-amber-300 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 block mb-1">
              Publisher Studio Portal
            </span>
            <h1 className="font-serif text-2xl font-bold text-white">Reformed Books House</h1>
            <p className="text-xs text-slate-300 mt-2 font-serif leading-relaxed">
              Sign in to manage reader orders, bank QR payments, featured books, library catalog, and articles—all in one place.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-left">
              <span className="text-[11px] font-bold text-amber-950 block mb-1 uppercase tracking-wide">
                Quick 1-Click Administrator Access
              </span>
              <p className="text-xs text-amber-900 mb-3 leading-relaxed">
                Sign in immediately with your publisher administrator account (<strong>himpower2025@gmail.com</strong>).
              </p>
              <button
                type="button"
                onClick={() => handleQuickLogin('himpower2025@gmail.com')}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 font-serif"
              >
                <ShieldCheck className="w-4 h-4 text-amber-200" />
                <span>Sign In as Publisher Admin (himpower2025@gmail.com)</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] text-slate-400 uppercase tracking-widest">
                Or Enter Staff Email
              </span>
            </div>

            <form onSubmit={handleManualLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-serif font-semibold text-slate-700 mb-1.5">
                  Administrator Email
                </label>
                <input
                  type="email"
                  placeholder="admin@reformedbooks.com"
                  value={loginInputEmail}
                  onChange={(e) => setLoginInputEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-semibold text-slate-700 mb-1.5">
                  Admin PIN or Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginInputPassword}
                  onChange={(e) => setLoginInputPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-serif font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                <span>Enter Publisher Studio</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 text-center border-t border-slate-100">
              <Link
                href="/"
                className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-serif underline inline-flex items-center gap-1"
              >
                <span>Return to Public Bookstore</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  // ==========================================
  // VIEW: AUTHENTICATED ADMIN STUDIO
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Top Sticky Studio Header */}
      <header className="bg-slate-950 text-white border-b border-amber-500/20 sticky top-0 z-40 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-3">
          {/* Brand & Studio Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/admin" className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-white text-sm sm:text-base tracking-wide truncate">
                    Reformed Books House
                  </span>
                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded-full uppercase border border-amber-400/30 shrink-0">
                    Publisher Studio
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 hidden sm:flex items-center gap-2">
                  <span>All-in-One Bookstore &amp; Website Manager</span>
                  {isContentLoaded && content.updatedAt && (
                    <span className="text-slate-500 font-mono">
                      • Last published {new Date(content.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 font-serif font-semibold"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">View Live Website</span>
              <span className="md:hidden">Live Site</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            <div className="hidden xl:flex items-center gap-2 border-l border-slate-800 pl-3 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px] text-white">{adminEmail}</span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="text-xs text-rose-300 hover:text-white hover:bg-rose-950/60 px-3 py-2 rounded-xl border border-rose-900/60 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Success Toast */}
      <AnimatePresence>
        {actionSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-900 text-emerald-50 border border-emerald-500 px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-serif font-medium max-w-[92vw] text-center"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{actionSuccessMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 space-y-6">
        {/* Welcome Hero & 4 Daily Action Stat Cards */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-lg border border-amber-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block mb-1">
                Daily Publisher Overview
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Calm, Stress-Free Website &amp; Order Management
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-serif max-w-2xl mt-1 leading-relaxed">
                Pick any section from the menu to update your books, monthly highlights, articles, or verify QR payments. The public website keeps its exact visual design automatically.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('guide')}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-amber-300" />
                <span>How It Works</span>
              </button>
            </div>
          </div>

          {/* 4 Quick Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('orders')
                setStatusFilter('PENDING')
                setFormatFilter('ALL')
              }}
              className="text-left bg-white/10 hover:bg-white/15 border border-amber-400/30 rounded-2xl p-4 transition-all backdrop-blur-sm"
            >
              <div className="flex items-center justify-between text-amber-300 mb-1">
                <span className="text-xs font-serif font-semibold">Needs Verification</span>
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">{pendingCount}</div>
              <div className="text-[11px] text-amber-200/80 mt-0.5">Awaiting Bank QR check</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('orders')
                setStatusFilter('CONFIRMED')
                setFormatFilter('paperback')
              }}
              className="text-left bg-white/10 hover:bg-white/15 border border-sky-400/30 rounded-2xl p-4 transition-all backdrop-blur-sm"
            >
              <div className="flex items-center justify-between text-sky-300 mb-1">
                <span className="text-xs font-serif font-semibold">Ready to Ship</span>
                <Truck className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">{readyToShipCount}</div>
              <div className="text-[11px] text-sky-200/80 mt-0.5">Paperbacks ready for courier</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('orders')
                setStatusFilter('CONFIRMED')
                setFormatFilter('ebook')
              }}
              className="text-left bg-white/10 hover:bg-white/15 border border-emerald-400/30 rounded-2xl p-4 transition-all backdrop-blur-sm"
            >
              <div className="flex items-center justify-between text-emerald-300 mb-1">
                <span className="text-xs font-serif font-semibold">E-Books to Deliver</span>
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">{readyEbookCount}</div>
              <div className="text-[11px] text-emerald-200/80 mt-0.5">Send digital download link</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('orders')
                setStatusFilter('FULFILLED')
                setFormatFilter('ALL')
              }}
              className="text-left bg-white/10 hover:bg-white/15 border border-purple-400/30 rounded-2xl p-4 transition-all backdrop-blur-sm"
            >
              <div className="flex items-center justify-between text-purple-300 mb-1">
                <span className="text-xs font-serif font-semibold">Total Completed</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">{fulfilledCount}</div>
              <div className="text-[11px] text-purple-200/80 mt-0.5">Successfully fulfilled</div>
            </button>
          </div>
        </div>

        {/* Save Error Banner if any */}
        {saveErrorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{saveErrorMessage}</span>
            </div>
            <button type="button" onClick={() => setSaveErrorMessage('')} className="text-rose-700 hover:text-rose-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Mobile / Tablet Quick Horizontal Section Bar */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {navGroups.flatMap((group) =>
            group.items.map((item) => {
              const active = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2 rounded-xl font-serif text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                    active
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="bg-amber-500 text-slate-950 font-mono text-[10px] font-black px-1.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })
          )}
        </div>

        {/* Desktop 2-Column Studio Layout: Calm Left Sidebar + Focused Workspace */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Sticky Left Sidebar (Desktop) */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-24 space-y-5 bg-white rounded-3xl border border-slate-200 shadow-sm p-4">
            {navGroups.map((group) => (
              <div key={group.groupLabel} className="space-y-1.5">
                <div className="px-3 pt-1 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  {group.groupLabel}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = activeTab === item.id
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-2xl transition-all flex items-center gap-3 ${
                          active
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="shrink-0">{item.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-serif text-xs font-bold truncate">{item.label}</div>
                          <div
                            className={`text-[10px] truncate ${
                              active ? 'text-slate-300' : 'text-slate-400'
                            }`}
                          >
                            {item.hint}
                          </div>
                        </div>
                        {item.badge !== undefined && (
                          <span className="bg-amber-500 text-slate-950 font-mono text-[10px] font-black px-2 py-0.5 rounded-full shrink-0">
                            {item.badge}
                          </span>
                        )}
                        {item.dotActive !== undefined && (
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              item.dotActive ? 'bg-emerald-400' : 'bg-slate-300'
                            }`}
                          />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </aside>

          {/* Main Workspace Area */}
          <main className="flex-1 min-w-0 w-full">
            {/* ========================================================= */}
            {/* TAB 1: ORDERS & FULFILLMENT                               */}
            {/* ========================================================= */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Search by Order ID (RBH-...), customer name, email, or book title..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-500 font-serif mr-1 text-[11px]">Status:</span>

                    <button
                      type="button"
                      onClick={() => {
                        setStatusFilter('ALL')
                        setFormatFilter('ALL')
                      }}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                        statusFilter === 'ALL'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      All ({orders.length})
                    </button>

                    <button
                      type="button"
                      onClick={() => setStatusFilter('PENDING')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                        statusFilter === 'PENDING'
                          ? 'bg-amber-600 text-white'
                          : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Pending Payment ({pendingCount})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStatusFilter('CONFIRMED')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                        statusFilter === 'CONFIRMED'
                          ? 'bg-sky-600 text-white'
                          : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ready to Fulfill ({readyToShipCount + readyEbookCount})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStatusFilter('FULFILLED')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                        statusFilter === 'FULFILLED'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                      }`}
                    >
                      Fulfilled ({fulfilledCount})
                    </button>
                  </div>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
                    <Package className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="font-serif text-lg font-bold text-slate-800">
                      No orders match your filter criteria
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto font-serif">
                      Try clearing your search query or switching filters to view all orders.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setOrderSearch('')
                        setStatusFilter('ALL')
                        setFormatFilter('ALL')
                      }}
                      className="px-4 py-2 bg-slate-900 text-white text-xs rounded-xl font-serif hover:bg-slate-800"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => {
                      const isPending = order.status === 'PENDING_VERIFICATION'
                      const isConfirmed = order.status === 'PAYMENT_CONFIRMED'
                      const isFulfilled = order.status === 'FULFILLED'

                      return (
                        <div
                          key={order.id}
                          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col xl:flex-row xl:items-center justify-between gap-6"
                        >
                          <div className="space-y-3 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                                {order.id}
                              </span>

                              <span className="text-[11px] text-slate-500 font-serif">
                                {new Date(order.createdAt).toLocaleDateString()} at{' '}
                                {new Date(order.createdAt).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>

                              {isPending && (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
                                  <Clock className="w-3 h-3 text-amber-600" />
                                  Awaiting Bank Check
                                </span>
                              )}
                              {isConfirmed && (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-900 border border-sky-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
                                  <CheckCircle2 className="w-3 h-3 text-sky-600" />
                                  Payment Confirmed
                                </span>
                              )}
                              {isFulfilled && (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  Completed
                                </span>
                              )}

                              <span
                                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded font-mono ${
                                  order.format === 'paperback'
                                    ? 'bg-amber-100/70 text-amber-950 border border-amber-300'
                                    : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                                }`}
                              >
                                {order.format === 'paperback' ? 'Paperback' : 'E-Book'}
                              </span>
                            </div>

                            <div>
                              <h4 className="font-serif text-base font-bold text-slate-900">
                                {order.bookTitle}{' '}
                                <span className="text-xs text-slate-500 font-normal">by {order.bookAuthor}</span>
                              </h4>
                              <div className="text-xs text-slate-600 mt-0.5">
                                Quantity: <strong>{order.quantity}</strong> • Total Price:{' '}
                                <strong className="text-slate-900 font-mono">${order.totalAmount.toFixed(2)}</strong>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Customer</span>
                                <div className="font-semibold text-slate-800">{order.buyerName}</div>
                                <div className="text-slate-500 font-mono text-[11px]">{order.buyerEmail}</div>
                                {order.buyerPhone && (
                                  <div className="text-slate-500 font-mono text-[11px]">{order.buyerPhone}</div>
                                )}
                              </div>

                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                                  Payment Method
                                </span>
                                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                                  {order.paymentMethod === 'qr' ? (
                                    <>
                                      <QrCode className="w-3.5 h-3.5 text-amber-600" />
                                      <span>Bank QR (Fonepay)</span>
                                    </>
                                  ) : (
                                    <>
                                      <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>eSewa / Khalti</span>
                                    </>
                                  )}
                                </div>
                                <div className="text-slate-600 text-[11px] mt-0.5">
                                  Sender Name: <strong className="text-slate-900">{order.depositorName}</strong>
                                </div>
                              </div>

                              {order.shippingAddress && (
                                <div className="sm:col-span-2 pt-1 border-t border-slate-200/60 mt-1">
                                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                                    Shipping Delivery Address
                                  </span>
                                  <div className="text-slate-700 font-serif text-[11px]">{order.shippingAddress}</div>
                                </div>
                              )}

                              {order.trackingNumber && (
                                <div className="sm:col-span-2 pt-1 border-t border-slate-200/60 mt-1 text-emerald-800">
                                  <span className="text-[10px] uppercase font-bold text-emerald-600 block">
                                    Courier Tracking #
                                  </span>
                                  <div className="font-mono text-xs font-bold">{order.trackingNumber}</div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row xl:flex-col gap-2 shrink-0 justify-center border-t xl:border-t-0 xl:border-l border-slate-100 pt-3 xl:pt-0 xl:pl-6">
                            {isPending && (
                              <button
                                type="button"
                                onClick={() => handleVerifyPayment(order.id)}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-serif font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                                <span>Confirm Payment Received</span>
                              </button>
                            )}

                            {isConfirmed && order.format === 'paperback' && (
                              <button
                                type="button"
                                onClick={() => handleOpenTrackingModal(order)}
                                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-serif font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                              >
                                <Truck className="w-4 h-4 text-sky-200" />
                                <span>Mark Shipped &amp; Add Tracking</span>
                              </button>
                            )}

                            {isConfirmed && order.format === 'ebook' && (
                              <button
                                type="button"
                                onClick={() => setEmailModalOrder(order)}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-serif font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                              >
                                <Mail className="w-4 h-4 text-indigo-200" />
                                <span>Send E-Book Download Link</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => setSelectedReceiptOrder(order)}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-serif font-medium text-xs rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5"
                            >
                              <Receipt className="w-3.5 h-3.5 text-slate-600" />
                              <span>View Official Receipt</span>
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 2: BANK QR & PAYMENT GATEWAY SETUP                    */}
            {/* ========================================================= */}
            {activeTab === 'bank' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="pb-5 border-b border-slate-100">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold block mb-1">
                    Checkout Payment Display
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                    Publisher Bank Account, Fonepay QR &amp; Digital Wallets
                  </h3>
                  <p className="text-xs text-slate-500 font-serif mt-1">
                    Every change saved here updates the customer Checkout Modal immediately. Upload your QR code image directly from your computer so it never disappears on code updates.
                  </p>
                </div>

                <form onSubmit={handleSaveBankConfig} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Sanima Bank Info + QR Upload */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-sm border-b pb-2">
                      <Building2 className="w-4 h-4 text-amber-600" />
                      <span>Bank &amp; Fonepay QR Details</span>
                    </div>

                    <div>
                      <label className="block text-xs font-serif font-semibold text-slate-700 mb-1">
                        Official Bank Name
                      </label>
                      <input
                        type="text"
                        value={bankConfig.bankName}
                        onChange={(e) => setBankConfig({ ...bankConfig, bankName: e.target.value })}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-serif font-semibold text-slate-700 mb-1">
                        Bank Branch Name
                      </label>
                      <input
                        type="text"
                        value={bankConfig.branchName}
                        onChange={(e) => setBankConfig({ ...bankConfig, branchName: e.target.value })}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-serif font-semibold text-slate-700 mb-1">
                        Account Beneficiary Name (Account Holder)
                      </label>
                      <input
                        type="text"
                        value={bankConfig.accountName}
                        onChange={(e) => setBankConfig({ ...bankConfig, accountName: e.target.value })}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-serif font-semibold text-slate-700 mb-1">
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        value={bankConfig.accountNumber}
                        onChange={(e) => setBankConfig({ ...bankConfig, accountNumber: e.target.value })}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-serif font-semibold text-slate-700 mb-1">
                        Fonepay Merchant Terminal ID
                      </label>
                      <input
                        type="text"
                        value={bankConfig.fonepayTerminalId}
                        onChange={(e) => setBankConfig({ ...bankConfig, fonepayTerminalId: e.target.value })}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  {/* Right: QR Image Upload + Wallets + Contact */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-sm border-b pb-2">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span>QR Code Image &amp; Digital Wallets</span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <label className="block text-xs font-serif font-bold text-slate-700">
                        Bank / Fonepay QR Code Image
                      </label>
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-24 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                          {bankConfig.qrImageUrl ? (
                            <img
                              src={bankConfig.qrImageUrl}
                              alt="Bank QR Preview"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <QrCode className="w-8 h-8 text-slate-300" />
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={bankConfig.qrImageUrl}
                            onChange={(e) => setBankConfig({ ...bankConfig, qrImageUrl: e.target.value })}
                            placeholder="/fonepay-qr.jpg or upload QR below"
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-mono"
                          />
                          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-serif font-bold rounded-lg transition-colors">
                            <Upload className="w-3.5 h-3.5 text-amber-300" />
                            <span>{qrUploading ? 'Uploading QR...' : 'Upload QR Image File'}</span>
                            <input type="file" accept="image/*" onChange={handleQrFileUpload} className="hidden" />
                          </label>
                          {qrUploadError && <p className="text-[11px] text-rose-600">{qrUploadError}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-serif font-semibold text-slate-700 mb-1">
                          eSewa Registered Mobile Number
                        </label>
                        <input
                          type="text"
                          value={bankConfig.esewaNumber}
                          onChange={(e) => setBankConfig({ ...bankConfig, esewaNumber: e.target.value })}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-serif font-semibold text-slate-700 mb-1">
                          Khalti Registered Mobile Number
                        </label>
                        <input
                          type="text"
                          value={bankConfig.khaltiNumber}
                          onChange={(e) => setBankConfig({ ...bankConfig, khaltiNumber: e.target.value })}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-serif font-semibold text-slate-700 mb-1">
                          Publisher Contact Phone
                        </label>
                        <input
                          type="text"
                          value={bankConfig.contactPhone}
                          onChange={(e) => setBankConfig({ ...bankConfig, contactPhone: e.target.value })}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-serif font-semibold text-slate-700 mb-1">
                          Publisher Contact Email
                        </label>
                        <input
                          type="email"
                          value={bankConfig.contactEmail}
                          onChange={(e) => setBankConfig({ ...bankConfig, contactEmail: e.target.value })}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex items-center gap-3">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-serif font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                      >
                        <Save className="w-4 h-4 text-amber-400" />
                        <span>Save Bank &amp; QR Settings</span>
                      </button>
                      {bankSavedMessage && (
                        <span className="text-xs text-emerald-600 font-serif font-bold inline-flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Saved live!
                        </span>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 3: FEATURED BOOKS (3D SHOWCASE CAROUSEL)              */}
            {/* ========================================================= */}
            {activeTab === 'featured-books' && (
              <FeaturedBooksEditor
                content={content}
                onSave={handleSaveSiteContent}
                isSaving={isSavingContent}
              />
            )}

            {/* ========================================================= */}
            {/* TAB 4: FEATURED THIS MONTH & HOMEPAGE BANNERS             */}
            {/* ========================================================= */}
            {activeTab === 'monthly' && (
              <MonthlySpotlightEditor
                content={content}
                onSave={handleSaveSiteContent}
                isSaving={isSavingContent}
              />
            )}

            {/* ========================================================= */}
            {/* TAB 5: EXPLORE OUR LIBRARY (FULL CATALOG)                 */}
            {/* ========================================================= */}
            {activeTab === 'library' && (
              <LibraryCatalogEditor
                content={content}
                onSave={handleSaveSiteContent}
                isSaving={isSavingContent}
              />
            )}

            {/* ========================================================= */}
            {/* TAB 6: ARTICLES & ESSAYS                                  */}
            {/* ========================================================= */}
            {activeTab === 'articles' && (
              <ArticlesEditor
                content={content}
                onSave={handleSaveSiteContent}
                isSaving={isSavingContent}
              />
            )}

            {/* ========================================================= */}
            {/* TAB 7: EVENTS & HOMEPAGE POPUP                            */}
            {/* ========================================================= */}
            {activeTab === 'events' && (
              <EventsAndPopupEditor
                content={content}
                onSave={handleSaveSiteContent}
                isSaving={isSavingContent}
                popupActive={popupActive}
                setPopupActive={setPopupActive}
                popupTitle={popupTitle}
                setPopupTitle={setPopupTitle}
                popupSubtitle={popupSubtitle}
                setPopupSubtitle={setPopupSubtitle}
                popupDate={popupDate}
                setPopupDate={setPopupDate}
                popupVenue={popupVenue}
                setPopupVenue={setPopupVenue}
                onSavePopup={handleSavePopupConfig}
              />
            )}

            {/* ========================================================= */}
            {/* TAB 8: COMMUNITY TESTIMONIALS & ABOUT US PAGE             */}
            {/* ========================================================= */}
            {activeTab === 'community' && (
              <CommunityAboutEditor
                content={content}
                onSave={handleSaveSiteContent}
                isSaving={isSavingContent}
              />
            )}

            {/* ========================================================= */}
            {/* TAB 9: STAFF QUICK GUIDE                                  */}
            {/* ========================================================= */}
            {activeTab === 'guide' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold block mb-1">
                    Administrator Handbook
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                    Simple 5-Step Guide for Any Publisher Administrator
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-serif max-w-2xl mt-1 leading-relaxed">
                    You never need to touch code or design files. Every editor keeps your bookstore&apos;s exact visual layout intact while letting you update books, articles, and payments cleanly.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center font-mono">
                      1
                    </div>
                    <h4 className="font-serif text-base font-bold text-slate-900">
                      Checking Incoming QR Payments
                    </h4>
                    <p className="text-xs text-slate-600 font-serif leading-relaxed">
                      When a reader pays by Bank QR or eSewa/Khalti, they submit their <strong>Sender Name</strong>. Confirm the deposit inside your bank or wallet app, then click <strong>Confirm Payment Received</strong> under Orders.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-sky-500 text-slate-950 font-bold text-sm flex items-center justify-center font-mono">
                      2
                    </div>
                    <h4 className="font-serif text-base font-bold text-slate-900">
                      Shipping Books &amp; Delivering E-Books
                    </h4>
                    <p className="text-xs text-slate-600 font-serif leading-relaxed">
                      Once verified, paperback orders show <strong>Mark Shipped &amp; Add Tracking</strong> and digital orders show <strong>Send E-Book Download Link</strong>. Print official receipts anytime with one click.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500 text-white font-bold text-sm flex items-center justify-center font-mono">
                      3
                    </div>
                    <h4 className="font-serif text-base font-bold text-slate-900">
                      Updating Books Without Changing Design
                    </h4>
                    <p className="text-xs text-slate-600 font-serif leading-relaxed">
                      Use <strong>Featured Books (3D)</strong> for the top 3D showcase, <strong>Featured This Month</strong> for the three spotlight cards, and <strong>Explore Our Library</strong> to add new titles, cover photos, and prices. Color swatches and fonts match the site automatically.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center font-mono">
                      4
                    </div>
                    <h4 className="font-serif text-base font-bold text-slate-900">
                      Publishing Articles, Events &amp; Reviews
                    </h4>
                    <p className="text-xs text-slate-600 font-serif leading-relaxed">
                      Write essays under <strong>Articles &amp; Essays</strong>, announce book fairs under <strong>Events &amp; Popups</strong>, and update reader endorsements or your story under <strong>Community &amp; About</strong>.
                    </p>
                  </div>

                  <div className="md:col-span-2 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-300 font-bold text-sm flex items-center justify-center font-mono">
                      5
                    </div>
                    <h4 className="font-serif text-base font-bold text-slate-900">
                      Safe Backups Before Hosting Updates
                    </h4>
                    <p className="text-xs text-slate-600 font-serif leading-relaxed">
                      Visit <strong>Backup &amp; Reset</strong> anytime to download a single JSON backup of all books, articles, and uploaded images. If you ever move servers or update cPanel files, you can restore everything in seconds.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0" />
                  <div>
                    <strong>Need Technical Support?</strong> Contact your website administrator anytime at{' '}
                    <strong>himpower2025@gmail.com</strong>.
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 10: BACKUP & RESET                                    */}
            {/* ========================================================= */}
            {activeTab === 'backup' && (
              <BackupRestorePanel
                content={content}
                onSave={handleSaveSiteContent}
                isSaving={isSavingContent}
              />
            )}
          </main>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL: OFFICIAL PRINTABLE RECEIPT DIALOG                  */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedReceiptOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-hidden">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] border border-slate-200 shadow-2xl flex flex-col overflow-hidden my-auto"
            >
              <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-amber-500/20 shrink-0">
                <div className="flex items-center gap-2.5">
                  <Receipt className="w-5 h-5 text-amber-400" />
                  <span className="font-serif font-bold text-sm">Official Sales Receipt / Invoice</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedReceiptOrder(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-800 font-sans flex-1">
                <div className="text-center border-b pb-4">
                  <h3 className="font-serif text-lg font-bold text-slate-900 uppercase tracking-wider">
                    Reformed Books House
                  </h3>
                  <p className="text-[11px] text-slate-500 font-serif">
                    Kathmandu, Nepal • {bankConfig.contactEmail}
                  </p>
                  <div className="mt-2 inline-block font-mono text-[11px] font-bold bg-slate-100 px-3 py-1 rounded-full">
                    RECEIPT #{selectedReceiptOrder.id}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[11px]">
                  <div>
                    <span className="text-slate-400 uppercase font-bold block">Billed To</span>
                    <strong className="text-slate-900 text-xs">{selectedReceiptOrder.buyerName}</strong>
                    <div className="text-slate-500 font-mono">{selectedReceiptOrder.buyerEmail}</div>
                    {selectedReceiptOrder.buyerPhone && (
                      <div className="text-slate-500 font-mono">{selectedReceiptOrder.buyerPhone}</div>
                    )}
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase font-bold block">Order Date</span>
                    <div className="text-slate-700">
                      {new Date(selectedReceiptOrder.createdAt).toLocaleDateString()}
                    </div>
                    <span className="text-slate-400 uppercase font-bold block mt-1">Payment Method</span>
                    <div className="font-semibold text-slate-800">
                      {selectedReceiptOrder.paymentMethod === 'qr' ? 'Bank QR (Fonepay)' : 'eSewa / Khalti'}
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-serif text-slate-600">
                      <tr>
                        <th className="p-2.5">Item Description</th>
                        <th className="p-2.5 text-center">Format</th>
                        <th className="p-2.5 text-center">Qty</th>
                        <th className="p-2.5 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      <tr>
                        <td className="p-2.5 font-sans font-medium text-slate-900">
                          {selectedReceiptOrder.bookTitle}
                        </td>
                        <td className="p-2.5 text-center text-slate-600 capitalize">
                          {selectedReceiptOrder.format}
                        </td>
                        <td className="p-2.5 text-center text-slate-600">{selectedReceiptOrder.quantity}</td>
                        <td className="p-2.5 text-right font-bold text-slate-900">
                          ${selectedReceiptOrder.totalAmount.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-slate-50 font-mono font-bold text-slate-900 border-t border-slate-200">
                      <tr>
                        <td colSpan={3} className="p-2.5 text-right font-serif">
                          Total Paid:
                        </td>
                        <td className="p-2.5 text-right text-sm text-emerald-700">
                          ${selectedReceiptOrder.totalAmount.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {selectedReceiptOrder.shippingAddress && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px]">
                    <span className="text-slate-400 uppercase font-bold block">Shipping Address</span>
                    <div className="text-slate-700 font-serif">{selectedReceiptOrder.shippingAddress}</div>
                  </div>
                )}

                <div className="text-center text-[10px] text-slate-400 pt-2 border-t font-serif">
                  Thank you for supporting historic theological literature!
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedReceiptOrder(null)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-serif text-xs hover:bg-slate-300 transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl font-serif text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: COURIER TRACKING DIALOG                            */}
      {/* ========================================================= */}
      <AnimatePresence>
        {trackingModalOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-hidden">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4 my-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-sm">
                  <Truck className="w-5 h-5 text-sky-600" />
                  <span>Dispatch Physical Paperback</span>
                </div>
                <button
                  type="button"
                  onClick={() => setTrackingModalOrder(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <div>
                  Order: <strong className="text-slate-900">{trackingModalOrder.id}</strong>
                </div>
                <div>
                  Recipient: <strong className="text-slate-900">{trackingModalOrder.buyerName}</strong>
                </div>
                <div>
                  Destination: <span className="font-serif text-slate-700">{trackingModalOrder.shippingAddress}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif font-semibold text-slate-700 mb-1.5">
                  Courier Name &amp; Tracking Number
                </label>
                <input
                  type="text"
                  value={inputTrackingNumber}
                  onChange={(e) => setInputTrackingNumber(e.target.value)}
                  placeholder="e.g. Kathmandu Courier NP-EXP-8841"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTrackingModalOrder(null)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl font-serif"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmShipping}
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-serif font-bold rounded-xl shadow flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Dispatch</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: E-BOOK DOWNLOAD EMAIL DIALOG                       */}
      {/* ========================================================= */}
      <AnimatePresence>
        {emailModalOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-hidden">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4 my-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-sm">
                  <Mail className="w-5 h-5 text-indigo-600" />
                  <span>Send E-Book Download Email</span>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailModalOrder(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs font-serif space-y-2 text-slate-700">
                <div className="font-bold text-slate-900">Email Preview to: {emailModalOrder.buyerEmail}</div>
                <p className="leading-relaxed">
                  &quot;Dear {emailModalOrder.buyerName}, thank you for your order of{' '}
                  <strong>{emailModalOrder.bookTitle}</strong>. Your payment via{' '}
                  {emailModalOrder.paymentMethod === 'qr' ? 'Bank QR' : 'eSewa / Khalti'} has been verified. You can now download your official DRM-free PDF and EPUB files below.&quot;
                </p>
                <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-indigo-700 break-all">
                  https://reformedbooks.com/download/{emailModalOrder.id}?key=rbh_secure_8831
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEmailModalOrder(null)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl font-serif"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleFulfillEbook(emailModalOrder)}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-serif font-bold rounded-xl shadow flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Download Link &amp; Complete</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
