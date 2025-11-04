import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type MeditationPreset } from "@shared/schema";
import { formatDuration } from "@/lib/presets";
import { Timer, Wind, Moon, Zap, Clock, Heart, Sparkles, ScanFace, Trash2 } from "lucide-react";

interface PresetCardProps {
  preset: MeditationPreset;
  onClick: () => void;
  onDelete?: () => void;
}

const iconMap = {
  countdown: Clock,
  box_breathing: Wind,
  breathing_478: Moon,
  cyclic_sighing: Zap,
  diaphragmatic: Heart,
  alternate_nostril: Sparkles,
  body_scan: ScanFace,
  custom_interval: Timer,
};

export function PresetCard({ preset, onClick, onDelete }: PresetCardProps) {
  const Icon = iconMap[preset.type] || Timer;
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };
  
  return (
    <Card
      className="p-8 cursor-pointer transition-all hover-elevate active-elevate-2 border border-card-border relative"
      onClick={onClick}
      data-testid={`preset-${preset.id}`}
    >
      {onDelete && (
        <Button
          size="icon"
          variant="ghost"
          onClick={handleDelete}
          className="absolute top-2 right-2 w-8 h-8"
          data-testid={`button-delete-${preset.id}`}
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      )}
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
