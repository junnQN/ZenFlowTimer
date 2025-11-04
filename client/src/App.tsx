import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import TimerSession from "@/pages/TimerSession";
import { type MeditationPreset } from "@shared/schema";

function App() {
  const [selectedPreset, setSelectedPreset] = useState<MeditationPreset | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {selectedPreset ? (
          <TimerSession
            preset={selectedPreset}
            onBack={() => setSelectedPreset(null)}
          />
        ) : (
          <Home onSelectPreset={setSelectedPreset} />
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
