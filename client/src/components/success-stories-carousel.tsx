import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { successStories } from "@/data/success-stories";

const SuccessStoriesCarousel = memo(() => {
  return (
    <section className="py-16 spiritual-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-crimson font-bold text-earth-brown mb-4">
            Sacred Unions
          </h2>
          <p className="text-xl text-earth-brown/70">
            Dharmic couples who found their spiritual match
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story) => (
            <Card key={story.id} className="bg-white border border-sage/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={story.photoUrl} 
                    alt={`${story.groomName} & ${story.brideName}`}
                    className="w-16 h-16 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h4 className="font-crimson font-semibold text-earth-brown">
                      {story.groomName} & {story.brideName}
                    </h4>
                    <p className="text-sm text-sage">
                      Married: {story.marriageDate}
                    </p>
                  </div>
                </div>
                
                <p className="text-earth-brown/80 text-sm leading-relaxed mb-4 line-clamp-4">
                  {story.testimonial}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-sage font-medium">
                    {story.spiritualConnection}
                  </span>
                  <div className="flex text-sage">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button className="bg-sage text-white hover:bg-sage/90 px-8 py-3">
            View All Success Stories
          </Button>
        </div>
      </div>
    </section>
  );
});

SuccessStoriesCarousel.displayName = "SuccessStoriesCarousel";

export default SuccessStoriesCarousel;
