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
      es: 'Plataforma full-stack de inteligencia de medios y análisis político. Procesamiento en tiempo real con NLP en español, búsqueda semántica vectorial con PostgreSQL + pgvector y motor de razonamiento con Gemini 2.0 Flash; frontend reactivo en Next.js con TypeScript.',
      en: 'Full-stack platform for media intelligence and political analysis. Real-time processing with Spanish NLP, vector semantic search using PostgreSQL + pgvector, and reasoning powered by Gemini 2.0 Flash; reactive Next.js frontend with TypeScript.',
    },
    technologies: ['python', 'fastapi', 'postgres', 'gemini', 'next', 'ts', 'tailwind', 'docker'],
    repoUrl: 'https://github.com/p5Patricio/Demox-Frontend',
    companionUrl: 'https://github.com/p5Patricio/Demox-Backend',
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
      es: 'Sistema de dictado por voz 100% privado y local acelerado por GPU con OpenAI Whisper. Permite dictado bilingüe (Español/Inglés) en tiempo real con inyección instantánea en cualquier aplicación del sistema operativo sin depender de la nube.',
      en: '100% private, local GPU-accelerated voice dictation system using OpenAI Whisper. Features real-time bilingual dictation (ES/EN) with instant clipboard injection across any OS application without cloud dependency.',
    },
    technologies: ['python', 'whisper', 'openai', 'windows'],
    repoUrl: 'https://github.com/p5Patricio/WhisperKey',
    period: '2026',
    year: 2026,
    isPrivate: false,
    featured: true,
    images: ['/projects/thumbs/wisprlocal.webp'],
  },
  {
    id: 'garou',
    name: 'Garou',
    subtitle: {
      es: 'App Android de entrenamiento y nutrición offline-first',
      en: 'Offline-first Android fitness & nutrition app',
    },
    description: {
      es: 'Aplicación Android offline-first para el registro y seguimiento de rutinas de hipertrofia, planes de nutrición y métricas de progreso físico sin necesidad de conexión a internet.',
      en: 'Offline-first Android application for logging hypertrophy training routines, nutrition plans, and physical progress metrics without internet connection.',
    },
    technologies: ['ts', 'react', 'tailwind'],
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
      es: 'Servidor MCP con 11 herramientas especializadas para la gestión inteligente de calendarios por agentes de IA. Soporta procesamiento de lenguaje natural (NLP) en español, base de datos SQLite y comunicación multiagente.',
      en: 'MCP server featuring 11 specialized tools for intelligent calendar management by AI agents. Supports Spanish NLP intent extraction, SQLite database persistence, and multi-agent coordination.',
    },
    technologies: ['ts', 'node', 'sqlite', 'gemini'],
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
      es: 'Asistente de voz estilo Jarvis para Windows. Integra activación local por voz (wake word), síntesis TTS, orquestación de LLMs (DeepSeek u Ollama local) y automatización segura de escritorio y navegador mediante visión por computadora y UI Automation.',
      en: 'Jarvis-style voice assistant for Windows. Features local wake-word detection, TTS synthesis, LLM orchestration (DeepSeek or local Ollama), and safe desktop/browser automation using computer vision and UI Automation.',
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
    period: '2026',
    year: 2026,
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
      es: 'Aplicación web full-stack para el ocultamiento y extracción de información cifrada en imágenes utilizando algoritmos de esteganografía LSB. Frontend interactivo en Vue.js y backend con Node.js.',
      en: 'Full-stack web application for concealing and extracting encrypted information inside digital images using LSB steganography algorithms. Interactive Vue.js frontend with Node.js backend.',
    },
    technologies: ['vue', 'js', 'node'],
    repoUrl: 'https://github.com/p5Patricio/EsteganoBOT-frontend',
    companionUrl: 'https://github.com/p5Patricio/EsteganoBOT-backend',
    period: '2026',
    year: 2026,
    isPrivate: false,
    featured: false,
    images: ['/projects/thumbs/esteganobot.webp'],
  },
  {
    id: 'clasificador-nba',
    name: 'Clasificador Entrenador NBA',
    subtitle: {
      es: 'Modelo de analítica deportiva y machine learning',
      en: 'Sports analytics & machine learning model',
    },
    description: {
      es: 'Sistema de analítica deportiva y clustering para la clasificación del estilo de juego de entrenadores y perfilamiento de jugadores de la NBA utilizando datos oficiales de la API de la NBA y scikit-learn.',
      en: 'Sports analytics and clustering system for classifying NBA coaches by playing style and profiling players using official NBA API data and scikit-learn.',
    },
    technologies: ['python', 'scikit', 'pandas', 'numpy'],
    repoUrl: 'https://github.com/p5Patricio/Clasificador_Entrenador-NBA',
    period: '2026',
    year: 2026,
    isPrivate: false,
    featured: false,
    images: ['/projects/thumbs/clasificador-nba.webp'],
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
