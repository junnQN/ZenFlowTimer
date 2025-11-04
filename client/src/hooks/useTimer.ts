import { useState, useEffect, useRef, useCallback } from "react";
import { type MeditationPreset, type BreathingPhase } from "@shared/schema";

interface UseTimerOptions {
  preset: MeditationPreset;
  onComplete: () => void;
}

interface TimerState {
  timeRemaining: number;
  isActive: boolean;
  isPaused: boolean;
  currentPhase?: BreathingPhase;
  phaseInstruction?: string;
  currentCycle: number;
}

export function useTimer({ preset, onComplete }: UseTimerOptions) {
  const [state, setState] = useState<TimerState>({
    timeRemaining: preset.duration,
    isActive: false,
    isPaused: false,
    currentCycle: 1,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseTimerRef = useRef<number>(0);
  const currentPhaseIndexRef = useRef<number>(0);

  const playSound = useCallback((frequency: number, duration: number) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.log("Audio not available");
    }
  }, []);

  const updateBreathingPhase = useCallback(() => {
    if (!preset.intervals || preset.intervals.length === 0) return;

    const currentInterval = preset.intervals[currentPhaseIndexRef.current];
    
    setState((prev) => ({
      ...prev,
      currentPhase: currentInterval.phase,
      phaseInstruction: currentInterval.instruction,
    }));

    playSound(440, 150);

    phaseTimerRef.current = currentInterval.duration;
  }, [preset.intervals, playSound]);

  const start = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isActive: true,
      isPaused: false,
      timeRemaining: preset.duration,
      currentCycle: 1,
    }));

    if (preset.intervals && preset.intervals.length > 0) {
      currentPhaseIndexRef.current = 0;
      updateBreathingPhase();
    }

    playSound(528, 300);
  }, [preset.duration, preset.intervals, updateBreathingPhase, playSound]);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: true }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: false }));
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setState({
      timeRemaining: preset.duration,
      isActive: false,
      isPaused: false,
      currentCycle: 1,
    });
    currentPhaseIndexRef.current = 0;
    phaseTimerRef.current = 0;
  }, [preset.duration]);

  useEffect(() => {
    if (state.isActive && !state.isPaused) {
      intervalRef.current = setInterval(() => {
        setState((prev) => {
          const newTimeRemaining = prev.timeRemaining - 1;

          if (newTimeRemaining <= 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            playSound(660, 500);
            setTimeout(() => onComplete(), 500);
            return { ...prev, timeRemaining: 0, isActive: false };
          }

          return { ...prev, timeRemaining: newTimeRemaining };
        });

        if (preset.intervals && preset.intervals.length > 0) {
          phaseTimerRef.current -= 1;

          if (phaseTimerRef.current <= 0) {
            currentPhaseIndexRef.current =
              (currentPhaseIndexRef.current + 1) % preset.intervals.length;

            if (currentPhaseIndexRef.current === 0) {
              setState((prev) => ({
                ...prev,
                currentCycle: prev.currentCycle + 1,
              }));
            }

            updateBreathingPhase();
          }
        }
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [state.isActive, state.isPaused, preset.intervals, updateBreathingPhase, onComplete, playSound]);

  return {
    ...state,
    start,
    pause,
    resume,
    reset,
  };
}
