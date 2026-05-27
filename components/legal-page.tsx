import type { ReactNode } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

type LegalPageProps = {
  title: string
  lastUpdated: string
  children: ReactNode
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <article className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </header>
        <div className="legal-prose space-y-8 text-sm leading-relaxed text-foreground/90 md:text-base">
          {children}
        </div>
      </article>
      <Footer />
    </main>
  )
}

export function LegalSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="mb-3 font-serif text-xl font-bold text-foreground">{title}</h2>
      <div className="space-y-3 text-muted-foreground">{children}</div>
    </section>
  )
}
