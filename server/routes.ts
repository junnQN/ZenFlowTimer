import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { userPreferencesSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/preferences", async (req, res) => {
    try {
      const userId = "default-user";
      const preferences = await storage.getUserPreferences(userId);
      
      if (!preferences) {
        return res.json({
          customDurations: [300, 600, 900, 1200, 1500],
          soundEnabled: true,
        });
      }
      
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch preferences" });
    }
  });

  app.post("/api/preferences", async (req, res) => {
    try {
      const userId = "default-user";
      const validatedPreferences = userPreferencesSchema.parse(req.body);
      const saved = await storage.saveUserPreferences(userId, validatedPreferences);
      res.json(saved);
    } catch (error) {
      res.status(400).json({ error: "Invalid preferences data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
