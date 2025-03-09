'use client';

import { Loader2, Shield } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

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
import { Label } from '@/components/ui/label';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  createdAt: string;
}

interface ApiKeyPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: ApiKey;
  onUpdatePermissions: (id: string, permissions: string[]) => Promise<void>;
}

export function ApiKeyPermissionsModal({
  isOpen,
  onClose,
  apiKey,
  onUpdatePermissions,
}: ApiKeyPermissionsModalProps) {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (apiKey) {
      setPermissions([...apiKey.permissions]);
    }
  }, [apiKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (permissions.length === 0) {
      setError('Au moins une permission doit être sélectionnée');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onUpdatePermissions(apiKey.id, permissions);
      onClose();
    } catch (error) {
      setError('Une erreur est survenue lors de la mise à jour des permissions');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePermission = (permission: string) => {
    setPermissions((prev) =>
      prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Modifier les permissions
          </DialogTitle>
          <DialogDescription>
            Modifiez les permissions pour la clé API "{apiKey?.name}".
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <Label>Permissions</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="read-permission"
                    checked={permissions.includes('read')}
                    onCheckedChange={() => togglePermission('read')}
                  />
                  <Label htmlFor="read-permission" className="font-normal">
                    Lecture (read)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="write-permission"
                    checked={permissions.includes('write')}
                    onCheckedChange={() => togglePermission('write')}
                  />
                  <Label htmlFor="write-permission" className="font-normal">
                    Écriture (write)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="delete-permission"
                    checked={permissions.includes('delete')}
                    onCheckedChange={() => togglePermission('delete')}
                  />
                  <Label htmlFor="delete-permission" className="font-normal">
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
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                'Mettre à jour les permissions'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
