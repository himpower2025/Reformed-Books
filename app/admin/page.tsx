'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  Phone,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  LogOut,
  RefreshCw,
  Eye,
  Edit3,
  Save,
  Check,
  AlertTriangle,
  QrCode,
  Smartphone,
  Receipt,
  Printer,
  X,
  Plus,
  Send,
  Sliders,
  DollarSign,
  FileText
} from 'lucide-react'
import { booksData, Book } from '@/lib/db-data'
import { 
  OrderRecord, 
  BankConfig, 
  getStoredOrders, 
  saveOrders, 
  updateOrderStatus, 
  getStoredBankConfig, 
  saveBankConfig, 
  DEFAULT_BANK_CONFIG 
} from '@/lib/admin-data'

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [loginInputEmail, setLoginInputEmail] = useState('')
  const [loginInputPassword, setLoginInputPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<'orders' | 'catalog' | 'popups' | 'bank' | 'guide'>('orders')

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

  // Catalog State
  const [booksList, setBooksList] = useState<Book[]>(booksData)
  const [editingBookId, setEditingBookId] = useState<string | null>(null)
  const [bookPriceEdit, setBookPriceEdit] = useState<number>(0)
  const [bookPagesEdit, setBookPagesEdit] = useState<number>(0)

  // Bank Info State
  const [bankConfig, setBankConfig] = useState<BankConfig>(DEFAULT_BANK_CONFIG)
  const [bankSavedMessage, setBankSavedMessage] = useState(false)

  // Popup Config State
  const [popupActive, setPopupActive] = useState(false)
  const [popupTitle, setPopupTitle] = useState("Writer's Workshop")
  const [popupSubtitle, setPopupSubtitle] = useState("Presented by Reformed Books House")
  const [popupDate, setPopupDate] = useState("Aug 2 (Sun) – Aug 4 (Tue), 2026")
  const [popupVenue, setPopupVenue] = useState("Happy Tree Cafe")
  const [popupSavedMessage, setPopupSavedMessage] = useState(false)

  // 1. Check Initial Authentication and Load Data
  useEffect(() => {
    // Check localStorage user session
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

    // Load initial orders
    setOrders(getStoredOrders())

    // Load bank config
    setBankConfig(getStoredBankConfig())

    // Load popup config
    try {
      const storedPopup = localStorage.getItem('reformed_books_popup_config')
      if (storedPopup) {
        const parsed = JSON.parse(storedPopup)
        setPopupActive(parsed.isActive ?? false)
        if (parsed.standard) {
          setPopupTitle(parsed.standard.title || "Writer's Workshop")
          setPopupSubtitle(parsed.standard.subtitle || "Presented by Reformed Books House")
          setPopupDate(parsed.standard.date || "Aug 2 (Sun) – Aug 4 (Tue), 2026")
          setPopupVenue(parsed.standard.venue || "Happy Tree Cafe")
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  // Handle Quick Admin Login (1-Click for publisher convenience)
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

  // Handle Manual Password Login
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
    setActionSuccessMessage(msg)
    setTimeout(() => setActionSuccessMessage(''), 4000)
  }

  // Order Actions
  const handleVerifyPayment = (orderId: string) => {
    const updated = updateOrderStatus(orderId, 'PAYMENT_CONFIRMED', {
      adminNotes: `Payment verified by ${adminEmail} on ${new Date().toLocaleDateString()}.`
    })
    setOrders(updated)
    triggerSuccess(`Order ${orderId} payment successfully verified!`)
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
    triggerSuccess(`Order ${trackingModalOrder.id} marked as SHIPPED with tracking ${inputTrackingNumber}!`)
  }

  const handleFulfillEbook = (order: OrderRecord) => {
    const updated = updateOrderStatus(order.id, 'FULFILLED', {
      adminNotes: `E-Book download link delivered to ${order.buyerEmail} on ${new Date().toLocaleDateString()}.`
    })
    setOrders(updated)
    setEmailModalOrder(null)
    triggerSuccess(`E-Book link for order ${order.id} sent to ${order.buyerEmail}!`)
  }

  // Save Bank Details
  const handleSaveBankConfig = (e: React.FormEvent) => {
    e.preventDefault()
    saveBankConfig(bankConfig)
    setBankSavedMessage(true)
    setTimeout(() => setBankSavedMessage(false), 3500)
    triggerSuccess("Publisher bank and payment details saved successfully!")
  }

  // Save Popup Details
  const handleSavePopupConfig = (e: React.FormEvent) => {
    e.preventDefault()
    const currentStored = localStorage.getItem('reformed_books_popup_config')
    let base = {}
    try {
      if (currentStored) base = JSON.parse(currentStored)
    } catch (err) {}

    const newConfig = {
      ...base,
      isActive: popupActive,
      mode: 'standard',
      standard: {
        title: popupTitle,
        subtitle: popupSubtitle,
        date: popupDate,
        scheduleNote: "3-Day Intensive Program",
        venue: popupVenue,
        venueNote: "Main Conference Hall",
        buttonText: "RSVP & Secure Your Spot",
        buttonLink: "/events"
      }
    }
    localStorage.setItem('reformed_books_popup_config', JSON.stringify(newConfig))
    setPopupSavedMessage(true)
    setTimeout(() => setPopupSavedMessage(false), 3500)
    triggerSuccess("Homepage event popup updated and live for visitors!")
  }

  // Catalog Book Edit
  const handleStartEditBook = (book: Book) => {
    setEditingBookId(book.id)
    setBookPriceEdit(book.price)
    setBookPagesEdit(book.paperPageNum || 200)
  }

  const handleSaveBookEdit = (bookId: string) => {
    setBooksList(prev => prev.map(b => {
      if (b.id === bookId) {
        return {
          ...b,
          price: Number(bookPriceEdit),
          paperPageNum: Number(bookPagesEdit)
        }
      }
      return b
    }))
    setEditingBookId(null)
    triggerSuccess(`Book details updated successfully!`)
  }

  // Filtered Orders Calculation
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.buyerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.buyerEmail.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.bookTitle.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.depositorName.toLowerCase().includes(orderSearch.toLowerCase())

    const matchesStatus = 
      statusFilter === 'ALL' ? true :
      statusFilter === 'PENDING' ? order.status === 'PENDING_VERIFICATION' :
      statusFilter === 'CONFIRMED' ? order.status === 'PAYMENT_CONFIRMED' :
      order.status === 'FULFILLED'

    const matchesFormat = 
      formatFilter === 'ALL' ? true : order.format === formatFilter

    return matchesSearch && matchesStatus && matchesFormat
  })

  // Urgent counts
  const pendingCount = orders.filter(o => o.status === 'PENDING_VERIFICATION').length
  const readyToShipCount = orders.filter(o => o.status === 'PAYMENT_CONFIRMED' && o.format === 'paperback').length
  const readyEbookCount = orders.filter(o => o.status === 'PAYMENT_CONFIRMED' && o.format === 'ebook').length
  const fulfilledCount = orders.filter(o => o.status === 'FULFILLED').length

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
          {/* Header Graphic */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white text-center border-b border-amber-500/20">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4 text-amber-300 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 block mb-1">
              Publisher Staff Portal
            </span>
            <h1 className="font-serif text-2xl font-bold text-white">
              Reformed Books House
            </h1>
            <p className="text-xs text-slate-300 mt-2 font-serif leading-relaxed">
              Sign in to manage reader orders, bank verification, book catalog, and homepage announcements.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Quick 1-Click Publisher Sign-in (Requested so any admin can easily test without hassle) */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-left">
              <span className="text-[11px] font-bold text-amber-950 block mb-1 uppercase tracking-wide">
                ⚡ Quick 1-Click Administrator Access
              </span>
              <p className="text-xs text-amber-900 mb-3 leading-relaxed">
                Log in instantly with your verified publisher account (<strong>himpower2025@gmail.com</strong>) without entering a password.
              </p>
              <button
                type="button"
                onClick={() => handleQuickLogin('himpower2025@gmail.com')}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 font-serif"
              >
                <ShieldCheck className="w-4 h-4 text-amber-200" />
                <span>Sign In as Publisher Executive (himpower2025@gmail.com)</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-border w-full" />
              <span className="bg-white px-3 text-[11px] text-muted-foreground uppercase tracking-widest">
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
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all font-mono"
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
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-serif font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                <span>Enter Admin Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 text-center border-t border-slate-100">
              <Link 
                href="/"
                className="text-xs text-muted-foreground hover:text-primary transition-colors font-serif underline inline-flex items-center gap-1"
              >
                <span>← Return to Public Bookstore</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  // ==========================================
  // VIEW: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-slate-950 text-white border-b border-amber-500/20 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Brand & Badge */}
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-white text-sm sm:text-base tracking-wide">
                    Reformed Books House
                  </span>
                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded-full uppercase border border-amber-400/30">
                    Admin Portal
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 hidden sm:block">
                  Calm & Intuitive Bookstore Management
                </div>
              </div>
            </Link>
          </div>

          {/* Quick External Actions & User Info */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">View Public Website</span>
              <span className="md:hidden">Website</span>
            </Link>

            <div className="hidden lg:flex items-center gap-2 border-l border-slate-800 pl-4 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Logged in: <strong className="text-white font-mono">{adminEmail}</strong></span>
            </div>

            <button
              onClick={handleLogout}
              className="text-xs text-rose-300 hover:text-white hover:bg-rose-950/60 px-3 py-1.5 rounded-lg border border-rose-900/60 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Action Success Message */}
      <AnimatePresence>
        {actionSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-900 text-emerald-100 border border-emerald-500 px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-serif font-medium"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{actionSuccessMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        
        {/* Welcome Hero & High-Level Summary */}
        <div className="mb-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-amber-500/20 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block mb-1">
              Daily Publisher Overview
            </span>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              Welcome back to your Admin Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-serif max-w-2xl leading-relaxed">
              Every section is designed to be crystal-clear and stress-free. Review customer payments below, ship pending orders, or update announcements with a single click.
            </p>

            {/* 4 Quick Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
              
              {/* Stat 1: Pending Check */}
              <div 
                onClick={() => { setActiveTab('orders'); setStatusFilter('PENDING'); }}
                className="bg-white/10 hover:bg-white/15 border border-amber-400/30 rounded-2xl p-4 cursor-pointer transition-all backdrop-blur-sm"
              >
                <div className="flex items-center justify-between text-amber-300 mb-1">
                  <span className="text-xs font-serif font-semibold">Needs Verification</span>
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  {pendingCount}
                </div>
                <div className="text-[11px] text-amber-200/80 mt-1">
                  Awaiting Bank QR check
                </div>
              </div>

              {/* Stat 2: Ready to Ship */}
              <div 
                onClick={() => { setActiveTab('orders'); setStatusFilter('CONFIRMED'); setFormatFilter('paperback'); }}
                className="bg-white/10 hover:bg-white/15 border border-sky-400/30 rounded-2xl p-4 cursor-pointer transition-all backdrop-blur-sm"
              >
                <div className="flex items-center justify-between text-sky-300 mb-1">
                  <span className="text-xs font-serif font-semibold">Ready to Ship</span>
                  <Truck className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  {readyToShipCount}
                </div>
                <div className="text-[11px] text-sky-200/80 mt-1">
                  Paperbacks paid & boxed
                </div>
              </div>

              {/* Stat 3: Ready E-Book Email */}
              <div 
                onClick={() => { setActiveTab('orders'); setStatusFilter('CONFIRMED'); setFormatFilter('ebook'); }}
                className="bg-white/10 hover:bg-white/15 border border-emerald-400/30 rounded-2xl p-4 cursor-pointer transition-all backdrop-blur-sm"
              >
                <div className="flex items-center justify-between text-emerald-300 mb-1">
                  <span className="text-xs font-serif font-semibold">E-Books to Deliver</span>
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  {readyEbookCount}
                </div>
                <div className="text-[11px] text-emerald-200/80 mt-1">
                  Send digital download link
                </div>
              </div>

              {/* Stat 4: Completed Orders */}
              <div 
                onClick={() => { setActiveTab('orders'); setStatusFilter('FULFILLED'); }}
                className="bg-white/10 hover:bg-white/15 border border-purple-400/30 rounded-2xl p-4 cursor-pointer transition-all backdrop-blur-sm"
              >
                <div className="flex items-center justify-between text-purple-300 mb-1">
                  <span className="text-xs font-serif font-semibold">Total Completed</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  {fulfilledCount}
                </div>
                <div className="text-[11px] text-purple-200/80 mt-1">
                  Successfully fulfilled
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Intuitive Tab Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none border-b border-slate-200">
          
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'orders'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white hover:bg-slate-200/70 text-slate-700 border border-slate-200'
            }`}
          >
            <Package className="w-4 h-4 text-amber-400" />
            <span>Orders & Fulfillment</span>
            {pendingCount > 0 && (
              <span className="bg-amber-500 text-slate-950 font-mono text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'catalog'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white hover:bg-slate-200/70 text-slate-700 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>Book Catalog & Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab('popups')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'popups'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white hover:bg-slate-200/70 text-slate-700 border border-slate-200'
            }`}
          >
            <BellRing className="w-4 h-4 text-emerald-400" />
            <span>Homepage Notice & Popup</span>
            <span className={`w-2 h-2 rounded-full ${popupActive ? 'bg-emerald-400' : 'bg-slate-400'}`} />
          </button>

          <button
            onClick={() => setActiveTab('bank')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'bank'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white hover:bg-slate-200/70 text-slate-700 border border-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4 text-amber-500" />
            <span>Bank QR & Payment Setup</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2.5 rounded-xl font-serif text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'guide'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white hover:bg-slate-200/70 text-slate-700 border border-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>Staff Quick Guide (How-To)</span>
          </button>

        </div>

        {/* ========================================================= */}
        {/* TAB 1: ORDERS & FULFILLMENT                                */}
        {/* ========================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Search and Filters Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Search Field */}
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

              {/* Status and Format Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-serif mr-1 text-[11px]">Filter by Status:</span>
                
                <button
                  onClick={() => setStatusFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    statusFilter === 'ALL'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({orders.length})
                </button>

                <button
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

            {/* Orders List */}
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
                  onClick={() => { setOrderSearch(''); setStatusFilter('ALL'); setFormatFilter('ALL'); }}
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
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                    >
                      {/* Left: Order Summary & Customer Info */}
                      <div className="space-y-3 flex-1">
                        
                        {/* Top Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                            {order.id}
                          </span>

                          <span className="text-[11px] text-slate-500 font-serif">
                            {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>

                          {/* Status Badge */}
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

                          {/* Book Format Badge */}
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded font-mono ${
                            order.format === 'paperback' 
                              ? 'bg-amber-100/70 text-amber-950 border border-amber-300' 
                              : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                          }`}>
                            {order.format === 'paperback' ? '📘 Paperback' : '📱 E-Book'}
                          </span>
                        </div>

                        {/* Title & Quantity */}
                        <div>
                          <h4 className="font-serif text-base font-bold text-slate-900">
                            {order.bookTitle} <span className="text-xs text-slate-500 font-normal">by {order.bookAuthor}</span>
                          </h4>
                          <div className="text-xs text-slate-600 mt-0.5">
                            Quantity: <strong>{order.quantity} copy</strong> • Total Price: <strong className="text-slate-900 font-mono">${order.totalAmount.toFixed(2)}</strong>
                          </div>
                        </div>

                        {/* Customer & Payment Reference */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Customer</span>
                            <div className="font-semibold text-slate-800">{order.buyerName}</div>
                            <div className="text-slate-500 font-mono text-[11px]">{order.buyerEmail}</div>
                            {order.buyerPhone && <div className="text-slate-500 font-mono text-[11px]">{order.buyerPhone}</div>}
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Payment Method</span>
                            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                              {order.paymentMethod === 'qr' ? (
                                <>
                                  <QrCode className="w-3.5 h-3.5 text-amber-600" />
                                  <span>Sanima Bank QR (Fonepay)</span>
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
                              <span className="text-[10px] uppercase font-bold text-slate-400 block">Shipping Delivery Address</span>
                              <div className="text-slate-700 font-serif text-[11px]">{order.shippingAddress}</div>
                            </div>
                          )}

                          {order.trackingNumber && (
                            <div className="sm:col-span-2 pt-1 border-t border-slate-200/60 mt-1 text-emerald-800">
                              <span className="text-[10px] uppercase font-bold text-emerald-600 block">Courier Tracking #</span>
                              <div className="font-mono text-xs font-bold">{order.trackingNumber}</div>
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Right: One-Click Admin Action Buttons */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 justify-center border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:pl-6">
                        
                        {/* Action 1: Verify Payment */}
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

                        {/* Action 2: Ship Paperback */}
                        {isConfirmed && order.format === 'paperback' && (
                          <button
                            type="button"
                            onClick={() => handleOpenTrackingModal(order)}
                            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-serif font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                          >
                            <Truck className="w-4 h-4 text-sky-200" />
                            <span>Mark Shipped & Add Tracking</span>
                          </button>
                        )}

                        {/* Action 3: Send E-Book Link */}
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

                        {/* Action 4: View Printable Official Receipt */}
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
        {/* TAB 2: BOOK CATALOG & INVENTORY                            */}
        {/* ========================================================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Publisher Book Catalog (6 Publications)
                </h3>
                <p className="text-xs text-slate-500 font-serif">
                  Easily adjust book retail prices, page numbers, and check public bookstore presentations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {booksList.map((book) => {
                const isEditing = editingBookId === book.id

                return (
                  <div 
                    key={book.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
                  >
                    <div className="p-5 space-y-3">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-28 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100 shadow-sm">
                          <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                            {book.category}
                          </span>
                          <h4 className="font-serif text-sm font-bold text-slate-900 line-clamp-2">
                            {book.title}
                          </h4>
                          <p className="text-xs text-slate-500 font-serif">
                            by {book.author}
                          </p>
                        </div>
                      </div>

                      {/* Details / Inline Edit Form */}
                      {isEditing ? (
                        <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2 mt-2">
                          <div className="flex items-center justify-between gap-2">
                            <label className="text-[11px] font-serif text-slate-700">Retail Price ($):</label>
                            <input
                              type="number"
                              step="0.01"
                              value={bookPriceEdit}
                              onChange={(e) => setBookPriceEdit(parseFloat(e.target.value) || 0)}
                              className="w-24 px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono text-right"
                            />
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <label className="text-[11px] font-serif text-slate-700">Paper Pages:</label>
                            <input
                              type="number"
                              value={bookPagesEdit}
                              onChange={(e) => setBookPagesEdit(parseInt(e.target.value) || 0)}
                              className="w-24 px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono text-right"
                            />
                          </div>
                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setEditingBookId(null)}
                              className="px-2.5 py-1 text-[11px] text-slate-600 hover:bg-slate-200 rounded"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveBookEdit(book.id)}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded flex items-center gap-1 shadow-sm"
                            >
                              <Save className="w-3 h-3" />
                              <span>Save Changes</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Retail Price</span>
                            <span className="font-mono text-sm font-bold text-slate-900">${book.price.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Page Count</span>
                            <span className="font-mono text-xs font-semibold text-slate-700">{book.paperPageNum || 240} Pages</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Inventory</span>
                            <span className="text-[11px] text-emerald-700 font-bold">In Stock</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Footer Actions */}
                    <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                      <Link
                        href={`/books/${book.id}`}
                        target="_blank"
                        className="text-slate-600 hover:text-slate-900 flex items-center gap-1 font-serif underline"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View on Live Store</span>
                      </Link>

                      {!isEditing && (
                        <button
                          type="button"
                          onClick={() => handleStartEditBook(book)}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 font-serif border border-slate-200 rounded-lg flex items-center gap-1 transition-all"
                        >
                          <Edit3 className="w-3 h-3 text-slate-500" />
                          <span>Edit Price</span>
                        </button>
                      )}
                    </div>

                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: HOMEPAGE NOTICE & EVENT POPUP                       */}
        {/* ========================================================= */}
        {activeTab === 'popups' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    Homepage Notice & Event Popup
                  </h3>
                  <p className="text-xs text-slate-500 font-serif">
                    When visitors enter the bookstore, display a polite, elegant event modal or seasonal announcement.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-serif font-bold text-slate-700">Popup Display:</span>
                  <button
                    type="button"
                    onClick={() => setPopupActive(!popupActive)}
                    className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-2 ${
                      popupActive
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${popupActive ? 'bg-white' : 'bg-slate-400'}`} />
                    <span>{popupActive ? 'ACTIVE (Showing to Visitors)' : 'DISABLED (Hidden)'}</span>
                  </button>
                </div>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleSavePopupConfig} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-serif font-semibold text-slate-700 mb-1">
                      Event or Announcement Headline
                    </label>
                    <input
                      type="text"
                      value={popupTitle}
                      onChange={(e) => setPopupTitle(e.target.value)}
                      placeholder="e.g. Writer's Workshop 2026"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-semibold text-slate-700 mb-1">
                      Subtitle / Host Description
                    </label>
                    <input
                      type="text"
                      value={popupSubtitle}
                      onChange={(e) => setPopupSubtitle(e.target.value)}
                      placeholder="e.g. Presented by Reformed Books House"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-semibold text-slate-700 mb-1">
                      Event Date & Schedule
                    </label>
                    <input
                      type="text"
                      value={popupDate}
                      onChange={(e) => setPopupDate(e.target.value)}
                      placeholder="e.g. Aug 2 (Sun) – Aug 4 (Tue), 2026"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-semibold text-slate-700 mb-1">
                      Location / Venue
                    </label>
                    <input
                      type="text"
                      value={popupVenue}
                      onChange={(e) => setPopupVenue(e.target.value)}
                      placeholder="e.g. Happy Tree Cafe, Main Conference Hall"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-serif font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                    >
                      <Save className="w-4 h-4 text-amber-400" />
                      <span>Save & Apply Notice</span>
                    </button>
                    {popupSavedMessage && (
                      <span className="text-xs text-emerald-600 font-serif font-bold ml-3 inline-flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Live on website!
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Live Preview Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-3 font-mono">
                      Live Visitor Preview
                    </span>

                    <div className="bg-[#faf8f5] border border-[#e8e2d5] rounded-xl p-5 shadow-sm space-y-3">
                      <div className="h-1 bg-[#0f4c81] rounded-full w-12" />
                      <div>
                        <span className="text-[10px] uppercase font-mono text-[#0f4c81] font-bold">
                          {popupSubtitle}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-slate-900">
                          {popupTitle}
                        </h4>
                      </div>

                      <div className="space-y-1 text-xs text-slate-600 font-serif">
                        <div className="flex items-center gap-1.5">
                          <span>📅</span>
                          <span>{popupDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span>📍</span>
                          <span>{popupVenue}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="w-full py-2 bg-[#0f4c81] text-white text-xs font-serif font-bold rounded-lg text-center shadow-sm">
                          RSVP & Secure Your Spot
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 mt-4 leading-relaxed font-serif">
                    💡 Visitors can click &quot;Do not show again today&quot; so it doesn&apos;t bother them continuously.
                  </div>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: PUBLISHER BANK & PAYMENT GATEWAY SETUP             */}
        {/* ========================================================= */}
        {activeTab === 'bank' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="pb-5 border-b border-slate-100">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Publisher Bank Accounts & Fonepay QR Details
                </h3>
                <p className="text-xs text-slate-500 font-serif">
                  These details are displayed in the customer Checkout Modal when readers select &quot;Bank QR &amp; Wire Transfer&quot; or &quot;eSewa / Khalti&quot;.
                </p>
              </div>

              <form onSubmit={handleSaveBankConfig} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                
                {/* Sanima Bank Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-sm border-b pb-2">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span>Sanima Bank &amp; Fonepay Details</span>
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
                      Bank Account Number (Account No.)
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

                {/* Digital Wallets Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-sm border-b pb-2">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>eSewa &amp; Khalti Wallet Info</span>
                  </div>

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

                  <div>
                    <label className="block text-xs font-serif font-semibold text-slate-700 mb-1">
                      Publisher Inquiries Contact Email
                    </label>
                    <input
                      type="email"
                      value={bankConfig.contactEmail}
                      onChange={(e) => setBankConfig({ ...bankConfig, contactEmail: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-serif font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                    >
                      <Save className="w-4 h-4 text-amber-400" />
                      <span>Save Bank Information</span>
                    </button>
                    {bankSavedMessage && (
                      <span className="text-xs text-emerald-600 font-serif font-bold ml-3 inline-flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Saved!
                      </span>
                    )}
                  </div>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: STAFF QUICK GUIDE (HOW-TO CHECKLIST)               */}
        {/* ========================================================= */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              <div className="border-b border-slate-100 pb-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold block mb-1">
                  Administrator Handbook
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Friendly 4-Step Guide for New Publisher Staff
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-serif max-w-2xl mt-1 leading-relaxed">
                  Welcome to Reformed Books House! You do not need technical programming experience to manage this bookstore. Here is how your daily workflow works:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Step 1 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center font-mono">
                    1
                  </div>
                  <h4 className="font-serif text-base font-bold text-slate-900">
                    Checking Incoming QR Payments
                  </h4>
                  <p className="text-xs text-slate-600 font-serif leading-relaxed">
                    When a reader scans the Fonepay QR code or sends money via Sanima Mobile Banking / eSewa, they provide their <strong>Depositor Name</strong> in the order. Open your Sanima Bank app or Fonepay Merchant app to verify that the amount arrived. Once confirmed, click <strong>&quot;Confirm Payment Received&quot;</strong> in the Orders tab.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-500 text-slate-950 font-bold text-sm flex items-center justify-center font-mono">
                    2
                  </div>
                  <h4 className="font-serif text-base font-bold text-slate-900">
                    Shipping Physical Paperbacks
                  </h4>
                  <p className="text-xs text-slate-600 font-serif leading-relaxed">
                    For physical books, pack the volume carefully with a bookmark. Hand it over to your courier (e.g. Kathmandu Courier Express). Click <strong>&quot;Mark Shipped &amp; Add Tracking&quot;</strong> to record the courier tracking number so the reader is informed.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500 text-white font-bold text-sm flex items-center justify-center font-mono">
                    3
                  </div>
                  <h4 className="font-serif text-base font-bold text-slate-900">
                    Fulfilling Digital E-Books
                  </h4>
                  <p className="text-xs text-slate-600 font-serif leading-relaxed">
                    When an E-Book order is paid, click <strong>&quot;Send E-Book Download Link&quot;</strong>. The system generates an official download greeting email that you can send directly to the buyer&apos;s email address with 1 click.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center font-mono">
                    4
                  </div>
                  <h4 className="font-serif text-base font-bold text-slate-900">
                    Publishing Notices &amp; Sales
                  </h4>
                  <p className="text-xs text-slate-600 font-serif leading-relaxed">
                    Whenever you hold a seminar, workshop, or holiday discount, visit the <strong>&quot;Homepage Notice &amp; Popup&quot;</strong> tab. Edit the title and date, turn the switch ON, and save. It immediately appears for all website visitors.
                  </p>
                </div>

              </div>

              {/* Support Contact */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0" />
                <div>
                  <strong>Need Technical Assistance?</strong> If you ever have a question about cPanel hosting, database updates, or payment configurations, contact your technical administrator or email <strong>himpower2025@gmail.com</strong>.
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* MODAL: OFFICIAL PRINTABLE RECEIPT DIALOG                   */}
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
              {/* Receipt Header */}
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

              {/* Printable Body */}
              <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-800 font-sans flex-1">
                <div className="text-center border-b pb-4">
                  <h3 className="font-serif text-lg font-bold text-slate-900 uppercase tracking-wider">
                    Reformed Books House
                  </h3>
                  <p className="text-[11px] text-slate-500 font-serif">
                    Kathmandu, Nepal • info@reformedbooks.com
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
                    {selectedReceiptOrder.buyerPhone && <div className="text-slate-500 font-mono">{selectedReceiptOrder.buyerPhone}</div>}
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase font-bold block">Order Date</span>
                    <div className="text-slate-700">{new Date(selectedReceiptOrder.createdAt).toLocaleDateString()}</div>
                    <span className="text-slate-400 uppercase font-bold block mt-1">Payment Method</span>
                    <div className="font-semibold text-slate-800">
                      {selectedReceiptOrder.paymentMethod === 'qr' ? 'Sanima Bank QR (Fonepay)' : 'eSewa / Khalti'}
                    </div>
                  </div>
                </div>

                {/* Line Items Table */}
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
                        <td className="p-2.5 text-center text-slate-600">
                          {selectedReceiptOrder.quantity}
                        </td>
                        <td className="p-2.5 text-right font-bold text-slate-900">
                          ${selectedReceiptOrder.totalAmount.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-slate-50 font-mono font-bold text-slate-900 border-t border-slate-200">
                      <tr>
                        <td colSpan={3} className="p-2.5 text-right font-serif">Total Paid:</td>
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

              {/* Receipt Footer */}
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
                <button onClick={() => setTrackingModalOrder(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <div>Order: <strong className="text-slate-900">{trackingModalOrder.id}</strong></div>
                <div>Recipient: <strong className="text-slate-900">{trackingModalOrder.buyerName}</strong></div>
                <div>Destination: <span className="font-serif text-slate-700">{trackingModalOrder.shippingAddress}</span></div>
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
                <button onClick={() => setEmailModalOrder(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs font-serif space-y-2 text-slate-700">
                <div className="font-bold text-slate-900">Email Preview to: {emailModalOrder.buyerEmail}</div>
                <p className="leading-relaxed">
                  &quot;Dear {emailModalOrder.buyerName}, thank you for your order of <strong>{emailModalOrder.bookTitle}</strong>. Your payment via {emailModalOrder.paymentMethod === 'qr' ? 'Sanima Bank QR' : 'eSewa'} has been verified. You can now download your official DRM-free PDF and EPUB files below.&quot;
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
