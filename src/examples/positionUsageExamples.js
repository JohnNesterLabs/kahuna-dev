// Practical examples of using the video position system

import { 
  getVideoPosition, 
  getGSAPPosition, 
  applyVideoPosition,
  getAllDevicePositions,
  getAllSectionPositions,
  createCustomPosition,
  validatePosition
} from '../config/videoPositionConfig';

// Example 1: Basic position retrieval
export const basicPositionExample = () => {
  console.log('=== Basic Position Examples ===');
  
  // Get position for section 1 on desktop
  const section1Desktop = getVideoPosition('section1', 'desktop');
  console.log('Section 1 Desktop:', section1Desktop);
  
  // Get position for section 2 on mobile
  const section2Mobile = getVideoPosition('section2', 'mobile');
  console.log('Section 2 Mobile:', section2Mobile);
  
  // Get position for current device
  const section3Current = getVideoPosition('section3');
  console.log('Section 3 Current Device:', section3Current);
};

// Example 2: GSAP animation setup
export const gsapAnimationExample = (videoRef) => {
  if (!videoRef.current) return;
  
  console.log('=== GSAP Animation Examples ===');
  
  // Get GSAP-compatible positions
  const section1Pos = getGSAPPosition('section1', 'desktop');
  const section2Pos = getGSAPPosition('section2', 'desktop');
  
  console.log('GSAP Section 1:', section1Pos);
  console.log('GSAP Section 2:', section2Pos);
  
  // Example GSAP animation (would be used with actual GSAP)
  return {
    from: section1Pos,
    to: section2Pos,
    duration: 1,
    ease: "power2.inOut"
  };
};

// Example 3: Apply position to DOM element
export const applyPositionExample = (videoElement) => {
  if (!videoElement) return;
  
  console.log('=== Apply Position Examples ===');
  
  // Apply section 1 position
  applyVideoPosition(videoElement, 'section1', 'desktop');
  console.log('Applied section 1 position to element');
  
  // Apply section 2 position after delay
  setTimeout(() => {
    applyVideoPosition(videoElement, 'section2', 'desktop');
    console.log('Applied section 2 position to element');
  }, 1000);
};

// Example 4: Get all device positions for a section
export const allDevicePositionsExample = () => {
  console.log('=== All Device Positions Example ===');
  
  const section1AllDevices = getAllDevicePositions('section1');
  console.log('Section 1 All Devices:', section1AllDevices);
  
  const section2AllDevices = getAllDevicePositions('section2');
  console.log('Section 2 All Devices:', section2AllDevices);
};

// Example 5: Get all section positions for current device
export const allSectionPositionsExample = () => {
  console.log('=== All Section Positions Example ===');
  
  const allSections = getAllSectionPositions();
  console.log('All Sections Current Device:', allSections);
  
  const allSectionsMobile = getAllSectionPositions('mobile');
  console.log('All Sections Mobile:', allSectionsMobile);
};

// Example 6: Create custom positions
export const customPositionExample = () => {
  console.log('=== Custom Position Examples ===');
  
  // Create custom position based on section 1
  const customPos1 = createCustomPosition('section1', 'desktop', {
    bottom: '20%',
    left: '60%'
  });
  console.log('Custom Position 1:', customPos1);
  
  // Create custom position based on section 2
  const customPos2 = createCustomPosition('section2', 'mobile', {
    bottom: '40%',
    left: '70%',
    zIndex: 50
  });
  console.log('Custom Position 2:', customPos2);
};

// Example 7: Position validation
export const validationExample = () => {
  console.log('=== Position Validation Examples ===');
  
  const sections = ['section1', 'section2', 'section3', 'section1To2', 'section2To3', 'section3To4'];
  
  sections.forEach(section => {
    const validation = validatePosition(section);
    console.log(`${section}: ${validation.isValid ? '✅ Valid' : '❌ Invalid'}`);
    if (!validation.isValid) {
      console.log(`  Missing: ${validation.missingProps.join(', ')}`);
    }
  });
};

// Example 8: Responsive position handling
export const responsivePositionExample = () => {
  console.log('=== Responsive Position Example ===');
  
  const handleResize = () => {
    const device = window.innerWidth <= 768 ? 'mobile' : 
                   window.innerWidth <= 1024 ? 'tablet' : 'desktop';
    
    console.log(`Current device: ${device}`);
    
    // Get positions for current device
    const section1Pos = getVideoPosition('section1', device);
    const section2Pos = getVideoPosition('section2', device);
    
    console.log(`Section 1 (${device}):`, section1Pos);
    console.log(`Section 2 (${device}):`, section2Pos);
  };
  
  // Simulate resize
  handleResize();
  
  return handleResize;
};

// Example 9: Position animation sequence
export const animationSequenceExample = () => {
  console.log('=== Animation Sequence Example ===');
  
  const sequence = [
    { section: 'section1', duration: 0.5 },
    { section: 'section1To2', duration: 1 },
    { section: 'section2', duration: 0.5 },
    { section: 'section2To3', duration: 1 },
    { section: 'section3', duration: 0.5 },
    { section: 'section3To4', duration: 0.5 }
  ];
  
  const device = 'desktop';
  
  const animationSteps = sequence.map(step => ({
    ...step,
    position: getGSAPPosition(step.section, device)
  }));
  
  console.log('Animation Sequence:', animationSteps);
  return animationSteps;
};

// Example 10: Position comparison
export const positionComparisonExample = () => {
  console.log('=== Position Comparison Example ===');
  
  const section1Mobile = getVideoPosition('section1', 'mobile');
  const section1Desktop = getVideoPosition('section1', 'desktop');
  
  console.log('Section 1 Mobile vs Desktop:');
  console.log('Mobile:', section1Mobile);
  console.log('Desktop:', section1Desktop);
  
  // Compare positions
  const differences = [];
  Object.keys(section1Mobile).forEach(key => {
    if (section1Mobile[key] !== section1Desktop[key]) {
      differences.push({
        property: key,
        mobile: section1Mobile[key],
        desktop: section1Desktop[key]
      });
    }
  });
  
  console.log('Differences:', differences);
};

// Run all examples
export const runAllExamples = () => {
  console.log('🚀 Running All Position Examples...\n');
  
  basicPositionExample();
  console.log('\n');
  
  allDevicePositionsExample();
  console.log('\n');
  
  allSectionPositionsExample();
  console.log('\n');
  
  customPositionExample();
  console.log('\n');
  
  validationExample();
  console.log('\n');
  
  responsivePositionExample();
  console.log('\n');
  
  animationSequenceExample();
  console.log('\n');
  
  positionComparisonExample();
  
  console.log('\n✅ All examples completed!');
};

// Auto-run in development
if (process.env.NODE_ENV === 'development') {
  // Export for manual testing
  window.positionExamples = {
    basicPositionExample,
    gsapAnimationExample,
    applyPositionExample,
    allDevicePositionsExample,
    allSectionPositionsExample,
    customPositionExample,
    validationExample,
    responsivePositionExample,
    animationSequenceExample,
    positionComparisonExample,
    runAllExamples
  };
  
  console.log('Position examples available as window.positionExamples');
}
