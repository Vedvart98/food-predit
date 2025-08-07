import { X, Download, Printer, Share, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type EstablishmentWithDetails, type Inspection, type Violation } from "@shared/schema";

interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  establishment: EstablishmentWithDetails;
  inspection: Inspection;
  violations: Violation[];
}

export default function InspectionModal({ isOpen, onClose, establishment, inspection, violations }: InspectionModalProps) {
  if (!isOpen) return null;

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A": return "text-grade-a";
      case "B": return "text-grade-b"; 
      case "C": return "text-grade-c";
      default: return "text-gray-500";
    }
  };

  const getViolationBgColor = (severity: string) => {
    switch (severity) {
      case "critical": return "border-red-200 bg-red-50";
      case "major": return "border-orange-200 bg-orange-50";
      case "minor": return "border-yellow-200 bg-yellow-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  const getViolationTitleColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-900";
      case "major": return "text-orange-900";
      case "minor": return "text-yellow-900";
      default: return "text-gray-900";
    }
  };

  const getViolationCodeColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-700";
      case "major": return "text-orange-700";
      case "minor": return "text-yellow-700";
      default: return "text-gray-700";
    }
  };

  const getPointsBadgeColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-200 text-red-800";
      case "major": return "bg-orange-200 text-orange-800";
      case "minor": return "bg-yellow-200 text-yellow-800";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  // Mock inspection categories for display
  const inspectionCategories = [
    { name: "Food Temperature Control", score: 18, maxScore: 20, description: "Proper storage and serving temperatures maintained" },
    { name: "Personal Hygiene", score: 20, maxScore: 20, description: "Staff follows proper hygiene protocols" },
    { name: "Equipment & Facilities", score: 15, maxScore: 20, description: "Minor maintenance issues identified" },
    { name: "Cleanliness", score: 19, maxScore: 20, description: "Excellent cleaning standards maintained" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Detailed Inspection Report</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Establishment Info */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">{establishment.name}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Address:</span>
                <span className="text-gray-600 ml-2">{establishment.address}, {establishment.city}, {establishment.state} {establishment.zipCode}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">License #:</span>
                <span className="text-gray-600 ml-2">{establishment.licenseNumber}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Business Type:</span>
                <span className="text-gray-600 ml-2">{establishment.businessType === "hotel" ? "Hotel" : `Restaurant - ${establishment.cuisine}`}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Inspection Date:</span>
                <span className="text-gray-600 ml-2">
                  {new Date(inspection.inspectionDate).toLocaleDateString("en-US", { 
                    year: "numeric", month: "long", day: "numeric" 
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Overall Score */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-1">Overall Health Score</h5>
                <p className="text-gray-600">Based on comprehensive inspection criteria</p>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getGradeColor(inspection.grade)}`}>{inspection.score}</div>
                <div className={`font-semibold ${getGradeColor(inspection.grade)}`}>Grade {inspection.grade}</div>
              </div>
            </div>
          </div>

          {/* Inspection Categories */}
          <div className="mb-6">
            <h5 className="text-lg font-bold text-gray-900 mb-4">Inspection Categories</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inspectionCategories.map((category, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h6 className="font-semibold text-gray-900">{category.name}</h6>
                    <span className={`font-bold ${category.score >= 18 ? 'text-grade-a' : category.score >= 15 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {category.score}/{category.maxScore}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Violations */}
          {violations.length > 0 && (
            <div className="mb-6">
              <h5 className="text-lg font-bold text-gray-900 mb-4">Violations Found</h5>
              <div className="space-y-4">
                {violations.map((violation) => (
                  <div key={violation.id} className={`border rounded-lg p-4 ${getViolationBgColor(violation.severity)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h6 className={`font-semibold ${getViolationTitleColor(violation.severity)}`}>
                          {violation.severity === "critical" ? "Critical" : violation.severity === "major" ? "Major" : "Minor"} - {violation.category}
                        </h6>
                        <p className={`text-sm ${getViolationCodeColor(violation.severity)}`}>Violation Code: {violation.code}</p>
                      </div>
                      <Badge className={`${getPointsBadgeColor(violation.severity)} px-3 py-1 text-xs font-medium`}>
                        {violation.points} Points
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-3">{violation.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        <Calendar className="inline mr-1 h-4 w-4" />
                        {violation.resolved && violation.resolvedDate ? 
                          `Corrected: ${new Date(violation.resolvedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}` :
                          "Correction pending"
                        }
                      </span>
                      {violation.resolved && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Resolved
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inspector Notes */}
          <div className="mb-6">
            <h5 className="text-lg font-bold text-gray-900 mb-4">Inspector Notes</h5>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-700">{inspection.notes}</p>
              <div className="mt-3 text-sm text-gray-600">
                <span className="font-medium">Inspector:</span> {inspection.inspectorName}, Health Inspector #{inspection.inspectorId}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            <Button className="bg-primary-blue text-white hover:bg-blue-700 transition-colors">
              <Download className="mr-2 h-4 w-4" />
              Download PDF Report
            </Button>
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Printer Report
            </Button>
            <Button variant="outline">
              <Share className="mr-2 h-4 w-4" />
              Share Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
