// Configuración de variables de entorno para BaseIT
// Centraliza todas las variables de entorno en un solo lugar

export const env = {
  // URLs de la aplicación
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  SITE_URL: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  
  // Información para desarrollo
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // URLs completas para uso común
  get API_CONTACT_URL() {
    return `${this.API_URL}/api/contact`
  },
  
  get CANONICAL_BASE_URL() {
    return this.SITE_URL
  }
} as const

// Validación de variables críticas en desarrollo (SIN DATOS SENSIBLES)
if (env.isDevelopment) {
  console.log('🔧 Configuración de entorno:', {
    MODE: env.isProduction ? 'production' : 'development',
    API_CONFIGURED: !!env.API_URL,
    SITE_CONFIGURED: !!env.SITE_URL,
    // URLs solo si son localhost (desarrollo)
    ...(env.API_URL?.includes('localhost') && { API_URL: env.API_URL }),
    ...(env.SITE_URL?.includes('localhost') && { SITE_URL: env.SITE_URL })
  })
}
