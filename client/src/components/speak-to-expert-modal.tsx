
import { useState, memo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, 
  Lock, 
  CheckCircle,
  Clock,
  Phone,
  ArrowLeft,
  Star,
  Sparkles
} from "lucide-react";
import { ConsultationTierSelector } from "@/features/expert-consultation/components/consultation-tier-selector";
import { ExpertCategorySelector } from "@/features/expert-consultation/components/expert-category-selector";
import { SpiritualAssessment } from "@/features/expert-consultation/components/spiritual-assessment";
import { ConsultationForm } from "@/features/expert-consultation/components/consultation-form";
import { WHATSAPP_MESSAGES } from "@/features/expert-consultation/constants/expert-consultation.constants";
import type { IConsultationForm } from "@/features/expert-consultation/types/expert-consultation.types";

interface SpeakToExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalStep = 'login-prompt' | 'tier-selection' | 'category-selection' | 'assessment' | 'consultation-form' | 'success';

const SpeakToExpertModal: React.FC<SpeakToExpertModalProps> = memo(({ isOpen, onClose }) => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState<ModalStep>('login-prompt');
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [assessment, setAssessment] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset modal state when opened
  const handleModalOpen = (open: boolean) => {
    if (open && isAuthenticated) {
      setCurrentStep('tier-selection');
    } else if (open && !isAuthenticated) {
      setCurrentStep('login-prompt');
    }
    if (!open) {
      // Reset state when closing
      setCurrentStep('login-prompt');
      setSelectedTier('');
      setSelectedCategory('');
      setAssessment({});
    }
  };

  const handleWhatsAppClick = () => {
    const message = isAuthenticated && user?.name
      ? WHATSAPP_MESSAGES.authenticated(user.name)
      : WHATSAPP_MESSAGES.general;

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "🙏 WhatsApp Seva Started",
      description: "You'll be connected with our divine guidance counselor shortly.",
    });
    onClose();
  };

  const handleConsultationSubmit = async (data: IConsultationForm) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      const consultationData = {
        ...data,
        tier: selectedTier,
        category: selectedCategory,
        assessment,
        userId: user?.id,
        timestamp: new Date().toISOString()
      };

      console.log('Sacred consultation submitted:', consultationData);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "🪷 Divine Guidance Requested",
        description: "Our spiritual counselor will connect with your soul within the promised timeframe.",
      });

      setCurrentStep('success');
    } catch (error) {
      toast({
        title: "Sacred Journey Interrupted",
        description: "The divine path seems blocked. Please try seeking guidance again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepNavigation = (step: ModalStep) => {
    setCurrentStep(step);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'login-prompt':
        return '🪷 Seek Guidance for Your Sacred Journey';
      case 'tier-selection':
        return '🕉️ Choose Your Divine Path';
      case 'category-selection':
        return '🧘‍♀️ Select Your Guidance Focus';
      case 'assessment':
        return '🌺 Sacred Self-Discovery';
      case 'consultation-form':
        return '📝 Share Your Sacred Query';
      case 'success':
        return '✨ Your Sacred Journey Continues!';
      default:
        return '🙏 Expert Consultation';
    }
  };

  const canNavigateNext = () => {
    switch (currentStep) {
      case 'tier-selection':
        return !!selectedTier;
      case 'category-selection':
        return !!selectedCategory;
      case 'assessment':
        return Object.keys(assessment).length > 0;
      default:
        return true;
    }
  };

  // Non-authenticated user view
  if (!isAuthenticated && currentStep === 'login-prompt') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-orange-800 flex items-center justify-center space-x-2 font-serif">
              <div className="text-2xl">🪷</div>
              <span>{getStepTitle()}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Sanskrit Blessing */}
            <div className="text-center">
              <div className="text-lg font-bold text-orange-800 mb-2 font-serif">
                गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः
              </div>
              <p className="text-sm text-gray-600 italic">
                "The guru is Brahma, Vishnu, and Shiva - divine guidance awaits"
              </p>
            </div>

            {/* Premium Login Section */}
            <Card className="bg-gradient-to-r from-orange-50 to-rose-50 border-orange-200/50 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-200">
                  <Lock className="w-8 h-8 text-orange-600" />
                </div>

                <h3 className="text-xl font-semibold text-orange-800 mb-3 font-serif">
                  Login for Personalized Divine Consultation
                </h3>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  To provide you with tailored dharmic advice based on your spiritual profile and sacred aspirations, 
                  please login to begin your guided journey
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Personalized Dharmic Wisdom</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Spiritual Profile Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Sacred Priority Support</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Divine Follow-up Guidance</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold py-3 text-lg transition-all duration-300 hover:shadow-lg active:scale-95 font-serif"
                  onClick={() => {
                    try {
                      setCurrentStep('tier-selection');
                    } catch (error) {
                      console.error('Step navigation error:', error);
                    }
                  }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  🙏 Continue Sacred Journey
                </Button>
              </CardContent>
            </Card>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-orange-200" />
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-background px-4 text-orange-700 font-medium font-serif">या फिर</span>
              </div>
            </div>

            {/* WhatsApp Section */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200/50 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>

                <h3 className="text-xl font-semibold text-green-800 mb-3 font-serif">
                  Need Immediate Divine Help?
                </h3>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  Connect instantly with our spiritual counselor on WhatsApp for immediate dharmic guidance 
                  and sacred matrimonial wisdom from experienced guides
                </p>

                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Badge variant="outline" className="bg-white/80 border-green-200 text-green-700">
                    <Clock className="w-3 h-3 mr-1" />
                    Instant Divine Response
                  </Badge>
                  <Badge variant="outline" className="bg-white/80 border-green-200 text-green-700">
                    <Phone className="w-3 h-3 mr-1" />
                    Voice/Video Seva Available
                  </Badge>
                </div>

                <Button 
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 font-semibold py-3 text-lg transition-all duration-300 font-serif"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  🙏 Start WhatsApp Seva Now
                </Button>
              </CardContent>
            </Card>

            {/* Sanskrit Closing Blessing */}
            <div className="text-center py-4">
              <div className="text-base font-bold text-orange-800 mb-1 font-serif">
                सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः
              </div>
              <p className="text-xs text-gray-600 italic">
                "May all beings find happiness, may all be free from suffering"
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Authenticated user multi-step view
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-orange-800 flex items-center justify-center space-x-2 font-serif">
            <div className="text-2xl">🕉️</div>
            <span>{getStepTitle()}</span>
          </DialogTitle>
          {user && (
            <div className="text-center">
              <p className="text-gray-600 font-serif">
                🙏 Namaste, <span className="font-semibold text-orange-700">{user.name}</span>
              </p>
              <p className="text-sm text-muted-foreground italic">Let our spiritual guides illuminate your sacred path to dharmic union</p>
            </div>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Step Navigation */}
          {(currentStep === 'category-selection' || currentStep === 'assessment' || currentStep === 'consultation-form') && (
            <div className="flex items-center justify-between bg-orange-50/50 rounded-lg p-4 border border-orange-200">
              <Button 
                variant="ghost" 
                onClick={() => {
                  if (currentStep === 'category-selection') setCurrentStep('tier-selection');
                  else if (currentStep === 'assessment') setCurrentStep('category-selection');
                  else if (currentStep === 'consultation-form') setCurrentStep('assessment');
                }}
                className="text-orange-700 hover:text-orange-800 hover:bg-orange-100 font-serif"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Sacred Step
              </Button>
              <div className="text-sm text-gray-500 font-serif">
                🪷 Step {currentStep === 'tier-selection' ? 1 : 
                      currentStep === 'category-selection' ? 2 : 
                      currentStep === 'assessment' ? 3 : 4} of 4 - Sacred Journey
              </div>
            </div>
          )}

          {/* Success State */}
          {currentStep === 'success' && (
            <div className="text-center py-10">
              <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-200">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-green-700 mb-3 font-serif">
                🌺 Your Divine Guidance is Confirmed!
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our spiritual counselor is meditating on your sacred query and will connect with your soul shortly. 
                May your dharmic journey be blessed with divine wisdom.
              </p>
              <div className="bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200 rounded-lg p-6 mb-6">
                <div className="text-lg font-bold text-orange-800 mb-2 font-serif">
                  ॐ शुभस्य शीघ्रम् ॐ
                </div>
                <p className="text-sm text-gray-600 italic">
                  "May auspiciousness come swiftly to your sacred journey"
                </p>
              </div>
              <Button 
                onClick={onClose} 
                className="py-3 px-8 text-white font-semibold bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 transition-all duration-300 hover:shadow-lg font-serif text-lg"
              >
                <Star className="w-5 h-5 mr-2" />
                Return to Sacred Dashboard
              </Button>
            </div>
          )}

          {/* Step Content */}
          {currentStep === 'tier-selection' && (
            <ConsultationTierSelector
              selectedTier={selectedTier}
              onTierSelect={setSelectedTier}
            />
          )}

          {currentStep === 'category-selection' && (
            <ExpertCategorySelector
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          )}

          {currentStep === 'assessment' && (
            <SpiritualAssessment
              onAssessmentChange={setAssessment}
            />
          )}

          {currentStep === 'consultation-form' && (
            <ConsultationForm
              consultationType={selectedCategory}
              onSubmit={handleConsultationSubmit}
              isSubmitting={isSubmitting}
            />
          )}

          {/* Navigation Buttons */}
          {currentStep !== 'consultation-form' && currentStep !== 'success' && (
            <div className="flex flex-col sm:flex-row gap-3 bg-gradient-to-r from-orange-50/50 to-rose-50/50 rounded-lg p-4 border border-orange-200">
              <Button
                onClick={() => {
                  try {
                    if (currentStep === 'tier-selection') {
                      setCurrentStep('category-selection');
                    } else if (currentStep === 'category-selection') {
                      setCurrentStep('assessment');
                    } else if (currentStep === 'assessment') {
                      setCurrentStep('consultation-form');
                    }
                  } catch (error) {
                    console.error('Navigation error:', error);
                  }
                }}
                disabled={!canNavigateNext()}
                className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold py-3 transition-all duration-300 hover:shadow-lg active:scale-95 disabled:opacity-50 font-serif text-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                🙏 Continue Sacred Journey
              </Button>

              <Button
                type="button"
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50 font-semibold py-3 text-lg font-serif hover:border-green-400 transition-all duration-300"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                📱 Instant WhatsApp Seva
              </Button>
            </div>
          )}

          {/* Sanskrit Blessing Footer */}
          <div className="text-center pt-6 border-t border-orange-200/50">
            <div className="text-sm font-bold text-orange-800 mb-1 font-serif">
              सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः
            </div>
            <p className="text-xs text-gray-600 italic">
              "May all beings be happy, may all be free from suffering"
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

SpeakToExpertModal.displayName = 'SpeakToExpertModal';

export { SpeakToExpertModal };
export default SpeakToExpertModal;
