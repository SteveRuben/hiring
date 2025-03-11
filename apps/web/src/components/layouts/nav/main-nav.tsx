'use client';

import {
  Bell,
  Calendar,
  FileText,
  HelpCircle,
  LogOut,
  MessageSquare,
  Settings,
  User as Profil,
  Users,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { User } from '@/model';

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

// Tests disponibles dans l'application
const testsItems = [
  {
    title: 'Coding Game',
    href: '/tests/coding-game',
    description:
      'Évaluez les compétences techniques des candidats avec des défis de programmation.',
    icon: <FileText className="h-4 w-4 mr-2" />,
  },
  {
    title: 'Behavior Test',
    href: '/tests/behavior',
    description:
      'Analysez le comportement et la personnalité des candidats en situation professionnelle.',
    icon: <Users className="h-4 w-4 mr-2" />,
  },
  {
    title: 'Communication Test',
    href: '/tests/communication',
    description: 'Évaluez les compétences en communication écrite et orale des candidats.',
    icon: <MessageSquare className="h-4 w-4 mr-2" />,
  },
];

// Options de paramétrage utilisateur
const userSettings = [
  {
    title: 'Profil',
    href: '/dasboard/profile',
    description: 'Gérez vos informations personnelles et professionnelles.',
    icon: <Profil className="h-4 w-4 mr-2" />,
  },
  {
    title: 'Paramètres',
    href: '/settings',
    description: 'Configurez vos préférences et notifications.',
    icon: <Settings className="h-4 w-4 mr-2" />,
  },
  {
    title: 'Aide',
    href: '/settings/help',
    description: "Centre d'aide et documentation.",
    icon: <HelpCircle className="h-4 w-4 mr-2" />,
  },
  {
    title: 'Déconnexion',
    href: '/logout',
    description: "Se déconnecter de l'application.",
    icon: <LogOut className="h-4 w-4 mr-2" />,
  },
];

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  user?: User | null;
}

export function MainNav({ user = null, className, ...props }: MainNavProps) {
  return (
    <nav className={cn('flex items-center justify-between w-full px-4 py-2', className)} {...props}>
      <div className="flex items-center">
        {/* Logo/Nom de l'application */}
        <Link href="/" className="mr-6">
          <div className="font-bold text-xl flex items-center">
            <Users className="mr-2 h-6 w-6 text-primary" />
            <span>UseHiring</span>
          </div>
        </Link>

        {/* Menu principal */}
        <NavigationMenu>
          <NavigationMenuList>
            {/* Talents */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Talents
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[400px]">
                  <ListItem href="/talents/candidats" title="Candidats">
                    Consultez et gérez les profils des candidats en cours d'évaluation.
                  </ListItem>
                  <ListItem href="/talents/sourcing" title="Sourcing">
                    Recherchez et trouvez de nouveaux talents pour vos postes ouverts.
                  </ListItem>
                  <ListItem href="/talents/pipeline" title="Pipeline">
                    Visualisez et suivez l'avancement des candidats dans votre processus.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Réunions */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Réunions
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[400px]">
                  <ListItem href="/reunions/planifier" title="Planifier">
                    Créez et planifiez de nouvelles réunions avec les candidats.
                  </ListItem>
                  <ListItem href="/reunions/calendrier" title="Calendrier">
                    Consultez votre calendrier de réunions à venir.
                  </ListItem>
                  <ListItem href="/reunions/historique" title="Historique">
                    Accédez à l'historique de vos réunions passées.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Vidéos conférence */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center">
                <Video className="h-4 w-4 mr-2" />
                Vidéos conférence
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[400px]">
                  <ListItem href="/conferences/creer" title="Créer">
                    Lancez une nouvelle vidéoconférence ou planifiez-en une.
                  </ListItem>
                  <ListItem href="/conferences/rejoindre" title="Rejoindre">
                    Rejoignez une vidéoconférence en cours avec un code.
                  </ListItem>
                  <ListItem href="/conferences/enregistrements" title="Enregistrements">
                    Accédez aux enregistrements de vos conférences passées.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Tests */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Tests
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {testsItems.map((test) => (
                    <ListItem key={test.title} title={test.title} href={test.href}>
                      <div className="flex items-center">
                        {test.icon}
                        <span>{test.description}</span>
                      </div>
                    </ListItem>
                  ))}
                  <ListItem href="/tests/resultats" title="Résultats">
                    Consultez et analysez les résultats des tests passés par les candidats.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Partie droite: notifications et menu utilisateur */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <Bell className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" />
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>

        {/* Menu utilisateur */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 h-8">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Profil className="h-4 w-4 text-primary" />
                </div>
                <span className="hidden md:block">{user?.details.name}</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[300px]">
                  {userSettings.map((setting) => (
                    <li key={setting.title}>
                      <Link
                        href={setting.href}
                        className="flex items-center p-2 rounded-md hover:bg-accent"
                      >
                        {setting.icon}
                        <div>
                          <div className="font-medium">{setting.title}</div>
                          <div className="text-xs text-muted-foreground">{setting.description}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
