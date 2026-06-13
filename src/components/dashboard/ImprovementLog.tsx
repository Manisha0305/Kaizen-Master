import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, Lightbulb, Target, TrendingUp } from "lucide-react";

interface Improvement {
  id: string;
  title: string;
  category: "process" | "skill" | "goal" | "insight";
  timestamp: string;
  impact: "small" | "medium" | "large";
}

const improvements: Improvement[] = [
  {
    id: "1",
    title: "Reduced meeting time by 15 minutes",
    category: "process",
    timestamp: "2 hours ago",
    impact: "medium",
  },
  {
    id: "2",
    title: "Learned new keyboard shortcuts",
    category: "skill",
    timestamp: "5 hours ago",
    impact: "small",
  },
  {
    id: "3",
    title: "Completed weekly reading goal",
    category: "goal",
    timestamp: "Yesterday",
    impact: "large",
  },
  {
    id: "4",
    title: "Identified bottleneck in workflow",
    category: "insight",
    timestamp: "Yesterday",
    impact: "medium",
  },
];

const categoryIcons = {
  process: TrendingUp,
  skill: Target,
  goal: CheckCircle2,
  insight: Lightbulb,
};

const categoryColors = {
  process: "bg-primary/10 text-primary",
  skill: "bg-accent/10 text-accent",
  goal: "bg-zen-forest/10 text-zen-forest",
  insight: "bg-zen-terracotta/10 text-zen-terracotta",
};

const impactDots = {
  small: 1,
  medium: 2,
  large: 3,
};

export function ImprovementLog() {
  return (
    <Card variant="zen" className="animate-slide-up" style={{ animationDelay: "400ms" }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Improvements</CardTitle>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
            View all
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {improvements.map((improvement, index) => {
          const Icon = categoryIcons[improvement.category];
          return (
            <div
              key={improvement.id}
              className="flex items-start gap-3 rounded-lg p-3 transition-all hover:bg-secondary/50 group cursor-pointer"
              style={{ animationDelay: `${500 + index * 50}ms` }}
            >
              <div className={cn("rounded-lg p-2", categoryColors[improvement.category])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {improvement.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {improvement.timestamp}
                </p>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: impactDots[improvement.impact] }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-primary/60"
                  />
                ))}
                {Array.from({ length: 3 - impactDots[improvement.impact] }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-border"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
