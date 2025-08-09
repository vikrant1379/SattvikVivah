
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { successStories } from "@/data/success-stories";

const SuccessStoriesCarousel = memo(() => {
  return (
    <section className="py-12 md:py-16 lg:py-20 spiritual-gradient">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-crimson font-bold text-earth-brown mb-4 md:mb-6">
            Sacred Unions
          </h2>
          <p className="text-base md:text-lg text-earth-brown/70 px-4">
            Dharmic couples who found their spiritual match
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {successStories.map((story) => (
            <Card key={story.id} className="bg-card-cream/30 border-temple-gold/20 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="flex">
                    <img
                      src={story.photoUrl}
                      alt={`${story.groomName} & ${story.brideName}`}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover mr-4 border-2 border-temple-gold"
                    />
                  </div>
                  <div>
                    <h3 className="font-crimson font-semibold text-earth-brown text-sm md:text-base">
                      {story.groomName} & {story.brideName}
                    </h3>
                    <p className="text-xs md:text-sm text-sage">
                      Married: {story.marriageDate}
                    </p>
                  </div>
                </div>

                <p className="text-earth-brown/80 text-sm md:text-base leading-relaxed mb-3 md:mb-4 line-clamp-4">
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
