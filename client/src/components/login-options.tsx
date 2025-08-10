
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Eye, EyeOff, ArrowLeft, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Login validation schema
const loginSchema = z.object({
  emailOrMobile: z.string()
    .min(1, "Email or mobile number is required")
    .refine((value) => {
      // Check if it's email
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      // Check if it's mobile (10 digits, starts with 6-9)
      const mobileRegex = /^[6-9]\d{9}$/;
      const cleanValue = value.replace(/\D/g, '');
      
      return emailRegex.test(value) || mobileRegex.test(cleanValue);
    }, "Please enter a valid email address or 10-digit mobile number"),
  password: z.string().min(1, "Password is required"),
  stayLoggedIn: z.boolean().optional(),
});

// OTP login schema
const otpLoginSchema = z.object({
  emailOrMobile: z.string()
    .min(1, "Email or mobile number is required")
    .refine((value) => {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      const mobileRegex = /^[6-9]\d{9}$/;
      const cleanValue = value.replace(/\D/g, '');
      
      return emailRegex.test(value) || mobileRegex.test(cleanValue);
    }, "Please enter a valid email address or 10-digit mobile number"),
  otp: z.string().min(6, "Please enter complete OTP").max(6, "OTP must be 6 digits"),
  stayLoggedIn: z.boolean().optional(),
});

// Forgot password schemas
const forgotPasswordSchema = z.object({
  emailOrMobile: z.string()
    .min(1, "Email or mobile number is required")
    .refine((value) => {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      const mobileRegex = /^[6-9]\d{9}$/;
      const cleanValue = value.replace(/\D/g, '');
      
      return emailRegex.test(value) || mobileRegex.test(cleanValue);
    }, "Please enter a valid email address or 10-digit mobile number"),
});

