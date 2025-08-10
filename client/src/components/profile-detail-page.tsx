
import { memo, useCallback, useMemo } from "react";
import { useLocation } from "wouter";
import { useSpiritualContext } from "@/contexts/spiritual-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  ChevronLeft,
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
  ArrowLeft
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
                ← Back to Profile Browser
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToProfiles}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <span>← Back to Profiles</span>
            </Button>
            <div className="h-6 border-l border-gray-300"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            Profile ID: {profile.id.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 lg:px-6">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Profile Image Carousel */}
              <div className="mb-6">
                {profileImages.length > 0 ? (
                  <Carousel className="w-full">
                    <CarouselContent>
                      {profileImages.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg border border-gray-100">
                            <img
                              src={image}
                              alt={`${profile.name} - Image ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {profileImages.length > 1 && (
                      <>
                        <CarouselPrevious className="left-2 bg-white/90 hover:bg-white shadow-md" />
                        <CarouselNext className="right-2 bg-white/90 hover:bg-white shadow-md" />
                      </>
                    )}
                  </Carousel>
                ) : (
                  <div className="aspect-[3/4] bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50 rounded-xl flex items-center justify-center shadow-lg border border-gray-100">
                    <div className="text-center p-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center mb-4 mx-auto shadow-sm">
                        <span className="text-3xl font-bold text-orange-600">
                          {profile.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                        </span>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-orange-100">
                        <p className="text-sm text-orange-700 font-semibold">📸 Photo Protected</p>
                        <p className="text-xs text-orange-600 mt-1">Visible after interest acceptance</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button className="w-full h-12 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base">
                  <Heart className="w-5 h-5 mr-2" />
                  💕 Express Interest
                </Button>
                <Button variant="outline" className="w-full h-12 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 shadow-md hover:shadow-lg transition-all duration-300 font-semibold">
                  <Heart className="w-5 h-5 mr-2 fill-current" />
                  ⭐ Super Interest
                </Button>
                <Button variant="outline" className="w-full h-12 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 shadow-md hover:shadow-lg transition-all duration-300 font-semibold">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  💬 Send Message
                </Button>
                <Button variant="outline" className="w-full h-12 border-2 border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 shadow-md hover:shadow-lg transition-all duration-300 font-semibold">
                  <Star className="w-5 h-5 mr-2" />
                  🌟 Add to Shortlist
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <CardTitle className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {profile.name}, {profile.age}
                      </CardTitle>
                      {profile.verified && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 text-sm font-semibold shadow-md">
                          ✓ Verified Profile
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-100">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-orange-500" />
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
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {profile.bio && (
                  <p className="text-gray-700 italic mb-4">"{profile.bio}"</p>
                )}
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center p-3 bg-white/80 rounded-lg border border-gray-100">
                    <Briefcase className="w-6 h-6 mr-3 text-blue-500" />
                    <div>
                      <p className="font-semibold text-gray-900">{profile.profession}</p>
                      {profile.annualIncome && (
                        <p className="text-sm text-green-600 font-medium">{formatAnnualIncome(profile.annualIncome)}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white/80 rounded-lg border border-gray-100">
                    <GraduationCap className="w-6 h-6 mr-3 text-purple-500" />
                    <div>
                      <p className="font-semibold text-gray-900">{profile.education}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white/80 rounded-lg border border-gray-100">
                    <GiBigDiamondRing className="w-6 h-6 mr-3 text-pink-500" />
                    <div>
                      <p className="font-semibold text-gray-900">{profile.maritalStatus}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white/80 rounded-lg border border-gray-100">
                    <Calendar className="w-6 h-6 mr-3 text-orange-500" />
                    <div>
                      <p className="font-semibold text-gray-900">{profile.age} years old</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-gray-400" />
                    <span className="text-gray-600">Phone number visible after connection</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-gray-400" />
                    <span className="text-gray-600">Email visible after connection</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Spiritual Information */}
            {(profile.spiritualPractices || profile.sacredTexts || profile.spiritualGoals) && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-rose-50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-orange-800 flex items-center">
                    <span className="mr-2">🕉️</span>
                    Spiritual Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.spiritualPractices && profile.spiritualPractices.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Spiritual Practices</h4>
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
                      <h4 className="font-semibold mb-2">Sacred Texts</h4>
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
                      <h4 className="font-semibold mb-2">Spiritual Goals</h4>
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

            {/* Family Information */}
            <Card>
              <CardHeader>
                <CardTitle>Family Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Family details available after connection</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
});

ProfileDetailPage.displayName = 'ProfileDetailPage';

export default ProfileDetailPage;
