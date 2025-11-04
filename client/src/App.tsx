import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import TimerSession from "@/pages/TimerSession";
import { SessionHistory } from "@/components/SessionHistory";
import { PresetBuilder } from "@/components/PresetBuilder";
import { type MeditationPreset } from "@shared/schema";

function App() {
  const [selectedPreset, setSelectedPreset] = useState<MeditationPreset | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showPresetBuilder, setShowPresetBuilder] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {selectedPreset ? (
          <TimerSession
            preset={selectedPreset}
            onBack={() => setSelectedPreset(null)}
          />
        ) : showHistory ? (
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto">
              <div className="mb-8">
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-sm text-muted-foreground hover-elevate active-elevate-2 px-4 py-2 rounded-md"
                  data-testid="button-back-home"
                >
                  ← Back to Home
                </button>
              </div>
              <SessionHistory />
            </div>
          </div>
        ) : showPresetBuilder ? (
          <PresetBuilder onBack={() => setShowPresetBuilder(false)} />
        ) : (
          <Home 
            onSelectPreset={setSelectedPreset} 
            onShowHistory={() => setShowHistory(true)}
            onShowBuilder={() => setShowPresetBuilder(true)}
          />
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
