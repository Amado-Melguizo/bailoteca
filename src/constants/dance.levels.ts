import type { DanceData } from "@/interfaces/dance.interface";

export type DanceLevelKey = keyof DanceData;

export const DANCE_LEVELS: DanceLevelKey[] = [
  "foundation",
  "beginner",
  "improver",
  "intermediate",
  "advanced",
];
