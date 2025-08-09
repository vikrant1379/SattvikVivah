
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
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const Home = memo(() => {
  return (
    <div className="bg-gray-50 font-sans leading-relaxed min-h-screen">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <SpiritualFilterSidebar />
          
          <SidebarInset className="flex-1">
            <Header />
            
            <main className="flex-1 bg-white">
              <div className="container mx-auto px-4 lg:px-6">
                <HeroSection />
                <div className="space-y-12 py-8">
                  <DailyInspiration />
                  <ThreeSacredSteps />
                  <SuccessStoriesCarousel />
                  <MembershipPlans />
                  <SattvikConnectPreview />
                </div>
              </div>
            </main>
            
            <Footer />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
});

Home.displayName = "Home";

export default Home;
