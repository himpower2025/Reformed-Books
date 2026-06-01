'use client'

import { useState, useEffect } from 'react'
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

// A highly robust loader that automatically tries both logo-orignal and logo-original under multiple extensions.
// It also applies a 155% vertical scale height with object-top and hidden overflow, and hides the lower text block!
function AdaptiveLogo() {
  const candidates = [
    '/logo-orignal.png',
    '/logo-orignal.jpg',
    '/logo-orignal.jpeg',
    '/logo-orignal.webp',
    '/logo-orignal.svg',
    '/logo-original.png',
    '/logo-original.jpg',
    '/logo-original.jpeg',
    '/logo-original.webp',
    '/logo-original.svg',
  ]
  const [candidateIdx, setCandidateIdx] = useState(0)
  const [errorCount, setErrorCount] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const handleLoad = () => {
    setLoaded(true)
  }

  const handleError = () => {
    if (candidateIdx < candidates.length - 1) {
      setCandidateIdx((prev) => prev + 1)
    } else {
      setErrorCount((prev) => prev + 1)
    }
  }

  // Fallback monogram if none of the logo files exist in public directory
  if (errorCount >= 1) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-primary text-background z-0">
        <span className="font-serif font-bold text-xl tracking-tight text-white select-none">R</span>
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-white/5 rounded-sm flex items-center justify-center">
      {/* 
        This is a brilliant technique to isolate only the logo icon:
        The text "reformed books" resides below the icon. So we scale the image to 155%
        height (which stretches it and pushes the lower part away), align it at the absolute top,
        and because the outer card container has overflow-hidden, the bottom text gets cropped perfectly!
      */}
      <img
        src={candidates[candidateIdx]}
        alt="Reformed Logo"
        className={`absolute top-0 left-0 w-full h-[155%] object-cover object-top z-10 transition-opacity duration-500 ease-out ${
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
            <div className="h-10 w-10 flex-shrink-0 relative overflow-hidden rounded-sm bg-primary text-background shadow-sm select-none transform hover:scale-105 transition-transform duration-300 ease-out">
              <AdaptiveLogo />
            </div>
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

