/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  TrendingUp,
  Target,
  CheckCircle2,
  Lightbulb,
  Filter,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Improvement {
  id: string;
  title: string;
  description: string;
  category: "process" | "skill" | "goal" | "insight";
  impact: "small" | "medium" | "large";
  timestamp: Date;
}

const categoryConfig = {
  process: {
    icon: TrendingUp,
    label: "Process",
    color: "bg-primary/10 text-primary",
  },
  skill: {
    icon: Target,
    label: "Skill",
    color: "bg-secondary/50 text-red-300",
  },
  goal: {
    icon: CheckCircle2,
    label: "Goal",
    color: "bg-green-500/10 text-green-500",
  },
  insight: {
    icon: Lightbulb,
    label: "Insight",
    color: "bg-orange-500/10 text-orange-500",
  },
};

const initialImprovements: Improvement[] = [
  {
    id: "1",
    title: "Reduced meeting time by 15 minutes",
    description:
      "Implemented a strict agenda format that helped keep meetings focused.",
    category: "process",
    impact: "medium",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Learned new keyboard shortcuts",
    description:
      "Memorized essential shortcuts for my code editor, saving time on repetitive tasks.",
    category: "skill",
    impact: "small",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Completed weekly reading goal",
    description:
      "Finished reading 2 chapters of 'Atomic Habits' as planned.",
    category: "goal",
    impact: "large",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    title: "Identified bottleneck in workflow",
    description:
      "Discovered that context switching was reducing my productivity by 30%.",
    category: "insight",
    impact: "large",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    title: "Automated daily report generation",
    description:
      "Created a script that generates my daily status report automatically.",
    category: "process",
    impact: "medium",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
];

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export default function Improvements() {
  const [improvements, setImprovements] =
    useState<Improvement[]>(initialImprovements);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newImprovement, setNewImprovement] = useState({
    title: "",
    description: "",
    category: "process" as const,
    impact: "medium" as const,
  });

  const { toast } = useToast();

  const addImprovement = () => {
    if (!newImprovement.title.trim()) return;

    const improvement: Improvement = {
      id: Date.now().toString(),
      ...newImprovement,
      timestamp: new Date(),
    };

    setImprovements((prev) => [improvement, ...prev]);
    setNewImprovement({
      title: "",
      description: "",
      category: "process",
      impact: "medium",
    });
    setIsDialogOpen(false);

    toast({
      title: "Improvement logged!",
      description: "Keep up the great work 🚀",
    });
  };

  const filteredImprovements = improvements.filter((i) => {
    const matchFilter = filter === "all" || i.category === filter;
    const matchSearch =
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  const stats = {
    total: improvements.length,
    thisWeek: improvements.filter(
      // eslint-disable-next-line react-hooks/purity
      (i) => Date.now() - i.timestamp.getTime() < 7 * 24 * 60 * 60 * 1000
    ).length,
    byCategory: Object.entries(categoryConfig).map(([key, config]) => ({
      key,
      label: config.label,
      count: improvements.filter((i) => i.category === key).length,
    })),
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto lg:px-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Improvements</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Track and celebrate your continuous improvements
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Improvement</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Log New Improvement</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="What did you improve?"
                value={newImprovement.title}
                onChange={(e) =>
                  setNewImprovement({
                    ...newImprovement,
                    title: e.target.value,
                  })
                }
              />

              <Textarea
                placeholder="Describe the improvement in detail..."
                value={newImprovement.description}
                onChange={(e) =>
                  setNewImprovement({
                    ...newImprovement,
                    description: e.target.value,
                  })
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select
                  value={newImprovement.category}
                  onValueChange={(v) =>
                    setNewImprovement({
                      ...newImprovement,
                      category: v as any,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="process">Process</SelectItem>
                    <SelectItem value="skill">Skill</SelectItem>
                    <SelectItem value="goal">Goal</SelectItem>
                    <SelectItem value="insight">Insight</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={newImprovement.impact}
                  onValueChange={(v) =>
                    setNewImprovement({
                      ...newImprovement,
                      impact: v as any,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Impact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" onClick={addImprovement}>
                Log Improvement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="flex flex-col sm:flex-row gap-3 p-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search improvements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="process">Process</SelectItem>
              <SelectItem value="skill">Skill</SelectItem>
              <SelectItem value="goal">Goal</SelectItem>
              <SelectItem value="insight">Insight</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Stats Grid (Mobile: stacked, Desktop: grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">{stats.thisWeek}</p>
              </div>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {stats.byCategory.slice(0, 2).map((stat) => (
          <Card key={stat.key}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.count}</p>
                </div>
                <div className={cn("p-2 rounded-lg", categoryConfig[stat.key as keyof typeof categoryConfig].color)}>
                  {(() => {
                    const Icon = categoryConfig[stat.key as keyof typeof categoryConfig].icon;
                    return <Icon className="h-5 w-5" />;
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Improvements List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredImprovements.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No improvements found.
          </p>
        )}

        {filteredImprovements.map((improvement) => {
          const config = categoryConfig[improvement.category];
          const Icon = config.icon;

          return (
            <Card key={improvement.id}>
              <CardContent className="p-3 sm:p-4">
                <div className="flex gap-3 sm:gap-4">
                  <div
                    className={cn(
                      "p-2 rounded-lg flex items-center justify-center flex-shrink-0 h-fit",
                      config.color
                    )}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base break-words">
                      {improvement.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-forebreak-words mt-1">
                      {improvement.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        improvement.impact === "large" 
                          ? "bg-green-500/10 text-green-500"
                          : improvement.impact === "medium"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-gray-500/10 text-gray-500"
                      )}>
                        {improvement.impact.charAt(0).toUpperCase() + improvement.impact.slice(1)} impact
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(improvement.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}