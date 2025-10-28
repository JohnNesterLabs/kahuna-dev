import React from 'react';
import {
  Header,
  Navigation,
  FloatingVideo,
  ConsolidatedSections,
  PinnedSection,
  Footer
} from './index';
import { useNavigation, useScrollAnimations } from '../hooks';

const Home = () => {
  const { activeSection, setActiveSection, handleSectionClick } = useNavigation();
  const { videoRef } = useScrollAnimations(activeSection, setActiveSection);

  return (
    <div className="app-container">
      {/* Header - Visible in sections 1, 2, 3, 4 but not footer */}
      <Header />

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

      {/* Footer Section - Header hidden here */}
      <Footer />
    </div>
  );
};

export default Home;
