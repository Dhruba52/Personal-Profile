import { Project } from '../types';

const STORAGE_KEY = 'dhruba_custom_projects';

export interface GitHubRepoDetails {
  name: string;
  description: string;
  htmlUrl: string;
  homepage?: string;
  topics: string[];
  language?: string;
  stars: number;
  updatedAt: string;
  owner: string;
}

/**
 * Fetch public repository details from GitHub API
 */
export async function fetchGitHubRepoDetails(input: string): Promise<GitHubRepoDetails> {
  const cleanInput = input.trim();
  // Support URLs like https://github.com/owner/repo or owner/repo
  const match = cleanInput.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9-_.]+)\/([a-zA-Z0-9-_.]+)/i) ||
                cleanInput.match(/^([a-zA-Z0-9-_.]+)\/([a-zA-Z0-9-_.]+)$/);

  if (!match) {
    throw new Error('Please enter a valid GitHub repository URL (e.g., https://github.com/username/repository) or format "username/repository"');
  }

  const owner = match[1];
  const repo = match[2].replace(/\.git$/, '');

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Repository "${owner}/${repo}" was not found or is private.`);
    }
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. You can still fill in the details manually.');
    }
    throw new Error(`GitHub request failed with status: ${response.status}`);
  }

  const data = await response.json();

  return {
    name: data.name || repo,
    description: data.description || '',
    htmlUrl: data.html_url || `https://github.com/${owner}/${repo}`,
    homepage: data.homepage || '',
    topics: Array.isArray(data.topics) ? data.topics : [],
    language: data.language || '',
    stars: data.stargazers_count || 0,
    updatedAt: data.updated_at || new Date().toISOString(),
    owner: owner,
  };
}

/**
 * Get user-added projects from localStorage
 */
export function getSavedCustomProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load custom projects from storage:', err);
    return [];
  }
}

/**
 * Save or update a project in localStorage
 */
export function saveCustomProject(project: Project): Project[] {
  const existing = getSavedCustomProjects();
  const index = existing.findIndex((p) => p.id === project.id);
  
  let updated: Project[];
  if (index >= 0) {
    updated = [...existing];
    updated[index] = project;
  } else {
    updated = [project, ...existing];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Delete a custom project from localStorage
 */
export function deleteCustomProject(projectId: string): Project[] {
  const existing = getSavedCustomProjects();
  const updated = existing.filter((p) => p.id !== projectId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Generate TypeScript code snippet for portfolioData.ts
 */
export function generateProjectsExportCode(projectsList: Project[]): string {
  const cleanList = projectsList.map((p) => {
    return {
      id: p.id,
      number: p.number,
      title: p.title,
      category: p.category,
      description: p.description,
      longDescription: p.longDescription || p.description,
      image: p.image || '/assets/projects/fire-fighting-robot.jpg',
      technologies: p.technologies,
      githubUrl: p.githubUrl,
      demoUrl: p.demoUrl || '#',
      features: p.features || [],
      ...(p.isSimulation ? { isSimulation: true, simulationPlatform: p.simulationPlatform } : {}),
    };
  });

  return `// Paste this array into src/data/portfolioData.ts under "export const projects: Project[] = [...]"\nexport const projects: Project[] = ${JSON.stringify(cleanList, null, 2)};`;
}
