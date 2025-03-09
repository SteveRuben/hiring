'use client';

import { Loader2 } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

interface ApiKeyCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateKey: (name: string, permissions: string[]) => Promise<void>;
}

export function ApiKeyCreateModal({ isOpen, onClose, onCreateKey }: ApiKeyCreateModalProps) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [permissions, setPermissions] = useState<string[]>(['read']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Le nom de la clé est requis');
      return;
    }

    if (permissions.length === 0) {
      setError('Au moins une permission doit être sélectionnée');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onCreateKey(name, permissions);
      handleClose();
    } catch (error) {
      setError('Une erreur est survenue lors de la création de la clé API');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Réinitialiser l'état pour la prochaine ouverture
    setTimeout(() => {
      setName('');
      setPermissions(['read']);
      setError('');
    }, 300);
  };

  const togglePermission = (permission: string) => {
    setPermissions((prev) =>
      prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle clé API</DialogTitle>
          <DialogDescription>
            Créez une nouvelle clé API pour accéder à nos services via des applications tierces.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de la clé</Label>
              <Input
                id="name"
                placeholder="ex: Clé de production"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Donnez un nom descriptif à votre clé pour l'identifier facilement.
              </p>
            </div>

            <div className="space-y-3">
              <Label>Permissions</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="read"
                    checked={permissions.includes('read')}
                    onCheckedChange={() => togglePermission('read')}
                  />
                  <Label htmlFor="read" className="font-normal">
                    Lecture (read)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="write"
                    checked={permissions.includes('write')}
                    onCheckedChange={() => togglePermission('write')}
                  />
                  <Label htmlFor="write" className="font-normal">
                    Écriture (write)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="delete"
                    checked={permissions.includes('delete')}
                    onCheckedChange={() => togglePermission('delete')}
                  />
                  <Label htmlFor="delete" className="font-normal">
                    Suppression (delete)
                  </Label>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Sélectionnez les permissions que vous souhaitez accorder à cette clé API.
              </p>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création...
                </>
              ) : (
                'Créer la clé API'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
