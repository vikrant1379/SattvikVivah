
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Mail, Phone, User, Calendar, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Email signup validation schema
const emailSignupSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .refine((email) => {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return emailRegex.test(email);
    }, "Please enter a valid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .refine((password) => /[a-z]/.test(password), "Password must contain at least one lowercase letter")
    .refine((password) => /[A-Z]/.test(password), "Password must contain at least one uppercase letter")
    .refine((password) => /\d/.test(password), "Password must contain at least one number")
    .refine((password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), "Password must contain at least one special character"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select your gender"),
  lookingFor: z.string().min(1, "Please select what you're looking for"),
  profileFor: z.string().min(1, "Please select who this profile is for"),
  religion: z.string().min(1, "Please select your religion"),
  community: z.string().min(1, "Please select your community"),
  motherTongue: z.string().min(1, "Please select your mother tongue"),
  country: z.string().min(1, "Please select your country"),
  state: z.string().min(1, "Please select your state"),
  city: z.string().min(1, "Please select your city"),
  height: z.string().min(1, "Please select your height"),
  maritalStatus: z.string().min(1, "Please select your marital status"),
  education: z.string().min(1, "Please select your education"),
  profession: z.string().min(1, "Please select your profession"),
  annualIncome: z.string().min(1, "Please select your annual income"),
});

// Mobile signup validation schema
const mobileSignupSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  mobile: z.string()
    .min(1, "Mobile number is required")
    .refine((mobile) => {
      // Indian mobile number validation (10 digits, starts with 6-9)
      const mobileRegex = /^[6-9]\d{9}$/;
      return mobileRegex.test(mobile.replace(/\D/g, ''));
    }, "Please enter a valid 10-digit mobile number"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .refine((password) => /[a-z]/.test(password), "Password must contain at least one lowercase letter")
    .refine((password) => /[A-Z]/.test(password), "Password must contain at least one uppercase letter")
    .refine((password) => /\d/.test(password), "Password must contain at least one number")
    .refine((password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), "Password must contain at least one special character"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select your gender"),
  lookingFor: z.string().min(1, "Please select what you're looking for"),
  profileFor: z.string().min(1, "Please select who this profile is for"),
  religion: z.string().min(1, "Please select your religion"),
  community: z.string().min(1, "Please select your community"),
  motherTongue: z.string().min(1, "Please select your mother tongue"),
  country: z.string().min(1, "Please select your country"),
  state: z.string().min(1, "Please select your state"),
  city: z.string().min(1, "Please select your city"),
  height: z.string().min(1, "Please select your height"),
  maritalStatus: z.string().min(1, "Please select your marital status"),
  education: z.string().min(1, "Please select your education"),
  profession: z.string().min(1, "Please select your profession"),
  annualIncome: z.string().min(1, "Please select your annual income"),
});

type EmailSignupForm = z.infer<typeof emailSignupSchema>;
type MobileSignupForm = z.infer<typeof mobileSignupSchema>;

