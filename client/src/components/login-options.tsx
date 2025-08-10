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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Phone, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Login validation schemas
const emailLoginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  stayLoggedIn: z.boolean().optional(),
});

const mobileLoginSchema = z.object({
  mobile: z.string()
    .min(1, "Mobile number is required")
    .refine((mobile) => {
      const mobileRegex = /^[6-9]\d{9}$/;
      return mobileRegex.test(mobile.replace(/\D/g, ''));
    }, "Please enter a valid 10-digit mobile number"),
  password: z.string().min(1, "Password is required"),
  stayLoggedIn: z.boolean().optional(),
});

// OTP modal schemas
const otpRequestSchema = z.object({
  contactMethod: z.string()
    .min(1, "Please enter email or mobile number")
    .refine((value) => {
      // Check if it's either valid email or valid mobile
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobileRegex = /^[6-9]\d{9}$/;
      return emailRegex.test(value) || mobileRegex.test(value.replace(/\D/g, ''));
    }, "Please enter a valid email or mobile number"),
});

const otpVerifySchema = z.object({
  otp: z.string().min(6, "Please enter the 6-digit OTP"),
  stayLoggedIn: z.boolean().optional(),
});

// Forgot password schema
const forgotPasswordSchema = z.object({
  contactMethod: z.string().min(1, "Please enter email or mobile number"),
  otp: z.string().optional(),
  newPassword: z.string().min(8, "Password must be at least 8 characters"), // Added min length for new password
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.confirmPassword) {
    return data.newPassword === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type EmailLoginForm = z.infer<typeof emailLoginSchema>;
type MobileLoginForm = z.infer<typeof mobileLoginSchema>;
type OtpRequestForm = z.infer<typeof otpRequestSchema>;
type OtpVerifyForm = z.infer<typeof otpVerifySchema>;
type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

function LoginOptions() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpContactMethod, setOtpContactMethod] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState<"contact" | "otp" | "reset">("contact");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  // Forms
  const emailForm = useForm<EmailLoginForm>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: { email: "", password: "", stayLoggedIn: false },
  });

  const mobileForm = useForm<MobileLoginForm>({
    resolver: zodResolver(mobileLoginSchema),
    defaultValues: { mobile: "", password: "", stayLoggedIn: false },
  });

  const otpRequestForm = useForm<OtpRequestForm>({
    resolver: zodResolver(otpRequestSchema),
    defaultValues: { contactMethod: "" },
  });

  const otpVerifyForm = useForm<OtpVerifyForm>({
    resolver: zodResolver(otpVerifySchema),
    defaultValues: { otp: "", stayLoggedIn: false },
  });

  const forgotPasswordForm = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { contactMethod: "",otp: "", newPassword: "", confirmPassword: "" },
  });

  // Handlers
  const handleEmailLogin = async (data: EmailLoginForm) => {
    try {
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

  const handleOtpRequest = async (data: OtpRequestForm) => {
    try {
      console.log("Sending OTP to:", data.contactMethod);
      setOtpContactMethod(data.contactMethod);
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Please check your email/mobile for the OTP.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOtpVerify = async (data: OtpVerifyForm) => {
    try {
      console.log("OTP login:", { contactMethod: otpContactMethod, ...data });
      setOtpModalOpen(false);
      setOtpSent(false);
      otpRequestForm.reset();
      otpVerifyForm.reset();
      toast({
        title: "Login Successful",
        description: "Welcome back to SattvikVivah!",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleForgotPasswordSubmit = async (data: ForgotPasswordForm) => {
    if (forgotPasswordStep === "contact") {
      try {
        console.log("Sending reset OTP to:", data.contactMethod);
        setForgotPasswordStep("otp");
        toast({
          title: "OTP Sent",
          description: "Please check your email/mobile for the reset OTP.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to send OTP. Please try again.",
          variant: "destructive",
        });
      }
    } else if (forgotPasswordStep === "otp") {
      try {
        console.log("Verifying OTP:", data.otp);
        setForgotPasswordStep("reset");
        toast({
          title: "OTP Verified",
          description: "Please enter your new password.",
        });
      } catch (error) {
        toast({
          title: "Invalid OTP",
          description: "Please enter a valid OTP.",
          variant: "destructive",
        });
      }
    } else if (forgotPasswordStep === "reset") {
      try {
        console.log("Resetting password");
        setForgotPasswordOpen(false);
        setForgotPasswordStep("contact");
        forgotPasswordForm.reset();
        toast({
          title: "Password Reset Successful",
          description: "Your password has been updated. Please login with your new password.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to reset password. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const formatMobileNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.slice(0, 10);
  };

  const resetOtpModal = () => {
    setOtpModalOpen(false);
    setOtpSent(false);
    otpRequestForm.reset();
    otpVerifyForm.reset();
  };

  const generatePassword = () => {
    const length = 9; // Set a length that meets the minimum requirement
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    forgotPasswordForm.setValue('newPassword', password);
    // Trigger validation for the password field
    forgotPasswordForm.trigger('newPassword');

    toast({
      description: "Password generated successfully!"
    });
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

                <div className="flex items-center justify-between">
                  <FormField
                    control={emailForm.control}
                    name="stayLoggedIn"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          Stay logged in
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
                    <DialogTrigger asChild>
                      <Button variant="link" className="text-saffron hover:text-saffron/80 text-sm p-0">
                        Forgot Password?
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>
                          {forgotPasswordStep === "contact" ? "Reset Password" :
                           forgotPasswordStep === "otp" ? "Verify OTP" : "Set New Password"}
                        </DialogTitle>
                        <DialogDescription>
                          {forgotPasswordStep === "contact" ? "Enter your email or mobile number to receive a reset code" :
                           forgotPasswordStep === "otp" ? "Enter the OTP sent to your email/mobile" : "Create a new password for your account"}
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...forgotPasswordForm}>
                        <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPasswordSubmit)} className="space-y-4">
                          {forgotPasswordStep === "contact" && (
                            <FormField
                              control={forgotPasswordForm.control}
                              name="contactMethod"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email or Mobile Number</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter email or mobile number"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}

                          {forgotPasswordStep === "otp" && (
                            <FormField
                              control={forgotPasswordForm.control}
                              name="otp"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Enter OTP</FormLabel>
                                  <FormControl>
                                    <InputOTP maxLength={6} {...field} className="w-full justify-center">
                                      <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                      </InputOTPGroup>
                                    </InputOTP>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}

                          {forgotPasswordStep === "reset" && (
                            <>
                              <FormField
                                control={forgotPasswordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Input
                                          type={showNewPassword ? "text" : "password"}
                                          placeholder="Enter new password"
                                          {...field}
                                        />
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus:outline-none"
                                          onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                          {showNewPassword ? (
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

                              <FormField
                                control={forgotPasswordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Input
                                          type={showConfirmPassword ? "text" : "password"}
                                          placeholder="Confirm new password"
                                          {...field}
                                        />
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus:outline-none"
                                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                          {showConfirmPassword ? (
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
                            </>
                          )}

                          <Button
                            type="submit"
                            className="w-full bg-saffron hover:bg-saffron/90"
                            disabled={forgotPasswordForm.formState.isSubmitting}
                          >
                            {forgotPasswordForm.formState.isSubmitting ? "Processing..." :
                             forgotPasswordStep === "contact" ? "Send OTP" :
                             forgotPasswordStep === "otp" ? "Verify OTP" : "Reset Password"}
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-saffron hover:bg-saffron/90"
                  disabled={emailForm.formState.isSubmitting}
                >
                  {emailForm.formState.isSubmitting ? "Signing in..." : "Login"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">or</span>
                  </div>
                </div>

                <Dialog open={otpModalOpen} onOpenChange={setOtpModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      Login with OTP
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md" onPointerDownOutside={resetOtpModal}>
                    <DialogHeader>
                      <DialogTitle>Login with OTP</DialogTitle>
                      <DialogDescription>
                        {otpSent ? "Enter the OTP sent to your contact method" : "Enter your email or mobile number to receive OTP"}
                      </DialogDescription>
                    </DialogHeader>

                    {!otpSent ? (
                      <Form {...otpRequestForm}>
                        <form onSubmit={otpRequestForm.handleSubmit(handleOtpRequest)} className="space-y-4">
                          <FormField
                            control={otpRequestForm.control}
                            name="contactMethod"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email or Mobile Number</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter email or mobile number"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="submit"
                            className="w-full bg-saffron hover:bg-saffron/90"
                            disabled={otpRequestForm.formState.isSubmitting}
                          >
                            {otpRequestForm.formState.isSubmitting ? "Sending..." : "Send OTP"}
                          </Button>
                        </form>
                      </Form>
                    ) : (
                      <Form {...otpVerifyForm}>
                        <form onSubmit={otpVerifyForm.handleSubmit(handleOtpVerify)} className="space-y-4">
                          <div className="text-sm text-muted-foreground text-center">
                            OTP sent to: <span className="font-medium">{otpContactMethod}</span>
                          </div>

                          <FormField
                            control={otpVerifyForm.control}
                            name="otp"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Enter OTP</FormLabel>
                                <FormControl>
                                  <InputOTP maxLength={6} {...field} className="w-full justify-center">
                                    <InputOTPGroup>
                                      <InputOTPSlot index={0} />
                                      <InputOTPSlot index={1} />
                                      <InputOTPSlot index={2} />
                                      <InputOTPSlot index={3} />
                                      <InputOTPSlot index={4} />
                                      <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                  </InputOTP>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={otpVerifyForm.control}
                            name="stayLoggedIn"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal cursor-pointer">
                                  Stay logged in
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              className="flex-1"
                              onClick={() => setOtpSent(false)}
                            >
                              Change Number
                            </Button>
                            <Button
                              type="submit"
                              className="flex-1 bg-saffron hover:bg-saffron/90"
                              disabled={otpVerifyForm.formState.isSubmitting}
                            >
                              {otpVerifyForm.formState.isSubmitting ? "Verifying..." : "Verify & Login"}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    )}
                  </DialogContent>
                </Dialog>
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
                        <div className="flex border border-input rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-background">
                          <span className="inline-flex items-center px-3 bg-background text-foreground text-sm border-r border-input">
                            +91
                          </span>
                          <Input
                            type="tel"
                            placeholder="9876543210"
                            className="border-0 rounded-none focus:ring-0 focus:ring-offset-0"
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

                <div className="flex items-center justify-between">
                  <FormField
                    control={mobileForm.control}
                    name="stayLoggedIn"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          Stay logged in
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
                    <DialogTrigger asChild>
                      <Button variant="link" className="text-saffron hover:text-saffron/80 text-sm p-0">
                        Forgot Password?
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-saffron hover:bg-saffron/90"
                  disabled={mobileForm.formState.isSubmitting}
                >
                  {mobileForm.formState.isSubmitting ? "Signing in..." : "Login"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">or</span>
                  </div>
                </div>

                <Dialog open={otpModalOpen} onOpenChange={setOtpModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      Login with OTP
                    </Button>
                  </DialogTrigger>
                </Dialog>
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