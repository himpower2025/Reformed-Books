'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, User } from 'lucide-react'
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

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-background to-background/95 border-b border-border">
      <nav className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Reformed Books Logo"
              width={40}
              height={40}
              className="h-10 w-auto group-hover:opacity-80 transition-opacity"
              priority
            />
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
                      <Link href="/books/all" className="block text-sm text-foreground hover:text-accent transition-colors font-medium">
                        All Books
                      </Link>
                      <Link href="/books/categories" className="block text-sm text-foreground hover:text-accent transition-colors font-medium">
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
                      <Link href="/thought/christ-culture" className="block text-sm text-foreground hover:text-accent transition-colors font-medium">
                        Christ & Culture
                      </Link>
                      <Link href="/thought/reformed-worldview" className="block text-sm text-foreground hover:text-accent transition-colors font-medium">
                        Reformed Worldview
                      </Link>
                      <Link href="/thought/doctrine" className="block text-sm text-foreground hover:text-accent transition-colors font-medium">
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
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Button>

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
                  <div>
                    <h3 className="font-serif font-bold mb-3 text-foreground uppercase tracking-wide text-sm">Books</h3>
                    <div className="space-y-2 pl-4">
                      <Link href="/books/all" className="block text-sm text-foreground hover:text-accent transition-colors">
                        All Books
                      </Link>
                      <Link href="/books/categories" className="block text-sm text-foreground hover:text-accent transition-colors">
                        Categories
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold mb-3 text-foreground uppercase tracking-wide text-sm">Our Thought</h3>
                    <div className="space-y-2 pl-4">
                      <Link href="/thought/christ-culture" className="block text-sm text-foreground hover:text-accent transition-colors">
                        Christ & Culture
                      </Link>
                      <Link href="/thought/reformed-worldview" className="block text-sm text-foreground hover:text-accent transition-colors">
                        Reformed Worldview
                      </Link>
                      <Link href="/thought/doctrine" className="block text-sm text-foreground hover:text-accent transition-colors">
                        Doctrine
                      </Link>
                    </div>
                  </div>
                  <Link href="/articles" className="block text-sm font-medium text-foreground hover:text-accent transition-colors uppercase tracking-wide">
                    Articles
                  </Link>
                  <Link href="/about" className="block text-sm font-medium text-foreground hover:text-accent transition-colors uppercase tracking-wide">
                    About Us
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
