import { 
  type Establishment, 
  type InsertEstablishment,
  type Inspection,
  type InsertInspection,
  type Violation,
  type InsertViolation,
  type Certification,
  type InsertCertification,
  type SafetyFeature,
  type InsertSafetyFeature,
  type EstablishmentWithDetails,
  type InspectionWithViolations,
  type SearchParams
} from "@shared/schema";
import { randomUUID } from "crypto";
import Fuse from "fuse.js";

export interface IStorage {
  // Establishments
  getEstablishments(params: SearchParams): Promise<{ establishments: EstablishmentWithDetails[]; total: number }>;
  getEstablishmentById(id: string): Promise<EstablishmentWithDetails | undefined>;
  createEstablishment(establishment: InsertEstablishment): Promise<Establishment>;
  
  // Inspections
  getInspectionsByEstablishmentId(establishmentId: string): Promise<InspectionWithViolations[]>;
  getInspectionById(id: string): Promise<InspectionWithViolations | undefined>;
  createInspection(inspection: InsertInspection): Promise<Inspection>;
  
  // Violations
  createViolation(violation: InsertViolation): Promise<Violation>;
  
  // Certifications
  createCertification(certification: InsertCertification): Promise<Certification>;
  
  // Safety Features
  createSafetyFeature(feature: InsertSafetyFeature): Promise<SafetyFeature>;
  
  // Search suggestions
  getSearchSuggestions(query: string): Promise<{ name: string; type: string; address: string }[]>;
}

export class MemStorage implements IStorage {
  private establishments: Map<string, Establishment>;
  private inspections: Map<string, Inspection>;
  private violations: Map<string, Violation>;
  private certifications: Map<string, Certification>;
  private safetyFeatures: Map<string, SafetyFeature>;
  private fuse: Fuse<Establishment>;

  constructor() {
    this.establishments = new Map();
    this.inspections = new Map();
    this.violations = new Map();
    this.certifications = new Map();
    this.safetyFeatures = new Map();
    
    // Initialize with realistic sample data
    this.initializeSampleData();
    this.fuse = new Fuse(Array.from(this.establishments.values()), {
      keys: ['name', 'address', 'city', 'cuisine'],
      threshold: 0.3,
    });
  }

