import React from 'react';
import {
  Navigation,
  FloatingVideo,
  ConsolidatedSections,
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

      {/* Consolidated Sections 1, 2, 3 */}
      <ConsolidatedSections />

      {/* Section 4 - Pinned Section */}
      <PinnedSection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
