import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Camera, MapPin, Briefcase, GraduationCap, Users, Heart, Save, Eye, EyeOff } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const mockUserProfile: UserProfile = {
  id: 'TYZ4M8S',
  userId: 'demo-user-id',
  name: 'Vikrant Chaudhary',
  age: 27,
  gender: 'Male',
  height: '5\'8" (173 cms)',
  city: 'Delhi',
  state: 'Delhi',
  country: 'IN',
  religion: 'Hindu',
  caste: 'Doesn\'t Matter',
  motherTongue: 'Hindi',
  profession: 'Software Engineer',
  education: 'B.E/B.Tech - Undergraduate (Engg.)',
  annualIncome: 'Rs. 8 - 12 Lakh p.a',
  maritalStatus: 'Never Married',
  eatingHabits: 'Vegetarian',
  smokingHabits: 'No',
  drinkingHabits: 'No',
  bio: 'Looking for a spiritually aligned life partner for the journey of Grihastha ashram.',
  spiritualPractices: ['Meditation & Dhyana', 'Daily Sadhana'],
  sacredTexts: ['Bhagavad Gita', 'Upanishads'],
  guruLineage: 'Traditional',
  familyValues: ['Traditional', 'Spiritual'],
  spiritualGoals: ['Self-realization', 'Dharmic Living'],
  verified: true,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  profileImage: '/api/placeholder/400/300'
};

