
import { memo, useCallback, useMemo } from "react";
import { useLocation } from "wouter";
import { useSpiritualContext } from "@/contexts/spiritual-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  MessageCircle,
  Star,
  Users,
  Calendar,
  Phone,
  Mail,
  AlertCircle,
  Home,
  Clock,
  UserPlus,
  Share2,
  MoreHorizontal,
  CheckCircle2
} from "lucide-react";
import { GiBigDiamondRing } from "react-icons/gi";
import { formatAnnualIncome } from "../data/annual-income";
import type { UserProfile } from "@shared/schema";

interface ProfileDetailPageProps {
  profileId: string;
}

const ProfileDetailPage = memo(({ profileId }: ProfileDetailPageProps) => {
  const [, setLocation] = useLocation();
  const { allProfiles } = useSpiritualContext();

  // Find the specific profile
  const profile = useMemo(() => {
    return allProfiles.find(p => p.id === profileId);
  }, [allProfiles, profileId]);

  const handleBackToProfiles = useCallback(() => {
    setLocation("/profiles");
  }, [setLocation]);

  const handleBackToHome = useCallback(() => {
    setLocation("/");
  }, [setLocation]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
            <div className="space-y-3">
              <Button onClick={handleBackToProfiles} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                Back to Profile Browser
              </Button>
              <Button onClick={handleBackToHome} variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
            </div>
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

  // Generate last seen time
  const getLastSeenTime = () => {
    const options = [
      "Last seen 2 hours ago",
      "Last seen yesterday", 
      "Online now",
      "Last seen 1 day ago",
      "Last seen 3 hours ago"
    ];
    return options[Math.floor(Math.random() * options.length)];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToProfiles}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Back to Profiles
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHome}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </div>
            <div className="text-sm text-gray-500 font-medium">
              ID: {profile.id.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Profile Image & Actions */}
          <div className="lg:col-span-3">
            <div className="sticky top-6 space-y-4">
              {/* Profile Image Card */}
              <Card className="overflow-hidden">
                <div className="relative">
                  {profile.profileImage || profile.profilePicture ? (
                    <div className="aspect-[3/4] w-full">
                      <img
                        src={profile.profileImage || profile.profilePicture}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] bg-gradient-to-br from-orange-100 via-rose-100 to-pink-100 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center mb-4 mx-auto shadow-sm">
                          <span className="text-2xl font-bold text-orange-600">
                            {profile.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                          </span>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 border">
                          <p className="text-sm text-orange-700 font-semibold">📸 Photo Protected</p>
                          <p className="text-xs text-orange-600 mt-1">Available after connection</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Online Status */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center text-xs font-medium text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Online
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <CardContent className="p-4 space-y-3">
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold">
                    <Heart className="w-4 h-4 mr-2" />
                    Express Interest
                  </Button>
                  <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                    <Star className="w-4 h-4 mr-2" />
                    Add to Shortlist
                  </Button>
                  <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <MoreHorizontal className="w-4 h-4" />
                      More
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-gray-700">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height</span>
                    <span className="font-medium">{formatHeight(profile.height)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age</span>
                    <span className="font-medium">{profile.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Religion</span>
                    <span className="font-medium">{profile.religion || 'Hindu'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Caste</span>
                    <span className="font-medium">{profile.caste}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium">{profile.city}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-6 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {profile.name}
                      </h1>
                      {profile.verified && (
                        <CheckCircle2 className="w-6 h-6 text-blue-500" />
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-4 mb-3">
                      <span>{profile.age} years</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {profile.city}, {profile.state}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {getLastSeenTime()}
                    </div>
                  </div>
                </div>

                {profile.bio && (
                  <div className="mb-4">
                    <p className="text-gray-700 italic">"{profile.bio}"</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center text-blue-700">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <div>
                        <p className="font-medium text-sm">{profile.profession}</p>
                        {profile.annualIncome && (
                          <p className="text-xs text-green-600">{formatAnnualIncome(profile.annualIncome)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="flex items-center text-purple-700">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <div>
                        <p className="font-medium text-sm">{profile.education}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">About {profile.name.split(' ')[0]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Marital Status:</span>
                    <span className="ml-2 font-medium">{profile.maritalStatus}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Mother Tongue:</span>
                    <span className="ml-2 font-medium">{profile.motherTongue}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Height:</span>
                    <span className="ml-2 font-medium">{formatHeight(profile.height)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Age:</span>
                    <span className="ml-2 font-medium">{profile.age} years</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education & Career */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Education & Career</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Education</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{profile.education}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Career</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{profile.profession}</p>
                    {profile.annualIncome && (
                      <p className="text-sm text-green-600 mt-1">{formatAnnualIncome(profile.annualIncome)}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Spiritual Journey */}
            {(profile.spiritualPractices || profile.sacredTexts || profile.spiritualGoals) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <span className="mr-2">🕉️</span>
                    Spiritual Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.spiritualPractices && profile.spiritualPractices.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Spiritual Practices</h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.spiritualPractices.map((practice, index) => (
                          <Badge key={index} variant="outline" className="bg-orange-50 border-orange-200">
                            {practice}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.sacredTexts && profile.sacredTexts.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Sacred Texts</h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.sacredTexts.map((text, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 border-blue-200">
                            {text}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.spiritualGoals && profile.spiritualGoals.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Spiritual Goals</h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.spiritualGoals.map((goal, index) => (
                          <Badge key={index} variant="outline" className="bg-green-50 border-green-200">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Lifestyle */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Lifestyle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  <p>Lifestyle information will be shared after connection</p>
                </div>
              </CardContent>
            </Card>

            {/* Family Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Family Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  <p>Family information will be shared after connection</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600 text-sm">Phone number visible after connection</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600 text-sm">Email visible after connection</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Similar Profiles */}
          <div className="lg:col-span-3">
            <div className="sticky top-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Similar Profiles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {allProfiles.slice(0, 3).filter(p => p.id !== profile.id).map((similarProfile) => (
                    <div key={similarProfile.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-orange-600">
                          {similarProfile.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">
                          {similarProfile.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {similarProfile.age}yrs, {similarProfile.city}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View More Profiles
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProfileDetailPage.displayName = 'ProfileDetailPage';

export default ProfileDetailPage;
