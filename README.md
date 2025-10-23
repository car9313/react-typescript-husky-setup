# React TypeScript Husky Setup

Este proyecto es una configuración completa de React con TypeScript, que incluye ESLint, Prettier, Husky y lint-staged.

## Características

- ⚛️ React 18
- 🔷 TypeScript
- 🚀 Vite
- 📏 ESLint con configuración estricta
- 💖 Prettier con integración con ESLint
- 🐶 Husky para git hooks
- 🔍 lint-staged para ejecutar linters en archivos staged

## Scripts

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta ESLint
- `npm run lint:fix` - Ejecuta ESLint y arregla los problemas automáticamente
- `npm run format` - Formatea el código con Prettier
- `npm run type-check` - Verifica los tipos de TypeScript

## Configuración de Git Hooks

- `pre-commit`: Ejecuta lint-staged (ESLint y Prettier) y verificación de tipos.
- `pre-push`: Ejecuta lint y verificación de tipos en todo el proyecto.

## Uso

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Ejecuta `npm run dev` para iniciar el servidor de desarrollo.
