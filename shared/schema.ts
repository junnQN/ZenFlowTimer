import { sql } from "drizzle-orm";
import { pgTable, varchar, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Database tables
export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  presetId: text("preset_id").notNull(),
  presetName: text("preset_name").notNull(),
  presetType: text("preset_type").notNull(),
  duration: integer("duration").notNull(),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const customPresets = pgTable("custom_presets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  duration: integer("duration").notNull(),
  intervals: text("intervals"),
  cycles: integer("cycles"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Drizzle schemas
export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  completedAt: true,
});

export const insertCustomPresetSchema = createInsertSchema(customPresets).omit({
  id: true,
  createdAt: true,
}).extend({
  intervals: z.string().nullable().optional(),
  cycles: z.number().nullable().optional(),
});

export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type CustomPreset = typeof customPresets.$inferSelect;
export type InsertCustomPreset = z.infer<typeof insertCustomPresetSchema>;

// Meditation preset types
export const presetTypes = {
  COUNTDOWN: "countdown",
  BOX_BREATHING: "box_breathing",
  BREATHING_478: "breathing_478",
  CYCLIC_SIGHING: "cyclic_sighing",
  DIAPHRAGMATIC: "diaphragmatic",
  ALTERNATE_NOSTRIL: "alternate_nostril",
  BODY_SCAN: "body_scan",
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
    presetTypes.DIAPHRAGMATIC,
    presetTypes.ALTERNATE_NOSTRIL,
    presetTypes.BODY_SCAN,
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
