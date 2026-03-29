import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoNavbar from '../../assets/Identidad Corporativa/Logo_BaseIT_ap_color_positivo_RGB.png';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Sobre nosotros', href: '/sobre-nosotros' }
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  
  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      scrollToContactSection();
    } else {
      navigate('/');
      setTimeout(() => {
        scrollToContactSection();
      }, 100);
    }
    
    setIsMenuOpen(false);
  };

  const scrollToContactSection = (): void => {
    const contactoSection = document.getElementById('contacto');
    if (contactoSection) {
      const navbarHeight = 64;
      const offsetTop = contactoSection.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const closeMobileMenu = (): void => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (location.pathname === '/') {
      // Si ya estamos en home, hacer scroll to top en lugar de navegar
    
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    closeMobileMenu();
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm">
      {/* Contenedor principal ajustado */}
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20 relative">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center hover:opacity-80 transition-opacity z-10"
            onClick={handleLogoClick}
          >
            <img 
              src={logoNavbar}
              alt="BaseIT"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Menu - Items del centro - CORREGIDO */}
          <div className="hidden md:flex items-center justify-center absolute left-0 right-0 mx-auto w-auto max-w-max">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    isActive 
                      ? 'text-orange-500 font-semibold'
                      : 'text-gray-600 hover:text-orange-500'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Menu - Contacto a la derecha */}
          <div className="hidden md:flex items-center space-x-6 z-10">
            <button
              onClick={handleContactClick}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
            >
              Contacto
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors z-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Abrir menú principal"
          >
            {!isMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Items normales en mobile */}
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors ${
                      isActive 
                        ? 'text-orange-500 font-semibold' 
                        : 'text-gray-600 hover:text-orange-500'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              {/* Contacto como botón en mobile */}
              <button
                onClick={handleContactClick}
                className="block w-full text-left px-3 py-2 rounded-xl text-base font-medium bg-orange-500 text-white hover:bg-orange-600"
              >
                Contacto
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;