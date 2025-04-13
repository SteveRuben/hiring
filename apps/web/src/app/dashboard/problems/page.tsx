'use client';

import { Check, ChevronDown, Filter, Search, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Données fictives pour les problèmes
const problems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'easy',
    acceptance: '48%',
    isPremium: false,
    isCompleted: true,
    isFavorite: true,
    tags: ['Array', 'Hash Table'],
  },
  {
    id: 2,
    title: 'Add Two Numbers',
    difficulty: 'medium',
    acceptance: '38%',
    isPremium: false,
    isCompleted: false,
    isFavorite: false,
    tags: ['Linked List', 'Math'],
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'medium',
    acceptance: '33%',
    isPremium: false,
    isCompleted: true,
    isFavorite: true,
    tags: ['String', 'Sliding Window'],
  },
  {
    id: 4,
    title: 'Median of Two Sorted Arrays',
    difficulty: 'hard',
    acceptance: '34%',
    isPremium: false,
    isCompleted: false,
    isFavorite: false,
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
  },
  {
    id: 5,
    title: 'Longest Palindromic Substring',
    difficulty: 'medium',
    acceptance: '31%',
    isPremium: false,
    isCompleted: false,
    isFavorite: false,
    tags: ['String', 'Dynamic Programming'],
  },
  {
    id: 6,
    title: 'Zigzag Conversion',
    difficulty: 'medium',
    acceptance: '41%',
    isPremium: false,
    isCompleted: false,
    isFavorite: false,
    tags: ['String'],
  },
  {
    id: 7,
    title: 'Reverse Integer',
    difficulty: 'medium',
    acceptance: '26%',
    isPremium: false,
    isCompleted: false,
    isFavorite: false,
    tags: ['Math'],
  },
  {
    id: 8,
    title: 'String to Integer (atoi)',
    difficulty: 'medium',
    acceptance: '16%',
    isPremium: true,
    isCompleted: false,
    isFavorite: false,
    tags: ['String', 'Math'],
  },
  {
    id: 9,
    title: 'Palindrome Number',
    difficulty: 'easy',
    acceptance: '52%',
    isPremium: false,
    isCompleted: true,
    isFavorite: false,
    tags: ['Math'],
  },
  {
    id: 10,
    title: 'Regular Expression Matching',
    difficulty: 'hard',
    acceptance: '28%',
    isPremium: true,
    isCompleted: false,
    isFavorite: false,
    tags: ['String', 'Dynamic Programming', 'Backtracking'],
  },
  {
    id: 11,
    title: 'Container With Most Water',
    difficulty: 'medium',
    acceptance: '54%',
    isPremium: false,
    isCompleted: false,
    isFavorite: true,
    tags: ['Array', 'Two Pointers', 'Greedy'],
  },
  {
    id: 12,
    title: 'Integer to Roman',
    difficulty: 'medium',
    acceptance: '59%',
    isPremium: false,
    isCompleted: false,
    isFavorite: false,
    tags: ['Math', 'String'],
  },
  {
    id: 13,
    title: 'Roman to Integer',
    difficulty: 'easy',
    acceptance: '57%',
    isPremium: false,
    isCompleted: true,
    isFavorite: false,
    tags: ['Math', 'String'],
  },
  {
    id: 14,
    title: 'Longest Common Prefix',
    difficulty: 'easy',
    acceptance: '39%',
    isPremium: false,
    isCompleted: true,
    isFavorite: false,
    tags: ['String'],
  },
  {
    id: 15,
    title: '3Sum',
    difficulty: 'medium',
    acceptance: '31%',
    isPremium: false,
    isCompleted: false,
    isFavorite: true,
    tags: ['Array', 'Two Pointers', 'Sorting'],
  },
];

// Toutes les tags uniques
const allTags = Array.from(new Set(problems.flatMap((problem) => problem.tags))).sort();

