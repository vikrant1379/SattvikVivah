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
  Camera,
  Image as ImageIcon,
} from "lucide-react";
import { GiBigDiamondRing } from "react-icons/gi";
import { formatAnnualIncome } from "../data/annual-income";
import type { UserProfile } from "@shared/schema";
import { Header } from "./header";

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
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Profile Not Found
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              The profile you're looking for doesn't exist or has been removed.
            </p>
            <p className="text-xs text-gray-500 mb-6">
              Looking for ID: {profileId}
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleBackToProfiles}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm"
              >
                Back to Profile Browser
              </Button>
              <Button
                onClick={handleBackToHome}
                variant="outline"
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 text-sm"
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
    profile.profileImage || profile.profilePicture,
    profile.profileImage || profile.profilePicture,
    profile.profileImage || profile.profilePicture,
    profile.profileImage || profile.profilePicture,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left Side - Compact Photo Gallery */}
          <div className="lg:col-span-2 space-y-3">
            {/* Main Image with Gallery */}
            <Card className="overflow-hidden shadow-lg border-orange-200">
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
                      <CarouselPrevious className="left-2 w-7 h-7" />
                      <CarouselNext className="right-2 w-7 h-7" />
                    </Carousel>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center mb-3 mx-auto shadow-sm">
                          <span className="text-lg font-bold text-orange-600">
                            {profile.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 border">
                          <p className="text-xs text-orange-700 font-semibold">
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
                <div className="absolute top-2 right-2 bg-black/70 rounded-md px-2 py-1 text-white text-xs flex items-center">
                  <ImageIcon className="w-3 h-3 mr-1" />
                  {currentImageIndex + 1}/{Math.max(profileImages.length, 5)}
                </div>

                {/* Online Status */}
                <div className="absolute top-2 left-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center text-xs font-medium text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Online
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 text-sm">
                <Heart className="w-4 h-4 mr-2" />
                Express Interest
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50 text-xs"
                >
                  <Star className="w-3 h-3 mr-1" />
                  Shortlist
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 text-xs"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Message
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Manuscript-style Profile Information */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-orange-200 bg-gradient-to-br from-amber-25 to-orange-25">
              <CardContent className="p-6">
                {/* Manuscript Header */}
                <div className="text-center mb-6 border-b border-orange-200 pb-4">
                  <div className="text-xs text-orange-700 font-serif mb-1">॥ श्री गणेशाय नमः ॥</div>
                  <h1 className="text-xl font-serif font-bold text-orange-900 mb-1">Profile Description</h1>
                  <div className="text-xs text-orange-600 italic font-serif">Sacred Union Registry</div>
                </div>

                {/* Profile Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-lg font-serif font-bold text-gray-900">{profile.name}</h2>
                    {profile.verified && (
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    )}
                  </div>

                  {/* Basic Info in compact rows */}
                  <div className="space-y-1 text-sm font-serif">
                    <div className="flex items-center text-gray-700">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{profile.age} years old</span>
                    </div>

                    <div className="flex items-center text-gray-700">
                      <div className="w-4 h-4 mr-2 text-gray-500 flex items-center justify-center text-xs">
                        📏
                      </div>
                      <span>{formatHeight(profile.height)}</span>
                    </div>

                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{profile.city}, {profile.state}</span>
                    </div>

                    <div className="flex items-center text-gray-700">
                      <Languages className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{profile.motherTongue}</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-4 border-orange-200" />

                {/* Spiritual Journey */}
                <div className="mb-4">
                  <h3 className="text-sm font-serif font-semibold text-gray-900 mb-2 flex items-center">
                    <span className="mr-2">🕉️</span>
                    Spiritual Journey
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200 px-2 py-1 text-xs font-serif">
                      🕉️ {profile.religion || "Hindu"}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-2 py-1 text-xs font-serif">
                      📿 {profile.caste}
                    </Badge>
                    {profile.spiritualPractices?.slice(0, 2).map((practice, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-800 border-purple-200 px-2 py-1 text-xs font-serif">
                        🙏 {practice}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-4 border-orange-200" />

                {/* About Me */}
                {profile.bio && (
                  <div className="mb-4">
                    <h3 className="text-sm font-serif font-semibold text-gray-900 mb-2">About Me</h3>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-sm text-gray-700 leading-relaxed italic font-serif">"{profile.bio}"</p>
                    </div>
                  </div>
                )}

                <Separator className="my-4 border-orange-200" />

                {/* Education & Career in compact format */}
                <div className="mb-4">
                  <h3 className="text-sm font-serif font-semibold text-gray-900 mb-2">Education & Career</h3>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <GraduationCap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 font-serif">{profile.education}</p>
                        <p className="text-xs text-gray-600 font-serif">Education</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Briefcase className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 font-serif">{profile.profession}</p>
                        {profile.annualIncome && (
                          <p className="text-xs text-green-600 font-medium font-serif">
                            {formatAnnualIncome(profile.annualIncome)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spiritual Practices */}
                {profile.spiritualPractices && profile.spiritualPractices.length > 0 && (
                  <>
                    <Separator className="my-4 border-orange-200" />
                    <div className="mb-4">
                      <h3 className="text-sm font-serif font-semibold text-gray-900 mb-2">Spiritual Practices</h3>
                      <div className="flex flex-wrap gap-1">
                        {profile.spiritualPractices.map((practice, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-orange-50 border-orange-200 text-orange-800 text-xs font-serif"
                          >
                            {practice}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Sacred Texts */}
                {profile.sacredTexts && profile.sacredTexts.length > 0 && (
                  <>
                    <Separator className="my-4 border-orange-200" />
                    <div className="mb-4">
                      <h3 className="text-sm font-serif font-semibold text-gray-900 mb-2">Sacred Texts</h3>
                      <div className="flex flex-wrap gap-1">
                        {profile.sacredTexts.map((text, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-blue-50 border-blue-200 text-blue-800 text-xs font-serif"
                          >
                            📖 {text}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Contact Information */}
                <Separator className="my-4 border-orange-200" />
                <div>
                  <h3 className="text-sm font-serif font-semibold text-gray-900 mb-2">Contact Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center p-2 bg-gray-50 rounded border text-xs">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600 font-serif">Phone number visible after connection</span>
                    </div>
                    <div className="flex items-center p-2 bg-gray-50 rounded border text-xs">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600 font-serif">Email visible after connection</span>
                    </div>
                  </div>
                </div>

                {/* Manuscript footer */}
                <div className="text-center mt-6 pt-4 border-t border-orange-200">
                  <div className="text-xs text-orange-700 font-serif italic">
                    "May this union be blessed with divine grace and eternal happiness"
                  </div>
                  <div className="text-xs text-orange-600 font-serif mt-1">॥ शुभम् भवतु ॥</div>
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