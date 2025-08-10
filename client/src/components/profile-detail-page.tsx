
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
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-lg transition-all duration-200"
            >
              <span>Back to Profiles</span>
            </Button>
            <div className="hidden sm:block h-6 border-l border-gray-300"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToHome}
              className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 font-medium">
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
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent break-words">
                          {profile.name}, {profile.age}
                        </CardTitle>
                        {profile.verified && (
                          <svg
                            className="w-6 h-6 flex-shrink-0"
                            viewBox="0 0 24 24"
                            aria-label="Verified account"
                          >
                            <g>
                              <path
                                d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                                fill="#1d9bf0"
                              />
                            </g>
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-gray-600 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-100">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                        <span className="font-medium text-sm sm:text-base">{profile.location || `${profile.city}, ${profile.state}`}</span>
                      </div>
                      <span className="hidden sm:inline text-gray-400">•</span>
                      <span className="font-medium text-sm sm:text-base">{formatHeight(profile.height)}</span>
                      {profile.caste && (
                        <>
                          <span className="hidden sm:inline text-gray-400">•</span>
                          <span className="font-medium text-sm sm:text-base">{profile.caste}</span>
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
                
                <div className="grid sm:grid-cols-2 gap-4">
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
            <Card className="shadow-sm border border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-gray-600 text-sm">Phone number visible after connection</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-gray-600 text-sm">Email visible after connection</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Spiritual Information */}
            {(profile.spiritualPractices || profile.sacredTexts || profile.spiritualGoals) && (
              <Card className="shadow-sm border-0 bg-gradient-to-br from-orange-50 to-rose-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-orange-800 flex items-center">
                    <span className="mr-2">🕉️</span>
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
            <Card className="shadow-sm border border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">Family Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Users className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600 text-sm">Family details available after connection</span>
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
