import type { TechId } from '../components/TechIcon'

export type ProjectIllustration = 'mountain' | 'torii' | 'pagoda'

export interface Repo {
  /** Slug used as React key and i18n key. */
  id: string
  /** Display name (same in ES and EN). */
  name: string
  /**
   * Short Spanish subtitle / role (e.g. "Plataforma e-commerce", "Asistente IA").
   */
  subtitle: { es: string; en: string }
  /** One-paragraph elevator pitch in both languages. */
  description: { es: string; en: string }
  /** Tech stack — drives the icon row. */
  technologies: TechId[]
  /** Primary GitHub URL (front-end repo when split). */
  repoUrl: string
  /** Optional companion repo (backend / frontend split). */
  companionUrl?: string
  /** Live URL if deployed. */
  liveUrl?: string
  /** Approximate work period (free-form). */
  period: string
  /** Year for sorting / filtering. */
  year: number
  /** True if the GitHub repo is private (still listed; only the link is hidden). */
  isPrivate: boolean
  /** When true, this repo is shown on the homepage Proyectos section. */
  featured: boolean
  /**
   * Optional illustration glyph used for the carousel placeholder until images
   * are uploaded.
   */
  illustration?: ProjectIllustration
  /**
   * Optional list of image paths (from /public). Empty = show placeholder.
   */
  images?: string[]
}

// ---------- Repo registry ----------

