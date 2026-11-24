import { Book, Article, EventItem, booksData, articlesData, eventsData, aboutData } from './db-data'

export type CarouselThemeId = 'emerald' | 'teal' | 'rose' | 'indigo' | 'violet' | 'amber'
export type MonthlyThemeId = 'sapphire' | 'emerald' | 'sunset' | 'violet' | 'navy' | 'amber'
export type EmblemType = 'shield' | 'leaves' | 'sunburst' | 'star' | 'lamp'

export interface CarouselThemePreset {
  id: CarouselThemeId
  label: string
  swatch: string
  coverColor: string
  accentColor: string
  textColor: string
}

export const CAROUSEL_THEMES: Record<CarouselThemeId, CarouselThemePreset> = {
  emerald: {
    id: 'emerald',
    label: 'Classic Emerald & Gold',
    swatch: '#064e3b',
    coverColor: 'bg-emerald-950 border-emerald-500/20',
    accentColor: 'text-amber-500/90',
    textColor: 'text-slate-100'
  },
  teal: {
    id: 'teal',
    label: 'Deep Forest Teal',
    swatch: '#142d25',
    coverColor: 'bg-[#142d25] border-teal-500/20',
    accentColor: 'text-teal-400',
    textColor: 'text-teal-50'
  },
  rose: {
    id: 'rose',
    label: 'Burgundy Crimson',
    swatch: '#4c0519',
    coverColor: 'bg-rose-950 border-rose-500/20',
    accentColor: 'text-amber-400',
    textColor: 'text-rose-50'
  },
  indigo: {
    id: 'indigo',
    label: 'Midnight Indigo',
    swatch: '#312e81',
    coverColor: 'bg-indigo-900 border-indigo-400/20',
    accentColor: 'text-amber-300',
    textColor: 'text-indigo-50'
  },
  violet: {
    id: 'violet',
    label: 'Royal Violet',
    swatch: '#2e1065',
    coverColor: 'bg-violet-950 border-violet-500/20',
    accentColor: 'text-cyan-400',
    textColor: 'text-violet-50'
  },
  amber: {
    id: 'amber',
    label: 'Heritage Walnut',
    swatch: '#451a03',
    coverColor: 'bg-amber-950 border-amber-500/20',
    accentColor: 'text-amber-300',
    textColor: 'text-amber-50'
  }
}

export interface MonthlyThemePreset {
  id: MonthlyThemeId
  label: string
  swatch: string
  color: string
  textColor: string
  accentColor: string
}

export const MONTHLY_THEMES: Record<MonthlyThemeId, MonthlyThemePreset> = {
  sapphire: {
    id: 'sapphire',
    label: 'Sapphire Blue',
    swatch: '#2563eb',
    color: 'from-blue-600 via-indigo-600 to-indigo-800 border-indigo-400/20',
    textColor: 'text-white',
    accentColor: 'text-amber-300'
  },
  emerald: {
    id: 'emerald',
    label: 'Emerald Teal',
    swatch: '#0d9488',
    color: 'from-emerald-500 via-teal-500 to-teal-700 border-teal-300/20',
    textColor: 'text-white',
    accentColor: 'text-emerald-200'
  },
  sunset: {
    id: 'sunset',
    label: 'Warm Sunset Rose',
    swatch: '#e11d48',
    color: 'from-orange-500 via-rose-500 to-pink-600 border-rose-400/20',
    textColor: 'text-white',
    accentColor: 'text-amber-200'
  },
  violet: {
    id: 'violet',
    label: 'Royal Amethyst',
    swatch: '#7c3aed',
    color: 'from-violet-600 via-purple-600 to-indigo-800 border-violet-400/20',
    textColor: 'text-white',
    accentColor: 'text-amber-200'
  },
  navy: {
    id: 'navy',
    label: 'Classic Slate Navy',
    swatch: '#1e293b',
    color: 'from-slate-800 via-slate-900 to-indigo-950 border-slate-500/20',
    textColor: 'text-white',
    accentColor: 'text-amber-300'
  },
  amber: {
    id: 'amber',
    label: 'Warm Gold & Ochre',
    swatch: '#d97706',
    color: 'from-amber-600 via-orange-600 to-amber-800 border-amber-400/20',
    textColor: 'text-white',
    accentColor: 'text-amber-100'
  }
}

