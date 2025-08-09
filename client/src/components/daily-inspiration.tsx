import { memo, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const LoadingSkeleton = memo(() => (
  <section className="py-12 lotus-pattern">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="bg-white p-8 rounded-2xl shadow-lg border border-sage/20">
          <CardContent className="animate-pulse">
            <div className="h-6 bg-sage/20 rounded mb-4"></div>
            <div className="h-4 bg-sage/10 rounded mb-2"></div>
            <div className="h-4 bg-sage/10 rounded mb-4"></div>
            <div className="h-3 bg-sage/10 rounded w-1/3 mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

const DailyInspiration = memo(() => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/quotes/random'],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 4, // 4 hours
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const quote = useMemo(() => (data as any)?.quote, [data]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError || !quote) {
    return (
      <section className="py-12 lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-white p-8 rounded-2xl shadow-lg border border-sage/20">
              <CardContent>
                <div className="text-muted-foreground">
                  <p className="text-lg mb-2">Daily wisdom will be available shortly</p>
                  <p className="text-sm">Please try again in a moment</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-12 lg:py-16 bg-gradient-to-r from-deep-maroon via-indigo-night to-deep-deep-maroon">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8">
            Daily Spiritual Inspiration
          </h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20">
            {isLoading ? (
              <div className="space-y-3 md:space-y-4">
                <div className="h-5 md:h-6 bg-white/20 rounded animate-pulse"></div>
                <div className="h-3 md:h-4 bg-white/20 rounded animate-pulse w-3/4 mx-auto"></div>
              </div>
            ) : quote ? (
              <div className="space-y-4 md:space-y-6">
                <blockquote className="text-lg sm:text-xl lg:text-2xl text-white font-serif italic leading-relaxed">
                  "{quote.quoteText}"
                </blockquote>
                <cite className="text-temple-gold font-medium text-sm md:text-base">
                  — {quote.author}
                </cite>
                <button
                  onClick={() => console.log("refetching quote...")} // Placeholder for actual refetch logic
                  className="mt-4 md:mt-6 bg-temple-gold hover:bg-temple-gold/90 text-deep-maroon px-4 md:px-6 py-2 rounded-full font-medium transition-colors disabled:opacity-50 text-sm md:text-base"
                >
                  New Inspiration
                </button>
              </div>
            ) : (
              <div className="text-white/70 text-sm md:text-base">No inspiration available</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

DailyInspiration.displayName = 'DailyInspiration';

export default DailyInspiration;