export const ProfileEditPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [formData, setFormData] = useState<Partial<UserProfile>>(mockUserProfile);
  const [activeSection, setActiveSection] = useState<string>('basic');
  const [isEditing, setIsEditing] = useState<{[key: string]: boolean}>({});
  const [birthDetails, setBirthDetails] = useState({
    date: profile.createdAt ? new Date(profile.createdAt).toISOString().split('T')[0] : '',
    time: profile.birthTime || '12:00',
    place: profile.birthPlace || ''
  });

  const handleEdit = (section: string) => {
    setIsEditing(prev => ({...prev, [section]: !prev[section]}));
  };

  const handleSave = (section: string) => {
    setProfile(prev => ({...prev, ...formData}));
    setIsEditing(prev => ({...prev, [section]: false}));
    alert(`${section} updated successfully!`);
  };

  const handleCancel = (section: string) => {
    setFormData(profile);
    setIsEditing(prev => ({...prev, [section]: false}));
  };

  const calculateCompletionPercentage = () => {
    const fields = [
      profile.name, profile.age, profile.height, profile.education,
      profile.profession, profile.bio, profile.religion, profile.motherTongue
    ];
    const completedFields = fields.filter(field => field && field !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const ProfileSection = ({
    title,
    children,
    id,
    isEditable = true
  }: {
    title: string;
    children: React.ReactNode;
    id: string;
    isEditable?: boolean;
  }) => (
    <Card className="mb-6 border-0 shadow-none">
      <CardHeader className="pb-3 px-0">
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
      <CardContent className="pt-0 px-0">
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <button
            onClick={() => setLocation('/')}
            className="text-blue-600 hover:text-blue-700 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Hi {profile.name}!</span>
          </button>
          <p className="text-gray-600 text-sm mt-1">{profile.id} Edit Profile</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4">
                <div className="space-y-2">
                  <button
                    className={`w-full text-left p-2 rounded ${activeSection === 'matches' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setActiveSection('matches')}
                  >
                    Matches
                  </button>
                  <button
                    className={`w-full text-left p-2 rounded ${activeSection === 'activity' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setActiveSection('activity')}
                  >
                    Activity
                  </button>
                  <button
                    className={`w-full text-left p-2 rounded ${activeSection === 'search' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setActiveSection('search')}
                  >
                    Search
                  </button>
                  <button
                    className={`w-full text-left p-2 rounded ${activeSection === 'messenger' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setActiveSection('messenger')}
                  >
                    Messenger
                  </button>
                  <button
                    className={`w-full text-left p-2 rounded bg-green-100 text-green-800 font-medium`}
                  >
                    Upgrade 54% off
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="mt-4 bg-white rounded-lg shadow-sm border p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{calculateCompletionPercentage()}%</div>
                <p className="text-xs text-gray-500">Profile Score</p>
                <Progress value={calculateCompletionPercentage()} className="w-full h-2 mt-2" />
              </div>
            </div>

            {/* Premium Benefits Sidebar */}
            <div className="mt-4 bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-medium text-gray-900 mb-3">You are missing out on the premium benefits!</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs">👁</div>
                  <span className="text-gray-600">Get upto 3x more profile views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-xs">📞</div>
                  <span className="text-gray-600">Unlimited voice & video calls</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">👤</div>
                  <span className="text-gray-600">Get access to contact details</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xs">🔍</div>
                  <span className="text-gray-600">Perform unlimited searches</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">Flat 54% OFF till 16 Aug</p>
              <Button className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white text-sm">
                Upgrade now →
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Accordion type="multiple" defaultValue={["basic", "about"]} className="w-full">

              {/* Basic Details Section */}
              <AccordionItem value="basic">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-orange-600">
                  Basic Details
                </AccordionTrigger>
                <AccordionContent>
                  <ProfileSection title="Basic Information" id="basic" isEditable={true}>
                    {isEditing.basic ? (
                      <div className="space-y-4">
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
                            <Label htmlFor="motherTongue">Mother Tongue</Label>
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
                          <div>
                            <Label htmlFor="religion">Religion</Label>
                            <Select
                              value={formData.religion || ''}
                              onValueChange={(value) => setFormData(prev => ({ ...prev, religion: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Religion" />
                              </SelectTrigger>
                              <SelectContent>
                                {religionOptions.map(religion => (
                                  <SelectItem key={religion} value={religion}>
                                    {religion}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="caste">Caste</Label>
                            <Select
                              value={formData.caste || ''}
                              onValueChange={(value) => setFormData(prev => ({ ...prev, caste: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Caste" />
                              </SelectTrigger>
                              <SelectContent>
                                {casteOptions.map(caste => (
                                  <SelectItem key={caste} value={caste}>
                                    {caste}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Astrological Details */}
                        <div className="space-y-4">
                          <Label>Birth Details & Astrological Information</Label>
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
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">📅</div>
                            <div>
                              <div className="text-gray-500 text-xs">Age</div>
                              <div className="font-medium">{profile.age}</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">📏</div>
                            <div>
                              <div className="text-gray-500 text-xs">Height</div>
                              <div className="font-medium">{profile.height}</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">🕉</div>
                            <div>
                              <div className="text-gray-500 text-xs">Religion</div>
                              <div className="font-medium">{profile.religion}</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">👤</div>
                            <div>
                              <div className="text-gray-500 text-xs">Marital Status</div>
                              <div className="font-medium">{profile.maritalStatus}</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center">🗣</div>
                            <div>
                              <div className="text-gray-500 text-xs">Mother Tongue</div>
                              <div className="font-medium">{profile.motherTongue}</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">🏛</div>
                            <div>
                              <div className="text-gray-500 text-xs">Caste</div>
                              <div className="font-medium">{profile.caste}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </ProfileSection>
                </AccordionContent>
              </AccordionItem>

              {/* About Me Section */}
              <AccordionItem value="about">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-orange-600">
                  About Me
                </AccordionTrigger>
                <AccordionContent>
                  <ProfileSection title="About Me" id="about" isEditable={true}>
                    {isEditing.about ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="bio">About Yourself</Label>
                          <Textarea
                            id="bio"
                            value={formData.bio || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                            className="min-h-32"
                            placeholder="Tell us about yourself..."
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="eatingHabits">Eating Habits</Label>
                            <Select
                              value={formData.eatingHabits || ''}
                              onValueChange={(value) => setFormData(prev => ({ ...prev, eatingHabits: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select habits" />
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

                          <div>
                            <Label htmlFor="drinkingHabits">Drinking Habits</Label>
                            <Select
                              value={formData.drinkingHabits || ''}
                              onValueChange={(value) => setFormData(prev => ({ ...prev, drinkingHabits: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select habits" />
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
                            <Label htmlFor="smokingHabits">Smoking Habits</Label>
                            <Select
                              value={formData.smokingHabits || ''}
                              onValueChange={(value) => setFormData(prev => ({ ...prev, smokingHabits: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select habits" />
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
                      </div>
                    ) : (
                      <div className="text-sm text-gray-700 leading-relaxed">
                        <p>{profile.bio}</p>
                        <div className="mt-4 grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-gray-500 text-xs">Eating Habits</div>
                            <div className="font-medium">{profile.eatingHabits}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 text-xs">Drinking</div>
                            <div className="font-medium">{profile.drinkingHabits}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 text-xs">Smoking</div>
                            <div className="font-medium">{profile.smokingHabits}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </ProfileSection>
                </AccordionContent>
              </AccordionItem>

              {/* Education Section */}
              <AccordionItem value="education">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-orange-600">
                  Education & Career
                </AccordionTrigger>
                <AccordionContent>
                  <ProfileSection title="Education & Career" id="education" isEditable={true}>
                    {isEditing.education ? (
                      <div className="space-y-4">
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
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{profile.education}</div>
                            <div className="text-sm text-gray-500">SRM University</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">{profile.profession}</div>
                            <div className="text-sm text-gray-500">Working with Private Company</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">💰</div>
                          <div>
                            <div className="font-medium">Annual Income</div>
                            <div className="text-sm text-gray-500">{profile.annualIncome}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </ProfileSection>
                </AccordionContent>
              </AccordionItem>

              {/* Family Section */}
              <AccordionItem value="family">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-orange-600">
                  Family Background
                </AccordionTrigger>
                <AccordionContent>
                  <ProfileSection title="Family Details" id="family" isEditable={true}>
                    {isEditing.family ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="familyBackground">Family Background</Label>
                          <Textarea
                            id="familyBackground"
                            value={formData.familyBackground || ''}
                            onChange={(e) => setFormData({...formData, familyBackground: e.target.value})}
                            placeholder="Describe your family values, culture, traditions, and background..."
                            className="min-h-28"
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
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium">Father is a working professional</div>
                          <div className="text-sm text-gray-500">Mother is a homemaker</div>
                        </div>
                      </div>
                    )}
                  </ProfileSection>
                </AccordionContent>
              </AccordionItem>

              {/* Spiritual Section */}
              <AccordionItem value="spiritual">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-orange-600">
                  Spiritual Journey
                </AccordionTrigger>
                <AccordionContent>
                  <ProfileSection title="Spiritual Details" id="spiritual" isEditable={true}>
                    {isEditing.spiritual ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="spiritualJourney">Your Spiritual Journey</Label>
                          <Textarea
                            id="spiritualJourney"
                            value={formData.spiritualJourney || ''}
                            onChange={(e) => setFormData({...formData, spiritualJourney: e.target.value})}
                            placeholder="Share your spiritual background, inspirations, and practices..."
                            className="min-h-28"
                          />
                        </div>

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
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Spiritual Practices</div>
                          <div className="flex flex-wrap gap-2">
                            {profile.spiritualPractices?.map(practice => (
                              <Badge key={practice} variant="outline">
                                {practice}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Sacred Texts</div>
                          <div className="flex flex-wrap gap-2">
                            {profile.sacredTexts?.map(text => (
                              <Badge key={text} variant="outline">
                                {text}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </ProfileSection>
                </AccordionContent>
              </AccordionItem>

              {/* Photos Section */}
              <AccordionItem value="photos">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-orange-600">
                  Photos
                </AccordionTrigger>
                <AccordionContent>
                  <ProfileSection title="Photos" id="photos" isEditable={false}>
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="w-32 h-40 bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg overflow-hidden">
                          <img
                            src={profile.profileImage}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button size="sm" className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/90 text-gray-700 text-xs">
                          <Camera className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-lg font-medium mb-2">Upload More Photos</p>
                        <p className="text-sm text-gray-600 mb-4">Add 2-5 high-quality photos to increase profile visibility</p>
                        <Button variant="outline">
                          Choose Photos
                        </Button>
                      </div>
                    </div>
                  </ProfileSection>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;