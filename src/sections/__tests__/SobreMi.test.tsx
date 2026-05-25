import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import SobreMi from '../SobreMi'

describe('SobreMi', () => {
  it('renders section with id sobre-mi', () => {
    renderWithProviders(<SobreMi />)
    expect(document.getElementById('sobre-mi')).toBeInTheDocument()
  })

  it('renders the title', () => {
    renderWithProviders(<SobreMi />)
    expect(screen.getByRole('heading', { name: /sobre mí/i })).toBeInTheDocument()
  })

  it('renders personal description without the old videogame paragraph', () => {
    renderWithProviders(<SobreMi />)
    expect(screen.getByText(/patricio garcía/i)).toBeInTheDocument()
    expect(screen.queryByText(/videojuegos/i)).not.toBeInTheDocument()
  })

  it('renders the philosophy homage', () => {
    renderWithProviders(<SobreMi />)
    expect(screen.getByText(/Tengo que dar un paso/i)).toBeInTheDocument()
    expect(screen.getByText(/Garou/i)).toBeInTheDocument()
  })

  it('renders gaming ranks', () => {
    renderWithProviders(<SobreMi />)
    expect(screen.getByText('Overwatch')).toBeInTheDocument()
    expect(screen.getByText('Master')).toBeInTheDocument()
    expect(screen.getByText('Rocket League')).toBeInTheDocument()
    expect(screen.getByText('Diamante III')).toBeInTheDocument()
  })
})
