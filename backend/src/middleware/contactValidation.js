import { validationResult } from 'express-validator';

// Middleware para validar los datos del formulario de contacto
export const validateContactData = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    // Formatear errores para una mejor respuesta
    const formattedErrors = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Datos del formulario inválidos',
      errors: formattedErrors,
      timestamp: new Date().toISOString()
    });
  }
  
  // Sanitizar datos antes de procesarlos
  const sanitizedData = {
    name: req.body.name.trim(),
    email: req.body.email.toLowerCase().trim(),
    company: req.body.company ? req.body.company.trim() : '',
    phone: req.body.phone ? req.body.phone.trim() : '',
    service: req.body.service ? req.body.service.trim() : '',
    message: req.body.message.trim()
  };
  
  // Validaciones adicionales de negocio
  if (sanitizedData.message.length < 10) {
    return res.status(400).json({
      success: false,
      message: 'El mensaje es demasiado corto',
      errors: [{
        field: 'message',
        message: 'El mensaje debe tener al menos 10 caracteres',
        value: sanitizedData.message
      }],
      timestamp: new Date().toISOString()
    });
  }
  
  // Validar que no sea spam (mensajes repetitivos)
  if (isSpamMessage(sanitizedData.message)) {
    return res.status(400).json({
      success: false,
      message: 'El mensaje parece ser spam',
      errors: [{
        field: 'message',
        message: 'El mensaje contiene patrones sospechosos',
        value: '***'
      }],
      timestamp: new Date().toISOString()
    });
  }
  
  // Asignar datos sanitizados al request
  req.body = sanitizedData;
  next();
};

// Función para detectar mensajes spam
const isSpamMessage = (message) => {
  const spamPatterns = [
    /(.)\1{10,}/, // Caracteres repetidos más de 10 veces
    /[A-Z]{20,}/, // Mayúsculas consecutivas
    /(?:https?:\/\/[^\s]+)/, // URLs
    /(?:www\.[^\s]+)/, // URLs sin protocolo
    /(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/, // Emails en el mensaje
    /(?:[0-9]{10,})/, // Números largos consecutivos
    /(?:[^\w\s]{20,})/, // Caracteres especiales consecutivos
  ];
  
  return spamPatterns.some(pattern => pattern.test(message));
};

// Middleware para validar rate limiting personalizado
export const validateRateLimit = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const currentTime = Date.now();
  
  // Implementar rate limiting básico por IP
  if (!req.app.locals.rateLimit) {
    req.app.locals.rateLimit = new Map();
  }
  
  const clientData = req.app.locals.rateLimit.get(clientIP);
  
  if (clientData) {
    const timeDiff = currentTime - clientData.timestamp;
    const windowMs = 15 * 60 * 1000; // 15 minutos
    
    if (timeDiff < windowMs && clientData.count >= 5) {
      return res.status(429).json({
        success: false,
        message: 'Demasiadas solicitudes. Intenta de nuevo en 15 minutos.',
        retryAfter: Math.ceil((windowMs - timeDiff) / 1000),
        timestamp: new Date().toISOString()
      });
    }
    
    if (timeDiff < windowMs) {
      clientData.count++;
    } else {
      req.app.locals.rateLimit.set(clientIP, {
        count: 1,
        timestamp: currentTime
      });
    }
  } else {
    req.app.locals.rateLimit.set(clientIP, {
      count: 1,
      timestamp: currentTime
    });
  }
  
  next();
};

// Middleware para validar tamaño del mensaje
export const validateMessageSize = (req, res, next) => {
  const messageSize = req.body.message ? req.body.message.length : 0;
  const maxSize = 1000; // 1000 caracteres máximo
  
  if (messageSize > maxSize) {
    return res.status(400).json({
      success: false,
      message: 'El mensaje es demasiado largo',
      errors: [{
        field: 'message',
        message: `El mensaje no puede exceder ${maxSize} caracteres`,
        value: `Mensaje de ${messageSize} caracteres`,
        maxSize,
        currentSize: messageSize
      }],
      timestamp: new Date().toISOString()
    });
  }
  
  next();
};

