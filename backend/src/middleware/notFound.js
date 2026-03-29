// Middleware para manejar rutas no encontradas
export const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  error.name = 'NotFoundError';
  
  // Log de la ruta no encontrada
  console.warn('⚠️ Ruta no encontrada:', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  
  next(error);
};

// Middleware para manejar métodos HTTP no permitidos
export const methodNotAllowed = (req, res, next) => {
  const error = new Error(`Método HTTP no permitido: ${req.method}`);
  error.status = 405;
  error.name = 'MethodNotAllowedError';
  
  // Log del método no permitido
  console.warn('⚠️ Método HTTP no permitido:', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  
  next(error);
};

// Middleware para manejar versiones de API no soportadas
export const apiVersionNotSupported = (req, res, next) => {
  const apiVersion = req.headers['accept-version'] || req.headers['x-api-version'];
  
  if (apiVersion && !['1.0', '1.1'].includes(apiVersion)) {
    const error = new Error(`Versión de API no soportada: ${apiVersion}`);
    error.status = 400;
    error.name = 'ApiVersionError';
    error.details = {
      supportedVersions: ['1.0', '1.1'],
      requestedVersion: apiVersion
    };
    
    // Log de versión no soportada
    console.warn('⚠️ Versión de API no soportada:', {
      requestedVersion: apiVersion,
      supportedVersions: ['1.0', '1.1'],
      url: req.originalUrl,
      ip: req.ip,
      timestamp: new Date().toISOString()
    });
    
    return next(error);
  }
  
  next();
};

