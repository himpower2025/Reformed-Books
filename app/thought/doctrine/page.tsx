'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DoctrinePage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/events')
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground font-serif">Redirecting to Reformed Books House Special Events...</p>
      </div>
    </div>
  )
}
