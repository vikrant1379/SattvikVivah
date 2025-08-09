
import { memo, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  MessageCircle,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  User,
  ChevronLeft,
  MoreVertical,
  Images,
  Calendar,
  Globe,
  Phone,
  Mail,
  Users,
  Home,
  BookOpen,
  Banknote,
  Clock,
  Award
} from "lucide-react";
import { GiBigDiamondRing } from "react-icons/gi";
import { formatAnnualIncome } from "../data/annual-income";
import type { UserProfile } from "@shared/schema";

interface ProfileDetailModalProps {
  profile: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDetailModal = memo(({ profile, isOpen, onClose }: ProfileDetailModalProps) => {
  const [activeTab, setActiveTab] = useState("about");

  if (!profile) return null;

  const formatHeight = (height: string) => {
    if (!height) return 'Not specified';
    
    const feetInchesMatch = height.match(/(\d+)'(\d+)"/);
    if (feetInchesMatch) {
      const feet = feetInchesMatch[1];
      const inches = feetInchesMatch[2];
      return `${feet}' ${inches}"`;
    }
    
    return height;
  };

  const formatLastSeen = () => {
    const wasSeenToday = Math.random() > 0.3;
    if (wasSeenToday) {
      const hours = Math.floor(Math.random() * 24);
      const minutes = Math.floor(Math.random() * 60);
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      const displayMinutes = minutes.toString().padStart(2, "0");
      return `Last seen at ${displayHours}:${displayMinutes} ${period}`;
    } else {
      const lastSeenOptions = [
        "Last seen on 09-Aug-25",
        "Last seen at 12:43 AM",
        "Last seen on 07-Aug-25",
        "Online now",
        "Last seen yesterday",
      ];
      return lastSeenOptions[Math.floor(Math.random() * lastSeenOptions.length)];
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden">
        {/* Header Image Section */}
        <div className="relative h-96">
          {profile.profileImage ? (
            <div className="relative w-full h-full">
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              
              {/* Top Controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-full p-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="bg-black/60 rounded-md px-3 py-1 flex items-center text-white text-sm">
                    <Images className="w-4 h-4 mr-1" />
                    <span>3</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 rounded-full p-2"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Profile Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-sm font-medium mb-2 opacity-90">
                  {formatLastSeen()}
                </div>
                <div className="flex items-center mb-2">
                  <h1 className="text-3xl font-bold mr-3">
                    {profile.name}, {profile.age}
                  </h1>
                  {profile.verified && (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" aria-label="Verified account">
                      <g>
                        <path
                          d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                          fill="#1d9bf0"
                        />
                      </g>
                    </svg>
                  )}
                </div>
                <div className="text-sm opacity-90 mb-3">
                  ID - {profile.id.toUpperCase()}
                </div>
                <div className="text-sm opacity-75 italic">
                  Profile managed by Sibling
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-3xl font-semibold text-blue-600">
                    {profile.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-blue-800 mb-2">
                  {profile.name}, {profile.age}
                </h1>
              </div>
            </div>
          )}
        </div>

        {/* Tabs Navigation */}
        <div className="px-6 py-4 border-b">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="about" className="text-sm font-medium">About Me</TabsTrigger>
              <TabsTrigger value="family" className="text-sm font-medium">Family</TabsTrigger>
              <TabsTrigger value="looking" className="text-sm font-medium">Looking For</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="about" className="space-y-6">
              {/* Basic Info Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Height</div>
                    <div className="font-medium">{formatHeight(profile.height)}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="font-medium">{profile.location || `${profile.city}, ${profile.state}`}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Religion • Caste</div>
                    <div className="font-medium">{profile.religion} • {profile.caste} {profile.casteSubcaste}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Banknote className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Annual Income</div>
                    <div className="font-medium">{formatAnnualIncome(profile.annualIncome)}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Mother tongue</div>
                    <div className="font-medium">{profile.motherTongue}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <GiBigDiamondRing className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Marital Status</div>
                    <div className="font-medium">{profile.maritalStatus}</div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Professional Info */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-3">Professional Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Briefcase className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium">{profile.profession}</div>
                        <div className="text-sm text-gray-600">Working with an MNC in Design management</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium">{profile.education}</div>
                        <div className="text-sm text-gray-600">Completed from a reputed institution</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Spiritual Practices */}
              {profile.spiritualPractices && profile.spiritualPractices.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-3">Spiritual Practices</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.spiritualPractices.map((practice, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {practice}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Sacred Texts */}
              {profile.sacredTexts && profile.sacredTexts.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-3">Sacred Texts</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.sacredTexts.map((text, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {text}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* About/Bio */}
              {profile.bio && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-3">About</h3>
                    <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="family" className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Family Details</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Family Type</div>
                      <div className="font-medium">Joint Family</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Father's Occupation</div>
                      <div className="font-medium">Business</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Mother's Occupation</div>
                      <div className="font-medium">Homemaker</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Siblings</div>
                      <div className="font-medium">1 Sister (Married)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="looking" className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Partner Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Age Range</div>
                      <div className="font-medium">28 - 35 years</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Height Range</div>
                      <div className="font-medium">5'6" - 6'0"</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Location Preference</div>
                      <div className="font-medium">Same city or willing to relocate</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Education</div>
                      <div className="font-medium">Graduate or Post-graduate</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Spiritual Inclination</div>
                      <div className="font-medium">Should share similar spiritual values</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Action Buttons Footer */}
        <div className="px-6 py-4 bg-gray-900 rounded-b-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-3 flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Interest</span>
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full px-6 py-3 flex items-center space-x-2">
                <Heart className="w-5 h-5 fill-current" />
                <span>Super Interest</span>
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full px-6 py-3 flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Shortlist</span>
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full px-6 py-3 flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Chat</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

ProfileDetailModal.displayName = "ProfileDetailModal";

export default ProfileDetailModal;
