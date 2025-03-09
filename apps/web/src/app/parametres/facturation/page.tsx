'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  Building,
  Check,
  Copy,
  CreditCard,
  FileEdit,
  Hash,
  Info,
  Loader2,
  Receipt,
  Save,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useBillingSettings } from '@/hooks/useBillingSettings';
import { type BillingSettingsSchema, billingSettingsSchema } from '@/schemas/billingSettings';

export default function BillingSettingsPage() {
  const { toast } = useToast();
  const [isPrefixModalOpen, setIsPrefixModalOpen] = useState(false);
  const [newPrefix, setNewPrefix] = useState('');
  const [isUpdatingPrefix, setIsUpdatingPrefix] = useState(false);
  const [prefixError, setPrefixError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Utilisez l'ID utilisateur réel dans une application en production
  const { settings, account, isLoading, isUpdating, updateSettings, updatePrefix } =
    useBillingSettings('user_1');

  const form = useForm<BillingSettingsSchema>({
    resolver: zodResolver(billingSettingsSchema),
    defaultValues: {
      companyName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      vatNumber: '',
      billingEmail: '',
      billingPrefix: '',
    },
  });

  // Ajouter cet useEffect après la déclaration du formulaire
  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings, form]);

  const onSubmit = async (data: BillingSettingsSchema) => {
    try {
      await updateSettings(data);
      toast({
        title: 'Paramètres mis à jour',
        description: 'Vos informations de facturation ont été mises à jour avec succès.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description:
          'Une erreur est survenue lors de la mise à jour des informations de facturation.',
        variant: 'destructive',
      });
    }
  };

  const handlePrefixUpdate = async () => {
    if (!newPrefix.trim()) {
      setPrefixError('Le préfixe ne peut pas être vide');
      return;
    }

    if (newPrefix.length > 10) {
      setPrefixError('Le préfixe ne peut pas dépasser 10 caractères');
      return;
    }

    setPrefixError('');
    setIsUpdatingPrefix(true);

    try {
      await updatePrefix(newPrefix);
      setIsPrefixModalOpen(false);
      toast({
        title: 'Préfixe mis à jour',
        description: 'Le préfixe de facturation a été mis à jour avec succès.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour du préfixe.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdatingPrefix(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: 'ID copié',
      description: "L'identifiant a été copié dans le presse-papier.",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getBillingStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'inactive':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'pending':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
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
        <h3 className="text-lg font-medium">Informations de facturation</h3>
        <p className="text-sm text-muted-foreground">
          Gérez vos informations de facturation et visualisez les détails de votre compte.
        </p>
      </div>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carte Compte */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Compte
            </CardTitle>
            <CardDescription>Informations sur votre compte de facturation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : account ? (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Statut</span>
                    <Badge
                      variant="outline"
                      className={`${getBillingStatusColor(account.status)} capitalize`}
                    >
                      {account.status === 'active'
                        ? 'Actif'
                        : account.status === 'inactive'
                          ? 'Inactif'
                          : 'En attente'}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Solde actuel</span>
                    <span className="font-medium">
                      {account.balance.toFixed(2)} {account.currency}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cycle de facturation</span>
                    <span className="capitalize">
                      {account.billingCycle === 'monthly' ? 'Mensuel' : 'Annuel'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Prochaine facturation</span>
                    <span>
                      {format(new Date(account.nextBillingDate), 'dd MMM yyyy', { locale: fr })}
                    </span>
                  </div>

                  <Separator className="my-2" />

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">ID Client</span>
                      <div className="flex items-center">
                        <span className="font-mono text-xs mr-2">{account.customerId}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(account.customerId, 'customer')}
                        >
                          {copiedId === 'customer' ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">ID Compte</span>
                      <div className="flex items-center">
                        <span className="font-mono text-xs mr-2">{account.id}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(account.id, 'account')}
                        >
                          {copiedId === 'account' ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Préfixe de facturation */}
                <div className="pt-2">
                  <div className="rounded-md border p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium flex items-center">
                          <Hash className="h-4 w-4 mr-1 text-muted-foreground" />
                          Préfixe de facturation
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Utilisé pour les numéros de factures
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setNewPrefix(settings?.billingPrefix || '');
                          setIsPrefixModalOpen(true);
                        }}
                      >
                        <FileEdit className="h-4 w-4 mr-2" />
                        Modifier
                      </Button>
                    </div>
                    {settings?.billingPrefix ? (
                      <div className="mt-2 flex items-center">
                        <span className="font-mono text-lg font-medium">
                          {settings.billingPrefix}
                        </span>
                        <span className="text-muted-foreground ml-2">-0001</span>
                      </div>
                    ) : (
                      <div className="mt-2 text-sm text-muted-foreground italic">
                        Aucun préfixe défini
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Impossible de charger les informations du compte.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Informations de facturation */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Informations de facturation
            </CardTitle>
            <CardDescription>Ces informations apparaîtront sur vos factures.</CardDescription>
          </CardHeader>
          {isLoading ? (
            <CardContent className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </CardContent>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de l'entreprise</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre entreprise" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="billingEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email de facturation</FormLabel>
                          <FormControl>
                            <Input placeholder="facturation@exemple.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input placeholder="Adresse" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ville</FormLabel>
                          <FormControl>
                            <Input placeholder="Ville" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code postal</FormLabel>
                          <FormControl>
                            <Input placeholder="Code postal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pays</FormLabel>
                          <FormControl>
                            <Input placeholder="Pays" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="vatNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Numéro de TVA <span className="text-muted-foreground">(optionnel)</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="FR12345678901" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormDescription>
                          Pour les entreprises de l'UE, le numéro de TVA est obligatoire pour la
                          facturation sans TVA.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button type="submit" disabled={isUpdating || !form.formState.isDirty}>
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
          )}
        </Card>
      </div>

      {/* Actions et historique */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Factures et paiements
          </CardTitle>
          <CardDescription>Accédez à l'historique et aux informations de paiement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-md border p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium flex items-center">
                  <Receipt className="h-4 w-4 mr-2 text-muted-foreground" />
                  Factures
                </h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Consultez et téléchargez toutes vos factures
              </p>
              <Button variant="outline" className="w-full flex items-center justify-center">
                Voir toutes les factures
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="rounded-md border p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                  Moyens de paiement
                </h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Gérez vos cartes de crédit et autres moyens de paiement
              </p>
              <Button variant="outline" className="w-full flex items-center justify-center">
                Gérer les moyens de paiement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md bg-muted p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <h4 className="font-medium mb-1">Besoin d'aide avec la facturation ?</h4>
                <p className="text-sm text-muted-foreground">
                  Pour toute question concernant vos factures ou vos paiements, n'hésitez pas à
                  contacter notre équipe de support.
                </p>
                <Button variant="link" className="h-auto p-0 mt-2 text-primary">
                  Contacter le support
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal pour modifier le préfixe de facturation */}
      <Dialog open={isPrefixModalOpen} onOpenChange={setIsPrefixModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier le préfixe de facturation</DialogTitle>
            <DialogDescription>
              Ce préfixe sera utilisé pour générer les numéros de factures (ex: RP-0001).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="prefix">Préfixe</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="prefix"
                  value={newPrefix}
                  onChange={(e) => {
                    setNewPrefix(e.target.value);
                    setPrefixError('');
                  }}
                  placeholder="RP"
                  className="font-mono"
                  maxLength={10}
                />
                <span className="text-muted-foreground">-0001</span>
              </div>
              {prefixError && <p className="text-sm text-red-500 mt-1">{prefixError}</p>}
              <p className="text-sm text-muted-foreground mt-1">
                Le préfixe doit contenir 10 caractères maximum et ne peut pas être vide.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPrefixModalOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button onClick={handlePrefixUpdate} disabled={isUpdatingPrefix}>
              {isUpdatingPrefix ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
