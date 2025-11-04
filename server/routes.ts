import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSessionSchema, insertCustomPresetSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session history endpoints
  app.post("/api/sessions", async (req, res) => {
    try {
      const validatedSession = insertSessionSchema.parse(req.body);
      const saved = await storage.createSession(validatedSession);
      res.json(saved);
    } catch (error) {
      res.status(400).json({ error: "Invalid session data" });
    }
  });

  app.get("/api/sessions", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const sessions = await storage.getSessions(limit);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sessions" });
    }
  });

  app.get("/api/sessions/stats", async (req, res) => {
    try {
      const stats = await storage.getSessionStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Custom presets endpoints
  app.post("/api/custom-presets", async (req, res) => {
    try {
      const validatedPreset = insertCustomPresetSchema.parse(req.body);
      const saved = await storage.createCustomPreset(validatedPreset);
      res.json(saved);
    } catch (error) {
      res.status(400).json({ error: "Invalid preset data" });
    }
  });

  app.get("/api/custom-presets", async (req, res) => {
    try {
      const presets = await storage.getCustomPresets();
      res.json(presets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch custom presets" });
    }
  });

  app.delete("/api/custom-presets/:id", async (req, res) => {
    try {
      await storage.deleteCustomPreset(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete preset" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
