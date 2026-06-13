import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Habit {
  id: string;
  name: string;
  emoji: string;
  completed: boolean;
  streak: number;
}

const initialHabits: Habit[] = [
  { id: "1", name: "Morning meditation", emoji: "🧘", completed: false, streak: 12 },
  { id: "2", name: "Read for 20 minutes", emoji: "📚", completed: true, streak: 8 },
  { id: "3", name: "Exercise", emoji: "💪", completed: false, streak: 5 },
  { id: "4", name: "Journal reflection", emoji: "✍️", completed: true, streak: 15 },
  { id: "5", name: "Learn something new", emoji: "🌱", completed: false, streak: 3 },
];

export function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const progress = (completedCount / habits.length) * 100;

  return (
    <Card variant="zen" className="animate-slide-up" style={{ animationDelay: "200ms" }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Daily Habits</CardTitle>
          <span className="text-sm text-muted-foreground">
            {completedCount}/{habits.length} complete
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-gradient-forest transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {habits.map((habit, index) => (
          <div
            key={habit.id}
            className={cn(
              "flex items-center gap-3 rounded-lg p-3 transition-all duration-200",
              "hover:bg-secondary/50 cursor-pointer group",
              habit.completed && "bg-primary/5"
            )}
            style={{ animationDelay: `${300 + index * 50}ms` }}
            onClick={() => toggleHabit(habit.id)}
          >
            <Checkbox
              checked={habit.completed}
              className="h-5 w-5 border-zen-stone data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <span className="text-lg">{habit.emoji}</span>
            <span
              className={cn(
                "flex-1 text-sm font-medium transition-all",
                habit.completed && "text-muted-foreground line-through"
              )}
            >
              {habit.name}
            </span>
            <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              🔥 {habit.streak} days
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
