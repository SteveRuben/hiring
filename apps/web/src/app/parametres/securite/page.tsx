'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Loader2, Lock, LogOut, Save, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

import { activeSessions } from '../mock/mock-param';

export default function SecuritySettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({ ...prev, twoFactorEnabled: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Mot de passe mis à jour',
        description: 'Votre mot de passe a été mis à jour avec succès.',
      });

      // Réinitialiser les champs
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour de votre mot de passe.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutAllSessions = async () => {
    setIsLoadingLogout(true);

    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Sessions déconnectées',
        description: 'Toutes vos sessions ont été déconnectées avec succès.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la déconnexion de vos sessions.',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingLogout(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-medium">Sécurité</h3>
        <p className="text-sm text-muted-foreground">
          Gérez votre mot de passe et les paramètres de sécurité de votre compte.
        </p>
      </div>
      <Separator />

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Changer de mot de passe
            </CardTitle>
            <CardDescription>
              Assurez-vous d'utiliser un mot de passe fort et unique pour votre compte.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Entrez votre mot de passe actuel"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Entrez votre nouveau mot de passe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmez votre nouveau mot de passe"
                />
              </div>
            </div>
            <div className="rounded-md bg-muted p-4">
              <div className="flex flex-col space-y-1 text-sm">
                <p className="font-medium">Votre mot de passe doit :</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Contenir au moins 8 caractères</li>
                  <li>Inclure au moins une lettre majuscule</li>
                  <li>Inclure au moins un chiffre</li>
                  <li>Inclure au moins un caractère spécial</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Mettre à jour le mot de passe
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            Authentification à deux facteurs
          </CardTitle>
          <CardDescription>
            Ajoutez une couche de sécurité supplémentaire à votre compte.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="twoFactorEnabled">Activer l'authentification à deux facteurs</Label>
              <p className="text-sm text-muted-foreground">
                Recevez un code de vérification par SMS ou application d'authentification lors de la
                connexion.
              </p>
            </div>
            <Switch
              id="twoFactorEnabled"
              checked={formData.twoFactorEnabled}
              onCheckedChange={handleSwitchChange}
            />
          </div>
          {formData.twoFactorEnabled && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                L'authentification à deux facteurs est activée. Assurez-vous de conserver vos codes
                de récupération dans un endroit sûr.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5 text-primary" />
            Sessions actives
          </CardTitle>
          <CardDescription>Gérez les appareils connectés à votre compte.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {activeSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="space-y-1">
                  <div className="font-medium flex items-center gap-2">
                    {session.device}
                    {session.current && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        Session actuelle
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {session.location} • {session.ip}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Dernière activité : {session.lastActive}
                  </div>
                </div>
                {!session.current && (
                  <Button variant="outline" size="sm">
                    Déconnecter
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            variant="destructive"
            onClick={handleLogoutAllSessions}
            disabled={isLoadingLogout}
          >
            {isLoadingLogout ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Déconnexion...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Déconnecter toutes les autres sessions
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
