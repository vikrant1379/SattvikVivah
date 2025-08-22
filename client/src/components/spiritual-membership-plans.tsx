
import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';

interface MembershipPlan {
  name: string;
  sanskritName: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  icon: React.ComponentType<any>;
  color: string;
  popular?: boolean;
  premium?: boolean;
}

const SpiritualMembershipPlans = memo(() => {
  const plans: MembershipPlan[] = [
    {
      name: "Seeker",
      sanskritName: "Mumukṣu",
      price: "Free",
      duration: "Forever",
      description: "Begin your sacred journey",
      icon: Star,
      color: "border-temple-gold/30",
      features: [
        "Basic profile creation",
        "Limited profile views (10/month)",
        "Community satsang access",
        "Daily spiritual inspiration"
      ]
    },
    {
      name: "Practitioner",
      sanskritName: "Sādhaka",
      price: "₹999",
      duration: "/month",
      description: "Deepen your spiritual connection",
      icon: Check,
      color: "border-saffron/50",
      popular: true,
      features: [
        "Unlimited profile browsing",
        "Advanced spiritual filters",
        "Monthly expert consultation",
        "Kundli matching service",
        "Priority customer support",
        "Spiritual practice tracking"
      ]
    },
    {
      name: "Guardian",
      sanskritName: "Rakṣaka",
      price: "₹2,499",
      duration: "/month",
      description: "Complete spiritual guidance",
      icon: Crown,
      color: "border-deep-maroon/50",
      premium: true,
      features: [
        "Everything in Practitioner",
        "Dedicated relationship advisor",
        "Family tradition integration",
        "Personalized matchmaking",
        "Pre-marital counseling sessions",
        "Vedic ceremony planning",
        "Lifetime spiritual mentorship"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-sandalwood/20 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-crimson font-bold text-indigo-night mb-4">
            Sacred Membership Plans
          </h2>
          <p className="text-xl text-indigo-night/70 max-w-3xl mx-auto">
            Choose the path that aligns with your spiritual journey towards finding your dharmic partner
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            
            return (
              <Card key={plan.name} className={`relative ${plan.color} ${plan.popular ? 'ring-2 ring-saffron shadow-xl scale-105' : ''} hover:shadow-lg transition-all duration-300`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-saffron text-white">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <IconComponent className={`h-8 w-8 ${plan.premium ? 'text-deep-maroon' : plan.popular ? 'text-saffron' : 'text-temple-gold'}`} />
                  </div>
                  <CardTitle className="text-2xl font-crimson font-bold text-indigo-night">
                    {plan.name}
                  </CardTitle>
                  <p className="text-sm text-temple-gold font-devanagari">
                    {plan.sanskritName}
                  </p>
                  <p className="text-indigo-night/70 text-sm mt-2">
                    {plan.description}
                  </p>
                  <div className="flex items-center justify-center mt-4">
                    <span className="text-3xl font-bold text-indigo-night">
                      {plan.price}
                    </span>
                    {plan.duration !== "Forever" && (
                      <span className="text-indigo-night/60 ml-1">
                        {plan.duration}
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-4">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-temple-gold mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-indigo-night/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${plan.premium ? 'bg-deep-maroon hover:bg-deep-maroon/90' : plan.popular ? 'bg-saffron hover:bg-saffron/90' : 'bg-temple-gold hover:bg-temple-gold/90'} text-white`}
                  >
                    {plan.price === "Free" ? "Start Sacred Journey" : "Choose This Path"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-indigo-night/60 text-sm mb-4">
            All plans include our commitment to dharmic values and spiritual growth
          </p>
          <Badge className="bg-sandalwood/50 text-indigo-night border-temple-gold/30 px-4 py-2">
            🕉️ Guided by ancient wisdom • Powered by modern technology
          </Badge>
        </div>
      </div>
    </section>
  );
});

SpiritualMembershipPlans.displayName = 'SpiritualMembershipPlans';

export { SpiritualMembershipPlans };