  private initializeSampleData() {
    // Sample establishments
    const establishments = [
      {
        id: "est-1",
        name: "Mario's Italian Restaurant",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        businessType: "restaurant",
        cuisine: "Italian",
        licenseNumber: "NYC-REST-123456",
        coordinates: { latitude: 40.7128, longitude: -74.0060 },
        createdAt: new Date(),
      },
      {
        id: "est-2", 
        name: "Grand Plaza Hotel",
        address: "456 Broadway",
        city: "New York",
        state: "NY",
        zipCode: "10013",
        businessType: "hotel",
        cuisine: null,
        licenseNumber: "NYC-HTL-789012",
        coordinates: { latitude: 40.7183, longitude: -74.0095 },
        createdAt: new Date(),
      },
      {
        id: "est-3",
        name: "Sunrise Cafe",
        address: "789 Brooklyn Ave",
        city: "Brooklyn",
        state: "NY", 
        zipCode: "11201",
        businessType: "restaurant",
        cuisine: "American",
        licenseNumber: "NYC-REST-345678",
        coordinates: { latitude: 40.6892, longitude: -73.9442 },
        createdAt: new Date(),
      },
    ];

    establishments.forEach(est => this.establishments.set(est.id, est));

    // Sample inspections
    const inspections = [
      {
        id: "insp-1",
        establishmentId: "est-1",
        inspectionDate: new Date("2025-01-15"),
        score: 95,
        grade: "A",
        inspectorName: "Sarah Johnson",
        inspectorId: "INS-4521",
        notes: "Overall excellent compliance with food safety regulations. Staff demonstrated good knowledge of proper procedures.",
        createdAt: new Date(),
      },
      {
        id: "insp-2",
        establishmentId: "est-2", 
        inspectionDate: new Date("2024-12-20"),
        score: 98,
        grade: "A",
        inspectorName: "Michael Chen",
        inspectorId: "INS-3892",
        notes: "Exceptional standards maintained throughout facility. No violations found.",
        createdAt: new Date(),
      },
      {
        id: "insp-3",
        establishmentId: "est-3",
        inspectionDate: new Date("2025-01-10"), 
        score: 82,
        grade: "B",
        inspectorName: "Lisa Rodriguez",
        inspectorId: "INS-2847",
        notes: "Several minor violations identified. Management cooperative in addressing issues.",
        createdAt: new Date(),
      },
    ];

    inspections.forEach(insp => this.inspections.set(insp.id, insp));

    // Sample violations
    const violations = [
      {
        id: "viol-1",
        inspectionId: "insp-1",
        code: "08A",
        description: "Hand washing sink not properly stocked with soap and disposable towels in kitchen prep area",
        severity: "critical",
        points: 7,
        resolved: true,
        resolvedDate: new Date("2025-01-16"),
        category: "Personal Hygiene",
      },
      {
        id: "viol-2", 
        inspectionId: "insp-1",
        code: "02A",
        description: "Refrigerated salad ingredients measured at 43°F, slightly above the required 41°F maximum",
        severity: "minor",
        points: 5,
        resolved: true,
        resolvedDate: new Date("2025-01-15"),
        category: "Temperature Control",
      },
      {
        id: "viol-3",
        inspectionId: "insp-3",
        code: "04C",
        description: "Food contact surfaces not properly cleaned and sanitized",
        severity: "major",
        points: 10,
        resolved: true,
        resolvedDate: new Date("2025-01-11"),
        category: "Equipment & Facilities",
      },
    ];

    violations.forEach(viol => this.violations.set(viol.id, viol));

    // Sample certifications
    const certifications = [
      {
        id: "cert-1",
        establishmentId: "est-2",
        type: "ISO 22000 Food Safety",
        authority: "International Standards Organization",
        issueDate: new Date("2024-01-01"),
        expiryDate: new Date("2025-12-31"),
        certificateNumber: "ISO-22000-2024-001",
      },
      {
        id: "cert-2",
        establishmentId: "est-2", 
        type: "COVID-19 Safety Protocols",
        authority: "NYC Department of Health",
        issueDate: new Date("2024-06-01"),
        expiryDate: new Date("2025-05-31"),
        certificateNumber: "COVID-NYC-2024-789",
      },
    ];

    certifications.forEach(cert => this.certifications.set(cert.id, cert));

    // Sample safety features
    const safetyFeatures = [
      {
        id: "sf-1",
        establishmentId: "est-2",
        feature: "HEPA Air Filtration",
        description: "Advanced air filtration system installed throughout facility",
      },
      {
        id: "sf-2",
        establishmentId: "est-2",
        feature: "Enhanced Sanitization",
        description: "Increased frequency cleaning protocols implemented",
      },
      {
        id: "sf-3",
        establishmentId: "est-2",
        feature: "Contactless Check-in",
        description: "Mobile and kiosk check-in options available",
      },
    ];

    safetyFeatures.forEach(sf => this.safetyFeatures.set(sf.id, sf));
  }

