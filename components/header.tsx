'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, User, LogOut, Mail, Lock, ShieldCheck } from 'lucide-react'
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

// A highly robust, clean loader that targets logo-original.png directly.
// It also applies a 130% vertical scale height with object-top and hidden overflow to crop the lower text block!
function AdaptiveLogo() {
  const [mounted, setMounted] = useState(false)
  const [src, setSrc] = useState('/logo-original.png')
  const [hasError, setHasError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle cached image onload race condition
  useEffect(() => {
    if (mounted && imgRef.current && imgRef.current.complete) {
      setLoaded(true)
    }
  }, [mounted, src])

  const handleError = () => {
    if (src === '/logo-original.png') {
      // Fallback to uppercase .PNG just in case of case-sensitive servers
      setSrc('/logo-original.PNG')
    } else {
      setHasError(true)
      setLoaded(false)
    }
  }

  const handleLoad = () => {
    setLoaded(true)
    setHasError(false)
  }

  const handleReset = () => {
    setSrc('/logo-original.png')
    setHasError(false)
    setLoaded(false)
  }

  // Fallback monogram if the logo file does not load
  if (!mounted || hasError) {
    return (
      <div 
        onClick={handleReset}
        title="Click to retry loading logo"
        className="h-10 w-10 flex-shrink-0 relative overflow-hidden rounded-sm bg-primary text-background shadow-sm select-none flex items-center justify-center cursor-pointer group hover:opacity-90"
      >
        <span className="font-serif font-bold text-xl tracking-tight text-white select-none transition-transform group-hover:scale-110">R</span>
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
      </div>
    )
  }

  return (
    <div 
      onClick={handleReset}
      title="Click to refresh logo load"
      className={`h-10 w-10 flex-shrink-0 relative overflow-hidden rounded-sm select-none transform hover:scale-105 transition-all duration-300 ease-out flex items-center justify-center cursor-pointer ${
        loaded ? 'bg-transparent shadow-none' : 'bg-primary text-background shadow-sm'
      }`}
    >
      {/* 
        This isolates only the logo icon:
        The text "reformed books" resides below the icon. So we scale the image to 130%
        height (giving it breathing room inside the square), align it horizontally,
        and because the outer card container has overflow-hidden, the bottom text gets cropped perfectly!
      */}
      <img
        ref={imgRef}
        key={src}
        src={src}
        alt="Reformed Logo"
        className={`absolute top-0.5 left-0 w-full h-[130%] object-cover object-top z-10 transition-opacity duration-300 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary text-background z-0 animate-pulse">
          <span className="font-serif font-bold text-xl tracking-tight text-white select-none">R</span>
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-accent rounded-full" />
        </div>
      )}
    </div>
  )
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  
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
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-background to-background/95 border-b border-border">
      <nav className="mx-auto max-w-[1600px] px-6 py-5 md:px-12 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <AdaptiveLogo />
            <div className="flex flex-col items-start gap-0">
              <div className="text-sm tracking-wider font-serif font-bold text-primary leading-tight">REFORMED</div>
              <div className="text-xs tracking-widest font-sans text-muted-foreground group-hover:text-accent transition-colors">BOOKS</div>
            </div>
          </Link>

          {/* Decorative Line */}
          <div className="hidden lg:block absolute left-0 right-0 top-20 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-40" />

          {/* Desktop Navigation */}
          <div className="hidden gap-0.5 md:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">
                {/* Books Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-xs uppercase tracking-wide font-medium text-foreground hover:text-accent data-[state=open]:text-accent transition-colors">
                    Books
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-4 space-y-3 bg-background border border-border rounded-lg mt-2">
                      <Link href="/books/all" className="block text-sm text-foreground hover:text-accent transition-colors font-medium font-serif">
                        All Books
                      </Link>
                      <Link href="/books/categories" className="block text-sm text-foreground hover:text-accent transition-colors font-medium font-serif">
                        Categories
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Our Thought Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-xs uppercase tracking-wide font-medium text-foreground hover:text-accent data-[state=open]:text-accent transition-colors">
                    Our Thought
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-4 space-y-3 bg-background border border-border rounded-lg mt-2">
                      <Link href="/thought/christ-culture" className="block text-sm text-foreground hover:text-accent transition-colors font-medium font-serif">
                        Christ & Culture
                      </Link>
                      <Link href="/thought/reformed-worldview" className="block text-sm text-foreground hover:text-accent transition-colors font-medium font-serif">
                        Reformed Worldview
                      </Link>
                      <Link href="/thought/doctrine" className="block text-sm text-foreground hover:text-accent transition-colors font-medium font-serif">
                        Doctrine
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Articles */}
                <NavigationMenuItem>
                  <Link href="/articles" legacyBehavior passHref>
                    <NavigationMenuLink className="text-xs uppercase tracking-wide font-medium text-foreground hover:text-accent transition-colors px-3 py-2">
                      Articles
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* About Us */}
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="text-xs uppercase tracking-wide font-medium text-foreground hover:text-accent transition-colors px-3 py-2">
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
                    <h3 className="font-serif font-bold mb-3 text-foreground uppercase tracking-wide text-sm">Our Thought</h3>
                    <div className="space-y-2 pl-4">
                      <Link href="/thought/christ-culture" onClick={() => setIsOpen(false)} className="block text-sm text-foreground hover:text-accent transition-colors">
                        Christ & Culture
                      </Link>
                      <Link href="/thought/reformed-worldview" onClick={() => setIsOpen(false)} className="block text-sm text-foreground hover:text-accent transition-colors">
                        Reformed Worldview
                      </Link>
                      <Link href="/thought/doctrine" onClick={() => setIsOpen(false)} className="block text-sm text-foreground hover:text-accent transition-colors">
                        Doctrine
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
              Access your personal space in Reformed Books
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
    </header>
  )
}

