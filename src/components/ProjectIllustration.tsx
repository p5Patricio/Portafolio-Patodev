import type { SVGProps } from 'react'

type Props = {
  id: string
  className?: string
}

export default function ProjectIllustration({ id, className = 'w-full h-full' }: Props) {
  const commonSvgProps: SVGProps<SVGSVGElement> = {
    viewBox: '0 0 400 225',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className: `${className} bg-[#0b0c10]`,
  }

  switch (id) {
    case 'rey-asesino':
      return (
        <svg {...commonSvgProps}>
          {/* Subtle background grid */}
          <rect width="400" height="225" fill="#090a0d" />
          <circle cx="200" cy="112" r="75" fill="#ffdc3c" fillOpacity="0.03" />
          
          {/* Hanger & Streetwear Hoodie Outline */}
          <path d="M160 85 L200 65 L240 85 L260 120 L245 125 L235 105 L235 175 L165 175 L165 105 L155 125 L140 120 Z" stroke="#e2e8f0" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M200 65 Q200 55 195 50 Q190 45 200 40 Q210 45 205 50 Q200 55 200 65" stroke="#ffdc3c" strokeWidth="2.5" fill="none" />
          {/* Zipper / Minimal Line */}
          <line x1="200" y1="90" x2="200" y2="175" stroke="#ffdc3c" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Brand Tag */}
          <rect x="188" y="98" width="24" height="12" rx="2" fill="#ffdc3c" fillOpacity="0.15" stroke="#ffdc3c" strokeWidth="1" />
        </svg>
      )

    case 'd-mox':
      return (
        <svg {...commonSvgProps}>
          <rect width="400" height="225" fill="#090a0d" />
          <circle cx="200" cy="112" r="75" fill="#00d8f0" fillOpacity="0.03" />

          {/* Newspaper / Document Sheet */}
          <rect x="135" y="45" width="130" height="140" rx="4" fill="#141720" stroke="#334155" strokeWidth="2" />
          {/* Header Bar */}
          <rect x="150" y="60" width="100" height="10" rx="2" fill="#00d8f0" fillOpacity="0.8" />
          {/* Text Columns */}
          <line x1="150" y1="82" x2="210" y2="82" stroke="#94a3b8" strokeWidth="2" />
          <line x1="150" y1="92" x2="245" y2="92" stroke="#64748b" strokeWidth="1.5" />
          <line x1="150" y1="100" x2="235" y2="100" stroke="#64748b" strokeWidth="1.5" />
          <line x1="150" y1="108" x2="220" y2="108" stroke="#64748b" strokeWidth="1.5" />

          {/* Minimal Analytical Graph Overlay */}
          <path d="M150 155 L175 140 L200 148 L225 125 L250 135" stroke="#00d8f0" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="225" cy="125" r="4" fill="#00d8f0" />
        </svg>
      )

    case 'whisperkey':
      return (
        <svg {...commonSvgProps}>
          <rect width="400" height="225" fill="#090a0d" />
          <circle cx="200" cy="112" r="75" fill="#00d8f0" fillOpacity="0.03" />

          {/* Studio Microphone Silhouette */}
          <rect x="184" y="55" width="32" height="60" rx="16" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2.5" />
          <path d="M170 90 C170 120, 230 120, 230 90" stroke="#00d8f0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <line x1="200" y1="115" x2="200" y2="155" stroke="#e2e8f0" strokeWidth="2.5" />
          <line x1="175" y1="155" x2="225" y2="155" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />

          {/* Audio Wave Sound Waves */}
          <path d="M140 100 Q140 112 150 112" stroke="#00d8f0" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M260 100 Q260 112 250 112" stroke="#00d8f0" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M125 90 Q125 112 140 112" stroke="#00d8f0" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
          <path d="M275 90 Q275 112 260 112" stroke="#00d8f0" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
        </svg>
      )

    case 'garou':
      return (
        <svg {...commonSvgProps}>
          <rect width="400" height="225" fill="#090a0d" />
          <circle cx="200" cy="112" r="75" fill="#ff4c4c" fillOpacity="0.03" />

          {/* Dumbbell & Weight Bar */}
          <line x1="120" y1="112" x2="280" y2="112" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
          {/* Inner Plates */}
          <rect x="150" y="70" width="16" height="84" rx="3" fill="#1e293b" stroke="#ff4c4c" strokeWidth="2" />
          <rect x="234" y="70" width="16" height="84" rx="3" fill="#1e293b" stroke="#ff4c4c" strokeWidth="2" />
          {/* Outer Plates */}
          <rect x="132" y="80" width="14" height="64" rx="3" fill="#334155" stroke="#e2e8f0" strokeWidth="2" />
          <rect x="254" y="80" width="14" height="64" rx="3" fill="#334155" stroke="#e2e8f0" strokeWidth="2" />

          {/* Minimal Heart Rate Line */}
          <path d="M150 160 L185 160 L193 145 L200 175 L208 152 L215 160 L250 160" stroke="#ff4c4c" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      )

    case 'mcp-agenda':
      return (
        <svg {...commonSvgProps}>
          <rect width="400" height="225" fill="#090a0d" />
          <circle cx="200" cy="112" r="75" fill="#ffdc3c" fillOpacity="0.03" />

          {/* Calendar Planner Body */}
          <rect x="135" y="45" width="130" height="135" rx="8" fill="#141720" stroke="#334155" strokeWidth="2" />
          {/* Calendar Top Header */}
          <path d="M135 53 C135 48 139 45 144 45 L256 45 C261 45 265 48 265 53 L265 75 L135 75 Z" fill="#ffdc3c" fillOpacity="0.8" />
          {/* Binder Rings */}
          <rect x="160" y="38" width="8" height="15" rx="3" fill="#e2e8f0" />
          <rect x="196" y="38" width="8" height="15" rx="3" fill="#e2e8f0" />
          <rect x="232" y="38" width="8" height="15" rx="3" fill="#e2e8f0" />

          {/* Grid Dots */}
          <circle cx="160" cy="100" r="4" fill="#64748b" />
          <circle cx="196" cy="100" r="4" fill="#64748b" />
          <circle cx="232" cy="100" r="4" fill="#ffdc3c" />
          <circle cx="160" cy="125" r="4" fill="#64748b" />
          <circle cx="196" cy="125" r="4" fill="#00d8f0" />
          <circle cx="232" cy="125" r="4" fill="#64748b" />
          <circle cx="160" cy="150" r="4" fill="#64748b" />
          <circle cx="196" cy="150" r="4" fill="#64748b" />
          <circle cx="232" cy="150" r="4" fill="#64748b" />
        </svg>
      )

    case 'eclipse-desktop-agent':
      return (
        <svg {...commonSvgProps}>
          <rect width="400" height="225" fill="#090a0d" />

          {/* Glowing Eclipse Disc */}
          <circle cx="200" cy="112" r="50" fill="#090a0d" stroke="#a855f7" strokeWidth="3" />
          {/* Corona Glow Ring */}
          <circle cx="200" cy="112" r="62" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />
          <circle cx="200" cy="112" r="75" stroke="#00d8f0" strokeWidth="1" strokeDasharray="3 8" opacity="0.4" />

          {/* Minimal Voice Orb Axis */}
          <line x1="120" y1="112" x2="280" y2="112" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="200" y1="32" x2="200" y2="192" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.4" />
        </svg>
      )

    case 'interprete-lsm':
      return (
        <svg {...commonSvgProps}>
          <rect width="400" height="225" fill="#090a0d" />
          <circle cx="200" cy="112" r="75" fill="#8b5cf6" fillOpacity="0.03" />

          {/* Minimal Hand Silhouette */}
          <path d="M185 160 L185 110 C185 102 175 102 175 110 L175 160" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M197 160 L197 95 C197 87 187 87 187 95 L187 160" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M209 160 L209 100 C209 92 199 92 199 100 L199 160" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M221 160 L221 115 C221 108 211 108 211 115 L211 160" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M175 130 L160 120 C154 116 148 124 154 130 L175 155" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />

          {/* Computer Vision Landmarks Box */}
          <rect x="135" y="55" width="130" height="120" rx="6" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="6 4" fill="none" opacity="0.6" />
        </svg>
      )

    case 'esteganobot':
      return (
        <svg {...commonSvgProps}>
          <rect width="400" height="225" fill="#090a0d" />
          <circle cx="200" cy="112" r="75" fill="#10b981" fillOpacity="0.03" />

          {/* Shield / Keyhole Silhouette */}
          <path d="M200 55 L250 75 L250 125 C250 155 200 175 200 175 C200 175 150 155 150 125 L150 75 Z" fill="#141720" stroke="#10b981" strokeWidth="2.5" />
          
          {/* Keyhole */}
          <circle cx="200" cy="102" r="12" fill="#10b981" />
          <polygon points="193,108 207,108 204,130 196,130" fill="#10b981" />
        </svg>
      )

    case 'clasificador-nba':
      return (
        <svg {...commonSvgProps}>
          <rect width="400" height="225" fill="#090a0d" />
          <circle cx="200" cy="112" r="75" fill="#f97316" fillOpacity="0.03" />

          {/* Basketball Seams Circle */}
          <circle cx="200" cy="112" r="55" stroke="#f97316" strokeWidth="2.5" fill="none" />
          <line x1="145" y1="112" x2="255" y2="112" stroke="#f97316" strokeWidth="2" />
          <path d="M170 65 Q200 112 170 159" stroke="#f97316" strokeWidth="2" fill="none" />
          <path d="M230 65 Q200 112 230 159" stroke="#f97316" strokeWidth="2" fill="none" />

          {/* Tactical Playbook Arrows */}
          <path d="M125 75 L145 95" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="125" cy="75" r="4" fill="#e2e8f0" />
          <path d="M275 75 L255 95" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="275" cy="75" r="4" fill="#e2e8f0" />
        </svg>
      )

    case 'infinite-tic-tac-toe':
      return (
        <svg {...commonSvgProps}>
          <rect width="400" height="225" fill="#090a0d" />
          <circle cx="200" cy="112" r="75" fill="#00d8f0" fillOpacity="0.03" />

          {/* 3x3 Grid Lines */}
          <line x1="170" y1="62" x2="170" y2="162" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="230" y1="62" x2="230" y2="162" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="120" y1="95" x2="280" y2="95" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="120" y1="129" x2="280" y2="129" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />

          {/* X and O Pieces */}
          {/* X piece */}
          <path d="M135 72 L155 92 M155 72 L135 92" stroke="#00d8f0" strokeWidth="3" strokeLinecap="round" />
          {/* O piece */}
          <circle cx="200" cy="112" r="11" stroke="#ffdc3c" strokeWidth="3" fill="none" />
          {/* X piece */}
          <path d="M245 137 L265 157 M265 137 L245 157" stroke="#00d8f0" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )

    case 'ascii-vision':
      return (
        <svg {...commonSvgProps}>
          <rect width="400" height="225" fill="#090a0d" />
          <circle cx="200" cy="112" r="75" fill="#22c55e" fillOpacity="0.03" />

          {/* Camera Lens Aperture Outer Ring */}
          <circle cx="200" cy="112" r="52" stroke="#e2e8f0" strokeWidth="2.5" fill="none" />
          <circle cx="200" cy="112" r="35" stroke="#22c55e" strokeWidth="2" fill="none" />

          {/* ASCII Code Matrix Lines */}
          <text x="80" y="90" fill="#22c55e" fontSize="10" fontFamily="monospace" opacity="0.6">@ # $ % & *</text>
          <text x="80" y="115" fill="#22c55e" fontSize="10" fontFamily="monospace" opacity="0.6">8 B X W M O</text>
          <text x="80" y="140" fill="#22c55e" fontSize="10" fontFamily="monospace" opacity="0.6">1 t f t L C</text>

          <text x="275" y="90" fill="#22c55e" fontSize="10" fontFamily="monospace" opacity="0.6">0 1 0 1 1 0</text>
          <text x="275" y="115" fill="#22c55e" fontSize="10" fontFamily="monospace" opacity="0.6">a s c i i visual</text>
          <text x="275" y="140" fill="#22c55e" fontSize="10" fontFamily="monospace" opacity="0.6">. : - = + *</text>
        </svg>
      )

    case 'art-classifier':
      return (
        <svg {...commonSvgProps}>
          <rect width="400" height="225" fill="#090a0d" />
          <circle cx="200" cy="112" r="75" fill="#eab308" fillOpacity="0.03" />

          {/* Artist Paint Palette */}
          <path d="M150 112 C140 75 220 55 255 90 C280 115 260 160 215 160 C185 160 190 140 175 140 C160 140 155 130 150 112 Z" fill="#141720" stroke="#eab308" strokeWidth="2.5" />
          
          {/* Color Swatches */}
          <circle cx="185" cy="82" r="6" fill="#ff4c4c" />
          <circle cx="215" cy="75" r="6" fill="#00d8f0" />
          <circle cx="240" cy="98" r="6" fill="#ffdc3c" />
          <circle cx="230" cy="130" r="6" fill="#a855f7" />

          {/* Thumbhole */}
          <circle cx="180" cy="120" r="8" fill="#090a0d" stroke="#64748b" strokeWidth="1.5" />

          {/* Paint Brush */}
          <line x1="260" y1="160" x2="285" y2="185" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
          <path d="M253 153 L260 160" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )

    default:
      return (
        <svg {...commonSvgProps}>
          <rect width="400" height="225" fill="#090a0d" />
          <circle cx="200" cy="112" r="45" stroke="#334155" strokeWidth="2" fill="none" />
          <path d="M185 112 L215 112 M200 97 L200 127" stroke="#00d8f0" strokeWidth="2" />
        </svg>
      )
  }
}
