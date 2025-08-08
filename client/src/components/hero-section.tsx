import { memo, useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Eye, EyeOff, RefreshCw, Check, X } from "lucide-react";

// Enhanced email validation
const emailSchema = z.string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .refine((email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }, "Please enter a valid email format")
  .refine((email) => {
    const domain = email.split('@')[1];
    return domain && domain.length > 3;
  }, "Please enter a valid email domain");

// Strong password validation
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters")
  .refine((password) => /[a-z]/.test(password), "Password must contain at least one lowercase letter")
  .refine((password) => /[A-Z]/.test(password), "Password must contain at least one uppercase letter")
  .refine((password) => /\d/.test(password), "Password must contain at least one number")
  .refine((password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), "Password must contain at least one special character");

const registrationSchema = z.object({
  profileFor: z.string().min(1, "Please select who you're creating this profile for"),
  gender: z.string().min(1, "Please select gender"),
  email: emailSchema,
  password: passwordSchema,
});

type RegistrationForm = z.infer<typeof registrationSchema>;

// Password strength checking
interface PasswordStrength {
  score: number;
  feedback: string[];
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  hasMinLength: boolean;
}

const checkPasswordStrength = (password: string): PasswordStrength => {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const hasMinLength = password.length >= 8;
  
  const checks = [hasLowercase, hasUppercase, hasNumber, hasSpecial, hasMinLength];
  const score = checks.filter(Boolean).length;
  
  const feedback: string[] = [];
  if (!hasMinLength) feedback.push("At least 8 characters");
  if (!hasLowercase) feedback.push("One lowercase letter");
  if (!hasUppercase) feedback.push("One uppercase letter");
  if (!hasNumber) feedback.push("One number");
  if (!hasSpecial) feedback.push("One special character");
  
  return {
    score,
    feedback,
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasSpecial,
    hasMinLength
  };
};

