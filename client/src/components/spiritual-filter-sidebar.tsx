import { memo, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  });

  const { data: practicesData } = useQuery({
    queryKey: ['/api/spiritual-practices'],
    staleTime: Infinity,
  });

  const { data: textsData } = useQuery({
    queryKey: ['/api/sacred-texts'],
    staleTime: Infinity,
  });

  const { data: statesData } = useQuery({
    queryKey: ['/api/states'],
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
        <CardContent className="space-y-6">
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

          {/* Age Range */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Age Range
            </Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
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
                placeholder="Max"
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

          {/* Location */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Location
            </Label>
            <Select
              value={localFilters.country || ""}
              onValueChange={(value) =>
                setLocalFilters(prev => ({
                  ...prev,
                  country: value || undefined
                }))
              }
            >
              <SelectTrigger className="mb-2">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {(["USA", "Canada", "Mexico"] as any)?.map((country: string) => ( // Placeholder for countries, replace with actual data fetch
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={localFilters.state || ""}
              onValueChange={(value) =>
                setLocalFilters(prev => ({
                  ...prev,
                  state: value || undefined
                }))
              }
            >
              <SelectTrigger className="mb-2">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {(statesData as any)?.states?.map((state: string) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="City"
              value={localFilters.city || ""}
              onChange={(e) =>
                setLocalFilters(prev => ({
                  ...prev,
                  city: e.target.value || undefined
                }))
              }
            />
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

          {/* Mother Tongue */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Mother Tongue
            </Label>
            <Select
              value={localFilters.motherTongue || ""}
              onValueChange={(value) =>
                setLocalFilters(prev => ({
                  ...prev,
                  motherTongue: value || undefined
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {(languagesData as any)?.languages?.map((language: string) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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