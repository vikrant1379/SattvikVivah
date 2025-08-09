
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import ProfileBrowser from "@/components/profile-browser";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<ProfileBrowser />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
