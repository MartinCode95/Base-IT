// Middleware para manejo centralizado de errores
export const errorHandler = (err, req, res, next) => {
  // Log del error
  console.error('❌ Error en la aplicación:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // Determinar el tipo de error
  let statusCode = 500;
  let message = 'Error interno del servidor';
  let details = null;

  // Errores de validación
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Error de validación';
    details = err.details;
  }
  
  // Errores de autenticación
  else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'No autorizado';
  }
  
  // Errores de permisos
  else if (err.name === 'ForbiddenError') {
    statusCode = 403;
    message = 'Acceso prohibido';
  }
  
  // Errores de recurso no encontrado
  else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = 'Recurso no encontrado';
  }
  
  // Errores de conflicto
  else if (err.name === 'ConflictError') {
    statusCode = 409;
    message = 'Conflicto con el estado actual del recurso';
  }
  
  // Errores de rate limiting
  else if (err.name === 'RateLimitError') {
    statusCode = 429;
    message = 'Demasiadas solicitudes';
    details = {
      retryAfter: err.retryAfter,
      limit: err.limit,
      remaining: err.remaining
    };
  }
  
  // Errores de email
  else if (err.name === 'EmailError') {
    statusCode = 502;
    message = 'Error al enviar email';
    details = {
      reason: err.reason,
      retryable: err.retryable
    };
  }
  
  // Errores de base de datos
  else if (err.name === 'DatabaseError') {
    statusCode = 503;
    message = 'Error en la base de datos';
    details = {
      operation: err.operation,
      retryable: err.retryable
    };
  }

  // Respuesta de error
  const errorResponse = {
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno',
    timestamp: new Date().toISOString(),
    path: req.url,
    method: req.method
  };

  // Agregar detalles si existen
  if (details) {
    errorResponse.details = details;
  }

  // Agregar stack trace en desarrollo
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  // Agregar headers de retry si es aplicable
  if (statusCode === 429 && err.retryAfter) {
    res.set('Retry-After', err.retryAfter);
  }

  // Enviar respuesta
  res.status(statusCode).json(errorResponse);
};

// Middleware para manejar errores asíncronos
export const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Middleware para manejar errores de parsing JSON
export const jsonErrorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'JSON inválido en el cuerpo de la petición',
      error: 'Sintaxis JSON incorrecta',
      timestamp: new Date().toISOString(),
      path: req.url,
      method: req.method
    });
  }
  next(err);
};

// Middleware para manejar errores de timeout
export const timeoutHandler = (timeoutMs = 30000) => {
  return (req, res, next) => {
    const timer = setTimeout(() => {
      const error = new Error('Timeout de la petición');
      error.status = 408;
      next(error);
    }, timeoutMs);

    res.on('finish', () => {
      clearTimeout(timer);
    });

    next();
  };
};

// Función para crear errores personalizados
export class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Errores específicos de la aplicación
export class ValidationError extends AppError {
  constructor(message, details) {
    super(message, 400, details);
    this.name = 'ValidationError';
  }
}

export class EmailError extends AppError {
  constructor(message, reason, retryable = false) {
    super(message, 502, { reason, retryable });
    this.name = 'EmailError';
  }
}

export class RateLimitError extends AppError {
  constructor(message, retryAfter, limit, remaining) {
    super(message, 429, { retryAfter, limit, remaining });
    this.name = 'RateLimitError';
  }
}

export class DatabaseError extends AppError {
  constructor(message, operation, retryable = false) {
    super(message, 503, { operation, retryable });
    this.name = 'DatabaseError';
  }
}

