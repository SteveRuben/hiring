'use client';

import { FileText, Mail, MoreVertical, Search, UserCheck, UserX } from 'lucide-react';
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

// Types pour les candidatures
interface TalentApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  experienceYears: string;
  primaryExpertise: string;
  skills: string[];
  bio: string;
  cvFile?: string;
  status: 'PENDING' | 'REVIEWING' | 'APPROVED' | 'REJECTED' | 'HIRED';
  createdAt: string;
}

export default function TalentsDashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Exemple de données (à remplacer par des données réelles de l'API)
  const talents: TalentApplication[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      experienceYears: '4-6',
      primaryExpertise: 'frontend',
      skills: ['React', 'TypeScript', 'Next.js'],
      bio: 'Experienced frontend developer...',
      status: 'PENDING',
      createdAt: '2024-01-15',
    },
    // Ajouter plus de talents...
  ];

  // Filtrer les talents
  const filteredTalents = talents.filter((talent) => {
    const matchesSearch =
      talent.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesExpertise =
      expertiseFilter === 'all' || talent.primaryExpertise === expertiseFilter;
    const matchesStatus = statusFilter === 'all' || talent.status === statusFilter;

    return matchesSearch && matchesExpertise && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      REVIEWING: 'bg-blue-100 text-blue-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      HIRED: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Talent Applications</h1>
          <p className="text-muted-foreground mt-1">Review and manage talent applications</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search talents..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by expertise" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Expertise</SelectItem>
            <SelectItem value="frontend">Frontend Development</SelectItem>
            <SelectItem value="backend">Backend Development</SelectItem>
            <SelectItem value="fullstack">Full Stack Development</SelectItem>
            <SelectItem value="mobile">Mobile Development</SelectItem>
            <SelectItem value="devops">DevOps</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="REVIEWING">Reviewing</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
            <SelectItem value="HIRED">Hired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Talents Grid */}
      <div className="grid gap-6">
        {filteredTalents.map((talent) => (
          <Card key={talent.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {talent.firstName} {talent.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{talent.email}</p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <UserX className="h-4 w-4 mr-2" />
                      Reject
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <Badge className={getStatusColor(talent.status)}>{talent.status}</Badge>
                  <Badge variant="outline" className="ml-2">
                    {talent.experienceYears} years
                  </Badge>
                  <Badge variant="outline" className="ml-2">
                    {talent.primaryExpertise}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  {talent.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{talent.bio}</p>

                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Applied on: {new Date(talent.createdAt).toLocaleDateString()}</span>
                  {talent.cvFile && (
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View CV
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