export interface FeaturedCarouselBook {
  id: string
  title: string
  subtitle: string
  description: string
  author: string
  genre: string
  themeId: CarouselThemeId
  emblemType: EmblemType
  paperPageNum: number
  linkUrl?: string
}

export interface MonthlySpotlightBook {
  id: string
  linkedBookId: string
  title: string
  author: string
  genre: string
  themeId: MonthlyThemeId
  emblem: string
}

export interface StatItem {
  value: string
  label: string
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  avatar: string
  quote: string
  rating: number
  book: string
}

export interface HomeSectionsConfig {
  announcementBadge: string
  announcementText: string
  announcementSubtext: string
  announcementLinkText: string
  announcementLinkHref: string
  featuredBooksEyebrow: string
  featuredBooksHeading: string
  stats: StatItem[]
  monthlyEyebrow: string
  monthlyHeading: string
  monthlyDescription: string
  manifestoLabel: string
  manifestoQuote: string
  manifestoAuthor: string
  libraryEyebrow: string
  libraryHeading: string
  libraryDescription: string
}

export interface AboutContent {
  heroEyebrow: string
  heroTitle: string
  heroQuote: string
  vision: string
  mission: string
  values: { title: string; desc: string }[]
  story: string
  storyHighlight: string
}

export interface ManagedBook extends Book {
  sampleExcerpt?: string
  isbn?: string
  inStock?: boolean
}

