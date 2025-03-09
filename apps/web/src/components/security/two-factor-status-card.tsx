'use client';

import { Shield } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface TwoFactorStatusCardProps {
  isEnabled: boolean;
  onEnable: () => void;
  onDisable: () => void;
}

export function TwoFactorStatusCard({ isEnabled, onEnable, onDisable }: TwoFactorStatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Statut de l'authentification à deux facteurs
        </CardTitle>
        <CardDescription>
          L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre
          compte.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isEnabled ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Activée</Badge>
            ) : (
              <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                Désactivée
              </Badge>
            )}
            <p className="text-sm text-muted-foreground">
              {isEnabled
                ? "Votre compte est protégé par l'authentification à deux facteurs."
                : "Votre compte n'est pas protégé par l'authentification à deux facteurs."}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isEnabled ? (
          <Button variant="outline" onClick={onDisable}>
            Désactiver l'authentification à deux facteurs
          </Button>
        ) : (
          <Button onClick={onEnable}>
            <Shield className="mr-2 h-4 w-4" />
            Activer l'authentification à deux facteurs
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
