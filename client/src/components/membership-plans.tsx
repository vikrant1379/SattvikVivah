import { memo } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const MembershipPlans = memo(() => {
  const [, setLocation] = useLocation();

  const handlePlanSelect = (planName: string) => {
    // Navigate to payment page
    setLocation('/payment');
  };

  const plans = [
    {
      name: "Seeker",
      price: "Free",
      description: "For spiritual exploration",
      features: [
        "Browse spiritual profiles",
        "Send interests (5/month)",
        "Daily inspiration quotes",
        "Basic profile creation"
      ],
      buttonText: "Start Free Journey",
      buttonVariant: "outline" as const,
      bgColor: "bg-sage/5",
      borderColor: "border-sage/20"
    },
    {
      name: "Sadhaka",
      price: "₹999",
      period: "/month",
      description: "For serious seekers",
      isPopular: true,
      features: [
        "Unlimited profile browsing",
        "Unlimited interests & chat",
        "Advanced spiritual filters",
        "View contact details",
        "Sattvik Connect access"
      ],
      buttonText: "Begin Sadhana",
      buttonVariant: "default" as const,
      bgColor: "bg-lotus-pink/5",
      borderColor: "border-lotus-pink/30"
    },
    {
      name: "Guru Guidance",
      price: "₹1,999",
      period: "/month",
      description: "With personal assistance",
      features: [
        "Everything in Sadhaka",
        "Personal relationship manager",
        "Handpicked profile suggestions",
        "Family meeting coordination",
        "Spiritual compatibility reports"
      ],
      buttonText: "Get Guidance",
      buttonVariant: "secondary" as const,
      bgColor: "bg-earth-brown/5",
      borderColor: "border-earth-brown/20"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-crimson font-bold text-earth-brown mb-4">
            Choose Your Path
          </h2>
          <p className="text-xl text-earth-brown/70">
            Affordable spiritual matchmaking for every seeker
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`${plan.bgColor} border-2 ${plan.borderColor} relative ${plan.isPopular ? 'scale-105' : ''}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-lotus-pink text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="font-crimson font-semibold text-xl text-earth-brown mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-earth-brown">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-lg font-normal text-earth-brown/70">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-earth-brown/70">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="text-sage mr-3 w-4 h-4" />
                      <span className="text-earth-brown/80 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant}
                  onClick={() => handlePlanSelect(plan.name)}
                  className={`w-full ${
                    plan.buttonVariant === 'default' 
                      ? 'bg-lotus-pink text-white hover:bg-lotus-pink/90'
                      : plan.buttonVariant === 'secondary'
                      ? 'bg-earth-brown text-white hover:bg-earth-brown/90'
                      : 'border-sage text-sage hover:bg-sage/10'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

MembershipPlans.displayName = "MembershipPlans";

export default MembershipPlans;
