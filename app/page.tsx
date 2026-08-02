import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { BooksGrid } from '@/components/books-grid'
import { ReaderSpotlight } from '@/components/reader-spotlight'
import { Footer } from '@/components/footer'
import { EventPopup } from '@/components/event-popup'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BooksGrid />
      <ReaderSpotlight />
      <Footer />
      <EventPopup />
    </main>
  )
}
