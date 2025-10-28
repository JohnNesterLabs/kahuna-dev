// Debug utility to check mobile position issues

import { getCurrentDeviceType, getGSAPPosition } from '../config/videoPositionConfig';

export const debugMobilePosition = () => {
  console.log('=== Mobile Position Debug ===');
  
  // Check device detection
  const deviceType = getCurrentDeviceType();
  console.log('Detected Device Type:', deviceType);
  
  // Check window size
  console.log('Window Size:', {
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Check media queries
  const mobileQuery = window.matchMedia('(max-width: 768px)');
  const tabletQuery = window.matchMedia('(min-width: 769px) and (max-width: 1024px)');
  const desktopQuery = window.matchMedia('(min-width: 1025px)');
  
  console.log('Media Query Matches:', {
    mobile: mobileQuery.matches,
    tablet: tabletQuery.matches,
    desktop: desktopQuery.matches
  });
  
  // Get positions for all sections
  const sections = ['section1', 'section1To2', 'section2', 'section2To3', 'section3', 'section3To4'];
  console.log('All Section Positions:');
  sections.forEach(section => {
    const position = getGSAPPosition(section, 'mobile');
    console.log(`  ${section}:`, position);
  });
  
  // Check video element
  const videoElement = document.querySelector('.floating-video');
  if (videoElement) {
    const computedStyle = window.getComputedStyle(videoElement);
    const inlineStyle = videoElement.style;
    
    console.log('Video Element Styles:');
    console.log('  Computed bottom:', computedStyle.bottom);
    console.log('  Computed left:', computedStyle.left);
    console.log('  Computed transform:', computedStyle.transform);
    console.log('  Inline bottom:', inlineStyle.bottom);
    console.log('  Inline left:', inlineStyle.left);
    console.log('  Inline transform:', inlineStyle.transform);
    
    // Check if GSAP has any transforms
    const gsapData = videoElement._gsap;
    if (gsapData) {
      console.log('GSAP Data:', gsapData);
    }
  }
  
  return {
    deviceType,
    windowSize: { width: window.innerWidth, height: window.innerHeight },
    mediaQueries: {
      mobile: mobileQuery.matches,
      tablet: tabletQuery.matches,
      desktop: desktopQuery.matches
    }
  };
};

export const forceMobilePosition = () => {
  console.log('=== Forcing Mobile Position ===');
  
  const videoElement = document.querySelector('.floating-video');
  if (videoElement) {
    const mobilePosition = getGSAPPosition('section1', 'mobile');
    console.log('Setting mobile position:', mobilePosition);
    
    // Force set the position
    gsap.set(videoElement, mobilePosition);
    
    console.log('Position set successfully');
  } else {
    console.log('Video element not found');
  }
};

// Auto-run in development
if (process.env.NODE_ENV === 'development') {
  window.debugMobilePosition = debugMobilePosition;
  window.forceMobilePosition = forceMobilePosition;
  
  console.log('Mobile debug functions available:');
  console.log('- window.debugMobilePosition()');
  console.log('- window.forceMobilePosition()');
}
