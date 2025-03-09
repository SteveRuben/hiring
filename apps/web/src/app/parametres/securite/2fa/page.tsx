'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Key, Loader2, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { RecoveryCodes } from '@/components/security/recovery-codes';
import { TwoFactorSetupModal } from '@/components/security/two-factor-setup-modal';
import { TwoFactorStatusCard } from '@/components/security/two-factor-status-card';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useTwoFactorAuth } from '@/hooks/useTwoFactorAuth';

export default function TwoFactorAuthPage() {
  const { toast } = useToast();
  const {
    isEnabled,
    isLoading,
    setupTwoFactor,
    disableTwoFactor,
    recoveryCodes,
    regenerateRecoveryCodes,
  } = useTwoFactorAuth();
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isRegeneratingCodes, setIsRegeneratingCodes] = useState(false);

  const handleSetupComplete = () => {
    setIsSetupModalOpen(false);
    toast({
      title: 'Authentification à deux facteurs activée',
      description: "Votre compte est maintenant sécurisé avec l'authentification à deux facteurs.",
    });
  };

  const handleDisable = async () => {
    try {
      await disableTwoFactor();
      toast({
        title: 'Authentification à deux facteurs désactivée',
        description: "L'authentification à deux facteurs a été désactivée pour votre compte.",
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description:
          "Une erreur est survenue lors de la désactivation de l'authentification à deux facteurs.",
        variant: 'destructive',
      });
    }
  };

  const handleRegenerateRecoveryCodes = async () => {
    setIsRegeneratingCodes(true);
    try {
      await regenerateRecoveryCodes();
      toast({
        title: 'Codes de récupération régénérés',
        description:
          'Vos nouveaux codes de récupération ont été générés. Veuillez les sauvegarder en lieu sûr.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la régénération des codes de récupération.',
        variant: 'destructive',
      });
    } finally {
      setIsRegeneratingCodes(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/parametres/securite" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Retour aux paramètres de sécurité
            </Link>
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Authentification à deux facteurs</h3>
        <p className="text-sm text-muted-foreground">
          Sécurisez votre compte avec une couche de protection supplémentaire.
        </p>
      </div>
      <Separator />

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-6">
          <TwoFactorStatusCard
            isEnabled={isEnabled}
            onEnable={() => setIsSetupModalOpen(true)}
            onDisable={handleDisable}
          />

          {isEnabled && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    Codes de récupération
                  </CardTitle>
                  <CardDescription>
                    Utilisez ces codes en cas de perte d'accès à votre application
                    d'authentification. Chaque code ne peut être utilisé qu'une seule fois.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecoveryCodes codes={recoveryCodes} />
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={handleRegenerateRecoveryCodes}
                    disabled={isRegeneratingCodes}
                  >
                    {isRegeneratingCodes ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Régénération...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Régénérer les codes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Informations importantes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md bg-amber-50 p-4 text-amber-800">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">
                          Conservez vos codes de récupération en lieu sûr
                        </h4>
                        <p className="text-sm">
                          Si vous perdez l'accès à votre application d'authentification et à vos
                          codes de récupération, vous ne pourrez plus accéder à votre compte.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Applications d'authentification recommandées :</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Google Authenticator (Android, iOS)</li>
                      <li>Microsoft Authenticator (Android, iOS)</li>
                      <li>Authy (Android, iOS, Desktop)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}

      <TwoFactorSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        onComplete={handleSetupComplete}
        setupTwoFactor={setupTwoFactor}
      />
    </motion.div>
  );
}