// Auto-generate secure password
const generateSecurePassword = (): string => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  // Ensure at least one character from each category
  let password = '';
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill remaining 8 characters randomly
  const allChars = lowercase + uppercase + numbers + symbols;
  for (let i = 4; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

const HeroSection = memo(() => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | null>(null);

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      profileFor: "",
      gender: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegistrationForm) => {
      const response = await apiRequest("POST", "/api/users", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "Welcome to SattvikVivah. Your spiritual journey begins now.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const generatePassword = useCallback(() => {
    const newPassword = generateSecurePassword();
    form.setValue('password', newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
    toast({
      title: "Password Generated",
      description: "A strong password has been generated for you.",
    });
  }, [form, toast]);

  const handlePasswordChange = useCallback((value: string) => {
    setPasswordStrength(checkPasswordStrength(value));
  }, []);

  const onSubmit = (data: RegistrationForm) => {
    setIsSubmitting(true);
    registerMutation.mutate(data);
  };

  return (
    <section className="vedic-gradient py-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-foreground leading-tight">
                Find Your
                <span className="text-saffron block">Dharmic Partner</span>
              </h1>
              <p className="text-xl lg:text-2xl text-foreground/80 font-light leading-relaxed">
                For souls seeking Grihastha Ashram through spiritual alignment, not material pursuit
              </p>
              <div className="mandala-divider py-4">
                <div className="flex items-center justify-center space-x-6">
                  <span className="text-temple-gold font-devanagari text-2xl animate-om-pulse">ॐ</span>
                  <blockquote className="text-base text-foreground/70 italic font-serif text-center max-w-md">
                    "Marriage is not just a union of two bodies, but a sacred bond of two souls"
                  </blockquote>
                  <span className="text-temple-gold font-devanagari text-2xl animate-om-pulse">ॐ</span>
                </div>
              </div>
            </div>
            
            {/* Quick Registration Form */}
            <Card className="bg-card/95 backdrop-blur-sm border border-temple-gold/30 shadow-xl hover-elevate">
              <CardHeader>
                <CardTitle className="font-serif font-semibold text-xl text-foreground mandala-border pb-4">
                  Begin Your Sacred Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="profileFor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Create Profile For</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Self">Self</SelectItem>
                                <SelectItem value="Son">Son</SelectItem>
                                <SelectItem value="Daughter">Daughter</SelectItem>
                                <SelectItem value="Brother">Brother</SelectItem>
                                <SelectItem value="Sister">Sister</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Bride">Bride</SelectItem>
                                <SelectItem value="Groom">Groom</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@example.com" 
                              type="email"
                              autoComplete="email"
                              {...field} 
                            />
                          </FormControl>
                          <p className="text-xs text-muted-foreground mt-1">
                            We'll use this email for account verification and spiritual journey updates
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            <span>Password</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={generatePassword}
                              className="text-xs text-saffron hover:text-saffron/80 p-1 h-auto"
                            >
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Generate
                            </Button>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="Create a strong password" 
                                type={showPassword ? "text" : "password"}
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handlePasswordChange(e.target.value);
                                }}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-3 w-3" />
                                ) : (
                                  <Eye className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          
                          {/* Password Strength Indicator */}
                          {field.value && passwordStrength && (
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="flex-1">
                                  <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                      <div
                                        key={level}
                                        className={`h-1 flex-1 rounded ${
                                          level <= passwordStrength.score
                                            ? passwordStrength.score <= 2
                                              ? 'bg-destructive'
                                              : passwordStrength.score <= 3
                                              ? 'bg-yellow-500'
                                              : passwordStrength.score <= 4
                                              ? 'bg-blue-500'
                                              : 'bg-green-500'
                                            : 'bg-muted'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {passwordStrength.score <= 2 && 'Weak'}
                                  {passwordStrength.score === 3 && 'Fair'}
                                  {passwordStrength.score === 4 && 'Good'}
                                  {passwordStrength.score === 5 && 'Strong'}
                                </span>
                              </div>
                              
                              {/* Password Requirements */}
                              {passwordStrength.feedback.length > 0 && (
                                <div className="space-y-1">
                                  <p className="text-xs text-muted-foreground">Password must include:</p>
                                  <div className="space-y-1">
                                    {passwordStrength.feedback.map((requirement, index) => (
                                      <div key={index} className="flex items-center space-x-2 text-xs">
                                        <X className="w-3 h-3 text-destructive" />
                                        <span className="text-muted-foreground">{requirement}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Password Requirements Met */}
                              {passwordStrength.score === 5 && (
                                <div className="flex items-center space-x-2 text-xs text-green-600">
                                  <Check className="w-3 h-3" />
                                  <span>Strong password! All requirements met.</span>
                                </div>
                              )}
                            </div>
                          )}
                          
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-saffron text-primary-foreground hover:bg-saffron/90 shadow-lg hover-elevate font-medium"
                      disabled={isSubmitting || (passwordStrength && passwordStrength.score < 4)}
                    >
                      {isSubmitting ? "Creating Account..." : "Start Your Spiritual Journey"}
                    </Button>
                    
                    {passwordStrength && passwordStrength.score < 4 && (
                      <p className="text-xs text-yellow-600 text-center mt-1">
                        Please create a stronger password to continue
                      </p>
                    )}
                    
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground text-center">
                        By registering, you accept our <a href="#" className="text-saffron hover:underline">Terms</a> and <a href="#" className="text-saffron hover:underline">Privacy Policy</a>
                      </p>
                      <p className="text-xs text-center text-temple-gold font-medium">
                        🔒 Your information is secured with spiritual care and modern encryption
                      </p>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Spiritual couple in traditional attire" 
              className="rounded-2xl shadow-2xl w-full animate-float" 
            />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-temple-gold/20 rounded-full flex items-center justify-center animate-lotus-bloom border border-temple-gold/30">
              <span className="text-temple-gold text-2xl font-devanagari">ॐ</span>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-saffron/10 rounded-full flex items-center justify-center animate-float border border-saffron/30" style={{animationDelay: "-2s"}}>
              <span className="text-saffron text-3xl">🪷</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
