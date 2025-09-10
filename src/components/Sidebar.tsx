import { BarChart3, Calendar, FileText, Settings, Users, Home, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Live feed", icon: MessageSquare, href: "/live-feed" },
  { name: "Templates", icon: FileText, href: "/templates" },
  { name: "Blocklist", icon: Users, href: "/blocklist" },
  { name: "Reports", icon: BarChart3, href: "/reports" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

interface SidebarProps {
  currentPath?: string;
}

export function Sidebar({ currentPath = "/settings" }: SidebarProps) {
  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold text-primary">N</div>
          <span className="text-lg font-semibold text-sidebar-foreground">Netcore</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = currentPath === item.href || 
              (item.name === "Settings" && currentPath === "/settings");
            
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}