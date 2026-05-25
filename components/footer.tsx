import Link from 'next/link'
import { Instagram, Facebook, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-serif font-bold">Wisdom Press</h3>
              <p className="text-sm text-neutral-600 mt-2">
                Publishing thoughtful works on faith, theology, and reformed worldview.
              </p>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif font-bold text-neutral-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/books" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif font-bold text-neutral-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/submissions" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Author Submissions
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-serif font-bold text-neutral-900 mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-neutral-100 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-neutral-100 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-neutral-100 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-neutral-100 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/privacy" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Cookie Policy
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-sm text-neutral-600">
              © {currentYear} Wisdom Press. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
