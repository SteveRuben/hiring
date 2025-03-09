'use client';

import { useCallback, useEffect, useState } from 'react';

import type { Domain, TeamSettings } from '@/types/team';

// Fonction simulée pour récupérer les paramètres d'équipe
const fetchTeamSettings = async (teamId: string): Promise<TeamSettings> => {
  // Simuler un appel API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    name: 'Hiring Solution Team',
    username: 'hiringSolution',
    autoJoinDomain: true,
    restrictToDomain: true,
    verifiedDomains: ['hiringsolution.com', 'hiring-solution.fr'],
  };
};

// Fonction simulée pour mettre à jour les paramètres d'équipe
const updateTeamSettings = async (
  teamId: string,
  settings: Partial<TeamSettings>
): Promise<TeamSettings> => {
  // Simuler un appel API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    name: settings.name || 'Hiring Solution Team',
    username: settings.username || 'Hiring Solution',
    autoJoinDomain: settings.autoJoinDomain !== undefined ? settings.autoJoinDomain : true,
    restrictToDomain: settings.restrictToDomain !== undefined ? settings.restrictToDomain : true,
    verifiedDomains: settings.verifiedDomains || ['Hiring Solution.com', 'hiringsolution.fr'],
  };
};

// Fonction simulée pour récupérer les domaines vérifiés
const fetchVerifiedDomains = async (teamId: string): Promise<Domain[]> => {
  // Simuler un appel API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: '1',
      domain: 'Hiring Solution.com',
      verified: true,
      verificationDate: new Date(2023, 5, 15),
      primary: true,
    },
    {
      id: '2',
      domain: 'hiring-solution.fr',
      verified: true,
      verificationDate: new Date(2023, 8, 22),
      primary: false,
    },
  ];
};

export const useTeamSettings = (teamId: string) => {
  const [settings, setSettings] = useState<TeamSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Mémoriser fetchSettings avec useCallback
  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTeamSettings(teamId);
      setSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
    } finally {
      setIsLoading(false);
    }
  }, [teamId]);

  // Mémoriser updateSettings avec useCallback
  const updateSettings = useCallback(
    async (newSettings: Partial<TeamSettings>) => {
      setIsUpdating(true);
      setError(null);
      try {
        const updatedSettings = await updateTeamSettings(teamId, newSettings);
        setSettings(updatedSettings);
        return updatedSettings;
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Une erreur est survenue lors de la mise à jour')
        );
        throw err;
      } finally {
        setIsUpdating(false);
      }
    },
    [teamId]
  );

  // Charger les paramètres au montage du composant
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]); // fetchSettings est maintenant mémorisé avec useCallback

  return {
    settings,
    isLoading,
    error,
    fetchSettings,
    updateSettings,
    isUpdating,
  };
};

// Hook pour gérer les domaines
export const useDomainSettings = (teamId: string) => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Utiliser useCallback pour mémoriser la fonction fetchDomains
  const fetchDomains = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchVerifiedDomains(teamId);
      setDomains(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
    } finally {
      setIsLoading(false);
    }
  }, [teamId]);

  // Utiliser useCallback pour les autres fonctions également
  const addDomain = useCallback(
    async (domain: string) => {
      const newDomain: Domain = {
        id: Date.now().toString(),
        domain,
        verified: false,
        primary: domains.length === 0,
      };

      setDomains((prev) => [...prev, newDomain]);
      return newDomain;
    },
    [domains.length]
  );

  // Mémoriser removeDomain
  const removeDomain = useCallback(async (id: string) => {
    setDomains((prev) => prev.filter((domain) => domain.id !== id));
  }, []);

  // Mémoriser setPrimaryDomain
  const setPrimaryDomain = useCallback(async (id: string) => {
    setDomains((prev) =>
      prev.map((domain) => ({
        ...domain,
        primary: domain.id === id,
      }))
    );
  }, []);

  // Charger les domaines au montage du composant
  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]); // fetchDomains est maintenant mémorisé avec useCallback

  return {
    domains,
    isLoading,
    error,
    fetchDomains,
    addDomain,
    removeDomain,
    setPrimaryDomain,
  };
};
