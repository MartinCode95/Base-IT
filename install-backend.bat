@echo off
echo 🚀 Instalando Backend BaseIT...
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado. Por favor, instala Node.js 18+ desde https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js encontrado
node --version

REM Crear directorio backend si no existe
if not exist "backend" (
    echo 📁 Creando directorio backend...
    mkdir backend
)

REM Cambiar al directorio backend
cd backend

REM Instalar dependencias
echo 📦 Instalando dependencias...
npm install

if %errorlevel% neq 0 (
    echo ❌ Error al instalar dependencias
    pause
    exit /b 1
)

echo ✅ Dependencias instaladas correctamente

REM Crear archivo .env si no existe
if not exist ".env" (
    echo 📝 Creando archivo .env...
    copy "env.example" ".env"
    echo.
    echo ⚠️  IMPORTANTE: Edita el archivo .env con tus credenciales de email
    echo.
    echo 📧 Para configurar Gmail:
    echo    1. Activa verificación en 2 pasos
    echo    2. Genera contraseña de aplicación
    echo    3. Usa esa contraseña en EMAIL_PASS
    echo.
    pause
)

echo.
echo 🎯 Para iniciar el backend:
echo    npm run dev    # Desarrollo
echo    npm start      # Producción
echo.
echo 🔍 Endpoints disponibles:
echo    POST http://localhost:3001/api/contact
echo    GET  http://localhost:3001/health
echo.
echo ✨ ¡Backend instalado exitosamente!
pause
