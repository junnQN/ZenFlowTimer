import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, CloudRain, Waves, Trees } from "lucide-react";
import { type AmbientSound } from "@/hooks/useAmbientSound";

interface AmbientSoundControlProps {
  currentSound: AmbientSound;
  onSoundChange: (sound: AmbientSound) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  isPlaying: boolean;
}

const soundOptions: { value: AmbientSound; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "none", label: "None", icon: VolumeX },
  { value: "rain", label: "Rain", icon: CloudRain },
  { value: "ocean", label: "Ocean", icon: Waves },
  { value: "forest", label: "Forest", icon: Trees },
];

export function AmbientSoundControl({
  currentSound,
  onSoundChange,
  volume,
  onVolumeChange,
  isPlaying,
}: AmbientSoundControlProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Volume2 className="w-5 h-5 text-primary" />
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            Ambient Sound
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {soundOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.value}
                variant={currentSound === option.value ? "default" : "outline"}
                onClick={() => onSoundChange(option.value)}
                className="justify-start gap-2"
                data-testid={`sound-${option.value}`}
              >
                <Icon className="w-4 h-4" />
                {option.label}
              </Button>
            );
          })}
        </div>

        {currentSound !== "none" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-widest">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <Slider
              value={[volume]}
              onValueChange={(values) => onVolumeChange(values[0])}
              max={1}
              step={0.05}
              className="w-full"
              data-testid="volume-slider"
            />
          </div>
        )}
      </div>
    </Card>
  );
}