const resetPasswordSchema = z.object({
  otp: z.string().min(6, "Please enter complete OTP").max(6, "OTP must be 6 digits"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .refine((password) => /[a-z]/.test(password), "Password must contain at least one lowercase letter")
    .refine((password) => /[A-Z]/.test(password), "Password must contain at least one uppercase letter")
    .refine((password) => /\d/.test(password), "Password must contain at least one number")
    .refine((password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type OtpLoginForm = z.infer<typeof otpLoginSchema>;
type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

type LoginMode = 'password' | 'otp-request' | 'otp-verify';
type ForgotPasswordStep = 'request' | 'verify' | 'reset';

function LoginOptions() {
  const [loginMode, setLoginMode] = useState<LoginMode>('password');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState<ForgotPasswordStep>('request');
  const [forgotPasswordContact, setForgotPasswordContact] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);
  const { toast } = useToast();

  // Forms
  const passwordForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrMobile: "",
      password: "",
      stayLoggedIn: false,
    },
  });

  const otpForm = useForm<OtpLoginForm>({
    resolver: zodResolver(otpLoginSchema),
    defaultValues: {
      emailOrMobile: "",
      otp: "",
      stayLoggedIn: false,
    },
  });

  const forgotPasswordForm = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      emailOrMobile: "",
    },
  });

  const resetPasswordForm = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Helper functions
  const isEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(value);
  };

  const formatDisplayValue = (value: string) => {
    if (isEmail(value)) {
      return value;
    }
    return `+91 ${value}`;
  };

  const startTimer = (seconds: number, setTimer: (value: number) => void) => {
    setTimer(seconds);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Login handlers
  const handlePasswordLogin = async (data: LoginForm) => {
    try {
      console.log("Password login:", data);
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

  const handleOtpRequest = async (data: { emailOrMobile: string }) => {
    try {
      console.log("OTP request:", data);
      setLoginMode('otp-verify');
      startTimer(120, setOtpTimer);
      toast({
        title: "OTP Sent",
        description: `OTP sent to ${formatDisplayValue(data.emailOrMobile)}`,
      });
    } catch (error) {
      toast({
        title: "Failed to Send OTP",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOtpLogin = async (data: OtpLoginForm) => {
    try {
      console.log("OTP login:", data);
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

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    
    try {
      const emailOrMobile = loginMode === 'otp-verify' ? otpForm.getValues('emailOrMobile') : forgotPasswordContact;
      console.log("Resend OTP to:", emailOrMobile);
      startTimer(120, loginMode === 'otp-verify' ? setOtpTimer : setOtpTimer);
      startTimer(30, setResendCooldown);
      toast({
        title: "OTP Resent",
        description: `New OTP sent to ${formatDisplayValue(emailOrMobile)}`,
      });
    } catch (error) {
      toast({
        title: "Failed to Resend OTP",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Forgot password handlers
  const handleForgotPasswordRequest = async (data: ForgotPasswordForm) => {
    try {
      console.log("Forgot password request:", data);
      setForgotPasswordContact(data.emailOrMobile);
      setForgotPasswordStep('verify');
      startTimer(120, setOtpTimer);
      toast({
        title: "OTP Sent",
        description: `Reset OTP sent to ${formatDisplayValue(data.emailOrMobile)}`,
      });
    } catch (error) {
      toast({
        title: "Failed to Send OTP",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePasswordReset = async (data: ResetPasswordForm) => {
    try {
      console.log("Password reset:", { ...data, contact: forgotPasswordContact });
      setIsForgotPasswordOpen(false);
      setForgotPasswordStep('request');
      setForgotPasswordContact('');
      resetPasswordForm.reset();
      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated. Please login with your new password.",
      });
    } catch (error) {
      toast({
        title: "Password Reset Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetForgotPasswordFlow = () => {
    setIsForgotPasswordOpen(false);
    setForgotPasswordStep('request');
    setForgotPasswordContact('');
    forgotPasswordForm.reset();
    resetPasswordForm.reset();
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-sage">
            {loginMode === 'password' ? 'Welcome back! Please Login' : 
             loginMode === 'otp-request' ? 'Login with OTP' : 
             'Enter OTP'}
          </CardTitle>
          {loginMode !== 'password' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setLoginMode('password');
                otpForm.reset();
              }}
              className="absolute left-4 top-4 p-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {loginMode === 'password' && (
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordLogin)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="emailOrMobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile No. / Email ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Mobile no. / Email ID"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••••"
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
                    control={passwordForm.control}
                    name="stayLoggedIn"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="flex items-center space-x-1">
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Stay Logged in
                          </FormLabel>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="w-4 h-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Keep me signed in for 30 days</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={() => setIsForgotPasswordOpen(true)}
                    className="text-sky-500 hover:text-sky-600 p-0 h-auto"
                  >
                    Forgot Password?
                  </Button>
                </div>

                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full py-6"
                    disabled={passwordForm.formState.isSubmitting}
                  >
                    {passwordForm.formState.isSubmitting ? "Signing in..." : "Login"}
                  </Button>

                  <div className="text-center text-gray-500">OR</div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-sky-500 text-sky-500 hover:bg-sky-50 rounded-full py-6"
                    onClick={() => setLoginMode('otp-request')}
                  >
                    Login with OTP
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {loginMode === 'otp-request' && (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit((data) => handleOtpRequest(data))} className="space-y-4">
                <FormField
                  control={otpForm.control}
                  name="emailOrMobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile No. / Email ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Mobile no. / Email ID"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={otpForm.control}
                  name="stayLoggedIn"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="flex items-center space-x-1">
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          Stay Logged in
                        </FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Keep me signed in for 30 days</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full py-6"
                  disabled={otpForm.formState.isSubmitting}
                >
                  {otpForm.formState.isSubmitting ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            </Form>
          )}

          {loginMode === 'otp-verify' && (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(handleOtpLogin)} className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    OTP sent to {formatDisplayValue(otpForm.getValues('emailOrMobile'))}
                  </p>
                </div>

                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter 6-digit OTP</FormLabel>
                      <FormControl>
                        <div className="flex justify-center">
                          <InputOTP
                            maxLength={6}
                            value={field.value}
                            onChange={field.onChange}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-center">
                  {otpTimer > 0 ? (
                    <p className="text-sm text-gray-600">
                      Resend OTP in {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, '0')}
                    </p>
                  ) : (
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      onClick={handleResendOtp}
                      disabled={resendCooldown > 0}
                      className="text-sky-500 hover:text-sky-600"
                    >
                      {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                    </Button>
                  )}
                </div>

                <FormField
                  control={otpForm.control}
                  name="stayLoggedIn"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="flex items-center space-x-1">
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          Stay Logged in
                        </FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Keep me signed in for 30 days</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full py-6"
                  disabled={otpForm.formState.isSubmitting}
                >
                  {otpForm.formState.isSubmitting ? "Verifying..." : "Verify & Login"}
                </Button>
              </form>
            </Form>
          )}

          <div className="text-center text-sm text-gray-600">
            New to Shaadi?{' '}
            <Button variant="link" size="sm" className="text-gray-600 hover:text-gray-800 p-0 h-auto font-medium">
              Sign Up Free ›
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Forgot Password Modal */}
      <Dialog open={isForgotPasswordOpen} onOpenChange={resetForgotPasswordFlow}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              {forgotPasswordStep === 'request' && 'Forgot Password?'}
              {forgotPasswordStep === 'verify' && 'Enter OTP'}
              {forgotPasswordStep === 'reset' && 'Reset Password'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {forgotPasswordStep === 'request' && (
              <Form {...forgotPasswordForm}>
                <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPasswordRequest)} className="space-y-4">
                  <FormField
                    control={forgotPasswordForm.control}
                    name="emailOrMobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter your Email ID or Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email ID or Mobile Number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                    disabled={forgotPasswordForm.formState.isSubmitting}
                  >
                    {forgotPasswordForm.formState.isSubmitting ? "Sending OTP..." : "Send Reset OTP"}
                  </Button>
                </form>
              </Form>
            )}

            {forgotPasswordStep === 'verify' && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Reset OTP sent to {formatDisplayValue(forgotPasswordContact)}
                  </p>
                </div>

                <Form {...resetPasswordForm}>
                  <form onSubmit={resetPasswordForm.handleSubmit(() => setForgotPasswordStep('reset'))} className="space-y-4">
                    <FormField
                      control={resetPasswordForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter 6-digit OTP</FormLabel>
                          <FormControl>
                            <div className="flex justify-center">
                              <InputOTP
                                maxLength={6}
                                value={field.value}
                                onChange={field.onChange}
                              >
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="text-center">
                      {otpTimer > 0 ? (
                        <p className="text-sm text-gray-600">
                          Resend OTP in {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, '0')}
                        </p>
                      ) : (
                        <Button
                          type="button"
                          variant="link"
                          size="sm"
                          onClick={handleResendOtp}
                          disabled={resendCooldown > 0}
                          className="text-sky-500 hover:text-sky-600"
                        >
                          {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                        </Button>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                      disabled={resetPasswordForm.formState.isSubmitting}
                    >
                      Verify OTP
                    </Button>
                  </form>
                </Form>
              </div>
            )}

            {forgotPasswordStep === 'reset' && (
              <Form {...resetPasswordForm}>
                <form onSubmit={resetPasswordForm.handleSubmit(handlePasswordReset)} className="space-y-4">
                  <FormField
                    control={resetPasswordForm.control}
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
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
                    control={resetPasswordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
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
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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

                  <Button
                    type="submit"
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                    disabled={resetPasswordForm.formState.isSubmitting}
                  >
                    {resetPasswordForm.formState.isSubmitting ? "Updating Password..." : "Update Password"}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { LoginOptions };
export default LoginOptions;
