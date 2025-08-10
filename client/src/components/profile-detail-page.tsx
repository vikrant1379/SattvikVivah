
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
              <Button onClick={handleBackToProfiles} className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile Browser
              </Button>
              <Button onClick={handleBackToHome} variant="outline" className="w-full">
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
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600"
            >
              <ChevronLeft className="w-4 h-4" />
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Profiles</span>
            </Button>
            <div className="h-6 border-l border-gray-300"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
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
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
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
                          <div className="aspect-[3/4] rounded-lg overflow-hidden">
                            <img
                              src={image}
                              alt={`${profile.name} - Image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
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

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                  <Heart className="w-4 h-4 mr-2" />
                  Express Interest
                </Button>
                <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                  <Heart className="w-4 h-4 mr-2 fill-current" />
                  Super Interest
                </Button>
                <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-50">
                  <Star className="w-4 h-4 mr-2" />
                  Add to Shortlist
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                      {profile.name}, {profile.age}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{profile.location || `${profile.city}, ${profile.state}`}</span>
                      </div>
                      <span>•</span>
                      <span>{formatHeight(profile.height)}</span>
                      {profile.caste && (
                        <>
                          <span>•</span>
                          <span>{profile.caste}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {profile.verified && (
                    <Badge className="bg-green-100 text-green-800">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {profile.bio && (
                  <p className="text-gray-700 italic mb-4">"{profile.bio}"</p>
                )}
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                      <p className="font-medium">{profile.profession}</p>
                      {profile.annualIncome && (
                        <p className="text-sm text-gray-500">{formatAnnualIncome(profile.annualIncome)}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <GraduationCap className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                      <p className="font-medium">{profile.education}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <GiBigDiamondRing className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                      <p className="font-medium">{profile.maritalStatus}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                      <p className="font-medium">Born {profile.age} years ago</p>
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
              <Card>
                <CardHeader>
                  <CardTitle>Spiritual Journey</CardTitle>
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
