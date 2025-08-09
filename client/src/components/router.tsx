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
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/browse" component={ProfileBrowser} />
      <Route path="/profile/:profileId" component={ProfileDetailPage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRouter;