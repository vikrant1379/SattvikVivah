import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const DailyInspiration = memo(() => {
  const { data, isLoading } = useQuery({
    queryKey: ['/api/quotes/random'],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) {
    return (
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
    );
  }

  const quote = (data as any)?.quote;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-card p-10 rounded-2xl shadow-xl border border-temple-gold/30 hover-elevate">
            <CardContent>
              <div className="mandala-divider mb-6">
                <div className="flex items-center justify-center space-x-4">
                  <Quote className="text-temple-gold text-2xl" />
                  <h3 className="font-serif font-semibold text-xl text-foreground">
                    Daily Spiritual Inspiration
                  </h3>
                  <Quote className="text-temple-gold text-2xl" />
                </div>
              </div>
              
              {quote ? (
                <>
                  <blockquote className="text-2xl font-light text-foreground/90 mb-6 leading-relaxed">
                    <span className="font-devanagari text-saffron block mb-3">{quote.quoteText}</span>
                    {quote.translation && (
                      <span className="text-lg text-foreground/80 italic font-serif">
                        "{quote.translation}"
                      </span>
                    )}
                  </blockquote>
                  <p className="text-sm text-temple-gold font-medium">
                    — {quote.source}
                    {quote.chapter && quote.verse && ` ${quote.chapter}.${quote.verse}`}
                  </p>
                </>
              ) : (
                <div className="text-muted-foreground">
                  <p className="text-lg mb-2">Loading daily inspiration...</p>
                  <p className="text-sm">Connecting with sacred wisdom</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
});

DailyInspiration.displayName = "DailyInspiration";

export default DailyInspiration;
