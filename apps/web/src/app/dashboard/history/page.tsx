// apps/web/src/app/dashboard/history/page.tsx
'use client';

import { Calendar, Clock, Download, Search } from 'lucide-react';
import { useState } from 'react';

import { SessionDetailsDialog } from '@/components/sessions/session-details-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for sessions
const pastSessions = [
  {
    id: 1,
    title: 'React Advanced Patterns',
    type: 'CODE',
    date: '2024-01-15',
    duration: '60 min',
    student: 'John Doe',
    rating: 4.8,
    status: 'completed',
    recording: true,
  },
  {
    id: 2,
    title: 'UI/UX Workshop',
    type: 'DESIGN',
    date: '2024-01-14',
    duration: '90 min',
    student: 'Alice Smith',
    rating: 4.5,
    status: 'completed',
    recording: false,
  },
  {
    id: 3,
    title: 'TypeScript Fundamentals',
    type: 'CODE',
    date: '2024-01-13',
    duration: '45 min',
    student: 'Bob Wilson',
    rating: 5.0,
    status: 'completed',
    recording: true,
  },
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSession, setSelectedSession] = useState<any | null>(null);

  const filteredSessions = pastSessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || session.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Session History</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export History
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search sessions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="CODE">Code Sessions</SelectItem>
              <SelectItem value="DESIGN">Design Sessions</SelectItem>
              <SelectItem value="VIDEO_CALL">Video Calls</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Sessions List */}
      <div className="grid gap-4">
        {filteredSessions.map((session) => (
          <Card
            key={session.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedSession(session)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">{session.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(session.date).toLocaleDateString()}
                    <Clock className="h-4 w-4 ml-2" />
                    {session.duration}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{session.student}</p>
                    <div className="flex items-center text-yellow-500">
                      {'★'.repeat(Math.floor(session.rating))}
                      <span className="ml-1 text-sm text-muted-foreground">({session.rating})</span>
                    </div>
                  </div>
                  <Badge variant="outline">{session.type}</Badge>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2">
                  {session.recording && (
                    <Button variant="outline" size="sm">
                      View Recording
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Notes
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  Schedule Similar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredSessions.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            No sessions found matching your criteria
          </div>
        )}
      </div>
      <SessionDetailsDialog
        session={selectedSession}
        open={!!selectedSession}
        onOpenChange={(open) => !open && setSelectedSession(null)}
      />
    </div>
  );
}
