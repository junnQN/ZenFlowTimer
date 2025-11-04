import { z } from "zod";

// Meditation preset types
export const presetTypes = {
  COUNTDOWN: "countdown",
  BOX_BREATHING: "box_breathing",
  BREATHING_478: "breathing_478",
  CYCLIC_SIGHING: "cyclic_sighing",
  CUSTOM_INTERVAL: "custom_interval",
} as const;

export type PresetType = typeof presetTypes[keyof typeof presetTypes];

// Breathing phase types
export type BreathingPhase = "inhale" | "hold" | "exhale" | "hold2" | "rest";

// Meditation preset interface
export interface MeditationPreset {
  id: string;
  name: string;
  description: string;
  type: PresetType;
  duration: number; // in seconds
  intervals?: {
    phase: BreathingPhase;
    duration: number;
    instruction: string;
  }[];
  cycles?: number;
}

// User preferences for local storage
export interface UserPreferences {
  lastUsedPreset?: string;
  customDurations: number[];
  soundEnabled: boolean;
}

// Session state
export interface TimerSession {
  presetId: string;
  startTime: number;
  duration: number;
  isActive: boolean;
  isPaused: boolean;
  currentPhase?: BreathingPhase;
  currentCycle?: number;
}

// Zod schemas for validation
export const meditationPresetSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum([
    presetTypes.COUNTDOWN,
    presetTypes.BOX_BREATHING,
    presetTypes.BREATHING_478,
    presetTypes.CYCLIC_SIGHING,
    presetTypes.CUSTOM_INTERVAL,
  ]),
  duration: z.number().positive(),
  intervals: z.array(z.object({
    phase: z.enum(["inhale", "hold", "exhale", "hold2", "rest"]),
    duration: z.number().positive(),
    instruction: z.string(),
  })).optional(),
  cycles: z.number().positive().optional(),
});

export const userPreferencesSchema = z.object({
  lastUsedPreset: z.string().optional(),
  customDurations: z.array(z.number().positive()),
  soundEnabled: z.boolean(),
});

export type InsertMeditationPreset = z.infer<typeof meditationPresetSchema>;
export type InsertUserPreferences = z.infer<typeof userPreferencesSchema>;
