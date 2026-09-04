import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export interface SEOHeadProps {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
  ogType?: "website" | "article" | "profile"
  noindex?: boolean
  structuredData?: Record<string, any> | Array<Record<string, any>>
  schema?: Record<string, any> | Array<Record<string, any>>
}

const SITE_URL = "https://davns.com"
const DEFAULT_OG_IMAGE = "/images/davns-logo.png"

/**
 * Dynamic SEO component that updates:
 * - Document title
 * - Standard Meta tags (description, keywords, robots, author)
 * - Open Graph & Twitter Cards
 * - Canonical link tag
 * - Schema.org JSON-LD Structured Data
 */
export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  structuredData,
  schema,
}: SEOHeadProps) {
  const { pathname } = useLocation()
  const activeSchema = structuredData || schema

  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title.includes("DAVNS") ? title : `${title} | DAVNS Industries`
    document.title = formattedTitle

    // Helper to update or create meta tags
    const setMeta = (attr: "name" | "property", key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute("content", value)
    }

    // 2. Standard Meta Tags
    setMeta("name", "description", description)
    if (keywords) {
      setMeta("name", "keywords", keywords)
    }
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1")

    // 3. Canonical Tag
    const fullCanonical = canonical
      ? (canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical}`)
      : `${SITE_URL}${pathname}`

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonicalEl) {
      canonicalEl = document.createElement("link")
      canonicalEl.setAttribute("rel", "canonical")
      document.head.appendChild(canonicalEl)
    }
    canonicalEl.setAttribute("href", fullCanonical)

    // 4. Open Graph Tags
    const fullOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`
    setMeta("property", "og:title", formattedTitle)
    setMeta("property", "og:description", description)
    setMeta("property", "og:url", fullCanonical)
    setMeta("property", "og:type", ogType)
    setMeta("property", "og:image", fullOgImage)
    setMeta("property", "og:site_name", "DAVNS Industries")
    setMeta("property", "og:locale", "en_US")

    // 5. Twitter Card Tags
    setMeta("name", "twitter:card", "summary_large_image")
    setMeta("name", "twitter:title", formattedTitle)
    setMeta("name", "twitter:description", description)
    setMeta("name", "twitter:image", fullOgImage)

    // 6. Schema.org Structured Data (JSON-LD)
    const scriptId = "dynamic-seo-jsonld"
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null
    if (activeSchema) {
      if (!scriptEl) {
        scriptEl = document.createElement("script")
        scriptEl.id = scriptId
        scriptEl.type = "application/ld+json"
        document.head.appendChild(scriptEl)
      }
      scriptEl.textContent = JSON.stringify(
        Array.isArray(activeSchema)
          ? { "@context": "https://schema.org", "@graph": activeSchema }
          : { "@context": "https://schema.org", ...activeSchema }
      )
    } else if (scriptEl) {
      scriptEl.remove()
    }

    return () => {
      // Clean up dynamic schema on route unmount
      const el = document.getElementById(scriptId)
      if (el) el.remove()
    }
  }, [title, description, keywords, canonical, ogImage, ogType, noindex, activeSchema, pathname])

  return null
}
