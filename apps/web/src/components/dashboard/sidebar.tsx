import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  sections?: {
    title: string;
    items: {
      title: string;
      href: string;
      icon: LucideIcon;
      variant: "default" | "ghost";
      label?: string;
    }[];
  }[];
}

export function Sidebar({ sections = [], isCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-4 flex-1 p-4">
      {sections.map((section, index) => (
        <div key={index} className="flex flex-col gap-y-2">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
              {section.title}
            </h3>
          )}
          {section.items.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              size={isCollapsed ? "icon" : "default"}
              className={cn(
                "justify-start",
                pathname === item.href && "bg-muted"
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className={cn(
                  "h-4 w-4",
                  item.variant === "default" && "text-background"
                )} />
                {!isCollapsed && (
                  <span className="ml-2">{item.title}</span>
                )}
              </Link>
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}