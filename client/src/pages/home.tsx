
import { memo, useRef, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProfileBrowser from "@/components/profile-browser";

const Home = memo(() => {
  const homeRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      if (process.env.NODE_ENV === 'development') {
        console.log("Home component initialized and cached");
      }
    }
  }, []);

  return (
    <div ref={homeRef} className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ProfileBrowser />
      </main>
      <Footer />
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
