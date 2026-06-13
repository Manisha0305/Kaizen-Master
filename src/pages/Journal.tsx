import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Calendar,
  Save,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface JournalEntry {
  id: string;
  date: string;
  gratitude: string;
  reflection: string;
  tomorrow: string;
  mood: number;
}

const prompts = [
  "What are you grateful for today?",
  "What went well? What could be improved?",
  "What's one thing you'll focus on tomorrow?",
];

const moods = ["😔", "😐", "🙂", "😄", "🤩"];

export default function Journal() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: today,
      gratitude: "",
      reflection: "",
      tomorrow: "",
      mood: 3,
    },
  ]);

  const { toast } = useToast();

  const currentEntry =
    entries.find((e) => e.date === selectedDate) || {
      id: Date.now().toString(),
      date: selectedDate,
      gratitude: "",
      reflection: "",
      tomorrow: "",
      mood: 3,
    };

  const updateEntry = (
    field: keyof JournalEntry,
    value: string | number
  ) => {
    setEntries((prev) => {
      const existing = prev.find((e) => e.date === selectedDate);

      if (existing) {
        return prev.map((e) =>
          e.date === selectedDate ? { ...e, [field]: value } : e
        );
      }

      return [...prev, { ...currentEntry, [field]: value }];
    });
  };

  const saveEntry = () => {
    const hasContent =
      currentEntry.gratitude ||
      currentEntry.reflection ||
      currentEntry.tomorrow;

    if (!hasContent) {
      toast({
        title: "Nothing to save",
        description: "Write something first!",
      });
      return;
    }

    toast({
      title: "Entry saved!",
      description: "Your reflection has been saved.",
    });
  };

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    }).replace(/,/g, '');
  };

  const formatLongDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const savedEntries = entries.filter(
    (e) => e.gratitude || e.reflection || e.tomorrow
  ).length;

  const navigateDate = (direction: "prev" | "next") => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto lg:px-20">
      {/* Header */}
      <div className="mb-6 sm:mb-8 animate-fade-in">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
          Journal
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Daily reflections for continuous growth
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 xs:grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Card variant="metric" className="animate-slide-up">
          <CardContent className="p-3 sm:p-4 text-center">
            <p className="text-xl sm:text-2xl font-display font-bold">
              {savedEntries}
            </p>
            <p className="text-xs text-muted-foreground">
              Entries Written
            </p>
          </CardContent>
        </Card>

        <Card
          variant="metric"
          className="animate-slide-up"
          style={{ animationDelay: "50ms" }}
        >
          <CardContent className="p-3 sm:p-4 text-center">
            <p className="text-xl sm:text-2xl font-display font-bold">
              {entries.length > 0
                ? Math.round(
                    entries.reduce((a, e) => a + e.mood, 0) /
                      entries.length
                  )
                : 0}
            </p>
            <p className="text-xs text-muted-foreground">
              Avg Mood (1–5)
            </p>
          </CardContent>
        </Card>

        <Card
          variant="metric"
          className="animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <CardContent className="p-3 sm:p-4 text-center">
            <p className="text-xl sm:text-2xl">📝</p>
            <p className="text-xs text-muted-foreground">
              Keep Writing!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Date Navigation */}
      <Card
        variant="glass"
        className="mb-4 sm:mb-6 animate-slide-up"
        style={{ animationDelay: "150ms" }}
      >
        <CardContent className="p-3 sm:p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateDate("prev")}
            className="h-8 w-8 sm:h-10 sm:w-10"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          <div className="text-center flex-1 mx-2">
            <div className="flex items-center gap-1 sm:gap-2 justify-center flex-col sm:flex-row">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              <span className="font-medium text-sm sm:text-base">
                <span className="sm:hidden">{formatDisplayDate(selectedDate)}</span>
                <span className="hidden sm:inline">{formatLongDate(selectedDate)}</span>
              </span>
            </div>
            {selectedDate === today && (
              <span className="text-xs text-primary">Today</span>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateDate("next")}
            disabled={selectedDate === today}
            className="h-8 w-8 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </CardContent>
      </Card>

      {/* Journal Entry */}
      <Card
        variant="zen"
        className="animate-slide-up mb-6 sm:mb-8"
        style={{ animationDelay: "200ms" }}
      >
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              Daily Reflection
            </CardTitle>

            <div className="flex items-center justify-between sm:justify-end gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Mood:
              </span>
              <div className="flex gap-0.5 sm:gap-1">
                {moods.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => updateEntry("mood", index + 1)}
                    className={cn(
                      "text-lg sm:text-xl p-0.5 sm:p-1 rounded transition-all hover:scale-110",
                      currentEntry.mood === index + 1
                        ? "bg-secondary scale-110"
                        : "opacity-50 hover:opacity-100"
                    )}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
          {/* Gratitude */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">
              {prompts[0]}
            </label>
            <Textarea
              placeholder="Today I'm grateful for..."
              value={currentEntry.gratitude}
              onChange={(e) =>
                updateEntry("gratitude", e.target.value)
              }
              className="min-h-20 sm:min-h-24 resize-none text-sm sm:text-base"
            />
          </div>

          {/* Reflection */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">
              {prompts[1]}
            </label>
            <Textarea
              placeholder="Reflecting on today..."
              value={currentEntry.reflection}
              onChange={(e) =>
                updateEntry("reflection", e.target.value)
              }
              className="min-h-28 sm:min-h-32 resize-none text-sm sm:text-base"
            />
          </div>

          {/* Tomorrow */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">
              {prompts[2]}
            </label>
            <Textarea
              placeholder="Tomorrow I will..."
              value={currentEntry.tomorrow}
              onChange={(e) =>
                updateEntry("tomorrow", e.target.value)
              }
              className="min-h-16 sm:min-h-20 resize-none text-sm sm:text-base"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={saveEntry}
              className="bg-gradient-forest hover:opacity-90 gap-2 w-full sm:w-auto"
              size="sm"
            >
              <Save className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Save Entry</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quote */}
      <div
        className="mt-6 sm:mt-8 text-center animate-fade-in"
        style={{ animationDelay: "300ms" }}
      >
        <p className="text-xs sm:text-sm text-muted-foreground italic px-2">
          "We do not learn from experience... we learn from reflecting
          on experience."
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          — John Dewey
        </p>
      </div>
    </div>
  );
}