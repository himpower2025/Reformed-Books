'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Lock, 
  Building2, 
  Copy, 
  Check, 
  ShieldCheck, 
  BookOpen, 
  Truck, 
  Sparkles, 
  X, 
  ArrowRight,
  Download,
  Receipt,
  Smartphone
} from 'lucide-react'
import { Book } from '@/lib/db-data'

export interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  book: Book
  format: 'paperback' | 'ebook'
  quantity: number
  price: number
}

export function CheckoutModal({
  isOpen,
  onClose,
  book,
  format,
  quantity,
  price
}: CheckoutModalProps) {
  // Payment Method Tab: 'card' | 'qr' | 'esewa'
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr' | 'esewa'>('card')

  // Buyer Form State
  const [buyerName, setBuyerName] = useState('')
  const [buyerEmail, setBuyerEmail] = useState('')
  const [buyerPhone, setBuyerPhone] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')

  // Credit Card Form State
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardHolder, setCardHolder] = useState('')

  // Bank / QR State
  const [depositorName, setDepositorName] = useState('')
  const [copiedAccount, setCopiedAccount] = useState(false)

  // Status & Receipt State
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [orderId, setOrderId] = useState('')

  if (!isOpen) return null

  const subtotal = price * quantity
  const shippingFee = format === 'ebook' ? 0 : (subtotal > 30 ? 0 : 3.50)
  const totalAmount = subtotal + shippingFee

  // Copy Account Number
  const handleCopyAccount = () => {
    navigator.clipboard.writeText('123456-04-987654')
    setCopiedAccount(true)
    setTimeout(() => setCopiedAccount(false), 2000)
  }

  // Format Card Number (16 digits with spaces)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '')
    if (val.length > 16) val = val.slice(0, 16)
    const formatted = val.replace(/(\d{4})/g, '$1 ').trim()
    setCardNumber(formatted)
  }

  // Format Expiry MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '')
    if (val.length > 4) val = val.slice(0, 4)
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`
    }
    setCardExpiry(val)
  }

  // Submit Order / Process Payment
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!buyerName || !buyerEmail) {
      alert('Please fill in your name and email address.')
      return
    }

    if (format === 'paperback' && !shippingAddress) {
      alert('Please provide a valid shipping address for physical delivery.')
      return
    }

    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvc) {
        alert('Please fill in complete credit card details.')
        return
      }
    } else {
      if (!depositorName) {
        alert('Please enter the Depositor Name for bank transfer verification.')
        return
      }
    }

    setIsProcessing(true)

    // Simulate real PG API transaction response delay (1.5 seconds)
    setTimeout(() => {
      setIsProcessing(false)
      setOrderId(`RBH-${Date.now().toString().slice(-7)}`)
      setOrderCompleted(true)
    }, 1600)
  }

  const handleReset = () => {
    setOrderCompleted(false)
    setIsProcessing(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl max-w-2xl w-full border border-border shadow-2xl relative overflow-hidden my-8"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white relative flex items-center justify-between border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-extrabold block">
                Secure Checkout Gateway
              </span>
              <h2 className="font-serif text-xl font-bold text-white">
                Reformed Books House Order
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ORDER COMPLETED RECEIPT SCREEN */}
        {orderCompleted ? (
          <div className="p-8 md:p-10 text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {paymentMethod === 'card' ? 'Payment Approved' : 'Bank Transfer Registered'}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-3">
                Thank You for Your Order!
              </h3>
              <p className="text-xs text-muted-foreground font-serif mt-1">
                Order Number: <span className="font-mono font-bold text-primary">{orderId}</span>
              </p>
            </div>

            {/* Receipt Box */}
            <div className="bg-secondary/20 border border-border/70 rounded-2xl p-5 text-left font-serif text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="font-bold text-foreground flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-primary" /> Order Summary
                </span>
                <span className="text-muted-foreground font-mono">{new Date().toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-foreground">{book.title} ({format === 'paperback' ? 'Paperback' : 'E-book'})</span>
                <span className="font-mono font-bold">${subtotal.toFixed(2)}</span>
              </div>

              {format === 'paperback' && (
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Shipping Fee</span>
                  <span className="font-mono">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-base font-extrabold text-primary border-t border-border/50 pt-3">
                <span>Total Amount Paid</span>
                <span className="font-mono">${totalAmount.toFixed(2)}</span>
              </div>

              <div className="pt-2 text-[11px] text-muted-foreground border-t border-dashed border-border">
                <span className="font-bold text-foreground">Customer: </span>{buyerName} ({buyerEmail})
                {paymentMethod === 'qr' && (
                  <p className="mt-1 text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                    💡 <strong>Payment Instructions:</strong> Please transfer <strong>${totalAmount.toFixed(2)} (approx. {(totalAmount * 135).toLocaleString()} NRs)</strong> to KB / Himalayan Bank Account 123456-04-987654 (Account Name: Reformed Books House Ltd.) with Depositor Name <strong>[{depositorName}]</strong>. Your order will be fulfilled immediately upon verification.
                  </p>
                )}
                {format === 'ebook' && (
                  <p className="mt-1 text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200 flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                    Instant E-Book EPUB/PDF download link has been emailed to <strong>{buyerEmail}</strong>!
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 bg-primary text-primary-foreground font-serif text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-all shadow-md"
            >
              Close & Return to Catalog
            </button>
          </div>
        ) : (
          /* CHECKOUT FORM */
          <form onSubmit={handleSubmitOrder} className="p-6 md:p-8 space-y-6">
            
            {/* Item Preview */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/60">
              <img
                src={book.image}
                alt={book.title}
                className="w-14 h-20 object-cover rounded shadow border border-border"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-mono bg-primary/10 text-primary font-bold px-2 py-0.5 rounded">
                  {format === 'paperback' ? 'Paperback Physical Book' : 'Instant E-Book'}
                </span>
                <h4 className="font-serif text-sm font-bold text-foreground truncate mt-1">
                  {book.title}
                </h4>
                <p className="text-xs text-muted-foreground font-serif">
                  by {book.author} • Qty: {quantity}
                </p>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-muted-foreground block">Total</span>
                <span className="text-lg font-black text-primary">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Buyer Contact Information */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <span>1.</span> Customer & Delivery Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-serif text-muted-foreground mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-border rounded-xl text-xs font-serif text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-serif text-muted-foreground mb-1">
                    Email Address (For E-Book / Receipt Delivery) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@domain.com"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-border rounded-xl text-xs font-serif text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {format === 'paperback' && (
                <div>
                  <label className="block text-[11px] font-serif text-muted-foreground mb-1">
                    Shipping Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full street address, city, state, zip code"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-border rounded-xl text-xs font-serif text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}
            </div>

            {/* PAYMENT METHOD SELECTION TABS */}
            <div className="space-y-4 pt-2 border-t border-border/50">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <span>2.</span> Select Payment Method
              </h3>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {/* TAB 1: CREDIT CARD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border-2 transition-all text-left flex flex-col justify-between ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border/60 hover:border-primary/40 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <CreditCard className={`w-4 h-4 ${paymentMethod === 'card' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-[9px] font-mono bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded">
                      Global
                    </span>
                  </div>
                  <span className="font-serif text-xs font-bold text-foreground block">
                    Credit Card
                  </span>
                  <span className="text-[10px] text-muted-foreground font-serif">
                    Visa/Master/Himalayan PG
                  </span>
                </button>

                {/* TAB 2: BANK QR / TRANSFER */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('qr')}
                  className={`p-3.5 rounded-2xl border-2 transition-all text-left flex flex-col justify-between ${
                    paymentMethod === 'qr'
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border/60 hover:border-primary/40 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <QrCode className={`w-4 h-4 ${paymentMethod === 'qr' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-[9px] font-mono bg-amber-500/20 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                      Account
                    </span>
                  </div>
                  <span className="font-serif text-xs font-bold text-foreground block">
                    Bank QR / Wire
                  </span>
                  <span className="text-[10px] text-muted-foreground font-serif">
                    Fonepay / KB / Nabil
                  </span>
                </button>

                {/* TAB 3: NEPAL DIGITAL WALLET */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('esewa')}
                  className={`p-3.5 rounded-2xl border-2 transition-all text-left flex flex-col justify-between ${
                    paymentMethod === 'esewa'
                      ? 'border-emerald-600 bg-emerald-50 shadow-sm'
                      : 'border-border/60 hover:border-emerald-500/40 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Smartphone className={`w-4 h-4 ${paymentMethod === 'esewa' ? 'text-emerald-600' : 'text-muted-foreground'}`} />
                    <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Nepal Local
                    </span>
                  </div>
                  <span className="font-serif text-xs font-bold text-foreground block">
                    eSewa / Khalti
                  </span>
                  <span className="text-[10px] text-muted-foreground font-serif">
                    Nepal Direct Wallet
                  </span>
                </button>
              </div>

              {/* PAYMENT OPTION DETAILS */}
              {paymentMethod === 'card' ? (
                /* CREDIT CARD FORM */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-secondary/15 border border-border/70 space-y-3"
                >
                  <div>
                    <label className="block text-[11px] font-serif text-muted-foreground mb-1">
                      Card Number (16 Digits)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8892"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full px-3.5 py-2.5 bg-white border border-border rounded-xl text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary pl-10"
                      />
                      <CreditCard className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-serif text-muted-foreground mb-1">
                        Expiry Date (MM/YY)
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        className="w-full px-3.5 py-2.5 bg-white border border-border rounded-xl text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-serif text-muted-foreground mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3.5 py-2.5 bg-white border border-border rounded-xl text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-indigo-50/70 border border-indigo-200/60 rounded-xl text-[11px] font-serif text-indigo-950 flex items-start gap-2 mt-2">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Nepal & International Card Processing:</strong> Powered by Himalayan Bank Payment Gateway & 2Checkout / Stripe. Supports Visa, MasterCard, SCT, and American Express cards worldwide.
                    </div>
                  </div>
                </motion.div>
              ) : paymentMethod === 'esewa' ? (
                /* NEPAL WALLET (ESEWA / KHALTI) */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/30 space-y-4"
                >
                  <div className="p-4 rounded-xl bg-white border border-emerald-200 space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                      <span className="font-extrabold text-xs text-emerald-950 flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-emerald-600" /> Nepal Digital Wallet (eSewa / Khalti ID)
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        NPR ~ {(totalAmount * 135).toLocaleString()} NRs
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2.5 bg-emerald-50/80 rounded-lg border border-emerald-200">
                        <span className="text-[10px] text-emerald-700 block font-sans font-bold">eSewa Wallet ID</span>
                        <span className="font-bold text-foreground">9801234567</span>
                      </div>
                      <div className="p-2.5 bg-purple-50/80 rounded-lg border border-purple-200">
                        <span className="text-[10px] text-purple-700 block font-sans font-bold">Khalti Wallet ID</span>
                        <span className="font-bold text-foreground">9801234567</span>
                      </div>
                    </div>

                    <p className="text-[11px] font-serif text-muted-foreground">
                      Please transfer the total amount (approx. <strong>{(totalAmount * 135).toLocaleString()} NRs</strong>) to either eSewa or Khalti ID above and enter your sender name below.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-serif font-bold text-foreground mb-1">
                      Wallet ID / Sender Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ram Shrestha / 9801234567"
                      value={depositorName}
                      onChange={(e) => setDepositorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-border rounded-xl text-xs font-serif text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </motion.div>
              ) : (
                /* PUBLISHER QR & BANK TRANSFER INFO */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-white border border-amber-200 shadow-sm">
                    {/* Simulated QR Code Canvas */}
                    <div className="w-28 h-28 bg-slate-900 p-2 rounded-xl flex flex-col items-center justify-center shrink-0 border border-slate-800 text-white relative group">
                      {/* Generative QR visual pattern */}
                      <div className="w-full h-full bg-white p-1 rounded flex flex-col justify-between">
                        <div className="grid grid-cols-5 gap-0.5 w-full h-full">
                          {[...Array(25)].map((_, idx) => (
                            <div
                              key={idx}
                              className={`${
                                (idx % 2 === 0 || idx % 7 === 0 || idx < 5 || idx > 19)
                                  ? 'bg-slate-900'
                                  : 'bg-amber-500/40'
                              } rounded-[1px]`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-[8px] font-mono font-bold uppercase tracking-widest mt-1 text-amber-300">
                        SCAN TO PAY
                      </span>
                    </div>

                    <div className="flex-1 text-xs space-y-1.5 font-serif text-foreground">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-amber-700" />
                        <span className="font-extrabold text-amber-900">Reformed Books House Official Account</span>
                      </div>

                      <div className="bg-slate-900 text-white p-2.5 rounded-lg font-mono text-xs flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-amber-300 block font-sans">KB / Himalayan Bank (Fonepay)</span>
                          <span className="font-bold tracking-wider">123456-04-987654</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyAccount}
                          className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-[10px] font-bold flex items-center gap-1 font-sans transition-colors"
                        >
                          {copiedAccount ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedAccount ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <p className="text-[11px] text-muted-foreground leading-normal">
                        Account Holder: <strong>Reformed Books House Ltd.</strong> • Scan the QR code using your mobile banking or wallet app, or transfer directly via bank wire.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-serif font-bold text-foreground mb-1">
                      Depositor / Sender Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe / Account Holder Name"
                      value={depositorName}
                      onChange={(e) => setDepositorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-border rounded-xl text-xs font-serif text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Submit CTA */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-primary text-primary-foreground font-serif text-xs font-bold uppercase tracking-wider rounded-2xl hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-amber-300" />
                    <span>
                      {paymentMethod === 'card'
                        ? `Pay $${totalAmount.toFixed(2)} with Credit Card`
                        : `Submit Order $${totalAmount.toFixed(2)} (Bank Transfer)`}
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground mt-3 font-serif">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>256-Bit SSL Encrypted & PCI-DSS Certified Checkout</span>
              </div>
            </div>

          </form>
        )}
      </motion.div>
    </div>
  )
}
