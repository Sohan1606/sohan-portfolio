import { useState, useCallback } from "react";
import Navigation from "./components/Navigation";
import SystemBoot from "./components/SystemBoot";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Grain from "./components/Grain";
import Hero from "./sections/Hero";
import TechMarquee from "./components/TechMarquee";
import Identity from "./sections/Identity";
import Manifesto from "./sections/Manifesto";
import Stack from "./sections/Stack";
import Work from "./sections/Work";
import Lab from "./sections/Lab";
import Journey from "./sections/Journey";
import Now from "./sections/Now";
import Contact from "./sections/Contact";
import TerminalEgg from "./components/TerminalEgg";
import KonamiNotification from "./components/KonamiNotification";
import { useEasterEggs } from "./hooks/useEasterEggs";
import { useScrollLock } from "./hooks/useScrollLock";

function App() {
  const [booted, setBooted] = useState(false);
  const handleBoot = useCallback(() => setBooted(true), []);

  const { terminalOpen, closeTerminal, konamiVisible } = useEasterEggs();
  useScrollLock(terminalOpen);

  return (
    <>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
                   focus:z-[200] focus:px-4 focus:py-2 focus:bg-signal focus:text-ghost
                   focus:font-mono focus:text-xs focus:tracking-widest focus:uppercase
                   focus-visible:outline-ghost"
      >
        Skip to content
      </a>

      {/* System boot sequence — fast, skippable, session-cached */}
      <SystemBoot onComplete={handleBoot} />

      {/* SYSTEM 5.0 chrome — cursor, scroll depth, film grain */}
      <CustomCursor />
      <ScrollProgress />
      <Grain />

      {/* Main content — visible immediately in DOM for SEO, shown after boot */}
      <div className={booted ? "opacity-100" : "opacity-0"}
        style={{ transition: "opacity 0.3s ease" }}>
        <Navigation />
        <main id="main-content">
          <Hero />
          <TechMarquee />
          <Identity />
          <Manifesto />
          <Work />
          <Lab />
          <Stack />
          <Journey />
          <Now />
          <Contact />
        </main>
      </div>

      <TerminalEgg isOpen={terminalOpen} onClose={closeTerminal} />
      <KonamiNotification visible={konamiVisible} />
    </>
  );
}

export default App;
