// 'use client';

// import { motion } from 'framer-motion';
// import { Users } from 'lucide-react';
// import { useState } from 'react';

// import { InviteMemberForm } from '@/components/team/invite-member-form';
// import { TeamMembersList } from '@/components/team/team-member-list';
// import { Separator } from '@/components/ui/separator';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useToast } from '@/components/ui/use-toast';

// import { initialMembers } from '../mock/mock-param';

// export default function TeamSettings() {
//   const { toast } = useToast();
//   const [members, setMembers] = useState(initialMembers);
//   const [activeTab, setActiveTab] = useState('members');

//   const handleRemoveMember = (id: string) => {
//     setMembers(members.filter((member) => member.id !== id));
//     toast({
//       title: 'Membre supprimé',
//       description: 'Le membre a été supprimé de votre équipe avec succès.',
//     });
//   };

//   const handleChangeRole = (id: string, role: string) => {
//     setMembers(members.map((member) => (member.id === id ? { ...member, role } : member)));
//     toast({
//       title: 'Rôle mis à jour',
//       description: 'Le rôle du membre a été mis à jour avec succès.',
//     });
//   };

//   const handleInviteMember = async (name: string, email: string, role: string) => {
//     // Simuler un délai d'API
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     const newMember = {
//       id: String(members.length + 1),
//       name,
//       email,
//       role,
//       avatarUrl: `https://api.dicebear.com/6.x/avataaars/svg?seed=${name}`,
//       dateAdded: new Date(),
//       isCurrentUser: false,
//     };

//     setMembers([...members, newMember]);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <div>
//         <h3 className="text-lg font-medium">Équipe</h3>
//         <p className="text-sm text-muted-foreground">
//           Gérez les membres de votre équipe et leurs permissions.
//         </p>
//       </div>
//       <Separator />

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//         <TabsList>
//           <TabsTrigger value="members" className="flex items-center gap-2">
//             <Users className="h-4 w-4" />
//             Membres
//           </TabsTrigger>
//           <TabsTrigger value="invitations" className="flex items-center gap-2">
//             Invitations
//           </TabsTrigger>
//           <TabsTrigger value="settings" className="flex items-center gap-2">
//             Paramètres d'équipe
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="members" className="space-y-6">
//           <TeamMembersList
//             members={members}
//             onRemoveMember={handleRemoveMember}
//             onChangeRole={handleChangeRole}
//           />

//           <div className="mt-8">
//             <InviteMemberForm onInvite={handleInviteMember} />
//           </div>
//         </TabsContent>

//         <TabsContent value="invitations" className="space-y-6">
//           <div className="rounded-md border p-8 text-center">
//             <h3 className="text-lg font-medium mb-2">Aucune invitation en attente</h3>
//             <p className="text-muted-foreground">
//               Les invitations envoyées apparaîtront ici jusqu'à ce qu'elles soient acceptées ou
//               expirées.
//             </p>
//           </div>
//         </TabsContent>

//         <TabsContent value="settings" className="space-y-6">
//           <div className="rounded-md border p-8">
//             <h3 className="text-lg font-medium mb-4">Paramètres de l'équipe</h3>
//             <p className="text-muted-foreground mb-6">
//               Ici on retrouve les parametres de votre equipe.
//             </p>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </motion.div>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useState } from 'react';

import { DomainSettings } from '@/components/settings/DomainSettings';
import { TeamSettingsForm } from '@/components/settings/TeamSettingsForm';
import { InviteMemberForm } from '@/components/team/invite-member-form';
import { TeamMembersList } from '@/components/team/team-member-list';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

import { initialMembers } from '../mock/mock-param';

export default function TeamSettings() {
  const { toast } = useToast();
  const [members, setMembers] = useState(initialMembers);
  const [activeTab, setActiveTab] = useState('members');

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id));
    toast({
      title: 'Membre supprimé',
      description: 'Le membre a été supprimé de votre équipe avec succès.',
    });
  };

  const handleChangeRole = (id: string, role: string) => {
    setMembers(members.map((member) => (member.id === id ? { ...member, role } : member)));
    toast({
      title: 'Rôle mis à jour',
      description: 'Le rôle du membre a été mis à jour avec succès.',
    });
  };

  const handleInviteMember = async (name: string, email: string, role: string) => {
    // Simuler un délai d'API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newMember = {
      id: String(members.length + 1),
      name,
      email,
      role,
      avatarUrl: `https://api.dicebear.com/6.x/avataaars/svg?seed=${name}`,
      dateAdded: new Date(),
      isCurrentUser: false,
    };

    setMembers([...members, newMember]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-medium">Équipe</h3>
        <p className="text-sm text-muted-foreground">
          Gérez les membres de votre équipe et leurs permissions.
        </p>
      </div>
      <Separator />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Membres
          </TabsTrigger>
          <TabsTrigger value="invitations" className="flex items-center gap-2">
            Invitations
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            Paramètres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          <TeamMembersList
            members={members}
            onRemoveMember={handleRemoveMember}
            onChangeRole={handleChangeRole}
          />

          <div className="mt-8">
            <InviteMemberForm onInvite={handleInviteMember} />
          </div>
        </TabsContent>

        <TabsContent value="invitations" className="space-y-6">
          <div className="rounded-md border p-8 text-center">
            <h3 className="text-lg font-medium mb-2">Aucune invitation en attente</h3>
            <p className="text-muted-foreground">
              Les invitations envoyées apparaîtront ici jusqu'à ce qu'elles soient acceptées ou
              expirées.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="domains">Domaines</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <TeamSettingsForm teamId="1" />
            </TabsContent>

            <TabsContent value="domains" className="space-y-4">
              <DomainSettings teamId="1" />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
