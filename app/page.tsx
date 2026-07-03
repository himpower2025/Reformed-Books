import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { BooksGrid } from '@/components/books-grid'
import { Footer } from '@/components/footer'
import { EventPopup } from '@/components/event-popup'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <BooksGrid />
      <Footer />
      <EventPopup />
    </main>
  )
}
