'use client'

import { useState } from 'react'
import Link from 'next/link'
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
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
      <nav className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-serif font-bold">W</div>
            <span className="hidden text-sm font-medium sm:inline">Wisdom Press</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden gap-1 md:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {/* Books Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Books
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-4 space-y-3">
                      <Link href="/books/all" className="block text-sm hover:text-blue-600">
                        All Books
                      </Link>
                      <Link href="/books/categories" className="block text-sm hover:text-blue-600">
                        Categories
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Our Thought Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Our Thought
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-4 space-y-3">
                      <Link href="/thought/christ-culture" className="block text-sm hover:text-blue-600">
                        Christ & Culture
                      </Link>
                      <Link href="/thought/reformed-worldview" className="block text-sm hover:text-blue-600">
                        Reformed Worldview
                      </Link>
                      <Link href="/thought/doctrine" className="block text-sm hover:text-blue-600">
                        Doctrine
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Articles */}
                <NavigationMenuItem>
                  <Link href="/articles" legacyBehavior passHref>
                    <NavigationMenuLink className="text-sm font-medium hover:text-blue-600">
                      Articles
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* About Us */}
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="text-sm font-medium hover:text-blue-600">
                      About Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side - Account & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 hover:bg-neutral-100"
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
                  className="h-10 w-10 md:hidden hover:bg-neutral-100"
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="font-serif font-bold mb-3">Books</h3>
                    <div className="space-y-2 pl-4">
                      <Link href="/books/all" className="block text-sm hover:text-blue-600">
                        All Books
                      </Link>
                      <Link href="/books/categories" className="block text-sm hover:text-blue-600">
                        Categories
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold mb-3">Our Thought</h3>
                    <div className="space-y-2 pl-4">
                      <Link href="/thought/christ-culture" className="block text-sm hover:text-blue-600">
                        Christ & Culture
                      </Link>
                      <Link href="/thought/reformed-worldview" className="block text-sm hover:text-blue-600">
                        Reformed Worldview
                      </Link>
                      <Link href="/thought/doctrine" className="block text-sm hover:text-blue-600">
                        Doctrine
                      </Link>
                    </div>
                  </div>
                  <Link href="/articles" className="block text-sm font-medium hover:text-blue-600">
                    Articles
                  </Link>
                  <Link href="/about" className="block text-sm font-medium hover:text-blue-600">
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
