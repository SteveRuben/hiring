'use client';

import { motion } from 'framer-motion';
import { Bell, Calendar, Loader2, Mail, MessageSquare, Save, User } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

export default function NotificationSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newCandidates: true,
    interviewReminders: true,
    messageNotifications: true,
    marketingEmails: false,
    notificationFrequency: 'immediate',
  });

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Préférences de notifications mises à jour',
        description: 'Vos préférences de notifications ont été mises à jour avec succès.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description:
          'Une erreur est survenue lors de la mise à jour de vos préférences de notifications.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
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
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configurez comment et quand vous souhaitez être notifié.
        </p>
      </div>
      <Separator />

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Canaux de notification
            </CardTitle>
            <CardDescription>
              Choisissez comment vous souhaitez recevoir vos notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="emailNotifications">Notifications par email</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Recevez des notifications par email pour les activités importantes.
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={formData.emailNotifications}
                onCheckedChange={(checked) => handleSwitchChange('emailNotifications', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="pushNotifications">Notifications push</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Recevez des notifications push sur votre navigateur ou appareil mobile.
                </p>
              </div>
              <Switch
                id="pushNotifications"
                checked={formData.pushNotifications}
                onCheckedChange={(checked) => handleSwitchChange('pushNotifications', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="smsNotifications">Notifications SMS</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Recevez des notifications par SMS pour les événements urgents.
                </p>
              </div>
              <Switch
                id="smsNotifications"
                checked={formData.smsNotifications}
                onCheckedChange={(checked) => handleSwitchChange('smsNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Types de notifications
            </CardTitle>
            <CardDescription>
              Choisissez les types d'événements pour lesquels vous souhaitez être notifié.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="newCandidates">Nouveaux candidats</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Soyez notifié lorsque de nouveaux candidats postulent.
                </p>
              </div>
              <Switch
                id="newCandidates"
                checked={formData.newCandidates}
                onCheckedChange={(checked) => handleSwitchChange('newCandidates', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="interviewReminders">Rappels d'entretien</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Recevez des rappels pour vos entretiens à venir.
                </p>
              </div>
              <Switch
                id="interviewReminders"
                checked={formData.interviewReminders}
                onCheckedChange={(checked) => handleSwitchChange('interviewReminders', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="messageNotifications">Messages</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Soyez notifié lorsque vous recevez de nouveaux messages.
                </p>
              </div>
              <Switch
                id="messageNotifications"
                checked={formData.messageNotifications}
                onCheckedChange={(checked) => handleSwitchChange('messageNotifications', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="marketingEmails">Emails marketing</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Recevez des emails sur les nouvelles fonctionnalités et offres.
                </p>
              </div>
              <Switch
                id="marketingEmails"
                checked={formData.marketingEmails}
                onCheckedChange={(checked) => handleSwitchChange('marketingEmails', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Fréquence des notifications
            </CardTitle>
            <CardDescription>
              Choisissez à quelle fréquence vous souhaitez recevoir des notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={formData.notificationFrequency}
              onValueChange={(value) => handleRadioChange('notificationFrequency', value)}
              className="space-y-3"
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="immediate" id="immediate" className="mt-1" />
                <div>
                  <Label htmlFor="immediate" className="font-medium">
                    Immédiat
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des notifications en temps réel pour chaque événement.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="hourly" id="hourly" className="mt-1" />
                <div>
                  <Label htmlFor="hourly" className="font-medium">
                    Toutes les heures
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez un résumé des notifications toutes les heures.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="daily" id="daily" className="mt-1" />
                <div>
                  <Label htmlFor="daily" className="font-medium">
                    Quotidien
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez un résumé quotidien de toutes vos notifications.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="weekly" id="weekly" className="mt-1" />
                <div>
                  <Label htmlFor="weekly" className="font-medium">
                    Hebdomadaire
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez un résumé hebdomadaire de toutes vos notifications.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
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
        </Card>
      </form>
    </motion.div>
  );
}
