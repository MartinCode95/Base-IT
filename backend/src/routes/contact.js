import express from 'express';
import { body, validationResult } from 'express-validator';
import { sendContactEmail } from '../services/emailService.js';
import { validateContactData } from '../middleware/contactValidation.js';

const router = express.Router();

// Validación del formulario de contacto
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Debe ser un email válido'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('La empresa no puede exceder 100 caracteres'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[0-9\s\-\(\)]{7,20}$/)
    .withMessage('El teléfono debe tener entre 7 y 20 dígitos'),
  
  body('service')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('El servicio no puede exceder 100 caracteres'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('El mensaje debe tener entre 10 y 1000 caracteres')
    .escape()
    .withMessage('El mensaje contiene caracteres no permitidos'),
];

// POST /api/contact - Enviar formulario de contacto
router.post('/', contactValidation, validateContactData, async (req, res) => {
  try {
    const contactData = req.body;
    
    // Enviar email
    const result = await sendContactEmail(contactData);
    
    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Mensaje enviado exitosamente. Nos pondremos en contacto contigo pronto.',
      timestamp: new Date().toISOString(),
      data: {
        name: contactData.name,
        email: contactData.email,
        company: contactData.company || 'No especificada',
        service: contactData.service || 'Consulta general'
      },
      // Si está en modo Ethereal, devolvemos URLs de vista previa
      previews: {
        team: result?.previewTeamUrl || null,
        client: result?.previewClientUrl || null,
      }
    });
    
  } catch (error) {
    console.error('Error al enviar email de contacto:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor. Por favor, intenta de nuevo más tarde.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno',
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/contact/status - Verificar estado del servicio
router.get('/status', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Servicio de contacto funcionando correctamente',
    timestamp: new Date().toISOString(),
    features: [
      'Validación de formularios',
      'Envío de emails',
      'Rate limiting',
      'Validación de datos',
      'Manejo de errores'
    ]
  });
});

export { router as contactRoutes };

