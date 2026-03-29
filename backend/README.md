# 🚀 Backend BaseIT - API de Contacto

Backend completo para el formulario de contacto de BaseIT, construido con Node.js, Express y Nodemailer.

## ✨ Características

- **API REST** con Express.js
- **Validación robusta** de formularios
- **Envío de emails** con templates HTML profesionales
- **Seguridad avanzada** con Helmet, CORS y rate limiting
- **Manejo de errores** centralizado
- **Logging** completo con Morgan
- **Compresión** de respuestas
- **Health checks** para monitoreo

## 🏗️ Arquitectura

```
backend/
├── src/
│   ├── routes/          # Rutas de la API
│   ├── services/        # Lógica de negocio
│   ├── middleware/      # Middleware personalizado
│   └── server.js        # Servidor principal
├── package.json         # Dependencias
├── env.example          # Variables de entorno
├── setup.js            # Script de configuración
└── README.md           # Esta documentación
```

## 🚀 Instalación

### 1. Clonar y instalar dependencias
```bash
cd backend
npm install
```

### 2. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp env.example .env

# Editar .env con tus credenciales
nano .env
```

### 3. Configurar email (Gmail)
```bash
# En tu cuenta de Gmail:
# 1. Activar verificación en 2 pasos
# 2. Generar contraseña de aplicación
# 3. Usar esa contraseña en EMAIL_PASS
```

### 4. Verificar configuración
```bash
node setup.js
```

## ⚙️ Configuración

### Variables de Entorno Requeridas

```bash
# Servidor
PORT=3001
NODE_ENV=development

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password
EMAIL_FROM=BaseIT <tu-email@gmail.com>
EMAIL_TO=contacto@baseit.com

# Seguridad
JWT_SECRET=tu-jwt-secret-super-seguro
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:5173
```

## 🎯 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

### Testing
```bash
npm test
```

## 📡 Endpoints

### POST /api/contact
Envía el formulario de contacto.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@empresa.com",
  "company": "Empresa S.A.",
  "phone": "+34 600 123 456",
  "service": "Migración a la nube",
  "message": "Necesito información sobre migración..."
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Mensaje enviado exitosamente. Nos pondremos en contacto contigo pronto.",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "data": {
    "name": "Juan Pérez",
    "email": "juan@empresa.com",
    "company": "Empresa S.A.",
    "service": "Migración a la nube"
  }
}
```

### GET /api/contact/status
Verifica el estado del servicio de contacto.

### GET /health
Health check del servidor.

## 🔒 Seguridad

### Rate Limiting
- **100 requests** por **15 minutos** por IP
- Headers de retry automáticos
- Respuestas personalizadas

### Validación
- Sanitización de datos
- Validación de formato
- Detección de spam
- Escape de caracteres especiales

### Headers de Seguridad
- Helmet.js para CSP
- CORS configurado
- Compresión de respuestas
- Timeout de peticiones

## 📧 Sistema de Emails

### Templates Incluidos
1. **Email al equipo** - Notificación de nuevo contacto
2. **Email al cliente** - Confirmación de recepción

### Características
- **HTML responsive** con CSS inline
- **Branding** de BaseIT
- **Información estructurada** del contacto
- **Call-to-action** buttons
- **Diseño profesional** y moderno

## 🛠️ Desarrollo

### Estructura de Middleware
```javascript
// Flujo de validación
contactValidation → validateContactData → sendContactEmail
```

### Manejo de Errores
- **Errores HTTP** estándar
- **Logging** detallado
- **Respuestas** consistentes
- **Stack traces** en desarrollo

### Logging
- **Morgan** para requests HTTP
- **Console** para errores y eventos
- **Timestamps** en todas las entradas
- **Contexto** completo de errores

## 🧪 Testing

### Pruebas de Email
```bash
# Probar conexión SMTP
node -e "import('./src/services/emailService.js').then(s => s.testEmailConnection())"
```

### Pruebas de API
```bash
# Health check
curl http://localhost:3001/health

# Status del servicio
curl http://localhost:3001/api/contact/status

# Enviar formulario (ejemplo)
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Mensaje de prueba"
  }'
```

## 📊 Monitoreo

### Métricas Disponibles
- **Uptime** del servidor
- **Rate limiting** por IP
- **Errores** y excepciones
- **Performance** de emails
- **Health** del sistema

### Logs Estructurados
```json
{
  "level": "info",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "method": "POST",
  "url": "/api/contact",
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "responseTime": "150ms"
}
```

## 🚀 Despliegue

### Docker (Recomendado)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### Variables de Producción
```bash
NODE_ENV=production
PORT=3001
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=produccion@baseit.com
EMAIL_PASS=app-password-produccion
```

## 🔧 Troubleshooting

### Problemas Comunes

#### 1. Error de Autenticación SMTP
```bash
# Verificar:
# - Verificación en 2 pasos activada
# - Contraseña de aplicación generada
# - EMAIL_USER y EMAIL_PASS correctos
```

#### 2. CORS Errors
```bash
# Verificar CORS_ORIGIN en .env
# Debe coincidir con la URL del frontend
```

#### 3. Rate Limiting
```bash
# Ajustar RATE_LIMIT_MAX_REQUESTS en .env
# Por defecto: 100 requests por 15 minutos
```

### Logs de Debug
```bash
# Activar logs detallados
NODE_ENV=development npm run dev

# Ver logs en tiempo real
tail -f logs/app.log
```

## 📚 Recursos Adicionales

- [Express.js Documentation](https://expressjs.com/)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Helmet.js Security](https://helmetjs.github.io/)
- [Rate Limiting Best Practices](https://express-rate-limit.mintlify.app/)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

---

**BaseIT** - Tu socio tecnológico de confianza 🚀

