'use client';

import { BookOpen, Check, Clock, Code, Filter, Search, Star, Tag } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Données fictives pour les challenges
const challenges = [
  {
    id: 1,
    title: 'array-manipulation',
    difficulty: 'easy',
    acceptance: '48%',
    isCompleted: true,
    isFavorite: true,
    tags: ['Tableaux', 'Hash Table'],
    timeEstimate: '15 min',
    description:
      "Trouvez deux nombres dans un tableau qui s'additionnent pour donner une cible spécifique.",
  },
  {
    id: 2,
    title: 'array-manipulation',
    difficulty: 'medium',
    acceptance: '38%',
    isCompleted: false,
    isFavorite: false,
    tags: ['Listes chaînées', 'Math'],
    timeEstimate: '25 min',
    description: 'Additionnez deux nombres représentés par des listes chaînées.',
  },
  {
    id: 3,
    title: 'Sous-chaîne la plus longue sans répétition',
    difficulty: 'medium',
    acceptance: '33%',
    isCompleted: true,
    isFavorite: true,
    tags: ['Chaînes', 'Fenêtre glissante'],
    timeEstimate: '30 min',
    description: 'Trouvez la longueur de la plus longue sous-chaîne sans caractères répétés.',
  },
  {
    id: 4,
    title: 'Médiane de deux tableaux triés',
    difficulty: 'hard',
    acceptance: '34%',
    isCompleted: false,
    isFavorite: false,
    tags: ['Tableaux', 'Recherche binaire'],
    timeEstimate: '45 min',
    description: 'Trouvez la médiane de deux tableaux triés de taille différente.',
  },
  {
    id: 5,
    title: 'Plus longue sous-chaîne palindromique',
    difficulty: 'medium',
    acceptance: '31%',
    isCompleted: false,
    isFavorite: false,
    tags: ['Chaînes', 'Programmation dynamique'],
    timeEstimate: '35 min',
    description: 'Trouvez la plus longue sous-chaîne palindromique dans une chaîne donnée.',
  },
  {
    id: 6,
    title: 'Conversion en zigzag',
    difficulty: 'medium',
    acceptance: '41%',
    isCompleted: false,
    isFavorite: false,
    tags: ['Chaînes'],
    timeEstimate: '25 min',
    description: 'Convertissez une chaîne en motif zigzag et lisez-la ligne par ligne.',
  },
];

// Toutes les tags uniques
const allTags = Array.from(new Set(challenges.flatMap((challenge) => challenge.tags))).sort();

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filtrer les challenges
  const filteredChallenges = challenges.filter((challenge) => {
    // Filtrer par onglet
    if (activeTab === 'completed' && !challenge.isCompleted) return false;
    if (activeTab === 'todo' && challenge.isCompleted) return false;
    if (activeTab === 'favorite' && !challenge.isFavorite) return false;

    // Filtrer par recherche
    if (searchQuery && !challenge.title.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;

    // Filtrer par difficulté
    if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(challenge.difficulty))
      return false;

    // Filtrer par tags
    if (selectedTags.length > 0 && !challenge.tags.some((tag) => selectedTags.includes(tag)))
      return false;

    return true;
  });

  // Toggle difficulté
  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty]
    );
  };

  // Toggle tag
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Challenges</h1>
            <p className="text-muted-foreground mt-1">
              Améliorez vos compétences en résolvant des problèmes de programmation
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher des challenges"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Code className="h-4 w-4 mr-2 text-primary" />
                Total des challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{challenges.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Check className="h-4 w-4 mr-2 text-secondary" />
                Complétés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {challenges.filter((c) => c.isCompleted).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-accent" />À faire
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {challenges.filter((c) => !c.isCompleted).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Star className="h-4 w-4 mr-2 text-yellow-500" />
                Favoris
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {challenges.filter((c) => c.isFavorite).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {showFilters && (
          <div className="mb-6 rounded-lg border bg-card p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Difficulté</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedDifficulty.includes('easy') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleDifficulty('easy')}
                    className={
                      selectedDifficulty.includes('easy') ? 'bg-green-500 hover:bg-green-600' : ''
                    }
                  >
                    Facile
                  </Button>
                  <Button
                    variant={selectedDifficulty.includes('medium') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleDifficulty('medium')}
                    className={
                      selectedDifficulty.includes('medium')
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : ''
                    }
                  >
                    Moyen
                  </Button>
                  <Button
                    variant={selectedDifficulty.includes('hard') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleDifficulty('hard')}
                    className={
                      selectedDifficulty.includes('hard') ? 'bg-red-500 hover:bg-red-600' : ''
                    }
                  >
                    Difficile
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleTag(tag)}
                      className={selectedTags.includes(tag) ? 'bg-primary hover:bg-primary/90' : ''}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <Tabs defaultValue="all" onValueChange={setActiveTab} value={activeTab}>
            <TabsList>
              <TabsTrigger value="all" className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                Tous
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-1">
                <Check className="h-4 w-4" />
                Complétés
              </TabsTrigger>
              <TabsTrigger value="todo" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />À faire
              </TabsTrigger>
              <TabsTrigger value="favorite" className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                Favoris
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <Link key={challenge.id} href={`/dashboard/challenges/${challenge.title}`}>
              <Card className="hover-card h-full border-border hover:border-primary/50 transition-all">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                        {challenge.id}
                      </div>
                      {challenge.isCompleted && (
                        <div className="rounded-full bg-green-100 p-1">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                      )}
                      {challenge.isFavorite && (
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                    <Badge
                      className={
                        challenge.difficulty === 'easy'
                          ? 'badge-easy'
                          : challenge.difficulty === 'medium'
                            ? 'badge-medium'
                            : 'badge-hard'
                      }
                    >
                      {challenge.difficulty === 'easy'
                        ? 'Facile'
                        : challenge.difficulty === 'medium'
                          ? 'Moyen'
                          : 'Difficile'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {challenge.tags.map((tag) => (
                      <div
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {challenge.timeEstimate}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Taux d'acceptation: {challenge.acceptance}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="mt-8 rounded-lg border bg-card p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Aucun challenge trouvé</h3>
            <p className="text-muted-foreground">
              Aucun challenge ne correspond à vos critères de recherche.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
