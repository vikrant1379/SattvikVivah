
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
import { ChevronDown, ChevronRight } from "lucide-react";
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
  });

  // Collapsible states
  const [openSections, setOpenSections] = useState({
    age: false,
    height: false,
    location: false,
    education: false,
    profession: false,
    spiritualPractices: false,
    sacredTexts: false,
    guruLineage: false,
    lifestyle: false,
    dietaryLifestyle: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const { data: practicesData } = useQuery({
    queryKey: ['/api/spiritual-practices'],
    staleTime: Infinity,
  });

  const { data: textsData } = useQuery({
    queryKey: ['/api/sacred-texts'],
    staleTime: Infinity,
  });

  const { data: languagesData } = useQuery({
    queryKey: ['/api/languages'],
    staleTime: Infinity,
  });

  const handlePracticeChange = useCallback((practice: string, checked: boolean) => {
    setLocalFilters(prev => ({
      ...prev,
      spiritualPractices: checked
        ? [...(prev.spiritualPractices || []), practice]
        : (prev.spiritualPractices || []).filter(p => p !== practice)
    }));
  }, []);

  const handleSearch = useCallback(() => {
    setFilters(localFilters);
    searchProfiles(localFilters);
  }, [localFilters, setFilters, searchProfiles]);

  const handleClear = useCallback(() => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    setFilters(clearedFilters);
  }, [setFilters]);

  return (
    <aside className="w-80 bg-card border-r border-temple-gold/20 p-6 overflow-y-auto hidden lg:block">
      <Card className="border-temple-gold/30 shadow-lg">
        <CardHeader>
          <CardTitle className="font-serif font-semibold text-xl text-foreground mandala-border pb-4">
            Find Your Dharmic Partner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* Age Range */}
          <Collapsible open={openSections.age} onOpenChange={() => toggleSection('age')}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between text-left font-normal border-temple-gold/30 hover:border-temple-gold/50 transition-all duration-200"
              >
                <div className="flex flex-col items-start">
                  <Label className="text-sm font-medium text-earth-brown">Age</Label>
                  {(localFilters.ageMin || localFilters.ageMax) ? (
                    <span className="text-xs text-muted-foreground bg-sage/10 px-2 py-1 rounded-md mt-1">
                      {localFilters.ageMin || 18} - {localFilters.ageMax || 70} Years
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground/60">18 - 70 Years</span>
                  )}
                </div>
                {openSections.age ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-3 px-2 animate-in slide-in-from-top-2 duration-300">
              <div>
                <Label className="text-sm font-medium text-earth-brown mb-2 block">Minimum Age</Label>
                <Select
                  value={localFilters.ageMin?.toString() || "18"}
                  onValueChange={(value) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      ageMin: parseInt(value)
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select minimum age" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageOptions.map((age) => (
                      <SelectItem key={age} value={age.toString()}>
                        {age} Years
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-earth-brown mb-2 block">Maximum Age</Label>
                <Select
                  value={localFilters.ageMax?.toString() || "70"}
                  onValueChange={(value) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      ageMax: parseInt(value)
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select maximum age" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageOptions.map((age) => (
                      <SelectItem key={age} value={age.toString()}>
                        {age} Years
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Height Range */}
          <Collapsible open={openSections.height} onOpenChange={() => toggleSection('height')}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between text-left font-normal border-temple-gold/30 hover:border-temple-gold/50 transition-all duration-200"
              >
                <div className="flex flex-col items-start">
                  <Label className="text-sm font-medium text-earth-brown">Height</Label>
                  {(localFilters.heightMin || localFilters.heightMax) ? (
                    <span className="text-xs text-muted-foreground bg-sage/10 px-2 py-1 rounded-md mt-1">
                      {localFilters.heightMin || "4'0\""} - {localFilters.heightMax || "6'7\""}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground/60">4'0" - 6'7"</span>
                  )}
                </div>
                {openSections.height ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-3 px-2 animate-in slide-in-from-top-2 duration-300">
              <div>
                <Label className="text-sm font-medium text-earth-brown mb-2 block">Minimum Height</Label>
                <Select
                  value={localFilters.heightMin || "4'0\""}
                  onValueChange={(value) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      heightMin: value
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select minimum height" />
                  </SelectTrigger>
                  <SelectContent>
                    {heightOptions.map((height) => (
                      <SelectItem key={height} value={height}>
                        {height}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-earth-brown mb-2 block">Maximum Height</Label>
                <Select
                  value={localFilters.heightMax || "6'7\""}
                  onValueChange={(value) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      heightMax: value
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select maximum height" />
                  </SelectTrigger>
                  <SelectContent>
                    {heightOptions.map((height) => (
                      <SelectItem key={height} value={height}>
                        {height}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Location */}
          <Collapsible open={openSections.location} onOpenChange={() => toggleSection('location')}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between text-left font-normal border-temple-gold/30 hover:border-temple-gold/50 transition-all duration-200"
              >
                <div className="flex flex-col items-start">
                  <Label className="text-sm font-medium text-earth-brown">Location</Label>
                  {(localFilters.country || localFilters.state || localFilters.city) ? (
                    <div className="text-xs text-muted-foreground bg-sage/10 px-2 py-1 rounded-md mt-1">
                      {(() => {
                        const selectedCountry = countries.find(c => c.value === localFilters.country)?.label;
                        const parts = [selectedCountry, localFilters.state, localFilters.city].filter(Boolean);
                        return parts.join(" → ");
                      })()}
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground/60">Select your location</span>
                  )}
                </div>
                {openSections.location ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-4 px-2 animate-in slide-in-from-top-2 duration-300">
              {/* Country */}
              <div>
                <Label className="text-sm font-medium text-earth-brown mb-2 block">Country</Label>
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
              </div>

              {/* State */}
              {localFilters.country && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <Label className="text-sm font-medium text-earth-brown mb-2 block">State/Province</Label>
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
                    placeholder="Select State/Province"
                    searchPlaceholder="Search states..."
                  />
                </div>
              )}

              {/* City */}
              {localFilters.state && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <Label className="text-sm font-medium text-earth-brown mb-2 block">City</Label>
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
                </div>
              )}

              {/* Summary */}
              {(localFilters.country || localFilters.state || localFilters.city) && (
                <div className="p-3 bg-warm-beige/20 rounded-lg border border-temple-gold/20 animate-in slide-in-from-bottom-2 duration-300">
                  <Label className="text-xs font-medium text-earth-brown mb-1 block">Selected Location:</Label>
                  <div className="text-sm text-earth-brown/80 font-medium">
                    {(() => {
                      const selectedCountry = countries.find(c => c.value === localFilters.country)?.label;
                      const parts = [selectedCountry, localFilters.state, localFilters.city].filter(Boolean);
                      return parts.join(" → ");
                    })()}
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Mother Tongue */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">Mother Tongue</Label>
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
          <Collapsible open={openSections.education} onOpenChange={() => toggleSection('education')}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between text-left font-normal border-temple-gold/30 hover:border-temple-gold/50 transition-all duration-200"
              >
                <div className="flex flex-col items-start">
                  <Label className="text-sm font-medium text-earth-brown">Education</Label>
                  {localFilters.education && (
                    <span className="text-xs text-muted-foreground bg-sage/10 px-2 py-1 rounded-md mt-1">
                      {localFilters.education}
                    </span>
                  )}
                </div>
                {openSections.education ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 px-2 animate-in slide-in-from-top-2 duration-300">
              <Combobox
                options={educationOptions.map(education => ({ 
                  value: education, 
                  label: education 
                }))}
                value={localFilters.education || ""}
                onSelect={(value) => setLocalFilters(prev => ({ ...prev, education: value || undefined }))}
                placeholder="Select Education Level"
                searchPlaceholder="Search education levels..."
              />
            </CollapsibleContent>
          </Collapsible>

          {/* Profession */}
          <Collapsible open={openSections.profession} onOpenChange={() => toggleSection('profession')}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between text-left font-normal border-temple-gold/30 hover:border-temple-gold/50 transition-all duration-200"
              >
                <div className="flex flex-col items-start">
                  <Label className="text-sm font-medium text-earth-brown">Profession</Label>
                  {localFilters.profession && (
                    <span className="text-xs text-muted-foreground bg-sage/10 px-2 py-1 rounded-md mt-1">
                      {localFilters.profession}
                    </span>
                  )}
                </div>
                {openSections.profession ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 px-2 animate-in slide-in-from-top-2 duration-300">
              <Combobox
                options={professionOptions.map(profession => ({ 
                  value: profession, 
                  label: profession 
                }))}
                value={localFilters.profession || ""}
                onSelect={(value) => setLocalFilters(prev => ({ ...prev, profession: value || undefined }))}
                placeholder="Select Profession"
                searchPlaceholder="Search professions..."
              />
            </CollapsibleContent>
          </Collapsible>

          {/* Caste */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">Caste</Label>
            <Combobox
              options={casteOptions.map(caste => ({ value: caste, label: caste }))}
              value={localFilters.caste || ""}
              onSelect={(value) =>
                setLocalFilters(prev => ({
                  ...prev,
                  caste: value || undefined
                }))
              }
              placeholder="Select Caste"
              searchPlaceholder="Search caste..."
            />
          </div>

          {/* Marital Status */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">Marital Status</Label>
            <Select
              value={localFilters.maritalStatus || ""}
              onValueChange={(value) =>
                setLocalFilters(prev => ({
                  ...prev,
                  maritalStatus: value || undefined
                }))
              }
            >
              <SelectTrigger>
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

          {/* Spiritual Practices */}
          <Collapsible open={openSections.spiritualPractices} onOpenChange={() => toggleSection('spiritualPractices')}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between text-left font-normal border-temple-gold/30 hover:border-temple-gold/50 transition-all duration-200"
              >
                <div className="flex flex-col items-start">
                  <Label className="text-sm font-medium text-earth-brown">Spiritual Practices</Label>
                  {localFilters.spiritualPractices && localFilters.spiritualPractices.length > 0 && (
                    <span className="text-xs text-muted-foreground bg-sage/10 px-2 py-1 rounded-md mt-1">
                      {localFilters.spiritualPractices.length} selected
                    </span>
                  )}
                </div>
                {openSections.spiritualPractices ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 px-2 animate-in slide-in-from-top-2 duration-300">
              <div className="max-h-48 overflow-y-auto space-y-2">
                {spiritualPractices.map((practice) => (
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
                    <Label htmlFor={practice} className="text-sm">{practice}</Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Sacred Texts */}
          <Collapsible open={openSections.sacredTexts} onOpenChange={() => toggleSection('sacredTexts')}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between text-left font-normal border-temple-gold/30 hover:border-temple-gold/50 transition-all duration-200"
              >
                <div className="flex flex-col items-start">
                  <Label className="text-sm font-medium text-earth-brown">Sacred Texts</Label>
                  {localFilters.sacredTexts && localFilters.sacredTexts.length > 0 && (
                    <span className="text-xs text-muted-foreground bg-sage/10 px-2 py-1 rounded-md mt-1">
                      {localFilters.sacredTexts.length} selected
                    </span>
                  )}
                </div>
                {openSections.sacredTexts ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 px-2 animate-in slide-in-from-top-2 duration-300">
              <div className="max-h-48 overflow-y-auto space-y-2">
                {sacredTexts.map((text) => (
                  <div key={text} className="flex items-center space-x-2">
                    <Checkbox
                      id={text}
                      checked={localFilters.sacredTexts?.includes(text) || false}
                      onCheckedChange={(checked) => {
                        const current = localFilters.sacredTexts || [];
                        if (checked) {
                          setLocalFilters(prev => ({
                            ...prev,
                            sacredTexts: [...current, text]
                          }));
                        } else {
                          setLocalFilters(prev => ({
                            ...prev,
                            sacredTexts: current.filter(t => t !== text)
                          }));
                        }
                      }}
                    />
                    <Label htmlFor={text} className="text-sm">{text}</Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Guru Lineage */}
          <Collapsible open={openSections.guruLineage} onOpenChange={() => toggleSection('guruLineage')}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between text-left font-normal border-temple-gold/30 hover:border-temple-gold/50 transition-all duration-200"
              >
                <div className="flex flex-col items-start">
                  <Label className="text-sm font-medium text-earth-brown">Guru Lineage</Label>
                  {localFilters.guruLineage && (
                    <span className="text-xs text-muted-foreground bg-sage/10 px-2 py-1 rounded-md mt-1">
                      {localFilters.guruLineage}
                    </span>
                  )}
                </div>
                {openSections.guruLineage ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 px-2 animate-in slide-in-from-top-2 duration-300">
              <Combobox
                options={guruLineages.map(lineage => ({ 
                  value: lineage, 
                  label: lineage 
                }))}
                value={localFilters.guruLineage || ""}
                onSelect={(value) => setLocalFilters(prev => ({ ...prev, guruLineage: value || undefined }))}
                placeholder="Select Guru Lineage"
                searchPlaceholder="Search lineages..."
              />
            </CollapsibleContent>
          </Collapsible>

          {/* Lifestyle Filters */}
          <Collapsible open={openSections.lifestyle} onOpenChange={() => toggleSection('lifestyle')}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between text-left font-normal border-temple-gold/30 hover:border-temple-gold/50 transition-all duration-200"
              >
                <div className="flex flex-col items-start">
                  <Label className="text-sm font-medium text-earth-brown">Lifestyle Preferences</Label>
                  <span className="text-xs text-muted-foreground/60">Health & Habits</span>
                </div>
                {openSections.lifestyle ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-3 px-2 animate-in slide-in-from-top-2 duration-300">
              {/* Smoking Habits */}
              <div>
                <Label className="block text-sm font-medium text-earth-brown mb-2">Smoking Habits</Label>
                <Select
                  value={localFilters.smokingHabits || ""}
                  onValueChange={(value) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      smokingHabits: value || undefined
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Smoking Habits" />
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

              {/* Drinking Habits */}
              <div>
                <Label className="block text-sm font-medium text-earth-brown mb-2">Drinking Habits</Label>
                <Select
                  value={localFilters.drinkingHabits || ""}
                  onValueChange={(value) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      drinkingHabits: value || undefined
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Drinking Habits" />
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

              {/* Eating Habits */}
              <div>
                <Label className="block text-sm font-medium text-earth-brown mb-2">Eating Habits</Label>
                <Select
                  value={localFilters.eatingHabits || ""}
                  onValueChange={(value) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      eatingHabits: value || undefined
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Eating Habits" />
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

              {/* Physical Status */}
              <div>
                <Label className="block text-sm font-medium text-earth-brown mb-2">Physical Status</Label>
                <Select
                  value={localFilters.physicalStatus || ""}
                  onValueChange={(value) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      physicalStatus: value || undefined
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Physical Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {physicalStatusOptions.map((status: string) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Blood Group */}
              <div>
                <Label className="block text-sm font-medium text-earth-brown mb-2">Blood Group</Label>
                <Select
                  value={localFilters.bloodGroup || ""}
                  onValueChange={(value) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      bloodGroup: value || undefined
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroupOptions.map((group: string) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Health Conditions */}
              <div>
                <Label className="block text-sm font-medium text-earth-brown mb-2">Health Conditions</Label>
                <Select
                  value={localFilters.healthConditions || ""}
                  onValueChange={(value) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      healthConditions: value || undefined
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Health Conditions" />
                  </SelectTrigger>
                  <SelectContent>
                    {healthConditionsOptions.map((condition: string) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Dietary Lifestyle */}
          <Collapsible open={openSections.dietaryLifestyle} onOpenChange={() => toggleSection('dietaryLifestyle')}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between text-left font-normal border-temple-gold/30 hover:border-temple-gold/50 transition-all duration-200"
              >
                <div className="flex flex-col items-start">
                  <Label className="text-sm font-medium text-earth-brown">Dietary Lifestyle</Label>
                  {localFilters.dietaryLifestyle && (
                    <span className="text-xs text-muted-foreground bg-sage/10 px-2 py-1 rounded-md mt-1">
                      {localFilters.dietaryLifestyle}
                    </span>
                  )}
                </div>
                {openSections.dietaryLifestyle ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 px-2 animate-in slide-in-from-top-2 duration-300">
              <Combobox
                options={dietaryLifestyles.map(lifestyle => ({ 
                  value: lifestyle, 
                  label: lifestyle 
                }))}
                value={localFilters.dietaryLifestyle || ""}
                onSelect={(value) => setLocalFilters(prev => ({ ...prev, dietaryLifestyle: value || undefined }))}
                placeholder="Select Dietary Lifestyle"
                searchPlaceholder="Search dietary lifestyles..."
              />
            </CollapsibleContent>
          </Collapsible>

          {/* Additional Filters */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-3">Additional Filters</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified"
                  checked={localFilters.verified || false}
                  onCheckedChange={(checked) => 
                    setLocalFilters(prev => ({ ...prev, verified: checked === true }))
                  }
                />
                <Label htmlFor="verified" className="text-sm">Verified Profiles Only</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="withPhoto"
                  checked={localFilters.withPhoto || false}
                  onCheckedChange={(checked) => 
                    setLocalFilters(prev => ({ ...prev, withPhoto: checked === true }))
                  }
                />
                <Label htmlFor="withPhoto" className="text-sm">With Photo Only</Label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-temple-gold/20">
            <Button onClick={handleSearch} className="w-full bg-saffron text-primary-foreground hover:bg-saffron/90 shadow-lg hover-elevate">
              Search Profiles
            </Button>
            <Button onClick={handleClear} variant="outline" className="w-full">
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
});

SpiritualFilterSidebar.displayName = "SpiritualFilterSidebar";

export default SpiritualFilterSidebar;
