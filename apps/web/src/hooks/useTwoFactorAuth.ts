'use client';

import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import { useCallback, useEffect, useState } from 'react';

interface TwoFactorSetupResponse {
  secret: string;
  qrCodeUrl: string;
  recoveryCodes: string[];
}
const generateTwoFactorSecret = (email: string) => {
  const secret = authenticator.generateSecret();
  const serviceName = 'HiringSolution';
  const otpAuthUrl = authenticator.keyuri(email, serviceName, secret);

  return { secret, otpAuthUrl };
};
const generateQRCode = async (otpAuthUrl: string) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(otpAuthUrl);
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};
export const useTwoFactorAuth = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

  // Simuler le chargement initial des données
  useEffect(() => {
    const loadTwoFactorStatus = async () => {
      setIsLoading(true);
      try {
        // Simuler un appel API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Pour la démo, on suppose que 2FA est désactivé par défaut
        setIsEnabled(false);
        setRecoveryCodes([]);
      } catch (error) {
        console.error('Erreur lors du chargement du statut 2FA:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTwoFactorStatus();
  }, []);

  // Fonction pour initialiser la configuration 2FA
  const setupTwoFactor = useCallback(async (): Promise<TwoFactorSetupResponse> => {
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Générer un secret fictif pour la démo
    const { secret, otpAuthUrl } = generateTwoFactorSecret('fankamnicephor@gmail.com');
    //const qrCodeDataUrl = await generateQRCode(otpAuthUrl);
    // URL fictive pour le QR code
    const qrCodeUrl = await generateQRCode(otpAuthUrl);
    // Générer des codes de récupération fictifs
    const generatedRecoveryCodes = [
      '1234-5678-9012',
      '2345-6789-0123',
      '3456-7890-1234',
      '4567-8901-2345',
      '5678-9012-3456',
      '6789-0123-4567',
      '7890-1234-5678',
      '8901-2345-6789',
    ];

    return {
      secret,
      qrCodeUrl,
      recoveryCodes: generatedRecoveryCodes,
    };
  }, []);

  // Fonction pour vérifier un code TOTP
  const verifyTotpCode = useCallback(async (code: string): Promise<boolean> => {
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Pour la démo, on accepte n'importe quel code à 6 chiffres
    const isValid = /^\d{6}$/.test(code);

    if (isValid) {
      setIsEnabled(true);
      // Simuler des codes de récupération
      const generatedRecoveryCodes = [
        '1234-5678-9012',
        '2345-6789-0123',
        '3456-7890-1234',
        '4567-8901-2345',
        '5678-9012-3456',
        '6789-0123-4567',
        '7890-1234-5678',
        '8901-2345-6789',
      ];
      setRecoveryCodes(generatedRecoveryCodes);
    }

    return isValid;
  }, []);

  // Fonction pour désactiver la 2FA
  const disableTwoFactor = useCallback(async (): Promise<void> => {
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsEnabled(false);
    setRecoveryCodes([]);
  }, []);

  // Fonction pour régénérer les codes de récupération
  const regenerateRecoveryCodes = useCallback(async (): Promise<string[]> => {
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Générer de nouveaux codes de récupération fictifs
    const newRecoveryCodes = [
      '9876-5432-1098',
      '8765-4321-0987',
      '7654-3210-9876',
      '6543-2109-8765',
      '5432-1098-7654',
      '4321-0987-6543',
      '3210-9876-5432',
      '2109-8765-4321',
    ];

    setRecoveryCodes(newRecoveryCodes);
    return newRecoveryCodes;
  }, []);

  return {
    isEnabled,
    isLoading,
    recoveryCodes,
    setupTwoFactor,
    verifyTotpCode,
    disableTwoFactor,
    regenerateRecoveryCodes,
  };
};
