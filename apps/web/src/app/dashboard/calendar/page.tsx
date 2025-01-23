"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, VideoIcon, Code } from "lucide-react";

interface Session {
  id: string;
  title: string;
  type: 'video' | 'coding' | 'quiz';
  startTime: Date;
  endTime: Date;
  participants: string[];
  status: 'upcoming' | 'completed' | 'cancelled';
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');

  // Mock data for sessions
  const sessions: Session[] = [
    {
      id: '1',
      title: 'React Fundamentals',
      type: 'video',
      startTime: new Date('2024-01-25T10:00:00'),
      endTime: new Date('2024-01-25T11:30:00'),
      participants: ['John Doe', 'Jane Smith'],
      status: 'upcoming'
    },
    // Add more sessions...
  ];

  const getSessionsForDate = (date: Date) => {
    return sessions.filter(session => {
      const sessionDate = new Date(session.startTime);
      return sessionDate.toDateString() === date.toDateString();
    });
  };

  const currentSessions = getSessionsForDate(date);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Select value={view} onValueChange={(v: 'day' | 'week' | 'month') => setView(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day View</SelectItem>
            <SelectItem value="week">Week View</SelectItem>
            <SelectItem value="month">Month View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Sessions for selected date */}
        <Card>
          <CardHeader>
            <CardTitle>Sessions</CardTitle>
            <CardDescription>
              {date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentSessions.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  No sessions scheduled for this date
                </p>
              ) : (
                currentSessions.map((session) => (
                  <Card key={session.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{session.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Clock className="h-4 w-4" />
                            {new Date(session.startTime).toLocaleTimeString()} - 
                            {new Date(session.endTime).toLocaleTimeString()}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Users className="h-4 w-4" />
                            {session.participants.length} participants
                          </div>
                        </div>
                        <Badge
                          variant={
                            session.status === 'upcoming' ? 'default' :
                            session.status === 'completed' ? 'secondary' : 'destructive'
                          }
                        >
                          {session.status}
                        </Badge>
                      </div>
                      {/* Session type icon */}
                      <div className="mt-2">
                        {session.type === 'video' && <VideoIcon className="h-4 w-4" />}
                        {session.type === 'coding' && <Code className="h-4 w-4" />}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}