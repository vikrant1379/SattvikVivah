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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

  const [ageDialogOpen, setAgeDialogOpen] = useState(false);
  const [heightDialogOpen, setHeightDialogOpen] = useState(false);

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

  const maritalStatusOptions = [
    "Never Married", "Divorced", "Widowed", "Separated"
  ];

  const casteOptions = [
    // Varna System
    "Brahmin", "Kshatriya", "Vaishya", "Shudra",

    // Brahmin Sub-castes
    "Agarwal", "Bhumihar", "Chitpavan", "Deshastha", "Gaur", "Iyer", "Iyengar", "Joshi",
    "Kanyakubja", "Kashmiri Pandit", "Konkanastha", "Maithil", "Nagar", "Namboodiri",
    "Pandit", "Saraswat", "Sharma", "Shukla", "Tiwari", "Tyagi", "Upadhyay",

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

    // South Indian Castes
    "Brahmin", "Chettiar", "Mudaliar", "Pillai", "Gounder", "Naidu", "Reddy", "Kamma",
    "Kapu", "Velama", "Raju", "Kshatriya", "Vysya", "Komati", "Arya Vysya", "Balija",
    "Devanga", "Padmashali", "Kaikolan", "Senguntha", "Sourastra", "Parkavakulam",

    // Modern Categories
    "Arya Samaj", "ISKCON", "Brahmo Samaj", "Prarthana Samaj",
    "No Caste / Inter Caste", "Prefer Not to Say", "Other"
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
              Age
            </Label>
            <Dialog open={ageDialogOpen} onOpenChange={setAgeDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {localFilters.ageMin || localFilters.ageMax
                    ? `${localFilters.ageMin || 18} Years - ${localFilters.ageMax || 70} Years`
                    : "18 Years - 70 Years"
                  }
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Select Age Range</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
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
                    onClick={() => setAgeDialogOpen(false)}
                    className="w-full bg-saffron text-primary-foreground hover:bg-saffron/90"
                  >
                    Apply Age Range
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Height Range */}
          <div>
            <Label className="block text-sm font-medium text-earth-brown mb-2">
              Height
            </Label>
            <Dialog open={heightDialogOpen} onOpenChange={setHeightDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {localFilters.heightMin || localFilters.heightMax
                    ? `${localFilters.heightMin || "4'0\""} - ${localFilters.heightMax || "6'7\""}`
                    : "4'0\" - 6'7\""
                  }
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Select Height Range</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
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
                    onClick={() => setHeightDialogOpen(false)}
                    className="w-full bg-saffron text-primary-foreground hover:bg-saffron/90"
                  >
                    Apply Height Range
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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