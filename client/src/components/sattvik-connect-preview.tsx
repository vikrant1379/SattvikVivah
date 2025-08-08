import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, HandHeart } from "lucide-react";

const SattvikConnectPreview = memo(() => {
  const features = [
    {
      icon: BookOpen,
      title: "Group Scripture Study",
      description: "Join weekly Gita study circles with like-minded souls",
      color: "text-sage"
    },
    {
      icon: Users,
      title: "Virtual Satsangs",
      description: "Participate in online spiritual gatherings and discussions",
      color: "text-lotus-pink"
    },
    {
      icon: HandHeart,
      title: "Seva Opportunities",
      description: "Connect through karma yoga and community service",
      color: "text-earth-brown"
    }
  ];

  return (
    <section className="py-16 lotus-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-crimson font-bold text-earth-brown mb-4">
            Sattvik Connect
          </h2>
          <p className="text-xl text-earth-brown/70 mb-8">
            Connect beyond profiles through shared spiritual practices
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              
              return (
                <Card key={feature.title} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <IconComponent className={`${feature.color} text-2xl mb-3 mx-auto`} />
                    <h4 className="font-crimson font-semibold text-earth-brown mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-earth-brown/70">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <Button className="bg-sage text-white hover:bg-sage/90 px-8 py-3 text-lg">
            Explore Sattvik Connect
          </Button>
        </div>
      </div>
    </section>
  );
});

SattvikConnectPreview.displayName = "SattvikConnectPreview";

export default SattvikConnectPreview;
