
import { Compass, Heart, Telescope } from "lucide-react";
import SEOHead from "../ui/SEOHead";
import { seoData } from "../../utils/seoData";

const About = () => {
  return (
    <>
      <SEOHead {...seoData.about} />
      <div className="overflow-hidden">
      {/* Hero reutilizado del inicio */}
      <section className="relative bg-gradient-to-br from-orange-50 to-red-50 pt-24 pb-12 md:py-16">
        <div className="mx-auto px-4 max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                <div className="space-y-4 md:space-y-6">
                  <div className="cascade-item cascade-delay-1 space-y-3 md:translate-y-14">
                    {/* Título simple */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-serif break-words">
                      <span className="block">Transformamos</span>
                      <span className="text-orange-600 block">tu visión</span>
                    </h1>
                    {/* Párrafos simples */}
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                      Con décadas de experiencia combinada, construimos el futuro tecnológico de tu empresa. Conoce al equipo que convierte desafíos complejos en soluciones innovadoras
                    </p>
                    <p className="text-sm sm:text-base text-gray-500">
                      Cada proyecto es una oportunidad de demostrar nuestra pasión por la excelencia tecnológica y el crecimiento empresarial
                    </p>
                  </div>
                </div>
                {/* Imagen */}
                <div className="relative mt-6 lg:mt-0 flex justify-center lg:justify-end">
                  <div className="w-full max-w-[700px]">
                    <img
                      src="/images/about-us-professional-team-meeting.webp"
                      alt="Equipo profesional en reunión colaborativa"
                      loading="lazy"
                      className="rounded-2xl shadow-xl w-[380px] h-[200px] md:w-[608px] md:h-[320px] object-cover md:mr-8 md:mt-14"
                    />
                  </div>
                </div>
              </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="sobre-nosotros" className="py-10 bg-gray-50">
        <div className="mx-auto px-4 max-w-7xl">
          {/* Mission, Vision, Values Cards */}
          <div className="py-6 md:py-10 mb-8">
            <div className="mx-auto px-4 md:px-6 max-w-7xl">
              {/* Header */}
              <div className="cascade-item cascade-delay-1 text-center mb-10 md:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                  Nuestros Valores
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 font-serif">
                  Lo que nos <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">define</span>
                </h2>
                <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Los pilares fundamentales que guían cada uno de nuestros proyectos y relaciones con clientes
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Misión */}
                <div className="cascade-item cascade-delay-1 group relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/90 border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 hover:shadow-lg md:hover:shadow-xl md:hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-5 rounded-2xl md:rounded-3xl transition-opacity duration-300"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                      <Compass className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Misión</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-700">
                      Proveer soluciones tecnológicas innovadoras que impulsen la transformación digital de nuestros clientes, 
                      brindando servicios de calidad con un enfoque personalizado y compromiso constante.
                    </p>
                  </div>
                </div>

                {/* Visión - CORREGIDO el error de sintaxis */}
                <div className="cascade-item cascade-delay-2 group relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/90 border border-gray-200/50 hover:border-purple-300/50 transition-all duration-300 hover:shadow-lg md:hover:shadow-xl md:hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-500 opacity-0 group-hover:opacity-5 rounded-2xl md:rounded-3xl transition-opacity duration-300"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                      <Telescope className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Visión</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-700">
                      Ser reconocidos como líderes en consultoría tecnológica, siendo referentes en innovación, 
                      excelencia en servicio y creadores de soluciones que transformen el panorama digital de América Latina.
                    </p>
                  </div>
                </div>

                {/* Valores */}
                <div className="cascade-item cascade-delay-3 group relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/90 border border-gray-200/50 hover:border-orange-300/50 transition-all duration-300 hover:shadow-lg md:hover:shadow-xl md:hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 opacity-0 group-hover:opacity-5 rounded-2xl md:rounded-3xl transition-opacity duration-300"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                      <Heart className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Valores</h3>
                    <div className="space-y-2 md:space-y-3 text-left">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-600">Innovación constante</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-600">Compromiso con resultados</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-600">Transparencia y honestidad</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-600">Trabajo en equipo</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-600">Excelencia en servicio</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

{/* Team Section - Rostros completos visibles */}
          <div className="mb-16">
            <div className="cascade-item cascade-delay-1 max-w-4xl mx-auto text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                Nuestro equipo
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 font-serif">
                Las personas detrás de <span className="text-orange-600">Baseit</span>
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-3">
                Contamos con miembros de distinto nivel de experiencia que se asignan, dependiendo la complejidad y
                urgencia de cada tarea.
              </p>
              <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto mt-5"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
  {[
    { name: "José Maciel", role: "Sap basis", image: "images/José Maciel.webp" },
    { name: "Luciano Soria", role: "Sap basis", image: "images/Luciano Soria.webp" },
    { name: "John Escobar", role: "Sap basis", image: "images/John Escobar.webp" },
    { name: "Mauricio Maciel", role: "Sap basis", image: "images/Mauricio Maciel.webp" },
    { name: "Cristian Maciel", role: "Sap basis", image: "images/Cristian Maciel.webp" },
    { name: "David Solaliga", role: "Sap basis", image: "images/David Solaliga.webp" },
    { name: "Nicolás Aquino", role: "Sap basis", image: "images/Nicolas Aquino.webp" },
    { name: "Antonella Fernández", role: "Sap basis", image: "images/Antonella Fernández.webp" },
    { name: "Agustín Córdoba", role: "Sap basis", image: "images/Agustin Cordoba.webp" },
    { name: "Verónica Vega", role: "Sap basis", image: "images/Veronica Vega.webp" },
    { name: "Leonardo Solaliga", role: "Sap basis", image: "images/Leonardo Solaliga.webp" },
    { name: "Jose Luis Gómez", role: "Sap basis", image: "images/Jose Luis Gomez.webp" },
    { name: "Julián Constantino", role: "Sap basis", image: "images/Julian Constantino.webp" },
  ].map((member, index) => (
    <div key={index} className={`cascade-item cascade-delay-${index + 1} text-center group`}>
      <div className="relative mb-4 overflow-hidden rounded-2xl">
        <img
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          loading="lazy"
          className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <h4 className="font-semibold text-gray-900 text-lg">{member.name}</h4>
      <p className="text-orange-600 font-medium">{member.role}</p>
      </div>
    ))}
            </div>
          </div>


        </div>
      </section>
      </div>
    </>
  );
};

export default About;