import { Mail, Linkedin, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full mt-auto">
      <div className="w-full px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-12 max-w-6xl mx-auto">
          <div className="col-span-1 md:col-start-1 md:col-span-3">
            <h3 className="text-xl font-bold text-orange-500 mb-3">Baseit</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Especialistas en servicios de IT con más de 10 años de experiencia.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.linkedin.com/company/baseit/?originalSubdomain=ar" className="text-gray-300 hover:text-orange-500" target="_blank" rel="noopener noreferrer">
                <Linkedin size={14} strokeWidth={2.25} />
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-start-5 md:col-span-2">
            <h4 className="text-lg font-semibold mb-3 text-orange-500">Contacto</h4>
            <div className="space-y-3">
              <a href="mailto:administracionbaseit@baseit.com.ar" className="flex items-start space-x-3 group">
                <Mail size={16} strokeWidth={2.25} className="text-orange-500 shrink-0" />
                <span className="text-gray-300 text-sm transition-colors group-hover:text-orange-400">administracionbaseit@baseit.com.ar</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Monasterio%20720%20Piso%3A%203%20Dpto%3A%20A%20-%20Capital%20Federal%2C%20Ciudad%20de%20Buenos%20Aires"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 group"
              >
                <MapPin size={16} strokeWidth={2.25} className="text-orange-500 shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm transition-colors group-hover:text-orange-400">Monasterio 720 Piso: 3 Dpto: A - Capital Federal, Ciudad de Buenos Aires</span>
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-start-7 md:col-span-2">
            <h4 className="text-lg font-semibold mb-3 text-orange-500">Servicios</h4>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Mantenimiento SAP</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Migración a la Nube</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Auditoría Digital</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs">© 2024 Baseit. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}