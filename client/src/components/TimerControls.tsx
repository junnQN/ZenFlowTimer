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
          data-testid="button-reset"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      )}

      {!isActive && (
        <Button
          size="lg"
          onClick={onStart}
          data-testid="button-start"
        >
          <Play className="w-5 h-5 mr-2" />
          Start
        </Button>
      )}

      {isActive && !isPaused && (
        <Button
          size="lg"
          onClick={onPause}
          data-testid="button-pause"
        >
          <Pause className="w-5 h-5 mr-2" />
          Pause
        </Button>
      )}

      {isActive && isPaused && (
        <Button
          size="lg"
          onClick={onResume}
          data-testid="button-resume"
        >
          <Play className="w-5 h-5 mr-2" />
          Resume
        </Button>
      )}

      {isActive && (
        <Button
          size="icon"
          variant="ghost"
          onClick={onBack}
          data-testid="button-back"
        >
          <X className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
