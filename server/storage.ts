import { sessions, customPresets, type Session, type InsertSession, type CustomPreset, type InsertCustomPreset } from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // Session history
  createSession(session: InsertSession): Promise<Session>;
  getSessions(limit?: number): Promise<Session[]>;
  getSessionStats(): Promise<{
    totalSessions: number;
    totalMinutes: number;
    currentStreak: number;
    longestStreak: number;
  }>;
  
  // Custom presets
  createCustomPreset(preset: InsertCustomPreset): Promise<CustomPreset>;
  getCustomPresets(): Promise<CustomPreset[]>;
  deleteCustomPreset(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createSession(insertSession: InsertSession): Promise<Session> {
    const [session] = await db
      .insert(sessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async getSessions(limit: number = 100): Promise<Session[]> {
    return await db
      .select()
      .from(sessions)
      .orderBy(desc(sessions.completedAt))
      .limit(limit);
  }

  async getSessionStats() {
    const allSessions = await db
      .select()
      .from(sessions)
      .orderBy(desc(sessions.completedAt));

    const totalSessions = allSessions.length;
    const totalMinutes = allSessions.reduce((sum, s) => sum + Math.floor(s.duration / 60), 0);

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate: Date | null = null;

    const uniqueDates = new Set<string>();
    allSessions.forEach(session => {
      const dateStr = session.completedAt.toISOString().split('T')[0];
      uniqueDates.add(dateStr);
    });

    const sortedDates = Array.from(uniqueDates).sort().reverse();
    
    for (let i = 0; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i]);
      
      if (i === 0) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const sessionDate = new Date(currentDate);
        sessionDate.setHours(0, 0, 0, 0);
        
        const diffDays = Math.floor((today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0 || diffDays === 1) {
          currentStreak = 1;
          tempStreak = 1;
        } else {
          currentStreak = 0;
        }
      } else {
        const prevDate = new Date(sortedDates[i - 1]);
        const dayDiff = Math.floor((prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (dayDiff === 1) {
          tempStreak++;
          if (i === 1 || currentStreak > 0) {
            currentStreak = tempStreak;
          }
        } else {
          tempStreak = 1;
        }
        
        longestStreak = Math.max(longestStreak, tempStreak);
      }
    }
    
    longestStreak = Math.max(longestStreak, currentStreak);

    return {
      totalSessions,
      totalMinutes,
      currentStreak,
      longestStreak,
    };
  }

  async createCustomPreset(insertPreset: InsertCustomPreset): Promise<CustomPreset> {
    const [preset] = await db
      .insert(customPresets)
      .values(insertPreset)
      .returning();
    return preset;
  }

  async getCustomPresets(): Promise<CustomPreset[]> {
    return await db
      .select()
      .from(customPresets)
      .orderBy(desc(customPresets.createdAt));
  }

  async deleteCustomPreset(id: string): Promise<void> {
    await db.delete(customPresets).where(eq(customPresets.id, id));
  }
}

export const storage = new DatabaseStorage();
