# Portafolio

> Portafolio personal con estética japonesa **Sumi-e** (tinta sobre papel washi).

[![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF?logo=vite)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-19.2.5-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

## ✨ Vista previa

Single-page application con navegación por secciones, animaciones de pétalos de sakura en CSS puro, y un sistema de sellos *hanko* que acompaña cada título.

- 🌸 **Tema visual**: Paleta Sumi-e con tinta (`#1a1a1a`), papel washi (`#f4eee0`) y sakura (`#c95b64`)
- 🈯 **Bilingüe**: Español / Inglés con cambio instantáneo
- 📱 **Responsive**: Mobile-first con navbar flotante tipo cápsula de cristal
- 🎨 **Tipografía**: *Edo SZ* self-hosted para estética de pincel japones
- ✨ **Animaciones**: Framer Motion + scroll-driven transforms en el Hero

## 🚀 Stack técnico

| Capa | Tecnología |
|------|------------|
| Build | Vite 8 |
| Framework | React 19 |
| Lenguaje | TypeScript 6 |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion |
| Routing | React Router DOM v7 |
| Iconos | Lucide React + React Icons |
| Testing | Vitest + React Testing Library |

## 🛠️ Decisiones técnicas

- **Vite sobre CRA**: Tiempo de build ~450ms vs minutos en CRA. HMR instantáneo.
- **Tailwind v4**: Nuevo engine `@tailwindcss/vite` sin PostCSS. `@theme` para tokens de diseño propios.
- **Context API para i18n**: Suficiente para 2 idiomas. Sin librería externa = menos bundle.
- **Framer Motion**: `useScroll` + `useTransform` para el parallax del Hero sin librerías pesadas.
- **CSS puro para sakura**: `@keyframes sakura-fall` con `will-change` para 60fps sin JS.

## 📦 Instalación

```bash
# Clonar
$ git clone https://github.com/p5Patricio/portafolio.git
$ cd portafolio

# Instalar dependencias
$ pnpm install

# Desarrollo
$ pnpm dev

# Build de producción
$ pnpm build

# Preview local
$ pnpm preview

# Tests
$ pnpm test

# Lint
$ pnpm lint
```

## 🧪 Testing

```bash
# Unit + integration tests
$ pnpm test

# Con UI interactiva
$ pnpm test:ui

# Cobertura
$ pnpm coverage
```

## 📁 Estructura de carpetas

```
src/
├── components/       # Componentes reutilizables (UI puros)
├── sections/         # Secciones de la página (Hero, SobreMi, etc.)
├── pages/            # Rutas de React Router
├── context/          # React Context (i18n)
├── data/             # Datos estáticos (proyectos, skills, traducciones)
├── assets/           # Imágenes, fuentes, fondos
└── setupTests.ts     # Configuración de Vitest
```

## 🚢 Deploy

El proyecto está configurado para deploy estático en cualquier CDN:

```bash
npm run build
# Subir la carpeta `dist/` a Vercel, Netlify, Cloudflare Pages, etc.
```

## 📝 Roadmap

- [x] Sección de proyectos con tarjetas interactivas
- [x] Galería completa de repositorios por año
- [x] Sistema de traducción ES/EN
- [x] Skip-to-content link (accesibilidad)
- [ ] Conectar formulario de contacto (EmailJS / Formspree)
- [ ] Blog técnico

## 👤 Autor

**Patricio García Pérez Vela**
- 📧 [pa.garciaperezvela@ugto.mx](mailto:pa.garciaperezvela@ugto.mx)
- 💼 [LinkedIn](https://www.linkedin.com/in/patricioagpv/)
- 🐙 [GitHub](https://github.com/p5Patricio)

---

*Construido con paciencia, un pincel digital y mucho café.* ☕🌸
