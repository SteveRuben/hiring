'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useTeamSettings } from '@/hooks/useTeamSettings';
import { type TeamSettingsSchema, teamSettingsSchema } from '@/schemas/teamSettings';

interface TeamSettingsFormProps {
  teamId: string;
}

export function TeamSettingsForm({ teamId }: TeamSettingsFormProps) {
  const { toast } = useToast();
  const { settings, isLoading, updateSettings, isUpdating, fetchSettings } =
    useTeamSettings(teamId);

  const form = useForm<TeamSettingsSchema>({
    resolver: zodResolver(teamSettingsSchema),
    defaultValues: {
      name: '',
      username: '',
      autoJoinDomain: false,
      restrictToDomain: false,
    },
  });

  useEffect(() => {
    // fetchSettings est maintenant mémorisé, donc pas besoin de l'appeler à chaque rendu
    // Cette fonction ne sera appelée qu'une seule fois au montage du composant
    fetchSettings();
  }, []); // Dépendance vide pour n'exécuter qu'au montage

  useEffect(() => {
    if (settings) {
      form.reset({
        name: settings.name,
        username: settings.username,
        autoJoinDomain: settings.autoJoinDomain,
        restrictToDomain: settings.restrictToDomain,
      });
    }
  }, [settings, form]);

  const onSubmit = async (data: TeamSettingsSchema) => {
    try {
      await updateSettings(data);
      toast({
        title: 'Paramètres mis à jour',
        description: "Les paramètres de l'équipe ont été mis à jour avec succès.",
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour des paramètres.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres généraux</CardTitle>
        <CardDescription>
          Configurez les informations de base de votre équipe et les règles d'accès.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'équipe</FormLabel>
                    <FormControl>
                      <Input placeholder="HiringSolution Team" {...field} />
                    </FormControl>
                    <FormDescription>Le nom qui sera affiché pour votre équipe.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom d'utilisateur de l'équipe</FormLabel>
                    <FormControl>
                      <Input placeholder="hiringsolution" {...field} />
                    </FormControl>
                    <FormDescription>
                      Utilisé pour l'URL de votre équipe: hiringsolution.app/{field.value}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-medium">Règles d'accès</h3>

              <FormField
                control={form.control}
                name="autoJoinDomain"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Rejoindre automatiquement</FormLabel>
                      <FormDescription>
                        Les utilisateurs avec une adresse email d'un domaine vérifié rejoindront
                        automatiquement l'équipe.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="restrictToDomain"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Restreindre l'accès</FormLabel>
                      <FormDescription>
                        Seuls les utilisateurs avec une adresse email d'un domaine vérifié pourront
                        rejoindre l'équipe.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer les modifications
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
