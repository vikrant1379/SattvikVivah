
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
import { ArrowLeft, Edit, Camera, MapPin, Briefcase, GraduationCap, Users, Heart } from 'lucide-react';
import type { UserProfile } from '@shared/schema';

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
  const [activeSection, setActiveSection] = useState<string>('basic');

  const ProfileSection = ({ title, children, onEdit, id }: { title: string; children: React.ReactNode; onEdit?: () => void; id: string }) => (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-900">{title}</CardTitle>
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={onEdit} className="text-blue-600 hover:text-blue-700">
              <Edit className="w-4 h-4" />
            </Button>
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
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <button 
            onClick={() => setLocation('/')}
            className="text-blue-600 hover:text-blue-700 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Hi Vikrant!</span>
          </button>
          <p className="text-gray-600 text-sm mt-1">TYZ4M8S Edit Profile</p>
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
            {/* Profile Header with Photo */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
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
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <div className="w-6 h-6 bg-black/70 rounded-full flex items-center justify-center text-white text-xs">❤️</div>
                      <div className="w-6 h-6 bg-black/70 rounded-full flex items-center justify-center text-white text-xs">⚙️</div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                      <Badge className="bg-blue-100 text-blue-800 text-xs">TYZ4M8S</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="text-gray-600">About Me • Looking For</div>
                        <div className="flex items-center space-x-1">
                          <span>{profile.age} years</span>
                          <span>•</span>
                          <span>{profile.height}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span>{profile.city}</span>
                        </div>
                        <div className="text-gray-600">{profile.maritalStatus}</div>
                        <div className="text-gray-600">Profile managed by {profile.name}s Mother</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Heart className="w-3 h-3 mr-1" />
                        See who liked me
                      </Button>
                      <Button size="sm" variant="outline" className="text-gray-600">
                        ℹ️ View my profile as others see it
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Details */}
            <ProfileSection title="Basic Details" id="basic" onEdit={() => {}}>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">📅</div>
                    <div>
                      <div className="text-gray-500 text-xs">Age</div>
                      <div className="font-medium">{profile.age} years</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">📏</div>
                    <div>
                      <div className="text-gray-500 text-xs">Height</div>
                      <div className="font-medium">{profile.height}</div>
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
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">👥</div>
                    <div>
                      <div className="text-gray-500 text-xs">Profile managed by</div>
                      <div className="font-medium">{profile.name}s Mother</div>
                    </div>
                  </div>
                </div>
              </div>
            </ProfileSection>

            {/* About Me */}
            <ProfileSection title="About Me" id="about" onEdit={() => {}}>
              <div className="text-sm text-gray-700 leading-relaxed">
                <p>I spent my childhood in holy city.</p>
                <br />
                <p>Currently I am working as senior software development engineer in a leading IT organization Accenture. I have completed my bachelors of engineering from SRM university Chennai in Information Technology in the year 2018. During my college time I was also a NCC cadet and also was involved in social service. I aspire to own a unicorn start up some day.</p>
                <br />
                <p>I believe that a successful and satisfying marriage is based on mutual understanding, respect and care. I see myself as leading a family with moral and social values and finding a life partner to share the same pursuit.</p>
                <br />
                <p>I have chosen matrimony to find my life companion.</p>
                <br />
                <p>You are most welcome to initiate contact if my profile interests you.</p>
                <br />
                <p>Thank you</p>
              </div>
            </ProfileSection>

            {/* Education */}
            <ProfileSection title="Education" id="education" onEdit={() => {}}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">{profile.education}</div>
                  <div className="text-sm text-gray-500">SRM University</div>
                  <Badge className="mt-1 bg-orange-100 text-orange-800 text-xs">Edit</Badge>
                </div>
              </div>
            </ProfileSection>

            {/* Career */}
            <ProfileSection title="Career" id="career" onEdit={() => {}}>
              <div className="space-y-3">
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
            </ProfileSection>

            {/* Family */}
            <ProfileSection title="Family" id="family" onEdit={() => {}}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">Father is a working professional</div>
                  <div className="text-sm text-gray-500">Mother is a homemaker</div>
                </div>
              </div>
            </ProfileSection>

            {/* Contact */}
            <ProfileSection title="Contact" id="contact" onEdit={() => {}}>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <div>Mobile number and Email ID will be visible to premium members only.</div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">📱</div>
                  <div>
                    <div className="font-medium">+91-********</div>
                    <Badge className="mt-1 bg-red-100 text-red-800 text-xs">Edit</Badge>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  Contact number verified by Jeevansathi
                </div>
              </div>
            </ProfileSection>

            {/* Kundli and Astro */}
            <ProfileSection title="Kundli and Astro" id="kundli" onEdit={() => {}}>
              <div className="space-y-4">
                <div className="text-sm">
                  <div className="font-medium mb-2">Time of Birth</div>
                  <div className="text-gray-600">Does Not Know</div>
                </div>
                
                <div className="text-sm">
                  <div className="font-medium mb-2">Place of Birth</div>
                  <div className="text-gray-600">Delhi, India</div>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-orange-800 mb-2">View his Kundli/Horoscope</div>
                    <div className="text-xs text-orange-600">View his Birth Chart and detailed astro info</div>
                    <div className="mt-4 bg-white rounded p-8 border-2 border-dashed border-orange-300">
                      <div className="text-xs text-gray-500">Kundli Chart Placeholder</div>
                    </div>
                  </div>
                </div>
              </div>
            </ProfileSection>

            {/* My Lifestyle & Interests */}
            <ProfileSection title="My Lifestyle & Interests" id="lifestyle" onEdit={() => {}}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Habits</div>
                    <div className="text-sm text-gray-600">{profile.eatingHabits}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Interests</div>
                    <div className="text-sm text-gray-600">Internet, Movies, Shopping</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Favourite Music</div>
                    <div className="text-sm text-gray-600">Classical, Semi Classical</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Sports/Fitness Activities</div>
                    <div className="text-sm text-gray-600">Cricket, Football, Other Sports</div>
                  </div>
                </div>
              </div>
            </ProfileSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
