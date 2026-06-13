import { Header } from "@/components/dashboard/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { HabitTracker } from "@/components/dashboard/HabitTracker";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { ImprovementLog } from "@/components/dashboard/ImprovementLog";
import { Flame, TrendingUp, Target, Calendar } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-20">
        <Header />
        <div className="mt-8">
          <QuickActions />
        </div>

        {/* Metrics Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Current Streak"
            value="15"
            subtitle="days of improvement"
            icon={Flame}
            trend={{ value: 12, isPositive: true }}
            delay={100}
          />
          <MetricCard
            title="Improvements"
            value="127"
            subtitle="total logged"
            icon={TrendingUp}
            trend={{ value: 8, isPositive: true }}
            delay={150}
          />
          <MetricCard
            title="Goals Completed"
            value="23"
            subtitle="this quarter"
            icon={Target}
            trend={{ value: 15, isPositive: true }}
            delay={200}
          />
          <MetricCard
            title="Focus Score"
            value="92%"
            subtitle="weekly average"
            icon={Calendar}
            trend={{ value: 5, isPositive: true }}
            delay={250}
          />
        </div>

        {/* Main Content Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <HabitTracker />
          <ProgressChart />
        </div>

        {/* Improvement Log */}
        <div className="mt-6">
          <ImprovementLog />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-display">改善</span> — Small steps, lasting change
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
