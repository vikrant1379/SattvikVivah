
import React, { memo } from 'react';
import { VedicCompatibilityDashboard } from './vedic-compatibility-dashboard';
import { VirtualCeremonyServices } from './virtual-ceremony-services';
import { SpiritualLearningModules } from './spiritual-learning-modules';
import { CommunityChapters } from './community-chapters';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Sparkles, 
  Heart, 
  Users, 
  BookOpen, 
  Star, 
  Lotus, 
  Sun, 
  Moon,
  Flame,
  Crown,
  Eye,
  Zap
} from 'lucide-react';

const SpiritualDashboard = memo(() => {
  const quickActions = [
    {
      icon: Heart,
      title: "Find Soul Matches",
      description: "Discover dharmic connections",
      color: "bg-gradient-to-r from-rose-500 to-pink-500",
      action: "search-profiles"
    },
    {
      icon: Star,
      title: "Vedic Compatibility",
      description: "Check astrological harmony",
      color: "bg-gradient-to-r from-purple-500 to-indigo-500",
      action: "compatibility"
    },
    {
      icon: Users,
      title: "Join Satsang",
      description: "Connect with communities",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      action: "community"
    },
    {
      icon: BookOpen,
      title: "Spiritual Learning",
      description: "Expand your wisdom",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      action: "learning"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sandalwood/10 via-lotus-pink/5 to-white">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Dashboard Header with Enhanced Icons */}
        <div className="text-center relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <div className="flex items-center space-x-4 text-temple-gold">
              <Sparkles className="w-6 h-6 animate-pulse" />
              <Sun className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          
          <div className="pt-8">
            <h1 className="text-6xl font-crimson font-bold text-indigo-night mb-4 flex items-center justify-center gap-4">
              <Lotus className="w-12 h-12 text-saffron animate-bounce" />
              🕉️ Spiritual Journey Dashboard
              <Eye className="w-12 h-12 text-temple-gold animate-pulse" />
            </h1>
            <p className="text-xl text-indigo-night/70 max-w-4xl mx-auto mb-8">
              Your sacred path to finding dharmic life partners through Vedic wisdom and spiritual alignment
            </p>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-16">
              {quickActions.map((action, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-temple-gold/20">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <action.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                    <Button size="sm" className="bg-saffron hover:bg-saffron/90 text-white">
                      <Zap className="w-4 h-4 mr-2" />
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Section Dividers */}
        <div className="flex items-center justify-center space-x-4 py-8">
          <Flame className="w-6 h-6 text-saffron animate-pulse" />
          <div className="h-px bg-gradient-to-r from-transparent via-temple-gold to-transparent flex-1"></div>
          <Crown className="w-8 h-8 text-temple-gold" />
          <div className="h-px bg-gradient-to-r from-transparent via-temple-gold to-transparent flex-1"></div>
          <Flame className="w-6 h-6 text-saffron animate-pulse" />
        </div>

        {/* Vedic Compatibility Dashboard */}
        <section className="relative">
          <div className="absolute -top-4 left-4">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              <Star className="w-4 h-4 mr-1" />
              Vedic Wisdom
            </Badge>
          </div>
          <VedicCompatibilityDashboard />
        </section>

        {/* Virtual Ceremony Services */}
        <section className="relative">
          <div className="absolute -top-4 left-4">
            <Badge className="bg-rose-100 text-rose-800 border-rose-200">
              <Heart className="w-4 h-4 mr-1" />
              Sacred Ceremonies
            </Badge>
          </div>
          <VirtualCeremonyServices />
        </section>

        {/* Spiritual Learning Modules */}
        <section className="relative">
          <div className="absolute -top-4 left-4">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <BookOpen className="w-4 h-4 mr-1" />
              Wisdom Path
            </Badge>
          </div>
          <SpiritualLearningModules />
        </section>

        {/* Community Chapters */}
        <section className="relative">
          <div className="absolute -top-4 left-4">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              <Users className="w-4 h-4 mr-1" />
              Satsang Community
            </Badge>
          </div>
          <CommunityChapters />
        </section>

        {/* Bottom Blessing */}
        <div className="text-center py-12">
          <div className="flex items-center justify-center space-x-4 text-temple-gold mb-4">
            <Moon className="w-6 h-6 animate-pulse" />
            <Lotus className="w-8 h-8" />
            <Sun className="w-6 h-6 animate-pulse" />
          </div>
          <p className="text-lg font-devanagari text-indigo-night/70">
            सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः
          </p>
          <p className="text-sm text-indigo-night/60 mt-2">
            "May all beings be happy, may all beings be healthy"
          </p>
        </div>
      </div>
    </div>
  );
});

SpiritualDashboard.displayName = 'SpiritualDashboard';

export { SpiritualDashboard };
