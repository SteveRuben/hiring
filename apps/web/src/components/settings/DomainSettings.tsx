'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Check, Clock, Globe, Loader2, Plus, RefreshCw, Shield, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useDomainSettings } from '@/hooks/useTeamSettings';
import { type DomainSchema, domainSchema } from '@/schemas/teamSettings';

interface DomainSettingsProps {
  teamId: string;
}

export function DomainSettings({ teamId }: DomainSettingsProps) {
  const { toast } = useToast();
  const { domains, isLoading, fetchDomains, addDomain, removeDomain, setPrimaryDomain } =
    useDomainSettings(teamId);
  const [domainToRemove, setDomainToRemove] = useState<string | null>(null);

  const form = useForm<DomainSchema>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      domain: '',
    },
  });

  useEffect(() => {
    // fetchDomains est maintenant mémorisé, donc pas besoin de l'appeler à chaque rendu
    // Cette fonction ne sera appelée qu'une seule fois au montage du composant
    fetchDomains();
  }, []); // Dépendance vide pour n'exécuter qu'au montage

  const onSubmit = async (data: DomainSchema) => {
    try {
      await addDomain(data.domain);
      toast({
        title: 'Domaine ajouté',
        description: `Le domaine ${data.domain} a été ajouté. Veuillez vérifier votre domaine.`,
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Une erreur est survenue lors de l'ajout du domaine.",
        variant: 'destructive',
      });
    }
  };

  const handleRemoveDomain = async () => {
    if (domainToRemove) {
      try {
        await removeDomain(domainToRemove);
        toast({
          title: 'Domaine supprimé',
          description: 'Le domaine a été supprimé avec succès.',
        });
      } catch (error) {
        toast({
          title: 'Erreur',
          description: 'Une erreur est survenue lors de la suppression du domaine.',
          variant: 'destructive',
        });
      } finally {
        setDomainToRemove(null);
      }
    }
  };

  const handleSetPrimaryDomain = async (id: string) => {
    try {
      await setPrimaryDomain(id);
      toast({
        title: 'Domaine principal défini',
        description: 'Le domaine principal a été mis à jour avec succès.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la définition du domaine principal.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Domaines vérifiés
        </CardTitle>
        <CardDescription>
          Gérez les domaines autorisés pour votre équipe. Les utilisateurs avec des adresses email
          de ces domaines pourront rejoindre votre équipe.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : domains.length === 0 ? (
          <div className="text-center py-8 border rounded-md bg-muted/50">
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucun domaine vérifié</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Ajoutez un domaine pour permettre aux utilisateurs de ce domaine de rejoindre votre
              équipe automatiquement.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-medium text-muted-foreground">
                <div className="col-span-5">Domaine</div>
                <div className="col-span-3">Statut</div>
                <div className="col-span-3">Ajouté</div>
                <div className="col-span-1"></div>
              </div>

              {domains.map((domain) => (
                <div key={domain.id} className="grid grid-cols-12 gap-4 p-4 items-center border-t">
                  <div className="col-span-5 flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium flex items-center">
                        {domain.domain}
                        {domain.primary && (
                          <Badge
                            variant="outline"
                            className="ml-2 text-xs bg-primary/10 text-primary border-primary/20"
                          >
                            Principal
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3">
                    {domain.verified ? (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-100 flex w-fit items-center"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Vérifié
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex w-fit items-center"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        En attente
                      </Badge>
                    )}
                  </div>
                  <div className="col-span-3 text-sm text-muted-foreground">
                    {domain.verificationDate
                      ? formatDistanceToNow(domain.verificationDate, {
                          addSuffix: true,
                          locale: fr,
                        })
                      : 'Récemment'}
                  </div>
                  <div className="col-span-1 flex justify-end space-x-1">
                    {!domain.primary && domain.verified && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleSetPrimaryDomain(domain.id)}
                        title="Définir comme domaine principal"
                      >
                        <Shield className="h-4 w-4" />
                      </Button>
                    )}
                    {!domain.verified && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="Vérifier le domaine"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setDomainToRemove(domain.id)}
                      title="Supprimer le domaine"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4">
          <h3 className="text-sm font-medium mb-4">Ajouter un nouveau domaine</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-2">
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="exemple.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 mt-0.5 text-muted-foreground" />
          <p>
            La vérification du domaine vous permet de confirmer que vous êtes propriétaire du
            domaine. Cela empêche les utilisateurs non autorisés de rejoindre votre équipe.
          </p>
        </div>
      </CardFooter>

      <AlertDialog
        open={!!domainToRemove}
        onOpenChange={(open) => !open && setDomainToRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce domaine ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Les utilisateurs de ce domaine ne pourront plus
              rejoindre automatiquement votre équipe.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveDomain} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
