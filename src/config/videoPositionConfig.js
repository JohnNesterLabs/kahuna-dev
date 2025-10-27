// Video Position Configuration - Separate file for easy position management
export const VIDEO_POSITION_CONFIG = {
  // Device breakpoints (same as videoConfig.js)
  breakpoints: {
    mobile: '(max-width: 768px)',
    tablet: '(min-width: 769px) and (max-width: 1024px)',
    desktop: '(min-width: 1025px)'
  },

  // Video positions for each section and device
  positions: {
    // Section 1: Hero section (bottom center)
    section1: {
      mobile: {
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40
      },
      tablet: {
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40
      },
      desktop: {
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40
      }
    },

    // Section 1→2: Transition (moving to right)
    section1To2: {
      mobile: {
        bottom: '50%',
        left: '80%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      tablet: {
        bottom: '50%',
        left: '80%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      desktop: {
        bottom: '50%',
        left: '80%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      }
    },

    // Section 2: Smooth scrolling (right position)
    section2: {
      mobile: {
        bottom: '50%',
        left: '80%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      tablet: {
        bottom: '50%',
        left: '80%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      desktop: {
        bottom: '50%',
        left: '80%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      }
    },

    // Section 2→3: Transition (moving to center)
    section2To3: {
      mobile: {
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      tablet: {
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      desktop: {
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      }
    },

    // Section 3: Interactive (center position)
    section3: {
      mobile: {
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      tablet: {
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      desktop: {
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      }
    },

    // Section 3→4: Fade out (center, shrinking)
    section3To4: {
      mobile: {
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      tablet: {
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      desktop: {
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      }
    }
  },

  // Animation settings for position changes
  animation: {
    duration: 1,
    ease: "power2.inOut",
    scrub: 1
  }
};

// Helper function to get current device type
export const getCurrentDeviceType = () => {
  if (window.matchMedia(VIDEO_POSITION_CONFIG.breakpoints.mobile).matches) {
    return 'mobile';
  } else if (window.matchMedia(VIDEO_POSITION_CONFIG.breakpoints.tablet).matches) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

// Helper function to get position config for a specific section and device
export const getVideoPosition = (section, deviceType = null) => {
  const device = deviceType || getCurrentDeviceType();
  return VIDEO_POSITION_CONFIG.positions[section]?.[device] || VIDEO_POSITION_CONFIG.positions[section]?.desktop;
};

// Helper function to get GSAP-compatible position config
export const getGSAPPosition = (section, deviceType = null) => {
  const position = getVideoPosition(section, deviceType);
  const gsapPosition = {};
  
  // Convert CSS position properties to GSAP format
  Object.keys(position).forEach(key => {
    if (key === 'transform') {
      // Parse transform for GSAP
      const transform = position[key];
      if (transform.includes('translateX')) {
        const xMatch = transform.match(/translateX\(([^)]+)\)/);
        if (xMatch) gsapPosition.x = xMatch[1];
      }
      if (transform.includes('translateY')) {
        const yMatch = transform.match(/translateY\(([^)]+)\)/);
        if (yMatch) gsapPosition.y = yMatch[1];
      }
      if (transform.includes('translate(')) {
        const translateMatch = transform.match(/translate\(([^,]+),\s*([^)]+)\)/);
        if (translateMatch) {
          gsapPosition.x = translateMatch[1];
          gsapPosition.y = translateMatch[2];
        }
      }
    } else {
      gsapPosition[key] = position[key];
    }
  });
  
  return gsapPosition;
};

// Helper function to apply position styles to element
export const applyVideoPosition = (element, section, deviceType = null) => {
  if (!element) return;
  
  const position = getVideoPosition(section, deviceType);
  
  Object.keys(position).forEach(key => {
    if (key === 'transform') {
      element.style.transform = position[key];
    } else {
      element.style[key] = position[key];
    }
  });
};

// Helper function to get all positions for a section across devices
export const getAllDevicePositions = (section) => {
  const devices = ['mobile', 'tablet', 'desktop'];
  const positions = {};
  
  devices.forEach(device => {
    positions[device] = getVideoPosition(section, device);
  });
  
  return positions;
};

// Helper function to get all sections for a device
export const getAllSectionPositions = (deviceType = null) => {
  const device = deviceType || getCurrentDeviceType();
  const sections = Object.keys(VIDEO_POSITION_CONFIG.positions);
  const positions = {};
  
  sections.forEach(section => {
    positions[section] = getVideoPosition(section, device);
  });
  
  return positions;
};

// Helper function to create custom position
export const createCustomPosition = (baseSection, deviceType, modifications) => {
  const basePosition = getVideoPosition(baseSection, deviceType);
  return {
    ...basePosition,
    ...modifications
  };
};

// Helper function to validate position config
export const validatePosition = (section, deviceType = null) => {
  const position = getVideoPosition(section, deviceType);
  const requiredProps = ['bottom', 'left', 'transform', 'zIndex'];
  
  const isValid = requiredProps.every(prop => position.hasOwnProperty(prop));
  
  return {
    section,
    device: deviceType || getCurrentDeviceType(),
    isValid,
    position,
    missingProps: requiredProps.filter(prop => !position.hasOwnProperty(prop))
  };
};
