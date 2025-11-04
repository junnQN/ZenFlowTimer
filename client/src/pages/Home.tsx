import { useState } from "react";
import { PresetCard } from "@/components/PresetCard";
import { meditationPresets } from "@/lib/presets";
import { type MeditationPreset } from "@shared/schema";
import { Leaf } from "lucide-react";

interface HomeProps {
  onSelectPreset: (preset: MeditationPreset) => void;
}

export default function Home({ onSelectPreset }: HomeProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-2xl font-light tracking-wide text-foreground">
              zen timer
            </h1>
            <Leaf className="w-5 h-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground tracking-wide">
            Breathe. Focus. Be present.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4" data-testid="preset-grid">
          {meditationPresets.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              onClick={() => onSelectPreset(preset)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
