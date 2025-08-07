import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SearchSection from "@/components/search-section";
import SearchResults from "@/components/search-results";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useState({
    query: "",
    businessType: "all" as "all" | "restaurant" | "hotel",
    grade: "all" as "all" | "A" | "B" | "C",
    city: "",
    limit: 10,
    offset: 0,
  });

  const handleSearch = (params: typeof searchParams) => {
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchSection 
        onSearch={handleSearch} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {searchParams.query && (
        <SearchResults searchParams={searchParams} onUpdateParams={setSearchParams} />
      )}
      <Footer />
    </div>
  );
}
