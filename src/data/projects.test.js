import { describe, it, expect } from 'vitest';
import { projects, getProjectBySlug } from './projects';

describe('getProjectBySlug', () => {
  it('encontra um projeto pelo slug', () => {
    const project = getProjectBySlug('tarefas-app');
    expect(project).toBeDefined();
    expect(project.name).toBe('Tarefas App');
  });

  it('retorna undefined para slug inexistente', () => {
    // É esse undefined que faz o ProjectDetail renderizar o 404.
    expect(getProjectBySlug('nao-existe')).toBeUndefined();
  });
});

describe('integridade dos dados de projetos', () => {
  it('todo projeto tem os campos que os componentes consomem', () => {
    for (const project of projects) {
      expect(project.slug, 'slug').toBeTruthy();
      expect(project.version, 'version').toMatch(/^v\d+\.\d+\.\d+$/);
      expect(project.name, 'name').toBeTruthy();
      expect(project.tagline, 'tagline').toBeTruthy();
      expect(project.description, 'description').toBeTruthy();
      expect(project.longDescription, 'longDescription').toBeTruthy();
      expect(Array.isArray(project.tech), `tech de ${project.slug}`).toBe(true);
      expect(project.tech.length).toBeGreaterThan(0);
      expect(Array.isArray(project.added), `added de ${project.slug}`).toBe(true);
      expect(project.added.length).toBeGreaterThan(0);
    }
  });

  it('não repete slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('usa URLs reais em repoUrl e demoUrl, sem placeholder', () => {
    // Regressão: demoUrl já ficou como '#', escondendo uma demo publicada.
    for (const project of projects) {
      expect(project.repoUrl, `repoUrl de ${project.slug}`).toMatch(/^https:\/\//);
      if (project.demoUrl != null) {
        expect(project.demoUrl, `demoUrl de ${project.slug}`).toMatch(/^https:\/\//);
      }
    }
  });

  it('tem data no formato mes/ano, não só o ano', () => {
    // Regressão: as quatro entradas já exibiram apenas '2026'.
    for (const project of projects) {
      expect(project.date, `date de ${project.slug}`).toMatch(/^[a-z]{3}\/\d{4}$/);
    }
  });

  it('aponta para imagens dentro de /images/projects', () => {
    for (const project of projects) {
      expect(project.image).toMatch(/^\/images\/projects\//);
      for (const shot of project.screenshots) {
        expect(shot).toMatch(/^\/images\/projects\//);
      }
    }
  });
});
