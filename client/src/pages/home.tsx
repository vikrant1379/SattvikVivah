import { memo } from "react";
import Header from "@/components/header";
import ProfileBrowser from "@/components/profile-browser";
import Footer from "@/components/footer";

const Home = memo(() => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ProfileBrowser />
      </main>
      <Footer />
    </div>
  );
});

Home.displayName = "Home";

export default Home;