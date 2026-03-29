import ServicesTabs from "../ui/services-tabs";
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom";
import SEOHead from "../ui/SEOHead";
import { seoData } from "../../utils/seoData";

const Services = () => {
  const navigate = useNavigate();

  const handleContactClick = (): void => {
    if (window.location.pathname === '/') {
      scrollToContactSection();
    } else {
      navigate('/');
      setTimeout(() => {
        scrollToContactSection();
      }, 100);
    }
  };

  const scrollToContactSection = (): void => {
    const contactoSection = document.getElementById('contacto');
    if (contactoSection) {
      const navbarHeight = 80;
      const offsetTop = contactoSection.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <SEOHead {...seoData.services} />
      <section className="w-full overflow-x-hidden">
      {/* Hero reutilizado del inicio */}
      <section className="relative bg-gradient-to-br from-orange-50 to-red-50 pt-24 pb-12 md:py-16">
        <div className="mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="space-y-4 md:space-y-6">
              <div className="cascade-item cascade-delay-1 space-y-12 md:translate-y-14">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-serif break-words">
                  <span className="inline-block">Nuestros Servicios{" "}</span>
                  <span className="text-orange-600 inline-block">Especializados</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Explora nuestras diferentes áreas de especialización en infraestructura SAP y descubre cómo podemos transformar tu negocio
                </p>
              </div>
            </div>
            <div className="relative mt-6 lg:mt-0 flex justify-center lg:justify-end">
              <div className="w-full max-w-[700px]">
                <img
                  src="/images/services-it-infrastructure-consulting.webp"
                  alt="Consultoría especializada en infraestructura IT"
                  loading="lazy"
                  className="rounded-2xl shadow-xl w-[380px] h-[200px] md:w-[608px] md:h-[320px] object-cover md:mr-8 md:mt-14"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eliminé el div contenedor extra */}
      <ServicesTabs />

      <section className="py-20 bg-orange-600 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-white font-serif">¿Listo para optimizar su infraestructura IT?</h2>
            <p className="text-xl text-orange-100">
              Contacte con nuestros especialistas y descubra cómo podemos ayudar a su empresa a crecer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleContactClick}
                className="cascade-item cascade-delay-1 group bg-white text-orange-600 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 justify-center transform hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-gray-800"
              >
                Contactar Ahora
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
      </section>
    </>
  );
};

export default Services;