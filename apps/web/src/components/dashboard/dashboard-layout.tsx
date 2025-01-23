// components/layouts/dashboard-layout.tsx
'use client';

import { useState } from "react";
import { MainNav } from "@/components/layouts/nav/main-nav";
import { UserNav } from "@/components/layouts/nav/user-nav";
import { 
  BarChart, 
  Calendar, 
  LayoutDashboard, 
  Library,
  Users2,
  History,
  Settings,
  GraduationCap, 
  Menu,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Sidebar } from "./sidebar";
import { Search } from "./search";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const sidebarSections = [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
          variant: "default" as const,
          label: ""
        },
        {
          title: "Calendar",
          href: "/dashboard/calendar",
          icon: Calendar,
          variant: "ghost" as const,
          label: ""
        },
        {
          title: "Past Sessions",
          href: "/dashboard/history",
          icon: History,
          variant: "ghost" as const,
          label: "3"
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          title: "Performance",
          href: "/dashboard/performance",
          icon: BarChart,
          variant: "ghost" as const,
          label: ""
        },
        {
          title: "Students",
          href: "/dashboard/students",
          icon: Users2,
          variant: "ghost" as const,
          label: "12"
        },
        {
          title: "Resources",
          href: "/dashboard/resources",
          icon: Library,
          variant: "ghost" as const,
          label: ""
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <Sidebar isCollapsed={false} sections={sidebarSections} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex",
        isSidebarOpen ? "w-72" : "w-16",
        "flex-col fixed inset-y-0 z-50 bg-background border-r"
      )}>
        <div className="flex h-16 items-center px-4 gap-x-4">
          <GraduationCap className="h-6 w-6" />
          {isSidebarOpen && <span className="font-semibold">Prep AI</span>}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-all",
              !isSidebarOpen && "rotate-180"
            )} />
          </Button>
        </div>
        <Sidebar 
          sections={sidebarSections} 
          isCollapsed={!isSidebarOpen} 
        />
      </div>

      {/* Main Content */}
      <div className={cn(
        "flex-1",
        isSidebarOpen ? "lg:pl-72" : "lg:pl-16"
      )}>
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-x-4">
              <MainNav />
            </div>
            <div className="flex items-center gap-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </header>
        <main className="container p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}