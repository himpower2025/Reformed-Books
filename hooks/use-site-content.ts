'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  SiteContent,
  DEFAULT_SITE_CONTENT,
  SITE_CONTENT_EVENT,
  getLocalSiteContent,
  fetchSiteContent,
  saveSiteContent
} from '@/lib/site-content'

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Immediate local hydration
    setContent(getLocalSiteContent())

    // Server sync
    let active = true
    fetchSiteContent().then((synced) => {
      if (active) {
        setContent(synced)
        setIsLoaded(true)
      }
    })

    // Cross-component live updates
    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent<SiteContent>
      if (custom.detail) {
        setContent(custom.detail)
      } else {
        setContent(getLocalSiteContent())
      }
    }

    window.addEventListener(SITE_CONTENT_EVENT, handleUpdate)
    window.addEventListener('storage', handleUpdate)

    return () => {
      active = false
      window.removeEventListener(SITE_CONTENT_EVENT, handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  const updateContent = useCallback(async (next: SiteContent) => {
    setContent(next)
    return await saveSiteContent(next)
  }, [])

  return { content, isLoaded, updateContent }
}
