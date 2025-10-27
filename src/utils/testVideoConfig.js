// Test utility to verify video configuration
import { getVideoConfig, getCurrentDeviceType } from '../config/videoConfig';

export const testVideoConfig = () => {
  console.log('=== Video Configuration Test ===');
  
  // Test device type detection
  const deviceType = getCurrentDeviceType();
  console.log('Current device type:', deviceType);
  
  // Test all sections for current device
  const sections = ['section1', 'section1To2', 'section2', 'section2To3', 'section3', 'section3To4'];
  
  sections.forEach(section => {
    const config = getVideoConfig(section);
    console.log(`${section} (${deviceType}):`, {
      width: config.width,
      height: config.height,
      scale: config.scale,
      borderRadius: config.borderRadius
    });
  });
  
  // Test responsive breakpoints
  console.log('\n=== Responsive Breakpoint Test ===');
  const testWidths = [320, 768, 900, 1024, 1200, 1920];
  
  testWidths.forEach(width => {
    // Mock window.innerWidth for testing
    const originalWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    
    const device = getCurrentDeviceType();
    const config = getVideoConfig('section1', device);
    
    console.log(`Width ${width}px -> ${device}:`, {
      width: config.width,
      height: config.height
    });
    
    // Restore original width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalWidth,
    });
  });
};

// Auto-run test in development
if (process.env.NODE_ENV === 'development') {
  // Run test after a short delay to ensure everything is loaded
  setTimeout(testVideoConfig, 1000);
}
