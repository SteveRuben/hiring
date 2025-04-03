'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  BarChart2,
  Bell,
  BookOpen,
  Calendar,
  CheckSquare,
  Clock,
  Download,
  FileText,
  Filter,
  Flag,
  HelpCircle,
  LogOut,
  Menu,
  MessageSquare,
  Mic,
  Pause,
  Play,
  Plus,
  Search,
  Settings,
  Share2,
  Shield,
  Star,
  ThumbsUp,
  User,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasNewAlert, setHasNewAlert] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const upcomingInterviews = [
    { id: 1, name: 'Marie Dubois', position: 'UX Designer', time: '10:30', date: "Aujourd'hui" },
    {
      id: 2,
      name: 'Thomas Bernard',
      position: 'Full Stack Developer',
      time: '14:00',
      date: "Aujourd'hui",
    },
    { id: 3, name: 'Sarah Martin', position: 'Product Manager', time: '11:15', date: 'Demain' },
  ];

  const recentInterviews = [
    {
      id: 1,
      candidate: 'Julie Moreau',
      position: 'Front-end Developer',
      date: 'Hier',
      duration: '45 min',
      rating: 4.5,
      feedback: 'Excellentes compétences techniques, bonne communication',
      status: 'Shortlisted',
    },
    {
      id: 2,
      candidate: 'Nicolas Petit',
      position: 'Data Scientist',
      date: '23/04/2023',
      duration: '38 min',
      rating: 3.8,
      feedback: 'Bonnes connaissances techniques, communication à améliorer',
      status: 'En attente',
    },
    {
      id: 3,
      candidate: 'Anne Lefevre',
      position: 'Marketing Manager',
      date: '20/04/2023',
      duration: '52 min',
      rating: 4.2,
      feedback: 'Très bonne expérience, bonne adéquation culturelle',
      status: 'Shortlisted',
    },
  ];

  const performanceData = {
    overallScore: 86,
    metrics: [
      { name: 'Qualité des questions', score: 92 },
      { name: 'Écoute active', score: 88 },
      { name: 'Réduction des biais', score: 78 },
      { name: "Structure d'entretien", score: 85 },
    ],
    recentAlerts: [
      "Vous avez interrompu le candidat 8 fois pendant l'entretien",
      'Une faible diversité dans vos questions de follow-up a été détectée',
      'Considérez de laisser plus de temps aux candidats pour répondre',
    ],
  };

  const suggestedQuestions = [
    "Pouvez-vous me parler d'un défi technique que vous avez résolu récemment?",
    'Comment gérez-vous les retours critiques sur votre travail?',
    'Décrivez une situation où vous avez dû collaborer avec une équipe multidisciplinaire',
    "Quelles sont vos attentes concernant la culture d'entreprise?",
    'Comment vous tenez-vous informé des dernières tendances dans votre domaine?',
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
            className="w-64 border-r bg-card fixed inset-y-0 z-20 h-full flex flex-col"
          >
            <div className="p-4 border-b flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">UseHiring</span>
            </div>

            <div className="flex-1 py-2 overflow-auto">
              <nav className="px-2 space-y-1">
                {[
                  { name: 'Tableau de bord', icon: <BarChart2 className="w-5 h-5" /> },
                  { name: 'Entretiens', icon: <Mic className="w-5 h-5" />, active: true },
                  { name: 'Candidats', icon: <User className="w-5 h-5" /> },
                  { name: 'Calendrier', icon: <Calendar className="w-5 h-5" /> },
                  { name: 'Formation', icon: <BookOpen className="w-5 h-5" /> },
                  { name: 'Analyse', icon: <BarChart2 className="w-5 h-5" /> },
                  { name: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
                ].map((item) => (
                  <motion.button
                    key={item.name}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(var(--primary), 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                      item.active
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="border-t p-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src="https://api.dicebear.com/6.x/avataaars/svg?seed=Felix"
                    alt="Avatar"
                  />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Jean Dupont</div>
                  <div className="text-xs text-muted-foreground">Recruteur IT</div>
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </Button>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        className={`flex flex-col flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 overflow-hidden`}
      >
        {/* Header */}
        <header className="border-b bg-card h-16 flex items-center justify-between px-4 sticky top-0 z-10">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <Menu className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <div className="ml-4 text-xl font-semibold">Espace Recruteur</div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setHasNewAlert(false)}
            >
              <Bell className="h-5 w-5" />
              {hasNewAlert && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive"
                />
              )}
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src="https://api.dicebear.com/6.x/avataaars/svg?seed=Felix"
                      alt="Avatar"
                    />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Search overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm z-30 flex items-start justify-center pt-20"
            >
              <div className="w-full max-w-2xl mx-auto px-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher des candidats, entretiens, notes..."
                    className="w-full h-12 pl-10 pr-4 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="mt-4 bg-card rounded-md p-4 shadow-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Recherches récentes
                  </div>
                  <div className="space-y-2">
                    {[
                      'Développeurs Frontend',
                      'Entretiens cette semaine',
                      'Candidats shortlistés',
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer"
                      >
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{item}</span>
                        </div>
                        <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-accent/20">
          <div className="container mx-auto p-6 space-y-6">
            {/* Welcome banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary/80 to-primary rounded-xl text-white p-6 shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">Bienvenue, Jean!</h1>
                  <p className="mt-1 text-white/80">Vous avez 3 entretiens planifiés aujourd'hui</p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-white text-primary hover:bg-white/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Nouvel entretien
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Dashboard content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Upcoming interviews */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:col-span-1"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Entretiens à venir</span>
                      <Button variant="ghost" size="icon">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                    <CardDescription>Vos prochains rendez-vous</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingInterviews.map((interview, index) => (
                        <motion.div
                          key={interview.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center p-3 rounded-lg border bg-card/50 hover:bg-card cursor-pointer"
                        >
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage
                              src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${interview.name}`}
                              alt={interview.name}
                            />
                            <AvatarFallback>
                              {interview.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{interview.name}</div>
                            <div className="text-sm text-muted-foreground truncate">
                              {interview.position}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{interview.time}</div>
                            <div className="text-sm text-muted-foreground">{interview.date}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full" size="sm">
                      Voir tous les entretiens
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Performance metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Performances d'entretien</CardTitle>
                    <CardDescription>Vos métriques des 30 derniers jours</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Score global</p>
                        <div className="flex items-end space-x-2">
                          <span className="text-3xl font-bold">{performanceData.overallScore}</span>
                          <span className="text-sm text-green-600 font-medium pb-1">+4%</span>
                        </div>
                      </div>

                      <div className="w-24 h-24 relative flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-muted stroke-current"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="text-primary stroke-current"
                            strokeWidth="10"
                            strokeDasharray={performanceData.overallScore * 2.51}
                            strokeDashoffset="0"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">
                            {performanceData.overallScore}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {performanceData.metrics.map((metric, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{metric.name}</span>
                            <span className="text-sm">{metric.score}%</span>
                          </div>
                          <Progress value={metric.score} />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="font-medium flex items-center space-x-2 text-amber-500">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Points d'amélioration récents</span>
                      </div>
                      <ul className="space-y-1">
                        {performanceData.recentAlerts.map((alert, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                            className="text-sm text-muted-foreground flex items-start space-x-2"
                          >
                            <span className="text-amber-500 mt-0.5">•</span>
                            <span>{alert}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Voir analyse détaillée
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>

            {/* Interview tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Outils d'entretien</CardTitle>
                  <CardDescription>
                    Enregistrement, questions suggérées et marquage de moments importants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="recording" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="recording">Enregistrement</TabsTrigger>
                      <TabsTrigger value="questions">Questions suggérées</TabsTrigger>
                      <TabsTrigger value="moments">Moments clés</TabsTrigger>
                    </TabsList>
                    <TabsContent value="recording" className="space-y-4">
                      <div className="bg-card/50 p-6 rounded-lg border flex flex-col items-center space-y-4">
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          {isRecording ? (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                            >
                              <Pause className="h-12 w-12 text-destructive" />
                            </motion.div>
                          ) : (
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Mic className="h-12 w-12 text-primary" />
                            </motion.div>
                          )}
                        </div>

                        <div className="text-center">
                          <div className="text-2xl font-bold mb-1">
                            {isRecording ? formatTime(recordingTime) : 'Prêt à enregistrer'}
                          </div>
                          <p className="text-muted-foreground text-sm mb-4">
                            {isRecording
                              ? 'Enregistrement en cours...'
                              : "Cliquez sur le bouton pour démarrer l'enregistrement"}
                          </p>
                        </div>

                        <div className="flex space-x-3">
                          <Button
                            onClick={() => setIsRecording(!isRecording)}
                            className={isRecording ? 'bg-destructive hover:bg-destructive/90' : ''}
                          >
                            {isRecording ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                Arrêter
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Démarrer
                              </>
                            )}
                          </Button>
                          {isRecording && (
                            <Button variant="outline">
                              <Flag className="mr-2 h-4 w-4" />
                              Marquer
                            </Button>
                          )}
                        </div>
                      </div>

                      {isRecording && (
                        <div className="flex justify-center space-x-4 mt-4">
                          <div className="flex items-center space-x-2">
                            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                            <span className="text-sm">Audio OK</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                            <span className="text-sm">Transcription active</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                            <span className="text-sm">Analyse en temps réel</span>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="questions">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Questions suggérées</h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filtrer
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>Catégories</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Techniques</DropdownMenuItem>
                              <DropdownMenuItem>Comportementales</DropdownMenuItem>
                              <DropdownMenuItem>Culture d'entreprise</DropdownMenuItem>
                              <DropdownMenuItem>Expérience</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="space-y-2">
                          {suggestedQuestions.map((question, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-3 rounded-lg border bg-card/50 hover:bg-card cursor-pointer flex justify-between items-center group"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="text-primary mt-0.5">
                                  <HelpCircle className="h-5 w-5" />
                                </div>
                                <span>{question}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          ))}
                        </div>

                        <Button variant="outline" className="w-full mt-2">
                          <Plus className="mr-2 h-4 w-4" />
                          Ajouter une question personnalisée
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="moments">
                      <div className="space-y-4">
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="text-center text-muted-foreground">
                            Pendant un enregistrement, marquez les moments importants pour y revenir
                            facilement plus tard.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="p-3 rounded-lg border bg-card/50">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">
                                  Jules Martin - Data Engineer
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  23/04/2023
                                </Badge>
                              </div>
                              <span className="text-xs text-muted-foreground">12:34</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              "Moment clé lorsque le candidat a expliqué son approche pour résoudre
                              des problèmes de performance dans une base de données distribuée"
                            </p>
                            <div className="flex items-center justify-end space-x-2 mt-2">
                              <Button variant="ghost" size="sm">
                                <Play className="mr-2 h-3 w-3" />
                                Écouter
                              </Button>
                            </div>
                          </div>

                          <div className="p-3 rounded-lg border bg-card/50">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">
                                  Sophie Dubois - UX Designer
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  20/04/2023
                                </Badge>
                              </div>
                              <span className="text-xs text-muted-foreground">18:22</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              "Discussion approfondie sur le processus de conception centré sur
                              l'utilisateur et les méthodes de test d'utilisabilité"
                            </p>
                            <div className="flex items-center justify-end space-x-2 mt-2">
                              <Button variant="ghost" size="sm">
                                <Play className="mr-2 h-3 w-3" />
                                Écouter
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent interviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Entretiens récents</CardTitle>
                  <CardDescription>Récapitulatif de vos derniers entretiens</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left pb-3 font-medium text-muted-foreground">
                            Candidat
                          </th>
                          <th className="text-left pb-3 font-medium text-muted-foreground">
                            Poste
                          </th>
                          <th className="text-left pb-3 font-medium text-muted-foreground">Date</th>
                          <th className="text-left pb-3 font-medium text-muted-foreground">
                            Durée
                          </th>
                          <th className="text-left pb-3 font-medium text-muted-foreground">
                            Évaluation
                          </th>
                          <th className="text-left pb-3 font-medium text-muted-foreground">
                            Statut
                          </th>
                          <th className="text-left pb-3 font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentInterviews.map((interview, index) => (
                          <motion.tr
                            key={interview.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                            className="border-b"
                          >
                            <td className="py-3">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${interview.candidate}`}
                                    alt={interview.candidate}
                                  />
                                  <AvatarFallback>
                                    {interview.candidate
                                      .split(' ')
                                      .map((n) => n[0])
                                      .join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{interview.candidate}</span>
                              </div>
                            </td>
                            <td className="py-3 text-sm">{interview.position}</td>
                            <td className="py-3 text-sm">{interview.date}</td>
                            <td className="py-3 text-sm">{interview.duration}</td>
                            <td className="py-3">
                              <div className="flex items-center space-x-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(interview.rating)
                                        ? 'text-amber-500 fill-amber-500'
                                        : i < interview.rating
                                          ? 'text-amber-500 fill-amber-500/50'
                                          : 'text-muted stroke-muted-foreground'
                                    }`}
                                  />
                                ))}
                                <span className="ml-1 text-sm">{interview.rating}</span>
                              </div>
                            </td>
                            <td className="py-3">
                              <Badge
                                variant={
                                  interview.status === 'Shortlisted' ? 'default' : 'secondary'
                                }
                                className={
                                  interview.status === 'Shortlisted'
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : ''
                                }
                              >
                                {interview.status}
                              </Badge>
                            </td>
                            <td className="py-3">
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="icon">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Voir tous les entretiens
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Feedback and bias alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Générateur de feedback</CardTitle>
                    <CardDescription>
                      Créez des feedbacks personnalisés pour les candidats
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border bg-primary/5">
                        <div className="flex justify-between items-start mb-3">
                          <div className="space-y-1">
                            <h4 className="font-medium">Feedback pour Julie Moreau</h4>
                            <p className="text-sm text-muted-foreground">Front-end Developer</p>
                          </div>
                          <Badge>Généré par IA</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          "Merci pour votre participation à l'entretien. Nous avons été
                          impressionnés par vos compétences techniques en JavaScript et React. Votre
                          expérience dans l'optimisation des performances front-end est parfaitement
                          alignée avec nos besoins. Nous avons particulièrement apprécié votre
                          approche méthodique de la résolution de problèmes et votre capacité à
                          communiquer des concepts techniques clairement."
                        </p>
                        <div className="flex justify-between mt-3">
                          <Button variant="outline" size="sm">
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            Approuver
                          </Button>
                          <Button variant="ghost" size="sm">
                            Modifier
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Générer un nouveau feedback
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Détection de biais</CardTitle>
                    <CardDescription>
                      Alertes et recommandations pour un recrutement équitable
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border bg-accent">
                        <div className="flex items-start space-x-3">
                          <div className="shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Biais de confirmation détecté</h4>
                            <p className="text-sm text-muted-foreground">
                              Vous semblez favoriser les candidats ayant des parcours similaires au
                              vôtre. Essayez d'évaluer plus objectivement les expériences diverses.
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Button variant="ghost" size="sm">
                            En savoir plus
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border">
                        <div className="flex items-start space-x-3">
                          <div className="shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckSquare className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Amélioration détectée</h4>
                            <p className="text-sm text-muted-foreground">
                              Votre utilisation de critères objectifs pour évaluer les compétences
                              s'est améliorée de 15% ce mois-ci. Continuez ainsi!
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button variant="outline">Voir toutes les analyses</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
