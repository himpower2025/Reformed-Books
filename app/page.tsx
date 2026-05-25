import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { BooksGrid } from '@/components/books-grid'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <BooksGrid />
      <Footer />
    </main>
  )
}
