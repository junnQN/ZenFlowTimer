import { formatTime } from "@/lib/presets";
import { type BreathingPhase } from "@shared/schema";

interface CircularTimerProps {
  timeRemaining: number;
  totalDuration: number;
  currentPhase?: BreathingPhase;
  phaseInstruction?: string;
  isActive: boolean;
  isPaused: boolean;
}

const phaseLabels: Record<BreathingPhase, string> = {
  inhale: "INHALE",
  hold: "HOLD",
  exhale: "EXHALE",
  hold2: "HOLD",
  rest: "REST",
};

export function CircularTimer({
  timeRemaining,
  totalDuration,
  currentPhase,
  phaseInstruction,
  isActive,
  isPaused,
}: CircularTimerProps) {
  const radius = 140;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  const progress = totalDuration > 0 ? 1 - (timeRemaining / totalDuration) : 0;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="relative" data-testid="circular-timer">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="hsl(var(--border))"
            fill="transparent"
            strokeWidth={2}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="hsl(var(--primary))"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-300 ease-linear"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div 
            className={`font-extralight tabular-nums tracking-tight ${
              isPaused ? "animate-pulse-gentle" : ""
            }`}
            style={{ fontSize: "96px", lineHeight: "1.2" }}
            data-testid="timer-display"
          >
            {formatTime(timeRemaining)}
          </div>
        </div>
      </div>

      {currentPhase && phaseInstruction && isActive && (
        <div className="flex flex-col items-center gap-2" data-testid="breathing-indicator">
          <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {phaseLabels[currentPhase]}
          </div>
          <div className="text-sm font-normal text-foreground/80">
            {phaseInstruction}
          </div>
        </div>
      )}
    </div>
  );
}