export const REPOS: Repo[] = [
  // ---- 2026 ----
  {
    id: 'rey-asesino',
    name: 'Rey Asesino',
    subtitle: {
      es: 'Plataforma e-commerce & PWA de moda urbana',
      en: 'Urban streetwear e-commerce platform & PWA',
    },
    description: {
      es: 'Plataforma e-commerce full-stack de alto rendimiento. Backend con FastAPI + SQLAlchemy, base de datos PostgreSQL y almacenamiento R2 en Cloudflare (optimización de imágenes WebP en tiempo real); frontend en Next.js 16 con React 19 y soporte PWA.',
      en: 'High-performance full-stack e-commerce platform. FastAPI + SQLAlchemy backend, PostgreSQL database, and Cloudflare R2 storage (on-the-fly WebP image optimization), with a Next.js 16 + React 19 frontend and PWA support.',
    },
    technologies: ['python', 'fastapi', 'sqlalchemy', 'postgres', 'cloudflare', 'next', 'react', 'ts', 'tailwind'],
    repoUrl: 'https://github.com/p5Patricio/reyasesino-frontend',
    companionUrl: 'https://github.com/p5Patricio/reyasesino-backend',
    liveUrl: 'https://reyasesino-frontend.vercel.app/',
    period: '2026',
    year: 2026,
    isPrivate: true,
    featured: true,
    illustration: 'pagoda',
    images: ['/projects/thumbs/rey-asesino.webp'],
  },
  {
    id: 'd-mox',
    name: 'DEMOX',
    subtitle: {
      es: 'Plataforma de inteligencia política con IA',
      en: 'AI political intelligence platform',
    },
    description: {
      es: 'Plataforma full-stack de inteligencia de medios y análisis político en Guanajuato. Ingesta y NLP en español con spaCy y sentence-transformers, tareas asíncronas con Celery y Redis, migraciones con Alembic, búsqueda semántica vectorial con PostgreSQL + pgvector, y un motor de razonamiento que combina Gemini y Groq; frontend reactivo en Next.js con TypeScript.',
      en: 'Full-stack platform for media intelligence and political analysis in Guanajuato. Spanish NLP and ingestion with spaCy and sentence-transformers, async task processing with Celery and Redis, Alembic migrations, vector semantic search via PostgreSQL + pgvector, and a reasoning engine combining Gemini and Groq; reactive Next.js frontend with TypeScript.',
    },
    technologies: ['python', 'fastapi', 'postgres', 'gemini', 'groq', 'next', 'ts', 'tailwind', 'docker'],
    repoUrl: 'https://github.com/p5Patricio/Demox-Frontend',
    companionUrl: 'https://github.com/p5Patricio/Demox-Backend',
    liveUrl: 'https://demox.patodev.com/',
    period: '2026',
    year: 2026,
    isPrivate: true,
    featured: true,
    illustration: 'mountain',
    images: ['/projects/thumbs/demox.webp'],
  },
  {
    id: 'whisperkey',
    name: 'WhisperKey',
    subtitle: {
      es: 'Dictado por voz local e IA privada',
      en: '100% local voice dictation & private AI',
    },
    description: {
      es: 'Sistema de dictado por voz 100% privado y local con el motor nativo whisper.cpp — sin nube, sin API keys. Dictado bilingüe (Español/Inglés) con inyección instantánea de texto en cualquier aplicación, wizard de onboarding, instalador de Windows liviano (~28 MB) y soporte Windows/Linux/macOS.',
      en: '100% private, local voice dictation system powered by the native whisper.cpp engine — no cloud, no API keys. Bilingual (ES/EN) dictation with instant text injection into any application, an onboarding wizard, a lightweight (~28 MB) Windows installer, and cross-platform support (Windows/Linux/macOS).',
    },
    technologies: ['python', 'whisper', 'windows'],
    repoUrl: 'https://github.com/p5Patricio/WhisperKey',
    liveUrl: 'https://whisperkey.symmetricalcode.com/',
    period: '2026',
    year: 2026,
    isPrivate: false,
    featured: true,
    images: ['/projects/thumbs/whisperkey.webp'],
  },
  {
    id: 'garou',
    name: 'Garou',
    subtitle: {
      es: 'App Android de entrenamiento y nutrición offline-first',
      en: 'Offline-first Android fitness & nutrition app',
    },
    description: {
      es: 'Aplicación Android offline-first construida con Expo y React Native para el registro de rutinas de hipertrofia, nutrición y métricas de progreso, con persistencia local en SQLite y sincronización con Android Health Connect, sin depender de conexión a internet.',
      en: 'Offline-first Android app built with Expo and React Native for logging hypertrophy training routines, nutrition plans, and progress metrics, with local SQLite persistence and Android Health Connect integration — no internet connection required.',
    },
    technologies: ['expo', 'react', 'ts', 'sqlite'],
    repoUrl: 'https://github.com/p5Patricio/garou',
    period: '2026',
    year: 2026,
    isPrivate: false,
    featured: false,
    images: ['/projects/thumbs/garou.webp'],
  },
  {
    id: 'mcp-agenda',
    name: 'MCP Agenda',
    subtitle: {
      es: 'Servidor MCP de gestión de agenda para agentes de IA',
      en: 'MCP calendar management server for AI agents',
    },
    description: {
      es: 'Servidor MCP publicado en npm (mcp-agenda) con 11 herramientas para la gestión inteligente de calendarios por agentes de IA. Procesamiento de lenguaje natural en español e inglés vía chrono-node, persistencia en SQLite y soporte multiagente.',
      en: 'MCP server published on npm (mcp-agenda) featuring 11 tools for intelligent calendar management by AI agents. Spanish/English natural language parsing via chrono-node, SQLite persistence, and multi-agent support.',
    },
    technologies: ['ts', 'node', 'sqlite'],
    repoUrl: 'https://github.com/p5Patricio/mcp-agenda',
    period: '2026',
    year: 2026,
    isPrivate: false,
    featured: false,
    images: ['/projects/thumbs/mcp-agenda.webp'],
  },
  {
    id: 'eclipse-desktop-agent',
    name: 'Eclipse Desktop Agent',
    subtitle: {
      es: 'Asistente de voz de escritorio con visión y automatización',
      en: 'Voice desktop assistant with vision & automation',
    },
    description: {
      es: 'Asistente de voz estilo Jarvis para Windows con wake word y síntesis TTS locales, orquestación de LLM intercambiable (DeepSeek, Ollama local u OpenAI) e integración de herramientas vía MCP. Incluye instalador de Windows, app de configuración con GUI, kill switch global y log auditable de cada acción.',
      en: 'Jarvis-style voice assistant for Windows with local wake-word detection and TTS, a swappable LLM backend (DeepSeek, local Ollama, or OpenAI), and MCP tool integration. Ships with a Windows installer, a GUI settings app, a global kill switch, and an auditable action log.',
    },
    technologies: ['python', 'ollama', 'openai', 'windows'],
    repoUrl: 'https://github.com/p5Patricio/eclipse-desktop-agent',
    period: '2026',
    year: 2026,
    isPrivate: false,
    featured: false,
    illustration: 'torii',
    images: ['/projects/thumbs/eclipse-desktop-agent.webp'],
  },
  {
    id: 'interprete-lsm',
    name: 'Intérprete LSM',
    subtitle: {
      es: 'Traductor de Lengua de Señas Mexicana en tiempo real',
      en: 'Real-time Mexican Sign Language interpreter',
    },
    description: {
      es: 'Sistema de visión por computadora para la interpretación en tiempo real de la Lengua de Señas Mexicana (LSM). Utiliza MediaPipe para la detección de puntos clave de manos y cuerpo y modelos de TensorFlow para clasificación.',
      en: 'Computer vision system for real-time interpretation of Mexican Sign Language (LSM). Leverages MediaPipe for hand/body landmark detection and custom TensorFlow neural networks for classification.',
    },
    technologies: ['python', 'tensorflow', 'opencv', 'numpy'],
    repoUrl: 'https://github.com/p5Patricio/Interprete-LSM',
    period: '2025',
    year: 2025,
    isPrivate: false,
    featured: false,
    images: ['/projects/thumbs/interprete-lsm.webp'],
  },
  {
    id: 'esteganobot',
    name: 'EsteganoBOT',
    subtitle: {
      es: 'Plataforma de esteganografía digital en imágenes',
      en: 'Digital image steganography platform',
    },
    description: {
      es: 'Plataforma full-stack de esteganografía digital en imágenes (PNG/JPEG) con protección opcional por contraseña. Backend endurecido para producción: validación de magic bytes, límite de tamaño de archivo, rate limiting, sanitización de errores y limpieza automática de archivos temporales.',
      en: 'Full-stack digital image steganography platform (PNG/JPEG) with optional password protection. Production-hardened backend: magic-bytes validation, file-size limits, rate limiting, error sanitization, and automatic temp-file cleanup.',
    },
    technologies: ['vue', 'js', 'node'],
    repoUrl: 'https://github.com/p5Patricio/EsteganoBOT-frontend',
    companionUrl: 'https://github.com/p5Patricio/EsteganoBOT-backend',
    period: '2025 – 2026',
    year: 2025,
    isPrivate: false,
    featured: false,
    images: ['/projects/thumbs/esteganobot.webp'],
  },
  {
    id: 'archetype-nba',
    name: 'ArchetypeNBA',
    subtitle: {
      es: 'Plataforma de scouting y analítica NBA con IA',
      en: 'AI-powered NBA scouting & analytics platform',
    },
    description: {
      es: 'Plataforma de analítica deportiva, machine learning y scouting táctico de la NBA. Backend FastAPI + PostgreSQL con motor de clustering y clasificación en scikit-learn sobre datos oficiales de la NBA API (23+ temporadas); frontend Next.js 16 con más de diez módulos (perfilamiento de jugadores, simulación 5 vs 5, +EV de props, matchups defensivos). Evolucionó desde un script de scikit-learn hasta una plataforma full-stack con 61 tests automatizados.',
      en: 'Sports-science, machine-learning, and tactical scouting platform for the NBA. FastAPI + PostgreSQL backend with a scikit-learn clustering/classification engine over official NBA API data (23+ seasons); Next.js 16 frontend spanning ten-plus modules (player profiling, 5v5 simulation, props +EV, defensive matchups). Grew from a scikit-learn script into a full-stack platform with 61 automated tests.',
    },
    technologies: ['python', 'fastapi', 'postgres', 'next', 'ts', 'tailwind', 'scikit'],
    repoUrl: 'https://github.com/p5Patricio/ArchetypeNBA',
    period: '2025 – 2026',
    year: 2025,
    isPrivate: false,
    featured: true,
    images: ['/projects/thumbs/archetype-nba.webp'],
  },
  {
    id: 'infinite-tic-tac-toe',
    name: 'Infinite Tic-Tac-Toe',
    subtitle: {
      es: 'Juego de gato con tablero de expansión infinita',
      en: 'Infinite board expanding tic-tac-toe game',
    },
    description: {
      es: 'Versión del clásico juego de gato con un tablero dinámico que se expande infinitamente según los movimientos de los jugadores. Construido en React con TypeScript y animación fluida.',
      en: 'A twist on classic tic-tac-toe featuring a dynamic board that expands infinitely based on player moves. Built in React with TypeScript and fluid UI animations.',
    },
    technologies: ['react', 'ts', 'tailwind'],
    repoUrl: 'https://github.com/p5Patricio/infinite-tic-tac-toe',
    period: '2026',
    year: 2026,
    isPrivate: false,
    featured: false,
    images: ['/projects/thumbs/infinite-tic-tac-toe.webp'],
  },
  {
    id: 'ascii-vision',
    name: 'ASCII Vision',
    subtitle: {
      es: 'Procesamiento de video e imagen a arte ASCII',
      en: 'Real-time video & image to ASCII art converter',
    },
    description: {
      es: 'Herramienta de procesamiento de imagen y stream de cámara en tiempo real en Python que convierte fotogramas a representaciones artísticas en código ASCII optimizadas.',
      en: 'Python real-time image and camera stream processing tool that converts video frames into high-performance, stylized ASCII art rendering.',
    },
    technologies: ['python', 'opencv', 'numpy'],
    repoUrl: 'https://github.com/p5Patricio/ascii-vision',
    period: '2026',
    year: 2026,
    isPrivate: false,
    featured: false,
    images: ['/projects/thumbs/ascii-vision.webp'],
  },
  {
    id: 'faro',
    name: 'Faro',
    subtitle: {
      es: 'Plataforma de señales de inversión con IA',
      en: 'AI investment-signal platform',
    },
    description: {
      es: 'Plataforma experimental que convierte datos históricos de mercado en señales auditables de comprar, vender o mantener sobre el S&P 100, con confianza, riesgo, backtesting y trazabilidad del modelo. Backend en FastAPI y PostgreSQL, frontend en React, Vite y Tailwind.',
      en: 'Experimental platform that turns historical market data into auditable BUY/SELL/HOLD signals for the S&P 100, complete with confidence, risk, backtesting, and model traceability. FastAPI + PostgreSQL backend with a React, Vite, and Tailwind frontend.',
    },
    technologies: ['python', 'fastapi', 'postgres', 'react', 'ts', 'vite', 'tailwind'],
    repoUrl: 'https://github.com/p5Patricio/faro',
    period: '2026',
    year: 2026,
    isPrivate: false,
    featured: false,
    images: ['/projects/thumbs/faro.webp'],
  },
  {
    id: 'cocheravecina',
    name: 'CocheraVecina',
    subtitle: {
      es: 'Marketplace P2P de renta de cocheras para viajeros',
      en: 'P2P parking-spot rental marketplace for travelers',
    },
    description: {
      es: 'Marketplace peer-to-peer estilo Airbnb para rentar cocheras a viajeros en estancias cortas (2 a 15 días), en etapa temprana con piloto inicial en León, Guanajuato. Backend FastAPI con SQLAlchemy async y transacciones atómicas con bloqueo pesimista para evitar reservas dobles; frontend Next.js; pagos con Stripe Connect (Destination Charges) y despliegue en Docker.',
      en: 'Early-stage Airbnb-style peer-to-peer marketplace for renting parking spots to travelers on short stays (2 to 15 days), piloted in León, Guanajuato. FastAPI backend with async SQLAlchemy and pessimistic-locking atomic transactions to prevent double bookings; Next.js frontend; Stripe Connect (Destination Charges) payments; Docker deployment.',
    },
    technologies: ['fastapi', 'sqlalchemy', 'postgres', 'next', 'react', 'ts', 'tailwind', 'docker', 'stripe'],
    repoUrl: 'https://github.com/p5Patricio/CocheraVecina',
    period: '2026',
    year: 2026,
    isPrivate: false,
    featured: false,
    images: ['/projects/thumbs/cocheravecina.webp'],
  },
  {
    id: 'cv-patricio',
    name: 'CV Engine',
    subtitle: {
      es: 'Motor de CV bilingüe automatizado con IA',
      en: 'Automated bilingual AI CV engine',
    },
    description: {
      es: 'Motor personal de currículum: una única fuente de datos en JSON se transforma con la API de Gemini en LaTeX adaptado a cada vacante, se verifica en CI que el PDF ocupe una sola página, y se publica como currículum web bilingüe (ES/EN) en GitHub Pages.',
      en: 'Personal CV engine: a single JSON source of truth is tailored into LaTeX by the Gemini API, CI-verified to stay within one PDF page, and published as a bilingual (ES/EN) web resume on GitHub Pages.',
    },
    technologies: ['python', 'gemini', 'latex', 'js'],
    repoUrl: 'https://github.com/p5Patricio/cv-patricio',
    liveUrl: 'https://p5patricio.github.io/cv-patricio/',
    period: '2026',
    year: 2026,
    isPrivate: false,
    featured: false,
    images: ['/projects/thumbs/cv-patricio.webp'],
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    subtitle: {
      es: 'Experiencia inmersiva de scroll oceánico',
      en: 'Immersive ocean-depth scroll experience',
    },
    description: {
      es: 'Experiencia web inmersiva de scroll que recorre el océano desde la superficie hasta las fosas abisales, con telemetría de profundidad en tiempo real, sintetizador ambiental procedural con Web Audio API y una línea de tiempo didáctica de 44 entradas.',
      en: 'Immersive scroll-driven web experience descending from the ocean surface to the abyssal trenches, featuring real-time depth telemetry, a procedural ambient synth built with the Web Audio API, and a 44-entry didactic timeline.',
    },
    technologies: ['react', 'ts', 'vite', 'tailwind', 'framer'],
    repoUrl: 'https://github.com/p5Patricio/ocean-depths',
    liveUrl: 'https://p5patricio.github.io/ocean-depths/',
    period: '2026',
    year: 2026,
    isPrivate: false,
    featured: false,
    images: ['/projects/thumbs/ocean-depths.webp'],
  },
  // ---- 2025 ----
  {
    id: 'art-classifier',
    name: 'Art Classifier',
    subtitle: {
      es: 'Clasificador de obras de arte con redes neuronales',
      en: 'Neural network art classification model',
    },
    description: {
      es: 'Modelo de visión por computadora y aprendizaje profundo que clasifica pinturas y obras de arte por corriente artística y autor utilizando CNNs con TensorFlow y OpenCV.',
      en: 'Computer vision and deep learning model that classifies paintings and artwork by artistic movement and author using CNNs trained with TensorFlow and OpenCV.',
    },
    technologies: ['python', 'tensorflow', 'opencv', 'numpy'],
    repoUrl: 'https://github.com/p5Patricio/Art_Classifier',
    period: '2025',
    year: 2025,
    isPrivate: false,
    featured: false,
    images: ['/projects/thumbs/art-classifier.webp'],
  },
]

// ---------- Convenience selectors ----------

export const FEATURED_REPOS: Repo[] = REPOS.filter((r) => r.featured)

export const ALL_REPOS_BY_YEAR: Repo[] = [...REPOS].sort((a, b) => {
  if (a.year !== b.year) return b.year - a.year
  return a.name.localeCompare(b.name)
})
