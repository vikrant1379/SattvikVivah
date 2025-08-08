
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
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useSpiritualContext } from "@/contexts/spiritual-context";
import { countries, statesByCountry, citiesByState, motherTongues } from "@/data/locations";
import { casteOptions } from "../data/caste";
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
  heightOptions
} from "../data/personal-attributes";
import { 
  spiritualPractices,
  sacredTexts,
  guruLineages,
  dietaryLifestyles
} from "../data/spiritual-practices";
import type { ProfileFilter } from "@shared/schema";

const SpiritualFilterSidebar = memo(() => {
  const { filters, setFilters, searchProfiles } = useSpiritualContext();
  const [localFilters, setLocalFilters] = useState<ProfileFilter>({
    ageMin: filters.ageMin,
    ageMax: filters.ageMax,
    country: filters.country,
    state: filters.state,
    city: filters.city,
    motherTongue: filters.motherTongue,
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
  });

  // Collapsible states - start with some sections open
  const [openSections, setOpenSections] = useState({
    age: true,
    location: true,
    education: false,
    profession: false,
    spiritualPractices: false,
    sacredTexts: false,
    lifestyle: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
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
    
    if (localFilters.motherTongue) {
      active.push({
        key: 'motherTongue',
        label: localFilters.motherTongue,
        onRemove: () => setLocalFilters(prev => ({ ...prev, motherTongue: undefined }))
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
    
    return active;
  };

  const handleSearch = useCallback(() => {
    setFilters(localFilters);
    searchProfiles(localFilters);
  }, [localFilters, setFilters, searchProfiles]);

  const handleClearAll = useCallback(() => {
    const clearedFilters = {};
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
          {activeFilters.length > 0 && (
            <Button 
              variant="ghost" 
              onClick={handleClearAll}
              className="text-blue-600 text-sm font-medium hover:bg-blue-50 px-2 py-1 h-auto"
            >
              CLEAR ALL
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <div 
                  key={filter.key}
                  className="inline-flex items-center bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  <X 
                    className="w-3 h-3 mr-1 cursor-pointer hover:text-gray-900" 
                    onClick={filter.onRemove}
                  />
                  {filter.label}
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
                      onValueChange={(value) =>
                        setLocalFilters(prev => ({
                          ...prev,
                          ageMin: value ? parseInt(value) : undefined
                        }))
                      }
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Min" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageOptions.map((age) => (
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
                      onValueChange={(value) =>
                        setLocalFilters(prev => ({
                          ...prev,
                          ageMax: value ? parseInt(value) : undefined
                        }))
                      }
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Max" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageOptions.map((age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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
                <Combobox
                  options={countries.map(country => ({ value: country.value, label: country.label }))}
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
                />
                
                {localFilters.country && (
                  <Combobox
                    options={(statesByCountry[localFilters.country] || []).map(state => ({ 
                      value: state, 
                      label: state 
                    }))}
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
                  />
                )}
                
                {localFilters.state && (
                  <Combobox
                    options={(citiesByState[localFilters.state] || []).map(city => ({ 
                      value: city, 
                      label: city 
                    }))}
                    value={localFilters.city || ""}
                    onSelect={(value) => {
                      setLocalFilters(prev => ({
                        ...prev,
                        city: value || undefined
                      }));
                    }}
                    placeholder="Select City"
                    searchPlaceholder="Search cities..."
                  />
                )}
              </div>
            )}
          </div>

          {/* Mother Tongue */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide mb-3">MOTHER TONGUE</h3>
            <Combobox
              options={motherTongues.map(lang => ({
                value: lang,
                label: lang
              }))}
              value={localFilters.motherTongue || ""}
              onSelect={(value) =>
                setLocalFilters(prev => ({
                  ...prev,
                  motherTongue: value || undefined
                }))
              }
              placeholder="Select Language"
              searchPlaceholder="Search languages..."
            />
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
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {educationOptions.slice(0, 8).map((education) => (
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
                  {educationOptions.length > 8 && (
                    <div className="text-blue-600 text-sm font-medium cursor-pointer">
                      {educationOptions.length - 8} MORE
                    </div>
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
                />
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {professionOptions.slice(0, 8).map((profession) => (
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
                  {professionOptions.length > 8 && (
                    <div className="text-blue-600 text-sm font-medium cursor-pointer">
                      {professionOptions.length - 8} MORE
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Caste */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide mb-3">CASTE</h3>
            <Input 
              placeholder="Search Caste" 
              className="mb-3 h-9 text-sm"
            />
            <div className="max-h-48 overflow-y-auto space-y-2">
              {casteOptions.slice(0, 8).map((caste) => (
                <div key={caste} className="flex items-center space-x-2">
                  <Checkbox
                    id={caste}
                    checked={localFilters.caste === caste}
                    onCheckedChange={(checked) => {
                      setLocalFilters(prev => ({
                        ...prev,
                        caste: checked ? caste : undefined
                      }));
                    }}
                  />
                  <Label htmlFor={caste} className="text-sm text-gray-700 cursor-pointer">
                    {caste}
                  </Label>
                </div>
              ))}
              {casteOptions.length > 8 && (
                <div className="text-blue-600 text-sm font-medium cursor-pointer">
                  {casteOptions.length - 8} MORE
                </div>
              )}
            </div>
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
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {spiritualPractices.slice(0, 8).map((practice) => (
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
                  {spiritualPractices.length > 8 && (
                    <div className="text-blue-600 text-sm font-medium cursor-pointer">
                      {spiritualPractices.length - 8} MORE
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Lifestyle */}
          <div className="border-b border-gray-200 pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('lifestyle')}
            >
              <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide">LIFESTYLE</h3>
              {openSections.lifestyle ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
              }
            </div>
            
            {openSections.lifestyle && (
              <div className="mt-3 space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Marital Status</Label>
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

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Dietary Preference</Label>
                  <Select
                    value={localFilters.dietaryLifestyle || ""}
                    onValueChange={(value) =>
                      setLocalFilters(prev => ({
                        ...prev,
                        dietaryLifestyle: value || undefined
                      }))
                    }
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select Diet" />
                    </SelectTrigger>
                    <SelectContent>
                      {dietaryLifestyles.map((diet: string) => (
                        <SelectItem key={diet} value={diet}>
                          {diet}
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
