'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { articlesData, Article } from '@/lib/db-data'
import { motion } from 'framer-motion'
import { Calendar, User, Clock, ArrowRight, X, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function ArticlesPage() {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null)

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Hero Header */}
      <section className="py-16 md:py-24 border-b border-border/50 bg-secondary/15 relative">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-accent">Knowledge & Life</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Articles & Insights
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto font-serif">
            Engaging essays, pastoral wisdom, and historical reflections examining theology, covenant families, and a cohesive Reformed worldview.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 flex-grow">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesData.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border/40 bg-background shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300"
              >
                <div>
                  {/* Article Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
                      {article.category}
                    </div>
                  </div>

                  {/* Article Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3 font-sans">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h2 className="font-serif text-lg md:text-xl font-bold text-foreground leading-tight mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>

                    <p className="text-sm text-muted-foreground font-sans line-clamp-3 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveArticle(article)}
                    className="text-xs font-semibold text-primary group-hover:text-accent p-0 hover:bg-transparent flex items-center gap-1.5 transition-colors"
                  >
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Detail Viewer Dialog */}
      <Dialog open={!!activeArticle} onOpenChange={(open) => !open && setActiveArticle(null)}>
        {activeArticle && (
          <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-background border border-border rounded-xl shadow-2xl p-6 md:p-10">
            <DialogHeader className="border-b border-border/50 pb-6 mb-6">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-accent mb-3">
                <span>{activeArticle.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-border" />
                <span className="flex items-center gap-1 text-muted-foreground font-medium">
                  <Clock className="h-3 w-3" />
                  {activeArticle.readTime}
                </span>
              </div>
              <DialogTitle className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight text-left">
                {activeArticle.title}
              </DialogTitle>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4 font-sans text-left">
                <div className="flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">
                    {activeArticle.author.charAt(0)}
                  </div>
                  <span className="font-medium text-foreground">{activeArticle.author}</span>
                </div>
                <span>•</span>
                <span>{activeArticle.date}</span>
              </div>
            </DialogHeader>

            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted mb-6">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="font-serif text-sm md:text-base leading-relaxed text-muted-foreground space-y-6 text-justify">
              <p className="text-foreground font-semibold text-base md:text-lg border-l-4 border-accent pl-4 italic">
                {activeArticle.excerpt}
              </p>
              <div className="whitespace-pre-line">
                {activeArticle.content}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/40 flex justify-end">
              <Button onClick={() => setActiveArticle(null)} variant="secondary" className="text-xs uppercase font-semibold">
                Close Article
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Footer />
    </main>
  )
}
