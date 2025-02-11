// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { Loader2, Smartphone, Laptop, TabletSmartphone } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import md5 from "md5"

// export default function AccountPage() {
//   const { toast } = useToast()
//   const [personalInfo, setPersonalInfo] = useState({
//     fullName: "",
//     nickname: "",
//     email: "",
//     pronouns: "",
//   })

//   const [location, setLocation] = useState({
//     country: "",
//     timezone: "",
//   })

//   const [avatarEmail, setAvatarEmail] = useState("")
//   const [avatarUrl, setAvatarUrl] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     if (avatarEmail) {
//       const hash = md5(avatarEmail.trim().toLowerCase())
//       setAvatarUrl(`https://www.gravatar.com/avatar/${hash}?s=200&d=mp`)
//     }
//   }, [avatarEmail])

//   const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value })
//   }

//   const handleLocationChange = (name: string, value: string) => {
//     setLocation({ ...location, [name]: value })
//   }

//   const handleSave = async () => {
//     setIsLoading(true)
//     // Simuler une requête API
//     await new Promise((resolve) => setTimeout(resolve, 1000))
//     setIsLoading(false)
//     toast({
//       title: "Modifications enregistrées",
//       description: "Vos paramètres ont été mis à jour avec succès.",
//     })

//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-4xl mx-auto"
//     >
//       <h1 className="text-3xl font-bold mb-6">Paramètres du compte</h1>
//       <Tabs defaultValue="personal" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
//           <TabsTrigger value="location">Localisation</TabsTrigger>
//           <TabsTrigger value="security">Sécurité</TabsTrigger>
//           <TabsTrigger value="avatar">Avatar</TabsTrigger>
//         </TabsList>
//         <TabsContent value="personal">
//           <Card>
//             <CardHeader>
//               <CardTitle>Informations personnelles</CardTitle>
//               <CardDescription>Mettez à jour vos informations personnelles ici.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="fullName">Nom complet</Label>
//                 <Input
//                   id="fullName"
//                   name="fullName"
//                   value={personalInfo.fullName}
//                   onChange={handlePersonalInfoChange}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="nickname">Surnom</Label>
//                 <Input
//                   id="nickname"
//                   name="nickname"
//                   value={personalInfo.nickname}
//                   onChange={handlePersonalInfoChange}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={personalInfo.email}
//                   onChange={handlePersonalInfoChange}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="pronouns">Pronoms</Label>
//                 <Select onValueChange={(value) => setPersonalInfo({ ...personalInfo, pronouns: value })}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Sélectionnez vos pronoms" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="he/him">Il/Lui</SelectItem>
//                     <SelectItem value="she/her">Elle/Elle</SelectItem>
//                     <SelectItem value="they/them">Iel/Ellui</SelectItem>
//                     <SelectItem value="other">Autre</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <Button onClick={handleSave} disabled={isLoading}>
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Enregistrement...
//                   </>
//                 ) : (
//                   "Sauvegarder les changements"
//                 )}
//               </Button>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="location">
//           <Card>
//             <CardHeader>
//               <CardTitle>Localisation</CardTitle>
//               <CardDescription>Configurez votre pays et fuseau horaire.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="country">Pays</Label>
//                 <Select onValueChange={(value) => handleLocationChange("country", value)}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Sélectionnez votre pays" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="fr">France</SelectItem>
//                     <SelectItem value="ca">Canada</SelectItem>
//                     <SelectItem value="be">Belgique</SelectItem>
//                     <SelectItem value="ch">Suisse</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="timezone">Fuseau horaire</Label>
//                 <Select onValueChange={(value) => handleLocationChange("timezone", value)}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Sélectionnez votre fuseau horaire" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="europe/paris">Europe/Paris</SelectItem>
//                     <SelectItem value="america/montreal">America/Montreal</SelectItem>
//                     <SelectItem value="europe/brussels">Europe/Brussels</SelectItem>
//                     <SelectItem value="europe/zurich">Europe/Zurich</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <Button onClick={handleSave} disabled={isLoading}>
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Enregistrement...
//                   </>
//                 ) : (
//                   "Sauvegarder les changements"
//                 )}
//               </Button>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="security">
//           <Card>
//             <CardHeader>
//               <CardTitle>Sécurité</CardTitle>
//               <CardDescription>Gérez vos paramètres de sécurité ici.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="currentPassword">Mot de passe actuel</Label>
//                 <Input id="currentPassword" type="password" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="newPassword">Nouveau mot de passe</Label>
//                 <Input id="newPassword" type="password" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
//                 <Input id="confirmPassword" type="password" />
//               </div>

