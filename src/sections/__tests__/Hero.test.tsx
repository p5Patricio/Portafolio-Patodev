import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders the hero section with id inicio', () => {
    renderWithProviders(<Hero />)
    const section = document.getElementById('inicio')
    expect(section).toBeInTheDocument()
  })

  it('renders title text words', () => {
    renderWithProviders(<Hero />)
    expect(screen.getByText((content) => content.includes('Patricio'))).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('Ingeniero'))).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('Software'))).toBeInTheDocument()
  })

  it('renders the massive integrated logo', () => {
    renderWithProviders(<Hero />)
    // Massive logo as background
    expect(screen.getByRole('img', { name: /logo personal/i })).toBeInTheDocument()
  })
})
