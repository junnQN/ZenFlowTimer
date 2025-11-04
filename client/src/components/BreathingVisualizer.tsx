import { type BreathingPhase } from "@shared/schema";
import { useEffect, useState } from "react";

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
  const [phaseProgress, setPhaseProgress] = useState(0);

  useEffect(() => {
    setPhaseProgress(0);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / phaseDuration, 1);
      setPhaseProgress(progress);
    }, 50);

    return () => clearInterval(interval);
  }, [currentPhase, phaseDuration]);

  if (type === "circle") {
    const isExpanding = currentPhase === "inhale";
    const isContracting = currentPhase === "exhale";
    const scale = isExpanding
      ? 1 + phaseProgress * 0.15
      : isContracting
      ? 1.15 - phaseProgress * 0.15
      : 1;
    
    return (
      <div className="flex items-center justify-center mb-8" data-testid="breathing-visualizer">
        <div
          className="w-32 h-32 rounded-full border-2 border-primary/40 transition-transform duration-75"
          style={{
            transform: `scale(${scale})`,
          }}
        />
      </div>
    );
  }

  // Box breathing visualization with phase-synchronized dot movement
  const getBoxPosition = () => {
    const phaseMap: Record<BreathingPhase, { start: [number, number]; end: [number, number] }> = {
      inhale: { start: [50, 150], end: [50, 50] },
      hold: { start: [50, 50], end: [150, 50] },
      exhale: { start: [150, 50], end: [150, 150] },
      hold2: { start: [150, 150], end: [50, 150] },
      rest: { start: [50, 150], end: [50, 150] },
    };

    const positions = phaseMap[currentPhase] || phaseMap.rest;
    const x = positions.start[0] + (positions.end[0] - positions.start[0]) * phaseProgress;
    const y = positions.start[1] + (positions.end[1] - positions.start[1]) * phaseProgress;
    
    return { x, y };
  };

  const position = getBoxPosition();

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
        <circle
          cx={position.x}
          cy={position.y}
          r="6"
          fill="hsl(var(--primary))"
          className="transition-all duration-75"
        />
      </svg>
    </div>
  );
}
