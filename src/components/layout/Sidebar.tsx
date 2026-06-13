import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Target,
  TrendingUp,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Menu,
  X,
  User,
  History,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: CheckSquare, label: "Habits", path: "/habits" },
  { icon: Target, label: "Goals", path: "/goals" },
  { icon: TrendingUp, label: "Improvements", path: "/improvements" },
  { icon: BookOpen, label: "Journal", path: "/journal" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: History, label: "History", path: "/history" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [location]);

  // Close mobile sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-10 lg:hidden h-10 w-10 bg-card border shadow-md"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-card transition-all duration-300",
          // Desktop styles
          collapsed ? "w-16 lg:w-16" : "w-64 lg:w-64",
          // Mobile styles
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          // Responsive width for mobile
          mobileOpen && (collapsed ? "w-16" : "w-64")
        )}
      >
        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(false)}
          className="absolute right-2 top-2 lg:hidden h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div
            className={cn(
              "flex items-center gap-2",
              collapsed && "justify-center w-full"
            )}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-forest text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            {!collapsed && (
              <span className="font-display text-xl font-bold text-foreground">
                HabitFlow
              </span>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8 hidden lg:flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-secondary/80",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.label : ""}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive && "text-primary"
                  )}
                />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse Toggle (when collapsed on desktop) */}
        {collapsed && (
          <div className="border-t border-border p-3 hidden lg:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(false)}
              className="h-10 w-10 mx-auto"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* User section */}
        {!collapsed && (
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-forest flex items-center justify-center text-primary-foreground font-display font-semibold flex-shrink-0">
                K
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Kaizen Master
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  15 day streak 🔥
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed User Avatar */}
        {collapsed && (
          <div className="border-t border-border p-3">
            <div className="h-10 w-10 rounded-full bg-gradient-forest flex items-center justify-center text-primary-foreground font-display font-semibold mx-auto">
              K
            </div>
          </div>
        )}
      </aside>

      {/* Content padding adjustment */}
      <div
        className={cn(
          "transition-all duration-300",
          mobileOpen && collapsed
            ? "lg:ml-16"
            : mobileOpen
            ? "lg:ml-64"
            : collapsed
            ? "ml-0 lg:ml-16"
            : "ml-0 lg:ml-64",
          "pt-16 lg:pt-0"
        )}
      />
    </>
  );
}