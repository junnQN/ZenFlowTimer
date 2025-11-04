import { Card } from "@/components/ui/card";
import { type MeditationPreset } from "@shared/schema";
import { formatDuration } from "@/lib/presets";
import { Timer, Wind, Moon, Zap, Clock } from "lucide-react";

interface PresetCardProps {
  preset: MeditationPreset;
  onClick: () => void;
}

const iconMap = {
  countdown: Clock,
  box_breathing: Wind,
  breathing_478: Moon,
  cyclic_sighing: Zap,
  custom_interval: Timer,
};

export function PresetCard({ preset, onClick }: PresetCardProps) {
  const Icon = iconMap[preset.type] || Timer;
  
  return (
    <Card
      className="p-8 cursor-pointer transition-all hover-elevate active-elevate-2 border border-card-border"
      onClick={onClick}
      data-testid={`preset-${preset.id}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-normal mb-2 tracking-wide">{preset.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {preset.description}
          </p>
        </div>
        <div className="text-xs uppercase tracking-widest text-center text-muted-foreground mt-2">
          {formatDuration(preset.duration)}
        </div>
      </div>
    </Card>
  );
}
