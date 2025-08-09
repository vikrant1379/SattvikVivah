import { memo } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import DailyInspiration from "@/components/daily-inspiration";
import ThreeSacredSteps from "@/components/three-sacred-steps";
import SuccessStoriesCarousel from "@/components/success-stories-carousel";
import MembershipPlans from "@/components/membership-plans";
import SattvikConnectPreview from "@/components/sattvik-connect-preview";
import Footer from "@/components/footer";
import SpiritualFilterSidebar from "@/components/spiritual-filter-sidebar";

const Home = memo(() => {
  return (
    <div className="bg-background font-sans leading-relaxed">
      <Header />
      
      <div className="flex min-h-screen">
        <SpiritualFilterSidebar />
        
        <main className="flex-1 overflow-x-hidden">
          <HeroSection />
          <DailyInspiration />
          <ThreeSacredSteps />
          <SuccessStoriesCarousel />
          <MembershipPlans />
          <SattvikConnectPreview />
        </main>
      </div>
      
      <Footer />
    </div>
  );
});

Home.displayName = "Home";

export default Home;
