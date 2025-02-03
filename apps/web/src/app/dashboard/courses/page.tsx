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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  Book,
  MoreVertical,
  Pencil,
  Eye,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Types for content items
interface ContentItem {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published';
  type: 'course' | 'article';
  lastModified: string;
  thumbnail?: string;
}

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for example
  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'Introduction to React',
      description: 'Learn the basics of React and build your first application',
      status: 'published',
      type: 'course',
      lastModified: '2024-01-15',
      thumbnail: '/course-1.jpg'
    },
    {
      id: '2',
      title: 'Advanced TypeScript Patterns',
      description: 'Deep dive into TypeScript advanced features and best practices',
      status: 'draft',
      type: 'article',
      lastModified: '2024-01-20'
    },
    // Add more items as needed
  ];

  // Filter items based on search and active tab
  const filteredItems = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'courses' && item.type === 'course') ||
                      (activeTab === 'articles' && item.type === 'article') ||
                      (activeTab === 'drafts' && item.status === 'draft') ||
                      (activeTab === 'published' && item.status === 'published');
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Content Management</h1>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => window.location.href = '/dashboard/courses/editor/new'}>
              <Book className="w-4 h-4 mr-2" />
              New Course
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => window.location.href = '/dashboard/articles/editor/new'}>
              <FileText className="w-4 h-4 mr-2" />
              New Article
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search and Filter Section */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search courses and articles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card key={item.id}>
                {item.thumbnail && (
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={0}
                      height={0}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription className="mt-1.5">
                        {item.description}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
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
                      {item.type === 'course' ? 
                        <Book className="w-4 h-4 mr-1" /> : 
                        <FileText className="w-4 h-4 mr-1" />
                      }
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </div>
                    <div>
                      Last modified: {item.lastModified}
                    </div>
                  </div>
                  <div className="mt-2">
                    <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}