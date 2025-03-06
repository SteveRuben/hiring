'use client';

import md5 from 'crypto-js/md5';
import { motion } from 'framer-motion';
import { Image, Loader2, RefreshCw, Save, Upload } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

export default function AvatarSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('gravatar');
  const [formData, setFormData] = useState({
    email: 'jean.dupont@example.com',
    gravatarEmail: 'jean.dupont@example.com',
    avatarStyle: 'avataaars',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        title: 'Avatar mis à jour',
        description: 'Votre avatar a été mis à jour avec succès.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour de votre avatar.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getGravatarUrl = (email) => {
    const hash = md5(email.trim().toLowerCase()).toString();
    return `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
  };

  const getDicebearUrl = (style) => {
    return `https://api.dicebear.com/6.x/${style}/svg?seed=Felix`;
  };

  const avatarStyles = [
    { value: 'avataaars', label: 'Avataaars' },
    { value: 'bottts', label: 'Bottts' },
    { value: 'pixel-art', label: 'Pixel Art' },
    { value: 'lorelei', label: 'Lorelei' },
    { value: 'initials', label: 'Initiales' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-medium">Avatar</h3>
        <p className="text-sm text-muted-foreground">
          Personnalisez votre avatar qui sera affiché sur votre profil.
        </p>
      </div>
      <Separator />

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5 text-primary" />
              Paramètres de l'avatar
            </CardTitle>
            <CardDescription>
              Choisissez comment vous souhaitez personnaliser votre avatar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="gravatar">Gravatar</TabsTrigger>
                <TabsTrigger value="dicebear">Avatar généré</TabsTrigger>
              </TabsList>
              <TabsContent value="gravatar" className="space-y-4 pt-4">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3 flex flex-col items-center justify-center">
                    <Avatar className="h-32 w-32 mb-4">
                      <AvatarImage src={getGravatarUrl(formData.gravatarEmail)} alt="Avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="mt-2" type="button">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Actualiser
                    </Button>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="gravatarEmail">Email Gravatar</Label>
                      <Input
                        id="gravatarEmail"
                        name="gravatarEmail"
                        type="email"
                        value={formData.gravatarEmail}
                        onChange={handleChange}
                        placeholder="Votre adresse email Gravatar"
                      />
                      <p className="text-sm text-muted-foreground">
                        Nous utilisons{' '}
                        <a
                          href="https://gravatar.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Gravatar
                        </a>{' '}
                        pour récupérer votre avatar. Si vous n'avez pas de compte Gravatar, vous
                        pouvez en créer un gratuitement.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="dicebear" className="space-y-4 pt-4">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3 flex flex-col items-center justify-center">
                    <Avatar className="h-32 w-32 mb-4">
                      <AvatarImage src={getDicebearUrl(formData.avatarStyle)} alt="Avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="mt-2" type="button">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Générer un autre
                    </Button>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="space-y-2">
                      <Label>Style d'avatar</Label>
                      <RadioGroup
                        value={formData.avatarStyle}
                        onValueChange={(value) => handleRadioChange('avatarStyle', value)}
                        className="grid grid-cols-2 gap-2"
                      >
                        {avatarStyles.map((style) => (
                          <div key={style.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={style.value} id={style.value} />
                            <Label htmlFor={style.value} className="font-normal">
                              {style.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      <p className="text-sm text-muted-foreground">
                        Nous utilisons{' '}
                        <a
                          href="https://dicebear.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          DiceBear
                        </a>{' '}
                        pour générer des avatars aléatoires.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center gap-2 text-sm">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Vous pouvez également télécharger une image personnalisée en contactant le
                  support.
                </span>
              </div>
            </div>
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
