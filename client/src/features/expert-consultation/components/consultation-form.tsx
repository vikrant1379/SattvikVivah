import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Mail, Video, Clock } from 'lucide-react';
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
    description: 'Detailed dharmic advice via email',
    icon: Mail,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    value: 'phone',
    label: 'Peaceful Phone Consultation',
    description: 'Voice guidance with spiritual wisdom',
    icon: Phone,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    value: 'video',
    label: 'Sacred Video Blessing',
    description: 'Face-to-face spiritual counseling',
    icon: Video,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    value: 'in-app',
    label: 'In-App Divine Message',
    description: 'Guidance within the platform',
    icon: MessageCircle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
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

  const handleContinueJourney = () => {
    form.handleSubmit(handleSubmit)();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-bold text-orange-800 mb-2">
          Share Your Sacred Query
        </h3>
        <p className="text-sm text-gray-600 italic">
          "Express your heart's dharmic aspirations"
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Query Field */}
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-800">
                  📝 Describe Your Sacred Query:
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your aspirations for a dharmic partnership, specific questions about spiritual compatibility, or guidance you seek for your sacred journey..."
                    className="min-h-[120px] resize-none border-orange-200 focus:border-orange-400"
                    {...field}
                  />
                </FormControl>
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
                <FormLabel className="text-base font-semibold text-gray-800 mb-4 block">
                  🕊️ Preferred Guidance Method:
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 gap-3"
                  >
                    {contactMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <div
                          key={method.value}
                          className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-orange-50/50 transition-colors"
                        >
                          <RadioGroupItem value={method.value} id={method.value} />
                          <label
                            htmlFor={method.value}
                            className="flex items-center space-x-3 cursor-pointer flex-1"
                          >
                            <div className={`w-10 h-10 ${method.bgColor} rounded-full flex items-center justify-center`}>
                              <IconComponent className={`w-5 h-5 ${method.color}`} />
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">{method.label}</div>
                              <div className="text-sm text-gray-600">{method.description}</div>
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
                <FormLabel className="text-base font-semibold text-gray-800 mb-4 block">
                  ⚡ Sacred Timing Preference:
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 gap-3"
                  >
                    <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-orange-50/50 transition-colors">
                      <RadioGroupItem value="general" id="general" />
                      <label htmlFor="general" className="cursor-pointer flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-800">Peaceful Contemplation</div>
                            <div className="text-sm text-gray-600">Thoughtful response within 24-48 hours</div>
                          </div>
                          <Badge variant="outline" className="text-green-700 border-green-300">
                            <Clock className="w-3 h-3 mr-1" />
                            Standard
                          </Badge>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-orange-50/50 transition-colors">
                      <RadioGroupItem value="priority" id="priority" />
                      <label htmlFor="priority" className="cursor-pointer flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-800">Urgent Divine Guidance</div>
                            <div className="text-sm text-gray-600">Priority response within 4-6 hours</div>
                          </div>
                          <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                            <Clock className="w-3 h-3 mr-1" />
                            Priority
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
          <div className="pt-4">
            <Button
              type="button"
              onClick={handleContinueJourney}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white py-3 text-lg font-semibold disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending Sacred Message...</span>
                </div>
              ) : (
                <>
                  🪷 Continue Sacred Journey
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
});

ConsultationForm.displayName = 'ConsultationForm';