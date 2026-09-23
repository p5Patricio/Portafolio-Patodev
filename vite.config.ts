import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            // Order matters: precise node_modules subpaths must be checked
            // before the broad 'react' substring match, otherwise it also
            // swallows react-router-dom, react-icons, lucide-react and
            // framer-motion (their paths all contain "react"), and the
            // 'motion'/'icons' chunks never materialize.
            manualChunks(id) {
              if (!id.includes('node_modules')) return
              if (
                /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id) ||
                /[\\/]node_modules[\\/]react-router(-dom)?[\\/]/.test(id)
              ) {
                return 'react'
              }
              if (/[\\/]node_modules[\\/]framer-motion[\\/]/.test(id)) return 'motion'
              if (/[\\/]node_modules[\\/](lucide-react|react-icons)[\\/]/.test(id)) return 'icons'
            },
          },
        },
  },
}))
