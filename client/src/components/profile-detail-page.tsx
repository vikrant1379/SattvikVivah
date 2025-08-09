
import { memo, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Heart,
  MessageCircle,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  User,
  ChevronLeft,
  Globe,
  BookOpen,
  Banknote,
  Home,
  Users,
  Calendar,
  Award,
  AlertCircle,
  Verified,
  Shield,
  Camera
} from "lucide-react";
import { GiBigDiamondRing } from "react-icons/gi";
import { formatAnnualIncome } from "../data/annual-income";
import { mockProfiles } from "../data/mock-profiles";
import type { UserProfile } from "@shared/schema";

const ProfileDetailPage = memo(() => {
  const params = useParams();
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("about");

  // Extract profileId
  let profileId = params.profileId;
  if (!profileId) {
    const pathMatch = location.match(/\/profile\/([^\/]+)/);
    if (pathMatch) {
      profileId = pathMatch[1];
    } else {
      const pathSegments = location.split('/');
      const profileIndex = pathSegments.indexOf('profile');
      if (profileIndex >= 0 && pathSegments[profileIndex + 1]) {
        profileId = pathSegments[profileIndex + 1];
      }
    }
  }

  const searchId = profileId ? String(profileId).trim() : "";
  const profile = mockProfiles.find(p => String(p.id) === searchId);

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-2">
              The profile you're looking for doesn't exist or has been removed.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Looking for ID: {profileId}
            </p>
            <Button onClick={() => setLocation("/browse")} className="w-full">
              Browse Profiles
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  // Mock multiple images for carousel
  const profileImages = profile.profileImage 
    ? [profile.profileImage, profile.profileImage, profile.profileImage] 
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/browse")}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Browse</span>
          </Button>
          <div className="text-sm text-gray-600">
            Profile ID: {profile.id.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Image & Basic Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {/* Image Carousel */}
                <div className="relative mb-6">
                  {profileImages.length > 0 ? (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {profileImages.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                              <img
                                src={image}
                                alt={`${profile.name} - Photo ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-3 right-3 bg-black/60 rounded-md px-2 py-1 flex items-center text-white text-sm">
                                <Camera className="w-4 h-4 mr-1" />
                                <span>{index + 1}/{profileImages.length}</span>
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {profileImages.length > 1 && (
                        <>
                          <CarouselPrevious className="left-2" />
                          <CarouselNext className="right-2" />
                        </>
                      )}
                    </Carousel>
                  ) : (
                    <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                          <span className="text-2xl font-semibold text-blue-600">
                            {profile.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-blue-600 font-medium">Photo visible on acceptance</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Name and Verification */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <h1 className="text-2xl font-bold text-gray-900 mr-2">
                      {profile.name}, {profile.age}
                    </h1>
                    {profile.verified && (
                      <div className="flex items-center space-x-1">
                        <Verified className="w-5 h-5 text-blue-500" />
                        <Shield className="w-4 h-4 text-green-500" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{formatLastSeen()}</p>
                  
                  {/* Status Badges */}
                  <div className="flex justify-center space-x-2 mb-4">
                    {profile.verified && (
                      <Badge className="bg-red-500 text-white">Premium</Badge>
                    )}
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      ✓ Verified
                    </Badge>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{profile.location || `${profile.city}, ${profile.state}`}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{formatHeight(profile.height)}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{profile.religion} • {profile.caste}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{profile.motherTongue}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    Send Interest
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4 mr-1 fill-current" />
                      Super
                    </Button>
                    <Button variant="outline" size="sm">
                      <Star className="w-4 h-4 mr-1" />
                      Shortlist
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white mb-6">
                <TabsTrigger value="about">About Me</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                {/* Professional Details */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-gray-600" />
                      Professional Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Profession</div>
                        <div className="font-medium">{profile.profession}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Annual Income</div>
                        <div className="font-medium">{formatAnnualIncome(profile.annualIncome)}</div>
                      </div>
                      <div className="md:col-span-2">
                        <div className="text-sm text-gray-500 mb-1">Education</div>
                        <div className="font-medium">{profile.education}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Details */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-gray-600" />
                      Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Marital Status</div>
                        <div className="font-medium flex items-center">
                          <GiBigDiamondRing className="w-4 h-4 mr-2 text-gray-500" />
                          {profile.maritalStatus}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Mother Tongue</div>
                        <div className="font-medium">{profile.motherTongue}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Religion</div>
                        <div className="font-medium">{profile.religion}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Caste</div>
                        <div className="font-medium">{profile.caste} {profile.casteSubcaste}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Spiritual Practices */}
                {profile.spiritualPractices && profile.spiritualPractices.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Spiritual Practices</h3>
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
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Sacred Texts</h3>
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

                {/* About Section */}
                {profile.bio && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">About Me</h3>
                      <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="family" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-gray-600" />
                      Family Details
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Family Type</div>
                          <div className="font-medium">Joint Family</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Family Status</div>
                          <div className="font-medium">Middle Class</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Father's Occupation</div>
                          <div className="font-medium">Business</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Mother's Occupation</div>
                          <div className="font-medium">Homemaker</div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Siblings</div>
                        <div className="font-medium">1 Sister (Married)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-gray-600" />
                      Partner Preferences
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Age Range</div>
                        <div className="font-medium">28 - 35 years</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Height Range</div>
                        <div className="font-medium">5'6" - 6'0"</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Education</div>
                        <div className="font-medium">Graduate or Post-graduate</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Location</div>
                        <div className="font-medium">Same city or willing to relocate</div>
                      </div>
                      <div className="md:col-span-2">
                        <div className="text-sm text-gray-500 mb-1">Spiritual Inclination</div>
                        <div className="font-medium">Should share similar spiritual values and practices</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
});

ProfileDetailPage.displayName = "ProfileDetailPage";

export default ProfileDetailPage;
