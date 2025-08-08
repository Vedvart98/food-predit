import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Search establishments
  app.get("/api/establishments/search", async (req, res) => {
    try {
      // Convert string query parameters to proper types
      const queryParams = {
        ...req.query,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
      };
      
      const params = searchSchema.parse(queryParams);
      const results = await storage.getEstablishments(params);
      res.json(results);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid search parameters", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get search suggestions
  app.get("/api/establishments/suggestions", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.json([]);
      }
      
      const suggestions = await storage.getSearchSuggestions(query);
      res.json(suggestions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get establishment by ID
  app.get("/api/establishments/:id", async (req, res) => {
    try {
      const establishment = await storage.getEstablishmentById(req.params.id);
      if (!establishment) {
        return res.status(404).json({ message: "Establishment not found" });
      }
      res.json(establishment);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get inspection history for establishment
  app.get("/api/establishments/:id/inspections", async (req, res) => {
    try {
      const inspections = await storage.getInspectionsByEstablishmentId(req.params.id);
      res.json(inspections);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get detailed inspection by ID
  app.get("/api/inspections/:id", async (req, res) => {
    try {
      const inspection = await storage.getInspectionById(req.params.id);
      if (!inspection) {
        return res.status(404).json({ message: "Inspection not found" });
      }
      res.json(inspection);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
