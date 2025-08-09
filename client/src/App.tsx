import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpiritualProvider } from "@/contexts/spiritual-context";
import { useEffect } from "react";
import { preloadResource } from "@/utils";
import { StaticDataService } from "@/services";
import AppRouter from "@/components/router";

function App() {
  // Preload critical resources and data
  useEffect(() => {
    // Preload common static data in the background
    requestIdleCallback(() => {
      StaticDataService.preloadCommonData().catch(console.warn);
    });

    // Preload critical assets
    const criticalAssets = [
      '/api/quotes/random', // For daily inspiration
    ];

    criticalAssets.forEach(asset => {
      if (asset.startsWith('http') || asset.startsWith('/')) {
        fetch(asset, {
          method: 'HEAD',
          credentials: 'include'
        }).catch(() => {
          // Silently handle preload failures
        });
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SpiritualProvider>
        <TooltipProvider>
          <AppRouter />
          <Toaster />
        </TooltipProvider>
      </SpiritualProvider>
    </QueryClientProvider>
  );
}

export default App;