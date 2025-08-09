import { memo, useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronRight, X, Filter, Search, Settings } from "lucide-react";
import { useSpiritualContext } from "@/contexts/spiritual-context";
import { countries, statesByCountry, citiesByState, motherTongues } from "@/data/locations";
import { casteGroupOptions, casteSubcasteOptions } from "../data/caste";
import { educationOptions } from "../data/education";
import { professionOptions } from "../data/profession";
import { 
  maritalStatusOptions,
  smokingHabitsOptions,
  drinkingHabitsOptions,
  eatingHabitsOptions,
  physicalStatusOptions,
  bloodGroupOptions,
  healthConditionsOptions,
  ageOptions,
  heightOptions,
  religionOptions,
  ethnicityOptions,
  annualIncomeOptions
} from "../data/personal-attributes";
import { 
  spiritualPractices,
  sacredTexts,
  guruLineages,
  dietaryLifestyles
} from "../data/spiritual-practices";
import type { ProfileFilter } from "@shared/schema";
import { 
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar
} from "@/components/ui/sidebar";

// Placeholder options - replace with actual data imports
const hasChildrenOptions = ["Yes", "No", "Doesn't Matter"];
const horoscopeOptions = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces", "Doesn't Matter"];
const mangalikOptions = ["Yes", "No", "Dosha less", "Doesn't Matter"];
const residentialStatusOptions = ["Citizen", "Permanent Resident", "Temporary Resident", "Doesn't Matter"];

interface SpiritualFilterSidebarProps {
  filters: ProfileFilter;
  onFiltersChange: (filters: ProfileFilter) => void;
  onClearFilters: () => void;
}

