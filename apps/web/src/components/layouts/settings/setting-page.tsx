'use client';

import { Dialog } from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Building,
  Check,
  ChevronRight,
  Copy,
  CreditCard,
  FileEdit,
  Globe,
  Hash,
  Info,
  Mail,
  Phone,
  Plus,
  Receipt,
  Shield,
  Smartphone,
  Upload,
  User,
  Users,
  Webhook,
} from 'lucide-react';
import React, { useState } from 'react';

import { account, settings } from '@/app/api/setting/mock-billing';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [copied, setCopied] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isPrefixModalOpen, setIsPrefixModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Thomas Dubois',
      email: 'thomas@example.com',
      role: 'Admin',
      avatar: '/api/placeholder/30/30',
    },
    {
      id: 2,
      name: 'Sophie Martin',
      email: 'sophie@example.com',
      role: 'Recruteur',
      avatar: '/api/placeholder/30/30',
    },
  ]);
  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      url: 'https://api.example.com/webhook1',
      events: ['candidate.created', 'interview.scheduled'],
      active: true,
    },
  ]);

  const copyApiKey = () => {
    navigator.clipboard.writeText('sk_test_123456789abcdefghijklmnopqrstuvwxyz');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: <User size={18} /> },
    { id: 'security', label: 'Sécurité', icon: <Shield size={18} /> },
    { id: 'team', label: 'Équipe', icon: <Users size={18} /> },
    { id: 'billing', label: 'billing', icon: <Receipt size={18} /> },
    { id: 'webhooks', label: 'Webhooks', icon: <Webhook size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Paramètres</h2>
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center p-2 rounded-md text-left ${
                  activeTab === tab.id
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-8">
        {activeTab === 'profile' && (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Informations du profil</h1>

            <div className="bg-white rounded-lg border p-6 mb-6">
              <div className="flex items-start">
                <div className="relative mr-6">
                  <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                    <img
                      src="/api/placeholder/96/96"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full border shadow-sm hover:bg-slate-50">
                    <Upload size={14} />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nom</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                        defaultValue="Thomas Dubois"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Fonction
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                        defaultValue="Responsable Recrutement"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Informations de contact</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="text-slate-400 mr-3" size={18} />
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border rounded-md mt-1"
                      defaultValue="thomas.dubois@company.com"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="text-slate-400 mr-3" size={18} />
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Téléphone</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border rounded-md mt-1"
                      defaultValue="+33 6 12 34 56 78"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Clé API</h2>
              <p className="text-sm text-slate-500 mb-4">
                Utilisez cette clé pour intégrer notre API dans vos applications.
              </p>
              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border rounded-l-md bg-slate-50"
                  value="sk_test_123456789abcdefghijklmnopqrstuvwxyz"
                  readOnly
                />
                <button
                  onClick={copyApiKey}
                  className="px-3 py-2 border-y border-r rounded-r-md bg-white hover:bg-slate-50"
                >
                  {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Enregistrer les modifications
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Sécurité</h1>

            <div className="bg-white rounded-lg border p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Mot de passe</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="••••••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="••••••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="••••••••••••"
                  />
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Modifier le mot de passe
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium">Authentification à deux facteurs</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Ajoutez une couche de sécurité supplémentaire à votre compte.
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="twoFactorToggle"
                    className="sr-only"
                    checked={twoFactorEnabled}
                    onChange={toggleTwoFactor}
                  />
                  <label
                    htmlFor="twoFactorToggle"
                    className={`block w-14 h-7 rounded-full transition-colors duration-200 cursor-pointer ${
                      twoFactorEnabled ? 'bg-indigo-600' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 mt-1 ml-1 bg-white rounded-full transition-transform duration-200 ${
                        twoFactorEnabled ? 'transform translate-x-7' : ''
                      }`}
                    />
                  </label>
                </div>
              </div>

              {twoFactorEnabled && (
                <div className="mt-6 p-4 bg-slate-50 rounded-md">
                  <div className="flex items-start">
                    <Smartphone className="text-slate-400 mr-3 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium">Application d'authentification</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Utilisez Google Authenticator, Microsoft Authenticator ou toute autre
                        application d'authentification pour scanner le QR code.
                      </p>
                      <div className="mt-3 p-3 bg-white border rounded-md inline-block">
                        <img src="/api/placeholder/150/150" alt="QR Code" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg border p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Sessions actives</h2>
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <Globe size={18} className="text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium">Chrome - Windows</div>
                      <div className="text-sm text-slate-500">Paris, France • Actif maintenant</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-600 font-medium">Cet appareil</div>
                </div>
              </div>
              <button className="mt-4 text-sm text-red-600 font-medium hover:underline">
                Se déconnecter de toutes les autres sessions
              </button>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold">Gestion de l'équipe</h1>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
                <Plus size={18} className="mr-2" />
                Ajouter un membre
              </button>
            </div>

            <div className="bg-white rounded-lg border overflow-hidden mb-6">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Membre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Rôle
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {teamMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="font-medium text-slate-900">{member.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500">{member.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            member.role === 'Admin'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          Modifier
                        </button>
                        <button className="text-red-600 hover:text-red-900">Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Inviter des membres</h2>
              <div className="flex">
                <input
                  type="email"
                  className="flex-1 px-3 py-2 border rounded-l-md"
                  placeholder="Adresse email"
                />
                <select className="px-3 py-2 border-y">
                  <option>Recruteur</option>
                  <option>Admin</option>
                  <option>Lecture seule</option>
                </select>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700">
                  Inviter
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'billing' && (
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
              {/* Account Card */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Compte
                  </CardTitle>
                  <CardDescription>Informations sur votre compte de facturation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Statut</span>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-100 capitalize"
                      >
                        Actif
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
                      <span className="capitalize">Mensuel</span>
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
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">ID Compte</span>
                        <div className="flex items-center">
                          <span className="font-mono text-xs mr-2">{account.id}</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Billing Prefix */}
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
                        <Button variant="outline" size="sm">
                          <FileEdit className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center">
                        <span className="font-mono text-lg font-medium">
                          {settings.billingPrefix}
                        </span>
                        <span className="text-muted-foreground ml-2">-0001</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Information Form */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Informations de facturation
                  </CardTitle>
                  <CardDescription>Ces informations apparaîtront sur vos factures.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Nom de l'entreprise</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={settings.companyName}
                        readOnly
                        placeholder="Votre entreprise"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingEmail">Email de facturation</Label>
                      <Input
                        id="billingEmail"
                        name="billingEmail"
                        type="email"
                        value={settings.billingEmail}
                        readOnly
                        placeholder="facturation@exemple.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      name="address"
                      value={settings.address}
                      readOnly
                      placeholder="Adresse"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        name="city"
                        value={settings.city}
                        readOnly
                        placeholder="Ville"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={settings.postalCode}
                        readOnly
                        placeholder="Code postal"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Pays</Label>
                      <Input
                        id="country"
                        name="country"
                        value={settings.country}
                        readOnly
                        placeholder="Pays"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vatNumber">
                      Numéro de TVA <span className="text-muted-foreground">(optionnel)</span>
                    </Label>
                    <Input
                      id="vatNumber"
                      name="vatNumber"
                      value={settings.vatNumber}
                      readOnly
                      placeholder="FR12345678901"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
        {activeTab === 'webhooks' && (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold">Configuration des Webhooks</h1>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
                <Plus size={18} className="mr-2" />
                Ajouter un webhook
              </button>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-6">
              <div className="flex items-start">
                <AlertCircle className="text-indigo-600 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-medium">À propos des webhooks</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Les webhooks vous permettent de recevoir des notifications en temps réel lorsque
                    des événements se produisent dans votre compte, comme la création d'un candidat
                    ou la planification d'un entretien.
                  </p>
                </div>
              </div>
            </div>

            {webhooks.length > 0 ? (
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="bg-white rounded-lg border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-3 ${webhook.active ? 'bg-green-500' : 'bg-slate-300'}`}
                        ></div>
                        <h2 className="text-lg font-medium">{webhook.url}</h2>
                      </div>
                      <div className="flex items-center">
                        <button className="text-sm text-slate-600 hover:text-slate-900 mr-3">
                          Modifier
                        </button>
                        <button className="text-sm text-red-600 hover:text-red-900">
                          Supprimer
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">Événements abonnés:</h3>
                      <div className="flex flex-wrap gap-2">
                        {webhook.events.map((event) => (
                          <span
                            key={event}
                            className="px-2 py-1 bg-slate-100 text-slate-800 text-xs rounded-full"
                          >
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border p-6 text-center">
                <Webhook size={48} className="mx-auto text-slate-300 mb-3" />
                <h3 className="font-medium text-lg">Aucun webhook configuré</h3>
                <p className="text-slate-500 mt-1 mb-4">
                  Créez votre premier webhook pour commencer à recevoir des notifications en temps
                  réel.
                </p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-flex items-center">
                  <Plus size={18} className="mr-2" />
                  Ajouter un webhook
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
