import { ArrowRight, Shield, Users, Eye, Server, Cloud } from "lucide-react";
import ContactForm from "../ui/contact-form";
import { Link } from "react-router-dom";
import CounterAnimation from "../ui/counter-animation";
import SEOHead from "../ui/SEOHead";
import { seoData } from "../../utils/seoData";


const Home = () => {
  return (
    <>
      <SEOHead {...seoData.home} />
      <div className="overflow-hidden">
      <section id="inicio" className="cascade-item cascade-delay-1 relative bg-gradient-to-br from-orange-50 to-red-50 pt-28 pb-12 md:py-20">
        <div className="mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-3 md:translate-y-20">
                {/* Título simple */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-serif break-words">
                  <span className="inline-block">
                    Somos{" "}
                  </span>
                  <span className="text-orange-600 inline-block">
                    Baseit
                  </span>
                </h1>
                
                {/* Párrafos simples */}
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Nombre derivado de nuestra iniciativa original, base o cimientos de IT. Esta figura nos ha permitido
                  crecer e incorporar nuevos talentos sumando décadas de experiencia.
                </p>
                <p className="text-sm sm:text-base text-gray-500">
                  Brindamos soluciones mediante un pool de recursos, ofreciendo así el mejor servicio en nuestra área.
                </p>
              </div>
              
              {/* Botones simples */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/servicios">
                <button className="group inline-flex items-center justify-center gap-2 w-full md:w-56 md:h-12 rounded-xl border-2 border-orange-600 bg-orange-600 text-white hover:bg-orange-700 hover:border-orange-700 font-semibold transition-all duration-300 text-base md:text-base py-4 md:py-3 transform hover:scale-105 hover:shadow-lg whitespace-nowrap md:mt-24">
                  Ver Servicios
                  <Eye className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                </button>
                </Link>
                <Link to="/sobre-nosotros">
                <button className="group inline-flex items-center justify-center gap-2 w-full md:w-56 md:h-12 rounded-xl border-2 border-orange-600 bg-transparent text-orange-600 hover:bg-orange-600 hover:text-white font-semibold transition-all duration-300 text-base md:text-base py-4 md:py-3 transform hover:scale-105 hover:shadow-lg whitespace-nowrap md:mt-24">
                  Sobre Nosotros
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                </Link>
              </div>
            </div>
            
            {/* Imagen simple */}
            <div className="relative mt-6 lg:mt-0 flex justify-center lg:justify-end">
              <div className="w-full max-w-[700px]">
                <img
                  src="/images/professional-business-consultation-meeting-with-la.webp"
                  alt="Equipo trabajando con tecnología moderna"
                  fetchPriority="high"
                  decoding="async"
                  className="rounded-2xl shadow-xl w-[380px] h-[200px] md:w-[608px] md:h-[320px] object-cover md:mr-8 md:mt-14"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección de servicios mejorada */}
      <section id="servicios" className="cascade-item cascade-delay-2 py-20 bg-gradient-to-br from-gray-50 to-orange-50/30 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-100/20 rounded-full blur-2xl"></div>
        

        <div className="mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Servicios Especializados
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Nuestros <span className="text-orange-600">Servicios</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Enfocados en <span className="font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">maximizar</span> el valor de la inversión de
              software, la personalización efectiva de servicios y la respuesta ágil para impulsar su crecimiento
            </p>
          </div>

          <div className="cascade-item cascade-delay-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: Shield,
                title: "Auditoría, identidad digital y seguridad",
                description: "Protección integral de sus sistemas y datos empresariales",
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-50",
                hoverColor: "hover:bg-purple-100",
                serviceId: "auditoria"
              },
              {
                icon: Server,
                title: "Soporte especializado SAP, Oracle, Unix, Linux y Windows",
                description: "Especialistas en sistemas SAP y plataformas críticas",
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-50",
                hoverColor: "hover:bg-green-100",
                serviceId: "soporte"
              },
              {
                icon: Users,
                title: "Asesoría IT especializada",
                description: "Consultoría para optimizar procesos y decisiones tecnológicas",
                color: "from-orange-500 to-orange-600",
                bgColor: "bg-orange-50",
                hoverColor: "hover:bg-orange-100",
                serviceId: "asesoria"
              },
              {
                icon: Cloud,
                title: "Migración a la nube",
                description: "Transición segura y eficiente hacia tecnologías cloud",
                color: "from-cyan-500 to-cyan-600",
                bgColor: "bg-cyan-50",
                hoverColor: "hover:bg-cyan-100",
                serviceId: "migracion"
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`group relative p-6 lg:p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 h-full ${service.hoverColor}`}
              >
                {/* Gradiente de fondo sutil */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed group-hover:text-gray-700">
                    {service.description}
                  </p>
                  
                  {/* Indicador de hover con link */}
                  <Link 
                    to={`/servicios?service=${service.serviceId}`}
                    className="mt-auto pt-6 inline-flex items-center text-sm font-medium text-gray-400 group-hover:text-orange-600 transition-colors hover:text-orange-500"
                  >
                    <span>Más información</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="cascade-item cascade-delay-4 py-16 bg-gray-50">
        <div className="mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="images/professional-handshake-business-meeting-modern-off.webp"
                alt="Reunión profesional de negocios"
                loading="lazy"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900 font-serif">
                  Más de <span className="text-orange-600">diez años</span> generando confianza
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Brindamos nuestros servicios a más de 50 empresas nacionales e internacionales que confían en nosotros
                  para optimizar sus modelos de negocio.
                </p>
                <p className="text-gray-600">
                  Trabajamos para empresas de diversos sectores, desde medianas hasta grandes corporaciones, incluyendo
                  industrias, comercio, servicios, y más.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <CounterAnimation end={50} prefix={"+"} />
                  <div className="text-gray-600">Empresas Atendidas</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <CounterAnimation end={10} suffix={"+"} />
                  <div className="text-gray-600">Años de Experiencia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="contacto" className="cascade-item cascade-delay-5 py-16 bg-white">
        <div className="mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              Comencemos tu Proyecto
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Sellemos el{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                próximo gran paso
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
              Tu visión tecnológica merece una ejecución perfecta. Conversemos sobre cómo podemos transformar 
              tus desafíos en oportunidades de crecimiento
            </p>
          </div>
          <ContactForm />
        </div>
      </section>   
      </div>
    </>
  );
};

export default Home;