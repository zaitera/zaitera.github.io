import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useEffect } from "react";
import { initGA, setupSectionTracking } from "./lib/analytics";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import CoreExpertise from "./components/CoreExpertise";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function AppContent() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <CoreExpertise />
      <Experience />
      <Education />
      <Awards />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    // Initialize Google Analytics when the app starts
    initGA('G-VJ87CS1PZ0');
    
    // Setup section tracking after components mount
    const timer = setTimeout(() => {
      setupSectionTracking();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
