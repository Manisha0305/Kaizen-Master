import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", improvements: 3, focus: 85 },
  { day: "Tue", improvements: 5, focus: 72 },
  { day: "Wed", improvements: 4, focus: 90 },
  { day: "Thu", improvements: 7, focus: 88 },
  { day: "Fri", improvements: 6, focus: 95 },
  { day: "Sat", improvements: 8, focus: 78 },
  { day: "Sun", improvements: 9, focus: 92 },
];

export function ProgressChart() {
  return (
    <Card variant="zen" className="animate-slide-up" style={{ animationDelay: "300ms" }}>
      <CardHeader>
        <CardTitle className="text-lg">Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorImprovements" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(145, 35%, 32%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(145, 35%, 32%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(25, 60%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(25, 60%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 20%, 85%)" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: "hsl(30, 10%, 45%)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(30, 10%, 45%)" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(40, 25%, 95%)",
                  border: "1px solid hsl(35, 20%, 85%)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 20px -4px rgba(0,0,0,0.08)",
                }}
                labelStyle={{ color: "hsl(30, 10%, 15%)", fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="improvements"
                stroke="hsl(145, 35%, 32%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorImprovements)"
                name="Improvements"
              />
              <Area
                type="monotone"
                dataKey="focus"
                stroke="hsl(25, 60%, 55%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorFocus)"
                name="Focus Score"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Improvements</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground">Focus Score</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
