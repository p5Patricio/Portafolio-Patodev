import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: string
}

export default function SEO({
  title,
  description,
  canonical = 'https://patodev.com/',
  ogImage = 'https://patodev.com/og-image.png',
  ogType = 'website',
}: SEOProps) {
  useEffect(() => {
    // Document title
    document.title = title

    // Helper function to update or create meta tags
    const updateMetaTag = (selector: string, attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attributeName, attributeValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Helper function to update link tags (e.g. canonical)
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
      if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        document.head.appendChild(element)
      }
      element.setAttribute('href', href)
    }

    // Update Meta Description
    updateMetaTag('meta[name="description"]', 'name', 'description', description)

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title)
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description)
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', canonical)
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage)
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType)

    // Update Twitter Card tags
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage)

    // Update Canonical URL
    updateLinkTag('canonical', canonical)
  }, [title, description, canonical, ogImage, ogType])

  return null
}
