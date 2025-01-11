// hooks/useReferenceData.ts
import { api } from "@/lib/api";
import { useQueries } from "@tanstack/react-query";


export interface ReferenceData {
  expertiseAreas: Array<{
    id: string;
    name: string;
    label: string;
  }>;
  experienceLevels: Array<{
    id: string;
    name: string;
    range: { min: number; max?: number };
    label: string;
  }>;
  skills: Array<{
    id: number;
    name: string;
    usageCount: number;
  }>;
}

// Définition des clés de query
export const referenceKeys = {
  all: ['reference'] as const,
  expertiseAreas: () => [...referenceKeys.all, 'expertiseAreas'] as const,
  experienceLevels: () => [...referenceKeys.all, 'experienceLevels'] as const,
  skills: () => [...referenceKeys.all, 'skills'] as const,
};

// Fonction fetch avec Axios

export function useReferenceData() {
  const results = useQueries({
    queries: [
      {
        queryKey: referenceKeys.expertiseAreas(),
        queryFn: async () => {
          const { data } = await api.get('/reference-data/expertise-areas');
          return data.expertiseAreas;
        },
      },
      {
        queryKey: referenceKeys.experienceLevels(),
        queryFn: async () => {
          const { data } = await api.get('/reference-data/experience-levels');
          return data.experienceLevels;
        },
      },
      {
        queryKey: referenceKeys.skills(),
        queryFn: async () => {
          const { data } = await api.get('/reference-data/skills');
          return data.skills;
        },
      },
    ],
  });

  // Vérifier si toutes les requêtes sont terminées
  const isLoading = results.some(result => result.isLoading);
  // Récupérer la première erreur s'il y en a une
  const error = results.find(result => result.error)?.error as Error | null;
  
  // Combiner les données si tout est chargé
  const data: ReferenceData | null = !isLoading && !error ? {
    expertiseAreas: results[0].data,
    experienceLevels: results[1].data,
    skills: results[2].data,
  } : null;

  return { data, isLoading, error };
}