// src/hooks/usePreventScroll.ts
import { useEffect } from 'react';

export const usePreventScroll = () => {
  useEffect(() => {
    // Solución CSS directa pero controlada
    const style = document.createElement('style');
    style.textContent = `
      html, body { 
        overflow-x: hidden; 
        width: 100%;
        max-width: 100%;
      }
      
      .force-contain {
        max-width: 100%;
        overflow-x: hidden;
      }
    `;
    
    document.head.appendChild(style);
    
    // Aplicar a elementos problemáticos
    const applyContainment = () => {
      const containers = document.querySelectorAll('.container, .mx-auto, .max-w-7xl');
      containers.forEach(container => {
        (container as HTMLElement).classList.add('force-contain');
      });
    };
    
    setTimeout(applyContainment, 100);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
};