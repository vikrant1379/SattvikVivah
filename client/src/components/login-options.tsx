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
import { Eye, EyeOff, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Email validation schema
const emailLoginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .refine((email) => {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return emailRegex.test(email);
    }, "Please enter a valid email format"),
  password: z.string().min(1, "Password is required"),
});

// Mobile validation schema
const mobileLoginSchema = z.object({
  mobile: z.string()
    .min(1, "Mobile number is required")
    .refine((mobile) => {
      // Indian mobile number validation (10 digits, starts with 6-9)
      const mobileRegex = /^[6-9]\d{9}$/;
      return mobileRegex.test(mobile.replace(/\D/g, ''));
    }, "Please enter a valid 10-digit mobile number"),
  password: z.string().min(1, "Password is required"),
});

type EmailLoginForm = z.infer<typeof emailLoginSchema>;
type MobileLoginForm = z.infer<typeof mobileLoginSchema>;

function LoginOptions() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const { toast } = useToast();

  const emailForm = useForm<EmailLoginForm>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mobileForm = useForm<MobileLoginForm>({
    resolver: zodResolver(mobileLoginSchema),
    defaultValues: {
      mobile: "",
      password: "",
    },
  });

  const handleEmailLogin = async (data: EmailLoginForm) => {
    try {
      // Add your email login logic here
      console.log("Email login:", data);
      toast({
        title: "Login Successful",
        description: "Welcome back to SattvikVivah!",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMobileLogin = async (data: MobileLoginForm) => {
    try {
      // Add your mobile login logic here
      console.log("Mobile login:", data);
      toast({
        title: "Login Successful",
        description: "Welcome back to SattvikVivah!",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-sage">Welcome Back</CardTitle>
        <p className="text-muted-foreground">Sign in to your spiritual journey</p>
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
              <form onSubmit={emailForm.handleSubmit(handleEmailLogin)} className="space-y-4">
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
                            placeholder="Enter your password"
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

                <Button
                  type="submit"
                  className="w-full bg-saffron hover:bg-saffron/90"
                  disabled={emailForm.formState.isSubmitting}
                >
                  {emailForm.formState.isSubmitting ? "Signing in..." : "Sign in with Email"}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="mobile" className="space-y-4">
            <Form {...mobileForm}>
              <form onSubmit={mobileForm.handleSubmit(handleMobileLogin)} className="space-y-4">
                <FormField
                  control={mobileForm.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <div className="flex border border-input rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-background">
                          <span className="inline-flex items-center px-3 bg-background text-muted-foreground text-sm border-r border-input">
                            +91
                          </span>
                          <Input
                            type="tel"
                            placeholder="9876543210"
                            className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-background flex-1"
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
                            placeholder="Enter your password"
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

                <Button
                  type="submit"
                  className="w-full bg-saffron hover:bg-saffron/90"
                  disabled={mobileForm.formState.isSubmitting}
                >
                  {mobileForm.formState.isSubmitting ? "Signing in..." : "Sign in with Mobile"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>


      </CardContent>
    </Card>
  );
}

export { LoginOptions };
export default LoginOptions;