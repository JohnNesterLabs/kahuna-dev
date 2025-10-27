// Examples of using the new scale-only video configuration system

import { 
  getVideoConfig, 
  getGSAPConfig, 
  getBaseSize, 
  getSectionScale,
  updateBaseSize,
  updateSectionScale
} from '../config/videoConfig';

// Example 1: Basic scale-only usage
export const basicScaleExample = () => {
  console.log('=== Basic Scale-Only Examples ===');
  
  // Get base size for desktop
  const baseSize = getBaseSize('desktop');
  console.log('Desktop Base Size:', baseSize);
  
  // Get different section scales
  const sections = ['section1', 'section2', 'section3', 'section3To4'];
  sections.forEach(section => {
    const scale = getSectionScale(section, 'desktop');
    const config = getVideoConfig(section, 'desktop');
    console.log(`${section}: scale ${scale} → ${config.width} x ${config.height}`);
  });
};

// Example 2: GSAP animation with scale
export const gsapScaleExample = (videoRef) => {
  if (!videoRef.current) return;
  
  console.log('=== GSAP Scale Animation Example ===');
  
  // Get GSAP configs for different sections
  const section1Config = getGSAPConfig('section1', 'desktop');
  const section2Config = getGSAPConfig('section2', 'desktop');
  const section3Config = getGSAPConfig('section3', 'desktop');
  
  console.log('Section 1 GSAP Config:', section1Config);
  console.log('Section 2 GSAP Config:', section2Config);
  console.log('Section 3 GSAP Config:', section3Config);
  
  // Example animation sequence (would be used with actual GSAP)
  return [
    { section: 'section1', config: section1Config, duration: 0.5 },
    { section: 'section2', config: section2Config, duration: 1 },
    { section: 'section3', config: section3Config, duration: 0.5 }
  ];
};

// Example 3: Dynamic scale updates
export const dynamicScaleExample = () => {
  console.log('=== Dynamic Scale Updates ===');
  
  // Show current scales
  console.log('Before updates:');
  console.log('Section 2 scale:', getSectionScale('section2', 'desktop'));
  console.log('Section 3 scale:', getSectionScale('section3', 'desktop'));
  
  // Update scales
  updateSectionScale('section2', 'desktop', 0.6);
  updateSectionScale('section3', 'desktop', 0.9);
  
  console.log('After updates:');
  console.log('Section 2 scale:', getSectionScale('section2', 'desktop'));
  console.log('Section 3 scale:', getSectionScale('section3', 'desktop'));
  
  // Show resulting configs
  console.log('Section 2 config:', getVideoConfig('section2', 'desktop'));
  console.log('Section 3 config:', getVideoConfig('section3', 'desktop'));
};

// Example 4: Base size updates
export const baseSizeExample = () => {
  console.log('=== Base Size Updates ===');
  
  // Show current base size
  console.log('Current desktop base size:', getBaseSize('desktop'));
  
  // Update base size
  updateBaseSize('desktop', {
    width: '800px',
    height: '450px',
    borderRadius: '20px'
  });
  
  console.log('Updated desktop base size:', getBaseSize('desktop'));
  
  // Show how it affects all sections
  const sections = ['section1', 'section2', 'section3'];
  sections.forEach(section => {
    const config = getVideoConfig(section, 'desktop');
    console.log(`${section}: ${config.width} x ${config.height} (scale: ${config.scale})`);
  });
};

// Example 5: Scale comparison across devices
export const deviceScaleComparison = () => {
  console.log('=== Scale Comparison Across Devices ===');
  
  const devices = ['mobile', 'tablet', 'desktop'];
  const sections = ['section1', 'section2', 'section3'];
  
  console.log('Scale values:');
  sections.forEach(section => {
    console.log(`\n${section}:`);
    devices.forEach(device => {
      const scale = getSectionScale(section, device);
      const baseSize = getBaseSize(device);
      console.log(`  ${device}: scale ${scale} (base: ${baseSize.width} x ${baseSize.height})`);
    });
  });
};

// Example 6: Scale animation sequence
export const scaleAnimationSequence = () => {
  console.log('=== Scale Animation Sequence ===');
  
  const sequence = [
    { section: 'section1', duration: 0.5, description: 'Start full size' },
    { section: 'section1To2', duration: 1, description: 'Shrink to 90%' },
    { section: 'section2', duration: 0.5, description: 'Shrink to 80%' },
    { section: 'section2To3', duration: 1, description: 'Grow to 90%' },
    { section: 'section3', duration: 0.5, description: 'Grow to full size' },
    { section: 'section3To4', duration: 0.5, description: 'Shrink to 60%' }
  ];
  
  const device = 'desktop';
  const baseSize = getBaseSize(device);
  
  console.log(`Animation sequence for ${device} (base: ${baseSize.width} x ${baseSize.height}):`);
  
  sequence.forEach((step, index) => {
    const scale = getSectionScale(step.section, device);
    const config = getGSAPConfig(step.section, device);
    console.log(`${index + 1}. ${step.section}: scale ${scale} → ${config.width} x ${config.height} (${step.description})`);
  });
  
  return sequence;
};

// Example 7: Scale validation
export const scaleValidation = () => {
  console.log('=== Scale Validation ===');
  
  const sections = ['section1', 'section1To2', 'section2', 'section2To3', 'section3', 'section3To4'];
  const devices = ['mobile', 'tablet', 'desktop'];
  
  sections.forEach(section => {
    console.log(`\n${section}:`);
    devices.forEach(device => {
      const scale = getSectionScale(section, device);
      const isValid = scale >= 0 && scale <= 2; // Reasonable scale range
      console.log(`  ${device}: ${scale} ${isValid ? '✅' : '❌'}`);
    });
  });
};

// Example 8: Scale interpolation
export const scaleInterpolation = () => {
  console.log('=== Scale Interpolation Example ===');
  
  const fromScale = getSectionScale('section1', 'desktop'); // 1.0
  const toScale = getSectionScale('section2', 'desktop');   // 0.8
  
  console.log(`Interpolating from scale ${fromScale} to ${toScale}:`);
  
  // Simulate interpolation steps
  const steps = 5;
  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    const interpolatedScale = fromScale + (toScale - fromScale) * progress;
    console.log(`  Step ${i}: ${interpolatedScale.toFixed(2)}`);
  }
};

// Run all examples
export const runAllScaleExamples = () => {
  console.log('🚀 Running All Scale-Only Examples...\n');
  
  basicScaleExample();
  console.log('\n');
  
  dynamicScaleExample();
  console.log('\n');
  
  baseSizeExample();
  console.log('\n');
  
  deviceScaleComparison();
  console.log('\n');
  
  scaleAnimationSequence();
  console.log('\n');
  
  scaleValidation();
  console.log('\n');
  
  scaleInterpolation();
  
  console.log('\n✅ All scale examples completed!');
};

// Auto-run in development
if (process.env.NODE_ENV === 'development') {
  // Export for manual testing
  window.scaleExamples = {
    basicScaleExample,
    gsapScaleExample,
    dynamicScaleExample,
    baseSizeExample,
    deviceScaleComparison,
    scaleAnimationSequence,
    scaleValidation,
    scaleInterpolation,
    runAllScaleExamples
  };
  
  console.log('Scale examples available as window.scaleExamples');
}
