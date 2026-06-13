import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Target,
  CheckCircle2,
  Clock,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  unit: string;
  deadline: string;
  status: "in-progress" | "completed" | "paused";
}

const initialGoals: Goal[] = [
  {
    id: "1",
    title: "Read 24 books this year",
    description: "Expand knowledge through consistent reading",
    progress: 8,
    target: 24,
    unit: "books",
    deadline: "2026-12-31",
    status: "in-progress",
  },
  {
    id: "2",
    title: "Complete 100 improvements",
    description: "Log 100 continuous improvements",
    progress: 67,
    target: 100,
    unit: "improvements",
    deadline: "2026-06-30",
    status: "in-progress",
  },
  {
    id: "3",
    title: "30-day meditation streak",
    description: "Build consistent meditation practice",
    progress: 30,
    target: 30,
    unit: "days",
    deadline: "2026-02-15",
    status: "completed",
  },
  {
    id: "4",
    title: "Learn Japanese basics",
    description: "Complete N5 level vocabulary and grammar",
    progress: 120,
    target: 500,
    unit: "words",
    deadline: "2026-09-01",
    status: "in-progress",
  },
];

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    target: "",
    unit: "",
    deadline: "",
  });

  const addGoal = () => {
    if (!newGoal.title || !newGoal.target) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      progress: 0,
      target: parseInt(newGoal.target),
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      status: "in-progress",
    };

    setGoals((prev) => [...prev, goal]);
    setNewGoal({
      title: "",
      description: "",
      target: "",
      unit: "",
      deadline: "",
    });
    setIsDialogOpen(false);

    toast({
      title: "Goal created!",
      description: `${newGoal.title} has been added.`,
    });
  };

  const updateProgress = (id: string, increment: number) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== id) return goal;

        const newProgress = Math.min(
          goal.progress + increment,
          goal.target
        );

        return {
          ...goal,
          progress: newProgress,
          status:
            newProgress >= goal.target ? "completed" : goal.status,
        };
      })
    );
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const activeGoals = goals.filter((g) => g.status === "in-progress");
  const completedGoals = goals.filter((g) => g.status === "completed");

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto lg:px-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Goals
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your long-term objectives
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-forest hover:opacity-90 gap-2">
              <Plus className="h-4 w-4" />
              New Goal
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pt-4">
              <Input
                placeholder="Goal title"
                value={newGoal.title}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, title: e.target.value })
                }
              />
              <Input
                placeholder="Description (optional)"
                value={newGoal.description}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    description: e.target.value,
                  })
                }
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Target number"
                  value={newGoal.target}
                  onChange={(e) =>
                    setNewGoal({
                      ...newGoal,
                      target: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Unit (e.g. books, hours)"
                  value={newGoal.unit}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, unit: e.target.value })
                  }
                />
              </div>
              <Input
                type="date"
                value={newGoal.deadline}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    deadline: e.target.value,
                  })
                }
              />

              <Button
                onClick={addGoal}
                className="w-full bg-gradient-forest"
              >
                Create Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="animate-slide-up">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-display font-bold">
              {goals.length}
            </p>
            <p className="text-sm text-muted-foreground">Total Goals</p>
          </CardContent>
        </Card>

        <Card
          className="animate-slide-up"
          style={{ animationDelay: "50ms" }}
        >
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-display font-bold">
              {activeGoals.length}
            </p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>

        <Card
          className="animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-display font-bold">
              {completedGoals.length}
            </p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card
          className="animate-slide-up"
          style={{ animationDelay: "150ms" }}
        >
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-display font-bold">
              {goals.length
                ? Math.round(
                    goals.reduce(
                      (acc, g) => acc + (g.progress / g.target) * 100,
                      0
                    ) / goals.length
                  )
                : 0}
              %
            </p>
            <p className="text-sm text-muted-foreground">Avg Progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Target className="h-5 w-5 text-accent" />
          Active Goals
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {activeGoals.map((goal, index) => (
            <Card
              key={goal.id}
              className="animate-slide-up group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-foreground">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {goal.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 text-destructive"
                    onClick={() => deleteGoal(goal.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {goal.progress}/{goal.target} {goal.unit}
                    </span>
                    <span className="font-medium">
                      {Math.round(
                        (goal.progress / goal.target) * 100
                      )}
                      %
                    </span>
                  </div>

                  <Progress
                    value={(goal.progress / goal.target) * 100}
                    className="h-2"
                  />

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateProgress(goal.id, 1)}
                    >
                      +1 {goal.unit.slice(0, -1)}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div className="space-y-4 mt-8">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Completed Goals
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {completedGoals.map((goal) => (
              <Card key={goal.id} variant="zen" className="opacity-75">
                <CardContent className="p-4 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium line-through">
                      {goal.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {goal.target} {goal.unit} completed
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
