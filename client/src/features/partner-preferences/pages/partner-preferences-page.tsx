import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Heart, MapPin, GraduationCap, Users, Sparkles, DollarSign } from 'lucide-react';

interface PartnerPreferencesPageProps {}

const PartnerPreferencesPage: React.FC<PartnerPreferencesPageProps> = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    basic: true,
    location: false,
    education: false,
    family: false,
    spiritual: false,
    lifestyle: false
  });

  const [preferences, setPreferences] = useState({
    ageRange: [25, 35],
    heightRange: [160, 180],
    education: '',
    location: '',
    religion: '',
    income: '',
    familyType: '',
    spiritualPractices: ''
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    {
      id: 'basic',
      title: 'Basic Preferences',
      icon: Heart,
      content: (
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium">Age Range</Label>
            <div className="mt-2">
              <Slider
                value={preferences.ageRange}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, ageRange: value }))}
                max={60}
                min={18}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{preferences.ageRange[0]} years</span>
                <span>{preferences.ageRange[1]} years</span>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Height Range</Label>
            <div className="mt-2">
              <Slider
                value={preferences.heightRange}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, heightRange: value }))}
                max={200}
                min={140}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{preferences.heightRange[0]} cm</span>
                <span>{preferences.heightRange[1]} cm</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'location',
      title: 'Location',
      icon: MapPin,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="location">Preferred Location</Label>
            <Select value={preferences.location} onValueChange={(value) => setPreferences(prev => ({ ...prev, location: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select preferred location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="anywhere">Anywhere in India</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    },
    {
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="education">Minimum Education</Label>
            <Select value={preferences.education} onValueChange={(value) => setPreferences(prev => ({ ...prev, education: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select minimum education" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
                <SelectItem value="post-graduate">Post Graduate</SelectItem>
                <SelectItem value="doctorate">Doctorate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    },
    {
      id: 'family',
      title: 'Family',
      icon: Users,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="family-type">Preferred Family Type</Label>
            <Select value={preferences.familyType} onValueChange={(value) => setPreferences(prev => ({ ...prev, familyType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select family type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="nuclear">Nuclear Family</SelectItem>
                <SelectItem value="joint">Joint Family</SelectItem>
                <SelectItem value="extended">Extended Family</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    },
    {
      id: 'spiritual',
      title: 'Spiritual',
      icon: Sparkles,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="religion">Religion</Label>
            <Select value={preferences.religion} onValueChange={(value) => setPreferences(prev => ({ ...prev, religion: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select religion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hindu">Hindu</SelectItem>
                <SelectItem value="sikh">Sikh</SelectItem>
                <SelectItem value="jain">Jain</SelectItem>
                <SelectItem value="buddhist">Buddhist</SelectItem>
                <SelectItem value="any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="spiritual-practices">Spiritual Practices</Label>
            <Select value={preferences.spiritualPractices} onValueChange={(value) => setPreferences(prev => ({ ...prev, spiritualPractices: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select spiritual practices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="meditation">Meditation</SelectItem>
                <SelectItem value="yoga">Yoga</SelectItem>
                <SelectItem value="devotional">Devotional Practices</SelectItem>
                <SelectItem value="vedic">Vedic Studies</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle',
      icon: DollarSign,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="income">Minimum Income</Label>
            <Select value={preferences.income} onValueChange={(value) => setPreferences(prev => ({ ...prev, income: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select minimum income" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="3-5">3-5 Lakhs</SelectItem>
                <SelectItem value="5-10">5-10 Lakhs</SelectItem>
                <SelectItem value="10-20">10-20 Lakhs</SelectItem>
                <SelectItem value="20+">20+ Lakhs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Preferences Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-center">Preference Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">📅</div>
                    <div>
                      <div className="text-gray-500 text-xs">Age Range</div>
                      <div className="font-medium">{preferences.ageRange[0]} - {preferences.ageRange[1]} years</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">📏</div>
                    <div>
                      <div className="text-gray-500 text-xs">Height Range</div>
                      <div className="font-medium">{preferences.heightRange[0]} - {preferences.heightRange[1]} cm</div>
                    </div>
                  </div>

                  {preferences.location && (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">📍</div>
                      <div>
                        <div className="text-gray-500 text-xs">Location</div>
                        <div className="font-medium capitalize">{preferences.location}</div>
                      </div>
                    </div>
                  )}

                  {preferences.education && (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">🎓</div>
                      <div>
                        <div className="text-gray-500 text-xs">Education</div>
                        <div className="font-medium capitalize">{preferences.education.replace('-', ' ')}</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preference Forms */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Partner Preferences</h1>
                <Button className="bg-orange-600 hover:bg-orange-700">Save Preferences</Button>
              </div>

              <div className="space-y-4">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  const isOpen = openSections[section.id];

                  return (
                    <Card key={section.id}>
                      <Collapsible open={isOpen} onOpenChange={() => toggleSection(section.id)}>
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                  <IconComponent className="w-5 h-5 text-orange-600" />
                                </div>
                                <CardTitle className="text-lg">{section.title}</CardTitle>
                              </div>
                              {isOpen ? (
                                <ChevronUp className="w-5 h-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                              )}
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="pt-0">
                            {section.content}
                          </CardContent>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerPreferencesPage;
export { PartnerPreferencesPage };