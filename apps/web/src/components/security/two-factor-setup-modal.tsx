'use client';

import { AlertTriangle, Check, Copy, Loader2, QrCode, Shield } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { RecoveryCodes } from './recovery-codes';

interface TwoFactorSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  setupTwoFactor: () => Promise<{
    secret: string;
    qrCodeUrl: string;
    recoveryCodes: string[];
  }>;
}

export function TwoFactorSetupModal({
  isOpen,
  onClose,
  onComplete,
  setupTwoFactor,
}: TwoFactorSetupModalProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [secret, setSecret] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleSetup = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { secret, qrCodeUrl, recoveryCodes } = await setupTwoFactor();
      setSecret(secret);
      setQrCodeUrl(qrCodeUrl);
      setRecoveryCodes(recoveryCodes);
      setStep(2);
    } catch (error) {
      setError('Une erreur est survenue lors de la configuration. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Simuler la vérification du code
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Pour la démo, on accepte n'importe quel code à 6 chiffres
      if (/^\d{6}$/.test(verificationCode)) {
        setStep(3);
      } else {
        setError('Code invalide. Veuillez vérifier et réessayer.');
      }
    } catch (error) {
      setError('Une erreur est survenue lors de la vérification. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    onComplete();
    // Réinitialiser l'état pour la prochaine ouverture
    setTimeout(() => {
      setStep(1);
      setSecret('');
      setQrCodeUrl('');
      setRecoveryCodes([]);
      setVerificationCode('');
      setError('');
      setIsCopied(false);
    }, 300);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(secret);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClose = () => {
    onClose();
    // Réinitialiser l'état pour la prochaine ouverture
    setTimeout(() => {
      setStep(1);
      setSecret('');
      setQrCodeUrl('');
      setRecoveryCodes([]);
      setVerificationCode('');
      setError('');
      setIsCopied(false);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Configurer l'authentification à deux facteurs"}
            {step === 2 && 'Scanner le code QR'}
            {step === 3 && 'Codes de récupération'}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && 'Ajoutez une couche de sécurité supplémentaire à votre compte.'}
            {step === 2 && "Scannez ce code QR avec votre application d'authentification."}
            {step === 3 && 'Conservez ces codes de récupération dans un endroit sûr.'}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 py-4">
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <h4 className="font-medium mb-1">Comment ça fonctionne</h4>
                  <p className="text-sm text-muted-foreground">
                    L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire
                    à votre compte en exigeant un code à usage unique en plus de votre mot de passe.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm">
                Vous aurez besoin d'une application d'authentification comme :
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Google Authenticator</li>
                <li>Microsoft Authenticator</li>
                <li>Authy</li>
              </ul>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center">
              {qrCodeUrl ? (
                <div className="border rounded-md p-2 bg-white">
                  <Image
                    src={qrCodeUrl || '/placeholder.svg'}
                    alt="QR Code"
                    width={200}
                    height={200}
                  />
                </div>
              ) : (
                <div className="w-[200px] h-[200px] flex items-center justify-center bg-muted rounded-md">
                  <QrCode className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="secret">Clé secrète (si vous ne pouvez pas scanner le QR code)</Label>
              <div className="flex items-center space-x-2">
                <Input id="secret" value={secret} readOnly className="font-mono" />
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="verification-code">Code de vérification</Label>
              <Input
                id="verification-code"
                placeholder="Entrez le code à 6 chiffres"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground">
                Entrez le code à 6 chiffres généré par votre application d'authentification.
              </p>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 py-4">
            <div className="rounded-md bg-amber-50 p-4 text-amber-800">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Important</h4>
                  <p className="text-sm">
                    Conservez ces codes de récupération dans un endroit sûr. Ils vous permettront de
                    récupérer l'accès à votre compte si vous perdez votre appareil
                    d'authentification.
                  </p>
                </div>
              </div>
            </div>
            <RecoveryCodes codes={recoveryCodes} />
          </div>
        )}

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          {step === 1 && (
            <Button onClick={handleSetup} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Configuration...
                </>
              ) : (
                'Commencer la configuration'
              )}
            </Button>
          )}

          {step === 2 && (
            <Button onClick={handleVerify} disabled={isLoading || verificationCode.length !== 6}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Vérification...
                </>
              ) : (
                'Vérifier'
              )}
            </Button>
          )}

          {step === 3 && <Button onClick={handleComplete}>Terminer la configuration</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
