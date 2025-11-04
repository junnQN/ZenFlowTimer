import { type UserPreferences, type InsertUserPreferences } from "@shared/schema";

export interface IStorage {
  getUserPreferences(userId: string): Promise<UserPreferences | undefined>;
  saveUserPreferences(userId: string, preferences: InsertUserPreferences): Promise<UserPreferences>;
}

export class MemStorage implements IStorage {
  private preferences: Map<string, UserPreferences>;

  constructor() {
    this.preferences = new Map();
  }

  async getUserPreferences(userId: string): Promise<UserPreferences | undefined> {
    return this.preferences.get(userId);
  }

  async saveUserPreferences(
    userId: string,
    preferences: InsertUserPreferences
  ): Promise<UserPreferences> {
    this.preferences.set(userId, preferences);
    return preferences;
  }
}

export const storage = new MemStorage();
