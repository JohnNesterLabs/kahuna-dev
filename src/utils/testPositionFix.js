// Test utility to verify position configuration is working correctly

import { getGSAPPosition, getCurrentDeviceType } from '../config/videoPositionConfig';
import { getGSAPConfig } from '../config/videoConfig';

export const testPositionConfiguration = () => {
  console.log('=== Position Configuration Test ===');
  
  const deviceType = getCurrentDeviceType();
  console.log('Current Device Type:', deviceType);
  
  const section1Position = getGSAPPosition('section1', deviceType);
  const section1Size = getGSAPConfig('section1', deviceType);
  
  console.log('Section 1 Position:', section1Position);
  console.log('Section 1 Size:', section1Size);
  
  const combinedConfig = {
    ...section1Size,
    ...section1Position
  };
  
  console.log('Combined Config for GSAP:', combinedConfig);
  
  // Expected values for section 1
  const expectedPosition = {
    bottom: deviceType === 'mobile' ? '5%' : deviceType === 'tablet' ? '8%' : '10%',
    left: '50%',
    x: '-50%',
    zIndex: 40
  };
  
  console.log('Expected Position:', expectedPosition);
  
  // Check if position matches expected
  const positionMatches = 
    section1Position.bottom === expectedPosition.bottom &&
    section1Position.left === expectedPosition.left &&
    section1Position.x === expectedPosition.x &&
    section1Position.zIndex === expectedPosition.zIndex;
  
  console.log('Position Matches Expected:', positionMatches ? '✅' : '❌');
  
  return {
    deviceType,
    section1Position,
    section1Size,
    combinedConfig,
    positionMatches
  };
};

export const testAllSectionPositions = () => {
  console.log('=== All Section Positions Test ===');
  
  const deviceType = getCurrentDeviceType();
  const sections = ['section1', 'section1To2', 'section2', 'section2To3', 'section3', 'section3To4'];
  
  sections.forEach(section => {
    const position = getGSAPPosition(section, deviceType);
    console.log(`${section}:`, position);
  });
};

export const debugPositionIssue = () => {
  console.log('=== Debugging Position Issue ===');
  
  // Check if CSS is interfering
  const videoElement = document.querySelector('.floating-video');
  if (videoElement) {
    const computedStyle = window.getComputedStyle(videoElement);
    console.log('CSS Computed Styles:');
    console.log('  position:', computedStyle.position);
    console.log('  bottom:', computedStyle.bottom);
    console.log('  left:', computedStyle.left);
    console.log('  transform:', computedStyle.transform);
    console.log('  z-index:', computedStyle.zIndex);
    
    // Check if GSAP has set any styles
    const gsapStyles = videoElement.style;
    console.log('GSAP Inline Styles:');
    console.log('  position:', gsapStyles.position);
    console.log('  bottom:', gsapStyles.bottom);
    console.log('  left:', gsapStyles.left);
    console.log('  transform:', gsapStyles.transform);
    console.log('  z-index:', gsapStyles.zIndex);
  } else {
    console.log('Video element not found');
  }
};

// Auto-run in development
if (process.env.NODE_ENV === 'development') {
  // Export for manual testing
  window.testPositionConfiguration = testPositionConfiguration;
  window.testAllSectionPositions = testAllSectionPositions;
  window.debugPositionIssue = debugPositionIssue;
  
  console.log('Position test functions available as:');
  console.log('- window.testPositionConfiguration()');
  console.log('- window.testAllSectionPositions()');
  console.log('- window.debugPositionIssue()');
}
