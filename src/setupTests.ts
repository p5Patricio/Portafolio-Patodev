import '@testing-library/jest-dom'

// Mock IntersectionObserver for components that use scroll detection
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return []
  }
} as unknown as typeof IntersectionObserver

// Mock window.scrollTo for components that reset scroll
globalThis.scrollTo = vi.fn()

// Silence Framer Motion warnings in tests and disable animations for determinism
// This mock enforces prefers-reduced-motion, which is equivalent to
// wrapping every render with <MotionConfig reducedMotion="always" />.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock WebGL context for Three.js in test environment
HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation((contextType) => {
  if (contextType === 'webgl' || contextType === 'webgl2' || contextType === 'experimental-webgl') {
    return {
      getExtension: vi.fn(),
      getParameter: vi.fn().mockImplementation((param: number) => {
        if (param === 0x1f02 /* VERSION */) return 'WebGL 2.0 (OpenGL ES 3.0 Chromium)'
        if (param === 0x1f03 /* SHADING_LANGUAGE_VERSION */) return 'WebGL GLSL ES 3.00 (OpenGL ES 3.0 Chromium)'
        if (param === 0x1f00 /* VENDOR */) return 'WebKit'
        if (param === 0x1f01 /* RENDERER */) return 'WebKit WebGL'
        if (param === 37445 /* UNMASKED_VENDOR_WEBGL */) return 'Google Inc.'
        if (param === 37446 /* UNMASKED_RENDERER_WEBGL */) return 'ANGLE (NVIDIA)'
        return 16
      }),
      getShaderPrecisionFormat: vi.fn().mockReturnValue({ rangeMin: 1, rangeMax: 1, precision: 23 }),
      createShader: vi.fn(),
      shaderSource: vi.fn(),
      compileShader: vi.fn(),
      getShaderParameter: vi.fn().mockReturnValue(true),
      createProgram: vi.fn(),
      attachShader: vi.fn(),
      linkProgram: vi.fn(),
      getProgramParameter: vi.fn().mockReturnValue(true),
      useProgram: vi.fn(),
      createBuffer: vi.fn(),
      bindBuffer: vi.fn(),
      bufferData: vi.fn(),
      enableVertexAttribArray: vi.fn(),
      vertexAttribPointer: vi.fn(),
      drawArrays: vi.fn(),
      viewport: vi.fn(),
      clearColor: vi.fn(),
      clear: vi.fn(),
      disable: vi.fn(),
      enable: vi.fn(),
      blendFunc: vi.fn(),
      pixelStorei: vi.fn(),
      createTexture: vi.fn(),
      bindTexture: vi.fn(),
      texParameteri: vi.fn(),
      texImage2D: vi.fn(),
    }
  }
  return null
}) as unknown as typeof HTMLCanvasElement.prototype.getContext
