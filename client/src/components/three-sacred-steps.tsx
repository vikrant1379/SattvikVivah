import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle, Search, Heart } from "lucide-react";

const ThreeSacredSteps = memo(() => {
  const steps = [
    {
      number: 1,
      icon: UserCircle,
      title: "Create Sacred Profile",
      description: "Share your spiritual journey, daily practices, and dharmic aspirations. Include your connection to sacred texts and guru lineage.",
      bgColor: "bg-sage/5",
      iconColor: "text-sage",
      borderColor: "border-sage/20"
    },
    {
      number: 2,
      icon: Search,
      title: "Discover Aligned Souls",
      description: "Browse profiles of spiritually mature individuals who share your path and values. Filter by practices, lineage, and dharmic goals.",
      bgColor: "bg-lotus-pink/5",
      iconColor: "text-lotus-pink",
      borderColor: "border-lotus-pink/20"
    },
    {
      number: 3,
      icon: Heart,
      title: "Unite in Dharma",
      description: "Connect through conscious communication and family meetings. Begin your sacred Grihastha journey together.",
      bgColor: "bg-warm-beige/20",
      iconColor: "text-earth-brown",
      borderColor: "border-warm-beige/40"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="mandala-divider mb-6">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Three Sacred Steps
            </h2>
          </div>
          <p className="text-xl text-foreground/70 font-light">
            To Find Your Divine Companion
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step) => {
            const IconComponent = step.icon;

            return (
              <div key={step.number} className="text-center group">
                <div className={`w-24 h-24 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`${step.iconColor} text-3xl`} />
                </div>
                <Card className={`${step.bgColor} border ${step.borderColor} h-full`}>
                  <CardContent className="p-6">
                    <h3 className="font-crimson font-semibold text-xl text-earth-brown mb-3">
                      {step.number}. {step.title}
                    </h3>
                    <p className="text-earth-brown/70 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-saffron text-primary-foreground hover:bg-saffron/90 px-8 py-3 text-lg shadow-lg hover-elevate">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
});

ThreeSacredSteps.displayName = "ThreeSacredSteps";

export default ThreeSacredSteps;