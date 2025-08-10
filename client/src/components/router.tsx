import { Route, Switch, useLocation } from "wouter";
import { Suspense, lazy, useEffect, memo, useMemo, useRef } from "react";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import ProfileDetailPage from "@/components/profile-detail-page";

// Lazy load heavy components
const ProfileDetailModal = lazy(() => import("@/components/profile-detail-modal"));

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
        {/* Always render home but control visibility */}
        <div style={{ display: location === '/' ? 'block' : 'none' }}>
          {homeInstance}
        </div>
        
        {/* Other routes */}
        {location !== '/' && (
          <Switch>
            <Route path="/profile/:id">
              {(params) => <ProfileDetailPage profileId={params.id} />}
            </Route>
            <Route component={NotFound} />
          </Switch>
        )}
      </div>
    </Suspense>
  );
});

AppRouter.displayName = 'AppRouter';

export default AppRouter;