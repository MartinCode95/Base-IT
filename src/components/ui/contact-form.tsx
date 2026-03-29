import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { useContactForm } from "../../hooks/useContactForm"
import logoSuccess from "../../assets/Identidad Corporativa/Logo_BaseIT_cuad_color_positivo_RGB.png"

// Componente para mostrar errores
const ErrorMessage = ({ error }: { error?: string }) => {
  if (!error) return null
  
  return (
    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
      <AlertCircle className="w-4 h-4" />
      <span>{error}</span>
    </div>
  )
}

export default function ContactForm() {
  const {
    formData,
    errors,
    isSubmitted,
    handleChange,
    handleSubmit,
  } = useContactForm()

  // Lógica de validación, sanitización, submit y change movida al hook

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-orange-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
        <p className="text-gray-600 mb-6">Nos pondremos en contacto contigo pronto.</p>
        
        {/* Logo BaseIT en estado de éxito */}
        <div className="border-t border-gray-200 pt-6">
          <img 
            src={logoSuccess}
            alt="BaseIT"
            className="h-8 w-auto mx-auto opacity-70"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Contact Info with Image */}
      <div className="space-y-8">
        {/* Title and content above the image */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Hablemos de tu proyecto</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Estamos aquí para ayudarte a optimizar tu infraestructura IT. Contacta con nuestros especialistas y descubre
            cómo podemos impulsar el crecimiento de tu empresa.
          </p>
        </div>

        <div className="relative h-64 rounded-xl overflow-hidden">
          <img
            src="images/professional-business-consultation-contact.webp"
            alt="Consultoría profesional de negocios para contacto"
            loading="lazy"
            className="w-[600px] h-[256px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-transparent"></div>
        </div>

        <div className="bg-orange-50 p-6 rounded-xl">
          <h4 className="font-semibold text-orange-900 mb-2">Tiempo de respuesta</h4>
          <p className="text-orange-700">Respondemos en menos de 24 horas</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Tu nombre"
              />
              <ErrorMessage error={errors.name} />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="tu@email.com"
              />
              <ErrorMessage error={errors.email} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.company ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Nombre de tu empresa"
              />
              <ErrorMessage error={errors.company} />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="+54 11 1234-5678"
              />
              <ErrorMessage error={errors.phone} />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
              Servicio de interés
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.service ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Selecciona un servicio</option>
              <option value="mantenimiento-preventivo">Mantenimiento Preventivo</option>
              <option value="mantenimiento-correctivo">Mantenimiento Correctivo</option>
              <option value="soporte-sap">Soporte SAP</option>
              <option value="auditoria">Auditoría y Seguridad</option>
              <option value="migracion-nube">Migración a la Nube</option>
              <option value="asesoria">Asesoría</option>
              <option value="otro">Otro</option>
            </select>
            <ErrorMessage error={errors.service} />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Mensaje *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none ${
                errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Cuéntanos sobre tu proyecto o necesidades..."
            />
            <ErrorMessage error={errors.message} />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            Enviar Mensaje
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}
