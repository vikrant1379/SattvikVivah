import { Route, Switch, useLocation } from "wouter";
import { Suspense, lazy, useEffect, memo } from "react";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import ProfileDetailPage from "@/components/profile-detail-page";

// Lazy load heavy components
const ProfileDetailModal = lazy(() => import("@/components/profile-detail-modal"));

const AppRouter = memo(() => {
  const [location] = useLocation();

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
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/profile/:id">
          {(params) => <ProfileDetailPage profileId={params.id} />}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
});

AppRouter.displayName = 'AppRouter';

export default AppRouter;