export default function ProblemsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filtrer les problèmes
  const filteredProblems = problems.filter((problem) => {
    // Filtrer par onglet
    if (activeTab === 'completed' && !problem.isCompleted) return false;
    if (activeTab === 'todo' && problem.isCompleted) return false;
    if (activeTab === 'favorite' && !problem.isFavorite) return false;

    // Filtrer par recherche
    if (searchQuery && !problem.title.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;

    // Filtrer par difficulté
    if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(problem.difficulty))
      return false;

    // Filtrer par tags
    if (selectedTags.length > 0 && !problem.tags.some((tag) => selectedTags.includes(tag)))
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
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-[#f9fafb] dark:bg-[#111111]">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-2xl font-bold text-[#1a1a1a] dark:text-white">Problems</h1>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717a] dark:text-[#a1a1aa]" />
                <input
                  type="text"
                  placeholder="Search problems"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 pl-10 pr-4 text-sm text-[#1a1a1a] placeholder-[#71717a] focus:border-[#2cbb5d] focus:outline-none dark:border-[#3e3e3e] dark:bg-[#1a1a1a] dark:text-white dark:placeholder-[#a1a1aa] dark:focus:border-[#3ccb6d]"
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
                Filters
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mb-6 rounded-lg border border-[#e0e0e0] bg-white p-4 dark:border-[#3e3e3e] dark:bg-[#1a1a1a]">
              <div className="mb-4">
                <h3 className="mb-2 font-medium text-[#1a1a1a] dark:text-white">Difficulty</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedDifficulty.includes('easy') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleDifficulty('easy')}
                    className={
                      selectedDifficulty.includes('easy')
                        ? ''
                        : 'border-[#e0e0e0] dark:border-[#3e3e3e]'
                    }
                  >
                    Easy
                  </Button>
                  <Button
                    variant={selectedDifficulty.includes('medium') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleDifficulty('medium')}
                    className={
                      selectedDifficulty.includes('medium')
                        ? ''
                        : 'border-[#e0e0e0] dark:border-[#3e3e3e]'
                    }
                  >
                    Medium
                  </Button>
                  <Button
                    variant={selectedDifficulty.includes('hard') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleDifficulty('hard')}
                    className={
                      selectedDifficulty.includes('hard')
                        ? ''
                        : 'border-[#e0e0e0] dark:border-[#3e3e3e]'
                    }
                  >
                    Hard
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium text-[#1a1a1a] dark:text-white">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleTag(tag)}
                      className={
                        selectedTags.includes(tag) ? '' : 'border-[#e0e0e0] dark:border-[#3e3e3e]'
                      }
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <Tabs defaultValue="all" onValueChange={setActiveTab} value={activeTab}>
              <TabsList>
                <TabsTrigger value="all">All Problems</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="todo">To Do</TabsTrigger>
                <TabsTrigger value="favorite">Favorites</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="rounded-lg border border-[#e0e0e0] bg-white dark:border-[#3e3e3e] dark:bg-[#1a1a1a]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e0e0e0] text-left dark:border-[#3e3e3e]">
                    <th className="px-6 py-3 text-sm font-medium text-[#71717a] dark:text-[#a1a1aa]">
                      Status
                    </th>
                    <th className="px-6 py-3 text-sm font-medium text-[#71717a] dark:text-[#a1a1aa]">
                      Title
                    </th>
                    <th className="px-6 py-3 text-sm font-medium text-[#71717a] dark:text-[#a1a1aa]">
                      Difficulty
                    </th>
                    <th className="px-6 py-3 text-sm font-medium text-[#71717a] dark:text-[#a1a1aa]">
                      Acceptance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProblems.map((problem) => (
                    <tr
                      key={problem.id}
                      className="border-b border-[#e0e0e0] hover:bg-[#f9fafb] dark:border-[#3e3e3e] dark:hover:bg-[#2a2a2a]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {problem.isCompleted ? (
                            <div className="rounded-full bg-[#e6f7ef] p-1 dark:bg-[#1a3329]">
                              <Check className="h-4 w-4 text-[#2cbb5d] dark:text-[#3ccb6d]" />
                            </div>
                          ) : (
                            <div className="h-6 w-6"></div>
                          )}
                          {problem.isFavorite && (
                            <Star className="h-4 w-4 fill-[#faad14] text-[#faad14]" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={'/dashboard/challenges'}
                          className="flex items-center gap-2 font-medium text-[#1a1a1a] hover:text-[#2cbb5d] dark:text-white dark:hover:text-[#3ccb6d]"
                        >
                          {problem.id}. {problem.title}
                          {problem.isPremium && (
                            <span className="rounded-full bg-[#fff7e6] px-2 py-0.5 text-xs font-medium text-[#faad14] dark:bg-[#2b2111] dark:text-[#ffc53d]">
                              Premium
                            </span>
                          )}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={problem.difficulty as 'default' | 'secondary' | 'outline'}>
                          {problem.difficulty}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-[#71717a] dark:text-[#a1a1aa]">
                          {problem.acceptance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProblems.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-[#71717a] dark:text-[#a1a1aa]">
                  No problems found matching your criteria.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-[#e0e0e0] px-6 py-4 dark:border-[#3e3e3e]">
              <div className="text-sm text-[#71717a] dark:text-[#a1a1aa]">
                Showing {filteredProblems.length} of {problems.length} problems
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
