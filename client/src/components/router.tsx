import { Route, Switch, useLocation } from "wouter";
import { Suspense, lazy, useEffect, memo, useMemo, useRef } from "react";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import ProfileDetailPage from "@/components/profile-detail-page";
import ProfileBrowser from "@/components/profile-browser";
import { AccountPage } from "@/pages/account";
import { ProfileEditPage } from "@/pages/profile-edit";
import { PartnerPreferencesPage } from "@/features/partner-preferences";
import { useAuth } from "@/hooks/use-auth"; // Import useAuth hook

// Lazy load heavy components
const ProfileDetailModal = lazy(() => import("@/components/profile-detail-modal"));

// A wrapper component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Use the useAuth hook to check authentication status
  const location = useLocation();

  // If the user is not authenticated, redirect them to the home page
  if (!isAuthenticated) {
    // You might want to redirect to a login page instead, depending on your app's flow
    return <Home />;
  }

  return children;
};

const AppRouter = memo(() => {
  const [location] = useLocation();
  const homeInstanceRef = useRef<JSX.Element | null>(null);

  // Keep home page in memory by creating it once and reusing
  const homeInstance = useMemo(() => {
    if (!homeInstanceRef.current) {
      homeInstanceRef.current = <Home />;
    }
    return homeInstanceRef.current;
  }, []);

  // Remove debug logging in production-like environment
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("=== Router Debug ===");
      console.log("Current location:", location);
      console.log("Window pathname:", window.location.pathname);
      console.log("Location type:", typeof location);
      console.log("Is profile route?", location?.startsWith('/profile/'));
    }
  }, [location]);

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <div className="router-container">
        <Switch>
          <Route path="/" exact>
            {homeInstance}
          </Route>

          <Route path="/profiles" exact>
            <ProtectedRoute> {/* Wrap the ProfileBrowser with ProtectedRoute */}
              <div className="min-h-screen flex flex-col">
                <ProfileBrowser />
              </div>
            </ProtectedRoute>
          </Route>

          <Route path="/account" component={AccountPage} />
          <Route path="/profile/edit" component={ProfileEditPage} />
          <Route path="/profile/preferences" component={PartnerPreferencesPage} />

          <Route path="/profile/:id">
            {(params) => (
              <ProtectedRoute>
                <div className="min-h-screen flex flex-col">
                  <ProfileDetailPage profileId={params.id} />
                </div>
              </ProtectedRoute>
            )}
          </Route>

          <Route component={NotFound} />
        </Switch>
      </div>
    </Suspense>
  );
});

AppRouter.displayName = 'AppRouter';

export default AppRouter;