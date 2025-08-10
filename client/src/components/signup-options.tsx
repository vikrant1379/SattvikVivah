import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { SmartDateSelector } from "./smart-date-selector";

// Import centralized data
import {
  religionOptions,
  ethnicityOptions,
  annualIncomeOptions,
  maritalStatusOptions,
  heightOptions,
  residentialStatusOptions,
  physicalStatusOptions,
  bloodGroupOptions,
  healthConditionsOptions,
  smokingHabitsOptions,
  drinkingHabitsOptions,
  eatingHabitsOptions,
  hasChildrenOptions,
  horoscopeOptions,
  mangalikOptions
} from "@/data/static-options";
import { casteGroupOptions, casteSubcasteOptions } from "@/data/caste";
import { motherTongueOptions } from "@/data/mother-tongue";
import { countryOptions, statesByCountry, citiesByState } from "@/data/locations";
import { educationQualificationOptions } from "@/data/education";
import { professionOptions } from "@/data/profession";

// Signup validation schema with both email and mobile mandatory
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .refine((email) => {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return emailRegex.test(email);
    }, "Please enter a valid email format"),
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
  dobDay: z.string().min(1, "Day is required"),
  dobMonth: z.string().min(1, "Month is required"),
  dobYear: z.string().min(1, "Year is required"),
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

type SignupForm = z.infer<typeof signupSchema>;

