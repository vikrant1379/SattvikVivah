import { Switch, Route } from "wouter";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import ProfileBrowser from "@/components/profile-browser";
import ProfileDetailPage from "@/components/profile-detail-page";

export default function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/browse" component={ProfileBrowser} />
      <Route path="/profile/:profileId" component={ProfileDetailPage} />
      <Route component={NotFound} />
    </Switch>
  );
}