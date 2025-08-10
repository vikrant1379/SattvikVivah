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
import { ChevronDown, ChevronRight, X, Loader2 } from "lucide-react";
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
  ethnicityOptions
} from "../data/personal-attributes";
import { 
  spiritualPractices,
  sacredTexts,
  guruLineages,
  dietaryLifestyles
} from "../data/spiritual-practices";
import { annualIncomeMinOptions, annualIncomeMaxOptions, annualIncomeOptions } from "../data/annual-income";
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
  const { filters, setFilters, searchProfiles, isSearching } = useSpiritualContext();
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
  const [savedFilters, setSavedFilters] = useState<(ProfileFilter & { name: string; id: string })[]>([]);
  const [savedFiltersOpen, setSavedFiltersOpen] = useState(false);
  const [renamingFilterId, setRenamingFilterId] = useState<string | null>(null);
  const [editingFilterName, setEditingFilterName] = useState("");
  const [currentLoadedFilterId, setCurrentLoadedFilterId] = useState<string | null>(null);

  // Load saved filters and latest search from localStorage on mount
  useEffect(() => {
    try {
      // Load saved filters
      const saved = localStorage.getItem('spiritualFiltersSaved');
      if (saved) {
        const parsedSaved = JSON.parse(saved);
        setSavedFilters(parsedSaved);
      }

      // Load and apply latest search only if it has meaningful selections
      const latestSearch = localStorage.getItem('spiritualFiltersLatest');
      if (latestSearch) {
        const parsedLatest = JSON.parse(latestSearch);
        if (hasActiveFilterSelections(parsedLatest)) {
          setLocalFilters(parsedLatest);
          setCurrentLoadedFilterId('latest');
        } else {
          // Remove invalid latest search
          localStorage.removeItem('spiritualFiltersLatest');
        }
      }
    } catch (error) {
      console.error('Failed to load saved filters:', error);
    }
  }, []);

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

  const generateFilterName = () => {
    // Find the next available "Save X" number
    const existingNumbers = savedFilters
      .map(f => f.name.match(/^Save (\d+)$/))
      .filter(match => match)
      .map(match => parseInt(match![1]));

    // Find the smallest available number starting from 1
    let nextNumber = 1;
    while (existingNumbers.includes(nextNumber)) {
      nextNumber++;
    }
    return `Save ${nextNumber}`;
  };

  const renumberSavedFilters = (filters: (ProfileFilter & { name: string; id: string })[]) => {
    // Renumber only the auto-generated names (Save X format)
    const autoGenerated = filters.filter(f => f.name.match(/^Save (\d+)$/));
    const customNamed = filters.filter(f => !f.name.match(/^Save (\d+)$/));

    // Sort auto-generated by current number and reassign sequential numbers
    autoGenerated.sort((a, b) => {
      const aNum = parseInt(a.name.match(/^Save (\d+)$/)[1]);
      const bNum = parseInt(b.name.match(/^Save (\d+)$/)[1]);
      return aNum - bNum;
    });

    autoGenerated.forEach((filter, index) => {
      filter.name = `Save ${index + 1}`;
    });

    return [...autoGenerated, ...customNamed];
  };

  const areFiltersEqual = (filters1: ProfileFilter, filters2: ProfileFilter) => {
    // Compare all filter properties for equality
    const keys = new Set([...Object.keys(filters1), ...Object.keys(filters2)]);

    for (const key of keys) {
      const value1 = filters1[key as keyof ProfileFilter];
      const value2 = filters2[key as keyof ProfileFilter];

      // Handle arrays
      if (Array.isArray(value1) && Array.isArray(value2)) {
        if (value1.length !== value2.length) return false;
        const sorted1 = [...value1].sort();
        const sorted2 = [...value2].sort();
        if (!sorted1.every((val, index) => val === sorted2[index])) return false;
      } else if (Array.isArray(value1) || Array.isArray(value2)) {
        return false;
      } else if (value1 !== value2) {
        return false;
      }
    }
    return true;
  };

  const saveCurrentFilters = () => {
    // Check if current filters are unique among saved filters only
    const isDuplicate = savedFilters.some(savedFilter => {
      const { name, id, ...filterData } = savedFilter;
      return areFiltersEqual(localFilters, filterData);
    });

    if (isDuplicate) {
      alert("These filters have already been saved. Please modify the filters to save a new combination.");
      return;
    }

    const name = generateFilterName();
    const newSavedFilter = {
      ...localFilters,
      name,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    setSavedFilters(prev => {
      const updated = [...prev, newSavedFilter];
      const renumbered = renumberSavedFilters(updated);
      // Save to localStorage
      localStorage.setItem('spiritualFiltersSaved', JSON.stringify(renumbered));
      return renumbered;
    });
    setCurrentLoadedFilterId(newSavedFilter.id);
  };

  const updateExistingFilter = (filterId: string) => {
    setSavedFilters(prev => {
      const updated = prev.map(filter => 
        filter.id === filterId 
          ? { ...localFilters, name: filter.name, id: filter.id }
          : filter
      );
      // Save to localStorage
      localStorage.setItem('spiritualFiltersSaved', JSON.stringify(updated));
      return updated;
    });
    setCurrentLoadedFilterId(filterId);
  };

  const loadSavedFilter = (savedFilter: ProfileFilter & { name: string; id: string }) => {
    const { name, id, ...filterData } = savedFilter;
    setLocalFilters(filterData);
    setCurrentLoadedFilterId(id);
    setRenamingFilterId(null);
    // Update latest search when a saved filter is loaded
    localStorage.setItem('spiritualFiltersLatest', JSON.stringify(filterData));
  };

  const deleteSavedFilter = (filterId: string) => {
    setSavedFilters(prev => {
      const filtered = prev.filter(f => f.id !== filterId);
      const renumbered = renumberSavedFilters(filtered);
      // Save to localStorage
      localStorage.setItem('spiritualFiltersSaved', JSON.stringify(renumbered));
      return renumbered;
    });
    if (currentLoadedFilterId === filterId) {
      setCurrentLoadedFilterId(null);
    }
  };

  const startRenaming = (filterId: string, currentName: string) => {
    setRenamingFilterId(filterId);
    setEditingFilterName(currentName);
  };

  const saveRename = (filterId: string) => {
    const newName = editingFilterName.trim();
    if (newName) {
      // Check if name is unique (excluding current filter)
      const nameExists = savedFilters.some(f => f.id !== filterId && f.name === newName);
      if (!nameExists) {
        setSavedFilters(prev => {
          const updated = prev.map(filter => 
            filter.id === filterId 
              ? { ...filter, name: newName }
              : filter
          );
          // Save to localStorage
          localStorage.setItem('spiritualFiltersSaved', JSON.stringify(updated));
          return updated;
        });
        setRenamingFilterId(null);
        setEditingFilterName("");
      } else {
        // Name already exists, keep editing mode
        alert("This name already exists. Please choose a different name.");
      }
    }
  };

  const cancelRename = () => {
    setRenamingFilterId(null);
    setEditingFilterName("");
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

    if (localFilters.annualIncomeMin || localFilters.annualIncomeMax) {
      const minIncome = localFilters.annualIncomeMin || "No Min";
      const maxIncome = localFilters.annualIncomeMax || "No Max";
      active.push({
        key: 'annualIncome',
        label: `Income: ${minIncome} - ${maxIncome}`,
        onRemove: () => setLocalFilters(prev => ({ ...prev, annualIncomeMin: undefined, annualIncomeMax: undefined }))
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

    // Only save to latest search if there are meaningful filter selections
    if (hasActiveFilterSelections(localFilters)) {
      localStorage.setItem('spiritualFiltersLatest', JSON.stringify(localFilters));
      
      // Only set to 'latest' if no saved filter is currently active
      if (!currentLoadedFilterId || currentLoadedFilterId === 'latest') {
        setCurrentLoadedFilterId('latest');
      }
    } else {
      // Remove latest search if no meaningful selections
      localStorage.removeItem('spiritualFiltersLatest');
      if (currentLoadedFilterId === 'latest') {
        setCurrentLoadedFilterId(null);
      }
    }
  }, [localFilters, setFilters, searchProfiles, currentLoadedFilterId]);

  // Auto-apply filters when localFilters change (with debouncing)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Check if current filters match any saved filter
      const matchingSavedFilterId = getMatchingSavedFilterId();

      if (matchingSavedFilterId) {
        // If filters match a saved filter, set that as active
        setCurrentLoadedFilterId(matchingSavedFilterId);
      } else if (currentLoadedFilterId && currentLoadedFilterId !== 'latest') {
        // If we had a saved filter active but filters changed, switch to latest
        setCurrentLoadedFilterId('latest');
      }

      handleSearch();
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [localFilters, handleSearch]);

  const clearFilters = useCallback(() => {
    const clearedFilters = {
      casteGroups: [],
      casteSubcastes: []
    };
    setLocalFilters(clearedFilters);
    setFilters(clearedFilters);
    setCurrentLoadedFilterId(null);
    // Clear latest search from localStorage as well
    localStorage.removeItem('spiritualFiltersLatest');
    
    // Force re-render of saved filters section to hide it if no saved filters
    if (savedFilters.length === 0) {
      setSavedFiltersOpen(false);
    }
  }, [setFilters, savedFilters.length]);

  const activeFilters = getActiveFilters();

  // Check if there are any active filters to save and if they are unique
  const hasFiltersToSave = () => {
    // First check if there are any active filters
    const hasActiveFilters = Object.values(localFilters).some(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== "" && value !== false;
    });

    if (!hasActiveFilters) return false;

    // Check if current filters are unique among saved filters (not including latest search)
    const isDuplicate = savedFilters.some(savedFilter => {
      const { name, id, ...filterData } = savedFilter;
      return areFiltersEqual(localFilters, filterData);
    });

    // Allow saving even if it matches latest search - users should be able to give it a name
    return !isDuplicate;
  };

  // Check if current filters can be updated to an existing saved filter
  const canUpdateCurrentFilter = () => {
    if (!currentLoadedFilterId || currentLoadedFilterId === 'latest') return false;

    const currentSavedFilter = savedFilters.find(f => f.id === currentLoadedFilterId);
    if (!currentSavedFilter) return false;

    const { name, id, ...savedFilterData } = currentSavedFilter;
    return !areFiltersEqual(localFilters, savedFilterData);
  };

  // Check if current filters match any saved filter exactly
  const getMatchingSavedFilterId = () => {
    const matchingFilter = savedFilters.find(savedFilter => {
      const { name, id, ...filterData } = savedFilter;
      return areFiltersEqual(localFilters, filterData);
    });
    return matchingFilter?.id || null;
  };

  // Check if there are any meaningful filter selections
  const hasActiveFilterSelections = (filters: ProfileFilter) => {
    return Object.entries(filters).some(([key, value]) => {
      // Skip these keys as they don't represent meaningful selections
      if (key === 'casteGroups' || key === 'casteSubcastes') {
        return Array.isArray(value) && value.length > 0;
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== "" && value !== false && value !== null;
    });
  };

  const getShowMoreText = (options: string[], section: string) => {
    return expandedSections[section as keyof typeof expandedSections] ? 'Show Less' : `+${getRemainingCount(options, section)} More`;
  };

  return (
    <aside className="w-full h-full bg-white overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 border-b border-gray-100 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">🔍 Filters</h2>
          </div>

          {/* Action Buttons */}
          <div className={`grid gap-2 mb-4 ${hasFiltersToSave() ? 'grid-cols-3' : 'grid-cols-2'}`}>
            <Button 
              variant="outline" 
              size="sm"
              onClick={collapseAllSections}
              className="flex items-center justify-center gap-2 text-slate-600 text-xs font-medium hover:bg-slate-50 hover:text-slate-800 border-slate-200 px-3 py-2 h-8 rounded-lg bg-white shadow-sm transition-all duration-200 hover:shadow-md"
              title="Collapse All Sections"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Collapse</span>
            </Button>

            {hasFiltersToSave() && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={saveCurrentFilters}
                className="flex items-center justify-center gap-2 text-blue-600 text-xs font-medium hover:bg-blue-50 hover:text-blue-700 border-blue-200 px-3 py-2 h-8 rounded-lg bg-white shadow-sm transition-all duration-200 hover:shadow-md"
                title="Save Current Filters"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <span>Save</span>
              </Button>
            )}

            {activeFilters.length > 0 ? (
              <Button 
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 text-red-600 text-xs font-medium hover:bg-red-50 hover:text-red-700 border-red-200 px-3 py-2 h-8 rounded-lg bg-white shadow-sm transition-all duration-200 hover:shadow-md"
                title="Clear All Filters"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear</span>
              </Button>
            ) : (
              <div className="flex items-center justify-center px-3 py-2 h-8 bg-gray-50 border border-gray-100 rounded-lg">
                <span className="text-xs text-gray-400">No filters</span>
              </div>
            )}
          </div>
        </div>

        {/* Saved Filters - Collapsible */}
        {((() => {
          const latestSearch = localStorage.getItem('spiritualFiltersLatest');
          if (!latestSearch) return savedFilters.length > 0;
          
          try {
            const parsedLatest = JSON.parse(latestSearch);
            return hasActiveFilterSelections(parsedLatest) || savedFilters.length > 0;
          } catch {
            return savedFilters.length > 0;
          }
        })()) && (
          <Collapsible 
            open={savedFiltersOpen} 
            onOpenChange={setSavedFiltersOpen}
            className="mb-4"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center justify-between w-full p-2 h-auto text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-800"
              >
                <span>Saved Filters ({savedFilters.length + ((() => {
                  const latestSearch = localStorage.getItem('spiritualFiltersLatest');
                  if (!latestSearch) return 0;
                  
                  try {
                    const parsedLatest = JSON.parse(latestSearch);
                    return hasActiveFilterSelections(parsedLatest) ? 1 : 0;
                  } catch {
                    return 0;
                  }
                })())})</span>
                {savedFiltersOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="space-y-2">
                {/* Latest Search Option */}
                {(() => {
                  const latestSearch = localStorage.getItem('spiritualFiltersLatest');
                  if (!latestSearch) return false;
                  
                  try {
                    const parsedLatest = JSON.parse(latestSearch);
                    return hasActiveFilterSelections(parsedLatest);
                  } catch {
                    return false;
                  }
                })() && (
                  <div className={`border rounded-md transition-all ${
                    currentLoadedFilterId === 'latest' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-purple-50 border-purple-200'
                  }`}>
                    <div className="flex items-center justify-between p-2">
                      <button
                        onClick={() => {
                          try {
                            const latestSearch = localStorage.getItem('spiritualFiltersLatest');
                            if (latestSearch) {
                              const parsedLatest = JSON.parse(latestSearch);
                              setLocalFilters(parsedLatest);
                              setCurrentLoadedFilterId('latest');
                            }
                          } catch (error) {
                            console.error('Failed to load latest search:', error);
                          }
                        }}
                        className={`text-sm hover:text-purple-900 flex-1 text-left font-medium ${
                          currentLoadedFilterId === 'latest' 
                            ? 'text-green-700' 
                            : 'text-purple-700'
                        }`}
                        title="Load your most recent search"
                      >
                        📅 Latest Search
                        {currentLoadedFilterId === 'latest' && (
                          <span className="ml-2 text-xs text-green-600 font-normal">(Active)</span>
                        )}
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            localStorage.removeItem('spiritualFiltersLatest');
                            if (currentLoadedFilterId === 'latest') {
                              setCurrentLoadedFilterId(null);
                              // Reset to empty filters
                              const emptyFilters = {
                                casteGroups: [],
                                casteSubcastes: [],
                                annualIncomeMin: undefined,
                                annualIncomeMax: undefined,
                              };
                              setLocalFilters(emptyFilters);
                            }

                            // Force component re-render to hide the latest search option
                            setSavedFiltersOpen(false);
                            setTimeout(() => setSavedFiltersOpen(true), 50);
                          }}
                          className="text-red-500 hover:text-red-700 text-sm px-1 transition-all duration-200 hover:bg-red-50 rounded"
                          title="Clear latest search"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {savedFilters.map((savedFilter) => (
                  <div key={savedFilter.id} className={`border rounded-md transition-all ${
                    currentLoadedFilterId === savedFilter.id 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-center justify-between p-2">
                      {renamingFilterId === savedFilter.id ? (
                        <div className="flex items-center gap-1 flex-1">
                          <Input
                            value={editingFilterName}
                            onChange={(e) => setEditingFilterName(e.target.value)}
                            className="h-7 text-xs flex-1"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') saveRename(savedFilter.id);
                              if (e.key === 'Escape') cancelRename();
                            }}
                            autoFocus
                          />
                          <button
                            onClick={() => saveRename(savedFilter.id)}
                            className="text-green-600 hover:text-green-700 text-sm px-1"
                            title="Save name"
                          >
                            ✓
                          </button>
                          <button
                            onClick={cancelRename}
                            className="text-red-500 hover:text-red-700 text-sm px-1"
                            title="Cancel"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => loadSavedFilter(savedFilter)}
                            className={`text-sm hover:text-blue-900 flex-1 text-left font-medium ${
                              currentLoadedFilterId === savedFilter.id 
                                ? 'text-green-700' 
                                : 'text-blue-700'
                            }`}
                            title="Activate this filter"
                          >
                            {savedFilter.name}
                            {currentLoadedFilterId === savedFilter.id && (
                              <span className="ml-2 text-xs text-green-600 font-normal">(Active)</span>
                            )}
                          </button>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => startRenaming(savedFilter.id, savedFilter.name)}
                              className="text-gray-500 hover:text-gray-700 text-sm px-1"
                              title="Rename filter"
                            >
                              ✏️
                            </button>
                            {currentLoadedFilterId === savedFilter.id && canUpdateCurrentFilter() && (
                              <button
                                onClick={() => updateExistingFilter(savedFilter.id)}
                                className="text-orange-600 hover:text-orange-700 text-sm px-1"
                                title="Update with current filters"
                              >
                                🔄
                              </button>
                            )}
                            <button
                              onClick={() => deleteSavedFilter(savedFilter.id)}
                              className="text-red-500 hover:text-red-700 text-sm px-1"
                              title="Delete saved filter"
                            >
                              ✕
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
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
                        <SelectValue placeholder="Min years" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageOptions
                          .filter(age => !localFilters.ageMax || age <= localFilters.ageMax)
                          .map((age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age} years
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
                        <SelectValue placeholder="Max years" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageOptions
                          .filter(age => !localFilters.ageMin || age >= localFilters.ageMin)
                          .map((age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age} years
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
                  {getFilteredOptions(
                    motherTongues.filter(language => language !== localFilters.motherTongue), 
                    searchStates.otherLanguages || ""
                  ).map((language) => (
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
                      className="mt-2 p-0 h-auto text-xs text-blue-600 hover:text-blue-800"
                      onClick={() => toggleExpanded('education')}
                    >
                      {getShowMoreText(educationOptions, 'education')}
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
                      className="mt-2 p-0 h-auto text-xs text-blue-600 hover:text-blue-800"
                      onClick={() => toggleExpanded('profession')}
                    >
                      {getShowMoreText(professionOptions, 'profession')}
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
                      className="mt-2 p-0 h-auto text-xs text-blue-600 hover:text-blue-800"
                      onClick={() => toggleExpanded('casteGroup')}
                    >
                      {getShowMoreText(casteGroupOptions, 'casteGroup')}
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
                              className="mt-2 p-0 h-auto text-xs text-blue-600 hover:text-blue-800"
                              onClick={() => toggleExpanded('casteSubcaste')}
                            >
                              {getShowMoreText(availableSubcastes, 'casteSubcaste')}
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
                      className="mt-2 p-0 h-auto text-xs text-blue-600 hover:text-blue-800"
                      onClick={() => toggleExpanded('spiritualPractices')}
                    >
                      {getShowMoreText(spiritualPractices, 'spiritualPractices')}
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
                    className="mt-2 p-0 h-auto text-xs text-blue-600 hover:text-blue-800"
                    onClick={() => toggleExpanded('religion')}
                  >
                    {getShowMoreText(religionOptions, 'religion')}
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
                    className="mt-2 p-0 h-auto text-xs text-blue-600 hover:text-blue-800"
                    onClick={() => toggleExpanded('ethnicity')}
                  >
                    {getShowMoreText(ethnicityOptions, 'ethnicity')}
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
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Select
                      value={localFilters.annualIncomeMin || ""}
                      onValueChange={(value) => {
                        const newMin = value || undefined;
                        setLocalFilters(prev => ({
                          ...prev,
                          annualIncomeMin: newMin,
                          // Reset max income if it becomes less than or equal to min income
                          annualIncomeMax: prev.annualIncomeMax && newMin && 
                            annualIncomeMaxOptions.indexOf(prev.annualIncomeMax) <= annualIncomeMinOptions.indexOf(newMin) 
                            ? undefined : prev.annualIncomeMax
                        }));
                      }}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Min Salary" />
                      </SelectTrigger>
                      <SelectContent>
                        {annualIncomeMinOptions
                          .filter(income => !localFilters.annualIncomeMax || 
                            annualIncomeMinOptions.indexOf(income) < annualIncomeMaxOptions.indexOf(localFilters.annualIncomeMax))
                          .map((income) => (
                          <SelectItem key={income} value={income}>
                            {income}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select
                      value={localFilters.annualIncomeMax || ""}
                      onValueChange={(value) => {
                        const newMax = value || undefined;
                        setLocalFilters(prev => ({
                          ...prev,
                          annualIncomeMax: newMax,
                          // Reset min income if it becomes greater than or equal to max income
                          annualIncomeMin: prev.annualIncomeMin && newMax && 
                            annualIncomeMinOptions.indexOf(prev.annualIncomeMin) >= annualIncomeMaxOptions.indexOf(newMax) 
                            ? undefined : prev.annualIncomeMin
                        }));
                      }}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Max Salary" />
                      </SelectTrigger>
                      <SelectContent>
                        {annualIncomeMaxOptions
                          .filter(income => !localFilters.annualIncomeMin || 
                            annualIncomeMaxOptions.indexOf(income) >= annualIncomeMinOptions.indexOf(localFilters.annualIncomeMin))
                          .map((income) => (
                          <SelectItem key={income} value={income}>
                            {income}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* Annual Income validation message */}
                {localFilters.annualIncomeMin && localFilters.annualIncomeMax && 
                 annualIncomeMinOptions.indexOf(localFilters.annualIncomeMin) >= annualIncomeMaxOptions.indexOf(localFilters.annualIncomeMax) && (
                  <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                    Minimum salary cannot be greater than maximum salary
                  </div>
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
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Searching...
              </>
            ) : (
              "Apply Filters Now"
            )}
          </Button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Filters apply automatically as you make changes
          </p>
        </div>
      </div>
    </aside>
  );
});

SpiritualFilterSidebar.displayName = "SpiritualFilterSidebar";

export default SpiritualFilterSidebar;