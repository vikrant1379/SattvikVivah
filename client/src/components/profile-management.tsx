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
import type { UserProfile } from '@shared/schema';
import {
  religionOptions,
  ethnicityOptions,
  annualIncomeOptions,
  maritalStatusOptions,
  smokingHabitsOptions,
  drinkingHabitsOptions,
  eatingHabitsOptions
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

  // Profile sections with weightage
  const profileSections: ProfileSection[] = [
    {
      id: 'basic',
      title: 'Basic Information',
      weight: 15,
      completed: !!(profile.name && profile.age && profile.religion && profile.caste),
      icon: <User className="w-4 h-4" />
    },
    {
      id: 'about',
      title: 'About Me',
      weight: 20,
      completed: !!(profile.bio && profile.eatingHabits),
      icon: <Heart className="w-4 h-4" />
    },
    {
      id: 'education',
      title: 'Education & Career',
      weight: 15,
      completed: !!(profile.education && profile.profession && profile.annualIncome),
      icon: <Briefcase className="w-4 h-4" />
    },
    {
      id: 'family',
      title: 'Family Details',
      weight: 15,
      completed: !!(profile.familyValues && profile.familyValues.length > 0),
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 'preferences',
      title: 'Partner Preferences',
      weight: 20,
      completed: !!(profile.spiritualGoals && profile.spiritualGoals.length > 0),
      icon: <Star className="w-4 h-4" />
    },
    {
      id: 'photos',
      title: 'Photos',
      weight: 15,
      completed: !!profile.photoUrl,
      icon: <Camera className="w-4 h-4" />
    }
  ];

  // Calculate profile completion percentage
  const calculateCompletionPercentage = () => {
    const totalWeight = profileSections.reduce((sum, section) => sum + section.weight, 0);
    const completedWeight = profileSections
      .filter(section => section.completed)
      .reduce((sum, section) => sum + section.weight, 0);
    return Math.round((completedWeight / totalWeight) * 100);
  };

  // Calculate astrological details from birth information
  const calculateAstrologicalDetails = async () => {
    if (!birthDetails.date || !birthDetails.time || !birthDetails.place) {
      alert('Please fill all birth details to calculate astrological information');
      return;
    }

    try {
      const horoscope = generateBasicHoroscope({
        date: birthDetails.date,
        time: birthDetails.time,
        place: birthDetails.place
      });

      setFormData(prev => ({
        ...prev,
        rashi: horoscope.moonSign,
        nakshatra: horoscope.nakshatra,
        horoscope: horoscope.sunSign,
        gunaScore: Math.floor(Math.random() * 37), // 0-36 range for demo
        doshas: horoscope.doshas,
        birthTime: birthDetails.time,
        birthPlace: birthDetails.place
      }));

      alert('Astrological details calculated successfully!');
    } catch (error) {
      console.error('Error calculating astrological details:', error);
      alert('Error calculating astrological details. Please try again.');
    }
  };

  const handleSave = () => {
    onProfileUpdate(formData);
    alert('Profile updated successfully!');
  };

  const completionPercentage = calculateCompletionPercentage();

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
                <div className="text-2xl font-bold text-blue-600">{completionPercentage}%</div>
                <p className="text-xs text-gray-500">Profile Score</p>
              </div>
              
              {/* Hover tooltip */}
              <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="text-sm font-medium text-gray-900 mb-2">Profile Completion Details</div>
                <Progress value={completionPercentage} className="w-full h-2 mb-3" />
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {profileSections.map(section => (
                    <div key={section.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {section.icon}
                        <span className={section.completed ? "text-green-700" : "text-gray-600"}>
                          {section.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">{section.weight}%</span>
                        {section.completed ? (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        ) : (
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        )}
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
              <CardTitle>Basic Information (15% weightage)</CardTitle>
              <p className="text-sm text-gray-600">Auto-filled from signup, add missing details</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    value={formData.age || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={formData.height || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                    placeholder="e.g., 5'6&quot;"
                  />
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

              {/* Astrological Calculation Section */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Calculate Astrological Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="birth-date">Date of Birth *</Label>
                      <Input
                        id="birth-date"
                        type="date"
                        value={birthDetails.date}
                        onChange={(e) => setBirthDetails(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="birth-time">Time of Birth *</Label>
                      <Input
                        id="birth-time"
                        type="time"
                        value={birthDetails.time}
                        onChange={(e) => setBirthDetails(prev => ({ ...prev, time: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="birth-place">Place of Birth *</Label>
                      <Input
                        id="birth-place"
                        value={birthDetails.place}
                        onChange={(e) => setBirthDetails(prev => ({ ...prev, place: e.target.value }))}
                        placeholder="City, State, Country"
                      />
                    </div>
                  </div>
                  <Button onClick={calculateAstrologicalDetails} className="w-full">
                    Calculate Zodiac Sign, Nakshatra & Horoscope
                  </Button>

                  {/* Display calculated astrological details */}
                  {formData.rashi && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg">
                      <div>
                        <Label className="text-xs text-gray-500">Rashi (Moon Sign)</Label>
                        <p className="font-medium">{formData.rashi}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Nakshatra</Label>
                        <p className="font-medium">{formData.nakshatra}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Zodiac Sign</Label>
                        <p className="font-medium">{formData.horoscope}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Guna Score</Label>
                        <p className="font-medium">{formData.gunaScore}/36</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </CardContent>
          </TabsContent>

          {/* About Me Tab */}
          <TabsContent value="about" className="space-y-4">
            <CardHeader>
              <CardTitle>About Me (20% weightage)</CardTitle>
              <p className="text-sm text-gray-600">Share your spiritual journey and lifestyle</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bio">About Me / Spiritual Path *</Label>
                <Textarea
                  id="bio"
                  value={formData.bio || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Share your spiritual journey, values, and what you're looking for in a partner..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="eating-habits">Eating Habits *</Label>
                  <Select
                    value={formData.eatingHabits || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, eatingHabits: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Diet" />
                    </SelectTrigger>
                    <SelectContent>
                      {eatingHabitsOptions.map(diet => (
                        <SelectItem key={diet} value={diet}>
                          {diet}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="drinking-habits">Drinking Habits</Label>
                  <Select
                    value={formData.drinkingHabits || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, drinkingHabits: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Habit" />
                    </SelectTrigger>
                    <SelectContent>
                      {drinkingHabitsOptions.map(habit => (
                        <SelectItem key={habit} value={habit}>
                          {habit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="smoking-habits">Smoking Habits</Label>
                  <Select
                    value={formData.smokingHabits || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, smokingHabits: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Habit" />
                    </SelectTrigger>
                    <SelectContent>
                      {smokingHabitsOptions.map(habit => (
                        <SelectItem key={habit} value={habit}>
                          {habit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </TabsContent>

          {/* Education & Career Tab */}
          <TabsContent value="education" className="space-y-4">
            <CardHeader>
              <CardTitle>Education & Career (15% weightage)</CardTitle>
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
          <TabsContent value="family" className="space-y-4">
            <CardHeader>
              <CardTitle>Family Details (15% weightage)</CardTitle>
              <p className="text-sm text-gray-600">Family background and values</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Family Values *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {['Traditional', 'Modern', 'Liberal', 'Orthodox', 'Progressive', 'Spiritual'].map(value => (
                    <label key={value} className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.familyValues?.includes(value) || false}
                        onCheckedChange={(checked) => {
                          const currentValues = formData.familyValues || [];
                          if (checked) {
                            setFormData(prev => ({
                              ...prev,
                              familyValues: [...currentValues, value]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              familyValues: currentValues.filter(v => v !== value)
                            }));
                          }
                        }}
                      />
                      <span className="text-sm">{value}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </TabsContent>

          {/* Partner Preferences Tab */}
          <TabsContent value="preferences" className="space-y-4">
            <CardHeader>
              <CardTitle>Partner Preferences (20% weightage)</CardTitle>
              <p className="text-sm text-gray-600">What you're looking for in a life partner</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Spiritual Goals *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {spiritualPractices.map(goal => (
                    <label key={goal} className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.spiritualGoals?.includes(goal) || false}
                        onCheckedChange={(checked) => {
                          const currentGoals = formData.spiritualGoals || [];
                          if (checked) {
                            setFormData(prev => ({
                              ...prev,
                              spiritualGoals: [...currentGoals, goal]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              spiritualGoals: currentGoals.filter(g => g !== goal)
                            }));
                          }
                        }}
                      />
                      <span className="text-sm">{goal}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label>Sacred Texts Read</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {sacredTexts.map(text => (
                    <label key={text} className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.sacredTexts?.includes(text) || false}
                        onCheckedChange={(checked) => {
                          const currentTexts = formData.sacredTexts || [];
                          if (checked) {
                            setFormData(prev => ({
                              ...prev,
                              sacredTexts: [...currentTexts, text]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              sacredTexts: currentTexts.filter(t => t !== text)
                            }));
                          }
                        }}
                      />
                      <span className="text-sm">{text}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="guruLineage">Guru/Spiritual Lineage</Label>
                <Select
                  value={formData.guruLineage || ''}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, guruLineage: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Lineage" />
                  </SelectTrigger>
                  <SelectContent>
                    {guruLineages.map(lineage => (
                      <SelectItem key={lineage} value={lineage}>
                        {lineage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-4">
            <CardHeader>
              <CardTitle>Photos (15% weightage)</CardTitle>
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