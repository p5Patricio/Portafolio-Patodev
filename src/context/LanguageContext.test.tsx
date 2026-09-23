import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider, useLanguage } from './LanguageContext'

function TestComponent() {
  const { lang, toggleLang, t } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="title">{t.contacto.title}</span>
      <button onClick={toggleLang}>Toggle</button>
    </div>
  )
}

describe('LanguageContext', () => {
  it('defaults to Spanish', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    expect(screen.getByTestId('lang').textContent).toBe('es')
    expect(screen.getByTestId('title').textContent).toBe('Contacto')
  })

  it('ignores navigator.language for the initial render (SSR-safety guard)', () => {
    // The provider's very first render must be identical on the server
    // (which has no `navigator`) and on the client, or hydrateRoot in
    // src/main.tsx would throw a hydration mismatch. Simulating a
    // browser reporting English must not change the initial 'es' default.
    const originalLanguage = window.navigator.language
    Object.defineProperty(window.navigator, 'language', {
      value: 'en-US',
      configurable: true,
    })

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    expect(screen.getByTestId('lang').textContent).toBe('es')

    Object.defineProperty(window.navigator, 'language', {
      value: originalLanguage,
      configurable: true,
    })
  })

  it('toggles to English and back', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    const btn = screen.getByRole('button', { name: /toggle/i })

    fireEvent.click(btn)
    expect(screen.getByTestId('lang').textContent).toBe('en')
    expect(screen.getByTestId('title').textContent).toBe('Contact')

    fireEvent.click(btn)
    expect(screen.getByTestId('lang').textContent).toBe('es')
    expect(screen.getByTestId('title').textContent).toBe('Contacto')
  })
})