  private calculateStats(establishmentId: string): { totalInspections: number; avgScore: number; violationCount: number; daysSinceInspection: number } {
    const establishmentInspections = Array.from(this.inspections.values())
      .filter(insp => insp.establishmentId === establishmentId)
      .sort((a, b) => new Date(b.inspectionDate).getTime() - new Date(a.inspectionDate).getTime());

    const totalInspections = establishmentInspections.length;
    const avgScore = totalInspections > 0 
      ? Math.round(establishmentInspections.reduce((sum, insp) => sum + insp.score, 0) / totalInspections)
      : 0;

    const latestInspection = establishmentInspections[0];
    const violationCount = latestInspection 
      ? Array.from(this.violations.values()).filter(v => v.inspectionId === latestInspection.id).length
      : 0;

    const daysSinceInspection = latestInspection
      ? Math.floor((Date.now() - new Date(latestInspection.inspectionDate).getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    return { totalInspections, avgScore, violationCount, daysSinceInspection };
  }

  private getEstablishmentWithDetails(establishment: Establishment): EstablishmentWithDetails {
    const latestInspections = Array.from(this.inspections.values())
      .filter(insp => insp.establishmentId === establishment.id)
      .sort((a, b) => new Date(b.inspectionDate).getTime() - new Date(a.inspectionDate).getTime());

    const latestInspection = latestInspections[0];
    const violations = latestInspection 
      ? Array.from(this.violations.values()).filter(v => v.inspectionId === latestInspection.id)
      : [];

    const certifications = Array.from(this.certifications.values())
      .filter(cert => cert.establishmentId === establishment.id);

    const safetyFeatures = Array.from(this.safetyFeatures.values())
      .filter(sf => sf.establishmentId === establishment.id);

    const stats = this.calculateStats(establishment.id);

    return {
      ...establishment,
      latestInspection,
      violations,
      certifications,
      safetyFeatures,
      stats,
    };
  }

  async getEstablishments(params: SearchParams): Promise<{ establishments: EstablishmentWithDetails[]; total: number }> {
    let results = Array.from(this.establishments.values());

    // Filter by business type
    if (params.businessType !== "all") {
      results = results.filter(est => est.businessType === params.businessType);
    }

    // Filter by city
    if (params.city) {
      results = results.filter(est => est.city.toLowerCase().includes(params.city!.toLowerCase()));
    }

    // Search by query using Fuse.js
    if (params.query) {
      const fuseResults = this.fuse.search(params.query);
      const searchResultIds = new Set(fuseResults.map(r => r.item.id));
      results = results.filter(est => searchResultIds.has(est.id));
    }

    // Get detailed establishment data
    let establishments = results.map(est => this.getEstablishmentWithDetails(est));

    // Filter by grade
    if (params.grade !== "all") {
      establishments = establishments.filter(est => est.latestInspection?.grade === params.grade);
    }

    // Sort by health score (high to low)
    establishments.sort((a, b) => (b.latestInspection?.score || 0) - (a.latestInspection?.score || 0));

    const total = establishments.length;
    const paginatedResults = establishments.slice(params.offset, params.offset + params.limit);

    return { establishments: paginatedResults, total };
  }

  async getEstablishmentById(id: string): Promise<EstablishmentWithDetails | undefined> {
    const establishment = this.establishments.get(id);
    return establishment ? this.getEstablishmentWithDetails(establishment) : undefined;
  }

  async createEstablishment(insertEstablishment: InsertEstablishment): Promise<Establishment> {
    const id = randomUUID();
    const establishment: Establishment = {
      ...insertEstablishment,
      id,
      cuisine: insertEstablishment.cuisine ?? null,
      licenseNumber: insertEstablishment.licenseNumber ?? null,
      coordinates: insertEstablishment.coordinates ?? null,
      createdAt: new Date(),
    };
    this.establishments.set(id, establishment);
    this.fuse = new Fuse(Array.from(this.establishments.values()), {
      keys: ['name', 'address', 'city', 'cuisine'],
      threshold: 0.3,
    });
    return establishment;
  }

  async getInspectionsByEstablishmentId(establishmentId: string): Promise<InspectionWithViolations[]> {
    const inspections = Array.from(this.inspections.values())
      .filter(insp => insp.establishmentId === establishmentId)
      .sort((a, b) => new Date(b.inspectionDate).getTime() - new Date(a.inspectionDate).getTime());

    const establishment = this.establishments.get(establishmentId);
    if (!establishment) return [];

    return inspections.map(inspection => ({
      ...inspection,
      violations: Array.from(this.violations.values()).filter(v => v.inspectionId === inspection.id),
      establishment,
    }));
  }

  async getInspectionById(id: string): Promise<InspectionWithViolations | undefined> {
    const inspection = this.inspections.get(id);
    if (!inspection) return undefined;

    const establishment = this.establishments.get(inspection.establishmentId);
    if (!establishment) return undefined;

    const violations = Array.from(this.violations.values()).filter(v => v.inspectionId === id);

    return {
      ...inspection,
      violations,
      establishment,
    };
  }

  async createInspection(insertInspection: InsertInspection): Promise<Inspection> {
    const id = randomUUID();
    const inspection: Inspection = {
      ...insertInspection,
      id,
      notes: insertInspection.notes ?? null,
      createdAt: new Date(),
    };
    this.inspections.set(id, inspection);
    return inspection;
  }

  async createViolation(insertViolation: InsertViolation): Promise<Violation> {
    const id = randomUUID();
    const violation: Violation = { 
      ...insertViolation, 
      id,
      resolved: insertViolation.resolved ?? null,
      resolvedDate: insertViolation.resolvedDate ?? null 
    };
    this.violations.set(id, violation);
    return violation;
  }

  async createCertification(insertCertification: InsertCertification): Promise<Certification> {
    const id = randomUUID();
    const certification: Certification = { 
      ...insertCertification, 
      id,
      certificateNumber: insertCertification.certificateNumber ?? null 
    };
    this.certifications.set(id, certification);
    return certification;
  }

  async createSafetyFeature(insertSafetyFeature: InsertSafetyFeature): Promise<SafetyFeature> {
    const id = randomUUID();
    const safetyFeature: SafetyFeature = { 
      ...insertSafetyFeature, 
      id,
      description: insertSafetyFeature.description ?? null 
    };
    this.safetyFeatures.set(id, safetyFeature);
    return safetyFeature;
  }

  async getSearchSuggestions(query: string): Promise<{ name: string; type: string; address: string }[]> {
    if (!query || query.length < 2) return [];

    const results = this.fuse.search(query);
    return results.slice(0, 5).map(result => ({
      name: result.item.name,
      type: result.item.businessType,
      address: `${result.item.address}, ${result.item.city}`,
    }));
  }
}

export const storage = new MemStorage();
