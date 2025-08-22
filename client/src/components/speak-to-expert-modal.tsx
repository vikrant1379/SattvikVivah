
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, 
  Phone, 
  Lock, 
  User, 
  Heart, 
  Star, 
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  Target
} from "lucide-react";

const consultationSchema = z.object({
  consultationType: z.string().min(1, "Please select a consultation type"),
  query: z.string().min(10, "Please provide at least 10 characters describing your query"),
  preferredContact: z.enum(["in-app", "email", "phone"], {
    required_error: "Please select a preferred contact method",
  }),
  urgencyLevel: z.enum(["general", "priority"], {
    required_error: "Please select urgency level",
  }),
});

type ConsultationForm = z.infer<typeof consultationSchema>;

interface SpeakToExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const consultationTypes = [
  { value: "profile-enhancement", label: "Profile Enhancement", icon: User },
  { value: "match-preferences", label: "Match Preferences", icon: Heart },
  { value: "communication-tips", label: "Communication Tips", icon: MessageCircle },
  { value: "spiritual-guidance", label: "Spiritual Guidance", icon: Star },
  { value: "relationship-advice", label: "Relationship Advice", icon: Users },
  { value: "vedic-compatibility", label: "Vedic Compatibility", icon: BookOpen },
  { value: "general-inquiry", label: "General Inquiry", icon: Target },
];

const SpeakToExpertModal: React.FC<SpeakToExpertModalProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ConsultationForm>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      consultationType: "",
      query: "",
      preferredContact: "email",
      urgencyLevel: "general",
    },
  });

  const handleWhatsAppClick = () => {
    const message = isAuthenticated
      ? `Hi! I'm ${user?.name || 'a registered user'} on SattvikVivah. I need matrimonial guidance and would like to speak with an expert.`
      : "Hi! I'm interested in matrimonial guidance. I haven't created a profile yet but would like to know more about your services.";
    
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp Chat Started",
      description: "You'll be connected with our expert shortly.",
    });
  };

  const handleConsultationSubmit = async (data: ConsultationForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Consultation Request Submitted",
        description: "Our expert will reach out to you within 24 hours.",
      });
      
      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit consultation request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Non-authenticated user view
  if (!isAuthenticated) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-orange-800 flex items-center justify-center space-x-2">
              <div className="text-2xl">🕉️</div>
              <span>Get Expert Matrimonial Guidance</span>
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
                  To provide you with tailored advice based on your preferences and spiritual profile, 
                  please login to your account
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Personalized Advice</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Profile-Based Tips</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Priority Support</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Follow-up Care</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold py-3"
                  onClick={onClose}
                >
                  <User className="w-5 h-5 mr-2" />
                  Login to Get Started
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
                  Need Immediate Help?
                </h3>
                
                <p className="text-gray-700 mb-4">
                  Chat with our expert on WhatsApp for general guidance and 
                  learn about our matrimonial services
                </p>

                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Badge variant="outline" className="bg-white/80 border-green-200 text-green-700">
                    <Clock className="w-3 h-3 mr-1" />
                    Instant Response
                  </Badge>
                  <Badge variant="outline" className="bg-white/80 border-green-200 text-green-700">
                    <Phone className="w-3 h-3 mr-1" />
                    Voice/Video Call
                  </Badge>
                </div>

                <Button 
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 font-semibold py-3"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Sanskrit Blessing */}
            <div className="text-center py-4">
              <div className="text-sm font-bold text-orange-800 mb-1 font-serif">
                सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः
              </div>
              <p className="text-xs text-gray-600 italic">
                "May all be happy, may all be free from illness"
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Authenticated user view
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-orange-800 flex items-center justify-center space-x-2">
            <div className="text-2xl">🙏</div>
            <span>Expert Consultation</span>
          </DialogTitle>
          <div className="text-center">
            <p className="text-gray-600">Welcome, <span className="font-semibold text-orange-700">{user?.name}</span></p>
            <p className="text-sm text-muted-foreground">Let our experts guide your spiritual journey</p>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleConsultationSubmit)} className="space-y-6">
            {/* Consultation Type */}
            <FormField
              control={form.control}
              name="consultationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800">What would you like guidance on?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select consultation type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {consultationTypes.map((type) => {
                        const IconComponent = type.icon;
                        return (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center space-x-2">
                              <IconComponent className="w-4 h-4" />
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Query */}
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800">Describe your query in detail</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please share your specific questions, concerns, or what kind of guidance you're seeking..."
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Preference */}
            <FormField
              control={form.control}
              name="preferredContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800">How would you prefer to receive our response?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-1 gap-3"
                    >
                      <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-orange-50 transition-colors">
                        <RadioGroupItem value="email" id="email" />
                        <label htmlFor="email" className="flex items-center space-x-2 cursor-pointer flex-1">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">Email Response</div>
                            <div className="text-sm text-gray-600">Detailed written advice</div>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-orange-50 transition-colors">
                        <RadioGroupItem value="phone" id="phone" />
                        <label htmlFor="phone" className="flex items-center space-x-2 cursor-pointer flex-1">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Phone className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">Phone Call</div>
                            <div className="text-sm text-gray-600">Personal consultation</div>
                          </div>
                        </label>
                      </div>

                      <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-orange-50 transition-colors">
                        <RadioGroupItem value="in-app" id="in-app" />
                        <label htmlFor="in-app" className="flex items-center space-x-2 cursor-pointer flex-1">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <div className="font-medium">In-App Notification</div>
                            <div className="text-sm text-gray-600">Message within platform</div>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Urgency Level */}
            <FormField
              control={form.control}
              name="urgencyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800">Priority Level</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-2 gap-3"
                    >
                      <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-orange-50 transition-colors">
                        <RadioGroupItem value="general" id="general" />
                        <label htmlFor="general" className="cursor-pointer flex-1">
                          <div className="font-medium">General Inquiry</div>
                          <div className="text-sm text-gray-600">Response within 24-48 hours</div>
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-orange-50 transition-colors">
                        <RadioGroupItem value="priority" id="priority" />
                        <label htmlFor="priority" className="cursor-pointer flex-1">
                          <div className="font-medium flex items-center">
                            Priority Consultation 
                            <Badge className="ml-2 bg-orange-100 text-orange-700">Fast</Badge>
                          </div>
                          <div className="text-sm text-gray-600">Response within 4-6 hours</div>
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold py-3"
              >
                {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50 font-semibold py-3"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Chat
              </Button>
            </div>
          </form>
        </Form>

        {/* Sanskrit Blessing */}
        <div className="text-center pt-4 border-t border-orange-200/50">
          <div className="text-sm font-bold text-orange-800 mb-1 font-serif">
            गुरुब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः
          </div>
          <p className="text-xs text-gray-600 italic">
            "The guru is Brahma, Vishnu, and Shiva"
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { SpeakToExpertModal };
export default SpeakToExpertModal;