function SignupOptions() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const { toast } = useToast();

  const emailForm = useForm<EmailSignupForm>({
    resolver: zodResolver(emailSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dateOfBirth: "",
      gender: "",
      lookingFor: "",
      profileFor: "",
      religion: "",
      community: "",
      motherTongue: "",
      country: "",
      state: "",
      city: "",
      height: "",
      maritalStatus: "",
      education: "",
      profession: "",
      annualIncome: "",
    },
  });

  const mobileForm = useForm<MobileSignupForm>({
    resolver: zodResolver(mobileSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      password: "",
      dateOfBirth: "",
      gender: "",
      lookingFor: "",
      profileFor: "",
      religion: "",
      community: "",
      motherTongue: "",
      country: "",
      state: "",
      city: "",
      height: "",
      maritalStatus: "",
      education: "",
      profession: "",
      annualIncome: "",
    },
  });

  const handleEmailSignup = async (data: EmailSignupForm) => {
    try {
      // Add your email signup logic here
      console.log("Email signup:", data);
      toast({
        title: "Account Created Successfully!",
        description: "Welcome to SattvikVivah. Your spiritual journey begins now.",
      });
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleMobileSignup = async (data: MobileSignupForm) => {
    try {
      // Add your mobile signup logic here
      console.log("Mobile signup:", data);
      toast({
        title: "Account Created Successfully!",
        description: "Welcome to SattvikVivah. Your spiritual journey begins now.",
      });
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const formatMobileNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Limit to 10 digits
    return digits.slice(0, 10);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-sage">Join Your Spiritual Journey</CardTitle>
        <p className="text-muted-foreground">Create your sacred profile to find your dharmic partner</p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Mobile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(handleEmailSignup)} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={emailForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={emailForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={emailForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Birth */}
                <FormField
                  control={emailForm.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender and Looking For */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={emailForm.control}
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
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={emailForm.control}
                    name="lookingFor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Looking For</FormLabel>
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

                {/* Profile For */}
                <FormField
                  control={emailForm.control}
                  name="profileFor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>This Profile is for</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Self">Myself</SelectItem>
                          <SelectItem value="Son">Son</SelectItem>
                          <SelectItem value="Daughter">Daughter</SelectItem>
                          <SelectItem value="Brother">Brother</SelectItem>
                          <SelectItem value="Sister">Sister</SelectItem>
                          <SelectItem value="Friend">Friend</SelectItem>
                          <SelectItem value="Relative">Relative</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Religion and Community */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={emailForm.control}
                    name="religion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Religion</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Hinduism">Hinduism</SelectItem>
                            <SelectItem value="Buddhism">Buddhism</SelectItem>
                            <SelectItem value="Jainism">Jainism</SelectItem>
                            <SelectItem value="Sikhism">Sikhism</SelectItem>
                            <SelectItem value="Christianity">Christianity</SelectItem>
                            <SelectItem value="Islam">Islam</SelectItem>
                            <SelectItem value="Judaism">Judaism</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={emailForm.control}
                    name="community"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Community</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Brahmin">Brahmin</SelectItem>
                            <SelectItem value="Kshatriya">Kshatriya</SelectItem>
                            <SelectItem value="Vaishya">Vaishya</SelectItem>
                            <SelectItem value="Shudra">Shudra</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                            <SelectItem value="No Preference">No Preference</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Mother Tongue */}
                <FormField
                  control={emailForm.control}
                  name="motherTongue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mother Tongue</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Hindi">Hindi</SelectItem>
                          <SelectItem value="Bengali">Bengali</SelectItem>
                          <SelectItem value="Telugu">Telugu</SelectItem>
                          <SelectItem value="Tamil">Tamil</SelectItem>
                          <SelectItem value="Gujarati">Gujarati</SelectItem>
                          <SelectItem value="Marathi">Marathi</SelectItem>
                          <SelectItem value="Punjabi">Punjabi</SelectItem>
                          <SelectItem value="Malayalam">Malayalam</SelectItem>
                          <SelectItem value="Kannada">Kannada</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={emailForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="USA">USA</SelectItem>
                            <SelectItem value="UK">UK</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={emailForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter state"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={emailForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter city"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Height and Marital Status */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={emailForm.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="4'6\"">4'6"</SelectItem>
                            <SelectItem value="4'7\"">4'7"</SelectItem>
                            <SelectItem value="4'8\"">4'8"</SelectItem>
                            <SelectItem value="4'9\"">4'9"</SelectItem>
                            <SelectItem value="4'10\"">4'10"</SelectItem>
                            <SelectItem value="4'11\"">4'11"</SelectItem>
                            <SelectItem value="5'0\"">5'0"</SelectItem>
                            <SelectItem value="5'1\"">5'1"</SelectItem>
                            <SelectItem value="5'2\"">5'2"</SelectItem>
                            <SelectItem value="5'3\"">5'3"</SelectItem>
                            <SelectItem value="5'4\"">5'4"</SelectItem>
                            <SelectItem value="5'5\"">5'5"</SelectItem>
                            <SelectItem value="5'6\"">5'6"</SelectItem>
                            <SelectItem value="5'7\"">5'7"</SelectItem>
                            <SelectItem value="5'8\"">5'8"</SelectItem>
                            <SelectItem value="5'9\"">5'9"</SelectItem>
                            <SelectItem value="5'10\"">5'10"</SelectItem>
                            <SelectItem value="5'11\"">5'11"</SelectItem>
                            <SelectItem value="6'0\"">6'0"</SelectItem>
                            <SelectItem value="6'1\"">6'1"</SelectItem>
                            <SelectItem value="6'2\"">6'2"</SelectItem>
                            <SelectItem value="6'3\"">6'3"</SelectItem>
                            <SelectItem value="Above 6'3\"">Above 6'3"</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={emailForm.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marital Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Never Married">Never Married</SelectItem>
                            <SelectItem value="Divorced">Divorced</SelectItem>
                            <SelectItem value="Widowed">Widowed</SelectItem>
                            <SelectItem value="Separated">Separated</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Education and Profession */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={emailForm.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="High School">High School</SelectItem>
                            <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                            <SelectItem value="Master's">Master's</SelectItem>
                            <SelectItem value="Doctorate">Doctorate</SelectItem>
                            <SelectItem value="Diploma">Diploma</SelectItem>
                            <SelectItem value="Professional">Professional</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={emailForm.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profession</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                            <SelectItem value="Doctor">Doctor</SelectItem>
                            <SelectItem value="Teacher">Teacher</SelectItem>
                            <SelectItem value="Business Owner">Business Owner</SelectItem>
                            <SelectItem value="Government Employee">Government Employee</SelectItem>
                            <SelectItem value="Private Employee">Private Employee</SelectItem>
                            <SelectItem value="Student">Student</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Annual Income */}
                <FormField
                  control={emailForm.control}
                  name="annualIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Income</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Below ₹2 Lakh">Below ₹2 Lakh</SelectItem>
                          <SelectItem value="₹2-5 Lakh">₹2-5 Lakh</SelectItem>
                          <SelectItem value="₹5-10 Lakh">₹5-10 Lakh</SelectItem>
                          <SelectItem value="₹10-15 Lakh">₹10-15 Lakh</SelectItem>
                          <SelectItem value="₹15-25 Lakh">₹15-25 Lakh</SelectItem>
                          <SelectItem value="₹25-50 Lakh">₹25-50 Lakh</SelectItem>
                          <SelectItem value="₹50 Lakh - ₹1 Crore">₹50 Lakh - ₹1 Crore</SelectItem>
                          <SelectItem value="Above ₹1 Crore">Above ₹1 Crore</SelectItem>
                          <SelectItem value="Prefer not to disclose">Prefer not to disclose</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-saffron hover:bg-saffron/90"
                  disabled={emailForm.formState.isSubmitting}
                >
                  {emailForm.formState.isSubmitting ? "Creating Account..." : "Create Account with Email"}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="mobile" className="space-y-4">
            <Form {...mobileForm}>
              <form onSubmit={mobileForm.handleSubmit(handleMobileSignup)} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={mobileForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mobileForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Mobile */}
                <FormField
                  control={mobileForm.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                            +91
                          </span>
                          <Input
                            type="tel"
                            placeholder="9876543210"
                            className="rounded-l-none"
                            {...field}
                            onChange={(e) => {
                              const formatted = formatMobileNumber(e.target.value);
                              field.onChange(formatted);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={mobileForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Birth */}
                <FormField
                  control={mobileForm.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender and Looking For */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={mobileForm.control}
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
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mobileForm.control}
                    name="lookingFor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Looking For</FormLabel>
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

                {/* Profile For */}
                <FormField
                  control={mobileForm.control}
                  name="profileFor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>This Profile is for</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Self">Myself</SelectItem>
                          <SelectItem value="Son">Son</SelectItem>
                          <SelectItem value="Daughter">Daughter</SelectItem>
                          <SelectItem value="Brother">Brother</SelectItem>
                          <SelectItem value="Sister">Sister</SelectItem>
                          <SelectItem value="Friend">Friend</SelectItem>
                          <SelectItem value="Relative">Relative</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Religion and Community */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={mobileForm.control}
                    name="religion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Religion</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Hinduism">Hinduism</SelectItem>
                            <SelectItem value="Buddhism">Buddhism</SelectItem>
                            <SelectItem value="Jainism">Jainism</SelectItem>
                            <SelectItem value="Sikhism">Sikhism</SelectItem>
                            <SelectItem value="Christianity">Christianity</SelectItem>
                            <SelectItem value="Islam">Islam</SelectItem>
                            <SelectItem value="Judaism">Judaism</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mobileForm.control}
                    name="community"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Community</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Brahmin">Brahmin</SelectItem>
                            <SelectItem value="Kshatriya">Kshatriya</SelectItem>
                            <SelectItem value="Vaishya">Vaishya</SelectItem>
                            <SelectItem value="Shudra">Shudra</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                            <SelectItem value="No Preference">No Preference</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Mother Tongue */}
                <FormField
                  control={mobileForm.control}
                  name="motherTongue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mother Tongue</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Hindi">Hindi</SelectItem>
                          <SelectItem value="Bengali">Bengali</SelectItem>
                          <SelectItem value="Telugu">Telugu</SelectItem>
                          <SelectItem value="Tamil">Tamil</SelectItem>
                          <SelectItem value="Gujarati">Gujarati</SelectItem>
                          <SelectItem value="Marathi">Marathi</SelectItem>
                          <SelectItem value="Punjabi">Punjabi</SelectItem>
                          <SelectItem value="Malayalam">Malayalam</SelectItem>
                          <SelectItem value="Kannada">Kannada</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={mobileForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="USA">USA</SelectItem>
                            <SelectItem value="UK">UK</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mobileForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter state"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mobileForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter city"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Height and Marital Status */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={mobileForm.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="4'6\"">4'6"</SelectItem>
                            <SelectItem value="4'7\"">4'7"</SelectItem>
                            <SelectItem value="4'8\"">4'8"</SelectItem>
                            <SelectItem value="4'9\"">4'9"</SelectItem>
                            <SelectItem value="4'10\"">4'10"</SelectItem>
                            <SelectItem value="4'11\"">4'11"</SelectItem>
                            <SelectItem value="5'0\"">5'0"</SelectItem>
                            <SelectItem value="5'1\"">5'1"</SelectItem>
                            <SelectItem value="5'2\"">5'2"</SelectItem>
                            <SelectItem value="5'3\"">5'3"</SelectItem>
                            <SelectItem value="5'4\"">5'4"</SelectItem>
                            <SelectItem value="5'5\"">5'5"</SelectItem>
                            <SelectItem value="5'6\"">5'6"</SelectItem>
                            <SelectItem value="5'7\"">5'7"</SelectItem>
                            <SelectItem value="5'8\"">5'8"</SelectItem>
                            <SelectItem value="5'9\"">5'9"</SelectItem>
                            <SelectItem value="5'10\"">5'10"</SelectItem>
                            <SelectItem value="5'11\"">5'11"</SelectItem>
                            <SelectItem value="6'0\"">6'0"</SelectItem>
                            <SelectItem value="6'1\"">6'1"</SelectItem>
                            <SelectItem value="6'2\"">6'2"</SelectItem>
                            <SelectItem value="6'3\"">6'3"</SelectItem>
                            <SelectItem value="Above 6'3\"">Above 6'3"</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mobileForm.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marital Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Never Married">Never Married</SelectItem>
                            <SelectItem value="Divorced">Divorced</SelectItem>
                            <SelectItem value="Widowed">Widowed</SelectItem>
                            <SelectItem value="Separated">Separated</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Education and Profession */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={mobileForm.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="High School">High School</SelectItem>
                            <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                            <SelectItem value="Master's">Master's</SelectItem>
                            <SelectItem value="Doctorate">Doctorate</SelectItem>
                            <SelectItem value="Diploma">Diploma</SelectItem>
                            <SelectItem value="Professional">Professional</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mobileForm.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profession</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                            <SelectItem value="Doctor">Doctor</SelectItem>
                            <SelectItem value="Teacher">Teacher</SelectItem>
                            <SelectItem value="Business Owner">Business Owner</SelectItem>
                            <SelectItem value="Government Employee">Government Employee</SelectItem>
                            <SelectItem value="Private Employee">Private Employee</SelectItem>
                            <SelectItem value="Student">Student</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Annual Income */}
                <FormField
                  control={mobileForm.control}
                  name="annualIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Income</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Below ₹2 Lakh">Below ₹2 Lakh</SelectItem>
                          <SelectItem value="₹2-5 Lakh">₹2-5 Lakh</SelectItem>
                          <SelectItem value="₹5-10 Lakh">₹5-10 Lakh</SelectItem>
                          <SelectItem value="₹10-15 Lakh">₹10-15 Lakh</SelectItem>
                          <SelectItem value="₹15-25 Lakh">₹15-25 Lakh</SelectItem>
                          <SelectItem value="₹25-50 Lakh">₹25-50 Lakh</SelectItem>
                          <SelectItem value="₹50 Lakh - ₹1 Crore">₹50 Lakh - ₹1 Crore</SelectItem>
                          <SelectItem value="Above ₹1 Crore">Above ₹1 Crore</SelectItem>
                          <SelectItem value="Prefer not to disclose">Prefer not to disclose</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-saffron hover:bg-saffron/90"
                  disabled={mobileForm.formState.isSubmitting}
                >
                  {mobileForm.formState.isSubmitting ? "Creating Account..." : "Create Account with Mobile"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>

        
      </CardContent>
    </Card>
  );
}

export { SignupOptions };
export default SignupOptions;
