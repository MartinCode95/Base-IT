import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Footer from './components/ui/Footer';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import NotFound from './components/sections/Notfound';
import "./styles/global.css";
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen w-full overflow-hidden">
        <Navbar />
        <main className="flex-grow w-full overflow-x-hidden">
          <div className="w-full">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre-nosotros" element={<About />} />
                <Route path="/servicios" element={<Services />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;