import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface SearchSuggestion {
  name: string;
  type: string;
  address: string;
}

interface SearchSectionProps {
  onSearch: (params: {
    query: string;
    businessType: "all" | "restaurant" | "hotel";
    grade: "all" | "A" | "B" | "C";
    city: string;
    limit: number;
    offset: number;
  }) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchSection({ onSearch, searchQuery, setSearchQuery }: SearchSectionProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: suggestions = [] } = useQuery<SearchSuggestion[]>({
    queryKey: ['/api/establishments/suggestions', { q: searchQuery }],
    enabled: searchQuery.length >= 2,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length >= 2);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch({
        query: searchQuery.trim(),
        businessType: "all",
        grade: "all", 
        city: "",
        limit: 10,
        offset: 0,
      });
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    onSearch({
      query: suggestion.name,
      businessType: "all",
      grade: "all",
      city: "",
      limit: 10,
      offset: 0,
    });
  };

  const popularSearches = ["McDonald's", "Marriott Hotels", "Starbucks", "Hilton"];

  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Restaurant & Hotel Health Ratings</h2>
        <p className="text-xl text-gray-600 mb-8">Get instant access to health inspection scores, violations, and food safety certifications</p>
        
        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Enter restaurant or hotel name..." 
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-primary-blue focus:outline-none transition-colors pl-14"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <Button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
          
          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-2 shadow-lg z-10">
              <div className="p-2">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded flex items-center"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.type === 'restaurant' ? (
                      <span className="mr-3">🍽️</span>
                    ) : (
                      <span className="mr-3">🏨</span>
                    )}
                    <div className="text-left">
                      <div className="font-medium">{suggestion.name}</div>
                      <div className="text-sm text-gray-600">{suggestion.address}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="text-sm text-gray-500">Popular searches:</span>
          {popularSearches.map((search) => (
            <button 
              key={search}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
              onClick={() => {
                setSearchQuery(search);
                onSearch({
                  query: search,
                  businessType: "all",
                  grade: "all",
                  city: "",
                  limit: 10,
                  offset: 0,
                });
              }}
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