//               <Button onClick={handleSave} disabled={isLoading}>
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Enregistrement...
//                   </>
//                 ) : (
//                   "Mettre à jour les paramètres de sécurité"
//                 )}
//               </Button>

//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="avatar">
//           <Card>
//             <CardHeader>
//               <CardTitle>Avatar</CardTitle>
//               <CardDescription>Gérez votre avatar via Gravatar.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center space-x-4">
//                 <Avatar className="h-24 w-24">
//                   <AvatarImage src={avatarUrl} />
//                   <AvatarFallback>Avatar</AvatarFallback>
//                 </Avatar>
//                 <div className="space-y-2">
//                   <Label htmlFor="avatarEmail">Email Gravatar</Label>
//                   <Input
//                     id="avatarEmail"
//                     type="email"
//                     placeholder="votre@email.com"
//                     value={avatarEmail}
//                     onChange={(e) => setAvatarEmail(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <Button
//                 onClick={() => {
//                   setIsLoading(true)
//                   setAvatarUrl(`https://www.gravatar.com/avatar/${md5(avatarEmail.trim().toLowerCase())}?s=200&d=mp`)
//                   setTimeout(() => {
//                     setIsLoading(false)

//                   }, 1000)
//                 }}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Mise à jour...
//                   </>
//                 ) : (
//                   "Mettre à jour l'avatar"
//                 )}
//               </Button>
//             </CardContent>
//           </Card>
//         </TabsContent>

//       </Tabs>
//     </motion.div>
//   )
// }

'use client';

import { motion } from 'framer-motion';
import { Camera, Loader2 } from 'lucide-react';
import md5 from 'md5';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Types
interface PersonalInfoForm {
  fullName: string;
  nickname: string;
  email: string;
  pronouns: string;
}

interface LocationForm {
  country: string;
  timezone: string;
}

interface SecurityForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface AvatarForm {
  avatarEmail: string;
}

// Composant pour prévisualiser l'avatar
const AvatarPreview = ({ email }: { email: string }) => {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (email) {
      const hash = md5(email.trim().toLowerCase());
      const url = `https://www.gravatar.com/avatar/${hash}?s=200&d=mp`;
      // Vérifier si l'avatar existe
      fetch(url).then((response) => {
        if (response.ok) {
          setAvatarUrl(url);
        } else {
          setAvatarUrl(`https://www.gravatar.com/avatar/default?s=200&d=mp`);
        }
      });
    }
  }, [email]);

  return (
    <div className="relative group">
      <Avatar className="h-24 w-24 md:h-32 md:w-32 transition-transform group-hover:scale-105">
        <AvatarImage src={avatarUrl} alt="Avatar preview" />
        <AvatarFallback>
          <Camera className="h-8 w-8 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <div className="absolute inset-0 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
        <Camera className="h-6 w-6" />
      </div>
    </div>
  );
};

