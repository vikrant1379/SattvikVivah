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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSpiritualContext } from "@/contexts/spiritual-context";
import { countries, statesByCountry, citiesByState, motherTongues } from "@/data/locations";
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
  });

  const [agePopoverOpen, setAgePopoverOpen] = useState(false);
  const [heightPopoverOpen, setHeightPopoverOpen] = useState(false);

  const { data: practicesData } = useQuery({
    queryKey: ['/api/spiritual-practices'],
    staleTime: Infinity,
  });

  const { data: textsData } = useQuery({
    queryKey: ['/api/sacred-texts'],
    staleTime: Infinity,
  });

  // Removed queries for countries, states, and cities as per the instructions.
  // The data fetching and handling for these will be managed by separate data files.

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
    "Volunteer", "Freelancer", "Doctor", "Software Engineer", "IT Professional",
    "Banking Professional", "Government Employee", "Working Professional",
    "Agripreneur", "Entrepreneur", "Businessperson", "Not Working",
    "Teacher", "Lawyer", "Consultant", "Manager", "Designer", "Artist",
    "Student", "Homemaker", "Nurse", "Accountant", "Sales Professional",
    "Marketing Professional", "Engineer", "Architect", "Researcher"
  ];

  const smokingHabitsOptions = ["No", "Socially", "Regularly"];
  const drinkingHabitsOptions = ["No", "Socially", "Regularly"];
  const eatingHabitsOptions = ["Vegetarian", "Vegan", "Non Vegetarian", "Eggetarian", "Pescetarian"];

  const physicalStatusOptions = ["Normal", "Physically Challenged"];
  const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const healthConditionsOptions = [
    "None", "Diabetes", "Hypertension", "Asthma", "Heart Disease",
    "Thyroid Disorder", "PCOD/PCOS", "Mental Health Condition",
    "Cancer Survivor", "HIV+", "Hepatitis B", "Hepatitis C",
    "Kidney Disease", "Liver Disease", "Epilepsy", "Migraine",
    "Arthritis", "Skin Condition", "Vision Impairment", "Hearing Impairment",
    "Other", "Prefer not to disclose"
  ];

  // Age options from 18 to 70
  const ageOptions = Array.from({ length: 53 }, (_, i) => 18 + i);

  const heightOptions = [
    "4'0\"", "4'1\"", "4'2\"", "4'3\"", "4'4\"", "4'5\"", "4'6\"", "4'7\"", "4'8\"", "4'9\"", "4'10\"", "4'11\"",
    "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"",
    "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\"", "6'6\"", "6'7\""
  ];

  import { casteOptions } from "../data/caste";

  const maritalStatusOptions = [
    "Never Married", "Divorced", "Widowed", "Separated"
  ];

    // Kshatriya Sub-castes
    "Rajput", "Thakur", "Chauhan", "Rathore", "Sisodiya", "Tomar", "Chandel", "Parmar",
    "Solanki", "Yadav", "Ahir", "Gujjar", "Jat", "Khatri", "Arora", "Sood", "Bhatia",
    "Lohana", "Maheshwari", "Oswal", "Porwal",

    // Vaishya Sub-castes
    "Baniya", "Agrawal", "Gupta", "Mittal", "Singhal", "Goyal", "Jindal", "Khandelwal",
    "Maheshwari", "Oswal", "Porwal", "Rastogi", "Saxena", "Srivastava", "Varshney",

    // Other Traditional Castes
    "Kayastha", "Khatri", "Bunt", "Nair", "Menon", "Pillai", "Reddy", "Naidu", "Chettiar",
    "Mudaliar", "Gounder", "Vellalar", "Thevar", "Maravar", "Kallar", "Agamudayar",
    "Lingayat", "Vokkaliga", "Bunts", "Saraswat", "Konkani",

    // Scheduled Castes (Dalit)
    "Chamar", "Mahar", "Mala", "Madiga", "Dhobi", "Dom", "Khatik", "Koli", "Bhangi",
    "Valmiki", "Ravidasia", "Meghwal", "Balmiki", "Mazhabi", "Ramdasia", "Ad Dharmi",

    // Scheduled Tribes (Adivasi)
    "Bhil", "Gond", "Santal", "Munda", "Oraon", "Ho", "Khasi", "Garo", "Mizo", "Naga",
    "Bodo", "Rabha", "Tripuri", "Chakma", "Dimasa", "Karbi", "Tiwa",

    // Other Backward Classes (OBC)
    "Kurmi", "Koeri", "Yadav", "Gujjar", "Jat", "Ahir", "Mali", "Kumhar", "Teli",
    "Kachhi", "Lodh", "Saini", "Rajbhar", "Maurya", "Kushwaha", "Patel", "Thakur",

    // Regional Castes
    "Maratha", "Kunbi", "Dhangar", "Maali", "Sonar", "Sutar", "Lohar", "Kumbhar",
    "Shimpi", "Nhavi", "Chambhar", "Matang", "Banjara", "Pardhi", "Katkari", "Warli",

    

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
              Age
            </Label>
            <Popover open={agePopoverOpen} onOpenChange={setAgePopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {localFilters.ageMin || localFilters.ageMax
                    ? `${localFilters.ageMin || 18} Years - ${localFilters.ageMax || 70} Years`
                    : "18 Years - 70 Years"
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start" side="right">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Select Age Range</h4>
                  <div>
                    <Label className="text-sm font-medium">Minimum Age</Label>
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
                    <Label className="text-sm font-medium">Maximum Age</Label>
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
                  <Button
                    onClick={() => setAgePopoverOpen(false)}
                    className="w-full bg-saffron text-primary-foreground hover:bg-saffron/90"
                  >
                    Apply Age Range
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Height Range */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Height
            </Label>
            <Popover open={heightPopoverOpen} onOpenChange={setHeightPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {localFilters.heightMin || localFilters.heightMax
                    ? `${localFilters.heightMin || "4'0\""} - ${localFilters.heightMax || "6'7\""}`
                    : "4'0\" - 6'7\""
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start" side="right">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Select Height Range</h4>
                  <div>
                    <Label className="text-sm font-medium">Minimum Height</Label>
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
                    <Label className="text-sm font-medium">Maximum Height</Label>
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
                  <Button
                    onClick={() => setHeightPopoverOpen(false)}
                    className="w-full bg-saffron text-primary-foreground hover:bg-saffron/90"
                  >
                    Apply Height Range
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Location
            </Label>
            
            {/* Country */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1">Country</Label>
              <Combobox
                options={countries.map(country => ({ value: country.value, label: country.label }))}
                value={localFilters.country || ""}
                onSelect={(value) => {
                  setLocalFilters(prev => ({
                    ...prev,
                    country: value || undefined,
                    state: undefined, // Reset state when country changes
                    city: undefined   // Reset city when country changes
                  }));
                }}
                placeholder="Select Country"
                searchPlaceholder="Search countries..."
              />
            </div>

            {/* State */}
            {localFilters.country && (
              <div>
                <Label className="text-xs text-muted-foreground mb-1">State/Province</Label>
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
                      city: undefined // Reset city when state changes
                    }));
                  }}
                  placeholder="Select State/Province"
                  searchPlaceholder="Search states..."
                />
              </div>
            )}

            {/* City */}
            {localFilters.state && (
              <div>
                <Label className="text-xs text-muted-foreground mb-1">City</Label>
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
          </div>

          {/* Mother Tongue */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Mother Tongue
            </Label>
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

          {/* Smoking Habits */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Smoking Habits
            </Label>
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
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Drinking Habits
            </Label>
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
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Eating Habits
            </Label>
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
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Physical Status
            </Label>
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
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Blood Group
            </Label>
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
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Health Conditions
            </Label>
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