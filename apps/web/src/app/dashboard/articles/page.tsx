"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  FileText,
  MoreVertical,
  Pencil,
  Eye,
  Trash2,
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published';
  lastModified: string;
  author: string;
}

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for example
  const articles: Article[] = [
    {
      id: '1',
      title: 'Getting Started with Next.js 13',
      description: 'Learn how to build modern web applications with Next.js 13',
      status: 'published',
      lastModified: '2024-01-15',
      author: 'John Doe'
    },
    {
      id: '2',
      title: 'Understanding TypeScript Generics',
      description: 'A deep dive into TypeScript generics and their practical applications',
      status: 'draft',
      lastModified: '2024-01-20',
      author: 'Jane Smith'
    },
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Button onClick={() => window.location.href = '/dashboard/articles/editor/new'}>
          <Plus className="w-4 h-4 mr-2" />
          New Article
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search articles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription className="mt-1.5">
                    {article.description}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => window.location.href = `/dashboard/articles/editor/${article.id}`}>
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  By {article.author}
                </div>
                <div>
                  Last modified: {article.lastModified}
                </div>
              </div>
              <div className="mt-2">
                <span className={`text-sm px-2.5 py-0.5 rounded-full ${
                  article.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {article.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}