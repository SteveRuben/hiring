'use client';

import { useCallback, useEffect, useState } from 'react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  createdAt: string;
}

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simuler le chargement initial des clés API
  useEffect(() => {
    const loadApiKeys = async () => {
      setIsLoading(true);
      try {
        // Simuler un appel API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Données fictives pour la démo
        const mockApiKeys: ApiKey[] = [
          {
            id: '1',
            name: 'Clé de production',
            key: 'pk_live_51HG8h7JKl2rI8JKLMNOPQRST',
            permissions: ['read', 'write'],
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 jours avant
          },
          {
            id: '2',
            name: 'Clé de test',
            key: 'pk_test_51HG8h7JKl2rI8JKLMNOPQRST',
            permissions: ['read'],
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 jours avant
          },
        ];

        setApiKeys(mockApiKeys);
      } catch (error) {
        console.error('Erreur lors du chargement des clés API:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadApiKeys();
  }, []);

  // Fonction pour créer une nouvelle clé API
  const createApiKey = useCallback(async (name: string, permissions: string[]): Promise<ApiKey> => {
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Générer une clé API fictive
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name,
      key: `pk_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`,
      permissions,
      createdAt: new Date().toISOString(),
    };

    setApiKeys((prev) => [...prev, newKey]);
    return newKey;
  }, []);

  // Fonction pour supprimer une clé API
  const deleteApiKey = useCallback(async (id: string): Promise<void> => {
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setApiKeys((prev) => prev.filter((key) => key.id !== id));
  }, []);

  // Fonction pour mettre à jour les permissions d'une clé API
  const updateApiKeyPermissions = useCallback(
    async (id: string, permissions: string[]): Promise<ApiKey> => {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let updatedKey: ApiKey | null = null;

      setApiKeys((prev) =>
        prev.map((key) => {
          if (key.id === id) {
            updatedKey = { ...key, permissions };
            return updatedKey;
          }
          return key;
        })
      );

      if (!updatedKey) {
        throw new Error('Clé API non trouvée');
      }

      return updatedKey;
    },
    []
  );

  return {
    apiKeys,
    isLoading,
    createApiKey,
    deleteApiKey,
    updateApiKeyPermissions,
  };
};
