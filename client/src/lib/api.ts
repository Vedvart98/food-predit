import { apiRequest } from "./queryClient";
import { type SearchParams, type EstablishmentWithDetails } from "@shared/schema";

export async function searchEstablishments(params: SearchParams) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  const response = await apiRequest("GET", `/api/establishments/search?${searchParams}`);
  return response.json();
}

export async function getSearchSuggestions(query: string) {
  const response = await apiRequest("GET", `/api/establishments/suggestions?q=${encodeURIComponent(query)}`);
  return response.json();
}

export async function getEstablishmentById(id: string): Promise<EstablishmentWithDetails> {
  const response = await apiRequest("GET", `/api/establishments/${id}`);
  return response.json();
}

export async function getInspectionHistory(establishmentId: string) {
  const response = await apiRequest("GET", `/api/establishments/${establishmentId}/inspections`);
  return response.json();
}

export async function getInspectionDetails(inspectionId: string) {
  const response = await apiRequest("GET", `/api/inspections/${inspectionId}`);
  return response.json();
}