function SignupOptions() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { signup, isLoading, error, clearError } = useAuth();

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    const allChars = lowercase + uppercase + numbers + symbols;
    let password = '';

    // Ensure at least one character from each required category
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest randomly (8 more characters for total of 12)
    for (let i = 4; i < 12; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    form.setValue('password', password);
    // Trigger validation for the password field
    form.trigger('password');

    toast({
      description: "Password generated successfully!",
      duration: 4000
    });
  };

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      dobDay: "",
      dobMonth: "",
      dobYear: "",
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

  const handleSignup = async (data: SignupForm) => {
    clearError();

    // Combine separate date fields into dateOfBirth
    const { dobDay, dobMonth, dobYear, ...restData } = data;
    const dateOfBirth = `${dobYear}-${dobMonth.padStart(2, '0')}-${dobDay.padStart(2, '0')}`;

    const signupData = {
      ...restData,
      dateOfBirth
    };

    const success = await signup(signupData);

    if (success) {
      toast({
        title: "Success! 🎉",
        description: "Welcome to SattvikVivah! Your spiritual journey begins now.",
        duration: 4000
      });
      // Navigate to profiles page on successful signup
      setLocation('/profiles');
    } else {
      toast({
        title: "Signup Failed",
        description: error || "Something went wrong. Please try again.",
        variant: "destructive",
        duration: 4000
      });
    }
  };

  const formatMobileNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Limit to 10 digits
    return digits.slice(0, 10);
  };

  // Watch for country and state changes
  const selectedCountry = form.watch("country");
  const selectedState = form.watch("state");

  // Get available states based on selected country
  const availableStates = React.useMemo(() => {
    if (!selectedCountry || selectedCountry === "Other") return [];
    // Map from country display name to country code for data lookup
    const countryCodeMap: Record<string, string> = {
      "India": "IN",
      "USA": "US",
      "UK": "GB",
      "Canada": "CA",
      "Australia": "AU"
    };
    const countryCode = countryCodeMap[selectedCountry] || selectedCountry;
    return statesByCountry[countryCode] || [];
  }, [selectedCountry]);

  // Get available cities based on selected state
  const availableCities = React.useMemo(() => {
    if (!selectedState || selectedState === "Other") return [];
    return citiesByState[selectedState] || [];
  }, [selectedState]);

  // Reset dependent fields when parent changes
  React.useEffect(() => {
    if (selectedCountry) {
      form.setValue("state", "");
      form.setValue("city", "");
    }
  }, [selectedCountry, form]);

  React.useEffect(() => {
    if (selectedState) {
      form.setValue("city", "");
    }
  }, [selectedState, form]);


  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-sage">Join Your Spiritual Journey</CardTitle>
        <p className="text-muted-foreground">Create your sacred profile to find your dharmic partner</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-6">
                {/* Name Fields */}
                {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter first name"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter last name"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

                {/* Email and Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <div className="flex border border-input rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-background">
                          <span className="inline-flex items-center px-3 bg-background text-foreground text-sm border-r border-input">
                            +91
                          </span>
                          <Input
                            type="tel"
                            placeholder="9876543210"
                            className="border-0 rounded-none focus:ring-0 focus:ring-offset-0 bg-background"
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
              </div>

                {/* Password */}
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
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          className="bg-background"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus:outline-none"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-600" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-600" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <SmartDateSelector
                label="Date of Birth"
                value={{
                  year: form.watch("dobYear"),
                  month: form.watch("dobMonth"),
                  day: form.watch("dobDay")
                }}
                onChange={(dateValue) => {
                  if (dateValue.year !== form.getValues("dobYear")) {
                    form.setValue("dobYear", dateValue.year || "");
                    form.trigger("dobYear");
                  }
                  if (dateValue.month !== form.getValues("dobMonth")) {
                    form.setValue("dobMonth", dateValue.month || "");
                    form.trigger("dobMonth");
                  }
                  if (dateValue.day !== form.getValues("dobDay")) {
                    form.setValue("dobDay", dateValue.day || "");
                    form.trigger("dobDay");
                  }
                }}
                errors={{
                  year: form.formState.errors.dobYear?.message,
                  month: form.formState.errors.dobMonth?.message,
                  day: form.formState.errors.dobDay?.message
                }}
              />

              {/* Gender and Looking For */}
              <div className="grid grid-cols-2 gap-4">
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
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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
                control={form.control}
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
                        <SelectItem value="Self">Self</SelectItem>
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
                  control={form.control}
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
                          {religionOptions.map((religion) => (
                            <SelectItem key={religion} value={religion}>
                              {religion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="community"
                  render={({ field }) => {
                    // Get all subcaste options from all caste groups
                    const getAllSubcasteOptions = () => {
                      const allSubcastes: string[] = [];
                      Object.values(casteSubcasteOptions).forEach(subcastes => {
                        allSubcastes.push(...subcastes);
                      });
                      // Remove duplicates and sort
                      return [...new Set(allSubcastes)].sort();
                    };

                    return (
                      <FormItem>
                        <FormLabel>Community</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {getAllSubcasteOptions().map((community) => (
                              <SelectItem key={community} value={community}>
                                {community}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              {/* Mother Tongue */}
              <FormField
                control={form.control}
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
                        {motherTongueOptions.map((language) => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countryOptions.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger disabled={!selectedCountry}>
                            <SelectValue placeholder={selectedCountry ? "Select State" : "Select Country First"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableStates.length > 0 ? (
                            availableStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="Other">Other</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger disabled={!selectedState}>
                            <SelectValue placeholder={selectedState ? "Select City" : "Select State First"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableCities.length > 0 ? (
                            availableCities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="Other">Other</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Height and Marital Status */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
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
                          {heightOptions.map((height) => (
                            <SelectItem key={height} value={height}>
                              {height}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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
                          {maritalStatusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
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
                  control={form.control}
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
                          {educationQualificationOptions.map((education) => (
                            <SelectItem key={education} value={education}>
                              {education}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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
                          {professionOptions.map((profession) => (
                            <SelectItem key={profession} value={profession}>
                              {profession}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Annual Income */}
              <FormField
                control={form.control}
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
                        {annualIncomeOptions.map((income) => (
                          <SelectItem key={income} value={income}>
                            {income}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
              type="submit"
              className="w-full bg-saffron hover:bg-saffron/90"
              disabled={form.formState.isSubmitting || isLoading}
            >
              {form.formState.isSubmitting || isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { SignupOptions };
export default SignupOptions;