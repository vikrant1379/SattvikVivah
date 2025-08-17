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
import { Heart, Save, ArrowLeft, Edit, Filter, Users, MapPin, GraduationCap, Globe, Coins, Home, ChevronLeft } from 'lucide-react';
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
import { PartnerPreferencesForm } from '../components/partner-preferences-form';

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

  const completionPercentage = 100; // Placeholder, actual calculation can be implemented if needed

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLocation('/')}
              className="text-gray-700 hover:text-orange-600 flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Hi Vikrant Chaudhary!</span>
            </button>
            <div className="text-sm text-gray-500">
              TY24M8S Edit Partner Preferences
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 space-y-2">
                <div className="text-gray-700 py-2 px-3 text-sm">Matches</div>
                <div className="text-gray-700 py-2 px-3 text-sm">Activity</div>
                <div className="text-gray-700 py-2 px-3 text-sm">Search</div>
                <div className="text-gray-700 py-2 px-3 text-sm">Messenger</div>
                <div className="bg-green-100 text-green-700 py-2 px-3 rounded text-sm font-medium">
                  Upgrade 54% off
                </div>
              </div>
              
              {/* Profile Score */}
              <div className="p-4 border-t">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">100%</div>
                  <div className="text-sm text-gray-500 mb-2">Profile Score</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-400 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b">
                <div className="flex">
                  {[
                    { id: 'basic', label: 'Basic', active: true },
                    { id: 'about', label: 'About' },
                    { id: 'education', label: 'Education' },
                    { id: 'family', label: 'Family' },
                    { id: 'spiritual', label: 'Spiritual' },
                    { id: 'photos', label: 'Photos' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                        tab.active
                          ? 'border-orange-500 text-orange-600 bg-orange-50'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Partner's Basic Details</h2>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>

                {/* Form Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <label className="text-sm font-medium text-gray-700">Age</label>
                      </div>
                      <div className="text-gray-900">{preferences.ageRange[0]} - {preferences.ageRange[1]} years</div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <label className="text-sm font-medium text-gray-700">Height</label>
                      </div>
                      <div className="text-gray-900">{preferences.heightRange[0]} - {preferences.heightRange[1]}</div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <label className="text-sm font-medium text-gray-700">Religion</label>
                      </div>
                      <div className="text-gray-900">{preferences.religion.join(', ')}</div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <label className="text-sm font-medium text-gray-700">Marital Status</label>
                      </div>
                      <div className="text-gray-900">{preferences.maritalStatus.join(', ')}</div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <label className="text-sm font-medium text-gray-700">Mother Tongue</label>
                      </div>
                      <div className="text-gray-900">{preferences.motherTongue.join(', ')}</div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                        <label className="text-sm font-medium text-gray-700">Caste</label>
                      </div>
                      <div className="text-gray-900">{preferences.caste.join(', ')}</div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={() => alert('All preferences saved successfully!')} 
                    className="px-8 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium"
                  >
                    Save All Preferences
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};