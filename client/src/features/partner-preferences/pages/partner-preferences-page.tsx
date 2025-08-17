
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, Save, ArrowLeft, Edit, Filter } from 'lucide-react';
import { AgeRangeSelector } from '../components/age-range-selector';
import { HeightRangeSelector } from '../components/height-range-selector';
import { LocationPreferenceSelector } from '../components/location-preference-selector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  religionOptions,
  ethnicityOptions,
  annualIncomeOptions,
  maritalStatusOptions,
  eatingHabitsOptions,
  spiritualPracticesOptions,
  heightOptions
} from '../../../data/static-options';
import { educationQualificationOptions } from '../../../data/education';
import { professionOptions } from '../../../data/profession';
import { motherTongueOptions } from '../../../data/mother-tongue';
import { casteOptions } from '../../../data/caste';
import { spiritualPractices, sacredTexts } from '../../../data/spiritual-practices';

interface PartnerPreferences {
  ageRange: [number, number];
  heightRange: [string, string];
  country: string;
  cityState: string[];
  maritalStatus: string[];
  education: string[];
  occupation: string[];
  annualIncome: string[];
  religion: string[];
  caste: string[];
  motherTongue: string[];
  manglikStatus: string;
  dietaryHabits: string[];
  specialCases: string[];
  profilePostedBy: string[];
  familyBasedOutOf: string[];
  collegeAttended: string[];
  aboutPartner: string;
  spiritualPractices: string[];
  sacredTexts: string[];
  spiritualAlignment: string;
  horoscopeMatching: string;
  familyValues: string[];
  lifestyle: string[];
}

export const PartnerPreferencesPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState<{[key: string]: boolean}>({});
  const [preferences, setPreferences] = useState<PartnerPreferences>({
    ageRange: [24, 29],
    heightRange: ["4' 6\" (137 cms)", "5' 6\" (168 cms)"],
    country: 'India',
    cityState: ["Delhi", "Mumbai", "Bangalore"],
    maritalStatus: ['Never Married'],
    education: ['B.Arch', 'B.Des', 'B.E/B.Tech', 'B.FAD', 'B.FTech', 'B.Pharma'],
    occupation: ['Education Professional', 'Educational Institution Owner', 'Librarian', 'Teacher', 'Professor/Lecturer', 'Research Assistant'],
    annualIncome: ['Rs. 0 - 3 Lakh p.a', 'Rs. 3 - 5 Lakh p.a', 'Rs. 5 - 8 Lakh p.a'],
    religion: ['Hindu'],
    caste: ["Doesn't Matter"],
    motherTongue: ['Hindi-Delhi', 'Hindi-MP/CG'],
    manglikStatus: "Doesn't Matter",
    dietaryHabits: ['Vegetarian', 'Jain'],
    specialCases: [],
    profilePostedBy: ["Doesn't Matter"],
    familyBasedOutOf: ["Doesn't Matter"],
    collegeAttended: ["Doesn't Matter"],
    aboutPartner: "I want a down-to-earth, simple, and spiritually minded life guided by Vedic principles. Someone who finds joy in philosophy and regularity through study of the Bhagavad Gita and other sacred texts. Looking for a genuine connection with someone who values spiritual growth and shared dharmic responsibilities together like me.",
    spiritualPractices: ['Meditation & Dhyana', 'Daily Sadhana', 'Temple Visits'],
    sacredTexts: ['Bhagavad Gita', 'Upanishads'],
    spiritualAlignment: 'prefer_same_path',
    horoscopeMatching: 'important',
    familyValues: ['Traditional', 'Spiritual'],
    lifestyle: ['Simple Living', 'Vegetarian']
  });

  const handleEdit = (section: string) => {
    setIsEditing(prev => ({...prev, [section]: !prev[section]}));
  };

  const handleSave = (section: string) => {
    setIsEditing(prev => ({...prev, [section]: false}));
    alert(`${section} preferences saved successfully!`);
  };

  const handleCancel = (section: string) => {
    setIsEditing(prev => ({...prev, [section]: false}));
  };

  const toggleArrayItem = (array: string[], item: string): string[] => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  const calculateCompletionPercentage = () => {
    const totalSections = 8;
    let completedSections = 0;
    
    if (preferences.ageRange[0] && preferences.ageRange[1]) completedSections++;
    if (preferences.heightRange[0] && preferences.heightRange[1]) completedSections++;
    if (preferences.education.length > 0) completedSections++;
    if (preferences.occupation.length > 0) completedSections++;
    if (preferences.religion.length > 0) completedSections++;
    if (preferences.maritalStatus.length > 0) completedSections++;
    if (preferences.aboutPartner.trim()) completedSections++;
    if (preferences.spiritualPractices.length > 0) completedSections++;
    
    return Math.round((completedSections / totalSections) * 100);
  };

  const PreferenceSection = ({ 
    title, 
    children, 
    onEdit, 
    id, 
    isEditable = true 
  }: { 
    title: string; 
    children: React.ReactNode; 
    onEdit?: () => void; 
    id: string;
    isEditable?: boolean;
  }) => (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-900">{title}</CardTitle>
          {isEditable && (
            <div className="flex space-x-2">
              {isEditing[id] ? (
                <>
                  <Button 
                    size="sm" 
                    onClick={() => handleSave(id)}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCancel(id)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEdit(id)} 
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Top Banner */}
      <div className="bg-blue-600 text-white p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => setLocation('/')}
                className="text-white hover:text-blue-200 flex items-center space-x-2 mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Set Partner Preferences</span>
              </button>
              <p className="text-blue-100 text-sm">
                Define your ideal partner criteria to get better matches.
              </p>
              <div className="flex items-center mt-2">
                <div className="text-sm font-medium mr-2">Completion: {calculateCompletionPercentage()}%</div>
                <Progress value={calculateCompletionPercentage()} className="w-32 h-2" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-sm font-medium mb-2">You are missing out on the premium benefits!</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-xs">👁</div>
                  <span>Get upto 3x more profile views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-200 rounded-full flex items-center justify-center text-green-800 text-xs">📞</div>
                  <span>Unlimited voice & video calls</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-200 rounded-full flex items-center justify-center text-purple-800 text-xs">👤</div>
                  <span>Get access to contact details</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-200 rounded-full flex items-center justify-center text-orange-800 text-xs">🔍</div>
                  <span>Perform unlimited searches</span>
                </div>
              </div>
              <p className="text-xs mt-2 text-blue-200">Flat 54% OFF till 16 Aug</p>
              <Button size="sm" className="mt-2 bg-red-500 hover:bg-red-600 text-white text-xs">
                Upgrade now →
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="religion">Religion</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="spiritual">Spiritual</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          </TabsList>

          {/* Basic Details Tab */}
          <TabsContent value="basic">
            <PreferenceSection title="Partner's Basic Details" id="basic">
              {isEditing.basic ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Partner's Age</Label>
                      <div className="mt-1">
                        <AgeRangeSelector
                          minAge={preferences.ageRange[0]}
                          maxAge={preferences.ageRange[1]}
                          onAgeRangeChange={(min, max) => setPreferences({...preferences, ageRange: [min, max]})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Partner's Height</Label>
                      <div className="mt-1">
                        <HeightRangeSelector
                          minHeight={preferences.heightRange[0]}
                          maxHeight={preferences.heightRange[1]}
                          onHeightRangeChange={(min, max) => setPreferences({...preferences, heightRange: [min, max]})}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Partner's Locations</Label>
                    <div className="mt-1">
                      <LocationPreferenceSelector
                        selectedLocations={preferences.cityState}
                        onLocationChange={(locations) => setPreferences({...preferences, cityState: locations})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Marital Status</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {maritalStatusOptions.map((status) => (
                        <Badge
                          key={status}
                          variant={preferences.maritalStatus.includes(status) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setPreferences({
                            ...preferences,
                            maritalStatus: toggleArrayItem(preferences.maritalStatus, status)
                          })}
                        >
                          {status}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Partner's Age</Label>
                      <div className="flex items-center mt-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">{preferences.ageRange[0]} years - {preferences.ageRange[1]} years</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Partner's Height</Label>
                      <div className="flex items-center mt-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">{preferences.heightRange[0]} - {preferences.heightRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Preferred Locations</Label>
                    <div className="flex items-center mt-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">{preferences.cityState.join(', ')}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Marital Status</Label>
                    <div className="flex items-center mt-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">{preferences.maritalStatus.join(', ')}</span>
                    </div>
                  </div>
                </div>
              )}
            </PreferenceSection>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <PreferenceSection title="Partner's Education and Occupation" id="education">
              {isEditing.education ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Education Qualifications</Label>
                    <div className="mt-2 max-h-48 overflow-y-auto border rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-2">
                        {educationQualificationOptions.map((edu) => (
                          <div key={edu} className="flex items-center space-x-2">
                            <Checkbox
                              checked={preferences.education.includes(edu)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setPreferences({
                                    ...preferences,
                                    education: [...preferences.education, edu]
                                  });
                                } else {
                                  setPreferences({
                                    ...preferences,
                                    education: preferences.education.filter(e => e !== edu)
                                  });
                                }
                              }}
                            />
                            <label className="text-sm">{edu}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Occupations</Label>
                    <div className="mt-2 max-h-48 overflow-y-auto border rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-2">
                        {professionOptions.slice(0, 20).map((prof) => (
                          <div key={prof} className="flex items-center space-x-2">
                            <Checkbox
                              checked={preferences.occupation.includes(prof)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setPreferences({
                                    ...preferences,
                                    occupation: [...preferences.occupation, prof]
                                  });
                                } else {
                                  setPreferences({
                                    ...preferences,
                                    occupation: preferences.occupation.filter(o => o !== prof)
                                  });
                                }
                              }}
                            />
                            <label className="text-sm">{prof}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Annual Income</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {annualIncomeOptions.slice(0, 10).map((income) => (
                        <Badge
                          key={income}
                          variant={preferences.annualIncome.includes(income) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setPreferences({
                            ...preferences,
                            annualIncome: toggleArrayItem(preferences.annualIncome, income)
                          })}
                        >
                          {income}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Education</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {preferences.education.slice(0, 6).map((edu, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
                            {edu}
                          </Badge>
                        ))}
                        {preferences.education.length > 6 && (
                          <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-600">
                            + {preferences.education.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Occupation</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {preferences.occupation.slice(0, 6).map((occ, index) => (
                          <Badge key={index} variant="outline" className="bg-green-50 border-green-200 text-green-800">
                            {occ}
                          </Badge>
                        ))}
                        {preferences.occupation.length > 6 && (
                          <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-600">
                            + {preferences.occupation.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Income Range</Label>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">{preferences.annualIncome.join(', ')}</span>
                    </div>
                  </div>
                </div>
              )}
            </PreferenceSection>
          </TabsContent>

          {/* Religion Tab */}
          <TabsContent value="religion">
            <PreferenceSection title="Partner's Religion and Ethnicity" id="religion">
              {isEditing.religion ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Religion</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {religionOptions.map((religion) => (
                        <Badge
                          key={religion}
                          variant={preferences.religion.includes(religion) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setPreferences({
                            ...preferences,
                            religion: toggleArrayItem(preferences.religion, religion)
                          })}
                        >
                          {religion}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Caste</Label>
                    <div className="mt-2 max-h-48 overflow-y-auto border rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-2">
                        {casteOptions.slice(0, 20).map((caste) => (
                          <div key={caste} className="flex items-center space-x-2">
                            <Checkbox
                              checked={preferences.caste.includes(caste)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setPreferences({
                                    ...preferences,
                                    caste: [...preferences.caste, caste]
                                  });
                                } else {
                                  setPreferences({
                                    ...preferences,
                                    caste: preferences.caste.filter(c => c !== caste)
                                  });
                                }
                              }}
                            />
                            <label className="text-sm">{caste}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Mother Tongue</Label>
                    <div className="mt-2 max-h-48 overflow-y-auto border rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-2">
                        {motherTongueOptions.slice(0, 20).map((tongue) => (
                          <div key={tongue} className="flex items-center space-x-2">
                            <Checkbox
                              checked={preferences.motherTongue.includes(tongue)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setPreferences({
                                    ...preferences,
                                    motherTongue: [...preferences.motherTongue, tongue]
                                  });
                                } else {
                                  setPreferences({
                                    ...preferences,
                                    motherTongue: preferences.motherTongue.filter(t => t !== tongue)
                                  });
                                }
                              }}
                            />
                            <label className="text-sm">{tongue}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Manglik Status</Label>
                    <Select
                      value={preferences.manglikStatus}
                      onValueChange={(value) => setPreferences({...preferences, manglikStatus: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Anshik">Anshik (Partial)</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="Doesn't Matter">Doesn't Matter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Religion</Label>
                      <div className="flex items-center mt-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">{preferences.religion.join(', ')}</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Caste</Label>
                      <div className="flex items-center mt-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">{preferences.caste.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Mother Tongue</Label>
                    <div className="flex items-center mt-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">{preferences.motherTongue.join(', ')}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Manglik Status</Label>
                    <div className="flex items-center mt-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">{preferences.manglikStatus}</span>
                    </div>
                  </div>
                </div>
              )}
            </PreferenceSection>
          </TabsContent>

          {/* Family Tab */}
          <TabsContent value="family">
            <PreferenceSection title="Partner's Family" id="family">
              {isEditing.family ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Family Values</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Traditional', 'Modern', 'Orthodox', 'Liberal', 'Spiritual', 'Religious'].map((value) => (
                        <Badge
                          key={value}
                          variant={preferences.familyValues.includes(value) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setPreferences({
                            ...preferences,
                            familyValues: toggleArrayItem(preferences.familyValues, value)
                          })}
                        >
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Special Cases</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['None', 'Divorced', 'Widow/Widower', 'Separated', 'Awaiting Divorce'].map((special) => (
                        <Badge
                          key={special}
                          variant={preferences.specialCases.includes(special) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setPreferences({
                            ...preferences,
                            specialCases: toggleArrayItem(preferences.specialCases, special)
                          })}
                        >
                          {special}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Profile Posted By</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Self', 'Parents', 'Siblings', 'Friends', 'Relatives', "Doesn't Matter"].map((poster) => (
                        <Badge
                          key={poster}
                          variant={preferences.profilePostedBy.includes(poster) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setPreferences({
                            ...preferences,
                            profilePostedBy: toggleArrayItem(preferences.profilePostedBy, poster)
                          })}
                        >
                          {poster}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Family Values</Label>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">{preferences.familyValues.join(', ')}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Special Cases</Label>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">{preferences.specialCases.length > 0 ? preferences.specialCases.join(', ') : 'None'}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Profile Posted By</Label>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">{preferences.profilePostedBy.join(', ')}</span>
                    </div>
                  </div>
                </div>
              )}
            </PreferenceSection>
          </TabsContent>

          {/* Spiritual Tab */}
          <TabsContent value="spiritual">
            <PreferenceSection title="Spiritual Preferences" id="spiritual">
              {isEditing.spiritual ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Spiritual Practices</Label>
                    <div className="mt-2 flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {spiritualPracticesOptions.map((practice) => (
                        <Badge
                          key={practice}
                          variant={preferences.spiritualPractices.includes(practice) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setPreferences({
                            ...preferences,
                            spiritualPractices: toggleArrayItem(preferences.spiritualPractices, practice)
                          })}
                        >
                          {practice}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Sacred Texts</Label>
                    <div className="mt-2 flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {sacredTexts.map((text) => (
                        <Badge
                          key={text}
                          variant={preferences.sacredTexts.includes(text) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setPreferences({
                            ...preferences,
                            sacredTexts: toggleArrayItem(preferences.sacredTexts, text)
                          })}
                        >
                          {text}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Spiritual Alignment</Label>
                    <Select
                      value={preferences.spiritualAlignment}
                      onValueChange={(value) => setPreferences({...preferences, spiritualAlignment: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prefer_same_path">Prefer same spiritual path</SelectItem>
                        <SelectItem value="open_to_different">Open to different spiritual paths</SelectItem>
                        <SelectItem value="not_important">Spiritual alignment not important</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Horoscope Matching</Label>
                    <Select
                      value={preferences.horoscopeMatching}
                      onValueChange={(value) => setPreferences({...preferences, horoscopeMatching: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="must_match">Must match</SelectItem>
                        <SelectItem value="important">Important</SelectItem>
                        <SelectItem value="optional">Optional</SelectItem>
                        <SelectItem value="not_necessary">Not necessary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Spiritual Practices</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {preferences.spiritualPractices.map((practice) => (
                        <Badge key={practice} variant="outline" className="bg-purple-50 border-purple-200 text-purple-800">
                          {practice}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Sacred Texts</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {preferences.sacredTexts.map((text) => (
                        <Badge key={text} variant="outline" className="bg-orange-50 border-orange-200 text-orange-800">
                          {text}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Spiritual Alignment</Label>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600 capitalize">{preferences.spiritualAlignment.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Horoscope Matching</Label>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600 capitalize">{preferences.horoscopeMatching.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
              )}
            </PreferenceSection>
          </TabsContent>

          {/* Lifestyle Tab */}
          <TabsContent value="lifestyle">
            <PreferenceSection title="Lifestyle Preferences" id="lifestyle">
              {isEditing.lifestyle ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Dietary Habits</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {eatingHabitsOptions.map((habit) => (
                        <Badge
                          key={habit}
                          variant={preferences.dietaryHabits.includes(habit) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setPreferences({
                            ...preferences,
                            dietaryHabits: toggleArrayItem(preferences.dietaryHabits, habit)
                          })}
                        >
                          {habit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Lifestyle Preferences</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Simple Living', 'Luxury Living', 'Urban Lifestyle', 'Rural Lifestyle', 'Joint Family', 'Nuclear Family'].map((lifestyle) => (
                        <Badge
                          key={lifestyle}
                          variant={preferences.lifestyle.includes(lifestyle) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setPreferences({
                            ...preferences,
                            lifestyle: toggleArrayItem(preferences.lifestyle, lifestyle)
                          })}
                        >
                          {lifestyle}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="aboutPartner" className="text-sm font-medium text-gray-700">About My Partner</Label>
                    <Textarea
                      id="aboutPartner"
                      value={preferences.aboutPartner}
                      onChange={(e) => setPreferences({...preferences, aboutPartner: e.target.value})}
                      className="min-h-32 resize-none"
                      placeholder="Describe your ideal partner..."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Dietary Habits</Label>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">{preferences.dietaryHabits.join(', ')}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Lifestyle</Label>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">{preferences.lifestyle.join(', ')}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">About My Partner</Label>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 leading-relaxed">{preferences.aboutPartner}</p>
                    </div>
                  </div>
                </div>
              )}
            </PreferenceSection>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <Button onClick={() => alert('All preferences saved successfully!')} className="bg-red-500 hover:bg-red-600 text-white px-8 py-2">
            <Save className="w-4 h-4 mr-2" />
            Save All Preferences
          </Button>
        </div>

        {/* Bottom Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">Want filters to affect your matches</p>
              <p className="text-xs text-blue-700">Age, Physical Stats, Location, Education, Religion, Mother Tongue, Income</p>
            </div>
            <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
