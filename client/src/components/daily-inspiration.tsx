
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
    <section className="py-12 lotus-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white p-8 rounded-2xl shadow-lg border border-sage/20 hover:shadow-xl transition-shadow duration-300">
            <CardContent>
              <div className="flex items-start justify-center mb-6">
                <Quote className="w-8 h-8 text-sage opacity-60" aria-hidden="true" />
              </div>
              <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-6 leading-relaxed">
                "{quote.quoteText}"
              </blockquote>
              {quote.author && (
                <cite className="text-sage font-medium not-italic">
                  — {quote.author}
                </cite>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
});

DailyInspiration.displayName = 'DailyInspiration';

export default DailyInspiration;
