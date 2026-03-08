'use client';

import { useState, useEffect, useCallback } from 'react';
import { PlaygroundComponent } from '@/types';

/**
 * Dynamically load a single component by filename
 */
async function loadComponent(filename: string): Promise<PlaygroundComponent | null> {
  try {
    const moduleName = filename.replace('.tsx', '');
    
    // Dynamic import with proper error handling
    const module = await import(`@/components/playground-components/${moduleName}`);
    
    if (!module.componentMetadata) {
      console.warn(`Component ${filename} missing componentMetadata export`);
      return null;
    }

    // Find the component function export
    const ComponentExport = 
      module.default || 
      Object.values(module).find(
        (exp: any) => typeof exp === 'function' && exp !== module.componentMetadata
      );

    if (!ComponentExport) {
      console.warn(`Component ${filename} missing component export`);
      return null;
    }

    return {
      ...module.componentMetadata,
      component: ComponentExport as any,
      filename, // Add filename for source code fetching
    };
  } catch (error) {
    console.error(`Failed to load component ${filename}:`, error);
    return null;
  }
}

/**
 * Load all available playground components dynamically
 */
export async function loadAllComponents(): Promise<PlaygroundComponent[]> {
  try {
    // Fetch list of component files from the API
    const response = await fetch('/api/get-components', { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error('Failed to fetch component list');
    }

    const { components: componentFiles } = await response.json();

    // Load each component in parallel
    const loadPromises = componentFiles.map((file: { filename: string }) =>
      loadComponent(file.filename)
    );

    const loadedComponents = await Promise.all(loadPromises);

    // Filter out failed loads
    return loadedComponents.filter((c): c is PlaygroundComponent => c !== null);
  } catch (error) {
    console.error('Error loading components:', error);
    return [];
  }
}

/**
 * Hook to manage dynamic component loading with refresh capability
 */
export function usePlaygroundComponents() {
  const [components, setComponents] = useState<PlaygroundComponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const loaded = await loadAllComponents();
      setComponents(loaded);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load components';
      setError(message);
      console.error('Component loading error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { components, loading, error, reload };
}

/**
 * Helper functions for working with component arrays
 */

export function getComponentById(
  components: PlaygroundComponent[],
  id: string
): PlaygroundComponent | undefined {
  return components.find((c) => c.id === id);
}

export function getComponentsByCategory(
  components: PlaygroundComponent[],
  category: string
): PlaygroundComponent[] {
  return components.filter((c) => c.category === category);
}

export function searchComponents(
  components: PlaygroundComponent[],
  query: string
): PlaygroundComponent[] {
  const lowerQuery = query.toLowerCase();
  return components.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery) ||
      c.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      c.category.toLowerCase().includes(lowerQuery)
  );
}

export const categories = [
  'button',
  'card',
  'form',
  'navigation',
  'animation',
  'layout',
  'feedback',
  'data-display',
] as const;
