import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const establishments = pgTable("establishments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  businessType: text("business_type").notNull(), // "restaurant" | "hotel"
  cuisine: text("cuisine"),
  licenseNumber: text("license_number"),
  coordinates: jsonb("coordinates").$type<{ latitude: number; longitude: number }>(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const inspections = pgTable("inspections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  establishmentId: varchar("establishment_id").references(() => establishments.id).notNull(),
  inspectionDate: timestamp("inspection_date").notNull(),
  score: integer("score").notNull(),
  grade: text("grade").notNull(), // "A" | "B" | "C"
  inspectorName: text("inspector_name").notNull(),
  inspectorId: text("inspector_id").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const violations = pgTable("violations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  inspectionId: varchar("inspection_id").references(() => inspections.id).notNull(),
  code: text("code").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull(), // "critical" | "major" | "minor"
  points: integer("points").notNull(),
  resolved: boolean("resolved").default(false),
  resolvedDate: timestamp("resolved_date"),
  category: text("category").notNull(),
});

export const certifications = pgTable("certifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  establishmentId: varchar("establishment_id").references(() => establishments.id).notNull(),
  type: text("type").notNull(),
  authority: text("authority").notNull(),
  issueDate: timestamp("issue_date").notNull(),
  expiryDate: timestamp("expiry_date").notNull(),
  certificateNumber: text("certificate_number"),
});

export const safetyFeatures = pgTable("safety_features", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  establishmentId: varchar("establishment_id").references(() => establishments.id).notNull(),
  feature: text("feature").notNull(),
  description: text("description"),
});

// Insert schemas
export const insertEstablishmentSchema = createInsertSchema(establishments).omit({
  id: true,
  createdAt: true,
});

export const insertInspectionSchema = createInsertSchema(inspections).omit({
  id: true,
  createdAt: true,
});

export const insertViolationSchema = createInsertSchema(violations).omit({
  id: true,
});

export const insertCertificationSchema = createInsertSchema(certifications).omit({
  id: true,
});

export const insertSafetyFeatureSchema = createInsertSchema(safetyFeatures).omit({
  id: true,
});

// Types
export type Establishment = typeof establishments.$inferSelect;
export type InsertEstablishment = z.infer<typeof insertEstablishmentSchema>;
export type Inspection = typeof inspections.$inferSelect;
export type InsertInspection = z.infer<typeof insertInspectionSchema>;
export type Violation = typeof violations.$inferSelect;
export type InsertViolation = z.infer<typeof insertViolationSchema>;
export type Certification = typeof certifications.$inferSelect;
export type InsertCertification = z.infer<typeof insertCertificationSchema>;
export type SafetyFeature = typeof safetyFeatures.$inferSelect;
export type InsertSafetyFeature = z.infer<typeof insertSafetyFeatureSchema>;

// Extended types for API responses
export type EstablishmentWithDetails = Establishment & {
  latestInspection?: Inspection;
  violations: Violation[];
  certifications: Certification[];
  safetyFeatures: SafetyFeature[];
  stats: {
    totalInspections: number;
    avgScore: number;
    violationCount: number;
    daysSinceInspection: number;
  };
};

export type InspectionWithViolations = Inspection & {
  violations: Violation[];
  establishment: Establishment;
};

// Search schema
export const searchSchema = z.object({
  query: z.string().min(1),
  businessType: z.enum(["all", "restaurant", "hotel"]).default("all"),
  grade: z.enum(["all", "A", "B", "C"]).default("all"),
  city: z.string().optional(),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
});

export type SearchParams = z.infer<typeof searchSchema>;
