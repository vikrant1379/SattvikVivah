
import { memo, useCallback, useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useSpiritualContext } from "@/contexts/spiritual-context";
import SpiritualFilterSidebar from "@/components/spiritual-filter-sidebar";
import ProfileCard from "@/components/profile-card";
import PremiumBenefits from "@/components/premium-benefits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, X, Filter, CheckCircle, Clock, MapPin, Users, ChevronLeft, Home } from "lucide-react";
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
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuickFilters, setActiveQuickFilters] = useState<Set<string>>(new Set());

  // Safely get spiritual context
  const { searchResults, isSearching, clearSearch, filters: contextFilters, setFilters, allProfiles } = useSpiritualContext();

  // Filter profiles based on search query - enhanced to search by name, ID, location, profession, etc.
  const filteredProfiles = useMemo(() => {
    let filtered = [...searchResults];

    // Apply comprehensive search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(profile => {
        // Basic identifiers
        const matchesId = profile.id.toLowerCase().includes(query);
        const matchesName = profile.name?.toLowerCase().includes(query) || false;
        const matchesUsername = profile.username?.toLowerCase().includes(query) || false;
        
        // Location fields
        const matchesCity = profile.city?.toLowerCase().includes(query) || false;
        const matchesState = profile.state?.toLowerCase().includes(query) || false;
        const matchesCountry = profile.country?.toLowerCase().includes(query) || false;
        
        // Professional fields
        const matchesProfession = profile.profession?.toLowerCase().includes(query) || false;
        const matchesEducation = profile.education?.toLowerCase().includes(query) || false;
        
        // Personal attributes
        const matchesMotherTongue = profile.motherTongue?.toLowerCase().includes(query) || false;
        const matchesCaste = profile.caste?.toLowerCase().includes(query) || false;
        const matchesReligion = profile.religion?.toLowerCase().includes(query) || false;
        
        // Spiritual attributes
        const matchesGuruLineage = profile.guruLineage?.toLowerCase().includes(query) || false;
        const matchesSpiritualPractices = profile.spiritualPractices?.some(practice => 
          practice.toLowerCase().includes(query)) || false;
        const matchesSacredTexts = profile.sacredTexts?.some(text => 
          text.toLowerCase().includes(query)) || false;
        
        // Astrological attributes
        const matchesRashi = profile.rashi?.toLowerCase().includes(query) || false;
        const matchesNakshatra = profile.nakshatra?.toLowerCase().includes(query) || false;
        
        return matchesId || matchesName || matchesUsername || 
               matchesCity || matchesState || matchesCountry ||
               matchesProfession || matchesEducation ||
               matchesMotherTongue || matchesCaste || matchesReligion ||
               matchesGuruLineage || matchesSpiritualPractices || matchesSacredTexts ||
               matchesRashi || matchesNakshatra;
      });
    }

    return filtered;
  }, [searchResults, searchQuery]);

  // Quick filter definitions - counts based on searchResults (after main filters, before search query)
  const quickFilters: QuickFilter[] = useMemo(() => {
    // Use searchResults for counts (these are results after main spiritual context filters)
    const countSource = searchResults;

    return [
      {
        id: "verified",
        label: "Verified",
        icon: <CheckCircle className="w-3 h-3" />,
        count: countSource.filter(p => p.verified).length,
        active: contextFilters.verified || false
      },
      {
        id: "recent",
        label: "Just Joined",
        icon: <Clock className="w-3 h-3" />,
        count: countSource.filter(p => {
          const joinDate = new Date(p.createdAt || p.joinedDate || Date.now());
          const now = new Date();
          const daysDiff = (now.getTime() - joinDate.getTime()) / (1000 * 3600 * 24);
          return daysDiff <= 30;
        }).length,
        active: contextFilters.recentlyJoined || false
      },
      {
        id: "nearby",
        label: "Nearby",
        icon: <MapPin className="w-3 h-3" />,
        count: countSource.filter(p => p.city === "Mumbai" || p.city === "Delhi" || p.city === "New Delhi").length,
        active: contextFilters.nearby || false
      },
      {
        id: "withPhoto",
        label: "With Photo",
        icon: <Users className="w-3 h-3" />,
        count: countSource.filter(p => p.profilePicture || p.profileImage || p.withPhoto).length,
        active: contextFilters.withPhoto || false
      }
    ];
  }, [searchResults, contextFilters]);

  const toggleQuickFilter = useCallback((filterId: string) => {
    // All quick filters are handled through the spiritual context
    const filterMapping = {
      verified: 'verified',
      withPhoto: 'withPhoto',
      recent: 'recentlyJoined',
      nearby: 'nearby'
    };

    const contextKey = filterMapping[filterId as keyof typeof filterMapping];
    if (contextKey) {
      setFilters({
        ...contextFilters,
        [contextKey]: !contextFilters[contextKey as keyof typeof contextFilters]
      });
      
      // Update local state for quick filter active status
      if (contextFilters[contextKey as keyof typeof contextFilters]) {
        setActiveQuickFilters(prev => {
          const next = new Set(prev);
          next.delete(filterId);
          return next;
        });
      } else {
        setActiveQuickFilters(prev => new Set(prev).add(filterId));
      }
    }
  }, [contextFilters, setFilters]);

  const clearQuickFilters = useCallback(() => {
    setSearchQuery("");
    setActiveQuickFilters(new Set());
    // Clear all quick filters from spiritual context while preserving other filters
    setFilters({
      ...contextFilters,
      verified: false,
      withPhoto: false,
      recentlyJoined: false,
      nearby: false
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

    // Check context filters comprehensively
    return Object.entries(contextFilters).some(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return value !== undefined && value !== null && value !== "" && value !== false;
    });
  }, [searchQuery, contextFilters]);

  const handleBackToHome = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-rose-50/30">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHome}
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                <span>← Back to Home</span>
              </Button>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-800">Profile Browser</h1>
            </div>
            <div className="text-sm text-gray-600">
              Find your perfect spiritual match
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
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
                      placeholder="Search by name, ID, location, profession, caste, spiritual practices..."
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
                    className="transition-opacity duration-300"
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
                    {searchQuery || hasActiveFilters ? "🔍" : "💝"}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {searchQuery || hasActiveFilters
                      ? "No matches found"
                      : "No profiles found"
                    }</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {searchQuery || hasActiveFilters
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
    </div>
  );
});

ProfileBrowser.displayName = 'ProfileBrowser';

export default ProfileBrowser;
