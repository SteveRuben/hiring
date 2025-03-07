'use client';

import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Check, Clock, MoreHorizontal, Shield, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  dateAdded: Date;
  isCurrentUser: boolean;
}

interface TeamMembersListProps {
  members: TeamMember[];
  onRemoveMember: (id: string) => void;
  onChangeRole: (id: string, role: string) => void;
}

export function TeamMembersList({ members, onRemoveMember, onChangeRole }: TeamMembersListProps) {
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);

  const handleRemove = () => {
    if (memberToRemove) {
      onRemoveMember(memberToRemove);
      setMemberToRemove(null);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'Manager':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Member':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin':
        return <Shield className="h-3 w-3 mr-1" />;
      case 'Manager':
        return <Check className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Membres de l'équipe ({members.length})</h3>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-medium text-muted-foreground">
          <div className="col-span-5">Membre</div>
          <div className="col-span-3">Date d'ajout</div>
          <div className="col-span-3">Rôle</div>
          <div className="col-span-1"></div>
        </div>

        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="grid grid-cols-12 gap-4 p-4 items-center border-t"
          >
            <div className="col-span-5 flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium flex items-center">
                  {member.name}
                  {member.isCurrentUser && (
                    <Badge
                      variant="outline"
                      className="ml-2 text-xs bg-purple-100 text-purple-800 border-purple-200"
                    >
                      VOUS
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{member.email}</div>
              </div>
            </div>
            <div className="col-span-3 text-sm text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
              {formatDistanceToNow(member.dateAdded, { addSuffix: true, locale: fr })}
            </div>
            <div className="col-span-3">
              <Badge
                variant="outline"
                className={`${getRoleBadgeColor(member.role)} flex w-fit items-center`}
              >
                {getRoleIcon(member.role)}
                {member.role}
              </Badge>
            </div>
            <div className="col-span-1 flex justify-end">
              {!member.isCurrentUser && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onChangeRole(member.id, 'Admin')}>
                      Définir comme Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onChangeRole(member.id, 'Manager')}>
                      Définir comme Manager
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onChangeRole(member.id, 'Member')}>
                      Définir comme Membre
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => setMemberToRemove(member.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AlertDialog
        open={!!memberToRemove}
        onOpenChange={(open) => !open && setMemberToRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce membre ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Ce membre sera définitivement supprimé de votre
              équipe.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
