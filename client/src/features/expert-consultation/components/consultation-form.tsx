
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Mail, Video, Clock, Sparkles } from 'lucide-react';
import type { IConsultationForm } from '../types/expert-consultation.types';

const consultationSchema = z.object({
  query: z.string().min(20, "Please provide at least 20 characters describing your sacred query"),
  preferredContact: z.enum(['email', 'phone', 'in-app', 'video'], {
    required_error: "Please select your preferred guidance method",
  }),
  urgencyLevel: z.enum(['general', 'priority'], {
    required_error: "Please select priority level",
  }),
});

interface ConsultationFormProps {
  consultationType: string;
  onSubmit: (data: IConsultationForm) => void;
  isSubmitting?: boolean;
  className?: string;
}

const contactMethods = [
  {
    value: 'email',
    label: 'Thoughtful Written Response',
    description: 'Detailed dharmic advice via sacred email',
    icon: Mail,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    value: 'phone',
    label: 'Peaceful Phone Consultation',
    description: 'Voice guidance with spiritual wisdom',
    icon: Phone,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    value: 'video',
    label: 'Sacred Video Blessing',
    description: 'Face-to-face spiritual counseling with darshan',
    icon: Video,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    value: 'in-app',
    label: 'In-App Divine Message',
    description: 'Guidance within the sacred platform',
    icon: MessageCircle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  }
];

export const ConsultationForm = memo<ConsultationFormProps>(({
  consultationType,
  onSubmit,
  isSubmitting = false,
  className = ''
}) => {
  const form = useForm<z.infer<typeof consultationSchema>>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      query: "",
      preferredContact: "email",
      urgencyLevel: "general",
    },
  });

  const handleSubmit = (data: z.infer<typeof consultationSchema>) => {
    onSubmit({
      ...data,
      consultationType
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-orange-800 mb-2 font-serif">
          📝 Share Your Sacred Query
        </h3>
        <p className="text-gray-600 italic mb-4">
          "Express your heart's dharmic aspirations with complete openness"
        </p>
        <div className="text-sm font-bold text-orange-800 font-serif">
          हृदयं वाचं गच्छति
        </div>
        <p className="text-xs text-gray-500 italic mb-6">
          "The heart's truth flows through words"
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Query Field */}
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-800 font-serif">
                  🪷 Describe Your Sacred Query:
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your deepest aspirations for a dharmic partnership... Describe specific questions about spiritual compatibility, family harmony, cultural traditions, or any guidance you seek for your sacred matrimonial journey. The more details you provide, the more personalized dharmic wisdom you'll receive."
                    className="min-h-[140px] resize-none border-orange-200 focus:border-orange-400 bg-gradient-to-r from-orange-50/30 to-rose-50/30 font-serif text-gray-700"
                    {...field}
                  />
                </FormControl>
                <div className="text-xs text-gray-500 mt-2">
                  🔒 Your sacred thoughts are completely confidential and treated with spiritual reverence
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Method */}
          <FormField
            control={form.control}
            name="preferredContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-800 mb-4 block font-serif">
                  🕊️ Preferred Guidance Method:
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 gap-4"
                  >
                    {contactMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <div
                          key={method.value}
                          className={`flex items-center space-x-4 border-2 rounded-xl p-5 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-rose-50/50 transition-all duration-300 cursor-pointer ${
                            field.value === method.value 
                              ? `${method.borderColor} ring-2 ring-orange-200 ${method.bgColor}` 
                              : 'border-gray-200 hover:border-orange-200'
                          }`}
                        >
                          <RadioGroupItem value={method.value} id={method.value} className="mt-1" />
                          <label
                            htmlFor={method.value}
                            className="flex items-center space-x-4 cursor-pointer flex-1"
                          >
                            <div className={`w-12 h-12 ${method.bgColor} rounded-full flex items-center justify-center border ${method.borderColor}`}>
                              <IconComponent className={`w-6 h-6 ${method.color}`} />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800 font-serif">{method.label}</div>
                              <div className="text-sm text-gray-600 italic">{method.description}</div>
                            </div>
                          </label>
                        </div>
                      );
                    })}
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
                <FormLabel className="text-lg font-semibold text-gray-800 mb-4 block font-serif">
                  ⚡ Sacred Timing Preference:
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 gap-4"
                  >
                    <div className={`flex items-center space-x-4 border-2 rounded-xl p-5 hover:bg-green-50/50 transition-all duration-300 cursor-pointer ${
                      field.value === 'general' 
                        ? 'border-green-200 ring-2 ring-green-200 bg-green-50' 
                        : 'border-gray-200 hover:border-green-200'
                    }`}>
                      <RadioGroupItem value="general" id="general" />
                      <label htmlFor="general" className="cursor-pointer flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-800 font-serif">Peaceful Contemplation</div>
                            <div className="text-sm text-gray-600 italic">Thoughtful response within 24-48 hours with deep wisdom</div>
                          </div>
                          <Badge variant="outline" className="text-green-700 border-green-300 bg-white/80">
                            <Clock className="w-3 h-3 mr-1" />
                            Standard Dharmic Timing
                          </Badge>
                        </div>
                      </label>
                    </div>

                    <div className={`flex items-center space-x-4 border-2 rounded-xl p-5 hover:bg-orange-50/50 transition-all duration-300 cursor-pointer ${
                      field.value === 'priority' 
                        ? 'border-orange-200 ring-2 ring-orange-200 bg-orange-50' 
                        : 'border-gray-200 hover:border-orange-200'
                    }`}>
                      <RadioGroupItem value="priority" id="priority" />
                      <label htmlFor="priority" className="cursor-pointer flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-800 font-serif">Urgent Divine Guidance</div>
                            <div className="text-sm text-gray-600 italic">Priority response within 4-6 hours for time-sensitive matters</div>
                          </div>
                          <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                            <Clock className="w-3 h-3 mr-1" />
                            Sacred Priority
                          </Badge>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white py-4 text-lg font-semibold disabled:opacity-50 transition-all duration-300 hover:shadow-xl active:scale-95 font-serif"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending Sacred Message to Divine Guides...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3">
                  <Sparkles className="w-5 h-5" />
                  <span>🪷 Submit Sacred Query for Divine Wisdom</span>
                </div>
              )}
            </Button>
            
            {/* Blessing Message */}
            <div className="mt-4 text-center bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-sm font-bold text-orange-800 font-serif">
                ॐ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके
              </div>
              <p className="text-xs text-gray-600 italic mt-1">
                "May all be auspicious, may all purposes be fulfilled through divine grace"
              </p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
});

ConsultationForm.displayName = 'ConsultationForm';
