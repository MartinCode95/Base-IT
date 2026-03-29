import { useState } from 'react'

export interface ValidationErrors {
  name?: string
  email?: string
  company?: string
  phone?: string
  service?: string
  message?: string
}

export interface ContactFormData {
  name: string
  email: string
  company: string
  phone: string
  service: string
  message: string
}

const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/&lt;script&gt;/gi, '')
    .replace(/&lt;\/script&gt;/gi, '')
    .replace(/&#x3C;script&#x3E;/gi, '')
    .replace(/\0/g, '')
}

const detectSQLInjection = (input: string): boolean => {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
    /(--)|#|\/\*|\*\//,
    /(\bOR\b.*=.*\bOR\b|\bAND\b.*=.*\bAND\b)/i,
    /(\bunion\b.*\bselect\b)/i,
    /(\bdrop\b.*\btable\b)/i,
    /(\binsert\b.*\binto\b)/i,
    /(\bupdate\b.*\bset\b)/i,
    /(\bdelete\b.*\bfrom\b)/i,
    /(xp_cmdshell|sp_executesql)/i,
    /('(\s*)?(or|and)(\s*)?('|1=1|0=0))/i,
    /((\%27)|('))\s*((\%6f)|o|(\%4f))((\%72)|r|(\%52))/i,
    /((\%27)|('))\s*((\%61)|a|(\%41))((\%6e)|n|(\%4e))((\%64)|d|(\%44))/i,
  ]
  return sqlPatterns.some((pattern) => pattern.test(input))
}

const detectXSSAttempt = (input: string): boolean => {
  const xssPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi,
    /<object[\s\S]*?>[\s\S]*?<\/object>/gi,
    /<embed[\s\S]*?>/gi,
    /<link[\s\S]*?>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /expression\s*\(/gi,
    /url\s*\(/gi,
    /@import/gi,
    /&#x/gi,
    /document\.cookie/gi,
    /document\.write/gi,
    /eval\s*\(/gi,
    /alert\s*\(/gi,
    /confirm\s*\(/gi,
    /prompt\s*\(/gi,
  ]
  return xssPatterns.some((pattern) => pattern.test(input))
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})

  const validateField = (name: string, value: string): string | null => {
    if (detectSQLInjection(value)) return 'Entrada sospechosa detectada. No se permiten comandos SQL.'
    if (detectXSSAttempt(value)) return 'Entrada sospechosa detectada. No se permiten scripts o HTML.'
    if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(value)) return 'Caracteres no válidos detectados.'

    switch (name) {
      case 'name': {
        if (!value.trim()) return 'El nombre es requerido'
        if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres'
        if (value.trim().length > 100) return 'El nombre no puede exceder 100 caracteres'
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) return 'El nombre solo puede contener letras y espacios'
        return null
      }
      case 'email': {
        if (!value.trim()) return 'El email es requerido'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value.trim())) return 'Debe ser un email válido'
        if (/[<>()[\]\\,;:\s@"']/g.test(value.replace(/[@.]/g, '').replace(/[a-zA-Z0-9-_]/g, ''))) {
          return 'El email contiene caracteres no permitidos'
        }
        return null
      }
      case 'company': {
        if (value.trim().length > 100) return 'La empresa no puede exceder 100 caracteres'
        if (value.trim() && !/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.\-&()]+$/.test(value.trim())) {
          return 'La empresa contiene caracteres no permitidos'
        }
        return null
      }
      case 'phone': {
        if (value.trim() && !/^[\+]?[0-9\s\-\(\)]{7,20}$/.test(value.trim())) {
          return 'El teléfono debe tener entre 7 y 20 dígitos'
        }
        return null
      }
      case 'service': {
        if (value.trim().length > 100) return 'El servicio no puede exceder 100 caracteres'
        return null
      }
      case 'message': {
        if (!value.trim()) return 'El mensaje es requerido'
        if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres'
        if (value.trim().length > 1000) return 'El mensaje no puede exceder 1000 caracteres'
        const allowedChars = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ .,;:()¿?¡!\-_%@#%&*+={}\[\]"'\/\\]+$/
        if (!allowedChars.test(value)) return 'El mensaje contiene caracteres no permitidos'
        return null
      }
      default:
        return null
    }
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof ContactFormData])
      if (error) newErrors[key as keyof ValidationErrors] = error
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const sanitizedValue = name === 'message' ? value.replace(/\0/g, '') : sanitizeInput(value)
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }))

    if (errors[name as keyof ValidationErrors]) {
      const fieldError = validateField(name, sanitizedValue)
      setErrors((prev) => ({ ...prev, [name]: fieldError ?? undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const sanitizedFormData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      company: sanitizeInput(formData.company),
      phone: sanitizeInput(formData.phone),
      service: sanitizeInput(formData.service),
      message: sanitizeInput(formData.message),
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedFormData),
      })
      const result = await response.json()
      if (response.ok && result.success) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', company: '', phone: '', service: '', message: '' })
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        const status = response.status
        let errorMessage = result?.message || 'Error inesperado al enviar el formulario'
        if (status === 400 && Array.isArray(result?.errors) && result.errors.length > 0) {
          const details = result.errors
            .map((er: { field?: string; message?: string }) => `${er.field ?? 'campo'}: ${er.message ?? ''}`)
            .join('\n')
          errorMessage = `Revisa los campos:\n${details}`
          // eslint-disable-next-line no-console
          console.error('Errores de validación:', result.errors)
        } else {
          // eslint-disable-next-line no-console
          console.error('Error del servidor:', { status, result })
        }
        alert(errorMessage)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error al enviar formulario:', error)
      alert('Error al enviar el formulario. Por favor, intenta de nuevo.')
    }
  }

  return {
    formData,
    setFormData,
    errors,
    isSubmitted,
    setIsSubmitted,
    handleChange,
    handleSubmit,
  }
}


