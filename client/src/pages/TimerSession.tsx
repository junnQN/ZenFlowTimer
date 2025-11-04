import { useEffect } from "react";
import { CircularTimer } from "@/components/CircularTimer";
import { TimerControls } from "@/components/TimerControls";
import { BreathingVisualizer } from "@/components/BreathingVisualizer";
import { AmbientSoundControl } from "@/components/AmbientSoundControl";
import { useTimer } from "@/hooks/useTimer";
import { useAmbientSound } from "@/hooks/useAmbientSound";
import { type MeditationPreset } from "@shared/schema";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimerSessionProps {
  preset: MeditationPreset;
  onBack: () => void;
}

export default function TimerSession({ preset, onBack }: TimerSessionProps) {
  const timer = useTimer({
    preset,
    onComplete: () => {
      setTimeout(() => {
        onBack();
      }, 2000);
    },
  });

  const ambient = useAmbientSound();

  useEffect(() => {
    if (timer.isActive && !timer.isPaused) {
      ambient.play();
    } else {
      ambient.pause();
    }
  }, [timer.isActive, timer.isPaused]);

  useEffect(() => {
    return () => {
      ambient.stop();
    };
  }, []);

  const hasBreathingPattern = preset.intervals && preset.intervals.length > 0;
  const showBoxVisualizer = preset.type === "box_breathing" && timer.isActive;
  const showCircleVisualizer =
    (preset.type === "breathing_478" || 
     preset.type === "cyclic_sighing" || 
     preset.type === "diaphragmatic" || 
     preset.type === "alternate_nostril") &&
    timer.isActive;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={timer.isActive ? timer.reset : onBack}
          data-testid="button-nav-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-xl font-normal tracking-wide mb-2">
              {preset.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {preset.description}
            </p>
          </div>

          {showBoxVisualizer && timer.currentPhase && (
            <BreathingVisualizer
              currentPhase={timer.currentPhase}
              phaseDuration={
                preset.intervals?.find((i) => i.phase === timer.currentPhase)
                  ?.duration || 4
              }
              type="box"
            />
          )}

          {showCircleVisualizer && timer.currentPhase && (
            <BreathingVisualizer
              currentPhase={timer.currentPhase}
              phaseDuration={
                preset.intervals?.find((i) => i.phase === timer.currentPhase)
                  ?.duration || 4
              }
              type="circle"
            />
          )}

          <div className="mb-12">
            <CircularTimer
              timeRemaining={timer.timeRemaining}
              totalDuration={preset.duration}
              currentPhase={timer.currentPhase}
              phaseInstruction={timer.phaseInstruction}
              isActive={timer.isActive}
              isPaused={timer.isPaused}
            />
          </div>

          <TimerControls
            isActive={timer.isActive}
            isPaused={timer.isPaused}
            onStart={timer.start}
            onPause={timer.pause}
            onResume={timer.resume}
            onReset={timer.reset}
            onBack={onBack}
          />

          {hasBreathingPattern && preset.cycles && timer.isActive && (
            <div className="mt-12 text-center" data-testid="cycle-indicator">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Cycle {timer.currentCycle} of {preset.cycles}
              </p>
            </div>
          )}

          {!timer.isActive && (
            <div className="mt-12 w-full">
              <AmbientSoundControl
                currentSound={ambient.currentSound}
                onSoundChange={ambient.setCurrentSound}
                volume={ambient.volume}
                onVolumeChange={ambient.setVolume}
                isPlaying={ambient.isPlaying}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
