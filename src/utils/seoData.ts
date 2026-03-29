// Datos SEO específicos por página

export const seoData = {
  home: {
    title: "BaseIT - Consultoría IT Especializada | Soporte SAP, Oracle, Migración Cloud",
    description: "Consultoría IT especializada con +10 años de experiencia. Soporte SAP, Oracle, Unix, Linux, Windows. Auditoría, seguridad y migración cloud para empresas.",
    keywords: "consultoría IT, SAP, Oracle, migración cloud, soporte técnico, auditoría sistemas, Unix, Linux, Windows, seguridad IT, BaseIT",
    ogTitle: "BaseIT - Consultoría IT Especializada",
    ogDescription: "Especialistas en SAP, Oracle y migración cloud con +10 años de experiencia. Brindamos soluciones IT para maximizar el valor de tu inversión tecnológica.",
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BaseIT",
      "alternateName": "Base IT",
      "description": "Consultoría IT especializada en SAP, Oracle, Unix, Linux, Windows, auditoría y migración cloud",
      "url": "PLACEHOLDER_DOMAIN",
      "logo": "PLACEHOLDER_DOMAIN/src/assets/Identidad Corporativa/Logo_BaseIT_cuad_color_positivo_RGB.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "PLACEHOLDER_PHONE",
        "contactType": "customer service",
        "availableLanguage": ["Spanish", "English"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "PLACEHOLDER_ADDRESS",
        "addressLocality": "PLACEHOLDER_CITY",
        "addressRegion": "PLACEHOLDER_STATE",
        "postalCode": "PLACEHOLDER_POSTAL_CODE",
        "addressCountry": "AR"
      },
      "sameAs": [
        "PLACEHOLDER_LINKEDIN",
        "PLACEHOLDER_FACEBOOK", 
        "PLACEHOLDER_TWITTER"
      ],
      "foundingDate": "PLACEHOLDER_FOUNDING_YEAR",
      "numberOfEmployees": "PLACEHOLDER_EMPLOYEE_COUNT",
      "serviceArea": {
        "@type": "Country",
        "name": "Argentina"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios IT",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Soporte SAP",
              "description": "Mantenimiento preventivo y correctivo de sistemas SAP"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Migración Cloud", 
              "description": "Transición segura y eficiente hacia tecnologías cloud"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Auditoría IT",
              "description": "Auditoría, identidad digital y seguridad de sistemas"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Asesoría IT",
              "description": "Consultoría para optimizar procesos y decisiones tecnológicas"
            }
          }
        ]
      }
    }
  },

  services: {
    title: "Servicios IT - BaseIT | SAP, Oracle, Cloud, Auditoría, Soporte Técnico",
    description: "Servicios especializados de IT: Soporte SAP y Oracle, migración cloud, auditoría de sistemas, mantenimiento preventivo y correctivo. +10 años de experiencia.",
    keywords: "servicios IT, soporte SAP, Oracle, migración cloud, auditoría sistemas, mantenimiento preventivo, correctivo, Unix, Linux, Windows",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Servicios de Consultoría IT",
      "provider": {
        "@type": "Organization",
        "name": "BaseIT"
      },
      "serviceType": "Consultoría IT",
      "description": "Servicios especializados en SAP, Oracle, migración cloud y auditoría de sistemas"
    }
  },

  about: {
    title: "Sobre Nosotros - BaseIT | +10 Años de Experiencia en Consultoría IT",
    description: "Conoce el equipo de BaseIT. Más de 10 años brindando servicios de consultoría IT a +50 empresas. Especialistas en SAP, Oracle y tecnologías cloud.",
    keywords: "sobre BaseIT, equipo consultoría IT, experiencia SAP Oracle, historia empresa, especialistas IT",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Sobre BaseIT",
      "description": "Información sobre BaseIT y nuestro equipo de especialistas en consultoría IT"
    }
  },

  contact: {
    title: "Contacto - BaseIT | Consultoría IT Especializada",
    description: "Contacta con BaseIT para tu proyecto de consultoría IT. Especialistas en SAP, Oracle, migración cloud. Respuesta en menos de 24 horas.",
    keywords: "contacto BaseIT, consultoría IT, presupuesto SAP Oracle, migración cloud, soporte técnico",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contacto BaseIT",
      "description": "Página de contacto para solicitar servicios de consultoría IT"
    }
  }
}

export type SEOPageType = keyof typeof seoData
