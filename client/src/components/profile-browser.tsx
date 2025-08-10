import { memo, useCallback, useState, useMemo } from "react";
import { useSpiritualContext } from "@/contexts/spiritual-context";
import SpiritualFilterSidebar from "@/components/spiritual-filter-sidebar";
import ProfileCard from "@/components/profile-card";
import PremiumBenefits from "@/components/premium-benefits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, X, Filter, CheckCircle, Clock, MapPin, Users } from "lucide-react";
import type { UserProfile } from "@shared/schema";
import type { ProfileFilter } from "@/types/profile";

interface QuickFilter {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
  active: boolean;
}

const ProfileBrowser = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuickFilters, setActiveQuickFilters] = useState<Set<string>>(new Set());
  
  // Safely get spiritual context
  const { searchResults, isSearching, clearSearch, filters: contextFilters, setFilters } = useSpiritualContext();

  // Quick filter definitions
  const quickFilters: QuickFilter[] = useMemo(() => [
    {
      id: "verified",
      label: "Verified",
      icon: <CheckCircle className="w-3 h-3" />,
      count: searchResults.filter(p => p.verified).length,
      active: contextFilters.verified || false
    },
    {
      id: "recent",
      label: "Just Joined",
      icon: <Clock className="w-3 h-3" />,
      count: searchResults.filter(p => {
        const joinDate = new Date(p.createdAt || Date.now());
        const now = new Date();
        const daysDiff = (now.getTime() - joinDate.getTime()) / (1000 * 3600 * 24);
        return daysDiff <= 30;
      }).length,
      active: activeQuickFilters.has("recent")
    },
    {
      id: "nearby",
      label: "Nearby",
      icon: <MapPin className="w-3 h-3" />,
      count: searchResults.filter(p => p.city === "Mumbai" || p.city === "Delhi").length, // Example logic
      active: activeQuickFilters.has("nearby")
    },
    {
      id: "withPhoto",
      label: "With Photo",
      icon: <Users className="w-3 h-3" />,
      count: searchResults.filter(p => p.profilePicture).length,
      active: contextFilters.withPhoto || false
    }
  ], [searchResults, activeQuickFilters, contextFilters]);

  // Filter profiles based on search query and quick filters
  const filteredProfiles = useMemo(() => {
    let filtered = [...searchResults];

    // Apply search query filter (name or ID)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(profile => {
        const matchesId = profile.id.toLowerCase().includes(query);
        const matchesName = profile.name?.toLowerCase().includes(query) || false;
        const matchesUsername = profile.username?.toLowerCase().includes(query) || false;
        return matchesId || matchesName || matchesUsername;
      });
    }

    // Apply quick filters (verified and withPhoto are handled by spiritual context)
    if (activeQuickFilters.has("recent")) {
      filtered = filtered.filter(p => {
        const joinDate = new Date(p.createdAt || Date.now());
        const now = new Date();
        const daysDiff = (now.getTime() - joinDate.getTime()) / (1000 * 3600 * 24);
        return daysDiff <= 30;
      });
    }
    if (activeQuickFilters.has("nearby")) {
      filtered = filtered.filter(p => p.city === "Mumbai" || p.city === "Delhi");
    }

    return filtered;
  }, [searchResults, searchQuery, activeQuickFilters]);

  const toggleQuickFilter = useCallback((filterId: string) => {
    if (filterId === "verified" || filterId === "withPhoto") {
      // For verified and withPhoto, update the spiritual context instead
      const { setFilters } = useSpiritualContext();
      setFilters({
        ...contextFilters,
        [filterId]: filterId === "verified" ? !contextFilters.verified : !contextFilters.withPhoto
      });
    } else {
      // For other quick filters, use local state
      setActiveQuickFilters(prev => {
        const newSet = new Set(prev);
        if (newSet.has(filterId)) {
          newSet.delete(filterId);
        } else {
          newSet.add(filterId);
        }
        return newSet;
      });
    }
  }, [contextFilters]);

  const clearQuickFilters = useCallback(() => {
    setSearchQuery("");
    setActiveQuickFilters(new Set());
    // Also clear verified and withPhoto from spiritual context
    setFilters({
      ...contextFilters,
      verified: false,
      withPhoto: false
    });
  }, [contextFilters, setFilters]);

  const clearAllFilters = useCallback(() => {
    setSearchQuery("");
    setActiveQuickFilters(new Set());
    clearSearch();
    // Also trigger the spiritual context clear to ensure all filters are reset
    window.dispatchEvent(new CustomEvent('clearAllSpiritualFilters'));
  }, [clearSearch]);

  const hasActiveFilters = useMemo(() => {
    // Check search query
    if (searchQuery.trim()) return true;
    
    // Check quick filters (excluding verified and withPhoto since they're in context)
    if (activeQuickFilters.size > 0) return true;
    
    // Check context filters comprehensively
    return Object.entries(contextFilters).some(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      
      return value !== undefined && value !== null && value !== "" && value !== false;
    });
  }, [searchQuery, activeQuickFilters, contextFilters]);

  return (
    <div className="flex flex-1 bg-gradient-to-br from-orange-50/30 via-white to-rose-50/30 min-h-screen">
      {/* Left Sidebar - Filters */}
      <div className="w-80 bg-white shadow-lg border-r border-gradient-to-b from-orange-100/50 to-rose-100/50">
        <SpiritualFilterSidebar />
      </div>

      {/* Center - Profile Grid */}
      <div className="flex-1 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-orange-100/50">
              {/* Title and Search */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent mb-2">
                    Find Your Perfect Match
                  </h1>
                  <p className="text-gray-600 font-medium">
                    {isSearching ? (
                      "Searching..."
                    ) : (
                      <>
                        {filteredProfiles.length > 0 
                          ? `${filteredProfiles.length} profile${filteredProfiles.length === 1 ? '' : 's'} found` 
                          : "No profiles match your criteria"
                        }
                        {searchResults.length !== filteredProfiles.length && (
                          <span className="text-orange-600 ml-1">
                            (filtered from {searchResults.length})
                          </span>
                        )}
                      </>
                    )}
                  </p>
                </div>

                {/* Search by Name/ID */}
                <div className="relative lg:w-80">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 h-11 bg-white border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-r-xl transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Filter className="w-4 h-4" />
                  Quick Filters:
                </div>
                
                {quickFilters.map((filter) => (
                  <Badge
                    key={filter.id}
                    variant={filter.active ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      filter.active 
                        ? "bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white border-0" 
                        : "border-orange-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                    onClick={() => toggleQuickFilter(filter.id)}
                  >
                    {filter.icon}
                    <span className="ml-1">{filter.label}</span>
                    {filter.count !== undefined && (
                      <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                        filter.active ? "bg-white/20" : "bg-orange-100 text-orange-800"
                      }`}>
                        {filter.count}
                      </span>
                    )}
                  </Badge>
                ))}

                </div>
            </div>
          </div>

          {/* Profile List */}
          {isSearching ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Finding your perfect matches...</h3>
                <p className="text-gray-600">Please wait while we search through our database</p>
              </div>
            </div>
          ) : filteredProfiles.length > 0 ? (
            <div className="space-y-6">
              {filteredProfiles.map((profile, index) => (
                <div
                  key={profile.id}
                  className="transform transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <ProfileCard profile={profile} />
                </div>
              ))}
              
              {/* Load More Button (if needed) */}
              {filteredProfiles.length >= 10 && (
                <div className="text-center py-8">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300"
                  >
                    Load More Profiles
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-sm border border-orange-100/50 max-w-md mx-auto">
                <div className="text-6xl mb-6">
                  {searchQuery || activeQuickFilters.size > 0 ? "🔍" : "💝"}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {searchQuery || activeQuickFilters.size > 0 
                    ? "No matches found" 
                    : "No profiles found"
                  }
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {searchQuery || activeQuickFilters.size > 0
                    ? "Try adjusting your search terms or filters to find more matches"
                    : "Try adjusting your filters to discover more spiritual partners"
                  }
                </p>
                <Button 
                  onClick={clearAllFilters}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-6 py-3 text-base"
                >
                  <X className="w-5 h-5 mr-2" />
                  {hasActiveFilters ? "🔄 Clear All Filters" : "🔍 Reset Search"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Premium Benefits */}
      <div className="w-80 bg-white shadow-lg border-l border-gradient-to-b from-orange-100/50 to-rose-100/50">
        <PremiumBenefits />
      </div>
    </div>
  );
});

ProfileBrowser.displayName = 'ProfileBrowser';

export default ProfileBrowser;