export default function AccountPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Initialisation des formulaires
  const personalForm = useForm<PersonalInfoForm>({
    defaultValues: {
      fullName: '',
      nickname: '',
      email: '',
      pronouns: '',
    },
  });

  const locationForm = useForm<LocationForm>({
    defaultValues: {
      country: '',
      timezone: '',
    },
  });

  const securityForm = useForm<SecurityForm>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const avatarForm = useForm<AvatarForm>({
    defaultValues: {
      avatarEmail: '',
    },
  });

  // Handlers
  const onPersonalSubmit = async (data: PersonalInfoForm) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: 'Modifications enregistrées',
        description: 'Vos informations personnelles ont été mises à jour.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onLocationSubmit = async (data: LocationForm) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: 'Modifications enregistrées',
        description: 'Vos paramètres de localisation ont été mis à jour.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSecuritySubmit = async (data: SecurityForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: 'Modifications enregistrées',
        description: 'Vos paramètres de sécurité ont été mis à jour.',
      });
      securityForm.reset();
    } finally {
      setIsLoading(false);
    }
  };

  const onAvatarSubmit = async (data: AvatarForm) => {
    setIsLoading(true);
    try {
      const hash = md5(data.avatarEmail.trim().toLowerCase());
      await new Promise((resolve) => setTimeout(resolve, 1000));

      window.open(`https://gravatar.com/${hash}`, '_blank');

      toast({
        title: 'Email enregistré',
        description: 'Vous pouvez maintenant gérer votre avatar sur Gravatar.',
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
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Paramètres du compte</h1>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="w-full flex-wrap justify-start sm:justify-center gap-2">
          <TabsTrigger value="personal" className="flex-grow sm:flex-grow-0">
            Informations
          </TabsTrigger>
          <TabsTrigger value="location" className="flex-grow sm:flex-grow-0">
            Localisation
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-grow sm:flex-grow-0">
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="avatar" className="flex-grow sm:flex-grow-0">
            Avatar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>Mettez à jour vos informations personnelles ici.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={personalForm.handleSubmit(onPersonalSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nom complet</Label>
                    <Input
                      {...personalForm.register('fullName', { required: 'Le nom est requis' })}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nickname">Surnom</Label>
                    <Input {...personalForm.register('nickname')} className="w-full" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...personalForm.register('email', {
                        required: "L'email est requis",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Format d'email invalide",
                        },
                      })}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pronouns">Pronoms</Label>
                    <Controller
                      name="pronouns"
                      control={personalForm.control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionnez vos pronoms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="he/him">Il/Lui</SelectItem>
                            <SelectItem value="she/her">Elle/Elle</SelectItem>
                            <SelectItem value="they/them">Iel/Ellui</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      'Sauvegarder les changements'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Localisation</CardTitle>
              <CardDescription>Configurez votre pays et fuseau horaire.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={locationForm.handleSubmit(onLocationSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="country">Pays</Label>
                    <Controller
                      name="country"
                      control={locationForm.control}
                      rules={{ required: 'Le pays est requis' }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionnez votre pays" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fr">France</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="be">Belgique</SelectItem>
                            <SelectItem value="ch">Suisse</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Controller
                      name="timezone"
                      control={locationForm.control}
                      rules={{ required: 'Le fuseau horaire est requis' }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionnez votre fuseau horaire" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="europe/paris">Europe/Paris</SelectItem>
                            <SelectItem value="america/montreal">America/Montreal</SelectItem>
                            <SelectItem value="europe/brussels">Europe/Brussels</SelectItem>
                            <SelectItem value="europe/zurich">Europe/Zurich</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      'Sauvegarder les changements'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>Gérez vos paramètres de sécurité ici.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <Input
                      type="password"
                      {...securityForm.register('currentPassword', {
                        required: 'Le mot de passe actuel est requis',
                      })}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <Input
                      type="password"
                      {...securityForm.register('newPassword', {
                        required: 'Le nouveau mot de passe est requis',
                        minLength: {
                          value: 8,
                          message: 'Le mot de passe doit contenir au moins 8 caractères',
                        },
                      })}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                    <Input
                      type="password"
                      {...securityForm.register('confirmPassword', {
                        required: 'La confirmation du mot de passe est requise',
                        validate: (value) =>
                          value === securityForm.watch('newPassword') ||
                          'Les mots de passe ne correspondent pas',
                      })}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      'Mettre à jour les paramètres de sécurité'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avatar">
          <Card>
            <CardHeader>
              <CardTitle>Avatar</CardTitle>
              <CardDescription>
                Votre avatar est géré via Gravatar. Saisissez votre email pour visualiser ou
                modifier votre avatar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={avatarForm.handleSubmit(onAvatarSubmit)} className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <AvatarPreview email={avatarForm.watch('avatarEmail')} />
                  <div className="space-y-4 w-full">
                    <div className="space-y-2">
                      <Label htmlFor="avatarEmail">Email Gravatar</Label>
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        {...avatarForm.register('avatarEmail', {
                          required: "L'email est requis",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Format d'email invalide",
                          },
                        })}
                        className="w-full"
                      />
                      {avatarForm.formState.errors.avatarEmail && (
                        <p className="text-sm text-red-500">
                          {avatarForm.formState.errors.avatarEmail.message}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Votre avatar sera automatiquement mis à jour lorsque vous modifierez votre
                      image sur Gravatar.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mise à jour...
                      </>
                    ) : (
                      "Mettre à jour l'avatar"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.open('https://gravatar.com', '_blank')}
                    className="w-full sm:w-auto"
                  >
                    Visiter Gravatar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
