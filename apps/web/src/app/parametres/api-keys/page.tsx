'use client';

import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Check, Copy, Eye, EyeOff, Key, Loader2, Plus, Shield, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { ApiKeyCreateModal } from '@/components/api/api-key-create-modal';
import { ApiKeyPermissionsModal } from '@/components/api/api-key-permissions-modal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useApiKeys } from '@/hooks/useApiKeys';

export default function ApiKeysPage() {
  const { toast } = useToast();
  const { apiKeys, isLoading, createApiKey, deleteApiKey, updateApiKeyPermissions } = useApiKeys();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  const [keyToEditPermissions, setKeyToEditPermissions] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleKeyVisibility = (id: string) => {
    if (visibleKeys.includes(id)) {
      setVisibleKeys(visibleKeys.filter((key) => key !== id));
    } else {
      setVisibleKeys([...visibleKeys, id]);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    toast({
      title: 'Clé copiée',
      description: 'La clé API a été copiée dans le presse-papier.',
    });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDeleteKey = async () => {
    if (keyToDelete) {
      try {
        await deleteApiKey(keyToDelete);
        toast({
          title: 'Clé API supprimée',
          description: 'La clé API a été supprimée avec succès.',
        });
      } catch (error) {
        toast({
          title: 'Erreur',
          description: 'Une erreur est survenue lors de la suppression de la clé API.',
          variant: 'destructive',
        });
      } finally {
        setKeyToDelete(null);
      }
    }
  };

  const handleCreateKey = async (name: string, permissions: string[]) => {
    try {
      const newKey = await createApiKey(name, permissions);
      setIsCreateModalOpen(false);
      // Automatically show the newly created key
      setVisibleKeys([...visibleKeys, newKey.id]);
      toast({
        title: 'Clé API créée',
        description: 'Votre nouvelle clé API a été créée avec succès.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la création de la clé API.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdatePermissions = async (id: string, permissions: string[]) => {
    try {
      await updateApiKeyPermissions(id, permissions);
      setKeyToEditPermissions(null);
      toast({
        title: 'Permissions mises à jour',
        description: 'Les permissions de la clé API ont été mises à jour avec succès.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour des permissions.',
        variant: 'destructive',
      });
    }
  };

  const getPermissionBadgeColor = (permission: string) => {
    switch (permission) {
      case 'read':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'write':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      case 'delete':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  // Masquer partiellement une clé API pour l'affichage
  const maskApiKey = (key: string) => {
    if (key.length <= 8) return '••••••••';
    return key.substring(0, 4) + '••••••••••••••••' + key.substring(key.length - 4);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-medium">Clés API</h3>
        <p className="text-sm text-muted-foreground">
          Gérez vos clés API pour accéder à nos services via des applications tierces.
        </p>
      </div>
      <Separator />

      <div className="flex justify-end">
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Créer une nouvelle clé API
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : apiKeys.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Key className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucune clé API</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Vous n'avez pas encore créé de clé API. Créez-en une pour commencer à utiliser nos
              services via des applications tierces.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <Card key={apiKey.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{apiKey.name}</CardTitle>
                    <CardDescription>
                      Créée{' '}
                      {formatDistanceToNow(new Date(apiKey.createdAt), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setKeyToEditPermissions(apiKey.id)}
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Permissions
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setKeyToDelete(apiKey.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                  <div className="font-mono text-sm truncate max-w-[70%]">
                    {visibleKeys.includes(apiKey.id) ? apiKey.key : maskApiKey(apiKey.key)}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                    >
                      {visibleKeys.includes(apiKey.id) ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                      disabled={!visibleKeys.includes(apiKey.id)}
                    >
                      {copiedKey === apiKey.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {apiKey.permissions.map((permission) => (
                    <Badge
                      key={permission}
                      variant="outline"
                      className={`${getPermissionBadgeColor(permission)}`}
                    >
                      {permission}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Sécurité des clés API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-muted p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <h4 className="font-medium mb-1">Bonnes pratiques</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>Ne partagez jamais vos clés API avec des tiers non autorisés.</li>
                  <li>Utilisez des permissions spécifiques pour chaque clé API.</li>
                  <li>Supprimez les clés API que vous n'utilisez plus.</li>
                  <li>Régénérez régulièrement vos clés API pour une sécurité optimale.</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ApiKeyCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateKey={handleCreateKey}
      />

      {keyToEditPermissions && (
        <ApiKeyPermissionsModal
          isOpen={!!keyToEditPermissions}
          onClose={() => setKeyToEditPermissions(null)}
          apiKey={apiKeys.find((key) => key.id === keyToEditPermissions)!}
          onUpdatePermissions={handleUpdatePermissions}
        />
      )}

      <AlertDialog open={!!keyToDelete} onOpenChange={(open) => !open && setKeyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette clé API ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. La suppression de cette clé API révoquera
              immédiatement tous les accès associés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteKey} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
