import { memo } from "react";
import { useSpiritualContext } from "@/contexts/spiritual-context";
import SpiritualFilterSidebar from "@/components/spiritual-filter-sidebar";
import ProfileCard from "@/components/profile-card";
import PremiumBenefits from "@/components/premium-benefits";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { UserProfile } from "@shared/schema";
import { useState } from "react";
import type { ProfileFilter } from "@/types/profile";


const ProfileBrowser = memo(() => {
  let spiritualPractices: string[] = [];
  let sacredTexts: string[] = [];

  try {
    const context = useSpiritualContext();
    spiritualPractices = context.spiritualPractices;
    sacredTexts = context.sacredTexts;
  } catch (error) {
    console.warn('Spiritual context not available:', error);
  }

  const [filters, setFilters] = useState<ProfileFilter>({});
  const { searchResults, isSearching } = useSpiritualContext();


  return (
    <div className="flex flex-1 bg-gray-50">
      {/* Left Sidebar - Filters */}
      <div className="w-80 bg-white shadow-sm border-r border-gray-200">
        <SpiritualFilterSidebar />
      </div>

      {/* Center - Profile Grid */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Find Your Perfect Match</h1>
                <p className="text-gray-600 mt-1">
                  {searchResults.length > 0 ? `${searchResults.length} profiles found` : "Browse spiritual partners"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  🔍 Filters
                </Button>
                <Button variant="outline" size="sm">
                  ✓ Verified
                </Button>
                <Button variant="outline" size="sm">
                  🆕 Just Joined
                </Button>
                <Button variant="outline" size="sm">
                  📍 Nearby
                </Button>
              </div>
            </div>
          </div>

          {/* Profile List */}
          {isSearching ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-saffron" />
              <span className="ml-2 text-gray-600">Finding your perfect matches...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((profile) => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">💝</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No profiles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to find more matches</p>
              <Button className="bg-saffron hover:bg-saffron/90">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Premium Benefits */}
      <div className="w-80 bg-white border-l border-gray-200">
        <PremiumBenefits />
      </div>

      </div>
  );
});

ProfileBrowser.displayName = "ProfileBrowser";

export default ProfileBrowser;