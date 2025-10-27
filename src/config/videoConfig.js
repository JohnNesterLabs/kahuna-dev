// Video configuration for different sections and device sizes
export const VIDEO_CONFIG = {
  // Device breakpoints
  breakpoints: {
    mobile: '(max-width: 768px)',
    tablet: '(min-width: 769px) and (max-width: 1024px)',
    desktop: '(min-width: 1025px)'
  },

  // Base video size for each device (used for all sections)
  baseSize: {
    mobile: {
      width: '1400px',
      height: 'auto',
      borderRadius: '12px'
    },
    tablet: {
      width: '1400px',
      height: 'auto',
      borderRadius: '14px'
    },
    desktop: {
      width: '1400px',
      height: 'auto',
      borderRadius: '16px'
    }
  },

  // Scale values for each section (applied to base size)
  sections: {
    // Section 1: Hero section (full size)
    section1: {
      mobile: { scale: 1 },
      tablet: { scale: 1 },
      desktop: { scale: 1.5 }
    },

    // Section 1→2: Transition (slightly smaller)
    section1To2: {
      mobile: { scale: 0.9 },
      tablet: { scale: 0.9 },
      desktop: { scale: 1.6 }
    },

    // Section 2: Smooth scrolling (smaller)
    section2: {
      mobile: { scale: 0.8 },
      tablet: { scale: 0.8 },
      desktop: { scale: 1.6 }
    },

    // Section 2→3: Transition (slightly larger)
    section2To3: {
      mobile: { scale: 0.5 },
      tablet: { scale: 0.9 },
      desktop: { scale: 1.3 }
    },

    // Section 3: Interactive (full size)
    section3: {
      mobile: { scale: 0.5 },
      tablet: { scale: 1 },
      desktop: { scale: 1 }
    },

    // Section 3→4: Fade out (much smaller)
    section3To4: {
      mobile: { scale: 0.6 },
      tablet: { scale: 0.6 },
      desktop: { scale: 1.1 }
    }
  },

  // Animation timing and easing
  animation: {
    duration: 1,
    ease: "power2.inOut"
  }
};

// Helper function to get current device type
export const getCurrentDeviceType = () => {
  if (window.matchMedia(VIDEO_CONFIG.breakpoints.mobile).matches) {
    return 'mobile';
  } else if (window.matchMedia(VIDEO_CONFIG.breakpoints.tablet).matches) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

// Helper function to get video config for a specific section and device
export const getVideoConfig = (section, deviceType = null) => {
  const device = deviceType || getCurrentDeviceType();
  const baseSize = VIDEO_CONFIG.baseSize[device] || VIDEO_CONFIG.baseSize.desktop;
  const sectionScale = VIDEO_CONFIG.sections[section]?.[device] || VIDEO_CONFIG.sections[section]?.desktop;
  
  return {
    ...baseSize,
    ...sectionScale
  };
};

// Helper function to apply video styles (for non-GSAP usage)
export const applyVideoStyles = (element, config) => {
  if (!element || !config) return;
  
  element.style.width = config.width;
  element.style.height = config.height;
  element.style.borderRadius = config.borderRadius;
  
  // Apply scale via transform
  const currentTransform = element.style.transform || '';
  const scaleTransform = `scale(${config.scale})`;
  
  // Remove existing scale from transform and add new one
  const transformWithoutScale = currentTransform.replace(/scale\([^)]*\)/g, '').trim();
  element.style.transform = transformWithoutScale ? `${transformWithoutScale} ${scaleTransform}` : scaleTransform;
};

// Helper function to get GSAP-compatible config
export const getGSAPConfig = (section, deviceType = null) => {
  const config = getVideoConfig(section, deviceType);
  
  const gsapConfig = {
    width: config.width,
    borderRadius: config.borderRadius,
    scale: config.scale // Use scale directly for GSAP
  };
  
  // Only include height if it's not 'auto'
  if (config.height !== 'auto') {
    gsapConfig.height = config.height;
  }
  
  return gsapConfig;
};

// Helper function to get base size for a device
export const getBaseSize = (deviceType = null) => {
  const device = deviceType || getCurrentDeviceType();
  return VIDEO_CONFIG.baseSize[device] || VIDEO_CONFIG.baseSize.desktop;
};

// Helper function to get scale for a section and device
export const getSectionScale = (section, deviceType = null) => {
  const device = deviceType || getCurrentDeviceType();
  const sectionConfig = VIDEO_CONFIG.sections[section]?.[device] || VIDEO_CONFIG.sections[section]?.desktop;
  return sectionConfig.scale;
};

// Helper function to update base size for a device
export const updateBaseSize = (deviceType, newSize) => {
  if (VIDEO_CONFIG.baseSize[deviceType]) {
    VIDEO_CONFIG.baseSize[deviceType] = { ...VIDEO_CONFIG.baseSize[deviceType], ...newSize };
  }
};

// Helper function to update scale for a section and device
export const updateSectionScale = (section, deviceType, newScale) => {
  if (VIDEO_CONFIG.sections[section]?.[deviceType]) {
    VIDEO_CONFIG.sections[section][deviceType].scale = newScale;
  }
};
