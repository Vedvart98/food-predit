import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="text-primary-blue text-xl" />
              <h3 className="text-lg font-bold">Health Inspector</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Providing transparent access to restaurant and hotel health inspection data to help consumers make informed decisions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Data Sources</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">UK FHRS API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">NYC Health Dept</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Local Health Agencies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Understanding Ratings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Food Safety Tips</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Report Issues</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Data Accuracy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Health Inspector. All rights reserved. Data provided by government health agencies.</p>
        </div>
      </div>
    </footer>
  );
}
