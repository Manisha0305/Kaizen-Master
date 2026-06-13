import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Habits from "./pages/Habits";
import { Sidebar } from "./components/layout/Sidebar";
import Goals from "./pages/Goals";
import Improvements from "./pages/Improvement";
import Journal from "./pages/Journal";
import Settings from "./pages/Settings";
import ProfileForm from "./pages/ProfileForm";
import HistoryTable from "./pages/HistoryTable";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
     
      <BrowserRouter>
       <Sidebar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Habits" element={<Habits />} />
          <Route path="/Goals" element={<Goals />} />
          <Route path="/Improvements" element={<Improvements />} />
          <Route path="/Journal" element={<Journal />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/Profile" element={<ProfileForm />} />
          <Route path="/history" element={<HistoryTable />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
