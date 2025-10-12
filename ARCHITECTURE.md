# Math Racer
Aplicación frontend desarrollada con **React + Vite**.

# Tecnologías principales
React 18
Vite
TypeScript
ESLint

# Requisitos
npm

# Scripts principales
npm install       # instalar dependencias
npm run dev       # correr en modo desarrollo
npm run build     # compilar para producción
npm run lint      # ver errores y warnings

# Estructura de carpetas
public/               # Archivos públicos
src/                  # Código fuente de la aplicación
  assets/             # Recursos como imágenes, fuentes, íconos, audios
  components/         # UI reutilizable, separada por vistas
  models/             # Definición de entidades
    domain/           # Entidades reflejo del backend
    enums/            # Enums o type unions (pueden ser compartidos entre DTO y UI)
    mappers/          # Funciones que convierten entidades de domain/ a ui/
    ui/               # Entidades usadas solo en la UI
  pages/              # Vistas principales (se asocian a rutas)
  router/             # Configuración de rutas
  services/           # Llamadas a la API
  utils/              # Funciones auxiliares
  shared/             # Componentes reutilizables del layout, ej. sidebar, navbar, modals, buttons
  hooks/              # Lógica que se va a usar en distintos lugares de la aplicación

# Librerías utilizadas
tailwindcss         # Framework de diseño
fontawesome         # Biblioteca de iconos
framer-motion       # Biblioteca de movimiento
signalR             # Comunicación en tiempo real entre servidor y cliente
axios               # Biblioteca de JavaScript para gestionar solicitudes HTTP

# Testing
testing-library/jest-dom        # Añade matchers personalizados para assertions en el DOM
testing-library/react           # Permite renderizar componentes, simular eventos y hacer queries sobre el DOM
vitest                          # Test runner