import {
  BookOpen,
  Calendar,
  Clock,
  Code,
  Coffee,
  FileCode,
  GraduationCap,
  Layout,
  Lightbulb,
  Newspaper,
  PartyPopper,
  PlusCircle,
  Presentation,
  Terminal,
  UserCheck,
  UserPlus,
  Users,
  Users2,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const contentTypes = {
    learning: [
      {
        value: 'codingGame',
        title: 'Coding Game',
        description: 'Créez des défis de programmation interactifs.',
        icon: Code,
      },
      {
        value: 'article',
        title: 'Article Technique',
        description: 'Partagez vos connaissances à travers des articles détaillés.',
        icon: Newspaper,
      },
      {
        value: 'tutorial',
        title: 'Tutoriel Code',
        description: 'Créez des tutoriels pas à pas pour apprendre à coder.',
        icon: Terminal,
      },
    ],
    meetings: [
      {
        value: 'blank',
        title: 'Session personnalisée',
        description: 'Une salle vide pour vos besoins personnalisés.',
        icon: Layout,
      },
      {
        value: 'daily',
        title: 'Daily Stand-Up',
        description: 'Identifiez et résolvez les obstacles quotidiens.',
        icon: Clock,
      },
      {
        value: 'weekly',
        title: 'Weekly Sync-Up',
        description: "Suivez la progression de l'équipe.",
        icon: Calendar,
      },
      {
        value: 'allHands',
        title: 'All-Hands Meeting',
        description: 'Gardez tout le monde aligné sur les objectifs.',
        icon: Presentation,
      },
      {
        value: 'oneOnOne',
        title: 'One-on-One',
        description: 'Construisez une relation dans un espace confortable.',
        icon: Users,
      },
      {
        value: 'retrospective',
        title: "Rétrospective d'équipe",
        description: 'Évaluez les objectifs et réfléchissez aux obstacles.',
        icon: Users2,
      },
      {
        value: 'happyHour',
        title: 'Happy Hour',
        description: "Développez la confiance et les liens avec l'équipe.",
        icon: PartyPopper,
      },
      {
        value: 'brainstorm',
        title: 'Brainstorm',
        description: 'Générez des idées en groupe pour résoudre des problèmes.',
        icon: Lightbulb,
      },
      {
        value: 'interview',
        title: 'Entretien à distance',
        description: 'Trouvez les meilleurs talents pour votre équipe.',
        icon: UserCheck,
      },
    ],
  };

  const renderSection = (title: string, items: typeof contentTypes.learning) => (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((type) => {
          const Icon = type.icon;
          return (
            <Card key={type.value} className="hover:bg-accent/50 transition-colors cursor-pointer">
              <Link href={`/dashboard/tutoriel-code`}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Icon className="h-6 w-6 text-primary" />
                    <CardTitle>{type.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{type.description}</p>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Créer une session</h2>
        <Button asChild>
          <Link href="/sessions/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Créer une session
          </Link>
        </Button>
      </div>

      {renderSection("Contenu d'apprentissage", contentTypes.learning)}
      {renderSection('Types de réunions', contentTypes.meetings)}
    </div>
  );
}
