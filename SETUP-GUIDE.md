# 🚀 Guía Completa: React + TypeScript + ESLint + Prettier + Husky

## 📖 Descripción

Esta guía documenta la configuración completa de un proyecto React con TypeScript incluyendo herramientas de calidad de código y Git hooks.

## 🛠 Stack Tecnológico Implementado

| Herramienta | Versión | Propósito                   |
| ----------- | ------- | --------------------------- |
| React       | ^19.1.1 | Biblioteca de UI            |
| TypeScript  | ~5.9.3  | Tipado estático             |
| Vite        | ^7.1.7  | Build tool y dev server     |
| ESLint      | ^9.37.0 | Linting y calidad de código |
| Prettier    | ^3.6.2  | Formateo de código          |
| Husky       | ^9.1.7  | Git hooks                   |
| lint-staged | ^16.2.4 | Linting en archivos staged  |

Comandos de Instalación y Configuración
Instalación Inicial

# Crear proyecto con Vite

npm create vite@latest my-react-app -- --template react-ts

# Instalar dependencias base

npm install

# Instalar herramientas de desarrollo

npm install -D eslint @eslint/js globals
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
npm install -D eslint-config-prettier eslint-plugin-prettier prettier
npm install -D husky lint-staged

Configuración de Husky

# Inicializar Husky

npx husky init

# Crear hooks manualmente (Windows)

echo "npx lint-staged" > .husky/pre-commit
echo "npx tsc --noEmit || exit 0" >> .husky/pre-commit
echo "npm run lint" > .husky/pre-push
echo "npm run type-check" >> .husky/pre-push

Flujo de Trabajo

Desarrollo Normal

npm run dev # Desarrollo con hot reload

Los hooks automáticos hacen:
pre-commit: ESLint + Prettier en archivos modificados + TypeScript check

pre-push: Linting completo + TypeScript check completo

Configuración para VS Code

{
"terminal.integrated.env.windows": {},
"console-ninja.featureSet": "Community",
"workbench.colorTheme": "Aura Dark",
"editor.minimap.enabled": false,
"workbench.settings.applyToAllProfiles": ["editor.accessibilityPageSize"],
"editor.fontSize": 16,
"editor.wordWrap": "on",
"typescript.updateImportsOnFileMove.enabled": "always",

// Configuración esencial añadida:
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
"source.fixAll.eslint": "explicit"
},
"files.eol": "\n",
"typescript.preferences.importModuleSpecifier": "relative",
"emmet.includeLanguages": {
"typescript": "html",
"typescriptreact": "html"
},
"eslint.enable": true,
"eslint.format.enable": true,
"eslint.validate": [
"javascript",
"javascriptreact",
"typescript",
"typescriptreact"
],

// Configuración específica por lenguaje
"[javascript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascriptreact]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescriptreact]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[html]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[css]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[scss]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"editor.mouseWheelZoom": true,
"editor.linkedEditing": true,
"editor.guides.bracketPairs": true,
"[json]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
}
}

## 📁 Estructura del Proyecto

react-typescript-husky-setup/
├── .husky/ # Git hooks
│ ├── pre-commit # Ejecuta lint-staged y type-check
│ └── pre-push # Ejecuta lint completo y type-check
├── .vscode/ # Configuración del editor (opcional)
├── public/ # Archivos públicos
├── src/ # Código fuente
├── .editorconfig # Configuración consistente entre editores
├── .eslintignore # Archivos ignorados por ESLint
├── .eslintrc.js # Configuración de ESLint
├── .gitattributes # Configuración de line endings
├── .gitignore # Archivos ignorados por Git
├── .prettierignore # Archivos ignorados por Prettier
├── .prettierrc # Configuración de Prettier
├── package.json # Dependencias y scripts
├── SETUP-GUIDE.md # Esta guía
├── tsconfig.json # Configuración de TypeScript
└── vite.config.ts # Configuración de Vite

## ⚙️ Configuraciones Detalladas

### 1. ESLint Configuration (`eslint.config.js`)

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default defineConfig([
  // Configuración base
  { ignores: ['dist/**', 'node_modules/**', 'build/**'] },

  // TypeScript
  ...tseslint.configs.recommended,

  // React
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { react, 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
    },
    settings: { react: { version: 'detect' } },
  },

  // TypeScript rules específicas
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // Prettier integration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { prettier: eslintPluginPrettier },
    rules: { 'prettier/prettier': 'error' },
  },

  eslintConfigPrettier,
])

### 2. Prettier Configuration (.prettierrc)

{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "auto",
  "useTabs": false,
  "jsxSingleQuote": true,
  "quoteProps": "as-needed"
}

### 3. Husky Hooks (.husky/pre-commit)  (.husky/pre-push)

pre-commit

#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
npx tsc --noEmit || exit 0

pre-push

#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npm run type-check

### 4. Prettier Configuration (.prettierrc)

{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "**/*.d.ts"],
  "exclude": ["node_modules", "dist"]
}

### 5. Package.json Scripts

{
  "scripts": {
    "prepare": "husky",
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx --max-warnings 0",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,css,md,mdx}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,css,md,mdx}\"",
    "type-check": "tsc --noEmit",
    "lint:format": "npm run lint:fix && npm run format"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md,mdx}": ["prettier --write"]
  }
}

Solución de Problemas Comunes

Problema: Husky no se ejecuta en Windows

# Verificar permisos

git config core.hooksPath

# Si está vacío:

git config core.hooksPath .husky

# Forzar reinstalación

rm -rf .husky
npx husky init

Problema: Advertencia DEPRECATED en Husky

. "$(dirname "$0")/\_/husky.sh"

En lugar de:

. "$(dirname -- "$0")/\_/husky.sh"

Delete ␍eslintprettier/prettier" en Windows
Síntomas: Error de line endings al hacer commit
Solución:

En .prettierrc, cambiar "endOfLine": "lf" por "endOfLine": "auto"

Crear archivo .gitattributes:

# Establece el comportamiento para todos los archivos
* text=auto

# Fuerza LF para estos tipos de archivos
*.js text eol=lf
*.jsx text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.json text eol=lf
*.css text eol=lf
*.md text eol=lf
*.html text eol=lf
*.yml text eol=lf
*.yaml text eol=lf

# Archivos binarios que no deben ser modificados
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.svg binary
*.ttf binary

```
