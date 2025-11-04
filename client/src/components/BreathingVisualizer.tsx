import { type BreathingPhase } from "@shared/schema";

interface BreathingVisualizerProps {
  currentPhase: BreathingPhase;
  phaseDuration: number;
  type: "box" | "circle";
}

export function BreathingVisualizer({
  currentPhase,
  phaseDuration,
  type,
}: BreathingVisualizerProps) {
  if (type === "circle") {
    const isExpanding = currentPhase === "inhale";
    const isContracting = currentPhase === "exhale";
    
    return (
      <div className="flex items-center justify-center mb-8" data-testid="breathing-visualizer">
        <div
          className={`w-32 h-32 rounded-full border-2 border-primary/40 transition-transform ${
            isExpanding
              ? "animate-breathe-in"
              : isContracting
              ? "animate-breathe-out"
              : ""
          }`}
          style={{
            "--duration": `${phaseDuration}s`,
          } as React.CSSProperties}
        />
      </div>
    );
  }

  // Box breathing visualization
  const pathMap: Record<BreathingPhase, string> = {
    inhale: "M 50 150 L 50 50",
    hold: "M 50 50 L 150 50",
    exhale: "M 150 50 L 150 150",
    hold2: "M 150 150 L 50 150",
    rest: "M 50 150 L 50 150",
  };

  return (
    <div className="flex items-center justify-center mb-8" data-testid="breathing-visualizer">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <rect
          x="50"
          y="50"
          width="100"
          height="100"
          fill="transparent"
          stroke="hsl(var(--border))"
          strokeWidth="2"
        />
        <circle r="6" fill="hsl(var(--primary))">
          <animateMotion
            dur={`${phaseDuration * 4}s`}
            repeatCount="indefinite"
            path="M 50 150 L 50 50 L 150 50 L 150 150 Z"
          />
        </circle>
      </svg>
    </div>
  );
}
