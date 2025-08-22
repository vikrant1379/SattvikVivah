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
  ArrowLeft
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
      title: "WhatsApp Seva Started",
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

      console.log('Consultation submitted:', consultationData);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Divine Guidance Requested 🙏",
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
        return 'Seek Guidance for Your Sacred Journey';
      case 'tier-selection':
        return 'Choose Your Divine Path';
      case 'category-selection':
        return 'Select Your Guidance Focus';
      case 'assessment':
        return 'Sacred Self-Discovery';
      case 'consultation-form':
        return 'Share Your Sacred Query';
      case 'success':
        return 'Your Sacred Journey Continues!';
      default:
        return 'Expert Consultation';
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
            <DialogTitle className="text-center text-2xl font-bold text-orange-800 flex items-center justify-center space-x-2">
              <div className="text-2xl">🪷</div>
              <span>{getStepTitle()}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Premium Login Section */}
            <Card className="bg-gradient-to-r from-orange-50 to-rose-50 border-orange-200/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-orange-600" />
                </div>

                <h3 className="text-xl font-semibold text-orange-800 mb-3">
                  Login for Personalized Expert Consultation
                </h3>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  To provide you with tailored dharmic advice based on your spiritual profile and life aspirations, 
                  please login to your sacred account
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Personalized Dharmic Advice</span>
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
                    <span>Divine Follow-up Care</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold py-3"
                  onClick={() => setCurrentStep('tier-selection')}
                >
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
                <span className="bg-background px-4 text-gray-500 font-medium">या फिर</span>
              </div>
            </div>

            {/* WhatsApp Section */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>

                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  Need Immediate Divine Help?
                </h3>

                <p className="text-gray-700 mb-4">
                  Connect instantly with our spiritual counselor on WhatsApp for immediate dharmic guidance 
                  and sacred matrimonial wisdom
                </p>

                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Badge variant="outline" className="bg-white/80 border-green-200 text-green-700">
                    <Clock className="w-3 h-3 mr-1" />
                    Instant Divine Response
                  </Badge>
                  <Badge variant="outline" className="bg-white/80 border-green-200 text-green-700">
                    <Phone className="w-3 h-3 mr-1" />
                    Voice/Video Seva
                  </Badge>
                </div>

                <Button 
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 font-semibold py-3"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  🙏 Start WhatsApp Seva
                </Button>
              </CardContent>
            </Card>

            {/* Sanskrit Blessing */}
            <div className="text-center py-4">
              <div className="text-base font-bold text-orange-800 mb-1 font-serif">
                गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः
              </div>
              <p className="text-xs text-gray-600 italic">
                "The guru is Brahma, Vishnu, and Shiva - the divine teacher guides us"
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
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-orange-800 flex items-center justify-center space-x-2">
            <div className="text-2xl">🕉️</div>
            <span>{getStepTitle()}</span>
          </DialogTitle>
          {user && (
            <div className="text-center">
              <p className="text-gray-600">
                Namaste, <span className="font-semibold text-orange-700">{user.name}</span>
              </p>
              <p className="text-sm text-muted-foreground">Let our spiritual guides illuminate your sacred path</p>
            </div>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Step Navigation */}
          {(currentStep === 'category-selection' || currentStep === 'assessment' || currentStep === 'consultation-form') && (
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => {
                  if (currentStep === 'category-selection') setCurrentStep('tier-selection');
                  else if (currentStep === 'assessment') setCurrentStep('category-selection');
                  else if (currentStep === 'consultation-form') setCurrentStep('assessment');
                }}
                className="text-orange-700 hover:text-orange-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Step
              </Button>
              <div className="text-sm text-gray-500">
                Step {currentStep === 'tier-selection' ? 1 : 
                      currentStep === 'category-selection' ? 2 : 
                      currentStep === 'assessment' ? 3 : 4} of 4
              </div>
            </div>
          )}
          {currentStep === 'success' && (
            <div className="text-center py-10">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-green-700 mb-3">Your Divine Guidance is Confirmed!</h2>
              <p className="text-lg text-gray-700 mb-6">
                Our spiritual counselor is meditating on your query and will connect with you shortly. 
                May your sacred journey be blessed.
              </p>
              <Button onClick={onClose} className="py-3 px-8 text-white font-semibold bg-orange-500 hover:bg-orange-600">
                Return to Dashboard
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
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  if (currentStep === 'tier-selection') setCurrentStep('category-selection');
                  else if (currentStep === 'category-selection') setCurrentStep('assessment');
                  else if (currentStep === 'assessment') setCurrentStep('consultation-form');
                }}
                disabled={!canNavigateNext()}
                className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold py-3"
              >
                Continue Sacred Journey
              </Button>

              <Button
                type="button"
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50 font-semibold py-3"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Seva
              </Button>
            </div>
          )}

          {/* Sanskrit Blessing */}
          <div className="text-center pt-4 border-t border-orange-200/50">
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