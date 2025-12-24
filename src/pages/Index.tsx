import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Topics } from "@/components/sections/Topics";
import { Visualizer } from "@/components/sections/Visualizer";
import { Quiz } from "@/components/sections/Quiz";
import { Practice } from "@/components/sections/Practice";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Topics />
      <Visualizer />
      <Quiz />
      <Practice />
      <Features />
      <Footer />
    </main>
  );
};

export default Index;
