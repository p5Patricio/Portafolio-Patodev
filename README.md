# Portafolio — Patricio García

Portafolio personal bilingüe para presentar experiencia, proyectos, herramientas y contacto profesional con una identidad visual oscura tipo **CyberDuck**: fondo negro, trazos de luz SVG, acentos cian/amarillo/rojo y componentes glass minimalistas.

[![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF?logo=vite)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-19.2.5-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

## Qué incluye

- **Hero cinematográfico** con logo personal y rayos de luz SVG separados para desktop/mobile.
- **Navegación responsive**: navbar desktop, selector de idioma fijo y navegación inferior en móvil.
- **Experiencia** con timeline, imágenes ampliables y certificaciones.
- **Proyectos destacados** en tarjetas con carrusel de miniaturas y CTA a la galería completa.
- **Galería completa** minimalista agrupada por año.
- **Herramientas** con categorías técnicas, iconografía y narrativa de stack.
- **Sobre mí** con presentación personal, homenaje visual y rangos competitivos.
- **Contacto** con tarjetas ordenadas, formulario y endpoint serverless de Resend.
- **ES/EN** con traducciones centralizadas en React Context.

## Stack

| Área | Tecnología |
| --- | --- |
| UI | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Estilos | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animación | Framer Motion |
| Routing | React Router DOM v7 |
| Iconos | Lucide React + React Icons |
| Email | Vercel Serverless Function + Resend |
| Tests | Vitest + React Testing Library + jsdom |
| Package manager | pnpm |

## Inicio rápido

```bash
pnpm install
pnpm dev
```

Comandos principales:

```bash
pnpm build      # TypeScript + build de producción
pnpm test       # Tests en modo watch
pnpm test -- --run
pnpm lint       # ESLint
pnpm preview    # Preview del build local
pnpm coverage   # Cobertura de tests
```

## Variables de entorno

Copia `.env.example` a `.env` para desarrollo local o configura estas variables en Vercel:

| Variable | Uso |
| --- | --- |
| `RESEND_API_KEY` | API key de Resend para enviar mensajes. |
| `RESEND_TO_EMAIL` | Correo destino del formulario de contacto. |
| `RESEND_FROM_EMAIL` | Remitente verificado en Resend. |

## Estructura actual

```text
api/
└── send-email.ts              # Endpoint serverless para el formulario
public/
├── LogoDark.*                 # Logo e iconos del sitio
├── projects/thumbs/           # Miniaturas usadas por las tarjetas
├── ranks/                     # Insignias competitivas en WebP
├── certificacion-ia.webp      # Certificación mostrada en Experiencia
├── garou-2.jpg                # Imagen homenaje en Sobre mí
├── mazda-new-logo.jpg         # Logo usado en Experiencia
├── titulo.webp                # Imagen de graduación/título
└── og-image.png               # Imagen Open Graph
src/
├── components/                # UI reusable: navegación, tarjetas, iconos, fondos
├── context/                   # LanguageProvider y hook de idioma
├── data/                      # Traducciones, repositorios y skills
├── hooks/                     # Hooks de navegación activa
├── pages/                     # Home y Galería
├── sections/                  # Hero, Experiencia, Proyectos, Herramientas, Sobre mí, Contacto
├── setupTests.ts              # Setup global de Vitest
└── test-utils.tsx             # Render helper con providers
```

## Diseño y contenido

| Sección | Propósito |
| --- | --- |
| `Hero` | Primera impresión visual con trazos SVG desktop/mobile. |
| `Experiencia` | Formación, prácticas y certificaciones con modal de imagen. |
| `Proyectos` | Selección principal de proyectos y enlace a `/galeria`. |
| `Herramientas` | Stack técnico agrupado por frontend, backend, IA y workflow. |
| `SobreMi` | Bio, filosofía personal y rangos competitivos. |
| `Contacto` | Links profesionales y formulario conectado a Resend. |
| `/galeria` | Lista completa de proyectos agrupados por año. |

## Tests pertinentes

La suite cubre comportamiento visible del portafolio actual:

- Render de rutas principales (`App`, `HomePage`, `GaleriaPage`).
- Navegación desktop/mobile y selector de idioma.
- Secciones críticas: Hero, Experiencia, Proyectos, Herramientas, Sobre mí y Contacto.
- Formulario de contacto: campos, submit exitoso/error y orden de tarjetas.
- API de contacto: métodos permitidos, validación, honeypot y envío con Resend mockeado.
- Tarjetas de proyecto: links, estado privado, tecnologías y CTAs.
- Componentes UI compartidos: `PillButton`, `SectionHeader`, `LanguageSelector`.

## Limpieza del repositorio

El repositorio debe mantener solo assets usados por la app. `.gitignore` bloquea artefactos locales o temporales como:

- `dist/`, `coverage/`, `.vite/`, `*.tsbuildinfo`.
- `.env*` locales y `.vercel/`.
- imágenes temporales de ChatGPT o referencias visuales (`ChatGPT Image*.png`, `public/hero-reference-*.png`).
- imágenes full-size duplicadas en `public/projects/*.webp`; la app usa `public/projects/thumbs/`.
- backups (`*.backup`) y prompts scratch (`prompts-*.md`).

## Deploy

La app está preparada para Vercel:

1. Configura las variables de Resend en el dashboard.
2. Ejecuta `pnpm build` localmente antes de publicar cambios grandes.
3. Vercel sirve el frontend estático y `api/send-email.ts` como function.

## Autor

**Patricio García Pérez Vela**

- GitHub: [p5Patricio](https://github.com/p5Patricio)
- LinkedIn: [patricioagpv](https://www.linkedin.com/in/patricioagpv/)
- Email: [pa.garciaperezvela@ugto.mx](mailto:pa.garciaperezvela@ugto.mx)