export interface SiteContent {
  featuredBooks: FeaturedCarouselBook[]
  featuredThisMonth: MonthlySpotlightBook[]
  books: ManagedBook[]
  articles: Article[]
  events: EventItem[]
  testimonials: TestimonialItem[]
  homeSections: HomeSectionsConfig
  about: AboutContent
  updatedAt: string
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  featuredBooks: [
    {
      id: 'fb-1',
      title: 'Reformed Theology',
      subtitle: 'A Comprehensive Exploration of Sovereign Grace',
      description: "Reformed theology is not merely a set of historical theories, but a living, breathing perspective that captures the absolute majesty of God and His redemptive plan for humanity. In this foundational work, Dr. James Mitchell unpacks the majestic doctrines of grace, the covenants of Scripture, and the profound implications of God's sovereignty in a broken world. This volume serves as an essential companion for those who seek to anchor their faith in the immovable truths of historic reformed confessions.",
      author: 'Dr. James Mitchell',
      genre: 'Sovereign Grace',
      themeId: 'emerald',
      emblemType: 'shield',
      paperPageNum: 14,
      linkUrl: '/books/1'
    },
    {
      id: 'fb-2',
      title: 'Faith & Culture',
      subtitle: 'Engaging the Modern World with Truth',
      description: 'How does the Christian faith engage with a shifting, liquid modern culture without compromising its core convictions? Rev. Sarah Williams presents a compelling, nuanced roadmap for believers. Moving beyond passive withdrawal or aggressive culture wars, this work advocates for a redemptive presence—faithfully cultivating grace, truth, and beauty in the public square, arts, and daily vocations while remaining deeply rooted in the eternal Word.',
      author: 'Rev. Sarah Williams',
      genre: 'Christian Culture',
      themeId: 'teal',
      emblemType: 'leaves',
      paperPageNum: 48,
      linkUrl: '/books/2'
    },
    {
      id: 'fb-3',
      title: 'Biblical Worldview',
      subtitle: 'Developing a Unified Foundation for Life',
      description: 'No area of human thought or endeavor is neutral. Every decision, relationship, and value flows from a fundamental set of assumptions about reality. Dr. Michael Chen provides a systematic framework for developing a robust, cohesive biblical worldview. By exploring the narrative arch of creation, fall, redemption, and restoration, readers are equipped to think biblically about economics, science, arts, and the modern ethical dilemmas of our age.',
      author: 'Dr. Michael Chen',
      genre: 'Applied Apologetics',
      themeId: 'rose',
      emblemType: 'sunburst',
      paperPageNum: 104,
      linkUrl: '/books/3'
    },
    {
      id: 'fb-4',
      title: 'Little Hearts, Big Grace',
      subtitle: 'A Lyrical Storybook of Covenants & Creation',
      description: 'Designed specifically to introduce toddlers and young children to the beautiful covenants of Scripture. Through lyrical storytelling and beautiful interactive visuals, little hearts will discover how much God loves them, from the starry skies of creation to the comforting promises of redemption. This modern classic serves as a treasured keepsake for family devotionals and cozy bedtime reading, making ultimate questions accessible and heartwarming to little ones.',
      author: 'Sarah Mitchell & David Chen',
      genre: 'Children & Family',
      themeId: 'indigo',
      emblemType: 'star',
      paperPageNum: 20,
      linkUrl: '/books/4'
    },
    {
      id: 'fb-5',
      title: 'Doctrine & Practice',
      subtitle: 'Bridging Theological Truth with Daily Life',
      description: 'Theology was never meant to be confined to the dusty shelves of academic library alcoves. It of right belongs in the prayer closet, the marketplace, and the family table. Rev. Elizabeth Turner offers a beautifully practical and encouraging guide that translates orthodox Christian doctrines into active orthopraxy. Learn how the profound reality of justification, sanctification, and union with Christ transforms daily anxiety into perfect peace and fills life with purpose.',
      author: 'Rev. Elizabeth Turner',
      genre: 'Practical Theology',
      themeId: 'violet',
      emblemType: 'lamp',
      paperPageNum: 182,
      linkUrl: '/books/5'
    }
  ],
  featuredThisMonth: [
    {
      id: 'ftm-1',
      linkedBookId: '1',
      title: 'The Doctrine of God',
      author: 'Reformed Theology Series',
      genre: 'Sovereign Grace',
      themeId: 'sapphire',
      emblem: '🛡️'
    },
    {
      id: 'ftm-2',
      linkedBookId: '2',
      title: 'Christ and Culture',
      author: 'H. Richard Niebuhr',
      genre: 'Christian Culture',
      themeId: 'emerald',
      emblem: '🌿'
    },
    {
      id: 'ftm-3',
      linkedBookId: '3',
      title: 'A Reformed Worldview',
      author: 'Contemporary Essays',
      genre: 'Applied Apologetics',
      themeId: 'sunset',
      emblem: '☀️'
    }
  ],
  books: booksData.map((b) => ({
    ...b,
    inStock: true,
    isbn: `978-1-68359-00${b.id}`,
    sampleExcerpt:
      '"To know God in truth is to rest in His eternal decree. When the heart recognizes that salvation is completely of grace, anxiety dissipates into pure worship..."'
  })),
  articles: articlesData,
  events: eventsData,
  testimonials: [
    {
      id: 'test-1',
      name: 'Dr. Arthur Pendelton',
      role: 'Professor of Systematic Theology',
      avatar: '👨‍🏫',
      quote: 'Reformed Books House produces volumes that combine historical rigor with breathtaking typography and binding quality. Unmatched in modern Christian publishing.',
      rating: 5,
      book: 'The Doctrine of God'
    },
    {
      id: 'test-2',
      name: 'Rev. Rebecca Sterling',
      role: 'Pastoral Counselor & Author',
      avatar: '👩‍💼',
      quote: 'Finding high-quality reformed literature that speaks directly to modern cultural challenges used to be difficult. Reformed Books House does it with grace.',
      rating: 5,
      book: 'Christ and Culture'
    },
    {
      id: 'test-3',
      name: 'Marcus Vance',
      role: 'Seminary Scholar & Reader',
      avatar: '🎓',
      quote: 'The physical feel of the paper, the clear serif fonts, and the instant availability of digital EPUBs make reading an absolute delight.',
      rating: 5,
      book: 'A Reformed Worldview'
    }
  ],
  homeSections: {
    announcementBadge: 'Special Announcement',
    announcementText: 'Preserving Classic Truths for Modern Readers —',
    announcementSubtext: 'Worldwide Shipping & Instant Digital E-Books',
    announcementLinkText: 'Explore Catalog →',
    announcementLinkHref: '/books/all',
    featuredBooksEyebrow: 'Discover Our Works',
    featuredBooksHeading: 'Featured Books',
    stats: [
      { value: '50+', label: 'Classics Preserved' },
      { value: '100%', label: 'Faithful Translations' },
      { value: '100,000+', label: 'Copies Distributed' },
      { value: '4.9 / 5.0', label: 'Reader Satisfaction' }
    ],
    monthlyEyebrow: 'Curated Selection',
    monthlyHeading: 'Featured This Month',
    monthlyDescription: 'Handpicked works that showcase the breadth and depth of reformed theological thought, designed with absolute aesthetic joy',
    manifestoLabel: 'Our Publishing Manifesto',
    manifestoQuote: '"To equip the heart with sovereign faith, and illuminate the mind with timeless historical confessions."',
    manifestoAuthor: '— Reformed Books House Editorial Council',
    libraryEyebrow: 'Featured Publications',
    libraryHeading: 'Explore Our Library',
    libraryDescription: 'Carefully preserved works, contemporary commentary, and theological confession designed with high elegance'
  },
  about: {
    heroEyebrow: 'Our Calling',
    heroTitle: 'Bridging Elegant Aesthetics with Orthodox Truth',
    heroQuote: '"We believe that true, historic theology should be both intellectually satisfying and visually beautiful, inspiring minds and hearts."',
    vision: aboutData.vision,
    mission: aboutData.mission,
    values: aboutData.values,
    story: aboutData.story,
    storyHighlight: '"We serve pastors preparing theological expositions, parents seeking beautiful covenants storybooks for their children, and minds hungry for timeless, sovereign truths."'
  },
  updatedAt: '2026-11-01T00:00:00.000Z'
}

