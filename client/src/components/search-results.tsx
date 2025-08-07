import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import EstablishmentCard from "./establishment-card";
import { type EstablishmentWithDetails } from "@shared/schema";

interface SearchResultsProps {
  searchParams: {
    query: string;
    businessType: "all" | "restaurant" | "hotel";
    grade: "all" | "A" | "B" | "C";
    city: string;
    limit: number;
    offset: number;
  };
  onUpdateParams: (params: SearchResultsProps['searchParams']) => void;
}

interface SearchResponse {
  establishments: EstablishmentWithDetails[];
  total: number;
}

export default function SearchResults({ searchParams, onUpdateParams }: SearchResultsProps) {
  const { data, isLoading } = useQuery<SearchResponse>({
    queryKey: ['/api/establishments/search', searchParams],
  });

  const handleSortChange = (sortBy: string) => {
    // Sort is handled server-side, but we can implement different sort options here
    console.log('Sort by:', sortBy);
  };

  const handleGradeFilter = (grade: "all" | "A" | "B" | "C") => {
    onUpdateParams({ ...searchParams, grade, offset: 0 });
  };

  const handlePageChange = (newOffset: number) => {
    onUpdateParams({ ...searchParams, offset: newOffset });
  };

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.establishments.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No establishments found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters.</p>
        </div>
      </section>
    );
  }

  const currentPage = Math.floor(searchParams.offset / searchParams.limit) + 1;
  const totalPages = Math.ceil(data.total / searchParams.limit);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Results Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Found {data.total} establishments for "{searchParams.query}"
        </h3>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select defaultValue="score" onValueChange={handleSortChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Health Score (High to Low)</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="date">Inspection Date (Recent)</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Filter:</span>
            <Button
              variant={searchParams.grade === "A" ? "default" : "outline"}
              size="sm"
              className={searchParams.grade === "A" ? "grade-a" : ""}
              onClick={() => handleGradeFilter("A")}
            >
              Grade A
            </Button>
            <Button
              variant={searchParams.grade === "B" ? "default" : "outline"}
              size="sm"
              className={searchParams.grade === "B" ? "grade-b" : ""}
              onClick={() => handleGradeFilter("B")}
            >
              Grade B
            </Button>
            <Button
              variant={searchParams.grade === "C" ? "default" : "outline"}
              size="sm"
              className={searchParams.grade === "C" ? "grade-c" : ""}
              onClick={() => handleGradeFilter("C")}
            >
              Grade C
            </Button>
            {searchParams.grade !== "all" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGradeFilter("all")}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid gap-6 mb-6">
        {data.establishments.map((establishment) => (
          <EstablishmentCard key={establishment.id} establishment={establishment} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{searchParams.offset + 1}</span> to{" "}
            <span className="font-medium">{Math.min(searchParams.offset + searchParams.limit, data.total)}</span> of{" "}
            <span className="font-medium">{data.total}</span> results
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(searchParams.offset - searchParams.limit)}
            >
              Previous
            </Button>
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  className={currentPage === pageNum ? "bg-primary-blue" : ""}
                  onClick={() => handlePageChange((pageNum - 1) * searchParams.limit)}
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(searchParams.offset + searchParams.limit)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
