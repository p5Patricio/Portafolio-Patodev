import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import SectionHeader from '../SectionHeader'

describe('SectionHeader', () => {
  it('renders the title as a heading', () => {
    renderWithProviders(<SectionHeader index="01" label="Trabajo" title="Proyectos" />)
    expect(screen.getByRole('heading', { name: /proyectos/i })).toBeInTheDocument()
  })

  it('renders the mono index / label line', () => {
    renderWithProviders(<SectionHeader index="01" label="Trabajo" title="Proyectos" />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText(/trabajo/i)).toBeInTheDocument()
  })

  it('renders optional right-aligned meta', () => {
    renderWithProviders(<SectionHeader index="01" label="Trabajo" title="Proyectos" meta="3 PROYECTOS" />)
    expect(screen.getByText('3 PROYECTOS')).toBeInTheDocument()
  })

  it('renders intro when provided', () => {
    renderWithProviders(<SectionHeader index="05" label="Contacto" title="Contacto" intro="Hablemos pronto." />)
    expect(screen.getByText('Hablemos pronto.')).toBeInTheDocument()
  })

  it('does not render intro when omitted', () => {
    renderWithProviders(<SectionHeader index="00" label="Inicio" title="Hero" />)
    expect(screen.queryByText(/hablemos/i)).not.toBeInTheDocument()
  })
})
