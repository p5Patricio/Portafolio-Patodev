import type { ComponentType, SVGProps } from 'react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiFirebase,
  SiVite,
  SiVuedotjs,
  SiNodedotjs,
  SiPython,
  SiFastapi,
  SiSqlalchemy,
  SiPostgresql,
  SiGooglegemini,
  SiOpenai,
  SiAnthropic,
  SiOllama,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiCloudflare,
  SiHtml5,
  SiCss,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiTensorflow,
  SiOpencv,
  SiVercel,
  SiNotion,
  SiObsidian,
  SiClaude,
  SiSupabase,
} from 'react-icons/si'

import { FaWindows, FaMicrochip, FaTerminal } from 'react-icons/fa6'

// ----- Official brand SVGs (not yet in react-icons) -----

function NeonIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <title>Neon</title>
      <path d="M24 0V24l-9.365-8.045V24H0V0ZM2.942 21.087h8.751V9.563l9.365 8.204V2.919L2.942 2.914Z" fill="currentColor" />
    </svg>
  )
}

function RenderIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <title>Render</title>
      <path d="M18.263.007c-3.121-.147-5.744 2.109-6.192 5.082-.018.138-.045.272-.067.405-.696 3.703-3.936 6.507-7.827 6.507-1.388 0-2.691-.356-3.825-.979a.2024.2024 0 0 0-.302.178V24H12v-8.999c0-1.656 1.338-3 2.987-3h2.988c3.382 0 6.103-2.817 5.97-6.244-.12-3.084-2.61-5.603-5.682-5.75" fill="currentColor" />
    </svg>
  )
}

function KimiIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <title>Kimi</title>
      <path d="M21.7202 0.939941C22.9502 0.939941 23.9502 1.93994 23.9502 3.16994C23.9502 4.39994 22.9502 5.39994 21.7202 5.39994H19.7502C19.6002 5.39994 19.4902 5.27994 19.4902 5.13994V3.16994C19.4902 1.93994 20.4902 0.939941 21.7202 0.939941Z" fill="currentColor" />
      <path d="M9.39 13.9501L17.82 5.59012C17.98 5.43012 17.89 5.12012 17.68 5.12012H13.14C13.14 5.12012 13.04 5.14012 13 5.18012L3.92 14.1901C3.78 14.3301 3.57 14.2101 3.57 13.9801V5.39012C3.57 5.24012 3.47 5.12012 3.35 5.12012H0.219999C0.0999993 5.12012 0 5.24012 0 5.39012V23.9201C0 24.0701 0.0999993 24.1901 0.219999 24.1901H3.35C3.47 24.1901 3.57 24.0701 3.57 23.9201V20.1401C3.57 20.0601 3.6 19.9801 3.65 19.9301L6.47 17.1401C6.54 17.0701 6.63 17.0601 6.71 17.1101L14.24 22.6501C15.47 23.4801 16.85 23.9901 18.25 24.1401C18.37 24.1501 18.48 24.0301 18.48 23.8701V20.3101C18.48 20.1701 18.4 20.0601 18.29 20.0501C17.47 19.9201 16.66 19.6001 15.94 19.1101L9.42 14.3901C9.28 14.3001 9.27 14.0701 9.39 13.9501Z" fill="currentColor" />
    </svg>
  )
}

function OpenclawIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <title>OpenClaw</title>
      <g clipPath="url(#openclaw-clip)">
        <path d="M9.046 7.104a.527.527 0 110 1.055.527.527 0 010-1.055z" />
        <path d="M15.376 7.104a.528.528 0 110 1.056.528.528 0 010-1.056z" />
        <path clipRule="evenodd" d="M16.877 1.912c.58-.27 1.14-.323 1.616-.037a.317.317 0 01-.326.542c-.227-.136-.547-.153-1.022.068-.352.165-.765.45-1.234.866 2.683 1.17 4.4 3.5 5.148 5.921a6.421 6.421 0 00-.704.184c-.578.016-1.174.204-1.502.735-.338.55-.268 1.276.072 2.069l.005.012.007.014c.523 1.045 1.318 1.91 2.2 2.284-.912 3.274-3.44 6.144-5.972 6.988v2.109h-2.11v-2.11c-1.043.417-2.086.01-2.11 0v2.11h-2.11v-2.11c-2.531-.843-5.061-3.713-5.973-6.987.882-.373 1.678-1.238 2.2-2.284l.007-.014.006-.012c.34-.793.41-1.518.071-2.069-.327-.531-.923-.719-1.503-.735a6.409 6.409 0 00-.704-.183c.749-2.421 2.466-4.751 5.149-5.922-.47-.416-.88-.701-1.234-.866-.474-.221-.794-.204-1.021-.068a.318.318 0 01-.435-.109.317.317 0 01.109-.433c.476-.286 1.036-.233 1.615.037.49.229 1.031.628 1.621 1.182A9.924 9.924 0 0112 2.568c1.199 0 2.284.19 3.256.526.59-.554 1.13-.953 1.62-1.182zM8.835 6.577a1.266 1.266 0 100 2.532 1.266 1.266 0 000-2.532zm6.33 0a1.267 1.267 0 100 2.533 1.267 1.267 0 000-2.533z" />
        <path d="M.395 13.118c-.966-1.932-.163-3.863 2.41-3.365v-.001l.05.01c.084.018.17.038.26.06.033.009.067.017.1.027.084.022.168.048.255.076l.09.027c.528 0 .95.158 1.16.501.212.343.212.87-.105 1.61-.085.17-.178.333-.276.489l-.01.017a4.967 4.967 0 01-.62.791l-.019.02c-1.092 1.117-2.496 1.336-3.295-.262z" />
        <path d="M21.193 9.753c2.574-.5 3.378 1.433 2.411 3.365-.58 1.159-1.476 1.361-2.342.96l-.011-.005a2.419 2.419 0 01-.114-.056l-.019-.01a2.751 2.751 0 01-.115-.067l-.023-.014c-.035-.022-.071-.044-.106-.068l-.05-.035c-.55-.388-1.062-1.007-1.44-1.76-.276-.647-.311-1.132-.174-1.472.176-.439.636-.639 1.23-.639.032-.011.066-.02.099-.03.08-.026.16-.05.238-.072l.117-.03a5.502 5.502 0 01.3-.067z" />
      </g>
      <defs>
        <clipPath id="openclaw-clip">
          <path d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

function AntigravityIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <title>Antigravity</title>
      <path d="M21.751 22.607c1.34 1.005 3.35.335 1.508-1.508C17.73 15.74 18.904 1 12.037 1 5.17 1 6.342 15.74.815 21.1c-2.01 2.009.167 2.511 1.507 1.506 5.192-3.517 4.857-9.714 9.715-9.714 4.857 0 4.522 6.197 9.714 9.715z" />
    </svg>
  )
}

// ----- Tech ID registry -----
//
// Pulled from the repos detected in the user's GitHub:
//   reyasesino (FastAPI + Next.js + PostgreSQL + Cloudflare R2 + Pillow)
//   d-mox (FastAPI + Celery + Redis + spaCy + Gemini + Next.js + Postgres)
//   windows-assistant (Python + Gemini + Gemma + UIA + COM + pyautogui)
//   wisprlocal (Python + Whisper + GPU)
//   voiceagenda (TypeScript)
//   portafolio (Vite + React + TS + Tailwind + Framer)
//
// Plus the AI dev tools the user explicitly mentioned (Claude Code, Antigravity,
// Kimi Code, Gentle-AI). Some have no Simple Icons brand asset — we map those
// to a generic AI icon.

export type TechId =
  // Frontend
  | 'react'
  | 'next'
  | 'vue'
  | 'ts'
  | 'js'
  | 'html5'
  | 'css3'
  | 'tailwind'
  | 'vite'
  // Backend
  | 'node'
  | 'python'
  | 'fastapi'
  | 'sqlalchemy'
  // Databases
  | 'postgres'
  | 'mongodb'
  | 'mysql'
  | 'sqlite'
  | 'firebase'
  | 'supabase'
  // Data / ML / AI infra
  | 'pandas'
  | 'numpy'
  | 'scikit'
  | 'tensorflow'
  | 'opencv'
  | 'whisper'
  // AI / LLMs
  | 'gemini'
  | 'openai'
  | 'anthropic'
  | 'ollama'
  // DevOps / tooling
  | 'docker'
  | 'git'
  | 'github'
  | 'linux'
  | 'windows'
  | 'cloudflare'
  | 'vercel'
  | 'neon'
  | 'render'
  | 'notion'
  | 'obsidian'
  // AI dev tools (developer side)
  | 'claude-code'
  | 'antigravity'
  | 'kimi-code'
  | 'openclaw'

