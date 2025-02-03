// apps/web/src/app/dashboard/expert/performance/page.tsx
'use client';

import { Calendar, Clock, Download, Star, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/date-range-picker'; // Nous devrons créer ce composant
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Ajout de nouvelles données statistiques
const performanceStats = [
  {
    title: 'Completion Rate',
    value: '95%',
    trend: '+2.5%',
    trendUp: true,
    description: 'Sessions completed successfully',
  },
  {
    title: 'Student Retention',
    value: '85%',
    trend: '+4.5%',
    trendUp: true,
    description: 'Students returning for more sessions',
  },
  {
    title: 'Average Session Length',
    value: '58min',
    trend: '+3min',
    trendUp: true,
    description: 'Time spent per session',
  },
  {
    title: 'Student Satisfaction',
    value: '4.8/5',
    trend: '+0.3',
    trendUp: true,
    description: 'Based on post-session surveys',
  },
];

// ... Données existantes (sessionData, ratingData, etc.)

export default function PerformancePage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });
  const [timeframe, setTimeframe] = useState('6m');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Performance Analytics</h2>
          <p className="text-muted-foreground">
            Track your teaching metrics and student engagement
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Select defaultValue={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                <span
                  className={`flex items-center ${
                    stat.trendUp ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {stat.trendUp ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {stat.trend}
                </span>
                <span className="ml-2 text-muted-foreground">vs last period</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ... Reste du code avec Tabs et graphiques ... */}

      {/* Nouvelle section pour les prévisions */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Forecast</CardTitle>
          <CardDescription>Projected metrics based on current trends</CardDescription>
        </CardHeader>
        <CardContent>{/* Ajouter graphique de prévision */}</CardContent>
      </Card>

      {/* Section Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Suggestions to improve your performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Liste de recommandations basées sur les métriques */}
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <h4 className="font-medium">Increase Session Frequency</h4>
                <p className="text-sm text-muted-foreground">
                  Your high satisfaction rates suggest you could handle more sessions. Consider
                  increasing your availability by 20%.
                </p>
              </div>
            </div>
            {/* ... Plus de recommandations ... */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
