import { useState } from "react";
import { MapPin, Utensils, Bed, FileText, History, MapPinned, Tag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import InspectionModal from "./inspection-modal";
import { type EstablishmentWithDetails } from "@shared/schema";

interface EstablishmentCardProps {
  establishment: EstablishmentWithDetails;
}

export default function EstablishmentCard({ establishment }: EstablishmentCardProps) {
  const [showModal, setShowModal] = useState(false);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A": return "grade-a";
      case "B": return "grade-b";
      case "C": return "grade-c";
      default: return "bg-gray-500";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-50 border-red-200 text-red-800";
      case "major": return "bg-orange-50 border-orange-200 text-orange-800";
      case "minor": return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default: return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800";
      case "major": return "bg-orange-100 text-orange-800";
      case "minor": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const isHotel = establishment.businessType === "hotel";

  return (
    <>
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{establishment.name}</h4>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  {establishment.address}, {establishment.city}, {establishment.state} {establishment.zipCode}
                </p>
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  {isHotel ? <Bed className="mr-2 h-4 w-4" /> : <Utensils className="mr-2 h-4 w-4" />}
                  {establishment.businessType === "hotel" ? "Hotel" : `Restaurant - ${establishment.cuisine}`}
                  {isHotel && establishment.businessType === "hotel" && (
                    <>
                      <span className="mx-2">•</span>
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      4.3 (1,250 reviews)
                    </>
                  )}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                {/* Health Grade Badge */}
                <div className={`${getGradeColor(establishment.latestInspection?.grade || "N/A")} text-white px-4 py-2 rounded-lg font-bold text-lg`}>
                  {establishment.latestInspection?.grade || "N/A"}
                </div>
                <div className="text-sm text-gray-600 text-center">
                  <div className="font-semibold">Score: {establishment.latestInspection?.score || "N/A"}/100</div>
                  <div>{establishment.latestInspection?.inspectionDate ? 
                    new Date(establishment.latestInspection.inspectionDate).toLocaleDateString("en-US", { 
                      month: "short", day: "numeric", year: "numeric" 
                    }) : "No recent inspection"
                  }</div>
                </div>
              </div>
            </div>

            {/* Health Certifications for Hotels */}
            {isHotel && establishment.certifications.length > 0 && (
              <div className="mb-4">
                <h5 className="font-semibold text-gray-900 mb-2">Health & Safety Certifications</h5>
                <div className="flex flex-wrap gap-2">
                  {establishment.certifications.map((cert) => (
                    <Badge key={cert.id} variant="secondary" className="bg-green-100 text-green-800">
                      <Tag className="mr-1 h-3 w-3" />
                      {cert.type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-grade-a">{establishment.stats.totalInspections}</div>
                <div className="text-xs text-gray-600">Inspections</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{establishment.stats.violationCount}</div>
                <div className="text-xs text-gray-600">Violations</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-blue">{establishment.stats.avgScore}</div>
                <div className="text-xs text-gray-600">Avg Score</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{establishment.stats.daysSinceInspection}</div>
                <div className="text-xs text-gray-600">Days Ago</div>
              </div>
            </div>

            {/* Recent Violations */}
            {establishment.violations.length > 0 && (
              <div className="mb-4">
                <h5 className="font-semibold text-gray-900 mb-2">Recent Violations (Last Inspection)</h5>
                <div className="space-y-2">
                  {establishment.violations.slice(0, 2).map((violation) => (
                    <div key={violation.id} className={`flex items-center justify-between p-3 border rounded-lg ${getSeverityColor(violation.severity)}`}>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{violation.description}</div>
                        <div className="text-sm text-gray-600">Code: {violation.code} - {violation.points} points deducted</div>
                      </div>
                      <Badge className={getSeverityBadgeColor(violation.severity)}>
                        {violation.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safety Features for Hotels */}
            {isHotel && establishment.safetyFeatures.length > 0 && (
              <div className="mb-4">
                <h5 className="font-semibold text-gray-900 mb-2">Safety Features</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {establishment.safetyFeatures.map((feature) => (
                    <div key={feature.id} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {feature.feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                className="bg-primary-blue text-white hover:bg-blue-700 transition-colors"
                onClick={() => setShowModal(true)}
              >
                <FileText className="mr-2 h-4 w-4" />
                View Full Report
              </Button>
              <Button variant="outline">
                <History className="mr-2 h-4 w-4" />
                Inspection History
              </Button>
              {isHotel ? (
                <Button variant="outline">
                  <Tag className="mr-2 h-4 w-4" />
                  View Certifications
                </Button>
              ) : (
                <Button variant="outline">
                  <MapPinned className="mr-2 h-4 w-4" />
                  View on Map
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inspection Modal */}
      {showModal && establishment.latestInspection && (
        <InspectionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          establishment={establishment}
          inspection={establishment.latestInspection}
          violations={establishment.violations}
        />
      )}
    </>
  );
}
