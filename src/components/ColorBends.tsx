import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const MAX_COLORS = 8

const frag = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  vec2 colV = q;
  float sumVal = 0.0;
  for (int i = 0; i < 8; i++) {
    if (i >= uIterations) break;
    colV += Math_sin_cos(colV.yx * uFrequency + vec2(t * 0.5, t * 0.3));
    colV += sin(colV.yx * (uFrequency * 1.5) + vec2(t * 0.3, t * 0.7)) * uWarpStrength;
    sumVal += length(colV);
  }

  float n = sin(p.x * 100.0 + t) * cos(p.y * 100.0 + t);
  sumVal += n * uNoise * 0.1;

  float band = sin(sumVal * uBandWidth);
  float val = 0.5 + 0.5 * band;
  val = pow(val, 2.0) * uIntensity;

  vec3 col = vec3(0.0);
  if (uColorCount > 0) {
    float cIdx = mod(val * float(uColorCount), float(uColorCount));
    int idx0 = int(floor(cIdx));
    int idx1 = int(mod(float(idx0 + 1), float(uColorCount)));
    float f = fract(cIdx);
    vec3 c0 = vec3(0.0);
    vec3 c1 = vec3(0.0);
    for (int i = 0; i < MAX_COLORS; i++) {
      if (i == idx0) c0 = uColors[i];
      if (i == idx1) c1 = uColors[i];
    }
    col = mix(c0, c1, f);
  } else {
    col = vec3(val);
  }

  float alpha = 1.0;
  if (uTransparent == 1) {
    alpha = clamp(val, 0.0, 1.0);
  }

  gl_FragColor = vec4(col, alpha);
}
`

const fullFrag = `
precision highp float;
vec2 Math_sin_cos(vec2 v) {
  return vec2(sin(v.x), cos(v.y));
}
` + frag

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

export interface ColorBendsProps {
  colors?: string[]
  rotation?: number
  speed?: number
  scale?: number
  frequency?: number
  warpStrength?: number
  mouseInfluence?: number
  parallax?: number
  noise?: number
  iterations?: number
  intensity?: number
  bandWidth?: number
  transparent?: boolean
  autoRotate?: number
  className?: string
  style?: React.CSSProperties
}

export default function ColorBends({
  colors = ['#22d5e0', '#8a5cff', '#00ffd1', '#ff2a85'],
  rotation = 90,
  speed = 0.15,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.15,
  iterations = 1,
  intensity = 1.3,
  bandWidth = 5,
  transparent = true,
  autoRotate = 2,
  className = '',
  style = {},
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const parseColor = (hex: string) => {
      const c = new THREE.Color(hex)
      return new THREE.Vector3(c.r, c.g, c.b)
    }

    const colorVecs = Array(MAX_COLORS)
      .fill(null)
      .map((_, i) => {
        if (colors && i < colors.length) {
          return parseColor(colors[i])
        }
        return new THREE.Vector3(0, 0, 0)
      })

    const rad = (rotation * Math.PI) / 180
    const rotVec = new THREE.Vector2(Math.cos(rad), Math.sin(rad))

    const uniforms = {
      uCanvas: { value: new THREE.Vector2(width, height) },
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uRot: { value: rotVec },
      uColorCount: { value: colors ? Math.min(colors.length, MAX_COLORS) : 0 },
      uColors: { value: colorVecs },
      uTransparent: { value: transparent ? 1 : 0 },
      uScale: { value: scale },
      uFrequency: { value: frequency },
      uWarpStrength: { value: warpStrength },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uMouseInfluence: { value: mouseInfluence },
      uParallax: { value: parallax },
      uNoise: { value: noise },
      uIterations: { value: iterations },
      uIntensity: { value: intensity },
      uBandWidth: { value: bandWidth },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: fullFrag,
      uniforms,
      transparent: true,
    })
    materialRef.current = material

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: transparent })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    let animId: number
    const clock = new THREE.Clock()

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      pointerRef.current.targetX = x
      pointerRef.current.targetY = y
    }

    window.addEventListener('pointermove', handlePointerMove)

    const handleResize = () => {
      if (!container || !renderer) return
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      uniforms.uCanvas.value.set(w, h)
    }

    window.addEventListener('resize', handleResize)

    let currentRot = rotation
    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop)
      const dt = clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      if (autoRotate !== 0) {
        currentRot += autoRotate * dt
        const r = (currentRot * Math.PI) / 180
        uniforms.uRot.value.set(Math.cos(r), Math.sin(r))
      }

      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.05
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.05
      uniforms.uPointer.value.set(pointerRef.current.x, pointerRef.current.y)

      uniforms.uTime.value = elapsedTime
      renderer.render(scene, camera)
    }

    renderLoop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('resize', handleResize)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [
    colors,
    rotation,
    speed,
    scale,
    frequency,
    warpStrength,
    mouseInfluence,
    parallax,
    noise,
    iterations,
    intensity,
    bandWidth,
    transparent,
    autoRotate,
  ])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={style}
    />
  )
}