const STORAGE_KEY = 'reformed_books_site_content_v1'
export const SITE_CONTENT_EVENT = 'reformed_site_content_updated'

export function mergeWithDefaults(partial: Partial<SiteContent> | null | undefined): SiteContent {
  if (!partial || typeof partial !== 'object') return DEFAULT_SITE_CONTENT
  return {
    featuredBooks: Array.isArray(partial.featuredBooks) ? partial.featuredBooks : DEFAULT_SITE_CONTENT.featuredBooks,
    featuredThisMonth: Array.isArray(partial.featuredThisMonth) ? partial.featuredThisMonth : DEFAULT_SITE_CONTENT.featuredThisMonth,
    books: Array.isArray(partial.books) ? partial.books : DEFAULT_SITE_CONTENT.books,
    articles: Array.isArray(partial.articles) ? partial.articles : DEFAULT_SITE_CONTENT.articles,
    events: Array.isArray(partial.events) ? partial.events : DEFAULT_SITE_CONTENT.events,
    testimonials: Array.isArray(partial.testimonials) ? partial.testimonials : DEFAULT_SITE_CONTENT.testimonials,
    homeSections: {
      ...DEFAULT_SITE_CONTENT.homeSections,
      ...(partial.homeSections || {}),
      stats: Array.isArray(partial.homeSections?.stats)
        ? partial.homeSections!.stats
        : DEFAULT_SITE_CONTENT.homeSections.stats
    },
    about: {
      ...DEFAULT_SITE_CONTENT.about,
      ...(partial.about || {}),
      values: Array.isArray(partial.about?.values)
        ? partial.about!.values
        : DEFAULT_SITE_CONTENT.about.values
    },
    updatedAt: partial.updatedAt || DEFAULT_SITE_CONTENT.updatedAt
  }
}

export function getLocalSiteContent(): SiteContent {
  if (typeof window === 'undefined') return DEFAULT_SITE_CONTENT
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SITE_CONTENT
    return mergeWithDefaults(JSON.parse(raw))
  } catch {
    return DEFAULT_SITE_CONTENT
  }
}

export async function fetchSiteContent(): Promise<SiteContent> {
  const local = getLocalSiteContent()
  if (typeof window === 'undefined') return local
  try {
    const res = await fetch('/api/site-content', { cache: 'no-store' })
    if (res.ok) {
      const serverData = await res.json()
      if (serverData && serverData.content) {
        const merged = mergeWithDefaults(serverData.content)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
        return merged
      }
    }
  } catch {
    // Fallback gracefully to localStorage if server endpoint unavailable
  }
  return local
}

export async function saveSiteContent(content: SiteContent): Promise<{ savedToServer: boolean; content: SiteContent }> {
  const stamped: SiteContent = {
    ...content,
    updatedAt: new Date().toISOString()
  }
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stamped))
    } catch (err) {
      console.error('Failed to save site content to localStorage:', err)
    }
    window.dispatchEvent(new CustomEvent(SITE_CONTENT_EVENT, { detail: stamped }))
  }

  let savedToServer = false
  try {
    const res = await fetch('/api/site-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stamped)
    })
    if (res.ok) {
      savedToServer = true
    }
  } catch {
    // Graceful local-only save if static host
  }

  return { savedToServer, content: stamped }
}

// Helper to compress an uploaded image into a compact Data URL for reliable persistence
export function compressImageFile(file: File, maxWidth = 800, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read the selected image file.'))
    reader.onload = () => {
      const img = new window.Image()
      img.onerror = () => reject(new Error('The selected file is not a valid image.'))
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(reader.result as string)
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}
