import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Establishment from "./pages/Establishment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/establishments/:establishmentId/zones/:zoneId" element={<Establishment />} />
            <Route path="/" element={<Navigate to="/establishments/1/zones/1" replace />} />
          </Routes>
        </BrowserRouter>
      </main>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;