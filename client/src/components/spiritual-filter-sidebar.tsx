import { memo, useState, useCallback } from "react";
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
import { ChevronDown, ChevronRight, X } from "lucide-react";
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

  // Collapsible states - start with some sections open
  const [openSections, setOpenSections] = useState({
    age: true,
    height: true,
    location: true,
    motherTongue: false,
    otherLanguages: false,
    education: false,
    profession: false,
    casteGroup: false,
    casteSubcaste: false,
    spiritualPractices: false,
    sacredTexts: false,
    maritalStatus: true,
    lifestyleHabits: true,
    lifestyle: false,
    religion: false,
    ethnicity: false,
    annualIncome: false
  });

  // Saved filters functionality
  const [savedFilters, setSavedFilters] = useState<ProfileFilter[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterName, setFilterName] = useState("");

  // Search states for each section
  const [searchStates, setSearchStates] = useState({
    education: "",
    profession: "",
    casteGroup: "",
    casteSubcaste: "",
    spiritualPractices: "",
    sacredTexts: "",
    guruLineages: "",
    motherTongue: "",
    otherLanguages: "",
    countries: "",
    states: "",
    cities: "",
    religion: "",
    ethnicity: "",
    annualIncome: ""
  });

  // Expanded states for "MORE" sections
  const [expandedSections, setExpandedSections] = useState({
    education: false,
    profession: false,
    casteGroup: false,
    casteSubcaste: false,
    spiritualPractices: false,
    sacredTexts: false,
    guruLineages: false,
    religion: false,
    ethnicity: false,
    annualIncome: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const toggleExpanded = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const collapseAllSections = () => {
    setOpenSections({
      age: false,
      height: false,
      location: false,
      motherTongue: false,
      otherLanguages: false,
      education: false,
      profession: false,
      casteGroup: false,
      casteSubcaste: false,
      spiritualPractices: false,
      sacredTexts: false,
      maritalStatus: false,
      lifestyleHabits: false,
      lifestyle: false,
      religion: false,
      ethnicity: false,
      annualIncome: false
    });
  };

  const saveCurrentFilters = () => {
    if (filterName.trim()) {
      const newSavedFilter = {
        ...localFilters,
        name: filterName.trim()
      };
      setSavedFilters(prev => [...prev, newSavedFilter]);
      setFilterName("");
      setShowSaveDialog(false);
    }
  };

  const loadSavedFilter = (savedFilter: ProfileFilter) => {
    const { name, ...filterData } = savedFilter;
    setLocalFilters(filterData);
  };

  const deleteSavedFilter = (index: number) => {
    setSavedFilters(prev => prev.filter((_, i) => i !== index));
  };

  const updateSearch = (section: string, value: string) => {
    setSearchStates(prev => ({
      ...prev,
      [section]: value
    }));
  };

  // Filter options based on search
  const getFilteredOptions = (options: string[], searchTerm: string) => {
    if (!searchTerm) return options;
    return options.filter(option => 
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get visible options for a section
  const getVisibleOptions = (options: string[], section: string, limit: number = 8) => {
    const filtered = getFilteredOptions(options, searchStates[section as keyof typeof searchStates] || "");
    const isExpanded = expandedSections[section as keyof typeof expandedSections];
    return isExpanded ? filtered : filtered.slice(0, limit);
  };

  const getRemainingCount = (options: string[], section: string): number => {
    return Math.max(0, getFilteredOptions(options, searchStates[section as keyof typeof searchStates] || "").length - 8);
  };

  // Get active filters for display
  const getActiveFilters = () => {
    const active = [];

    if (localFilters.ageMin || localFilters.ageMax) {
      active.push({
        key: 'age',
        label: `${localFilters.ageMin || 18}-${localFilters.ageMax || 70} years`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, ageMin: undefined, ageMax: undefined }))
      });
    }

    if (localFilters.heightMin || localFilters.heightMax) {
      // Extract just the feet/inches part without cm
      const formatHeight = (height: string) => {
        if (!height) return '';
        return height.split(' (')[0]; // Takes "5'4" (163 cm)" and returns "5'4""
      };
      
      const minHeight = formatHeight(localFilters.heightMin || '4\'0"');
      const maxHeight = formatHeight(localFilters.heightMax || '6\'7"');
      
      active.push({
        key: 'height',
        label: `${minHeight}-${maxHeight}`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, heightMin: undefined, heightMax: undefined }))
      });
    }

    if (localFilters.country || localFilters.state || localFilters.city) {
      const selectedCountry = countries.find(c => c.value === localFilters.country)?.label;
      const parts = [selectedCountry, localFilters.state, localFilters.city].filter(Boolean);
      active.push({
        key: 'location',
        label: parts.join(', '),
        onRemove: () => setLocalFilters(prev => ({ ...prev, country: undefined, state: undefined, city: undefined }))
      });
    }

    if (localFilters.education) {
      active.push({
        key: 'education',
        label: localFilters.education,
        onRemove: () => setLocalFilters(prev => ({ ...prev, education: undefined }))
      });
    }

    if (localFilters.profession) {
      active.push({
        key: 'profession',
        label: localFilters.profession,
        onRemove: () => setLocalFilters(prev => ({ ...prev, profession: undefined }))
      });
    }

    if (localFilters.caste) {
      active.push({
        key: 'caste',
        label: localFilters.caste,
        onRemove: () => setLocalFilters(prev => ({ ...prev, caste: undefined }))
      });
    }

    // Show combined caste filter if both are selected
    if (localFilters.casteGroups?.length && localFilters.casteSubcastes?.length) {
      const groupsText = localFilters.casteGroups.includes("All") ? "All Groups" : `${localFilters.casteGroups.length} Groups`;
      const subcastesText = localFilters.casteSubcastes.includes("All") ? "All Subcastes" : `${localFilters.casteSubcastes.length} Subcastes`;
      active.push({
        key: 'combinedCaste',
        label: `Caste: ${groupsText} + ${subcastesText}`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, casteGroups: [], casteSubcastes: [] }))
      });
    } else if (localFilters.casteGroups?.length) {
      active.push({
        key: 'casteGroups',
        label: localFilters.casteGroups.includes("All") ? "All Caste Groups" : `${localFilters.casteGroups.length} Caste Groups`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, casteGroups: [], casteSubcastes: [] }))
      });
    } else if (localFilters.casteSubcastes?.length) {
      active.push({
        key: 'casteSubcastes',
        label: localFilters.casteSubcastes.includes("All") ? "All Subcastes" : `${localFilters.casteSubcastes.length} Subcastes`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, casteSubcastes: [] }))
      });
    }

    if (localFilters.motherTongue) {
      active.push({
        key: 'motherTongue',
        label: localFilters.motherTongue,
        onRemove: () => setLocalFilters(prev => ({ ...prev, motherTongue: undefined }))
      });
    }

    if (localFilters.otherLanguages?.length) {
      active.push({
        key: 'otherLanguages',
        label: `${localFilters.otherLanguages.length} other languages`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, otherLanguages: [] }))
      });
    }

    if (localFilters.spiritualPractices?.length) {
      active.push({
        key: 'spiritualPractices',
        label: `${localFilters.spiritualPractices.length} practices`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, spiritualPractices: undefined }))
      });
    }

    if (localFilters.verified) {
      active.push({
        key: 'verified',
        label: 'Verified only',
        onRemove: () => setLocalFilters(prev => ({ ...prev, verified: false }))
      });
    }

    if (localFilters.withPhoto) {
      active.push({
        key: 'withPhoto',
        label: 'With photo',
        onRemove: () => setLocalFilters(prev => ({ ...prev, withPhoto: false }))
      });
    }

    if (localFilters.religion) {
      active.push({
        key: 'religion',
        label: localFilters.religion,
        onRemove: () => setLocalFilters(prev => ({ ...prev, religion: undefined }))
      });
    }

    if (localFilters.ethnicity) {
      active.push({
        key: 'ethnicity',
        label: localFilters.ethnicity,
        onRemove: () => setLocalFilters(prev => ({ ...prev, ethnicity: undefined }))
      });
    }

    if (localFilters.annualIncome) {
      active.push({
        key: 'annualIncome',
        label: localFilters.annualIncome,
        onRemove: () => setLocalFilters(prev => ({ ...prev, annualIncome: undefined }))
      });
    }

    // Add new active filters
    if (localFilters.maritalStatus) {
      active.push({
        key: 'maritalStatus',
        label: `${localFilters.maritalStatus}`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, maritalStatus: undefined }))
      });
    }

    if (localFilters.eatingHabits) {
      active.push({
        key: 'eatingHabits',
        label: `${localFilters.eatingHabits}`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, eatingHabits: undefined }))
      });
    }

    if (localFilters.drinkingHabits) {
      active.push({
        key: 'drinkingHabits',
        label: `Drinking: ${localFilters.drinkingHabits}`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, drinkingHabits: undefined }))
      });
    }

    if (localFilters.smokingHabits) {
      active.push({
        key: 'smokingHabits',
        label: `Smoking: ${localFilters.smokingHabits}`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, smokingHabits: undefined }))
      });
    }

    if (localFilters.hasChildren) {
      active.push({
        key: 'hasChildren',
        label: `Children: ${localFilters.hasChildren}`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, hasChildren: undefined }))
      });
    }

    if (localFilters.horoscope) {
      active.push({
        key: 'horoscope',
        label: `Horoscope: ${localFilters.horoscope}`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, horoscope: undefined }))
      });
    }

    if (localFilters.mangalik) {
      active.push({
        key: 'mangalik',
        label: `Mangalik: ${localFilters.mangalik}`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, mangalik: undefined }))
      });
    }

    if (localFilters.residentialStatus) {
      active.push({
        key: 'residentialStatus',
        label: `Residential Status: ${localFilters.residentialStatus}`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, residentialStatus: undefined }))
      });
    }


    return active;
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

  const activeFilters = getActiveFilters();

  return (
    <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto hidden lg:block">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              onClick={collapseAllSections}
              className="text-gray-600 text-xs font-medium hover:bg-gray-50 px-2 py-1 h-auto"
              title="Collapse All Sections"
            >
              ⌄ COLLAPSE
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setShowSaveDialog(true)}
              className="text-green-600 text-xs font-medium hover:bg-green-50 px-2 py-1 h-auto"
              title="Save Current Filters"
            >
              💾 SAVE
            </Button>
            {activeFilters.length > 0 && (
              <Button 
                variant="ghost" 
                onClick={clearFilters}
                className="text-blue-600 text-xs font-medium hover:bg-blue-50 px-2 py-1 h-auto relative z-10"
                title="Clear All Filters"
              >
                CLEAR ALL
              </Button>
            )}
          </div>
        </div>

        {/* Save Filter Dialog */}
        {showSaveDialog && (
          <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Input
                placeholder="Enter filter name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="h-8 text-sm flex-1"
                onKeyPress={(e) => e.key === 'Enter' && saveCurrentFilters()}
              />
              <Button
                size="sm"
                onClick={saveCurrentFilters}
                disabled={!filterName.trim()}
                className="h-8 px-3 text-xs"
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setShowSaveDialog(false);
                  setFilterName("");
                }}
                className="h-8 px-2 text-xs"
              >
                ✕
              </Button>
            </div>
          </div>
        )}

        {/* Saved Filters */}
        {savedFilters.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Saved Filters</h3>
            <div className="space-y-2">
              {savedFilters.map((savedFilter, index) => (
                <div key={index} className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-md p-2">
                  <button
                    onClick={() => loadSavedFilter(savedFilter)}
                    className="text-sm text-blue-700 hover:text-blue-900 flex-1 text-left font-medium"
                  >
                    {(savedFilter as any).name}
                  </button>
                  <button
                    onClick={() => deleteSavedFilter(index)}
                    className="text-red-500 hover:text-red-700 ml-2 text-xs px-1"
                    title="Delete saved filter"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mb-6 relative z-0">
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <div 
                  key={filter.key}
                  className="inline-flex items-center bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X 
                    className="w-3 h-3 mr-1 cursor-pointer hover:text-gray-900 transition-colors" 
                    onClick={filter.onRemove}
                  />
                  <span className="select-none">{filter.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Age Section */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('age')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">AGE</h3>
              {openSections.age ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.age && (
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Select
                      value={localFilters.ageMin?.toString() || ""}
                      onValueChange={(value) => {
                        const newMin = value ? parseInt(value) : undefined;
                        setLocalFilters(prev => ({
                          ...prev,
                          ageMin: newMin,
                          // Reset max age if it becomes less than min age
                          ageMax: prev.ageMax && newMin && prev.ageMax < newMin ? undefined : prev.ageMax
                        }));
                      }}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Min" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageOptions
                          .filter(age => !localFilters.ageMax || age <= localFilters.ageMax)
                          .map((age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select
                      value={localFilters.ageMax?.toString() || ""}
                      onValueChange={(value) => {
                        const newMax = value ? parseInt(value) : undefined;
                        setLocalFilters(prev => ({
                          ...prev,
                          ageMax: newMax,
                          // Reset min age if it becomes greater than max age
                          ageMin: prev.ageMin && newMax && prev.ageMin > newMax ? undefined : prev.ageMin
                        }));
                      }}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Max" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageOptions
                          .filter(age => !localFilters.ageMin || age >= localFilters.ageMin)
                          .map((age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* Age validation message */}
                {localFilters.ageMin && localFilters.ageMax && localFilters.ageMin > localFilters.ageMax && (
                  <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                    Minimum age cannot be greater than maximum age
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Height Section */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('height')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">HEIGHT</h3>
              {openSections.height ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.height && (
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Select
                      value={localFilters.heightMin || ""}
                      onValueChange={(value) => {
                        const newMinHeight = value || undefined;
                        setLocalFilters(prev => ({
                          ...prev,
                          heightMin: newMinHeight,
                          // Reset max height if it becomes less than min height
                          heightMax: prev.heightMax && newMinHeight && 
                            heightOptions.indexOf(prev.heightMax) < heightOptions.indexOf(newMinHeight) 
                            ? undefined : prev.heightMax
                        }));
                      }}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Min" />
                      </SelectTrigger>
                      <SelectContent>
                        {heightOptions
                          .filter(height => !localFilters.heightMax || 
                            heightOptions.indexOf(height) <= heightOptions.indexOf(localFilters.heightMax))
                          .map((height) => (
                          <SelectItem key={height} value={height}>
                            {height}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select
                      value={localFilters.heightMax || ""}
                      onValueChange={(value) => {
                        const newMaxHeight = value || undefined;
                        setLocalFilters(prev => ({
                          ...prev,
                          heightMax: newMaxHeight,
                          // Reset min height if it becomes greater than max height
                          heightMin: prev.heightMin && newMaxHeight && 
                            heightOptions.indexOf(prev.heightMin) > heightOptions.indexOf(newMaxHeight) 
                            ? undefined : prev.heightMin
                        }));
                      }}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Max" />
                      </SelectTrigger>
                      <SelectContent>
                        {heightOptions
                          .filter(height => !localFilters.heightMin || 
                            heightOptions.indexOf(height) >= heightOptions.indexOf(localFilters.heightMin))
                          .map((height) => (
                          <SelectItem key={height} value={height}>
                            {height}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* Height validation message */}
                {localFilters.heightMin && localFilters.heightMax && 
                 heightOptions.indexOf(localFilters.heightMin) > heightOptions.indexOf(localFilters.heightMax) && (
                  <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                    Minimum height cannot be greater than maximum height
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Location Section */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('location')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">LOCATION</h3>
              {openSections.location ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.location && (
              <div className="mt-3 space-y-3">
                {/* Country Selection */}
                <div>
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
                    className="h-9 text-sm bg-amber-50 border-amber-200"
                  />
                </div>

                {/* State Selection - only show if country is selected */}
                {localFilters.country && (
                  <div>
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
                      className="h-9 text-sm bg-amber-50 border-amber-200"
                    />
                  </div>
                )}

                {/* City Selection - only show if state is selected */}
                {localFilters.state && (
                  <div>
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
                      className="h-9 text-sm bg-amber-50 border-amber-200"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mother Tongue */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('motherTongue')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">MOTHER TONGUE</h3>
              {openSections.motherTongue ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.motherTongue && (
              <div className="mt-3">
                <Input 
                  placeholder="Search Languages" 
                  className="mb-3 h-9 text-sm"
                  value={searchStates.motherTongue || ""}
                  onChange={(e) => updateSearch('motherTongue', e.target.value)}
                />
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {getFilteredOptions(motherTongues, searchStates.motherTongue || "").map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mother-${language}`}
                        checked={localFilters.motherTongue === language}
                        onCheckedChange={(checked) => {
                          setLocalFilters(prev => ({
                            ...prev,
                            motherTongue: checked ? language : undefined
                          }));
                        }}
                      />
                      <Label htmlFor={`mother-${language}`} className="text-sm text-gray-700 cursor-pointer">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Other Languages */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('otherLanguages')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">OTHER LANGUAGES</h3>
              {openSections.otherLanguages ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.otherLanguages && (
              <div className="mt-3">
                <Input 
                  placeholder="Search Languages" 
                  className="mb-3 h-9 text-sm"
                  value={searchStates.otherLanguages || ""}
                  onChange={(e) => updateSearch('otherLanguages', e.target.value)}
                />
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {getFilteredOptions(motherTongues, searchStates.otherLanguages || "").map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`other-${language}`}
                        checked={localFilters.otherLanguages?.includes(language) || false}
                        onCheckedChange={(checked) => {
                          const current = localFilters.otherLanguages || [];
                          if (checked) {
                            setLocalFilters(prev => ({
                              ...prev,
                              otherLanguages: [...current, language]
                            }));
                          } else {
                            setLocalFilters(prev => ({
                              ...prev,
                              otherLanguages: current.filter(l => l !== language)
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={`other-${language}`} className="text-sm text-gray-700 cursor-pointer">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Education */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('education')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">EDUCATION</h3>
              {openSections.education ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.education && (
              <div className="mt-3">
                <Input 
                  placeholder="Search Education" 
                  className="mb-3 h-9 text-sm"
                  value={searchStates.education}
                  onChange={(e) => updateSearch('education', e.target.value)}
                />
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {getVisibleOptions(educationOptions, 'education').map((education) => (
                    <div key={education} className="flex items-center space-x-2">
                      <Checkbox
                        id={education}
                        checked={localFilters.education === education}
                        onCheckedChange={(checked) => {
                          setLocalFilters(prev => ({
                            ...prev,
                            education: checked ? education : undefined
                          }));
                        }}
                      />
                      <Label htmlFor={education} className="text-sm text-gray-700 cursor-pointer">
                        {education}
                      </Label>
                    </div>
                  ))}
                  {getRemainingCount(educationOptions, 'education') > 0 && (
                    <Button
                      variant="ghost"
                      className="mt-2 text-xs text-blue-600"
                      onClick={() => toggleExpanded('education')}
                    >
                      {expandedSections.education ? 'Show Less' : `+${getRemainingCount(educationOptions, 'education')} More`}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profession */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('profession')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">PROFESSION</h3>
              {openSections.profession ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.profession && (
              <div className="mt-3">
                <Input 
                  placeholder="Search Profession" 
                  className="mb-3 h-9 text-sm"
                  value={searchStates.profession}
                  onChange={(e) => updateSearch('profession', e.target.value)}
                />
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {getVisibleOptions(professionOptions, 'profession').map((profession) => (
                    <div key={profession} className="flex items-center space-x-2">
                      <Checkbox
                        id={profession}
                        checked={localFilters.profession === profession}
                        onCheckedChange={(checked) => {
                          setLocalFilters(prev => ({
                            ...prev,
                            profession: checked ? profession : undefined
                          }));
                        }}
                      />
                      <Label htmlFor={profession} className="text-sm text-gray-700 cursor-pointer">
                        {profession}
                      </Label>
                    </div>
                  ))}
                  {getRemainingCount(professionOptions, 'profession') > 0 && (
                    <Button
                      variant="ghost"
                      className="mt-2 text-xs text-blue-600"
                      onClick={() => toggleExpanded('profession')}
                    >
                      {expandedSections.profession ? 'Show Less' : `+${getRemainingCount(professionOptions, 'profession')} More`}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Caste Group */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('casteGroup')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">CASTE GROUP</h3>
              {openSections.casteGroup ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.casteGroup && (
              <div className="mt-3">
                <Input 
                  placeholder="Search Caste Group" 
                  className="mb-3 h-9 text-sm"
                  value={searchStates.casteGroup}
                  onChange={(e) => updateSearch('casteGroup', e.target.value)}
                />
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {getVisibleOptions(casteGroupOptions, 'casteGroup').map((casteGroup) => {
                    // Get count of subcastes for this group
                    const getSubcasteCount = (group: string) => {
                      if (group === "All") {
                        // Count all subcastes across all groups
                        return Object.values(casteSubcasteOptions).flat().length;
                      }
                      return casteSubcasteOptions[group as keyof typeof casteSubcasteOptions]?.length || 0;
                    };

                    const subcasteCount = getSubcasteCount(casteGroup);

                    return (
                      <div key={casteGroup} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 flex-1">
                          <Checkbox
                            id={`group-${casteGroup}`}
                            checked={
                              casteGroup === "All" 
                                ? (!localFilters.casteGroups || localFilters.casteGroups.length === 0 || localFilters.casteGroups.includes("All"))
                                : localFilters.casteGroups?.includes(casteGroup) || false
                            }
                            onCheckedChange={(checked) => {
                              const current = localFilters.casteGroups || [];

                              if (casteGroup === "All") {
                                if (checked) {
                                  // Select all
                                  setLocalFilters(prev => ({
                                    ...prev,
                                    casteGroups: ["All"],
                                    casteSubcastes: undefined // Reset subcastes when selecting all
                                  }));
                                } else {
                                  // Deselect all
                                  setLocalFilters(prev => ({
                                    ...prev,
                                    casteGroups: [],
                                    casteSubcastes: undefined
                                  }));
                                }
                              } else {
                                if (checked) {
                                  // Remove "All" if selecting specific option
                                  const newGroups = current.filter(g => g !== "All");
                                  setLocalFilters(prev => ({
                                    ...prev,
                                    casteGroups: [...newGroups, casteGroup],
                                    casteSubcastes: undefined // Reset subcastes when groups change
                                  }));
                                } else {
                                  setLocalFilters(prev => ({
                                    ...prev,
                                    casteGroups: current.filter(g => g !== casteGroup),
                                    casteSubcastes: undefined
                                  }));
                                }
                              }
                            }}
                          />
                          <Label htmlFor={`group-${casteGroup}`} className="text-sm text-gray-700 cursor-pointer flex-1">
                            {casteGroup}
                          </Label>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full min-w-[30px] text-center">
                          {subcasteCount}
                        </span>
                      </div>
                    );
                  })}
                  {getRemainingCount(casteGroupOptions, 'casteGroup') > 0 && (
                    <Button
                      variant="ghost"
                      className="mt-2 text-xs text-blue-600"
                      onClick={() => toggleExpanded('casteGroup')}
                    >
                      {expandedSections.casteGroup ? 'Show Less' : `+${getRemainingCount(casteGroupOptions, 'casteGroup')} More`}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Caste Subcaste */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('casteSubcaste')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">CASTE SUBCASTE</h3>
              {openSections.casteSubcaste ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.casteSubcaste && (
              <div className="mt-3">
                {(() => {
                  // Get all available subcastes based on selected caste groups
                  const selectedGroups = localFilters.casteGroups || [];
                  const hasAllSelected = selectedGroups.includes("All") || selectedGroups.length === 0;

                  let availableSubcastes: string[] = [];

                  if (hasAllSelected) {
                    // If "All" is selected, show subcastes from all groups
                    availableSubcastes = ["All", ...Object.values(casteSubcasteOptions).flat()];
                  } else {
                    // Show subcastes only for selected groups
                    const groupSubcastes: string[] = [];
                    selectedGroups.forEach(group => {
                      if (casteSubcasteOptions[group as keyof typeof casteSubcasteOptions]) {
                        groupSubcastes.push(...casteSubcasteOptions[group as keyof typeof casteSubcasteOptions]);
                      }
                    });
                    availableSubcastes = ["All", ...groupSubcastes];
                  }

                  // Remove duplicates (except for "All" which should be first)
                  const uniqueSubcastes = [...new Set(availableSubcastes.slice(1))];
                  availableSubcastes = ["All", ...uniqueSubcastes];

                  if (availableSubcastes.length > 0) {
                    return (
                      <>
                        <Input 
                          placeholder="Search Subcaste" 
                          className="mb-3 h-9 text-sm"
                          value={searchStates.casteSubcaste}
                          onChange={(e) => updateSearch('casteSubcaste', e.target.value)}
                        />
                        <div className="max-h-48 overflow-y-auto space-y-2">
                          {getVisibleOptions(availableSubcastes, 'casteSubcaste').map((subcaste) => (
                            <div key={subcaste} className="flex items-center space-x-2">
                              <Checkbox
                                id={`subcaste-${subcaste}`}
                                checked={
                                  subcaste === "All" 
                                    ? (!localFilters.casteSubcastes || localFilters.casteSubcastes.length === 0 || localFilters.casteSubcastes.includes("All"))
                                    : localFilters.casteSubcastes?.includes(subcaste) || false
                                }
                                onCheckedChange={(checked) => {
                                  const current = localFilters.casteSubcastes || [];
                                  
                                  if (subcaste === "All") {
                                    if (checked) {
                                      // Select all subcastes
                                      setLocalFilters(prev => ({
                                        ...prev,
                                        casteSubcastes: ["All"]
                                      }));
                                    } else {
                                      // Deselect all subcastes
                                      setLocalFilters(prev => ({
                                        ...prev,
                                        casteSubcastes: []
                                      }));
                                    }
                                  } else {
                                    if (checked) {
                                      // Remove "All" if selecting specific subcaste
                                      const newSubcastes = current.filter(s => s !== "All");
                                      setLocalFilters(prev => ({
                                        ...prev,
                                        casteSubcastes: [...newSubcastes, subcaste]
                                      }));
                                    } else {
                                      setLocalFilters(prev => ({
                                        ...prev,
                                        casteSubcastes: current.filter(s => s !== subcaste)
                                      }));
                                    }
                                  }
                                }}
                              />
                              <Label htmlFor={`subcaste-${subcaste}`} className="text-sm text-gray-700 cursor-pointer">
                                {subcaste}
                              </Label>
                            </div>
                          ))}
                          {getRemainingCount(availableSubcastes, 'casteSubcaste') > 0 && (
                            <Button
                              variant="ghost"
                              className="mt-2 text-xs text-blue-600"
                              onClick={() => toggleExpanded('casteSubcaste')}
                            >
                              {expandedSections.casteSubcaste ? 'Show Less' : `+${getRemainingCount(availableSubcastes, 'casteSubcaste')} More`}
                            </Button>
                          )}
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <div className="text-sm text-gray-500 italic">
                        {selectedGroups.length === 0 ? "Please select a Caste Group first to see subcaste options" : "No subcastes available for selected caste groups"}
                      </div>
                    );
                  }
                })()}
              </div>
            )}
          </div>

          {/* Spiritual Practices */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('spiritualPractices')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">SPIRITUAL PRACTICES</h3>
              {openSections.spiritualPractices ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.spiritualPractices && (
              <div className="mt-3">
                <Input 
                  placeholder="Search Practices" 
                  className="mb-3 h-9 text-sm"
                  value={searchStates.spiritualPractices}
                  onChange={(e) => updateSearch('spiritualPractices', e.target.value)}
                />
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {getVisibleOptions(spiritualPractices, 'spiritualPractices').map((practice) => (
                    <div key={practice} className="flex items-center space-x-2">
                      <Checkbox
                        id={practice}
                        checked={localFilters.spiritualPractices?.includes(practice) || false}
                        onCheckedChange={(checked) => {
                          const current = localFilters.spiritualPractices || [];
                          if (checked) {
                            setLocalFilters(prev => ({
                              ...prev,
                              spiritualPractices: [...current, practice]
                            }));
                          } else {
                            setLocalFilters(prev => ({
                              ...prev,
                              spiritualPractices: current.filter(p => p !== practice)
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={practice} className="text-sm text-gray-700 cursor-pointer">
                        {practice}
                      </Label>
                    </div>
                  ))}
                  {getRemainingCount(spiritualPractices, 'spiritualPractices') > 0 && (
                    <Button
                      variant="ghost"
                      className="mt-2 text-xs text-blue-600"
                      onClick={() => toggleExpanded('spiritualPractices')}
                    >
                      {expandedSections.spiritualPractices ? 'Show Less' : `+${getRemainingCount(spiritualPractices, 'spiritualPractices')} More`}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Religion */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('religion')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">RELIGION</h3>
              {openSections.religion ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.religion && (
              <div className="mt-3">
                <Input 
                  placeholder="Search Religion" 
                  className="mb-3 h-9 text-sm"
                  value={searchStates.religion}
                  onChange={(e) => updateSearch('religion', e.target.value)}
                />
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {getVisibleOptions(religionOptions, 'religion').map((religion) => (
                    <div key={religion} className="flex items-center space-x-2">
                      <Checkbox
                        id={religion}
                        checked={localFilters.religion === religion}
                        onCheckedChange={(checked) => {
                          setLocalFilters(prev => ({
                            ...prev,
                            religion: checked ? religion : undefined
                          }));
                        }}
                      />
                      <label htmlFor={religion} className="text-sm text-gray-700 cursor-pointer">
                        {religion}
                      </label>
                    </div>
                  ))}
                </div>
                {getRemainingCount(religionOptions, 'religion') > 0 && (
                  <Button
                    variant="ghost"
                    className="mt-2 text-xs text-blue-600"
                    onClick={() => toggleExpanded('religion')}
                  >
                    {expandedSections.religion ? 'Show Less' : `+${getRemainingCount(religionOptions, 'religion')} More`}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Ethnicity */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('ethnicity')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">ETHNICITY</h3>
              {openSections.ethnicity ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.ethnicity && (
              <div className="mt-3">
                <Input 
                  placeholder="Search Ethnicity" 
                  className="mb-3 h-9 text-sm"
                  value={searchStates.ethnicity}
                  onChange={(e) => updateSearch('ethnicity', e.target.value)}
                />
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {getVisibleOptions(ethnicityOptions, 'ethnicity').map((ethnicity) => (
                    <div key={ethnicity} className="flex items-center space-x-2">
                      <Checkbox
                        id={ethnicity}
                        checked={localFilters.ethnicity === ethnicity}
                        onCheckedChange={(checked) => {
                          setLocalFilters(prev => ({
                            ...prev,
                            ethnicity: checked ? ethnicity : undefined
                          }));
                        }}
                      />
                      <label htmlFor={ethnicity} className="text-sm text-gray-700 cursor-pointer">
                        {ethnicity}
                      </label>
                    </div>
                  ))}
                </div>
                {getRemainingCount(ethnicityOptions, 'ethnicity') > 0 && (
                  <Button
                    variant="ghost"
                    className="mt-2 text-xs text-blue-600"
                    onClick={() => toggleExpanded('ethnicity')}
                  >
                    {expandedSections.ethnicity ? 'Show Less' : `+${getRemainingCount(ethnicityOptions, 'ethnicity')} More`}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Annual Income */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('annualIncome')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">ANNUAL INCOME</h3>
              {openSections.annualIncome ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.annualIncome && (
              <div className="mt-3">
                <Input 
                  placeholder="Search Income Range" 
                  className="mb-3 h-9 text-sm"
                  value={searchStates.annualIncome}
                  onChange={(e) => updateSearch('annualIncome', e.target.value)}
                />
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {getVisibleOptions(annualIncomeOptions, 'annualIncome').map((income) => (
                    <div key={income} className="flex items-center space-x-2">
                      <Checkbox
                        id={income}
                        checked={localFilters.annualIncome === income}
                        onCheckedChange={(checked) => {
                          setLocalFilters(prev => ({
                            ...prev,
                            annualIncome: checked ? income : undefined
                          }));
                        }}
                      />
                      <label htmlFor={income} className="text-sm text-gray-700 cursor-pointer">
                        {income}
                      </label>
                    </div>
                  ))}
                </div>
                {getRemainingCount(annualIncomeOptions, 'annualIncome') > 0 && (
                  <Button
                    variant="ghost"
                    className="mt-2 text-xs text-blue-600"
                    onClick={() => toggleExpanded('annualIncome')}
                  >
                    {expandedSections.annualIncome ? 'Show Less' : `+${getRemainingCount(annualIncomeOptions, 'annualIncome')} More`}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Marital Status Section */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('maritalStatus')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">MARITAL STATUS</h3>
              {openSections.maritalStatus ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.maritalStatus && (
              <div className="mt-3">
                <Select
                  value={localFilters.maritalStatus || ""}
                  onValueChange={(value) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      maritalStatus: value || undefined
                    }))
                  }
                >
                  <SelectTrigger className="h-9 text-sm">
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
              </div>
            )}
          </div>

          {/* Lifestyle & Habits Section */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('lifestyleHabits')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">LIFESTYLE & HABITS</h3>
              {openSections.lifestyleHabits ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.lifestyleHabits && (
              <div className="mt-3 space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Dietary Preference</Label>
                  <Select
                    value={localFilters.eatingHabits || ""}
                    onValueChange={(value) =>
                      setLocalFilters(prev => ({
                        ...prev,
                        eatingHabits: value || undefined
                      }))
                    }
                  >
                    <SelectTrigger className="h-9 text-sm">
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
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Drinking Habits</Label>
                  <Select
                    value={localFilters.drinkingHabits || ""}
                    onValueChange={(value) =>
                      setLocalFilters(prev => ({
                        ...prev,
                        drinkingHabits: value || undefined
                      }))
                    }
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select Habit" />
                    </SelectTrigger>
                    <SelectContent>
                      {drinkingHabitsOptions.map((habit: string) => (
                        <SelectItem key={habit} value={habit}>
                          {habit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Smoking Habits</Label>
                  <Select
                    value={localFilters.smokingHabits || ""}
                    onValueChange={(value) =>
                      setLocalFilters(prev => ({
                        ...prev,
                        smokingHabits: value || undefined
                      }))
                    }
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select Habit" />
                    </SelectTrigger>
                    <SelectContent>
                      {smokingHabitsOptions.map((habit: string) => (
                        <SelectItem key={habit} value={habit}>
                          {habit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Other Preferences Section */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('lifestyle')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">OTHER PREFERENCES</h3>
              {openSections.lifestyle ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>

            {openSections.lifestyle && (
              <div className="mt-3 space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Have Children</Label>
                  <Select
                    value={localFilters.hasChildren || ""}
                    onValueChange={(value) =>
                      setLocalFilters(prev => ({
                        ...prev,
                        hasChildren: value || undefined
                      }))
                    }
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent>
                      {hasChildrenOptions.map((option: string) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Horoscope</Label>
                  <Select
                    value={localFilters.horoscope || ""}
                    onValueChange={(value) =>
                      setLocalFilters(prev => ({
                        ...prev,
                        horoscope: value || undefined
                      }))
                    }
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select Sign" />
                    </SelectTrigger>
                    <SelectContent>
                      {horoscopeOptions.map((sign: string) => (
                        <SelectItem key={sign} value={sign}>
                          {sign}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Mangalik</Label>
                  <Select
                    value={localFilters.mangalik || ""}
                    onValueChange={(value) =>
                      setLocalFilters(prev => ({
                        ...prev,
                        mangalik: value || undefined
                      }))
                    }
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent>
                      {mangalikOptions.map((option: string) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Residential Status</Label>
                  <Select
                    value={localFilters.residentialStatus || ""}
                    onValueChange={(value) =>
                      setLocalFilters(prev => ({
                        ...prev,
                        residentialStatus: value || undefined
                      }))
                    }
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {residentialStatusOptions.map((status: string) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Additional Options */}
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
                🛡️ Verified Profiles Only
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
                📷 With Photo Only
              </Label>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button 
            onClick={handleSearch} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </aside>
  );
});

SpiritualFilterSidebar.displayName = "SpiritualFilterSidebar";

export default SpiritualFilterSidebar;