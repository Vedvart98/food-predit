import { useState } from "react";
import { Shield, X, Code, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [showAbout, setShowAbout] = useState(false);
  const [showAPI, setShowAPI] = useState(false);

  const scrollToSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="text-primary-blue text-2xl" />
              <h1 className="text-xl font-bold text-gray-900">Health Inspector</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={scrollToSearch} className="text-gray-700 hover:text-primary-blue transition-colors">Search</button>
              <button onClick={() => setShowAbout(true)} className="text-gray-700 hover:text-primary-blue transition-colors">About</button>
              <button onClick={() => setShowAPI(true)} className="text-gray-700 hover:text-primary-blue transition-colors">API</button>
            </nav>
          </div>
        </div>
      </header>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Info className="mr-2 h-5 w-5 text-primary-blue" />
                About Health Inspector
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAbout(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Health Inspector provides transparent access to restaurant and hotel health inspection data to help consumers make informed dining and accommodation decisions.
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Search thousands of restaurants and hotels by name or location</li>
                    <li>• View current health grades (A, B, C) and inspection scores</li>
                    <li>• Access detailed violation reports and correction status</li>
                    <li>• Track inspection history and trends over time</li>
                    <li>• View safety certifications and health protocols</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Data Sources</h4>
                  <p className="text-gray-700">
                    Our data comes from official health department APIs and government inspection records, including:
                  </p>
                  <ul className="space-y-1 text-gray-700 mt-2">
                    <li>• UK Food Hygiene Rating Scheme (FHRS)</li>
                    <li>• NYC Department of Health</li>
                    <li>• Local health agencies nationwide</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Understanding Grades</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="grade-a px-3 py-1 rounded mr-3 text-sm font-medium">A</span>
                      <span className="text-gray-700">90-100 points - Excellent food safety standards</span>
                    </div>
                    <div className="flex items-center">
                      <span className="grade-b px-3 py-1 rounded mr-3 text-sm font-medium">B</span>
                      <span className="text-gray-700">80-89 points - Good food safety practices</span>
                    </div>
                    <div className="flex items-center">
                      <span className="grade-c px-3 py-1 rounded mr-3 text-sm font-medium">C</span>
                      <span className="text-gray-700">70-79 points - Acceptable with room for improvement</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Modal */}
      {showAPI && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Code className="mr-2 h-5 w-5 text-primary-blue" />
                API Documentation
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAPI(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <p className="text-gray-700">
                  Access our health inspection data programmatically through our RESTful API endpoints.
                </p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Available Endpoints</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-3">GET</span>
                        <code className="text-sm font-mono">/api/establishments/search</code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Search for restaurants and hotels</p>
                      <div className="text-xs text-gray-500">
                        <strong>Parameters:</strong> query, businessType, grade, city, limit, offset
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-3">GET</span>
                        <code className="text-sm font-mono">/api/establishments/suggestions</code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Get search suggestions</p>
                      <div className="text-xs text-gray-500">
                        <strong>Parameters:</strong> q (query string)
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-3">GET</span>
                        <code className="text-sm font-mono">/api/establishments/:id</code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Get detailed establishment information</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-3">GET</span>
                        <code className="text-sm font-mono">/api/establishments/:id/inspections</code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Get inspection history for an establishment</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Example Response</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-xs"><code>{`{
  "establishments": [{
    "id": "est-1",
    "name": "Mario's Italian Restaurant",
    "address": "123 Main Street",
    "city": "New York",
    "businessType": "restaurant",
    "cuisine": "Italian",
    "latestInspection": {
      "score": 95,
      "grade": "A",
      "inspectionDate": "2025-01-15"
    },
    "stats": {
      "totalInspections": 1,
      "avgScore": 95,
      "violationCount": 2
    }
  }],
  "total": 1
}`}</code></pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Rate Limits</h4>
                  <p className="text-gray-700 text-sm">
                    API is free to use with reasonable limits. For high-volume usage, please contact us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
