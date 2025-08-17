
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
import { Heart, Save, ArrowLeft, Edit } from 'lucide-react';
import { AgeRangeSelector } from '../components/age-range-selector';
import { HeightRangeSelector } from '../components/height-range-selector';
import { LocationPreferenceSelector } from '../components/location-preference-selector';

interface PartnerPreferences {
  ageRange: [number, number];
  heightRange: [string, string];
  country: string;
  cityState: string;
  maritalStatus: string[];
  education: string[];
  occupation: string[];
  annualIncome: string;
  religion: string;
  caste: string;
  motherTongue: string[];
  manglikStatus: string;
  dietaryHabits: string[];
  specialCases: string;
  profilePostedBy: string;
  familyBasedOutOf: string;
  collegeAttended: string;
  aboutPartner: string;
}

export const PartnerPreferencesPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [preferences, setPreferences] = useState<PartnerPreferences>({
    ageRange: [24, 29],
    heightRange: ["4' 6\" (137 cms)", "5' 6\" (168 cms)"],
    country: 'India',
    cityState: "Doesn't Matter",
    maritalStatus: ['Never Married'],
    education: ['B.Arch', 'B.Des', 'B.E/B.Tech', 'B.FAD', 'B.FTech', 'B.Pharma'],
    occupation: ['Education Professional', 'Educational Institution Owner', 'Librarian', 'Teacher', 'Professor/Lecturer', 'Research Assistant'],
    annualIncome: 'Rs. 0 - and above, $0 - and above',
    religion: 'Hindu',
    caste: "Doesn't Matter",
    motherTongue: ['Hindi-Dehi', 'Hindi-MP/CG'],
    manglikStatus: "Doesn't Matter",
    dietaryHabits: ['Vegetarian', 'Jain'],
    specialCases: 'None',
    profilePostedBy: "Doesn't Matter",
    familyBasedOutOf: "Doesn't Matter",
    collegeAttended: "Doesn't Matter",
    aboutPartner: "I want a down-to-earth, simple, and spiritually minded life guided by Vedic principles. An someone who finds joy in philosophy and regularity through study of the Bhagavad Gita and other sacred texts. Looking for a genuine connection with someone who values spiritual growth and shared dharmic responsibilities together like me, and I think I may be charming a partner who can engage in and share the way of being considered loving science and mutual help. I value authenticity, kindness, humility, and spirituality."
  });

  const handleSave = () => {
    console.log('Saving preferences:', preferences);
    alert('Partner preferences saved successfully!');
  };

  const PreferenceSection = ({ title, children, onEdit }: { title: string; children: React.ReactNode; onEdit?: () => void }) => (
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
                <span>Set strict filters</span>
              </button>
              <p className="text-blue-100 text-sm">
                By turning on strict filters, you will only see matches that exactly meet your specified criteria.
              </p>
              <p className="text-blue-200 text-xs italic mt-1">
                This might reduce your matches
              </p>
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

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Partner's Basic Details */}
        <PreferenceSection title="Partner's Basic Details">
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
                <div className="flex items-center mt-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">{preferences.ageRange[0]} years - {preferences.ageRange[1]} years</span>
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
                <div className="flex items-center mt-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">{preferences.heightRange[0]} - {preferences.heightRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Partner's Country</Label>
                <div className="flex items-center mt-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">{preferences.country}</span>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Partner's City/State</Label>
                <div className="flex items-center mt-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">{preferences.cityState}</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Partner's Marital Status</Label>
              <div className="flex items-center mt-2">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">{preferences.maritalStatus.join(', ')}</span>
              </div>
            </div>
          </div>
        </PreferenceSection>

        {/* Partner's Education and Occupation */}
        <PreferenceSection title="Partner's Education and Occupation">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Partner's Education</Label>
              <div className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {preferences.education.slice(0, 6).map((edu, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
                      {edu}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-600">
                    + 13 more
                  </Badge>
                </div>
                <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">Save</Button>
                <div className="mt-2 text-xs text-gray-600">
                  <div>Education Professional, Educational Institution Owner,</div>
                  <div>Librarian, Teacher, Professor/Lecturer, Research Assistant</div>
                  <div className="text-blue-600">+ 11 more</div>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Partner's Income</Label>
              <div className="mt-2">
                <span className="text-sm text-gray-600">{preferences.annualIncome}</span>
              </div>
            </div>
          </div>
        </PreferenceSection>

        {/* Partner's Religion and Ethnicity */}
        <PreferenceSection title="Partner's Religion and Ethnicity">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Partner's Religion</Label>
                <div className="flex items-center mt-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">{preferences.religion}</span>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Partner's Caste</Label>
                <div className="flex items-center mt-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">{preferences.caste}</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Partner's Mother Tongue</Label>
              <div className="flex items-center mt-2">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">{preferences.motherTongue.join(', ')} + 1 more</span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Partner's Manglik Status</Label>
              <div className="flex items-center mt-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">{preferences.manglikStatus}</span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Partner's Dietary Habits</Label>
              <div className="mt-2">
                <span className="text-sm text-gray-600">{preferences.dietaryHabits.join(', ')}</span>
              </div>
            </div>
          </div>
        </PreferenceSection>

        {/* Partner's Family */}
        <PreferenceSection title="Partner's Family">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Special Cases</Label>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">{preferences.specialCases}</span>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Partner's Profile posted by</Label>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">{preferences.profilePostedBy}</span>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Partner's Family based out of</Label>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">{preferences.familyBasedOutOf}</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Partner's College</Label>
              <div className="mt-2">
                <span className="text-sm text-gray-600">{preferences.collegeAttended}</span>
              </div>
            </div>
          </div>
        </PreferenceSection>

        {/* About My Partner */}
        <PreferenceSection title="About My Partner">
          <div>
            <Textarea
              value={preferences.aboutPartner}
              onChange={(e) => setPreferences({...preferences, aboutPartner: e.target.value})}
              className="min-h-32 resize-none"
              placeholder="Describe your ideal partner..."
            />
          </div>
        </PreferenceSection>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button onClick={handleSave} className="bg-red-500 hover:bg-red-600 text-white px-8 py-2">
            Save
          </Button>
        </div>

        {/* Bottom Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">Want filters affect your matches</p>
              <p className="text-xs text-blue-700">Age, Physical Stats, Location, Edu, Relig, Mother Tongue, Income</p>
            </div>
            <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
