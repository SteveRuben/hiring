"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Search,
  Menu,
  Bell,
  ChevronDown,
  LayoutDashboard,
  Calendar,
  History,
  BarChart2,
  Users2,
  Library,
  FileEdit,
  BookOpen,
  Newspaper,
  GraduationCap,
  PenTool,
  FolderKanban,
  Settings,
  LucideGamepad2,
  ScrollText,
  Users,
  MicVocalIcon,
  Mic2,
  Mic
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { I18nProvider } from "@/components/i18n";
import { SoundEffectProvider } from "@/lib/providers/sound-effect-provider";
import AppStateProvider from "@/lib/providers/app-state-provider";
import { QueryProvider } from "@/lib/providers/query-provider";
import { ToastProvider } from "@/lib/providers/toast-provider";

// Types pour les rôles utilisateur
type UserRole = 'student' | 'expert';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: UserRole; // Pour simuler le rôle de l'utilisateur
}

export default function DashboardLayout({
  children,
  userRole = 'expert' // Par défaut pour test
}: DashboardLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Menus communs
  const commonMenuItems = [
    {
      title: "Overview",
      items: [
        { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { name: "Meetings", icon: Mic, href: "/dashboard/meetings" },
        { name: "Calendar", icon: Calendar, href: "/dashboard/calendar" },
        { name: "History", icon: History, href: "/dashboard/history" },
      ],
    },
  ];

  // Menus spécifiques pour les experts
const expertMenuItems = [
  {
    title: "Content Creation",
    items: [
      { name: "Courses", icon: BookOpen, href: "/dashboard/courses" },
      { name: "Articles", icon: Newspaper, href: "/dashboard/articles" },
      { name: "Coding Games", icon: LucideGamepad2, href: "/dashboard/coding-games" },
      { name: "Quizzes", icon: ScrollText, href: "/dashboard/quizzes" },
      { name: "Drafts", icon: FileEdit, href: "/dashboard/drafts" }
    ],
  },
  {
    title: "Recruitment",
    items: [
      { name: "Talents", icon: Users, href: "/dashboard/talents" },
      // ... autres items
    ]
  },
  {
    title: "Analytics",
    items: [
      { name: "Performance", icon: BarChart2, href: "/dashboard/performance" },
      { name: "Students", icon: Users2, href: "/dashboard/students" },
      { name: "Resources", icon: Library, href: "/dashboard/resources" },
    ],
  }
];

// Menus spécifiques pour les étudiants
const studentMenuItems = [
  {
    title: "Learning",
    items: [
      { name: "My Courses", icon: GraduationCap, href: "/dashboard/my-courses" },
      { name: "Practice", icon: LucideGamepad2, href: "/dashboard/coding-games" },
      { name: "Quizzes", icon: ScrollText, href: "/dashboard/quizzes" },
      { name: "Resources", icon: Library, href: "/dashboard/resources" },
    ],
  },
  {
    title: "Progress",
    items: [
      { name: "Performance", icon: BarChart2, href: "/dashboard/performance" },
      { name: "History", icon: History, href: "/dashboard/history" },
    ],
  }
];

  // Sélectionner les menus en fonction du rôle
  const menuItems = [
    ...commonMenuItems,
    ...(userRole === 'expert' ? expertMenuItems : studentMenuItems),
    {
      title: "Settings",
      items: [
        { name: "Settings", icon: Settings, href: "/dashboard/settings" },
      ],
    }
  ];

  return (
    <QueryProvider>
          {/* <FlaggProvider featureFlags={featureFlags}> */}
            <AppStateProvider>
              <SoundEffectProvider
                soundUrls={{
                  mp3: '/sounds/sounds.mp3',
                  webm: '/sounds/sounds.webm',
                }}
              >
                <I18nProvider>
                  <ToastProvider />
                  <div className="min-h-screen">
                      {/* Top Navigation */}
                      <header className="fixed top-0 w-full bg-background border-b z-50">
                        <div className="flex h-16 items-center px-4 gap-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                          >
                            <Menu className="h-5 w-5" />
                          </Button>

                          <a href="/dashboard" className="flex items-center gap-2">
                            <img src="/logo.svg" alt="Prep AI" className="h-8" />
                          </a>

                          <div className="flex-1 ml-4">
                            <div className="relative max-w-md">
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search..."
                                className="pl-8"
                              />
                            </div>
                          </div>

                          <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-600 rounded-full" />
                          </Button>

                          <div className="flex items-center gap-4">
                            <img
                              src="/avatar.png"
                              alt="User"
                              className="h-8 w-8 rounded-full"
                            />
                            <Button variant="ghost" size="sm">
                              <span className="mr-2">John Doe</span>
                              <span className="text-xs text-muted-foreground">({userRole})</span>
                              <ChevronDown className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </header>

                      {/* Sidebar and Main Content */}
                      <div className="flex pt-16">
                        {/* Sidebar */}
                        <aside
                          className={cn(
                            "fixed left-0 h-[calc(100vh-64px)] bg-background border-r transition-all duration-300",
                            isSidebarOpen ? "w-64" : "w-16"
                          )}
                        >
                          <ScrollArea className="h-full py-4">
                            {menuItems.map((section, idx) => (
                              <div key={idx} className="px-3 pb-4">
                                {isSidebarOpen && (
                                  <h3 className="mb-2 px-4 text-xs font-medium text-muted-foreground">
                                    {section.title}
                                  </h3>
                                )}
                                <div className="space-y-1">
                                  {section.items.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                    >
                                      <Button
                                        variant={pathname === item.href ? "secondary" : "ghost"}
                                        className={cn(
                                          "w-full justify-start",
                                          !isSidebarOpen && "justify-center"
                                        )}
                                      >
                                        <item.icon className="h-4 w-4" />
                                        {isSidebarOpen && <span className="ml-2">{item.name}</span>}
                                      </Button>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </ScrollArea>
                        </aside>

                        {/* Main Content */}
                        <main
                          className={cn(
                            "flex-1 transition-all duration-300",
                            isSidebarOpen ? "ml-64" : "ml-16"
                          )}
                        >
                          <div className="container p-8">
                            {children}
                          </div>
                        </main>
                      </div>
                  </div>
                </I18nProvider>
              </SoundEffectProvider>
            </AppStateProvider>
         {/*  </FlaggProvider> */}
        </QueryProvider>
  );
}