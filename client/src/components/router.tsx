import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import ProfileBrowser from "@/components/profile-browser";
import ProfileDetailPage from "@/components/profile-detail-page";

const AppRouter = () => {
  const [location] = useLocation();

  useEffect(() => {
    console.log("=== Router Debug ===");
    console.log("Current location:", location);
    console.log("Window pathname:", window.location.pathname);
    console.log("Location type:", typeof location);
    console.log("Is profile route?", location.startsWith('/profile/'));
    if (location.startsWith('/profile/')) {
      const profileId = location.split('/')[2];
      console.log("Extracted profile ID from router:", profileId);
    }
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/browse" component={Home} />
      <Route path="/profile/:profileId" component={ProfileDetailPage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRouter;