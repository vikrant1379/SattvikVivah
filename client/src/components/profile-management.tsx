import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Star, User, Heart, Briefcase, Users, Eye, EyeOff } from 'lucide-react';
import { horoscopeService } from '@/services/horoscope.service';
import { generateBasicHoroscope } from '@/utils/vedic-astrology.utils';
import AstrologicalCalculator from '@/components/astrological-calculator';
import type { UserProfile } from '@shared/schema';
import {
  religionOptions,
  ethnicityOptions,
  annualIncomeOptions,
  maritalStatusOptions,
  smokingHabitsOptions,
  drinkingHabitsOptions,
  eatingHabitsOptions,
  familyValuesOptions,
  familyTypes,
  ayurvedicConstitutions,
  spiritualPracticesOptions,
  heightOptions
} from '../data/static-options';
import { educationQualificationOptions } from '../data/education';
import { professionOptions } from '../data/profession';
import { motherTongueOptions } from '../data/mother-tongue';
import { casteOptions } from '../data/caste';
import {
  spiritualPractices,
  sacredTexts,
  guruLineages,
  dietaryLifestyles
} from '../data/spiritual-practices';

interface ProfileSection {
  id: string;
  title: string;
  weight: number;
  completed: boolean;
  icon: React.ReactNode;
}

interface ProfileManagementProps {
  profile: UserProfile;
  onProfileUpdate: (updatedProfile: Partial<UserProfile>) => void;
}

export const ProfileManagement: React.FC<ProfileManagementProps> = ({
  profile,
  onProfileUpdate
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<Partial<UserProfile>>(profile);
  const [birthDetails, setBirthDetails] = useState({
    date: profile.createdAt ? new Date(profile.createdAt).toISOString().split('T')[0] : '',
    time: profile.birthTime || '12:00',
    place: profile.birthPlace || ''
  });

  // Calculate individual section completion percentages
  const calculateSectionCompletion = (sectionId: string): number => {
    switch (sectionId) {
      case 'basic':
        const basicFields = [
          profile.name,
          profile.age,
          profile.height,
          profile.motherTongue,
          profile.religion,
          profile.caste,
          formData.rashi,
          formData.nakshatra,
          formData.horoscope
        ];
        return Math.round((basicFields.filter(field => field).length / basicFields.length) * 100);

      case 'about':
        const aboutFields = [
          profile.bio,
          profile.eatingHabits,
          profile.drinkingHabits,
          profile.smokingHabits
        ];
        return Math.round((aboutFields.filter(field => field).length / aboutFields.length) * 100);

      case 'education':
        const educationFields = [
          profile.education,
          profile.profession,
          profile.annualIncome
        ];
        return Math.round((educationFields.filter(field => field).length / educationFields.length) * 100);

      case 'family':
        const familyFields = [
          profile.familyValues?.length > 0 ? 'filled' : null
        ];
        return familyFields[0] ? 100 : 0;

      case 'preferences':
        const preferenceFields = [
          profile.spiritualGoals?.length > 0 ? 'filled' : null,
          profile.sacredTexts?.length > 0 ? 'filled' : null,
          profile.guruLineage
        ];
        return Math.round((preferenceFields.filter(field => field).length / preferenceFields.length) * 100);

      case 'photos':
        return profile.photoUrl ? 100 : 0;

      default:
        return 0;
    }
  };

  // Profile sections with individual completion percentages
  const profileSections: ProfileSection[] = [
    {
      id: 'basic',
      title: 'Basic Information',
      weight: 15,
      completed: calculateSectionCompletion('basic') === 100,
      icon: <User className="w-4 h-4" />
    },
    {
      id: 'about',
      title: 'About Me',
      weight: 20,
      completed: calculateSectionCompletion('about') === 100,
      icon: <Heart className="w-4 h-4" />
    },
    {
      id: 'education',
      title: 'Education & Career',
      weight: 15,
      completed: calculateSectionCompletion('education') === 100,
      icon: <Briefcase className="w-4 h-4" />
    },
    {
      id: 'family',
      title: 'Family Details',
      weight: 15,
      completed: calculateSectionCompletion('family') === 100,
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 'preferences',
      title: 'Partner Preferences',
      weight: 20,
      completed: calculateSectionCompletion('preferences') === 100,
      icon: <Star className="w-4 h-4" />
    },
    {
      id: 'photos',
      title: 'Photos',
      weight: 15,
      completed: calculateSectionCompletion('photos') === 100,
      icon: <Camera className="w-4 h-4" />
    }
  ];

  // Calculate profile completion percentage
  const calculateCompletionPercentage = () => {
    // Updated sections based on new field structure
    const sections = [
      {
        name: 'Basic Information',
        weight: 15,
        fields: ['name', 'age', 'gender', 'height', 'location', 'religion', 'caste']
      },
      {
        name: 'About Me',
        weight: 20,
        fields: ['selfDescription', 'spiritualJourney', 'dailyRoutine']
      },
      {
        name: 'Family Details',
        weight: 15,
        fields: ['familyBackground', 'familyOccupation', 'familyLifestyle', 'fatherOccupation', 'motherOccupation']
      },
      {
        name: 'Education & Career',
        weight: 15,
        fields: ['education', 'profession', 'annualIncome']
      },
      {
        name: 'Partner Preferences',
        weight: 20,
        fields: ['idealPartner', 'spiritualAlignment', 'relocationPreference', 'careerChoice']
      },
      {
        name: 'Spiritual Details',
        weight: 15,
        fields: ['spiritualPractices', 'sacredTexts', 'spiritualPath', 'coreValues']
      }
    ];

    const sectionCompletions = sections.map(section => {
      const completedFields = section.fields.filter(field => {
        const value = formData[field as keyof typeof formData];
        return value !== undefined && value !== null && value !== '' &&
               (!Array.isArray(value) || value.length > 0);
      });
      const completionPercentage = (completedFields.length / section.fields.length) * 100;
      return {
        ...section,
        completionPercentage: Math.round(completionPercentage),
        completedFields: completedFields.length,
        totalFields: section.fields.length
      };
    });

    const totalScore = sectionCompletions.reduce((total, section) => {
      return total + (section.completionPercentage * section.weight / 100);
    }, 0);

    return {
      overallPercentage: Math.round(totalScore),
      sectionCompletions
    };
  };



  const handleSave = () => {
    onProfileUpdate(formData);
    alert('Profile updated successfully!');
  };

  const { overallPercentage, sectionCompletions } = calculateCompletionPercentage();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Completion Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Profile Management</CardTitle>
              <p className="text-gray-600">Manage your profile information</p>
            </div>
            <div className="relative group">
              <div className="text-center cursor-help">
                <div className="text-2xl font-bold text-blue-600">{overallPercentage}%</div>
                <p className="text-xs text-gray-500">Profile Score</p>
              </div>

              {/* Hover tooltip */}
              <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="text-sm font-medium text-gray-900 mb-2">Profile Completion Details</div>
                <Progress value={overallPercentage} className="w-full h-2 mb-3" />
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {sectionCompletions.map(section => (
                    <div key={section.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={section.completionPercentage > 50 ? "text-green-700" : "text-gray-600"}>
                          {section.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">{section.completionPercentage}%</span>
                        <div className={`w-2 h-2 rounded-full ${
                          section.completionPercentage === 100 ? 'bg-green-500' :
                          section.completionPercentage > 50 ? 'bg-yellow-500' : 'bg-gray-300'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
                  Complete missing sections to improve match visibility
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Form Tabs */}
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            {profileSections.map(section => (
              <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-1">
                {section.icon}
                <span className="hidden sm:inline">{section.title.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-4">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <p className="text-sm text-gray-600">Update Your Information</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="75"
                    value={formData.age || ''}
                    onChange={(e) => {
                      const age = parseInt(e.target.value);
                      if (age >= 18 && age <= 75) {
                        setFormData({...formData, age: age});
                      }
                    }}
                    placeholder="Enter your age (18-75)"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height</Label>
                  <Select
                    value={formData.height || ''}
                    onValueChange={(value) => setFormData({...formData, height: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select height" />
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
                  <Label htmlFor="mother-tongue">Mother Tongue</Label>
                  <Select
                    value={formData.motherTongue || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, motherTongue: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {motherTongueOptions.map(lang => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Birth Details and Astrological Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="birthPlace">Place of Birth</Label>
                  <AstrologicalCalculator
                    birthDetails={birthDetails}
                    onBirthDetailsChange={setBirthDetails}
                    onAstrologicalDataChange={(data) => {
                      setFormData({
                        ...formData,
                        rashi: data.rashi,
                        nakshatra: data.nakshatra,
                        manglikStatus: data.manglikStatus
                      });
                    }}
                  />
                </div>

                {/* Manual Astrological Fields */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="rashi">Rashi (Moon Sign)</Label>
                    <Select
                      value={formData.rashi || ''}
                      onValueChange={(value) => setFormData({...formData, rashi: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select rashi" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya', 'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'].map((rashi) => (
                          <SelectItem key={rashi} value={rashi}>{rashi}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="nakshatra">Nakshatra</Label>
                    <Select
                      value={formData.nakshatra || ''}
                      onValueChange={(value) => setFormData({...formData, nakshatra: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select nakshatra" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'].map((nakshatra) => (
                          <SelectItem key={nakshatra} value={nakshatra}>{nakshatra}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="manglikStatus">Manglik Status</Label>
                    <Select
                      value={formData.manglikStatus || ''}
                      onValueChange={(value) => setFormData({...formData, manglikStatus: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Anshik">Anshik (Partial)</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>

          {/* About Me Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Self Description - Required */}
                <div>
                  <Label htmlFor="selfDescription" className="text-sm font-medium">
                    About Yourself <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="selfDescription"
                    value={formData.selfDescription || ''}
                    onChange={(e) => setFormData({...formData, selfDescription: e.target.value})}
                    placeholder="Describe your personality, interests, lifestyle, and what makes you unique..."
                    className="min-h-32"
                    required
                  />
                </div>

                {/* Spiritual Journey - Optional */}
                <div>
                  <Label htmlFor="spiritualJourney" className="text-sm font-medium">
                    Your Spiritual Journey
                  </Label>
                  <Textarea
                    id="spiritualJourney"
                    value={formData.spiritualJourney || ''}
                    onChange={(e) => setFormData({...formData, spiritualJourney: e.target.value})}
                    placeholder="Share your spiritual background, inspirations, and practices that have shaped your journey..."
                    className="min-h-28"
                  />
                </div>

                {/* Daily Routine - Optional */}
                <div>
                  <Label htmlFor="dailyRoutine" className="text-sm font-medium">
                    Daily Sadhana & Routine
                  </Label>
                  <Textarea
                    id="dailyRoutine"
                    value={formData.dailyRoutine || ''}
                    onChange={(e) => setFormData({...formData, dailyRoutine: e.target.value})}
                    placeholder="Describe your daily sadhana, prayer, yoga, meditation, or other spiritual practices..."
                    className="min-h-28"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Spiritual Practices</Label>
                    <div className="flex flex-wrap gap-2 mt-2 max-h-32 overflow-y-auto">
                      {spiritualPracticesOptions.map(practice => (
                        <Badge
                          key={practice}
                          variant={formData.spiritualPractices?.includes(practice) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            const current = formData.spiritualPractices || [];
                            const updated = current.includes(practice)
                              ? current.filter(p => p !== practice)
                              : [...current, practice];
                            setFormData({...formData, spiritualPractices: updated});
                          }}
                        >
                          {practice}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Sacred Texts</Label>
                    <div className="flex flex-wrap gap-2 mt-2 max-h-32 overflow-y-auto">
                      {sacredTexts.map(text => (
                        <Badge
                          key={text}
                          variant={formData.sacredTexts?.includes(text) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            const current = formData.sacredTexts || [];
                            const updated = current.includes(text)
                              ? current.filter(t => t !== text)
                              : [...current, text];
                            setFormData({...formData, sacredTexts: updated});
                          }}
                        >
                          {text}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ayurvedicConstitution">Ayurvedic Constitution</Label>
                    <Select
                      value={formData.ayurvedicConstitution || ''}
                      onValueChange={(value) => setFormData({...formData, ayurvedicConstitution: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select constitution" />
                      </SelectTrigger>
                      <SelectContent>
                        {ayurvedicConstitutions.map(constitution => (
                          <SelectItem key={constitution} value={constitution}>
                            {constitution}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="eatingHabits">Eating Habits</Label>
                    <Select
                      value={formData.eatingHabits || ''}
                      onValueChange={(value) => setFormData({...formData, eatingHabits: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select eating habits" />
                      </SelectTrigger>
                      <SelectContent>
                        {eatingHabitsOptions.map(habit => (
                          <SelectItem key={habit} value={habit}>
                            {habit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Spiritual Details Section */}
            <Card>
              <CardHeader>
                <CardTitle>Spiritual Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Spiritual Path */}
                <div>
                  <Label htmlFor="spiritualPath" className="text-sm font-medium">
                    Spiritual Path & Tradition
                  </Label>
                  <Textarea
                    id="spiritualPath"
                    value={formData.spiritualPath || ''}
                    onChange={(e) => setFormData({...formData, spiritualPath: e.target.value})}
                    placeholder="Mention the spiritual tradition or path you follow, if any..."
                    className="min-h-24"
                  />
                </div>

                {/* Gurus & Inspirations */}
                <div>
                  <Label htmlFor="gurusInspirations" className="text-sm font-medium">
                    Gurus, Teachers & Inspirations
                  </Label>
                  <Textarea
                    id="gurusInspirations"
                    value={formData.gurusInspirations || ''}
                    onChange={(e) => setFormData({...formData, gurusInspirations: e.target.value})}
                    placeholder="List gurus, teachers, books, or personalities that inspire you..."
                    className="min-h-24"
                  />
                </div>

                {/* Core Values */}
                <div>
                  <Label htmlFor="coreValues" className="text-sm font-medium">
                    Core Values
                  </Label>
                  <Textarea
                    id="coreValues"
                    value={formData.coreValues || ''}
                    onChange={(e) => setFormData({...formData, coreValues: e.target.value})}
                    placeholder="Values like simplicity, compassion, karma yoga, discipline, non-violence..."
                    className="min-h-24"
                  />
                </div>

                {/* Spiritual Interests */}
                <div>
                  <Label htmlFor="spiritualInterests" className="text-sm font-medium">
                    Spiritual Interests & Activities
                  </Label>
                  <Textarea
                    id="spiritualInterests"
                    value={formData.spiritualInterests || ''}
                    onChange={(e) => setFormData({...formData, spiritualInterests: e.target.value})}
                    placeholder="Activities like meditation, seva, satsang, nature walks, scriptural study..."
                    className="min-h-24"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education & Career Tab */}
          <TabsContent value="education" className="space-y-4">
            <CardHeader>
              <CardTitle>Education & Career</CardTitle>
              <p className="text-sm text-gray-600">Professional background and achievements</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="education">Education *</Label>
                  <Select
                    value={formData.education || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, education: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Education" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationQualificationOptions.map(edu => (
                        <SelectItem key={edu} value={edu}>
                          {edu}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="profession">Profession *</Label>
                  <Select
                    value={formData.profession || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, profession: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Profession" />
                    </SelectTrigger>
                    <SelectContent>
                      {professionOptions.map(prof => (
                        <SelectItem key={prof} value={prof}>
                          {prof}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="annualIncome">Annual Income</Label>
                  <Select
                    value={formData.annualIncome || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, annualIncome: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Income Range" />
                    </SelectTrigger>
                    <SelectContent>
                      {annualIncomeOptions.map(income => (
                        <SelectItem key={income} value={income}>
                          {income}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </TabsContent>

          {/* Family Details Tab */}
          <TabsContent value="family" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Family Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Family Background */}
                <div>
                  <Label htmlFor="familyBackground" className="text-sm font-medium">
                    Family Background & Values
                  </Label>
                  <Textarea
                    id="familyBackground"
                    value={formData.familyBackground || ''}
                    onChange={(e) => setFormData({...formData, familyBackground: e.target.value})}
                    placeholder="Describe your family values, culture, traditions, and background..."
                    className="min-h-28"
                  />
                </div>

                {/* Family Occupation */}
                <div>
                  <Label htmlFor="familyOccupation" className="text-sm font-medium">
                    Family Occupation Details
                  </Label>
                  <Textarea
                    id="familyOccupation"
                    value={formData.familyOccupation || ''}
                    onChange={(e) => setFormData({...formData, familyOccupation: e.target.value})}
                    placeholder="Occupations and roles of parents, siblings, grandparents..."
                    className="min-h-24"
                  />
                </div>

                {/* Family Lifestyle */}
                <div>
                  <Label htmlFor="familyLifestyle" className="text-sm font-medium">
                    Family Lifestyle
                  </Label>
                  <Textarea
                    id="familyLifestyle"
                    value={formData.familyLifestyle || ''}
                    onChange={(e) => setFormData({...formData, familyLifestyle: e.target.value})}
                    placeholder="Details like simplicity, modern/traditional blend, farmhouse/village life, etc..."
                    className="min-h-24"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fatherOccupation">Father's Occupation</Label>
                    <Input
                      id="fatherOccupation"
                      value={formData.fatherOccupation || ''}
                      onChange={(e) => setFormData({...formData, fatherOccupation: e.target.value})}
                      placeholder="Father's profession"
                    />
                  </div>
                  <div>
                    <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                    <Input
                      id="motherOccupation"
                      value={formData.motherOccupation || ''}
                      onChange={(e) => setFormData({...formData, motherOccupation: e.target.value})}
                      placeholder="Mother's profession"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="siblings">Siblings</Label>
                  <Input
                    id="siblings"
                    value={formData.siblings || ''}
                    onChange={(e) => setFormData({...formData, siblings: e.target.value})}
                    placeholder="Number and details of siblings"
                  />
                </div>

                <div>
                  <Label htmlFor="familyType">Family Type</Label>
                  <Select
                    value={formData.familyType || ''}
                    onValueChange={(value) => setFormData({...formData, familyType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select family type" />
                    </SelectTrigger>
                    <SelectContent>
                      {familyTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Partner Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Partner Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Ideal Partner - Required */}
                <div>
                  <Label htmlFor="idealPartner" className="text-sm font-medium">
                    Your Ideal Life Partner <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="idealPartner"
                    value={formData.idealPartner || ''}
                    onChange={(e) => setFormData({...formData, idealPartner: e.target.value})}
                    placeholder="Describe your vision for your life partner in one paragraph..."
                    className="min-h-32"
                    required
                  />
                </div>

                {/* Spiritual Alignment */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Spiritual Alignment Preference</Label>
                  <Select
                    value={formData.spiritualAlignment || ''}
                    onValueChange={(value) => setFormData({...formData, spiritualAlignment: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select spiritual alignment preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prefer_same_path">Prefer same spiritual path</SelectItem>
                      <SelectItem value="open_to_different">Open to different path</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    value={formData.spiritualAlignmentDetails || ''}
                    onChange={(e) => setFormData({...formData, spiritualAlignmentDetails: e.target.value})}
                    placeholder="Explain your spiritual alignment preference..."
                    className="min-h-20"
                  />
                </div>

                {/* Relocation Preference */}
                <div>
                  <Label htmlFor="relocationPreference" className="text-sm font-medium">
                    Relocation Preference
                  </Label>
                  <Select
                    value={formData.relocationPreference || ''}
                    onValueChange={(value) => setFormData({...formData, relocationPreference: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relocation preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="willing_to_relocate">Willing to relocate</SelectItem>
                      <SelectItem value="prefer_hometown">Prefer hometown</SelectItem>
                      <SelectItem value="open_to_discussion">Open to discussion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Career Choice */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Partner's Career Choice</Label>
                  <Select
                    value={formData.careerChoice || ''}
                    onValueChange={(value) => setFormData({...formData, careerChoice: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select career preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="working_partner">Working partner</SelectItem>
                      <SelectItem value="homemaker">Homemaker</SelectItem>
                      <SelectItem value="either_is_fine">Either is fine</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    value={formData.careerChoiceDetails || ''}
                    onChange={(e) => setFormData({...formData, careerChoiceDetails: e.target.value})}
                    placeholder="Additional details about career expectations..."
                    className="min-h-20"
                  />
                </div>

                {/* Horoscope Preference */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Horoscope Matching Preference</Label>
                  <Select
                    value={formData.horoscopePreference || ''}
                    onValueChange={(value) => setFormData({...formData, horoscopePreference: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select horoscope preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match_required">Match required</SelectItem>
                      <SelectItem value="optional">Optional</SelectItem>
                      <SelectItem value="not_necessary">Not necessary</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    value={formData.horoscopePreferenceDetails || ''}
                    onChange={(e) => setFormData({...formData, horoscopePreferenceDetails: e.target.value})}
                    placeholder="Minimum Guna score preference or Nakshatra preference..."
                    className="min-h-20"
                  />
                </div>

                {/* Parenting Vision */}
                <div>
                  <Label htmlFor="parentingVision" className="text-sm font-medium">
                    Parenting Vision
                  </Label>
                  <Textarea
                    id="parentingVision"
                    value={formData.parentingVision || ''}
                    onChange={(e) => setFormData({...formData, parentingVision: e.target.value})}
                    placeholder="Your expectations around raising children, parenting style, values to instill..."
                    className="min-h-28"
                  />
                </div>

                {/* Support Expectations */}
                <div>
                  <Label htmlFor="supportExpectations" className="text-sm font-medium">
                    Support Expectations
                  </Label>
                  <Textarea
                    id="supportExpectations"
                    value={formData.supportExpectations || ''}
                    onChange={(e) => setFormData({...formData, supportExpectations: e.target.value})}
                    placeholder="How your partner can support you in spiritual and professional pursuits..."
                    className="min-h-28"
                  />
                </div>

                {/* Basic Preferences */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ageRangeMin">Minimum Age</Label>
                    <Input
                      id="ageRangeMin"
                      type="number"
                      value={formData.ageRangeMin || ''}
                      onChange={(e) => {
                        const minAge = parseInt(e.target.value);
                        if (minAge >= 18 && minAge <= 75) {
                          setFormData({...formData, ageRangeMin: minAge});
                        }
                      }}
                      placeholder="Minimum age"
                      min="18"
                      max="75"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ageRangeMax">Maximum Age</Label>
                    <Input
                      id="ageRangeMax"
                      type="number"
                      value={formData.ageRangeMax || ''}
                      onChange={(e) => {
                        const maxAge = parseInt(e.target.value);
                        if (maxAge >= 18 && maxAge <= 75) {
                          setFormData({...formData, ageRangeMax: maxAge});
                        }
                      }}
                      placeholder="Maximum age"
                      min="18"
                      max="75"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="heightRangeMin">Min Height</Label>
                    <Select
                      value={formData.heightRangeMin || ''}
                      onValueChange={(value) => setFormData({...formData, heightRangeMin: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Min" />
                      </SelectTrigger>
                      <SelectContent>
                        {heightOptions.map(height => (
                          <SelectItem key={height} value={height}>
                            {height}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="heightRangeMax">Max Height</Label>
                    <Select
                      value={formData.heightRangeMax || ''}
                      onValueChange={(value) => setFormData({...formData, heightRangeMax: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Max" />
                      </SelectTrigger>
                      <SelectContent>
                        {heightOptions.map(height => (
                          <SelectItem key={height} value={height}>
                            {height}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="locationPreference">Location Preference</Label>
                  <Input
                    id="locationPreference"
                    value={formData.locationPreference || ''}
                    onChange={(e) => setFormData({...formData, locationPreference: e.target.value})}
                    placeholder="Preferred locations"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-4">
            <CardHeader>
              <CardTitle>Photos</CardTitle>
              <p className="text-sm text-gray-600">Upload 2-5 profile photos</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium mb-2">Upload Profile Photos</p>
                <p className="text-sm text-gray-600 mb-4">Add 2-5 high-quality photos to increase profile visibility</p>
                <Button variant="outline">
                  Choose Photos
                </Button>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>

        <CardContent className="border-t mt-6 pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                Ready to save your changes?
              </p>
              <p className="text-xs text-gray-500">
                Your profile will be updated instantly
              </p>
            </div>
            <Button onClick={handleSave} className="px-8">
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileManagement;