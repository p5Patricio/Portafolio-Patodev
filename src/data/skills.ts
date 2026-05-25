import type { TechId } from '../components/TechIcon'

export type SkillCategoryId =
  | 'frontend'
  | 'backend'
  | 'ai-ml'
  | 'devops'

export interface SkillCategory {
  id: SkillCategoryId
  /** Localized title shown above the icon grid. */
  title: { es: string; en: string }
  /** One-line description used as a small caption under the title. */
  caption: { es: string; en: string }
  /** Narrative explanation of how these tools fit into the workflow. */
  narrative: { es: string; en: string }
  /** Tech IDs that belong to this category — drives the icon grid. */
  skills: TechId[]
  /** Featured / star skill for this category — gets the main accent treatment. */
  highlight?: TechId
}

// Categorías inspiradas en mi stack real (los repos que tengo en GitHub) +
// las herramientas de IA con las que trabajo a diario.
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    title: { es: 'Frontend', en: 'Frontend' },
    caption: {
      es: 'Interfaces rápidas, accesibles y con personalidad.',
      en: 'Fast, accessible interfaces with character.',
    },
    narrative: {
      es: 'React 19 + TypeScript + Tailwind v4 es mi tridente para construir SPA y PWAs con animaciones fluidas. Uso Next.js cuando necesito SSR y Vite cuando quiero velocidad pura de desarrollo. Cada componente nace con accesibilidad y diseño responsive en mente.',
      en: 'React 19 + TypeScript + Tailwind v4 is my trident for building SPAs and PWAs with fluid animations. I reach for Next.js when I need SSR and Vite when I want pure development speed. Every component is born with accessibility and responsive design in mind.',
    },
    skills: ['react', 'next', 'vue', 'ts', 'js', 'tailwind', 'vite', 'html5', 'css3'],
    highlight: 'react',
  },
  {
    id: 'backend',
    title: { es: 'Backend & Bases de datos', en: 'Backend & Databases' },
    caption: {
      es: 'APIs robustas, modelado de datos y persistencia.',
      en: 'Robust APIs, data modeling and persistence.',
    },
    narrative: {
      es: 'Python + FastAPI para APIs de alto rendimiento con tipado automático. PostgreSQL como base relacional de confianza, Firebase para prototipos rápidos y SQLAlchemy para mantener el modelo de datos limpio y expresivo.',
      en: 'Python + FastAPI for high-performance APIs with automatic typing. PostgreSQL as my trusted relational base, Firebase for rapid prototypes, and SQLAlchemy to keep the data model clean and expressive.',
    },
    skills: ['python', 'node', 'fastapi', 'sqlalchemy', 'postgres', 'mysql', 'sqlite', 'mongodb', 'firebase', 'supabase', 'neon'],
    highlight: 'python',
  },
  {
    id: 'ai-ml',
    title: { es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
    caption: {
      es: 'LLMs en producción, machine learning y desarrollo con agentes.',
      en: 'Production LLMs, machine learning and agent-powered development.',
    },
    narrative: {
      es: 'Claude Code y Kimi son mis pair programmers diarios. Gemini y OpenAI para features con NLP en producción. Ollama para correr modelos locales y Whisper para dictado de voz sin nube. El desarrollo con agentes cambió mi velocidad de iteración.',
      en: 'Claude Code and Kimi are my daily pair programmers. Gemini and OpenAI for production NLP features. Ollama to run local models and Whisper for offline voice dictation. Agent-powered development changed my iteration speed.',
    },
    skills: ['claude-code', 'antigravity', 'kimi-code', 'openclaw', 'gemini', 'openai', 'ollama', 'whisper', 'opencv', 'tensorflow', 'pandas', 'numpy'],
    highlight: 'claude-code',
  },
  {
    id: 'devops',
    title: { es: 'DevOps y herramientas', en: 'DevOps & Tooling' },
    caption: {
      es: 'Containers, despliegues y flujo diario.',
      en: 'Containers, deployments and daily workflow.',
    },
    narrative: {
      es: 'Docker para entornos reproducibles, Vercel para deploys instantáneos de frontend, y GitHub Actions para CI/CD sin fricción. Notion y Obsidian organizan mi conocimiento; Cloudflare protege y acelera todo lo que construyo.',
      en: 'Docker for reproducible environments, Vercel for instant frontend deploys, and GitHub Actions for frictionless CI/CD. Notion and Obsidian organize my knowledge; Cloudflare protects and accelerates everything I build.',
    },
    skills: ['github', 'git', 'docker', 'linux', 'cloudflare', 'vercel', 'render', 'notion', 'obsidian'],
    highlight: 'github',
  },
]
