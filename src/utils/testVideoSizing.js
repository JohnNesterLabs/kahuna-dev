// Test utility to verify video sizing works correctly

import { getGSAPConfig, getVideoConfig } from '../config/videoConfig';

export const testVideoSizing = () => {
  console.log('=== Video Sizing Test ===');
  
  const sections = ['section1', 'section1To2', 'section2', 'section2To3', 'section3', 'section3To4'];
  const devices = ['mobile', 'tablet', 'desktop'];
  
  sections.forEach(section => {
    console.log(`\n--- ${section.toUpperCase()} ---`);
    
    devices.forEach(device => {
      const config = getVideoConfig(section, device);
      const gsapConfig = getGSAPConfig(section, device);
      
      console.log(`${device}:`);
      console.log(`  Original: ${config.width} x ${config.height} (scale: ${config.scale})`);
      console.log(`  GSAP: ${gsapConfig.width} x ${gsapConfig.height} (scale: ${gsapConfig.scale})`);
      
      // Calculate expected dimensions
      const width = parseFloat(config.width);
      const height = parseFloat(config.height);
      const scale = config.scale;
      const expectedWidth = width * scale;
      const expectedHeight = height * scale;
      
      console.log(`  Expected: ${expectedWidth}px x ${expectedHeight}px`);
      
      // Verify calculations
      const actualWidth = parseFloat(gsapConfig.width);
      const actualHeight = parseFloat(gsapConfig.height);
      
      if (Math.abs(actualWidth - expectedWidth) < 0.1 && Math.abs(actualHeight - expectedHeight) < 0.1) {
        console.log(`  ✅ Correct`);
      } else {
        console.log(`  ❌ Mismatch`);
      }
    });
  });
};

// Test specific desktop configurations
export const testDesktopSizing = () => {
  console.log('=== Desktop Video Sizing Test ===');
  
  const sections = ['section1', 'section1To2', 'section2', 'section2To3', 'section3', 'section3To4'];
  
  sections.forEach(section => {
    const config = getGSAPConfig(section, 'desktop');
    console.log(`${section}: ${config.width} x ${config.height}`);
  });
};

// Test scale calculations
export const testScaleCalculations = () => {
  console.log('=== Scale Calculation Test ===');
  
  const testCases = [
    { width: '700px', height: '394px', scale: 1 },
    { width: '700px', height: '394px', scale: 0.9 },
    { width: '700px', height: '394px', scale: 0.8 },
    { width: '700px', height: '394px', scale: 0.6 }
  ];
  
  testCases.forEach((testCase, index) => {
    const width = parseFloat(testCase.width);
    const height = parseFloat(testCase.height);
    const scale = testCase.scale;
    
    const expectedWidth = width * scale;
    const expectedHeight = height * scale;
    
    console.log(`Test ${index + 1}: ${testCase.width} x ${testCase.height} (scale: ${scale})`);
    console.log(`  Result: ${expectedWidth}px x ${expectedHeight}px`);
  });
};

// Auto-run in development
if (process.env.NODE_ENV === 'development') {
  // Export for manual testing
  window.testVideoSizing = testVideoSizing;
  window.testDesktopSizing = testDesktopSizing;
  window.testScaleCalculations = testScaleCalculations;
  
  console.log('Video sizing tests available as:');
  console.log('- window.testVideoSizing()');
  console.log('- window.testDesktopSizing()');
  console.log('- window.testScaleCalculations()');
}
