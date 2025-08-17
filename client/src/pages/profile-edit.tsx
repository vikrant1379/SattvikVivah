import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, User, Heart, GraduationCap, Users, Sparkles, Camera } from 'lucide-react';

interface ProfileEditPageProps {}

const ProfileEditPage: React.FC<ProfileEditPageProps> = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    basic: true,
    about: false,
    education: false,
    family: false,
    spiritual: false,
    photos: false
  });

  const [profile, setProfile] = useState({
    name: 'Arjun Sharma',
    age: 28,
    location: 'Mumbai, Maharashtra',
    occupation: 'Software Engineer',
    education: 'B.Tech Computer Science',
    height: '5\'8"',
    weight: '70 kg',
    createdAt: new Date().toISOString(),
    birthTime: '12:00',
    birthPlace: 'Mumbai'
  });

  const [birthDetails, setBirthDetails] = useState({
    date: profile.createdAt ? new Date(profile.createdAt).toISOString().split('T')[0] : '',
    time: profile.birthTime || '12:00',
    birthPlace: profile.birthPlace || ''
  });

  const handleEdit = (section: string) => {
    console.log(`Editing section: ${section}`);
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    {
      id: 'basic',
      title: 'Basic',
      icon: User,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={profile.name} onChange={() => {}} />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" value={profile.age} onChange={() => {}} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="height">Height</Label>
              <Input id="height" value={profile.height} onChange={() => {}} />
            </div>
            <div>
              <Label htmlFor="weight">Weight</Label>
              <Input id="weight" value={profile.weight} onChange={() => {}} />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={profile.location} onChange={() => {}} />
          </div>
        </div>
      )
    },
    {
      id: 'about',
      title: 'About',
      icon: Heart,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="occupation">Occupation</Label>
            <Input id="occupation" value={profile.occupation} onChange={() => {}} />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us about yourself..." rows={4} />
          </div>
          <div>
            <Label htmlFor="interests">Interests & Hobbies</Label>
            <Textarea id="interests" placeholder="Your interests and hobbies..." rows={3} />
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
            <Label htmlFor="education">Highest Education</Label>
            <Input id="education" value={profile.education} onChange={() => {}} />
          </div>
          <div>
            <Label htmlFor="institution">Institution</Label>
            <Input id="institution" placeholder="University/College name" />
          </div>
          <div>
            <Label htmlFor="field">Field of Study</Label>
            <Input id="field" placeholder="Your field of study" />
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
            <Label htmlFor="family-type">Family Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select family type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nuclear">Nuclear Family</SelectItem>
                <SelectItem value="joint">Joint Family</SelectItem>
                <SelectItem value="extended">Extended Family</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="family-values">Family Values</Label>
            <Textarea id="family-values" placeholder="Describe your family values..." rows={3} />
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
            <Label htmlFor="spiritual-practices">Spiritual Practices</Label>
            <Textarea id="spiritual-practices" placeholder="Your spiritual practices..." rows={3} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="birth-date">Birth Date</Label>
              <Input 
                id="birth-date" 
                type="date" 
                value={birthDetails.date}
                onChange={(e) => setBirthDetails(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="birth-time">Birth Time</Label>
              <Input 
                id="birth-time" 
                type="time" 
                value={birthDetails.time}
                onChange={(e) => setBirthDetails(prev => ({ ...prev, time: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="birth-place">Birth Place</Label>
              <Input 
                id="birth-place" 
                value={birthDetails.birthPlace}
                onChange={(e) => setBirthDetails(prev => ({ ...prev, birthPlace: e.target.value }))}
                placeholder="City, State"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'photos',
      title: 'Photos',
      icon: Camera,
      content: (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Camera className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Upload your photos</p>
            <Button variant="outline" className="mt-4">Choose Files</Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-center">Profile Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-12 h-12 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-lg">{profile.name}</h3>
                  <p className="text-gray-600">{profile.occupation}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">📅</div>
                    <div>
                      <div className="text-gray-500 text-xs">Age</div>
                      <div className="font-medium">{profile.age}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">📍</div>
                    <div>
                      <div className="text-gray-500 text-xs">Location</div>
                      <div className="font-medium">{profile.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">📏</div>
                    <div>
                      <div className="text-gray-500 text-xs">Height</div>
                      <div className="font-medium">{profile.height}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">🎓</div>
                    <div>
                      <div className="text-gray-500 text-xs">Education</div>
                      <div className="font-medium">{profile.education}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Edit Forms */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
                <Button className="bg-orange-600 hover:bg-orange-700">Save Changes</Button>
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

export default ProfileEditPage;