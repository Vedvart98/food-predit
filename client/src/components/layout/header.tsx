import { Shield } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Shield className="text-primary-blue text-2xl" />
            <h1 className="text-xl font-bold text-gray-900">Health Inspector</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-primary-blue transition-colors">Search</a>
            <a href="#" className="text-gray-700 hover:text-primary-blue transition-colors">About</a>
            <a href="#" className="text-gray-700 hover:text-primary-blue transition-colors">API</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
