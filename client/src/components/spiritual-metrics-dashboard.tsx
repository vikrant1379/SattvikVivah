
import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, BookOpen, Star } from 'lucide-react';

interface SpiritualMetric {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  description: string;
  color: string;
}

const SpiritualMetricsDashboard = memo(() => {
  const metrics: SpiritualMetric[] = [
    {
      icon: Heart,
      title: "Sacred Connections",
      value: "2,847",
      description: "Dharmic matches this month",
      color: "text-saffron"
    },
    {
      icon: Users,
      title: "Spiritual Communities",
      value: "156",
      description: "Active satsang groups",
      color: "text-temple-gold"
    },
    {
      icon: BookOpen,
      title: "Guided Consultations",
      value: "1,234",
      description: "Expert spiritual guidance sessions",
      color: "text-sage"
    },
    {
      icon: Star,
      title: "Blessed Unions",
      value: "89%",
      description: "Success rate with expert guidance",
      color: "text-lotus-pink"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-sandalwood/30 to-card-cream/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-crimson font-bold text-indigo-night mb-2">
            Sacred Journey Metrics
          </h2>
          <p className="text-lg text-indigo-night/70">
            Witnessing divine connections unfold
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {metrics.map((metric) => {
            const IconComponent = metric.icon;
            
            return (
              <Card key={metric.title} className="bg-white/80 backdrop-blur-sm border-temple-gold/20 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-indigo-night/80">
                    {metric.title}
                  </CardTitle>
                  <IconComponent className={`h-5 w-5 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-indigo-night mb-1">
                    {metric.value}
                  </div>
                  <p className="text-xs text-indigo-night/60">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-8">
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 px-4 py-2">
            🕉️ Blessed by divine grace • Updated every sacred moment
          </Badge>
        </div>
      </div>
    </section>
  );
});

SpiritualMetricsDashboard.displayName = 'SpiritualMetricsDashboard';

export { SpiritualMetricsDashboard };
