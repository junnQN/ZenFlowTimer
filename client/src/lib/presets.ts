import { type MeditationPreset, presetTypes } from "@shared/schema";

export const meditationPresets: MeditationPreset[] = [
  {
    id: "countdown-5",
    name: "Quick Session",
    description: "5 minute mindful meditation",
    type: presetTypes.COUNTDOWN,
    duration: 300,
  },
  {
    id: "countdown-10",
    name: "Standard",
    description: "10 minute practice",
    type: presetTypes.COUNTDOWN,
    duration: 600,
  },
  {
    id: "countdown-15",
    name: "Deep Session",
    description: "15 minute meditation",
    type: presetTypes.COUNTDOWN,
    duration: 900,
  },
  {
    id: "countdown-20",
    name: "Extended",
    description: "20 minute deep practice",
    type: presetTypes.COUNTDOWN,
    duration: 1200,
  },
  {
    id: "countdown-25",
    name: "Long Practice",
    description: "25 minute meditation",
    type: presetTypes.COUNTDOWN,
    duration: 1500,
  },
  {
    id: "box-breathing",
    name: "Box Breathing",
    description: "4-4-4-4 pattern for focus",
    type: presetTypes.BOX_BREATHING,
    duration: 300,
    cycles: 10,
    intervals: [
      { phase: "inhale", duration: 4, instruction: "Breathe in" },
      { phase: "hold", duration: 4, instruction: "Hold" },
      { phase: "exhale", duration: 4, instruction: "Breathe out" },
      { phase: "hold2", duration: 4, instruction: "Hold" },
    ],
  },
  {
    id: "breathing-478",
    name: "4-7-8 Breathing",
    description: "For relaxation & sleep",
    type: presetTypes.BREATHING_478,
    duration: 240,
    cycles: 8,
    intervals: [
      { phase: "inhale", duration: 4, instruction: "Breathe in" },
      { phase: "hold", duration: 7, instruction: "Hold" },
      { phase: "exhale", duration: 8, instruction: "Breathe out" },
    ],
  },
  {
    id: "cyclic-sighing",
    name: "Cyclic Sighing",
    description: "Fast stress relief",
    type: presetTypes.CYCLIC_SIGHING,
    duration: 300,
    cycles: 20,
    intervals: [
      { phase: "inhale", duration: 2, instruction: "Double inhale" },
      { phase: "exhale", duration: 8, instruction: "Long exhale" },
      { phase: "rest", duration: 2, instruction: "Rest" },
    ],
  },
  {
    id: "diaphragmatic",
    name: "Belly Breathing",
    description: "Deep diaphragmatic breath",
    type: presetTypes.DIAPHRAGMATIC,
    duration: 360,
    cycles: 12,
    intervals: [
      { phase: "inhale", duration: 5, instruction: "Deep belly inhale" },
      { phase: "hold", duration: 2, instruction: "Gentle hold" },
      { phase: "exhale", duration: 6, instruction: "Slow belly exhale" },
      { phase: "rest", duration: 2, instruction: "Natural pause" },
    ],
  },
  {
    id: "alternate-nostril",
    name: "Nadi Shodhana",
    description: "Alternate nostril balance",
    type: presetTypes.ALTERNATE_NOSTRIL,
    duration: 420,
    cycles: 10,
    intervals: [
      { phase: "inhale", duration: 4, instruction: "Inhale left nostril" },
      { phase: "hold", duration: 4, instruction: "Hold both" },
      { phase: "exhale", duration: 4, instruction: "Exhale right nostril" },
      { phase: "rest", duration: 2, instruction: "Rest" },
      { phase: "inhale", duration: 4, instruction: "Inhale right nostril" },
      { phase: "hold", duration: 4, instruction: "Hold both" },
      { phase: "exhale", duration: 4, instruction: "Exhale left nostril" },
      { phase: "rest", duration: 2, instruction: "Rest" },
    ],
  },
  {
    id: "body-scan",
    name: "Body Scan",
    description: "Guided body awareness",
    type: presetTypes.BODY_SCAN,
    duration: 600,
    cycles: 1,
    intervals: [
      { phase: "rest", duration: 30, instruction: "Feet and toes" },
      { phase: "rest", duration: 30, instruction: "Ankles and calves" },
      { phase: "rest", duration: 30, instruction: "Knees and thighs" },
      { phase: "rest", duration: 40, instruction: "Hips and lower back" },
      { phase: "rest", duration: 40, instruction: "Abdomen and chest" },
      { phase: "rest", duration: 30, instruction: "Hands and fingers" },
      { phase: "rest", duration: 30, instruction: "Arms and shoulders" },
      { phase: "rest", duration: 40, instruction: "Neck and throat" },
      { phase: "rest", duration: 40, instruction: "Face and head" },
      { phase: "rest", duration: 60, instruction: "Whole body awareness" },
      { phase: "rest", duration: 30, instruction: "Complete relaxation" },
    ],
  },
];

export function getPresetById(id: string): MeditationPreset | undefined {
  return meditationPresets.find((preset) => preset.id === id);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  if (mins === 0) return `${seconds}s`;
  return `${mins}m`;
}
