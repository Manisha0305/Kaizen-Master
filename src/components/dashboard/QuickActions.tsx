import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Zap, Target, BookOpen, Link } from "lucide-react";

const actions = [
  {
    label: "Log Improvement",
    icon: Plus,
    variant: "default" as const,
    className: "bg-gradient-forest hover:opacity-90",
    link: "/improvements",
  },
  {
    label: "Quick Win",
    icon: Zap,
    variant: "outline" as const,
    className: "",
  },
  {
    label: "Set Goal",
    icon: Target,
    variant: "outline" as const,
    className: "",
    link: "/Goals",
  },
  {
    label: "Reflect",
    icon: BookOpen,
    variant: "outline" as const,
    className: "",
  },
];

export function QuickActions() {
  return (
    <Card variant="glass" className="animate-slide-up" style={{ animationDelay: "150ms" }}>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-3">
          {actions.map((action, index) => (
            <a href={action.link}>
            <Button
              key={action.label}
              variant={action.variant}
              className={`gap-2 transition-all hover:scale-105 ${action.className}`}
              style={{ animationDelay: `${200 + index * 50}ms` }}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
