import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import LoreSection from './components/sections/LoreSection';
import TechnologySection from './components/sections/TechnologySection';
import CommunitySection from './components/sections/CommunitySection';
import JoinMissionSection from './components/sections/JoinMissionSection';
import ParticleBackground from './components/ui/ParticleBackground';
import StoryIntro from './components/story/StoryIntro';

function App() {
  const [introCompleted, setIntroCompleted] = useState(false);

  if (!introCompleted) {
    return <StoryIntro onComplete={() => setIntroCompleted(true)} />;
  }

  return (
    <div className="relative min-h-screen bg-black text-white font-spaceMono overflow-hidden">
      <ParticleBackground />
      <div className="scanline-overlay"></div>
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <LoreSection />
          <TechnologySection />
          <CommunitySection />
          <JoinMissionSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;