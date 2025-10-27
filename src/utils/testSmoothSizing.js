// Test utility to verify smooth video sizing
import { gsap } from 'gsap';
import { getVideoConfig } from '../config/videoConfig';

export const testSmoothSizing = (videoRef) => {
  if (!videoRef.current) {
    console.log('Video ref not available for testing');
    return;
  }

  console.log('=== Testing Smooth Video Sizing ===');
  
  const sections = ['section1', 'section1To2', 'section2', 'section2To3', 'section3', 'section3To4'];
  
  sections.forEach((section, index) => {
    const config = getVideoConfig(section);
    console.log(`Testing ${section}:`, config);
    
    // Animate to this section's size
    gsap.to(videoRef.current, {
      width: config.width,
      height: config.height,
      borderRadius: config.borderRadius,
      scale: config.scale,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        console.log(`✓ ${section} sizing applied successfully`);
      }
    });
  });
};

// Auto-run test in development
if (process.env.NODE_ENV === 'development') {
  // Export for manual testing
  window.testSmoothSizing = testSmoothSizing;
  console.log('Smooth sizing test available as window.testSmoothSizing(videoRef)');
}
