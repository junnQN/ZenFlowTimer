import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, X } from "lucide-react";

interface TimerControlsProps {
  isActive: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onBack: () => void;
}

export function TimerControls({
  isActive,
  isPaused,
  onStart,
  onPause,
  onResume,
  onReset,
  onBack,
}: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4" data-testid="timer-controls">
      {isActive && (
        <Button
          size="icon"
          variant="ghost"
          onClick={onReset}
          className="h-12 w-12"
          data-testid="button-reset"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      )}

      {!isActive && (
        <Button
          size="icon"
          onClick={onStart}
          className="h-16 w-16"
          data-testid="button-start"
        >
          <Play className="w-7 h-7" />
        </Button>
      )}

      {isActive && !isPaused && (
        <Button
          size="icon"
          onClick={onPause}
          className="h-16 w-16"
          data-testid="button-pause"
        >
          <Pause className="w-7 h-7" />
        </Button>
      )}

      {isActive && isPaused && (
        <Button
          size="icon"
          onClick={onResume}
          className="h-16 w-16"
          data-testid="button-resume"
        >
          <Play className="w-7 h-7" />
        </Button>
      )}

      {isActive && (
        <Button
          size="icon"
          variant="ghost"
          onClick={onBack}
          className="h-12 w-12"
          data-testid="button-back"
        >
          <X className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
