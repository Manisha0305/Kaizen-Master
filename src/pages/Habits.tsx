import { useState } from "react";
import {Card,CardContent,CardHeader,CardTitle,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Flame, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface Habit {
  id: string;
  name: string;
  emoji: string;
  completed: boolean;
  streak: number;
  category: string;
}

const emojis = [
  "🔥",
  "📘",
  "💧",
  "🏃",
  "🧘",
  "💻",
  "🍎",
  "📝",
  "🎯",
  "🌱",
];

const initialHabits: Habit[] = [
  {
    id: "1",
    name: "Morning meditation",
    emoji: "🧘",
    completed: false,
    streak: 12,
    category: "Mindfulness",
  },
  {
    id: "2",
    name: "Read for 20 minutes",
    emoji: "📘",
    completed: true,
    streak: 8,
    category: "Learning",
  },
  {
    id: "3",
    name: "Exercise session",
    emoji: "🏃",
    completed: false,
    streak: 5,
    category: "Health",
  },
  {
    id: "4",
    name: "Journal reflection",
    emoji: "📝",
    completed: false,
    streak: 3,
    category: "Mindfulness",
  },
  {
    id: "5",
    name: "Learn something new",
    emoji: "🎯",
    completed: false,
    streak: 7,
    category: "Learning",
  },
];

export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [newHabit, setNewHabit] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🔥");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
              streak: habit.completed
                ? habit.streak - 1
                : habit.streak + 1,
            }
          : habit
      )
    );
  };

  const addHabit = () => {
    if (!newHabit.trim()) return;

    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit,
      emoji: selectedEmoji,
      completed: false,
      streak: 0,
      category: "General",
    };

    setHabits((prev) => [...prev, habit]);
    setNewHabit("");
    toast({
      title: "Habit added!",
      description: `${newHabit} has been added to your habits.`,
    });
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    toast({
      title: "Habit deleted",
      description: "The habit has been removed.",
    });
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const progress =
    habits.length > 0
      ? Math.round((completedCount / habits.length) * 100)
      : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 lg:px-20 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="mb-6 sm:mb-8 animate-fade-in">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
          Daily Habits
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Build consistency through small daily actions
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-6 animate-slide-up">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">
                Today’s Progress
              </p>
              <p className="font-display text-xl sm:text-2xl font-bold">
                {completedCount}/{habits.length} completed
              </p>
            </div>
            <div className="text-xl sm:text-2xl font-bold">{progress}%</div>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-gradient-forest transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Habit */}
      <Card
        variant="zen"
        className="mb-6 animate-slide-up"
        style={{ animationDelay: "100ms" }}
      >
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Add New Habit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative self-start">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="h-10 w-10 rounded-lg border border-border bg-background flex items-center justify-center text-xl hover:bg-secondary transition-colors"
              >
                {selectedEmoji}
              </button>

              {showEmojiPicker && (
                <div className="relative z-10 mt-2 p-2 grid grid-cols-5 gap-1 rounded-lg border border-border bg-card shadow-2xl animate-scale-in">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setSelectedEmoji(emoji);
                        setShowEmojiPicker(false);
                      }}
                      className="h-8 w-8 rounded hover:bg-secondary flex items-center justify-center text-lg transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Input
              placeholder="Enter habit name..."
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addHabit()}
              className="flex-1"
            />

            <Button
              onClick={addHabit}
              className="bg-gradient-forest hover:opacity-90 gap-2"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add</span>
              <span className="sm:hidden">+</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Habits List */}
      <Card
        variant="zen"
        className="animate-slide-up"
        style={{ animationDelay: "200ms" }}
      >
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Your Habits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {habits.length === 0 && (
            <p className="text-muted-foreground py-8 text-center">
              No habits yet. Add your first habit above!
            </p>
          )}

          {habits.map((habit, index) => (
            <div
              key={habit.id}
              className={cn(
                "flex items-center gap-3 rounded-lg p-3 sm:p-4 transition-all duration-200 hover:bg-secondary/50 group",
                habit.completed && "bg-primary/5"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Checkbox
                checked={habit.completed}
                onCheckedChange={() => toggleHabit(habit.id)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />

              <div className="flex-1 min-w-0">
                <span
                  className={cn(
                    "font-medium block truncate",
                    habit.completed &&
                      "line-through text-muted-foreground"
                  )}
                >
                  {habit.emoji} {habit.name}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {habit.category}
                </span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 text-xs text-muted-foreground flex-shrink-0">
                <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                <span>{habit.streak}</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => deleteHabit(habit.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}