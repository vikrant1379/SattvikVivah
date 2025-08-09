import { memo, useState } from "react";
import { useParams, useLocation } from "wouter";
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
  Award,
  AlertCircle // Import AlertCircle
} from "lucide-react";
import { GiBigDiamondRing } from "react-icons/gi";
import { formatAnnualIncome } from "../data/annual-income";
import { mockProfiles } from "../data/mock-profiles";
import type { UserProfile } from "@shared/schema";

const ProfileDetailPage = memo(() => {
  const params = useParams();
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("about");

  // Debug logging - comprehensive debugging
  console.log("=== ProfileDetailPage Debug ===");
  console.log("Raw params object:", params);
  console.log("Params keys:", Object.keys(params));
  console.log("Current location path:", location);
  console.log("Window pathname:", window.location.pathname);
  console.log("Window href:", window.location.href);

  // Extract profileId - wouter puts route parameters in the params object
  // The parameter name should match the route definition (:profileId)
  let profileId = params.profileId;

  // If wouter params doesn't work, extract manually from location
  if (!profileId) {
    // Manual extraction from location
    const pathMatch = location.match(/\/profile\/([^\/]+)/);
    if (pathMatch) {
      profileId = pathMatch[1];
      console.log("Extracted from regex match:", profileId);
    } else {
      // Simple split fallback
      const pathSegments = location.split('/');
      const profileIndex = pathSegments.indexOf('profile');
      if (profileIndex >= 0 && pathSegments[profileIndex + 1]) {
        profileId = pathSegments[profileIndex + 1];
        console.log("Extracted from path segments:", profileId);
      }
    }
  }

  console.log("Trying to find profile with ID:", profileId);
  console.log("Profile ID type:", typeof profileId);

  // Ensure profileId is a string and trim any whitespace
  const searchId = profileId ? String(profileId).trim() : "";

  const profile = mockProfiles.find(p => String(p.id) === searchId);

  console.log("Looking for profile with ID:", searchId);
  console.log("Available profile IDs:", mockProfiles.map(p => ({ id: p.id, type: typeof p.id })));
  console.log("Found profile:", profile ? profile.name : "NOT FOUND");
  console.log("Search comparison results:", mockProfiles.map(p => ({
    id: p.id,
    matches: String(p.id) === searchId,
    comparison: `"${p.id}" === "${searchId}"`
  })));

  if (!profile) {
    console.log("Profile not found, showing error page");
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

  console.log("Profile found, rendering detail page for:", profile.name);

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
    <div className="min-h-screen bg-gray-50">
      {/* Header Image Section */}
      <div className="relative h-96 w-full">
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
                onClick={() => setLocation("/browse")}
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/browse")}
              className="absolute top-4 left-4 text-blue-800 hover:bg-white/20 rounded-full p-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tabs Navigation */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
              <TabsTrigger value="about" className="text-sm font-medium">About Me</TabsTrigger>
              <TabsTrigger value="family" className="text-sm font-medium">Family</TabsTrigger>
              <TabsTrigger value="looking" className="text-sm font-medium">Looking For</TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="about" className="space-y-8">
                {/* Basic Info Grid */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl mb-6">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Height</div>
                          <div className="font-medium text-lg">{formatHeight(profile.height)}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Location</div>
                          <div className="font-medium text-lg">{profile.location || `${profile.city}, ${profile.state}`}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Religion • Caste</div>
                          <div className="font-medium text-lg">{profile.religion} • {profile.caste} {profile.casteSubcaste}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Banknote className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Annual Income</div>
                          <div className="font-medium text-lg">{formatAnnualIncome(profile.annualIncome)}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Mother tongue</div>
                          <div className="font-medium text-lg">{profile.motherTongue}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <GiBigDiamondRing className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Marital Status</div>
                          <div className="font-medium text-lg">{profile.maritalStatus}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl mb-6">Professional Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Briefcase className="w-6 h-6 text-gray-500" />
                        <div>
                          <div className="font-medium text-lg">{profile.profession}</div>
                          <div className="text-gray-600">Working with an MNC in Design management</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <GraduationCap className="w-6 h-6 text-gray-500" />
                        <div>
                          <div className="font-medium text-lg">{profile.education}</div>
                          <div className="text-gray-600">Completed from a reputed institution</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Spiritual Practices */}
                {profile.spiritualPractices && profile.spiritualPractices.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-6">Spiritual Practices</h3>
                      <div className="flex flex-wrap gap-3">
                        {profile.spiritualPractices.map((practice, index) => (
                          <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
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
                      <h3 className="font-semibold text-xl mb-6">Sacred Texts</h3>
                      <div className="flex flex-wrap gap-3">
                        {profile.sacredTexts.map((text, index) => (
                          <Badge key={index} variant="outline" className="text-sm px-4 py-2">
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
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-6">About</h3>
                      <p className="text-gray-700 leading-relaxed text-lg">{profile.bio}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="family" className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl mb-6">Family Details</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Family Type</div>
                        <div className="font-medium text-lg">Joint Family</div>
                      </div>
                      <Separator />
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Father's Occupation</div>
                        <div className="font-medium text-lg">Business</div>
                      </div>
                      <Separator />
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Mother's Occupation</div>
                        <div className="font-medium text-lg">Homemaker</div>
                      </div>
                      <Separator />
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Siblings</div>
                        <div className="font-medium text-lg">1 Sister (Married)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="looking" className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl mb-6">Partner Preferences</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Age Range</div>
                        <div className="font-medium text-lg">28 - 35 years</div>
                      </div>
                      <Separator />
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Height Range</div>
                        <div className="font-medium text-lg">5'6" - 6'0"</div>
                      </div>
                      <Separator />
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Location Preference</div>
                        <div className="font-medium text-lg">Same city or willing to relocate</div>
                      </div>
                      <Separator />
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Education</div>
                        <div className="font-medium text-lg">Graduate or Post-graduate</div>
                      </div>
                      <Separator />
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Spiritual Inclination</div>
                        <div className="font-medium text-lg">Should share similar spiritual values</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white shadow-lg rounded-lg p-6 border">
          <div className="flex items-center justify-center space-x-4 flex-wrap">
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-3 flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Send Interest</span>
            </Button>
            <Button variant="outline" className="rounded-full px-8 py-3 flex items-center space-x-2 border-red-200 text-red-600 hover:bg-red-50">
              <Heart className="w-5 h-5 fill-current" />
              <span>Super Interest</span>
            </Button>
            <Button variant="outline" className="rounded-full px-8 py-3 flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Shortlist</span>
            </Button>
            <Button variant="outline" className="rounded-full px-8 py-3 flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Chat</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

ProfileDetailPage.displayName = "ProfileDetailPage";

export default ProfileDetailPage;