// Video configuration for different sections and device sizes
export const VIDEO_CONFIG = {
  // Device breakpoints
  breakpoints: {
    mobile: '(max-width: 768px)',
    tablet: '(min-width: 769px) and (max-width: 1024px)',
    desktop: '(min-width: 1025px)'
  },

  // Video sizes for each section and device
  sections: {
    // Section 1: Hero section (initial position)
    section1: {
      mobile: {
        width: '200px',
        height: '112px',
        scale: 1,
        borderRadius: '12px'
      },
      tablet: {
        width: '240px',
        height: '135px',
        scale: 1,
        borderRadius: '14px'
      },
      desktop: {
        width: '320px',
        height: '180px',
        scale: 1,
        borderRadius: '16px'
      }
    },

    // Section 2: Between section 1 and 2 (moving to right)
    section1To2: {
      mobile: {
        width: '180px',
        height: '101px',
        scale: 0.9,
        borderRadius: '12px'
      },
      tablet: {
        width: '220px',
        height: '124px',
        scale: 0.9,
        borderRadius: '14px'
      },
      desktop: {
        width: '280px',
        height: '158px',
        scale: 0.9,
        borderRadius: '16px'
      }
    },

    // Section 2: Smooth scrolling section (right position)
    section2: {
      mobile: {
        width: '160px',
        height: '90px',
        scale: 0.8,
        borderRadius: '12px'
      },
      tablet: {
        width: '200px',
        height: '113px',
        scale: 0.8,
        borderRadius: '14px'
      },
      desktop: {
        width: '256px',
        height: '144px',
        scale: 0.8,
        borderRadius: '16px'
      }
    },

    // Section 3: Between section 2 and 3 (moving to center)
    section2To3: {
      mobile: {
        width: '180px',
        height: '101px',
        scale: 0.9,
        borderRadius: '12px'
      },
      tablet: {
        width: '220px',
        height: '124px',
        scale: 0.9,
        borderRadius: '14px'
      },
      desktop: {
        width: '280px',
        height: '158px',
        scale: 0.9,
        borderRadius: '16px'
      }
    },

    // Section 3: Interactive section (center position)
    section3: {
      mobile: {
        width: '200px',
        height: '112px',
        scale: 1,
        borderRadius: '12px'
      },
      tablet: {
        width: '240px',
        height: '135px',
        scale: 1,
        borderRadius: '14px'
      },
      desktop: {
        width: '320px',
        height: '180px',
        scale: 1,
        borderRadius: '16px'
      }
    },

    // Section 4: Fade out (smaller before disappearing)
    section3To4: {
      mobile: {
        width: '120px',
        height: '68px',
        scale: 0.6,
        borderRadius: '8px'
      },
      tablet: {
        width: '140px',
        height: '79px',
        scale: 0.6,
        borderRadius: '10px'
      },
      desktop: {
        width: '160px',
        height: '90px',
        scale: 0.6,
        borderRadius: '12px'
      }
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
  return VIDEO_CONFIG.sections[section]?.[device] || VIDEO_CONFIG.sections[section]?.desktop;
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
  return {
    width: config.width,
    height: config.height,
    borderRadius: config.borderRadius,
    scale: config.scale
  };
};
