import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import NotFound from "./pages/NotFound.tsx";

import Seeding from "./pages/journey/Seeding.tsx";
import Harvesting from "./pages/journey/Harvesting.tsx";
import CuringRetting from "./pages/journey/CuringRetting.tsx";
import Buying from "./pages/journey/Buying.tsx";
import Manufacturing from "./pages/journey/Manufacturing.tsx";
import PackingExporting from "./pages/journey/PackingExporting.tsx";

import Yarn from "./pages/products/Yarn.tsx";
import Sliver from "./pages/products/Sliver.tsx";
import SackingBag from "./pages/products/SackingBag.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/journey/seeding" element={<Seeding />} />
          <Route path="/journey/harvesting" element={<Harvesting />} />
          <Route path="/journey/curing-retting" element={<CuringRetting />} />
          <Route path="/journey/buying" element={<Buying />} />
          <Route path="/journey/manufacturing" element={<Manufacturing />} />
          <Route path="/journey/packing-exporting" element={<PackingExporting />} />
          <Route path="/products/yarn" element={<Yarn />} />
          <Route path="/products/sliver" element={<Sliver />} />
          <Route path="/products/sacking-bag" element={<SackingBag />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
