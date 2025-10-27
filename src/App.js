import React from 'react';
import {
  Navigation,
  FloatingVideo,
  HeroSection,
  SmoothScrollingSection,
  InteractiveSection,
  PinnedSection,
  Footer
} from './components';
import { useNavigation, useScrollAnimations } from './hooks';

function App() {
  const { activeSection, setActiveSection, handleSectionClick } = useNavigation();
  const { videoRef } = useScrollAnimations(activeSection, setActiveSection);

  return (
    <div className="app-container">
      {/* Navigation Dots */}
      <Navigation
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      {/* Floating Video */}
      <FloatingVideo ref={videoRef} />

      {/* Section 1 - Hero */}
      <HeroSection />

      {/* Section 2 - Smooth Scrolling */}
      <SmoothScrollingSection />

      {/* Section 3 - Interactive */}
      <InteractiveSection />

      {/* Section 4 - Pinned Section */}
      <PinnedSection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
