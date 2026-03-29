import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOData {
  title: string
  description: string
  keywords: string
  ogTitle?: string
  ogDescription?: string
  schema?: object
}

const SEOHead = ({ title, description, keywords, ogTitle, ogDescription, schema }: SEOData) => {
  const location = useLocation()
  
  useEffect(() => {
    const updateSEO = async () => {
      // Actualizar título
      document.title = title
      
      // Actualizar meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', description)
      }
      
      // Actualizar meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]')
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords)
      }
      
      // Actualizar Open Graph title
      const ogTitleMeta = document.querySelector('meta[property="og:title"]')
      if (ogTitleMeta) {
        ogTitleMeta.setAttribute('content', ogTitle || title)
      }
      
      // Actualizar Open Graph description
      const ogDescMeta = document.querySelector('meta[property="og:description"]')
      if (ogDescMeta) {
        ogDescMeta.setAttribute('content', ogDescription || description)
      }
      
      // Actualizar canonical URL usando configuración centralizada
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) {
        const { env } = await import('../../config/env')
        canonical.setAttribute('href', `${env.SITE_URL}${location.pathname}`)
      }
      
      // Manejar Schema.org dinámicamente
      if (schema) {
        // Remover schema anterior si existe
        const existingSchema = document.querySelector('#dynamic-schema')
        if (existingSchema) {
          existingSchema.remove()
        }
        
        // Crear nuevo script de schema
        const schemaScript = document.createElement('script')
        schemaScript.type = 'application/ld+json'
        schemaScript.id = 'dynamic-schema'
        schemaScript.textContent = JSON.stringify(schema)
        document.head.appendChild(schemaScript)
      }
    }

    updateSEO()
  }, [title, description, keywords, ogTitle, ogDescription, schema, location.pathname])

  return null // Este componente no renderiza nada visual
}

export default SEOHead
