
import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Star, Heart, Brain, Target } from 'lucide-react';

interface CompatibilityScore {
  category: string;
  score: number;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const VedicCompatibilityDashboard = memo(() => {
  const compatibilityScores: CompatibilityScore[] = [
    {
      category: "Spiritual Resonance",
      score: 85,
      description: "Meditation & practice alignment",
      icon: Star,
      color: "text-saffron"
    },
    {
      category: "Vedic Compatibility",
      score: 78,
      description: "Ashtakoot Gun Milan score",
      icon: Heart,
      color: "text-deep-maroon"
    },
    {
      category: "Psychological Match",
      score: 92,
      description: "Mental temperament harmony",
      icon: Brain,
      color: "text-temple-gold"
    },
    {
      category: "Life Vision",
      score: 88,
      description: "Shared goals & aspirations",
      icon: Target,
      color: "text-indigo-night"
    }
  ];

  const overallCompatibility = Math.round(
    compatibilityScores.reduce((acc, score) => acc + score.score, 0) / compatibilityScores.length
  );

  return (
    <Card className="bg-gradient-to-br from-sandalwood/20 to-white border-temple-gold/30">
      <CardHeader>
        <CardTitle className="text-xl font-crimson text-indigo-night flex items-center">
          🕉️ Vedic Compatibility Dashboard
        </CardTitle>
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-saffron">{overallCompatibility}%</div>
          <Badge className="bg-saffron/20 text-saffron border-saffron/30">
            Highly Compatible
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {compatibilityScores.map((score) => {
          const IconComponent = score.icon;
          return (
            <div key={score.category} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <IconComponent className={`w-5 h-5 ${score.color}`} />
                  <div>
                    <h4 className="font-semibold text-indigo-night">{score.category}</h4>
                    <p className="text-sm text-gray-600">{score.description}</p>
                  </div>
                </div>
                <span className="font-bold text-lg text-indigo-night">{score.score}%</span>
              </div>
              <Progress value={score.score} className="h-2" />
            </div>
          );
        })}
        
        <div className="pt-4 border-t border-temple-gold/20">
          <Button className="w-full bg-saffron hover:bg-saffron/90 text-white">
            Get Detailed Compatibility Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

VedicCompatibilityDashboard.displayName = 'VedicCompatibilityDashboard';

export { VedicCompatibilityDashboard };
