// Video position configuration for different sections and device sizes

export const VIDEO_POSITION_CONFIG = {
  // Device breakpoints
  breakpoints: {
    extraSmall: '(max-width: 400px)',
    mobile: '(max-width: 768px)',
    tablet: '(min-width: 769px) and (max-width: 1024px)',
    desktop: '(min-width: 1025px)'
  },

  // Video positions for each section and device
  positions: {
    // Section 1: BOTTOM position (hero section)
    section1: {
      extraSmall: {
        top: '40%',           // Even closer to bottom on extra small screens
        left: '25%',
        transform: 'translateX(-50%)',
        zIndex: 40
      },
      mobile: {
        top: '40%',          // Very close to bottom on mobile
        left: '25%',
        transform: 'translateX(-50%)',
        zIndex: 40
      },
      tablet: {
        bottom: '8%',           // Slightly higher on tablet
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40
      },
      desktop: {
        bottom: '-60%',          // More space from bottom on desktop
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40
      }
    },

    // Section 1→2: Transition (moving from bottom to right)
    section1To2: {
      extraSmall: {
        top: '-50%',        // Move to vertical center
        left: '75%',            // Move to right side
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      mobile: {
        top: '-40%',          // Move to vertical center
        left: '90%',            // Move to right side
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      tablet: {
        bottom: '50%',          // Move to vertical center
        left: '80%',            // Move to right side
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      desktop: {
        bottom: '50%',          // Move to vertical center
        left: '95%',            // Move to right side
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      }
    },

    // Section 2: RIGHT position (smooth scrolling section)
    section2: {
      extraSmall: {
        top: '-50%',          // Vertical center
        left: '75%',            // Right side of screen
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      mobile: {
        top: '-40%',          // Vertical center
        left: '90%',            // Right side of screen
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      tablet: {
        bottom: '50%',          // Vertical center
        left: '80%',            // Right side of screen
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      desktop: {
        bottom: '50%',          // Vertical center
        left: '95%',            // Right side of screen
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      }
    },

    // Section 2→3: Transition (moving from right to center)
    section2To3: {
      extraSmall: {
        top: '-70%',          // Stay at vertical center
        left: '35%',            // Move to horizontal center
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      mobile: {
        top: '-50%',          // Stay at vertical center
        left: '40%',            // Move to horizontal center
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      tablet: {
        bottom: '50%',          // Stay at vertical center
        left: '50%',            // Move to horizontal center
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      desktop: {
        bottom: '50%',          // Stay at vertical center
        left: '50%',            // Move to horizontal center
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      }
    },

    // Section 3: CENTER position (interactive section)
    section3: {
      extraSmall: {
        top: '-70%',         // Vertical center
        left: '35%',            // Horizontal center
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      mobile: {
        top: '-50%',          // Vertical center
        left: '40%',            // Horizontal center
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      tablet: {
        bottom: '50%',          // Vertical center
        left: '50%',            // Horizontal center
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      desktop: {
        bottom: '50%',          // Vertical center
        left: '50%',            // Horizontal center
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      }
    },

    // Section 3→4: Fade out (center position, shrinking)
    section3To4: {
      extraSmall: {
        top: '-70%',         // Stay at vertical center
        left: '35%',            // Stay at horizontal center
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      mobile: {
        top: '-50%',          // Stay at vertical center
        left: '40%',            // Stay at horizontal center
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      tablet: {
        bottom: '50%',          // Stay at vertical center
        left: '50%',            // Stay at horizontal center
        transform: 'translate(-50%, 50%)',
        zIndex: 40
      },
      desktop: {
        bottom: '50%',          // Stay at vertical center
        left: '50%',            // Stay at horizontal center
        transform: 'translate(-50%, 50%)',
        zIndex: 40
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
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'desktop'; // Default to desktop for server-side rendering
  }
  
  if (window.matchMedia(VIDEO_POSITION_CONFIG.breakpoints.extraSmall).matches) {
    return 'extraSmall';
  } else if (window.matchMedia(VIDEO_POSITION_CONFIG.breakpoints.mobile).matches) {
    return 'mobile';
  } else if (window.matchMedia(VIDEO_POSITION_CONFIG.breakpoints.tablet).matches) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

// Helper function to get video position for a specific section and device
export const getVideoPosition = (section, deviceType = null) => {
  const device = deviceType || getCurrentDeviceType();
  return VIDEO_POSITION_CONFIG.positions[section]?.[device] || VIDEO_POSITION_CONFIG.positions[section]?.desktop;
};

// Helper function to get GSAP-compatible position config
export const getGSAPPosition = (section, deviceType = null) => {
  const config = getVideoPosition(section, deviceType);
  const gsapConfig = {};
  
  Object.keys(config).forEach(key => {
    if (key === 'transform') {
      const transform = config[key];
      if (transform.includes('translateX')) {
        const xMatch = transform.match(/translateX\(([^)]+)\)/);
        if (xMatch) gsapConfig.x = xMatch[1];
      }
      if (transform.includes('translateY')) {
        const yMatch = transform.match(/translateY\(([^)]+)\)/);
        if (yMatch) gsapConfig.y = yMatch[1];
      }
      if (transform.includes('translate(')) {
        const translateMatch = transform.match(/translate\(([^,]+),\s*([^)]+)\)/);
        if (translateMatch) {
          gsapConfig.x = translateMatch[1];
          gsapConfig.y = translateMatch[2];
        }
      }
    } else {
      gsapConfig[key] = config[key];
    }
  });
  
  return gsapConfig;
};

// Helper function to apply video position styles (for non-GSAP usage)
export const applyVideoPosition = (element, config) => {
  if (!element || !config) return;
  
  Object.keys(config).forEach(key => {
    if (key === 'transform') {
      element.style.transform = config[key];
    } else {
      element.style[key] = config[key];
    }
  });
};

// Helper function to get all device positions for a section
export const getAllDevicePositions = (section) => {
  return {
    mobile: getVideoPosition(section, 'mobile'),
    tablet: getVideoPosition(section, 'tablet'),
    desktop: getVideoPosition(section, 'desktop')
  };
};

// Helper function to get all section positions for a device
export const getAllSectionPositions = (deviceType = null) => {
  const device = deviceType || getCurrentDeviceType();
  const sections = Object.keys(VIDEO_POSITION_CONFIG.positions);
  const result = {};
  
  sections.forEach(section => {
    result[section] = getVideoPosition(section, device);
  });
  
  return result;
};

// Helper function to create custom position
export const createCustomPosition = (bottom, left, transform, zIndex = 40) => {
  return {
    bottom,
    left,
    transform,
    zIndex
  };
};

// Helper function to validate position config
export const validatePosition = (config) => {
  const requiredKeys = ['top', 'bottom', 'left', 'transform', 'zIndex'];
  return requiredKeys.every(key => config.hasOwnProperty(key));
};

// Helper function to update position for a section and device
export const updatePosition = (section, deviceType, newPosition) => {
  if (VIDEO_POSITION_CONFIG.positions[section]?.[deviceType]) {
    VIDEO_POSITION_CONFIG.positions[section][deviceType] = {
      ...VIDEO_POSITION_CONFIG.positions[section][deviceType],
      ...newPosition
    };
  }
};

// Helper function to get position transition between two sections
export const getPositionTransition = (fromSection, toSection, deviceType = null) => {
  const fromPos = getVideoPosition(fromSection, deviceType);
  const toPos = getVideoPosition(toSection, deviceType);
  
  return {
    from: fromPos,
    to: toPos,
    duration: VIDEO_POSITION_CONFIG.animation.duration,
    ease: VIDEO_POSITION_CONFIG.animation.ease
  };
};

// Helper function to get responsive position based on window size
export const getResponsivePosition = (section) => {
  const deviceType = getCurrentDeviceType();
  return getVideoPosition(section, deviceType);
};

// Helper function to check if position is valid for current device
export const isPositionValidForDevice = (section, deviceType = null) => {
  const device = deviceType || getCurrentDeviceType();
  const position = getVideoPosition(section, device);
  return validatePosition(position);
};

// Export all positions for easy access
export const POSITIONS = VIDEO_POSITION_CONFIG.positions;
export const BREAKPOINTS = VIDEO_POSITION_CONFIG.breakpoints;
export const ANIMATION = VIDEO_POSITION_CONFIG.animation;
