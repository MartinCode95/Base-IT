#!/bin/bash

echo "🚀 Instalando Backend BaseIT..."
echo

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor, instala Node.js 18+ desde https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js encontrado"
node --version

# Crear directorio backend si no existe
if [ ! -d "backend" ]; then
    echo "📁 Creando directorio backend..."
    mkdir -p backend
fi

# Cambiar al directorio backend
cd backend

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo "✅ Dependencias instaladas correctamente"

# Crear archivo .env si no existe
if [ ! -f ".env" ]; then
    echo "📝 Creando archivo .env..."
    cp "env.example" ".env"
    echo
    echo "⚠️  IMPORTANTE: Edita el archivo .env con tus credenciales de email"
    echo
    echo "📧 Para configurar Gmail:"
    echo "   1. Activa verificación en 2 pasos"
    echo "   2. Genera contraseña de aplicación"
    echo "   3. Usa esa contraseña en EMAIL_PASS"
    echo
    read -p "Presiona Enter para continuar..."
fi

echo
echo "🎯 Para iniciar el backend:"
echo "   npm run dev    # Desarrollo"
echo "   npm start      # Producción"
echo
echo "🔍 Endpoints disponibles:"
echo "   POST http://localhost:3001/api/contact"
echo "   GET  http://localhost:3001/health"
echo
echo "✨ ¡Backend instalado exitosamente!"

