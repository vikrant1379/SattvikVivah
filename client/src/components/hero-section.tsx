import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Shield, Star } from "lucide-react";

const HeroSection = memo(() => {
  return (
    <section className="py-8 bg-gradient-to-br from-sage/5 via-lotus/5 to-saffron/5">
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sage/20 rounded-full px-4 py-2 mb-4">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Find your spiritual life partner</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Welcome to Your Sacred Journey
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover meaningful connections based on shared spiritual values and dharmic principles
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border-sage/10 hover:shadow-md transition-all">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-sage/10 rounded-full mx-auto mb-2">
                <Users className="h-5 w-5 text-sage" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-lotus/10 hover:shadow-md transition-all">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-lotus/10 rounded-full mx-auto mb-2">
                <Heart className="h-5 w-5 text-lotus" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2.5K+</div>
              <div className="text-sm text-gray-600">Success Stories</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-saffron/10 hover:shadow-md transition-all">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-saffron/10 rounded-full mx-auto mb-2">
                <Shield className="h-5 w-5 text-saffron" />
              </div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Verified Profiles</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-earth/10 hover:shadow-md transition-all">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-earth/10 rounded-full mx-auto mb-2">
                <Star className="h-5 w-5 text-earth" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.8/5</div>
              <div className="text-sm text-gray-600">User Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Ready to begin your journey?
              </h3>
              <p className="text-sm text-gray-600">
                Create your profile and start connecting with like-minded souls
              </p>
            </div>
            <Button className="bg-gradient-to-r from-sage to-saffron hover:from-sage/90 hover:to-saffron/90 text-white px-6">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;