# Video Position Management Guide

This guide explains how to use the separate video position configuration system for easy management of video positioning across all sections and devices.

## Overview

The video position system is now completely separate from the size configuration, making it easy to manage video positioning independently. This allows for:

- **Easy position changes** without affecting video sizing
- **Device-specific positioning** for mobile, tablet, and desktop
- **Section-based positioning** for different scroll states
- **Simple configuration management** in one dedicated file

## File Structure

```
src/config/
├── videoConfig.js          # Video sizing configuration
└── videoPositionConfig.js  # Video position configuration (NEW)
```

## Position Configuration

### Device Breakpoints
- **Mobile**: `max-width: 768px`
- **Tablet**: `769px - 1024px`
- **Desktop**: `min-width: 1025px`

### Section Positions

| Section | Description | Mobile | Tablet | Desktop |
|---------|-------------|--------|--------|---------|
| **section1** | Hero section (bottom center) | `bottom: 10%, left: 50%` | `bottom: 10%, left: 50%` | `bottom: 10%, left: 50%` |
| **section1To2** | Transition to right | `bottom: 50%, left: 80%` | `bottom: 50%, left: 80%` | `bottom: 50%, left: 80%` |
| **section2** | Right side position | `bottom: 50%, left: 80%` | `bottom: 50%, left: 80%` | `bottom: 50%, left: 80%` |
| **section2To3** | Transition to center | `bottom: 50%, left: 50%` | `bottom: 50%, left: 50%` | `bottom: 50%, left: 50%` |
| **section3** | Center position | `bottom: 50%, left: 50%` | `bottom: 50%, left: 50%` | `bottom: 50%, left: 50%` |
| **section3To4** | Fade out position | `bottom: 50%, left: 50%` | `bottom: 50%, left: 50%` | `bottom: 50%, left: 50%` |

## Usage Examples

### Basic Position Retrieval

```javascript
import { getVideoPosition, getGSAPPosition } from './config/videoPositionConfig';

// Get position for section 1 on desktop
const position = getVideoPosition('section1', 'desktop');
console.log(position);
// Output: { bottom: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 40 }

// Get GSAP-compatible position
const gsapPosition = getGSAPPosition('section2', 'mobile');
console.log(gsapPosition);
// Output: { bottom: '50%', left: '80%', x: '-50%', y: '50%', zIndex: 40 }
```

### Applying Positions

```javascript
import { applyVideoPosition } from './config/videoPositionConfig';

// Apply position directly to element
const videoElement = document.getElementById('floatingVideo');
applyVideoPosition(videoElement, 'section1', 'desktop');
```

### GSAP Animations

```javascript
import { getGSAPPosition } from './config/videoPositionConfig';
import { gsap } from 'gsap';

// Animate video to section 2 position
gsap.to(videoRef.current, {
  ...getGSAPPosition('section2'),
  duration: 1,
  ease: "power2.inOut"
});
```

### Getting All Positions

```javascript
import { getAllDevicePositions, getAllSectionPositions } from './config/videoPositionConfig';

// Get all device positions for section 1
const allDevices = getAllDevicePositions('section1');
console.log(allDevices);
// Output: { mobile: {...}, tablet: {...}, desktop: {...} }

// Get all section positions for current device
const allSections = getAllSectionPositions();
console.log(allSections);
// Output: { section1: {...}, section2: {...}, ... }
```

## Customization

### Changing Positions

To change a video position, simply edit the `videoPositionConfig.js` file:

```javascript
// Example: Move section 1 video higher on mobile
section1: {
  mobile: {
    bottom: '20%',        // Changed from 10%
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 40
  },
  // ... other devices
}
```

### Adding New Positions

```javascript
// Add a new section position
positions: {
  // ... existing positions
  section4: {
    mobile: {
      bottom: '30%',
      left: '25%',
      transform: 'translateX(-50%)',
      zIndex: 50
    },
    tablet: {
      bottom: '30%',
      left: '25%',
      transform: 'translateX(-50%)',
      zIndex: 50
    },
    desktop: {
      bottom: '30%',
      left: '25%',
      transform: 'translateX(-50%)',
      zIndex: 50
    }
  }
}
```

### Custom Position Creation

```javascript
import { createCustomPosition } from './config/videoPositionConfig';

// Create custom position based on section 1
const customPos = createCustomPosition('section1', 'desktop', {
  bottom: '15%',
  left: '60%'
});
```

## Integration with Scroll Animations

### Using in useScrollAnimations.js

```javascript
import { getGSAPPosition } from '../config/videoPositionConfig';

// In your scroll animation
gsap.timeline({
  scrollTrigger: {
    trigger: '#section1Wrapper',
    start: 'bottom center',
    end: 'bottom top',
    scrub: 1
  }
})
.to(videoRef.current, {
  ...getGSAPPosition('section1To2'),
  duration: 1
});
```

## Helper Functions Reference

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `getVideoPosition(section, device)` | Get position for section/device | `section: string, device?: string` | `Position object` |
| `getGSAPPosition(section, device)` | Get GSAP-compatible position | `section: string, device?: string` | `GSAP position object` |
| `applyVideoPosition(element, section, device)` | Apply position to DOM element | `element: HTMLElement, section: string, device?: string` | `void` |
| `getAllDevicePositions(section)` | Get all device positions for section | `section: string` | `Object with device positions` |
| `getAllSectionPositions(device)` | Get all section positions for device | `device?: string` | `Object with section positions` |
| `createCustomPosition(baseSection, device, modifications)` | Create custom position | `baseSection: string, device: string, modifications: object` | `Custom position object` |
| `validatePosition(section, device)` | Validate position config | `section: string, device?: string` | `Validation result object` |

## Benefits

1. **🎯 Separation of Concerns**: Position and size are managed separately
2. **📱 Device-Specific**: Easy device-specific positioning
3. **🔧 Easy Management**: Simple configuration file
4. **⚡ Performance**: Optimized for GSAP animations
5. **🎨 Flexible**: Support for any position values
6. **📊 Maintainable**: Clear structure and helper functions

## Testing

```javascript
import { validatePosition, getAllSectionPositions } from './config/videoPositionConfig';

// Validate all positions
const sections = ['section1', 'section2', 'section3', 'section1To2', 'section2To3', 'section3To4'];
sections.forEach(section => {
  const validation = validatePosition(section);
  console.log(`${section}: ${validation.isValid ? 'Valid' : 'Invalid'}`);
});

// Get all positions for current device
const allPositions = getAllSectionPositions();
console.log('All positions:', allPositions);
```

This separate position system makes it incredibly easy to manage video positioning across all sections and devices! 🚀
