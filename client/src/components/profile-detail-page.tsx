import { memo, useCallback, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useSpiritualContext } from "@/contexts/spiritual-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Languages,
  User,
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find the specific profile
  const profile = useMemo(() => {
    return allProfiles.find((p) => p.id === profileId);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Profile Not Found
            </h2>
            <p className="text-gray-600 mb-2">
              The profile you're looking for doesn't exist or has been removed.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Looking for ID: {profileId}
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleBackToProfiles}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                Back to Profile Browser
              </Button>
              <Button
                onClick={handleBackToHome}
                variant="outline"
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
              >
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
    if (!height) return "Not specified";
    const feetInchesMatch = height.match(/(\d+)'(\d+)"/);
    if (feetInchesMatch) {
      const feet = feetInchesMatch[1];
      const inches = feetInchesMatch[2];
      return `${feet}' ${inches}"`;
    }
    return height;
  };

  // Mock images for gallery (in real app, this would come from profile data)
  const profileImages = [
    profile.profileImage || profile.profilePicture,
    // Add more mock images for demo
    profile.profileImage || profile.profilePicture,
    profile.profileImage || profile.profilePicture,
    profile.profileImage || profile.profilePicture,
    profile.profileImage || profile.profilePicture,
  ].filter(Boolean);

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
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Profiles
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Photo Gallery */}
          <div className="space-y-4">
            {/* Main Image with Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="aspect-[3/4] w-full bg-gradient-to-br from-orange-100 via-rose-100 to-pink-100">
                  {profileImages.length > 0 ? (
                    <Carousel className="w-full h-full">
                      <CarouselContent>
                        {profileImages.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="aspect-[3/4] w-full">
                              <img
                                src={image}
                                alt={`${profile.name} - Photo ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4" />
                      <CarouselNext className="right-4" />
                    </Carousel>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="w-24 h-24 rounded-full bg-white/80 flex items-center justify-center mb-4 mx-auto shadow-sm">
                          <span className="text-3xl font-bold text-orange-600">
                            {profile.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border">
                          <p className="text-sm text-orange-700 font-semibold">
                            📸 Photo Protected
                          </p>
                          <p className="text-xs text-orange-600 mt-1">
                            Available after connection
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Image count indicator */}
                <div className="absolute top-3 right-3 bg-black/60 rounded-md px-2 py-1 text-white text-sm">
                  {currentImageIndex + 1}/{Math.max(profileImages.length, 5)}
                </div>

                {/* Online Status */}
                <div className="absolute top-3 left-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center text-xs font-medium text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Online
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3">
                <Heart className="w-5 h-5 mr-2" />
                Express Interest
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Shortlist
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <MoreHorizontal className="w-4 h-4" />
                  More
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Profile Information */}
          <div className="space-y-6">
            {/* Profile Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.name}
                </h1>
                {profile.verified && (
                  <CheckCircle2 className="w-7 h-7 text-blue-500" />
                )}
              </div>

              {/* Basic Info */}
              <div className="space-y-3 text-lg">
                <div className="flex items-center text-gray-700">
                  <User className="w-5 h-5 mr-3 text-gray-500" />
                  <span>{profile.age} years old</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <div className="w-5 h-5 mr-3 text-gray-500 flex items-center justify-center">
                    📏
                  </div>
                  <span>{formatHeight(profile.height)}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                  <span>{profile.city}, {profile.state}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Languages className="w-5 h-5 mr-3 text-gray-500" />
                  <span>{profile.motherTongue}</span>
                </div>
              </div>

              {/* Spiritual Tags */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Spiritual Journey</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200 px-3 py-1">
                    🕉️ {profile.religion || "Hindu"}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1">
                    📿 {profile.caste}
                  </Badge>
                  {profile.spiritualPractices?.slice(0, 2).map((practice, index) => (
                    <Badge key={index} className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1">
                      🙏 {practice}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bio/About */}
              {profile.bio && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About Me</h3>
                  <p className="text-gray-700 leading-relaxed italic">"{profile.bio}"</p>
                </div>
              )}
            </div>

            {/* Education & Career Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Education & Career</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <GraduationCap className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">{profile.education}</p>
                    <p className="text-sm text-gray-600">Education</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Briefcase className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">{profile.profession}</p>
                    {profile.annualIncome && (
                      <p className="text-sm text-green-600 font-medium">
                        {formatAnnualIncome(profile.annualIncome)}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Spiritual Practices */}
            {profile.spiritualPractices && profile.spiritualPractices.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <span className="mr-2">🕉️</span>
                    Spiritual Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.spiritualPractices.map((practice, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-orange-50 border-orange-200 text-orange-800"
                      >
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
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <span className="mr-2">📖</span>
                    Sacred Texts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.sacredTexts.map((text, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-blue-50 border-blue-200 text-blue-800"
                      >
                        {text}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-gray-600">Phone number visible after connection</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-gray-600">Email visible after connection</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
});

ProfileDetailPage.displayName = "ProfileDetailPage";

export default ProfileDetailPage;