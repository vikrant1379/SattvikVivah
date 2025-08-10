
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
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToProfiles}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              <span>Back to Profiles</span>
            </Button>
            <div className="hidden sm:block h-6 border-l border-gray-300"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToHome}
              className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
          </div>
          <div className="text-sm text-gray-600 font-medium bg-gray-50 px-3 py-1 rounded-lg">
            ID: {profile.id.toUpperCase()}
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
              <div className="space-y-3">
                <Button className="w-full h-11 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-md hover:shadow-lg transition-all duration-300 font-semibold text-sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Express Interest
                </Button>
                <Button variant="outline" className="w-full h-11 border border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 shadow-sm hover:shadow-md transition-all duration-300 font-semibold text-sm">
                  <Heart className="w-4 h-4 mr-2 fill-current" />
                  Super Interest
                </Button>
                <Button variant="outline" className="w-full h-11 border border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-300 font-semibold text-sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full h-11 border border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-300 font-semibold text-sm">
                  <Star className="w-4 h-4 mr-2" />
                  Add to Shortlist
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="shadow-lg border border-gray-100 bg-gradient-to-br from-white via-gray-50/30 to-white">
              <CardHeader className="pb-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                          {profile.name}, {profile.age}
                        </CardTitle>
                        {profile.verified && (
                          <div className="flex-shrink-0 mt-1">
                            <svg
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              aria-label="Verified account"
                            >
                              <path
                                d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                                fill="#1DA1F2"
                              />
                              <path
                                d="M9 12l2 2 4-4"
                                stroke="white"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-700 bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm rounded-xl px-5 py-4 border border-gray-200 shadow-sm">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                        <span className="font-semibold text-sm">{profile.location || `${profile.city}, ${profile.state}`}</span>
                      </div>
                      <span className="hidden sm:inline text-gray-400 font-bold">•</span>
                      <span className="font-semibold text-sm">{formatHeight(profile.height)}</span>
                      {profile.caste && (
                        <>
                          <span className="hidden sm:inline text-gray-400 font-bold">•</span>
                          <span className="font-semibold text-sm">{profile.caste}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {profile.bio && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border-l-4 border-blue-400">
                    <p className="text-gray-700 italic text-sm leading-relaxed">"{profile.bio}"</p>
                  </div>
                )}
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex items-center p-4 bg-white/80 rounded-lg border border-gray-100 shadow-sm">
                    <Briefcase className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-tight truncate">{profile.profession}</p>
                      {profile.annualIncome && (
                        <p className="text-xs text-green-600 font-medium mt-1">{formatAnnualIncome(profile.annualIncome)}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white/80 rounded-lg border border-gray-100 shadow-sm">
                    <GraduationCap className="w-5 h-5 mr-3 text-purple-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-tight truncate">{profile.education}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white/80 rounded-lg border border-gray-100 shadow-sm">
                    <GiBigDiamondRing className="w-5 h-5 mr-3 text-pink-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-tight">{profile.maritalStatus}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white/80 rounded-lg border border-gray-100 shadow-sm">
                    <Calendar className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-tight">{profile.age} years old</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-500" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <Phone className="w-5 h-5 mr-3 text-blue-500" />
                    <span className="text-gray-700 text-sm font-medium">Phone number visible after connection</span>
                  </div>
                  <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                    <Mail className="w-5 h-5 mr-3 text-green-500" />
                    <span className="text-gray-700 text-sm font-medium">Email visible after connection</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Spiritual Information */}
            {(profile.spiritualPractices || profile.sacredTexts || profile.spiritualGoals) && (
              <Card className="shadow-lg border border-orange-200 bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-orange-800 flex items-center">
                    <span className="mr-3 text-xl">🕉️</span>
                    Spiritual Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.spiritualPractices && profile.spiritualPractices.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 text-sm text-gray-700">Spiritual Practices</h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.spiritualPractices.map((practice, index) => (
                          <Badge key={index} variant="outline" className="bg-orange-50 border-orange-200 text-xs">
                            {practice}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.sacredTexts && profile.sacredTexts.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 text-sm text-gray-700">Sacred Texts</h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.sacredTexts.map((text, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 border-blue-200 text-xs">
                            {text}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.spiritualGoals && profile.spiritualGoals.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 text-sm text-gray-700">Spiritual Goals</h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.spiritualGoals.map((goal, index) => (
                          <Badge key={index} variant="outline" className="bg-green-50 border-green-200 text-xs">
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
            <Card className="shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-500" />
                  Family Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-100">
                  <Users className="w-5 h-5 mr-3 text-purple-500" />
                  <span className="text-gray-700 text-sm font-medium">Family details available after connection</span>
                </div>
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
