<div align="center">

# Base-IT — Corporate Landing Page

**Consultoría IT especializada en infraestructura, SAP BASIS y transformación digital**

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## Descripción del proyecto

Landing page institucional desarrollada para **Base-IT**, empresa argentina de consultoría IT con más de 10 años de trayectoria. El sitio fue diseñado para comunicar identidad de marca, servicios y generar leads a través de un formulario de contacto seguro con notificaciones por email.

El proyecto incluye un frontend en React y un backend desacoplado en Node.js/Express con sistema de envío de emails transaccionales.

---

## Vistas del sitio

| Sección | Descripción |
|---------|-------------|
| **Home** | Hero con propuesta de valor, servicios destacados, contadores animados y CTA de contacto |
| **Servicios** | Interfaz de pestañas interactiva con 7 áreas de especialización (SAP BASIS, Cloud, Auditoría, Seguridad, Soporte 24/7) |
| **Sobre Nosotros** | Misión, Visión, Valores corporativos y galería del equipo de 13 especialistas |
| **Contacto** | Formulario con validación en dos capas y confirmación automática por email |

---

## Stack tecnológico

### Frontend

| Tecnología | Rol |
|---|---|
| **React 19** | UI library con Hooks y composición de componentes |
| **TypeScript 5.8** | Tipado estático en todo el proyecto |
| **Vite 7** | Bundler y dev server con SWC |
| **React Router DOM 7** | Enrutamiento SPA con scroll automático entre rutas |
| **Tailwind CSS 3.4** | Diseño utility-first con paleta corporativa naranja/rojo |
| **Lucide React** | Sistema de iconos SVG consistente |
| **Animate.css** | Animaciones de entrada declarativas |

### Backend

| Tecnología | Rol |
|---|---|
| **Node.js 18+** | Runtime del servidor |
| **Express 4** | Framework HTTP con middleware stack |
| **Brevo API** | Proveedor de emails transaccionales (300 emails/día gratis) |
| **Nodemailer** | Fallback con Ethereal para entornos de desarrollo |
| **express-validator** | Validación y sanitización de inputs del servidor |
| **Helmet** | Headers de seguridad HTTP |
| **express-rate-limit** | Rate limiting por IP (5 requests / 15 min en contacto) |

---

## Arquitectura

```
├── src/
│   ├── components/
│   │   ├── sections/        # Páginas por ruta (Home, About, Services, Contact, 404)
│   │   └── ui/              # Componentes reutilizables (Navbar, Footer, Form, Tabs)
│   ├── hooks/
│   │   └── useContactForm   # Lógica del formulario desacoplada del componente
│   ├── utils/
│   │   └── seoData          # Metadatos y schema.org JSON-LD por página
│   └── config/
│       └── env              # Variables de entorno tipadas (VITE_*)
│
└── backend/
    └── src/
        ├── routes/          # POST /api/contact
        ├── middleware/      # Validación, error handling, 404, rate limiting
        └── services/        # emailService — Brevo / Ethereal con fallback automático
```

### Separación de responsabilidades

- **Componentes de sección** → estructura y layout por ruta
- **Componentes UI** → lógica de presentación reutilizable
- **Hooks** → lógica de negocio desacoplada (`useContactForm`)
- **Servicios (backend)** → acceso a APIs externas aislado del routing

---

## Seguridad implementada

### Validación en dos capas

**Frontend (`useContactForm.ts`)**
- Sanitización contra patrones de **SQL Injection** (`SELECT`, `DROP`, `UNION`, `OR 1=1`, etc.)
- Sanitización contra **XSS** (`<script>`, `iframe`, `onclick`, `javascript:`, `eval`, etc.)
- Detección de null bytes y caracteres de control

**Backend (`contactValidation.js`)**
- Validación y escape de inputs con `express-validator`
- Detección de **spam** (URLs en mensaje, emails embebidos, caracteres repetidos, números largos)
- Rate limiting independiente por IP en el endpoint de contacto
- Headers seguros con Helmet (CSP, HSTS, X-Frame-Options)
- CORS restrictivo configurado por entorno

---

## Sistema de emails

Flujo automático al enviar el formulario de contacto:

```
POST /api/contact
     │
     ▼
Validación + sanitización
     │
     ▼
sendContactEmail()
     ├── Email al equipo → datos del lead + contexto
     └── Email al cliente → confirmación + resumen + CTA de servicios
```

**Selección automática de proveedor:**
1. `BREVO_API_KEY` configurada → Brevo (producción)
2. Sin API key → Ethereal con preview URL (desarrollo)
3. `MOCK_EMAIL=true` → simulación sin peticiones externas

---

## SEO

- **`SEOHead`** — componente renderless que actualiza `document.title` y meta tags dinámicamente por ruta
- **Schema.org JSON-LD** — datos estructurados para Google (`Organization`, `WebSite`)
- Metadatos únicos por página (title, description, og:image)
- `vercel.json` con rewrite SPA para que todas las rutas sean indexables

---

## Deploy

El frontend está desplegado en **Vercel** (CDN global, HTTPS automático).
El backend puede ser alojado en **Railway** o cualquier proveedor Node.js compatible.

---

<div align="center">

Desarrollado por **[Martín](https://github.com/MartinCode95)**

</div>
