import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import HomePage from '../HomePage'

describe('HomePage', () => {
  it('renders all major sections in the new order', () => {
    renderWithProviders(<HomePage />)

    // Hero
    expect(document.getElementById('inicio')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /patricio garcía/i })).toBeInTheDocument()

    // Trabajo (Proyectos)
    expect(document.getElementById('proyectos')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /proyectos/i })).toBeInTheDocument()

    // Experience
    expect(document.getElementById('experiencia')).toBeInTheDocument()
    expect(screen.getByText('Universidad de Guanajuato')).toBeInTheDocument()

    // About (incl. Stack)
    expect(document.getElementById('sobre-mi')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /sobre mí/i })).toBeInTheDocument()
    expect(screen.getByText('Stack')).toBeInTheDocument()

    // Estudio
    expect(document.getElementById('symmetrical-code')).toBeInTheDocument()

    // Contact
    expect(document.getElementById('contacto')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /construimos algo/i })).toBeInTheDocument()
  })

  it('renders sections in DOM order: inicio before proyectos before experiencia', () => {
    renderWithProviders(<HomePage />)
    const inicio = document.getElementById('inicio')!
    const proyectos = document.getElementById('proyectos')!
    const experiencia = document.getElementById('experiencia')!

    expect(inicio.compareDocumentPosition(proyectos)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(proyectos.compareDocumentPosition(experiencia)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
  })
})
