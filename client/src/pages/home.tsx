import { memo } from "react";
import Header from "@/components/header";
import ProfileBrowser from "@/components/profile-browser";
import Footer from "@/components/footer";

const Home = memo(() => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <ProfileBrowser />
      <Footer />
    </div>
  );
});

Home.displayName = "Home";

export default Home;