// ----- Display labels -----

// eslint-disable-next-line react-refresh/only-export-components
export const TECH_LABELS: Record<TechId, string> = {
  react: 'React',
  next: 'Next.js',
  vue: 'Vue.js',
  ts: 'TypeScript',
  js: 'JavaScript',
  html5: 'HTML5',
  css3: 'CSS3',
  tailwind: 'Tailwind CSS',
  vite: 'Vite',
  node: 'Node.js',
  python: 'Python',
  fastapi: 'FastAPI',
  sqlalchemy: 'SQLAlchemy',
  postgres: 'PostgreSQL',
  mongodb: 'MongoDB',
  mysql: 'MySQL',
  sqlite: 'SQLite',
  firebase: 'Firebase',
  supabase: 'Supabase',
  pandas: 'Pandas',
  numpy: 'NumPy',
  scikit: 'scikit-learn',
  tensorflow: 'TensorFlow',
  opencv: 'OpenCV',
  whisper: 'Whisper',
  gemini: 'Gemini',
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  ollama: 'Ollama',
  docker: 'Docker',
  git: 'Git',
  github: 'GitHub',
  linux: 'Linux',
  windows: 'Windows',
  cloudflare: 'Cloudflare',
  vercel: 'Vercel',
  neon: 'Neon',
  render: 'Render',
  notion: 'Notion',
  obsidian: 'Obsidian',
  'claude-code': 'Claude Code',
  antigravity: 'Antigravity',
  'kimi-code': 'Kimi Code',
  openclaw: 'OpenClaw',
}

// ----- Icon registry (react-icons) -----

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

const ICONS: Record<TechId, IconComponent> = {
  react: SiReact,
  next: SiNextdotjs,
  vue: SiVuedotjs,
  ts: SiTypescript,
  js: SiJavascript,
  html5: SiHtml5,
  css3: SiCss,
  tailwind: SiTailwindcss,
  vite: SiVite,
  node: SiNodedotjs,
  python: SiPython,
  fastapi: SiFastapi,
  sqlalchemy: SiSqlalchemy,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  mysql: SiMysql,
  sqlite: SiSqlite,
  firebase: SiFirebase,
  supabase: SiSupabase,
  pandas: SiPandas,
  numpy: SiNumpy,
  scikit: SiScikitlearn,
  tensorflow: SiTensorflow,
  opencv: SiOpencv,
  whisper: FaMicrochip, // No official Whisper icon — chip glyph reads as "speech-to-text on hardware"
  gemini: SiGooglegemini,
  openai: SiOpenai,
  anthropic: SiClaude,
  ollama: SiOllama,
  docker: SiDocker,
  git: SiGit,
  github: SiGithub,
  linux: SiLinux,
  windows: FaWindows,
  cloudflare: SiCloudflare,
  vercel: SiVercel,
  neon: NeonIcon,
  render: RenderIcon,
  notion: SiNotion,
  obsidian: SiObsidian,
  // No brand assets exist for these AI tools — use semantic generics that
  // visually read as "AI / agentic":
  'claude-code': SiAnthropic,
  antigravity: AntigravityIcon,
  'kimi-code': KimiIcon,
  openclaw: OpenclawIcon,
}

// Fallback for any future ID we forget to register
const FallbackIcon: IconComponent = FaTerminal

type Props = {
  id: TechId
  className?: string
  /** Override the rendered tooltip label (defaults to TECH_LABELS[id]). */
  label?: string
}

/**
 * Monochromatic tech icon. Inherits its color from currentColor so it picks up
 * the surrounding text color (e.g. text-color-tinta or text-color-accent).
 *
 * Usage:
 *   <TechIcon id="react" className="w-7 h-7 text-color-accent" />
 */
function TechIcon({ id, className = 'w-7 h-7', label }: Props) {
  const Icon = ICONS[id] ?? FallbackIcon
  const accessibleLabel = label ?? TECH_LABELS[id]

  return (
    <Icon
      role="img"
      aria-label={accessibleLabel}
      className={`${className} fill-current`}
    />
  )
}

export default TechIcon
