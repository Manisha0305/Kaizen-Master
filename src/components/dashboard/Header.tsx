import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const quotes = [
  " — The path to excellence is paved with small, daily improvements.",
  " — Today's small step creates tomorrow's giant leap.",
  " — Continuous improvement is better than delayed perfection.",
];

export function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // eslint-disable-next-line react-hooks/purity
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <header className="animate-fade-in">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between ">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{currentDate}</p>
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Welcome back, <span className="text-primary">Kaizen Master</span>
          </h1>
          <p className="text-sm text-muted-foreground italic max-w-lg">
            "{randomQuote}"
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search improvements..."
              className="h-10 w-64 rounded-lg border border-border bg-card pl-10 pr-4 text-sm transition-all placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent animate-pulse-gentle" />
          </Button>
          <a href="/settings">
          <Button variant="ghost" size="icon">
            <Settings  className="h-5 w-5" />
          </Button>
          </a>
          <div className="h-10 w-10 rounded-full bg-gradient-forest flex items-center justify-center text-primary-foreground font-display font-semibold">
            K
          </div>
        </div>
      </div>
    </header>
  );
}
