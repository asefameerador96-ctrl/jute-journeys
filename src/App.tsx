import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import { Suspense, lazy } from "react";
import RouteSeo from "@/components/RouteSeo";

// Only the homepage is bundled eagerly. Every other route is its own chunk, so a
// visitor landing on / never downloads the product and journey pages, and editing
// one page does not invalidate the others' cached chunks.
const AboutUs = lazy(() => import("./pages/AboutUs.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Seeding = lazy(() => import("./pages/journey/Seeding.tsx"));
const Harvesting = lazy(() => import("./pages/journey/Harvesting.tsx"));
const CuringRetting = lazy(() => import("./pages/journey/CuringRetting.tsx"));
const Buying = lazy(() => import("./pages/journey/Buying.tsx"));
const Manufacturing = lazy(() => import("./pages/journey/Manufacturing.tsx"));
const PackingExporting = lazy(() => import("./pages/journey/PackingExporting.tsx"));
const Yarn = lazy(() => import("./pages/products/Yarn.tsx"));
const Sliver = lazy(() => import("./pages/products/Sliver.tsx"));
const SackingBag = lazy(() => import("./pages/products/SackingBag.tsx"));
import Index from "./pages/Index.tsx";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <RouteSeo />
        <Suspense fallback={null}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
