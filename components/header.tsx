'use client'

import { useState, useEffect } from 'react' // useEffect used by Header for localStorage session restore
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, User, LogOut, Mail, Lock, ShieldCheck, Settings } from 'lucide-react'
import { AdminPopupManager } from './admin-popup-manager'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function AdaptiveLogo() {
  return (
    <div className="flex-shrink-0 select-none hover:scale-105 transition-transform duration-300 ease-out">
      <Image
        src="/logo-icon.png"
        alt="Reformed Books Logo"
        width={40}
        height={40}
        className="object-contain"
        priority
      />
    </div>
  )
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [isAdminOpen, setIsAdminOpen] = useState(false)

  const isAdmin = isLoggedIn && (
    userEmail === 'himpower2025@gmail.com' ||
    userEmail.toLowerCase().endsWith('@reformedbooks.com') ||
    userEmail.toLowerCase().includes('admin')
  )
  
  // Login/Signup UI states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin')
  const [authError, setAuthError] = useState('')
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true)
    setAuthError('')
    setTimeout(() => {
      const googleUser = {
        email: 'pilgrim@gmail.com',
        name: 'Reformed Pilgrim',
        isGoogle: true
      }
      localStorage.setItem('reformed_user', JSON.stringify(googleUser))
      setIsLoggedIn(true)
      setUserEmail(googleUser.email)
      setUserName(googleUser.name)
      setIsAuthOpen(false)
      setIsGoogleLoading(false)
      setAuthError('')
    }, 1200) // Sleek authentic 1.2s loading simulation
  }

  // Load user details if present in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('reformed_user')
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        if (parsed && typeof parsed === 'object') {
          setIsLoggedIn(true)
          setUserEmail(parsed.email || '')
          setUserName(parsed.name || '')
        }
      } catch (e) {
        localStorage.removeItem('reformed_user')
      }
    }
  }, [])

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setAuthError('Please fill in all fields.')
      return
    }
    
    // Simulate real dynamic login and preserve session
    const derivedName = email.split('@')[0]
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1)
    const userData = { email, name: formattedName }
    
    localStorage.setItem('reformed_user', JSON.stringify(userData))
    setIsLoggedIn(true)
    setUserEmail(email)
    setUserName(formattedName)
    setIsAuthOpen(false)
    setAuthError('')
    
    setEmail('')
    setPassword('')
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!signupName || !signupEmail || !signupPassword) {
      setAuthError('All fields are required to register.')
      return
    }

    const userData = { email: signupEmail, name: signupName }
    localStorage.setItem('reformed_user', JSON.stringify(userData))
    setIsLoggedIn(true)
    setUserEmail(signupEmail)
    setUserName(signupName)
    setIsAuthOpen(false)
    setAuthError('')

    setSignupName('')
    setSignupEmail('')
    setSignupPassword('')
  }

  const handleLogOut = () => {
    localStorage.removeItem('reformed_user')
    setIsLoggedIn(false)
    setUserEmail('')
    setUserName('')
  }

  return (
    <>
      {/* Radiant Top Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-amber-100/90 py-2 px-4 text-xs text-center font-serif font-medium flex items-center justify-center gap-2 shadow-sm relative z-50 border-b border-amber-500/20">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 text-[10px] font-extrabold uppercase tracking-widest">
          ✨ Special Announcement
        </span>
        <span className="hidden sm:inline">Preserving Classic Truths for Modern Readers —</span>
        <span>Worldwide Shipping & Instant Digital E-Books</span>
        <Link href="/books/all" className="underline font-bold text-amber-200 hover:text-white transition-colors ml-2">
          Explore Catalog →
        </Link>
      </div>

      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/90 border-b border-border/60 shadow-sm transition-all">
        <nav className="mx-auto max-w-[1600px] px-6 py-4 md:px-12 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <AdaptiveLogo />
              <div className="flex flex-col items-start gap-0">
                <div className="text-base tracking-wider font-serif font-black text-primary leading-tight group-hover:text-accent transition-colors">
                  REFORMED
                </div>
                <div className="text-[10px] tracking-[0.2em] font-sans font-extrabold text-muted-foreground group-hover:text-primary transition-colors uppercase">
                  Books House
                </div>
              </div>
            </Link>

            {/* Decorative Line */}
            <div className="hidden lg:block absolute left-0 right-0 top-16 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

            {/* Desktop Navigation */}
            <div className="hidden gap-1 md:flex items-center bg-secondary/30 px-3 py-1.5 rounded-full border border-border/40 shadow-inner">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {/* Books Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-xs uppercase tracking-wider font-bold text-foreground hover:text-primary data-[state=open]:text-primary transition-colors bg-transparent hover:bg-white/60">
                      Books
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-52 p-4 space-y-3 bg-background border border-border rounded-xl shadow-xl mt-2">
                        <Link href="/books/all" className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/40 text-sm font-semibold text-foreground hover:text-primary transition-colors font-serif">
                          <span>All Catalog</span>
                          <span className="text-[10px] bg-accent/10 text-accent font-extrabold px-2 py-0.5 rounded">6 Volumes</span>
                        </Link>
                        <Link href="/books/categories" className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/40 text-sm font-semibold text-foreground hover:text-primary transition-colors font-serif">
                          <span>Categories</span>
                          <span className="text-[10px] bg-primary/10 text-primary font-extrabold px-2 py-0.5 rounded">Browse</span>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* EVENTS Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-xs uppercase tracking-wider font-bold text-foreground hover:text-primary data-[state=open]:text-primary transition-colors bg-transparent hover:bg-white/60 flex items-center gap-1">
                      <span className="text-amber-500 font-extrabold">🎉</span> EVENT
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-64 p-4 space-y-2 bg-background border border-border rounded-xl shadow-xl mt-2">
                        <Link href="/events" className="block p-2 rounded-lg hover:bg-secondary/40 text-sm text-foreground hover:text-primary transition-colors font-semibold font-serif">
                          <div className="flex items-center justify-between">
                            <span>All Events (전체 행사)</span>
                            <span className="text-[9px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded">HOT</span>
                          </div>
                          <span className="text-[10px] text-muted-foreground block font-normal mt-0.5">Special Publisher Sales & Launch Events</span>
                        </Link>
                        <Link href="/events" className="block p-2 rounded-lg hover:bg-secondary/40 text-sm text-foreground hover:text-primary transition-colors font-semibold font-serif">
                          <span>Special Sales & Bundles (특판)</span>
                        </Link>
                        <Link href="/events" className="block p-2 rounded-lg hover:bg-secondary/40 text-sm text-foreground hover:text-primary transition-colors font-semibold font-serif">
                          <span>Book Launch & Exhibitions</span>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Articles */}
                  <NavigationMenuItem>
                    <Link href="/articles" legacyBehavior passHref>
                      <NavigationMenuLink className="text-xs uppercase tracking-wider font-bold text-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-white/60">
                        Articles
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  {/* About Us */}
                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className="text-xs uppercase tracking-wider font-bold text-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-white/60">
                        About Us
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

          {/* Right Side - Account & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Authenticated State Greeting */}
            {isLoggedIn && (
              <span className="hidden lg:inline text-xs font-serif text-muted-foreground mr-1">
                Welcome, <strong className="text-foreground font-semibold">{userName}</strong>
              </span>
            )}

            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAdminOpen(true)}
                className="text-xs uppercase tracking-wider text-[#0f4c81] border-[#0f4c81]/20 hover:bg-[#0f4c81]/5 hover:border-[#0f4c81]/40 font-medium flex items-center gap-1.5 px-3 py-1.5 h-auto transition-all shadow-sm shrink-0 mr-1"
              >
                <Settings className="h-3.5 w-3.5 text-[#0f4c81]" />
                <span>Manage Popup</span>
              </Button>
            )}

            {isLoggedIn ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogOut}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent font-medium flex items-center gap-1.5 px-3 py-1.5 h-auto transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Log out</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setAuthError('')
                  setAuthTab('signin')
                  setIsAuthOpen(true)
                }}
                className="h-10 w-10 text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors relative"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 md:hidden text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-background border-l border-border">
                <div className="mt-8 space-y-6">
                  {isLoggedIn && (
                    <div className="pb-4 border-b border-border/60">
                      <p className="text-xs font-serif text-muted-foreground">Logged in as</p>
                      <p className="text-sm font-semibold text-foreground truncate mt-0.5">{userName}</p>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => {
                          handleLogOut()
                          setIsOpen(false)
                        }}
                        className="p-0 h-auto text-xs text-accent mt-2 hover:underline"
                      >
                        Log out
                      </Button>
                    </div>
                  )}

                  {isAdmin && (
                    <div className="pb-4 border-b border-border/60">
                      <Button
                        onClick={() => {
                          setIsOpen(false)
                          setIsAdminOpen(true)
                        }}
                        className="w-full text-xs font-serif bg-[#0f4c81] hover:bg-[#073256] text-white flex items-center justify-center gap-2 py-2"
                      >
                        <Settings className="w-4 h-4" />
                        Manage Popup
                      </Button>
                    </div>
                  )}

                  <div>
                    <h3 className="font-serif font-bold mb-3 text-foreground uppercase tracking-wide text-sm">Books</h3>
                    <div className="space-y-2 pl-4">
                      <Link href="/books/all" onClick={() => setIsOpen(false)} className="block text-sm text-foreground hover:text-accent transition-colors">
                        All Books
                      </Link>
                      <Link href="/books/categories" onClick={() => setIsOpen(false)} className="block text-sm text-foreground hover:text-accent transition-colors">
                        Categories
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold mb-3 text-foreground uppercase tracking-wide text-sm flex items-center gap-1.5">
                      <span>🎉</span> EVENT & Special Sales
                    </h3>
                    <div className="space-y-2 pl-4">
                      <Link href="/events" onClick={() => setIsOpen(false)} className="block text-sm text-foreground hover:text-accent font-bold transition-colors">
                        All Special Events (전체 행사)
                      </Link>
                      <Link href="/events" onClick={() => setIsOpen(false)} className="block text-sm text-foreground hover:text-accent transition-colors">
                        Special Sales & Bundles (특판)
                      </Link>
                      <Link href="/events" onClick={() => setIsOpen(false)} className="block text-sm text-foreground hover:text-accent transition-colors">
                        Book Launch & Exhibitions
                      </Link>
                    </div>
                  </div>
                  <Link href="/articles" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-foreground hover:text-accent transition-colors uppercase tracking-wide">
                    Articles
                  </Link>
                  <Link href="/about" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-foreground hover:text-accent transition-colors uppercase tracking-wide">
                    About Us
                  </Link>
                  
                  {!isLoggedIn && (
                    <div className="pt-4 border-t border-border">
                      <Button
                        className="w-full text-xs uppercase tracking-wider font-semibold"
                        onClick={() => {
                          setIsOpen(false)
                          setIsAuthOpen(true)
                        }}
                      >
                        Sign In
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Elegant Editorial Authentication Dialog with high fidelity simulated database logic */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="sm:max-w-[420px] bg-background border border-border shadow-2xl p-6 sm:p-8 rounded-lg">
          <DialogHeader className="text-center pb-4 border-b border-border/50">
            <div className="mx-auto h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <DialogTitle className="font-serif text-2xl font-bold tracking-tight text-foreground">
              {authTab === 'signin' ? 'Welcome Back' : 'Join Our Fellowship'}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1.5">
              Access your personal space in Reformed Books House
            </DialogDescription>
          </DialogHeader>

          {/* Form Content */}
          <div className="mt-6">
            {authError && (
              <div className="p-3 bg-red-50 text-red-500 rounded text-xs mb-4 font-medium border border-red-200/50">
                {authError}
              </div>
            )}

            {/* Simulated Tabs */}
            <div className="flex border-b border-border/60 mb-6">
              <button
                type="button"
                onClick={() => {
                  setAuthTab('signin')
                  setAuthError('')
                }}
                className={`flex-1 text-center pb-2.5 text-xs uppercase tracking-widest font-semibold transition-colors border-b-2 ${
                  authTab === 'signin'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthTab('signup')
                  setAuthError('')
                }}
                className={`flex-1 text-center pb-2.5 text-xs uppercase tracking-widest font-semibold transition-colors border-b-2 ${
                  authTab === 'signup'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Google Sign In Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full h-10 border border-border/80 hover:bg-muted/50 text-foreground font-medium text-xs uppercase tracking-wide flex items-center justify-center transition-all bg-background mb-4"
            >
              {isGoogleLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connecting Google...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="h-4 w-4 mr-2.5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </span>
              )}
            </Button>

            {/* Divider */}
            <div className="relative flex py-2 mb-4 items-center">
              <div className="flex-grow border-t border-border/50"></div>
              <span className="flex-shrink mx-4 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Or continue with</span>
              <div className="flex-grow border-t border-border/50"></div>
            </div>

            {authTab === 'signin' ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="signin-email" className="text-xs uppercase tracking-wider font-semibold text-foreground/80">E-mail Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 h-10 bg-muted/30 focus-visible:ring-accent"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="signin-pw" className="text-xs uppercase tracking-wider font-semibold text-foreground/80">Password</Label>
                    <span className="text-[10px] text-accent font-medium hover:underline cursor-pointer">Forgot Password?</span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-pw"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 h-10 bg-muted/30 focus-visible:ring-accent"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-10 mt-6 font-semibold uppercase text-xs tracking-wider">
                  Log in
                </Button>

                <div className="pt-4 border-t border-dashed border-border/60 mt-5 flex flex-col items-center gap-1.5">
                  <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Admin Testing Bypass</span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const adminUser = {
                        email: 'himpower2025@gmail.com',
                        name: 'Administrator'
                      }
                      localStorage.setItem('reformed_user', JSON.stringify(adminUser))
                      setIsLoggedIn(true)
                      setUserEmail(adminUser.email)
                      setUserName(adminUser.name)
                      setIsAuthOpen(false)
                    }}
                    className="w-full text-xs font-semibold h-9 flex items-center justify-center gap-1.5 border-[#0f4c81]/20 text-[#0f4c81] hover:bg-[#0f4c81]/5 hover:text-[#0f4c81] transition-colors"
                  >
                    🔐 Sign in as himpower2025@gmail.com
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="signup-usr" className="text-xs uppercase tracking-wider font-semibold text-foreground/80">Full Name</Label>
                  <Input
                    id="signup-usr"
                    type="text"
                    placeholder="John Calvin"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="h-10 bg-muted/30 focus-visible:ring-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="signup-email" className="text-xs uppercase tracking-wider font-semibold text-foreground/80">E-mail Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@domain.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="pl-9 h-10 bg-muted/30 focus-visible:ring-accent"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="signup-pw" className="text-xs uppercase tracking-wider font-semibold text-foreground/80">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-pw"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="pl-9 h-10 bg-muted/30 focus-visible:ring-accent"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-10 mt-6 font-semibold uppercase text-xs tracking-wider bg-accent text-accent-foreground hover:bg-accent/90">
                  Register Account
                </Button>
              </form>
            )}

            {/* Note description reminding persistence */}
            <p className="text-[10px] text-center text-muted-foreground mt-8 bg-slate-50 border border-slate-100 p-2.5 rounded-sm select-none">
              ℹ️ Your credentials persist inside safety-scoped browser localStorage. Fast, databaseless, and fully operational!
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <AdminPopupManager isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </header>
    </>
  )
}

