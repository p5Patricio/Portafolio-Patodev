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
// Kimi Code, Gentle-AI).
//
// Note: this file used to also export a monochrome `<TechIcon>` React
// component (react-icons based). It was dropped — the current design shows
// tech stacks as plain bracketed mono text (e.g. "[REACT] — [TYPESCRIPT]"),
// not icon tiles — so only the id/label data below is still needed.

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
  | 'groq'
  // Mobile
  | 'expo'
  // Animation / payments / docs
  | 'framer'
  | 'stripe'
  | 'latex'
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
  groq: 'Groq',
  expo: 'Expo',
  framer: 'Framer Motion',
  stripe: 'Stripe',
  latex: 'LaTeX',
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
