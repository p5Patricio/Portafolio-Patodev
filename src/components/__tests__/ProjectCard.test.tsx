import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import ProjectCard from '../ProjectCard'
import type { Repo } from '../../data/repos'

const mockRepo: Repo = {
  id: 'test-repo',
  name: 'Test Project',
  subtitle: { es: 'Proyecto de prueba', en: 'Test project' },
  description: { es: 'Descripción de prueba', en: 'Test description' },
  technologies: ['react', 'ts'],
  repoUrl: 'https://github.com/test/repo',
  liveUrl: 'https://test.vercel.app',
  period: 'Ene 2026',
  year: 2026,
  isPrivate: false,
  featured: true,
  images: ['/projects/test.webp'],
}

const privateRepo: Repo = {
  ...mockRepo,
  id: 'private-repo',
  name: 'Private Project',
  isPrivate: true,
  liveUrl: undefined,
}

describe('ProjectCard', () => {
  it('renders project name and subtitle', () => {
    renderWithProviders(
      <ProjectCard repo={mockRepo} lang="es" viewProjectLabel="Ver proyecto" visitSiteLabel="Visitar sitio" />
    )
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('Proyecto de prueba')).toBeInTheDocument()
  })

  it('renders tech icons', () => {
    renderWithProviders(
      <ProjectCard repo={mockRepo} lang="es" viewProjectLabel="Ver proyecto" visitSiteLabel="Visitar sitio" />
    )
    expect(screen.getByLabelText('React')).toBeInTheDocument()
    expect(screen.getByLabelText('TypeScript')).toBeInTheDocument()
  })

  it('shows "Visitar sitio" when live URL is available', () => {
    renderWithProviders(
      <ProjectCard repo={mockRepo} lang="es" viewProjectLabel="Ver proyecto" visitSiteLabel="Visitar sitio" />
    )
    const link = screen.getByRole('link', { name: /visitar sitio/i })
    expect(link).toHaveAttribute('href', 'https://test.vercel.app')
  })

  it('shows "Ver proyecto" when no live URL', () => {
    const repoNoLive = { ...mockRepo, liveUrl: undefined }
    renderWithProviders(
      <ProjectCard repo={repoNoLive} lang="es" viewProjectLabel="Ver proyecto" visitSiteLabel="Visitar sitio" />
    )
    const link = screen.getByRole('link', { name: /ver proyecto/i })
    expect(link).toHaveAttribute('href', 'https://github.com/test/repo')
  })

  it('shows private badge for private repos', () => {
    renderWithProviders(
      <ProjectCard repo={privateRepo} lang="es" viewProjectLabel="Ver proyecto" visitSiteLabel="Visitar sitio" />
    )
    expect(screen.getByText(/Acceso Privado/i)).toBeInTheDocument()
  })

  it('shows secondary GitHub link for public repos with live URL', () => {
    renderWithProviders(
      <ProjectCard repo={mockRepo} lang="es" viewProjectLabel="Ver proyecto" visitSiteLabel="Visitar sitio" />
    )
    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/repo')
  })

  it('does not show secondary GitHub link for private repos', () => {
    renderWithProviders(
      <ProjectCard repo={privateRepo} lang="es" viewProjectLabel="Ver proyecto" visitSiteLabel="Visitar sitio" />
    )
    expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument()
  })
})