const SpiritualFilterSidebar = memo(() => {
  const { filters, setFilters, searchProfiles } = useSpiritualContext();
  const [localFilters, setLocalFilters] = useState<ProfileFilter>({
    ageMin: filters.ageMin,
    ageMax: filters.ageMax,
    country: filters.country,
    state: filters.state,
    city: filters.city,
    motherTongue: filters.motherTongue,
    otherLanguages: filters.otherLanguages || [],
    spiritualPractices: filters.spiritualPractices,
    sacredTexts: filters.sacredTexts,
    guruLineage: filters.guruLineage,
    education: filters.education,
    profession: filters.profession,
    heightMin: filters.heightMin,
    heightMax: filters.heightMax,
    smokingHabits: filters.smokingHabits,
    drinkingHabits: filters.drinkingHabits,
    eatingHabits: filters.eatingHabits,
    physicalStatus: filters.physicalStatus,
    bloodGroup: filters.bloodGroup,
    healthConditions: filters.healthConditions,
    dietaryLifestyle: filters.dietaryLifestyle,
    maritalStatus: filters.maritalStatus,
    verified: filters.verified,
    withPhoto: filters.withPhoto,
    caste: filters.caste,
    casteGroup: filters.casteGroup,
    casteSubcaste: filters.casteSubcaste,
    casteGroups: filters.casteGroups || [],
    casteSubcastes: filters.casteSubcastes || [],
    religion: filters.religion,
    ethnicity: filters.ethnicity,
    annualIncome: filters.annualIncome,
    hasChildren: filters.hasChildren,
    horoscope: filters.horoscope,
    mangalik: filters.mangalik,
    residentialStatus: filters.residentialStatus
  });

  // Collapsible states - start with key sections open
  const [openSections, setOpenSections] = useState({
    basic: true,
    location: true,
    spiritual: false,
    professional: false,
    lifestyle: false,
    preferences: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  // Get active filters count for each section
  const getActiveFiltersCount = () => {
    let count = 0;
    Object.values(localFilters).forEach(value => {
      if (Array.isArray(value)) {
        if (value.length > 0) count++;
      } else if (value !== undefined && value !== "" && value !== false) {
        count++;
      }
    });
    return count;
  };

  const handleSearch = useCallback(() => {
    setFilters(localFilters);
    searchProfiles(localFilters);
  }, [localFilters, setFilters, searchProfiles]);

  const clearFilters = useCallback(() => {
    const clearedFilters = {
      casteGroups: [],
      casteSubcastes: []
    };
    setLocalFilters(clearedFilters);
    setFilters(clearedFilters);
  }, [setFilters]);

  const activeCount = getActiveFiltersCount();

  return (
    <Sidebar className="border-r bg-white" collapsible="none" side="left">
      <SidebarHeader className="border-b bg-gradient-to-r from-sage/5 to-lotus/5 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sage/10">
            <Filter className="h-4 w-4 text-sage" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Refine Matches</h2>
            <p className="text-xs text-gray-500">
              {activeCount > 0 ? `${activeCount} filters active` : "No filters applied"}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex gap-2">
          <Button 
            onClick={handleSearch}
            size="sm" 
            className="flex-1 bg-saffron hover:bg-saffron/90 text-white"
          >
            <Search className="mr-2 h-3 w-3" />
            Search
          </Button>
          {activeCount > 0 && (
            <Button 
              onClick={clearFilters}
              variant="outline" 
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Basic Details Section */}
        <SidebarGroup>
          <Collapsible open={openSections.basic} onOpenChange={() => toggleSection('basic')}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="group/label flex w-full items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <span className="font-medium text-gray-900">Basic Details</span>
                {openSections.basic ? 
                  <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                }
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent className="px-2 space-y-4">
                {/* Age Range */}
                <Card className="border-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Age Range</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={localFilters.ageMin?.toString() || ""}
                        onValueChange={(value) => {
                          const newMin = value ? parseInt(value) : undefined;
                          setLocalFilters(prev => ({ ...prev, ageMin: newMin }));
                        }}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Min" />
                        </SelectTrigger>
                        <SelectContent>
                          {ageOptions.slice(0, 15).map((age) => (
                            <SelectItem key={age} value={age.toString()}>
                              {age}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={localFilters.ageMax?.toString() || ""}
                        onValueChange={(value) => {
                          const newMax = value ? parseInt(value) : undefined;
                          setLocalFilters(prev => ({ ...prev, ageMax: newMax }));
                        }}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Max" />
                        </SelectTrigger>
                        <SelectContent>
                          {ageOptions.slice(10).map((age) => (
                            <SelectItem key={age} value={age.toString()}>
                              {age}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Height Range */}
                <Card className="border-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Height</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={localFilters.heightMin || ""}
                        onValueChange={(value) => {
                          setLocalFilters(prev => ({ ...prev, heightMin: value || undefined }));
                        }}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Min" />
                        </SelectTrigger>
                        <SelectContent>
                          {heightOptions.slice(0, 15).map((height) => (
                            <SelectItem key={height} value={height}>
                              {height.split(' (')[0]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={localFilters.heightMax || ""}
                        onValueChange={(value) => {
                          setLocalFilters(prev => ({ ...prev, heightMax: value || undefined }));
                        }}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Max" />
                        </SelectTrigger>
                        <SelectContent>
                          {heightOptions.slice(10).map((height) => (
                            <SelectItem key={height} value={height}>
                              {height.split(' (')[0]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Marital Status */}
                <Card className="border-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Marital Status</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Select
                      value={localFilters.maritalStatus || ""}
                      onValueChange={(value) =>
                        setLocalFilters(prev => ({ ...prev, maritalStatus: value || undefined }))
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {maritalStatusOptions.map((status: string) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Location Section */}
        <SidebarGroup>
          <Collapsible open={openSections.location} onOpenChange={() => toggleSection('location')}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="group/label flex w-full items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <span className="font-medium text-gray-900">Location</span>
                {openSections.location ? 
                  <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                }
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent className="px-2 space-y-3">
                <Card className="border-gray-100">
                  <CardContent className="p-3 space-y-3">
                    <Combobox
                      options={countries}
                      value={localFilters.country || ""}
                      onSelect={(value) => {
                        setLocalFilters(prev => ({
                          ...prev,
                          country: value || undefined,
                          state: undefined,
                          city: undefined
                        }));
                      }}
                      placeholder="Select Country"
                      searchPlaceholder="Search countries..."
                      emptyMessage="No country found."
                      className="h-8 text-xs"
                    />

                    {localFilters.country && (
                      <Combobox
                        options={(statesByCountry[localFilters.country] || []).map(state => ({ value: state, label: state }))}
                        value={localFilters.state || ""}
                        onSelect={(value) => {
                          setLocalFilters(prev => ({
                            ...prev,
                            state: value || undefined,
                            city: undefined
                          }));
                        }}
                        placeholder="Select State"
                        searchPlaceholder="Search states..."
                        emptyMessage="No state found."
                        className="h-8 text-xs"
                      />
                    )}

                    {localFilters.state && (
                      <Combobox
                        options={(citiesByState[localFilters.state] || []).map(city => ({ value: city, label: city }))}
                        value={localFilters.city || ""}
                        onSelect={(value) => {
                          setLocalFilters(prev => ({
                            ...prev,
                            city: value || undefined
                          }));
                        }}
                        placeholder="Select City"
                        searchPlaceholder="Search cities..."
                        emptyMessage="No city found."
                        className="h-8 text-xs"
                      />
                    )}
                  </CardContent>
                </Card>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Spiritual Preferences Section */}
        <SidebarGroup>
          <Collapsible open={openSections.spiritual} onOpenChange={() => toggleSection('spiritual')}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="group/label flex w-full items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <span className="font-medium text-gray-900">Spiritual Preferences</span>
                {openSections.spiritual ? 
                  <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                }
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent className="px-2 space-y-3">
                <Card className="border-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Religion</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Select
                      value={localFilters.religion || ""}
                      onValueChange={(value) =>
                        setLocalFilters(prev => ({ ...prev, religion: value || undefined }))
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select Religion" />
                      </SelectTrigger>
                      <SelectContent>
                        {religionOptions.slice(0, 8).map((religion) => (
                          <SelectItem key={religion} value={religion}>
                            {religion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="border-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Dietary Preference</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Select
                      value={localFilters.eatingHabits || ""}
                      onValueChange={(value) =>
                        setLocalFilters(prev => ({ ...prev, eatingHabits: value || undefined }))
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select Preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {eatingHabitsOptions.map((habit: string) => (
                          <SelectItem key={habit} value={habit}>
                            {habit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Professional Details Section */}
        <SidebarGroup>
          <Collapsible open={openSections.professional} onOpenChange={() => toggleSection('professional')}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="group/label flex w-full items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <span className="font-medium text-gray-900">Professional Details</span>
                {openSections.professional ? 
                  <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                }
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent className="px-2 space-y-3">
                <Card className="border-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Education</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Select
                      value={localFilters.education || ""}
                      onValueChange={(value) =>
                        setLocalFilters(prev => ({ ...prev, education: value || undefined }))
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select Education" />
                      </SelectTrigger>
                      <SelectContent>
                        {educationOptions.slice(0, 10).map((education) => (
                          <SelectItem key={education} value={education}>
                            {education}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="border-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Profession</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Select
                      value={localFilters.profession || ""}
                      onValueChange={(value) =>
                        setLocalFilters(prev => ({ ...prev, profession: value || undefined }))
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select Profession" />
                      </SelectTrigger>
                      <SelectContent>
                        {professionOptions.slice(0, 10).map((profession) => (
                          <SelectItem key={profession} value={profession}>
                            {profession}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="border-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Annual Income</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Select
                      value={localFilters.annualIncome || ""}
                      onValueChange={(value) =>
                        setLocalFilters(prev => ({ ...prev, annualIncome: value || undefined }))
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select Range" />
                      </SelectTrigger>
                      <SelectContent>
                        {annualIncomeOptions.slice(0, 8).map((income) => (
                          <SelectItem key={income} value={income}>
                            {income}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Additional Preferences */}
        <SidebarGroup>
          <SidebarGroupContent className="px-2">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified"
                  checked={localFilters.verified || false}
                  onCheckedChange={(checked) => 
                    setLocalFilters(prev => ({ ...prev, verified: checked === true }))
                  }
                />
                <Label htmlFor="verified" className="text-sm text-gray-700 cursor-pointer">
                  Verified Profiles Only
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="withPhoto"
                  checked={localFilters.withPhoto || false}
                  onCheckedChange={(checked) => 
                    setLocalFilters(prev => ({ ...prev, withPhoto: checked === true }))
                  }
                />
                <Label htmlFor="withPhoto" className="text-sm text-gray-700 cursor-pointer">
                  With Photo Only
                </Label>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
});

SpiritualFilterSidebar.displayName = "SpiritualFilterSidebar";

export default SpiritualFilterSidebar;