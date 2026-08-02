import Link from 'next/link'
import { Youtube, Facebook, Instagram, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-white text-foreground">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 lg:px-16">
        {/* Footer Content */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <h3 className="text-base font-serif font-black text-primary uppercase tracking-wider flex items-center gap-2">
                <span>📖</span> Reformed Books House
              </h3>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed font-serif">
                Publishing transformative works on reformed theology, faith, and contemporary worldview with high aesthetic craftsmanship since 2026.
              </p>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif font-bold text-foreground mb-4 uppercase tracking-wide text-xs">Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/events" className="text-xs text-emerald-700 hover:text-primary font-extrabold transition-colors flex items-center gap-1">
                  <span>🎉</span> Special Events & Sales
                </Link>
              </li>
              <li>
                <Link href="/books/all" className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">
                  All Catalog
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">
                  Articles & Essays
                </Link>
              </li>
              <li>
                <Link href="/books/categories" className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif font-bold text-foreground mb-4 uppercase tracking-wide text-xs">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/submissions" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Author Submissions
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-serif font-bold text-foreground mb-4 uppercase tracking-wide text-xs">Connect</h4>
            <div className="flex gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex items-center justify-center h-9 w-9 rounded-sm border border-border text-foreground hover:border-accent hover:text-accent transition-all duration-300"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center justify-center h-9 w-9 rounded-sm border border-border text-foreground hover:border-accent hover:text-accent transition-all duration-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center h-9 w-9 rounded-sm border border-border text-foreground hover:border-accent hover:text-accent transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@reformedbooks.com"
                aria-label="Email"
                className="inline-flex items-center justify-center h-9 w-9 rounded-sm border border-border text-foreground hover:border-accent hover:text-accent transition-all duration-300"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Links */}
            <div className="flex flex-wrap gap-6 text-xs uppercase tracking-wider">
              <Link href="/privacy" className="text-muted-foreground hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-accent transition-colors">
                Cookie Policy
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              © {currentYear} Reformed Books House. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
