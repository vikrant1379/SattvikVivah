
import { memo, useCallback, useMemo } from "react";
import { useLocation } from "wouter";
import { useSpiritualContext } from "@/contexts/spiritual-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
  Clock
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

  // Mock profile images for carousel
  const profileImages = [
    profile.profileImage || profile.profilePicture
  ].filter(Boolean);

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
      {/* Clean Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 py-3">
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
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Image and Actions */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              {/* Profile Image */}
              <div className="mb-6">
                {profileImages.length > 0 ? (
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={profileImages[0]}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/5] bg-gradient-to-br from-orange-100 via-rose-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-xl">
                    <div className="text-center p-6">
                      <div className="w-24 h-24 rounded-full bg-white/80 flex items-center justify-center mb-4 mx-auto shadow-sm">
                        <span className="text-3xl font-bold text-orange-600">
                          {profile.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                        </span>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border">
                        <p className="text-sm text-orange-700 font-semibold">📸 Photo Protected</p>
                        <p className="text-xs text-orange-600 mt-1">Visible after interest acceptance</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full h-12 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg font-semibold text-base rounded-xl">
                  <Heart className="w-5 h-5 mr-2" />
                  Express Interest
                </Button>
                <Button variant="outline" className="w-full h-12 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold text-base rounded-xl">
                  <Heart className="w-5 h-5 mr-2 fill-current" />
                  Super Interest
                </Button>
                <Button variant="outline" className="w-full h-12 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold text-base rounded-xl">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full h-12 border-2 border-amber-300 text-amber-700 hover:bg-amber-50 font-semibold text-base rounded-xl">
                  <Star className="w-5 h-5 mr-2" />
                  Add to Shortlist
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Information */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-sm border p-8">
              {/* Last Seen */}
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4 mr-2" />
                {getLastSeenTime()}
              </div>

              {/* Name and Verification */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                    {profile.name}, {profile.age}
                  </h1>
                  {profile.verified && (
                    <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" aria-label="Verified">
                      <path
                        d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                        fill="#1d9bf0"
                      />
                    </svg>
                  )}
                </div>

                {/* Location & Basic Info */}
                <div className="flex items-center gap-4 text-base text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                    <span className="font-medium">{profile.location || `${profile.city}, ${profile.state}`}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium">{formatHeight(profile.height)}</span>
                  {profile.caste && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="font-medium">{profile.caste}</span>
                    </>
                  )}
                </div>

                {/* Bio */}
                {profile.bio && (
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-6">
                    "{profile.bio}"
                  </p>
                )}

                {/* Professional Info Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 mr-3 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{profile.profession}</p>
                        {profile.annualIncome && (
                          <p className="text-sm text-green-600 font-medium">{formatAnnualIncome(profile.annualIncome)}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <div className="flex items-center">
                      <GraduationCap className="w-5 h-5 mr-3 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{profile.education}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                    <div className="flex items-center">
                      <GiBigDiamondRing className="w-5 h-5 mr-3 text-pink-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{profile.maritalStatus}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-3 text-orange-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{profile.age} years old</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-gray-600">Phone number visible after connection</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-gray-600">Email visible after connection</span>
                </div>
              </div>
            </div>

            {/* Spiritual Journey */}
            {(profile.spiritualPractices || profile.sacredTexts || profile.spiritualGoals) && (
              <div className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-2xl border p-6">
                <h2 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
                  <span className="mr-2">🕉️</span>
                  Spiritual Journey
                </h2>

                <div className="space-y-6">
                  {profile.spiritualPractices && profile.spiritualPractices.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-3 text-gray-700">Spiritual Practices</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.spiritualPractices.map((practice, index) => (
                          <Badge key={index} variant="outline" className="bg-orange-50 border-orange-200 text-sm py-1">
                            {practice}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.sacredTexts && profile.sacredTexts.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-3 text-gray-700">Sacred Texts</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.sacredTexts.map((text, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 border-blue-200 text-sm py-1">
                            {text}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.spiritualGoals && profile.spiritualGoals.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-3 text-gray-700">Spiritual Goals</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.spiritualGoals.map((goal, index) => (
                          <Badge key={index} variant="outline" className="bg-green-50 border-green-200 text-sm py-1">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Family Information */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Family Information</h2>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-gray-600">Family details available after connection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProfileDetailPage.displayName = 'ProfileDetailPage';

export default ProfileDetailPage;
