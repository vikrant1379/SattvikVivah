
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
import { useSpiritualContext } from "@/contexts/spiritual-context";
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
    dietaryLifestyle: filters.dietaryLifestyle,
    guruLineage: filters.guruLineage,
    education: filters.education,
    profession: filters.profession,
    heightMin: filters.heightMin,
    heightMax: filters.heightMax,
  });

  const { data: practicesData } = useQuery({
    queryKey: ['/api/spiritual-practices'],
    staleTime: Infinity,
  });

  const { data: textsData } = useQuery({
    queryKey: ['/api/sacred-texts'],
    staleTime: Infinity,
  });

  const { data: countriesData } = useQuery({
    queryKey: ['/api/countries'],
    staleTime: Infinity,
  });

  const { data: statesData } = useQuery({
    queryKey: ['/api/states', { country: localFilters.country }],
    enabled: !!localFilters.country,
    staleTime: Infinity,
  });

  const { data: citiesData } = useQuery({
    queryKey: ['/api/cities', { state: localFilters.state }],
    enabled: !!localFilters.state,
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

  // Static data
  const educationOptions = [
    "High School", "Diploma", "Bachelor's Degree", "Master's Degree", 
    "PhD", "Professional Degree", "Trade Certification"
  ];

  const professionOptions = [
    "Software Engineer", "Doctor", "Teacher", "Lawyer", "Business Owner",
    "Consultant", "Manager", "Designer", "Artist", "Student", "Homemaker",
    "Government Employee", "Nurse", "Accountant", "Sales Professional",
    "Marketing Professional", "Engineer", "Architect", "Researcher"
  ];

  const heightOptions = [
    "4'0\"", "4'1\"", "4'2\"", "4'3\"", "4'4\"", "4'5\"", "4'6\"", "4'7\"", "4'8\"", "4'9\"", "4'10\"", "4'11\"",
    "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"",
    "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\"", "6'6\"", "6'7\""
  ];

  const maritalStatusOptions = [
    "Never Married", "Divorced", "Widowed", "Separated"
  ];

  const casteOptions = [
    "Brahmin", "Kshatriya", "Vaishya", "Shudra", "Arya Samaj", 
    "Scheduled Caste", "Scheduled Tribe", "Other Backward Class",
    "No Caste / Inter Caste", "Prefer Not to Say"
  ];

  return (
    <aside className="w-80 bg-card border-r border-temple-gold/20 p-6 overflow-y-auto hidden lg:block">
      <Card className="border-temple-gold/30 shadow-lg">
        <CardHeader>
          <CardTitle className="font-serif font-semibold text-xl text-foreground mandala-border pb-4">
            Find Your Dharmic Partner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Age Range */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Age Range
            </Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min Age"
                value={localFilters.ageMin || ""}
                onChange={(e) =>
                  setLocalFilters(prev => ({
                    ...prev,
                    ageMin: e.target.value ? parseInt(e.target.value) : undefined
                  }))
                }
              />
              <Input
                type="number"
                placeholder="Max Age"
                value={localFilters.ageMax || ""}
                onChange={(e) =>
                  setLocalFilters(prev => ({
                    ...prev,
                    ageMax: e.target.value ? parseInt(e.target.value) : undefined
                  }))
                }
              />
            </div>
          </div>

          {/* Height Range */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Height Range
            </Label>
            <div className="flex space-x-2">
              <Combobox
                options={heightOptions.map(h => ({ value: h, label: h }))}
                value={localFilters.heightMin || ""}
                onSelect={(value) =>
                  setLocalFilters(prev => ({
                    ...prev,
                    heightMin: value || undefined
                  }))
                }
                placeholder="Min Height"
                searchPlaceholder="Search height..."
                className="flex-1"
              />
              <Combobox
                options={heightOptions.map(h => ({ value: h, label: h }))}
                value={localFilters.heightMax || ""}
                onSelect={(value) =>
                  setLocalFilters(prev => ({
                    ...prev,
                    heightMax: value || undefined
                  }))
                }
                placeholder="Max Height"
                searchPlaceholder="Search height..."
                className="flex-1"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Location
            </Label>
            <div className="space-y-2">
              <Combobox
                options={(countriesData as any)?.countries?.map((country: any) => ({
                  value: country.value,
                  label: country.label
                })) || []}
                value={localFilters.country || ""}
                onSelect={(value) =>
                  setLocalFilters(prev => ({
                    ...prev,
                    country: value || undefined,
                    state: undefined,
                    city: undefined
                  }))
                }
                placeholder="Select Country"
                searchPlaceholder="Search countries..."
              />
              
              {localFilters.country && (
                <Combobox
                  options={(statesData as any)?.states?.map((state: string) => ({
                    value: state,
                    label: state
                  })) || []}
                  value={localFilters.state || ""}
                  onSelect={(value) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      state: value || undefined,
                      city: undefined
                    }))
                  }
                  placeholder="Select State"
                  searchPlaceholder="Search states..."
                />
              )}
              
              {localFilters.state && (
                <Combobox
                  options={(citiesData as any)?.cities?.map((city: string) => ({
                    value: city,
                    label: city
                  })) || []}
                  value={localFilters.city || ""}
                  onSelect={(value) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      city: value || undefined
                    }))
                  }
                  placeholder="Select City"
                  searchPlaceholder="Search cities..."
                />
              )}
            </div>
          </div>

          {/* Mother Tongue */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Mother Tongue
            </Label>
            <Combobox
              options={(languagesData as any)?.languages?.map((lang: string) => ({
                value: lang,
                label: lang
              })) || []}
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
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Education
            </Label>
            <Combobox
              options={educationOptions.map(edu => ({ value: edu, label: edu }))}
              value={localFilters.education || ""}
              onSelect={(value) =>
                setLocalFilters(prev => ({
                  ...prev,
                  education: value || undefined
                }))
              }
              placeholder="Select Education"
              searchPlaceholder="Search education..."
            />
          </div>

          {/* Profession */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Profession
            </Label>
            <Combobox
              options={professionOptions.map(prof => ({ value: prof, label: prof }))}
              value={localFilters.profession || ""}
              onSelect={(value) =>
                setLocalFilters(prev => ({
                  ...prev,
                  profession: value || undefined
                }))
              }
              placeholder="Select Profession"
              searchPlaceholder="Search professions..."
            />
          </div>

          {/* Caste */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Caste
            </Label>
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
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Marital Status
            </Label>
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

          {/* Spiritual Practices Filter */}
          <div>
            <Label className="block text-sm font-medium text-foreground mb-2">
              Spiritual Practices
            </Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {(practicesData as any)?.practices?.map((practice: string) => (
                <div key={practice} className="flex items-center space-x-2">
                  <Checkbox
                    id={practice}
                    checked={(localFilters.spiritualPractices || []).includes(practice)}
                    onCheckedChange={(checked) => handlePracticeChange(practice, !!checked)}
                  />
                  <Label htmlFor={practice} className="text-sm cursor-pointer">
                    {practice}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Sacred Texts */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Sacred Texts Study
            </Label>
            <Select
              value={localFilters.sacredTexts?.[0] || ""}
              onValueChange={(value) =>
                setLocalFilters(prev => ({
                  ...prev,
                  sacredTexts: value ? [value] : undefined
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Scripture" />
              </SelectTrigger>
              <SelectContent>
                {(textsData as any)?.texts?.map((text: string) => (
                  <SelectItem key={text} value={text}>
                    {text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dietary Preferences */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Dietary Lifestyle
            </Label>
            <RadioGroup
              value={localFilters.dietaryLifestyle || ""}
              onValueChange={(value) =>
                setLocalFilters(prev => ({
                  ...prev,
                  dietaryLifestyle: value || undefined
                }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Sattvic Vegetarian" id="sattvic" />
                <Label htmlFor="sattvic" className="text-sm cursor-pointer">
                  Sattvic Vegetarian
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Lacto Vegetarian" id="lacto" />
                <Label htmlFor="lacto" className="text-sm cursor-pointer">
                  Lacto Vegetarian
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Vegan" id="vegan" />
                <Label htmlFor="vegan" className="text-sm cursor-pointer">
                  Vegan
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Guru Lineage */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Guru Lineage / Ashram
            </Label>
            <Input
              placeholder="Enter lineage or ashram"
              value={localFilters.guruLineage || ""}
              onChange={(e) =>
                setLocalFilters(prev => ({
                  ...prev,
                  guruLineage: e.target.value || undefined
                }))
              }
            />
          </div>

          <div className="space-y-2">
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
