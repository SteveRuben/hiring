'use client';

import {
  ArrowUpRight,
  Clock,
  Code2,
  MoreVertical,
  Plus,
  Search,
  Star,
  Trophy,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  language: string;
  attempts: number;
  successRate: number;
  estimatedTime: string;
  points: number;
}

export default function CodingGamesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock data for coding challenges
  const challenges: CodingChallenge[] = [
    {
      id: '1',
      title: 'Array Manipulation',
      description: 'Implement various array manipulation functions',
      difficulty: 'beginner',
      category: 'Algorithms',
      language: 'JavaScript',
      attempts: 1200,
      successRate: 78,
      estimatedTime: '30 mins',
      points: 100,
    },
    {
      id: '2',
      title: 'Binary Tree Traversal',
      description: 'Implement different tree traversal methods',
      difficulty: 'intermediate',
      category: 'Data Structures',
      language: 'Python',
      attempts: 800,
      successRate: 65,
      estimatedTime: '45 mins',
      points: 200,
    },
    {
      id: '3',
      title: 'Dynamic Programming Challenge',
      description: 'Solve optimization problems using dynamic programming',
      difficulty: 'advanced',
      category: 'Algorithms',
      language: 'Java',
      attempts: 500,
      successRate: 45,
      estimatedTime: '60 mins',
      points: 300,
    },
  ];

  // Filter challenges based on search and filters
  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === 'all' || challenge.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === 'all' || challenge.category === categoryFilter;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Coding Games</h1>
          <p className="text-muted-foreground mt-1">
            Improve your coding skills with interactive challenges
          </p>
        </div>

        <Button onClick={() => (window.location.href = '/dashboard/coding-games/create')}>
          <Plus className="w-4 h-4 mr-2" />
          Create Challenge
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search challenges..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Algorithms">Algorithms</SelectItem>
            <SelectItem value="Data Structures">Data Structures</SelectItem>
            <SelectItem value="Web Development">Web Development</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Challenges Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredChallenges.map((challenge) => (
          <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-blue-500" />
                    {challenge.title}
                  </CardTitle>
                  <CardDescription className="mt-1.5">{challenge.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Challenge</DropdownMenuItem>
                    <DropdownMenuItem>View Solutions</DropdownMenuItem>
                    <DropdownMenuItem>Clone Challenge</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Challenge Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {challenge.attempts} attempts
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    {challenge.successRate}% success
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {challenge.points} points
                  </div>
                </div>

                {/* Challenge Info */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                  <Badge variant="outline">{challenge.category}</Badge>
                  <Badge variant="outline">{challenge.language}</Badge>
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    {challenge.estimatedTime}
                  </Badge>
                </div>

                {/* Start Button */}
                <Button
                  className="w-full mt-4"
                  onClick={() => (window.location.href = `/dashboard/coding-games/${challenge.id}`)}
                >
                  Start Challenge
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
