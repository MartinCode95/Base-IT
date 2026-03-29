# Guía de Producción — BaseIT Landing

Guía completa para dejar el proyecto funcional con emails reales, hosting y dominio propio.

---

## Estado actual — qué arreglar antes de subir

Hay dos cosas en el código que **deben corregirse** antes de ir a producción:

1. **`landing-software/src/components/sections/Contact.tsx`** — la página de contacto no tiene el formulario conectado. Solo muestra texto placeholder. El componente `contact-form.tsx` y el hook `useContactForm.ts` están completos pero no se usan en esa página.

2. **`landing-software/backend/src/services/emailService.js` línea 292** — URL hardcodeada `http://localhost:5173/servicios` en el template del email de confirmación al cliente. Debe reemplazarse con el dominio real (o leerlo desde la variable de entorno `EMAIL_SITE_URL`).

---

## Envío de emails con el email corporativo

El proyecto ya tiene Brevo integrado. Hay tres opciones según la situación del cliente.

### Opción A — Brevo (recomendada)

Brevo es el proveedor que ya está en el código. Funciona como intermediario: el email sale desde la dirección corporativa del cliente (`contacto@empresa.com`) aunque el servidor sea Brevo. Para el destinatario se ve igual.

**Pasos:**

1. Crear cuenta gratuita en [brevo.com](https://brevo.com) — 300 emails/día gratis, suficiente para una landing de contacto.
2. Ir a **Settings → Senders & IPs → Domains** y agregar el dominio corporativo (`empresa.com`).
3. Brevo genera 3 registros DNS que hay que agregar en el panel del registrador del dominio:
   - Registro **SPF** (tipo TXT)
   - Registro **DKIM** (tipo TXT)
   - Registro **DMARC** (tipo TXT, opcional pero recomendado)
4. Después de verificar el dominio, copiar la API Key desde **Settings → API Keys**.
5. Configurar las variables de entorno del backend:

```env
BREVO_API_KEY=tu_api_key_aqui
EMAIL_FROM=contacto@empresa.com
EMAIL_TO=contacto@empresa.com
```

### Opción B — Microsoft 365 / Outlook corporativo

Si el cliente ya paga Microsoft 365, se puede usar su SMTP directamente. Requiere modificar `emailService.js` para usar nodemailer con estas variables:

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=contacto@empresa.com
SMTP_PASS=contraseña_del_email
EMAIL_FROM=contacto@empresa.com
EMAIL_TO=contacto@empresa.com
```

> **Advertencia:** Microsoft puede tener "SMTP Auth" deshabilitado por política en el tenant. El administrador de M365 del cliente debe verificarlo en el panel de Exchange Online antes de asumir que funciona.

### Opción C — Google Workspace

Similar a M365. Se configura nodemailer con:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contacto@empresa.com
SMTP_PASS=app_password_de_google  # No la contraseña normal, sino una App Password
```

La App Password se genera en: Cuenta de Google → Seguridad → Verificación en 2 pasos → Contraseñas de aplicaciones.

---

## Opciones de hosting

El proyecto tiene dos partes que se hostean por separado:

| Parte | Qué es | Cómo se despliega |
|-------|--------|-------------------|
| Frontend | Archivos estáticos generados por `npm run build` | CDN / hosting estático |
| Backend | Servidor Node.js corriendo 24/7 | Plataforma con soporte Node |

### Frontend (React/Vite)

**Vercel** — recomendado
- Conectás el repositorio de GitHub y detecta Vite automáticamente.
- Deploy automático con cada push a la rama principal.
- HTTPS gratis, CDN global, sin configuración adicional.
- Gratis para proyectos de un cliente.
- Variables de entorno (`VITE_API_URL`, `VITE_SITE_URL`) se configuran en el dashboard.

**Netlify** — alternativa a Vercel, prácticamente idéntico en funcionalidad.

**Cloudflare Pages** — la más rápida globalmente por su CDN, gratis sin límite de bandwidth. Un poco más técnica de configurar.

### Backend (Node.js/Express)

**Railway** — recomendado para empezar
- Conectás el repo, detecta Node.js, deploy automático.
- ~$5 USD/mes con uso moderado.
- Variables de entorno desde el dashboard.
- Sin sleep en el tier de pago.

**Render**
- Tier gratuito disponible, pero el servidor **se "duerme"** si no recibe tráfico por 15 minutos.
- El primer request después de un período inactivo tarda ~30 segundos.
- Para una landing de contacto esto es un problema real.
- Tier pagado ($7/mes) elimina el sleep.

**VPS (servidor propio)** — recomendado para estabilidad a largo plazo
- Hetzner: desde ~4 EUR/mes (2 vCPU, 4 GB RAM). El más barato con buena calidad.
- DigitalOcean o Linode: desde $6/mes, más conocidos.
- Se instala Ubuntu + Node.js + PM2 (para que el proceso no muera) + Nginx como proxy inverso.
- SSL con Let's Encrypt (gratis, renovación automática con Certbot).
- Más trabajo de configuración inicial, pero control total y precio fijo.

### Combinación recomendada según presupuesto

| Presupuesto | Frontend | Backend | Costo aprox./mes |
|-------------|----------|---------|------------------|
| Probar (gratis) | Vercel gratis | Render gratis (con sleep) | $0 |
| Económico | Vercel gratis | Railway | ~$5 |
| Profesional | Vercel gratis | VPS Hetzner | ~$4–6 |
| Todo en un servidor | VPS con Nginx | mismo VPS | ~$4–6 |

---

## Dominio

### Dónde comprar

| Registrador | Precio aprox. `.com/año` | Notas |
|-------------|--------------------------|-------|
| **Porkbun** | ~$9 | El más barato, interfaz moderna |
| **Namecheap** | ~$12 | Popular, interfaz clara |
| **Cloudflare Registrar** | ~$10 (precio de costo) | Sin markup, requiere cuenta Cloudflare |
| GoDaddy | ~$12 + renovaciones caras | Conocido pero conviene evitar por precios |

> Evitar registrar el dominio a través del mismo proveedor de hosting. Si el cliente quiere cambiar de hosting, quedará "atrapado" o tendrá más burocracia para mover el dominio.

### Cómo conectar el dominio

1. Comprar el dominio en Namecheap o Porkbun.
2. En **Vercel** (frontend): agregar dominio personalizado → Vercel entrega los registros DNS necesarios.
3. En el **panel del registrador**: agregar esos registros (tipo A o CNAME).
4. Para el backend: crear un subdominio `api.empresa.com` apuntando al servidor del backend (Railway o VPS).
5. Actualizar las variables de entorno:
   - Frontend: `VITE_API_URL=https://api.empresa.com` y `VITE_SITE_URL=https://empresa.com`
   - Backend: `CORS_ORIGIN=https://empresa.com`

---

## Checklist completo para producción

### Correcciones de código
- [ ] Conectar el formulario en `Contact.tsx`
- [ ] Reemplazar la URL hardcodeada `http://localhost:5173/servicios` en `emailService.js:292`
- [ ] Actualizar `CORS_ORIGIN` al dominio real (nunca dejar `localhost` en producción)
- [ ] Revisar el filtro de spam en `contactValidation.js` — actualmente bloquea mensajes que contengan URLs o emails, lo que puede frustrar a usuarios legítimos

### Infraestructura
- [ ] Repositorio en GitHub o GitLab (necesario para deploy automático en Vercel/Railway)
- [ ] Cuenta en Brevo + dominio verificado con SPF/DKIM
- [ ] Variables de entorno de producción configuradas en la plataforma de hosting (nunca subir el archivo `.env` al repositorio)
- [ ] HTTPS habilitado — lo dan gratis Vercel, Render, Railway y Let's Encrypt en VPS

### SEO y métricas (opcional pero recomendado)
- [ ] Crear `public/robots.txt` y `public/sitemap.xml` — el proyecto tiene `SEOHead` pero no estos archivos
- [ ] Dar de alta el dominio en Google Search Console para indexación
- [ ] Agregar Google Analytics o Plausible para métricas de visitas

---

## Ruta más rápida para tenerlo online

```
1. Subir el código a GitHub
2. Crear cuenta en Brevo → verificar dominio del cliente → obtener API Key
3. Corregir Contact.tsx y la URL hardcodeada en emailService.js
4. Deploy del backend en Railway con variables de entorno de producción
5. Deploy del frontend en Vercel conectando el repositorio
6. Comprar el dominio en Namecheap o Porkbun
7. Conectar el dominio en Vercel
8. Crear subdominio api.empresa.com apuntando a Railway
9. Actualizar VITE_API_URL y CORS_ORIGIN con los dominios reales
10. Probar el formulario de contacto en producción
```
