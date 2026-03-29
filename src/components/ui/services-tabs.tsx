import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { Shield, Settings, Server, Lock, Cloud, Users, Wrench } from "lucide-react"

const servicesData = [
  {
    id: "preventivo",
    title: "Mantenimiento preventivo",
    icon: Settings,
    color: "bg-blue-500",
    shortTitle: "Preventivo",
    services: [
      "Análisis semanal de espacio",
      "Depuración de tablas del sistema",
      "Monitoreo de instancias",
      "Monitoreo de la Base de Datos",
      "Reorganización de espacio de tablas",
      "Control de ejecuciones de Backup",
      "Análisis del Early Watch Alert",
      "Aplicación de Notas",
      "Aplicación de Parches",
      "Configuraciones de sistemas de transporte",
      "Copias de mandante",
      "Refresco de Base de datos cada tres meses",
      "Copias Homogéneas / Heterogéneas",
      "Administración de Solution Manager",
      "Administración SAPRouter",
      "SAP Web Dispatcher",
      "Certificados SSL",
      "Kernel Update",
      "Single Sign On",
      "Revisión auditoria",
      "Prevención/mitigación de riesgos",
      "Configuración de conectores Cloud Connector",
      "Configuración e instalacion DPA",
      "Configuración de RTCCTOOLS",
      "Revisión jobs de depuracion",
    ],
  },
  {
    id: "correctivo",
    title: "Mantenimiento correctivo",
    icon: Wrench,
    color: "bg-red-500",
    shortTitle: "Correctivo",
    services: [
      "Resolución de incidencias críticas",
      "Diagnóstico y reparación de errores",
      "Recuperación de sistemas caídos",
      "Optimización de rendimiento",
      "Corrección de configuraciones",
    ],
  },
  {
    id: "soporte",
    title: "Soporte especializado SAP, Oracle, Unix, Linux, Windows",
    icon: Server,
    color: "bg-green-500",
    shortTitle: "Soporte",
    services: [
      "Soporte técnico especializado 24/7",
      "Administración de bases de datos Oracle",
      "Gestión de sistemas Unix/Linux",
      "Soporte en plataformas Windows",
      "Optimización de sistemas SAP",
    ],
  },
  {
    id: "auditoria",
    title: "Auditoría, identidad digital y seguridad",
    icon: Shield,
    color: "bg-purple-500",
    shortTitle: "Auditoría",
    services: [
      "Auditorías de seguridad integral",
      "Gestión de identidades digitales",
      "Implementación de políticas de seguridad",
      "Monitoreo de vulnerabilidades",
      "Cumplimiento normativo",
    ],
  },
  {
    id: "migracion",
    title: "Migración a la nube",
    icon: Cloud,
    color: "bg-cyan-500",
    shortTitle: "Migración",
    services: [
      "Planificación de migración cloud",
      "Migración de aplicaciones SAP",
      "Optimización de costos cloud",
      "Implementación de arquitecturas híbridas",
      "Gestión de servicios cloud",
    ],
  },
  {
    id: "asesoria",
    title: "Asesoría IT especializada",
    icon: Users,
    color: "bg-orange-500",
    shortTitle: "Asesoría",
    services: [
      "Consultoría estratégica IT",
      "Análisis de procesos de negocio",
      "Recomendaciones de mejores prácticas",
      "Planificación de roadmaps tecnológicos",
      "Evaluación de arquitecturas",
    ],
  },
  {
    id: "implementaciones",
    title: "Nuevas implementaciones BASIS",
    icon: Lock,
    color: "bg-indigo-500",
    shortTitle: "Implementaciones",
    services: [
      "Instalación de sistemas SAP",
      "Configuración de landscapes",
      "Implementación de alta disponibilidad",
      "Setup de entornos de desarrollo",
      "Configuración de conectividad",
    ],
  },
]

interface ServiceData {
  id: string;
  title: string;
  icon: any;
  color: string;
  shortTitle: string;
  services: string[];
}

export default function ServicesTabs() {
  const [activeTab, setActiveTab] = useState("preventivo")
  const [searchParams] = useSearchParams()
  const activeService = servicesData.find((service) => service.id === activeTab)

  // Ref al contenedor de tabs para auto-scroll mostrando tabs + contenido
  const tabsRef = useRef<HTMLDivElement | null>(null)
  const scrollToTabs = () => {
    if (tabsRef.current) {
      const navbarOffset = 100
      const y = tabsRef.current.getBoundingClientRect().top + window.scrollY - navbarOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Leer parámetro service y hacer scroll
  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam && servicesData.find(service => service.id === serviceParam)) {
      setActiveTab(serviceParam)
      setTimeout(scrollToTabs, 0)
    }
  }, [searchParams])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      {/* Título */}
      <div className="cascade-item cascade-delay-1 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          Áreas de Especialización
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">
          Selecciona tu{" "}
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            área de interés
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Cada servicio está diseñado para resolver desafíos específicos en tu infraestructura SAP
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-8 w-full" ref={tabsRef}>
        <div className="hidden md:flex flex-wrap justify-center gap-2 bg-gray-100 rounded-xl">
          {servicesData.map((service: ServiceData, index) => {
            const IconComponent = service.icon
            return (
              <button
                key={service.id}
                onClick={() => { setActiveTab(service.id); scrollToTabs(); }}
                className={`cascade-item cascade-delay-${index + 4} flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 text-sm min-w-[120px] ${
                  activeTab === service.id
                    ? `${service.color} text-white shadow-lg transform scale-105`
                    : "text-gray-600 hover:text-gray-900 hover:bg-white"
                }`}
              >
                <IconComponent className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{service.shortTitle}</span>
              </button>
            )
          })}
        </div>

        <div className="md:hidden flex overflow-x-auto overflow-y-visible gap-2 bg-gray-100 rounded-xl scrollbar-hide py-2">
          {servicesData.map((service: ServiceData, index) => {
            const IconComponent = service.icon
            return (
              <button
                key={service.id}
                onClick={() => { setActiveTab(service.id); scrollToTabs(); }}
                className={`cascade-item cascade-delay-${index + 4} flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 text-sm min-w-[120px] ${
                  activeTab === service.id
                    ? `${service.color} text-white shadow-lg transform scale-105`
                    : "text-gray-600 hover:text-gray-900 hover:bg-white"
                }`}
              >
                <IconComponent className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{service.shortTitle}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Contenido */}
      {activeService && (
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 mx-auto">
          <div className="flex items-start gap-4 mb-6">
            <div className={`${activeService.color} p-3 rounded-xl flex-shrink-0`}>
              <activeService.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                {activeService.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {activeService.services.length} servicios disponibles
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeService.services.map((service: string, index: number) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <div className={`w-2 h-2 ${activeService.color} rounded-full mt-2 flex-shrink-0`} />
                <span className="text-sm sm:text-base text-gray-700 leading-relaxed flex-1">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}