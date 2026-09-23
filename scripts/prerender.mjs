// Build-time static prerender step.
//
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.tsx
// --outDir dist-ssr` (server). It renders each route in
// src/data/seo.ts's PRERENDER_ROUTES with react-dom/static's
// prerenderToNodeStream (which waits for all Suspense boundaries, including
// the lazy-loaded GaleriaPage, to resolve before returning), injects the
// resulting HTML into dist/index.html's #root, and rewrites the per-route
// <title>/meta/canonical/OG/Twitter tags. dist-ssr is a build-only artifact
// and is removed afterwards.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { prerenderToNodeStream } from 'react-dom/static'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const ssrDir = path.join(rootDir, 'dist-ssr')
const ssrEntry = path.join(ssrDir, 'entry-server.js')

/** Where each prerendered route's HTML file lands, relative to dist/. */
const OUTPUT_FILES = {
  '/': path.join(distDir, 'index.html'),
  '/galeria': path.join(distDir, 'galeria', 'index.html'),
}

async function streamToString(readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks).toString('utf-8')
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function replaceOnce(html, regex, label, replacement) {
  if (!regex.test(html)) {
    throw new Error(`[prerender] could not find "${label}" tag in dist/index.html template`)
  }
  return html.replace(regex, replacement)
}

function injectSeo(html, seo) {
  let out = html
  out = replaceOnce(out, /<title>.*?<\/title>/s, 'title', `<title>${escapeHtml(seo.title)}</title>`)
  out = replaceOnce(
    out,
    /(<meta name="title" content=")[^"]*(")/,
    'meta name=title',
    `$1${escapeHtml(seo.title)}$2`,
  )
  out = replaceOnce(
    out,
    /(<meta name="description" content=")[^"]*(")/,
    'meta name=description',
    `$1${escapeHtml(seo.description)}$2`,
  )
  out = replaceOnce(
    out,
    /(<link rel="canonical" href=")[^"]*(")/,
    'link rel=canonical',
    `$1${escapeHtml(seo.canonical)}$2`,
  )
  out = replaceOnce(
    out,
    /(<meta property="og:url" content=")[^"]*(")/,
    'meta property=og:url',
    `$1${escapeHtml(seo.canonical)}$2`,
  )
  out = replaceOnce(
    out,
    /(<meta property="og:title" content=")[^"]*(")/,
    'meta property=og:title',
    `$1${escapeHtml(seo.title)}$2`,
  )
  out = replaceOnce(
    out,
    /(<meta property="og:description" content=")[^"]*(")/,
    'meta property=og:description',
    `$1${escapeHtml(seo.description)}$2`,
  )
  out = replaceOnce(
    out,
    /(<meta name="twitter:url" content=")[^"]*(")/,
    'meta name=twitter:url',
    `$1${escapeHtml(seo.canonical)}$2`,
  )
  out = replaceOnce(
    out,
    /(<meta name="twitter:title" content=")[^"]*(")/,
    'meta name=twitter:title',
    `$1${escapeHtml(seo.title)}$2`,
  )
  out = replaceOnce(
    out,
    /(<meta name="twitter:description" content=")[^"]*(")/,
    'meta name=twitter:description',
    `$1${escapeHtml(seo.description)}$2`,
  )
  return out
}

function injectRoot(html, appHtml) {
  return replaceOnce(
    html,
    /<div id="root">[\s\S]*?<\/div>/,
    'div#root',
    `<div id="root" data-prerendered="true">${appHtml}</div>`,
  )
}

async function main() {
  const { render, routeSeo, PRERENDER_ROUTES } = await import(pathToFileUrl(ssrEntry))

  const template = await readFile(path.join(distDir, 'index.html'), 'utf-8')

  for (const route of PRERENDER_ROUTES) {
    const seo = routeSeo[route]
    if (!seo) throw new Error(`[prerender] no SEO data for route "${route}"`)

    const { prelude } = await prerenderToNodeStream(render(route))
    const appHtml = await streamToString(prelude)

    let html = template
    html = injectRoot(html, appHtml)
    html = injectSeo(html, seo)
    // Google AdSense is a client-side <script>, already stripped from the
    // template at src/index.html; nothing else to remove here.

    const outFile = OUTPUT_FILES[route]
    if (!outFile) throw new Error(`[prerender] no output file configured for route "${route}"`)

    await mkdir(path.dirname(outFile), { recursive: true })
    await writeFile(outFile, html, 'utf-8')

    const h1Count = (appHtml.match(/<h1[\s>]/g) ?? []).length
    console.log(
      `[prerender] ${route} -> ${path.relative(rootDir, outFile)} ` +
        `(#root: ${Buffer.byteLength(appHtml, 'utf-8')} bytes, h1 count: ${h1Count})`,
    )
  }

  await rm(ssrDir, { recursive: true, force: true })
  console.log('[prerender] removed dist-ssr (build-only artifact)')
}

function pathToFileUrl(p) {
  return new URL(`file://${p.replace(/\\/g, '/')}`).href
}

main().catch((err) => {
  console.error('[prerender] failed:', err)
  process.exitCode = 1
})
