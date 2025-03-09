'use client';

import { useCallback, useEffect, useState } from 'react';

import type { BillingAccount, BillingSettings } from '@/types/billing';

// Fonction simulée pour récupérer les paramètres de facturation
const fetchBillingSettings = async (userId: string): Promise<BillingSettings> => {
  // Simuler un appel API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    companyName: 'Hiring Solution SAS',
    address: '123 Avenue de la République',
    city: 'Douala',
    postalCode: '75011',
    country: 'Cameroun',
    vatNumber: 'CM12345678901',
    billingEmail: 'facturation@hiringsolution.com',
    billingPrefix: 'RP',
  };
};

// Fonction simulée pour récupérer les informations du compte de facturation
const fetchBillingAccount = async (userId: string): Promise<BillingAccount> => {
  // Simuler un appel API
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    id: 'bill_1234567890',
    customerId: 'cus_1234567890',
    balance: 20000,
    currency: 'FCFA',
    status: 'active',
    createdAt: new Date(2023, 0, 15).toISOString(),
    billingCycle: 'monthly',
    nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
  };
};

// Fonction simulée pour mettre à jour les paramètres de facturation
const updateBillingSettings = async (
  userId: string,
  settings: Partial<BillingSettings>
): Promise<BillingSettings> => {
  // Simuler un appel API
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    companyName: settings.companyName || 'Hiring Solution SAS',
    address: settings.address || '123 Avenue de la République',
    city: settings.city || 'Paris',
    postalCode: settings.postalCode || '75011',
    country: settings.country || 'France',
    vatNumber: settings.vatNumber || 'CM12345678901',
    billingEmail: settings.billingEmail || 'facturation@hiringsolution.com',
    billingPrefix: settings.billingPrefix || 'RP',
  };
};

// Fonction simulée pour mettre à jour le préfixe de facturation
const updateBillingPrefix = async (
  userId: string,
  prefix: string
): Promise<{ billingPrefix: string }> => {
  // Simuler un appel API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    billingPrefix: prefix,
  };
};

export const useBillingSettings = (userId: string) => {
  const [settings, setSettings] = useState<BillingSettings | null>(null);
  const [account, setAccount] = useState<BillingAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Charger les données de facturation
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [settingsData, accountData] = await Promise.all([
        fetchBillingSettings(userId),
        fetchBillingAccount(userId),
      ]);
      setSettings(settingsData);
      setAccount(accountData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Mettre à jour les paramètres de facturation
  const updateSettings = useCallback(
    async (newSettings: Partial<BillingSettings>) => {
      setIsUpdating(true);
      setError(null);
      try {
        const updatedSettings = await updateBillingSettings(userId, newSettings);
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
    [userId]
  );

  // Mettre à jour le préfixe de facturation
  const updatePrefix = useCallback(
    async (prefix: string) => {
      setIsUpdating(true);
      setError(null);
      try {
        const result = await updateBillingPrefix(userId, prefix);
        setSettings((prev) => (prev ? { ...prev, billingPrefix: result.billingPrefix } : null));
        return result;
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error('Une erreur est survenue lors de la mise à jour du préfixe')
        );
        throw err;
      } finally {
        setIsUpdating(false);
      }
    },
    [userId]
  );

  // Charger les données au montage du composant
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    settings,
    account,
    isLoading,
    error,
    fetchData,
    updateSettings,
    updatePrefix,
    isUpdating,
  };
};
