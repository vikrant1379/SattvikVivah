
import { memo, useRef, useEffect, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ThreeSacredSteps from "@/components/three-sacred-steps";
import SattvikConnectPreview from "@/components/sattvik-connect-preview";
import SuccessStoriesCarousel from "@/components/success-stories-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LoginOptions from "@/components/login-options";
import SignupOptions from "@/components/signup-options";
import { Heart, Search, Users, Star, Shield, CheckCircle, Award, Lock, Crown, Phone } from "lucide-react";

const Home = memo(() => {
  const homeRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      if (process.env.NODE_ENV === 'development') {
        console.log("Home component initialized and cached");
      }
    }
  }, []);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleFindMatches = () => {
    // Check if user is authenticated (replace with actual auth check)
    const isAuthenticated = false; // This should come from auth context
    
    if (isAuthenticated) {
      setLocation('/profiles');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const trustIndicators = [
    {
      icon: Shield,
      title: "100% Verified Profiles",
      description: "Every profile is manually verified with documents",
      color: "text-green-600"
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description: "Your data is secure with advanced encryption",
      color: "text-blue-600"
    },
    {
      icon: Award,
      title: "Trusted Since 2000",
      description: "25+ years of successful matchmaking",
      color: "text-orange-600"
    },
    {
      icon: Crown,
      title: "Premium Service",
      description: "Personalized assistance from relationship experts",
      color: "text-purple-600"
    }
  ];

  const divineMarriages = [
    {
      names: "राम-सीता विवाह",
      englishNames: "Ram-Sita Vivah",
      description: "Ideal of Dharmic Partnership",
      shloka: "धर्मे च अर्थे च कामे च मोक्षे च भरतर्षभ",
      meaning: "In dharma, prosperity, desires, and liberation",
      gradient: "from-orange-100 to-rose-100",
      icon: "🌺"
    },
    {
      names: "शिव-पार्वती विवाह",
      englishNames: "Shiva-Parvati Vivah",
      description: "Union of Consciousness & Energy",
      shloka: "शिवशक्त्यैक्यरूपं तु ब्रह्म तत्परमार्थतः",
      meaning: "The unity of Shiva and Shakti is ultimate reality",
      gradient: "from-blue-100 to-purple-100",
      icon: "🕉️"
    },
    {
      names: "कृष्ण-रुक्मिणी विवाह",
      englishNames: "Krishna-Rukmini Vivah",
      description: "Love Beyond All Boundaries",
      shloka: "प्रेम भक्ति च युक्तानां जीवनं परमं फलम्",
      meaning: "Life united in love and devotion bears highest fruit",
      gradient: "from-yellow-100 to-orange-100",
      icon: "🪶"
    }
  ];

  return (
    <div ref={homeRef} className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50/30 via-white to-rose-50/30">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Sanskrit Blessing */}
        <section className="relative py-20 overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 via-transparent to-rose-600/5"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative">
            {/* Sanskrit Blessing */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-200/50 shadow-lg mb-4">
                <div className="text-orange-600">🕉️</div>
                <span className="text-lg font-bold text-orange-800 font-serif">
                  ॐ सह नाववतु सह नौ भुनक्तु
                </span>
              </div>
              <p className="text-sm text-gray-600 italic mb-8">
                "May we be protected together, may we be nourished together"
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="text-center lg:text-left">
                  <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    Find Your{" "}
                    <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                      Dharmic Partner
                    </span>
                  </h1>
                  <p className="text-xl text-gray-700 mb-4 leading-relaxed">
                    Sacred journey towards Grihastha Ashram through 
                    spiritually aligned companionship
                  </p>
                  
                  {/* Sanskrit Shloka about Marriage */}
                  <Card className="bg-gradient-to-r from-orange-50 to-rose-50 border-orange-200/50 mb-6">
                    <CardContent className="p-6 text-center">
                      <div className="text-lg font-bold text-orange-800 mb-2 font-serif">
                        विवाहे द्वयोः आत्मनोः एकत्वं भवति
                      </div>
                      <p className="text-sm text-gray-600 italic">
                        "In marriage, two souls become one"
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 gap-4">
                  {trustIndicators.map((indicator, index) => {
                    const IconComponent = indicator.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200/50">
                        <IconComponent className={`w-6 h-6 ${indicator.color}`} />
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">{indicator.title}</div>
                          <div className="text-xs text-gray-600">{indicator.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleFindMatches}
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Find Your Life Partner
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400 px-8 py-4 text-lg font-semibold transition-all duration-300"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Speak to Expert
                  </Button>
                </div>
              </div>

              {/* Right - Divine Marriage Cards */}
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Divine Marriages</h3>
                  <p className="text-gray-600">Inspiration from sacred unions</p>
                </div>

                <div className="space-y-4">
                  {divineMarriages.map((marriage, index) => (
                    <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-orange-200/50">
                      <div className={`bg-gradient-to-r ${marriage.gradient} p-6`}>
                        <div className="flex items-start space-x-4">
                          <div className="text-3xl">{marriage.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-lg mb-1">{marriage.names}</h4>
                            <p className="text-sm text-gray-600 mb-2">{marriage.englishNames}</p>
                            <p className="text-xs text-gray-700 font-medium mb-3">{marriage.description}</p>
                            
                            <div className="bg-white/80 p-3 rounded-lg">
                              <div className="text-sm font-bold text-orange-800 mb-1 font-serif">
                                {marriage.shloka}
                              </div>
                              <div className="text-xs text-gray-600 italic">
                                {marriage.meaning}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        

        {/* Trust & Security Section */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-rose-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose SattvikVivah?</h2>
              <div className="text-lg font-bold text-orange-800 mb-2 font-serif">
                सत्यं शिवं सुन्दरम्
              </div>
              <p className="text-gray-600 italic">Truth, Auspiciousness, Beauty</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">10L+</div>
                <div className="text-gray-700 font-medium">Verified Profiles</div>
                <div className="text-sm text-gray-500">100% Document Verified</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-rose-600" />
                </div>
                <div className="text-3xl font-bold text-rose-600 mb-2">5L+</div>
                <div className="text-gray-700 font-medium">Success Stories</div>
                <div className="text-sm text-gray-500">Happy Marriages</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
                <div className="text-gray-700 font-medium">Years of Trust</div>
                <div className="text-sm text-gray-500">Since 2000</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-gray-700 font-medium">Privacy Protected</div>
                <div className="text-sm text-gray-500">Bank-level Security</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <Badge variant="outline" className="bg-white/80 border-green-200 text-green-700 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                ID Verified
              </Badge>
              <Badge variant="outline" className="bg-white/80 border-blue-200 text-blue-700 px-4 py-2">
                <Lock className="w-4 h-4 mr-2" />
                SSL Secured
              </Badge>
              <Badge variant="outline" className="bg-white/80 border-purple-200 text-purple-700 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                ISO Certified
              </Badge>
            </div>
          </div>
        </section>

        {/* Marriage Blessing Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Card className="bg-gradient-to-br from-orange-50 to-rose-50 border-orange-200/50 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-4xl mb-6">🙏</div>
                  <div className="text-2xl font-bold text-orange-800 mb-4 font-serif leading-relaxed">
                    धन्यो गृहस्थाश्रमो यत्र धर्मः कामः च मोक्षश्च<br />
                    सम्मिलिता भवन्ति सुखेन
                  </div>
                  <p className="text-gray-600 italic text-lg mb-6">
                    "Blessed is the householder's life where dharma, desire, and liberation<br />
                    unite harmoniously in happiness"
                  </p>
                  <div className="flex justify-center">
                    <Button 
                      onClick={handleFindMatches}
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-8 py-4 text-lg font-semibold"
                    >
                      Begin Your Sacred Journey
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Other Sections */}
        <ThreeSacredSteps />
        <SattvikConnectPreview />
        <SuccessStoriesCarousel />
      </main>
      
      <Footer />

      {/* Login Modal */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-orange-800">
              Begin Your Sacred Journey
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <LoginOptions />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-semibold text-saffron"
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setIsSignupModalOpen(true);
                  }}
                >
                  Create one now
                </Button>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Signup Modal */}
      <Dialog open={isSignupModalOpen} onOpenChange={setIsSignupModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-orange-800">
              Create Your Sacred Profile
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <SignupOptions />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-semibold text-saffron"
                  onClick={() => {
                    setIsSignupModalOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                >
                  Sign in here
                </Button>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
