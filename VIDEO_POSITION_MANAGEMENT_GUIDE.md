# Video Position Management Guide

This guide explains how to manage video positions across all sections and devices using the centralized position configuration system.

## Overview

Instead of hardcoded positions scattered throughout the code, we now have a centralized configuration system that manages video positions for:
- **3 actual sections** (Section 1, 2, 3)
- **6 position states** (including transitions)
- **3 device types** (Mobile, Tablet, Desktop)

## Configuration Structure

### **Device Breakpoints**
```javascript
breakpoints: {
  mobile: '(max-width: 768px)',
  tablet: '(min-width: 769px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)'
}
```

### **Position Configurations**
```javascript
positions: {
  section1: { mobile: {...}, tablet: {...}, desktop: {...} },
  section1To2: { mobile: {...}, tablet: {...}, desktop: {...} },
  section2: { mobile: {...}, tablet: {...}, desktop: {...} },
  section2To3: { mobile: {...}, tablet: {...}, desktop: {...} },
  section3: { mobile: {...}, tablet: {...}, desktop: {...} },
  section3To4: { mobile: {...}, tablet: {...}, desktop: {...} }
}
```

## Current Position Map

### **Desktop Positions**
| Section | Position | Description |
|---------|----------|-------------|
| **section1** | `bottom: 10%, left: 50%` | Bottom center (hero) |
| **section1To2** | `bottom: 50%, left: 80%` | Right side (transition) |
| **section2** | `bottom: 50%, left: 80%` | Right side (content) |
| **section2To3** | `bottom: 50%, left: 50%` | Center (transition) |
| **section3** | `bottom: 50%, left: 50%` | Center (content) |
| **section3To4** | `bottom: 50%, left: 50%` | Center (fade out) |

### **Tablet Positions**
| Section | Position | Description |
|---------|----------|-------------|
| **section1** | `bottom: 10%, left: 50%` | Bottom center (hero) |
| **section1To2** | `bottom: 50%, left: 80%` | Right side (transition) |
| **section2** | `bottom: 50%, left: 80%` | Right side (content) |
| **section2To3** | `bottom: 50%, left: 50%` | Center (transition) |
| **section3** | `bottom: 50%, left: 50%` | Center (content) |
| **section3To4** | `bottom: 50%, left: 50%` | Center (fade out) |

### **Mobile Positions**
| Section | Position | Description |
|---------|----------|-------------|
| **section1** | `bottom: 10%, left: 50%` | Bottom center (hero) |
| **section1To2** | `bottom: 50%, left: 85%` | Right side (transition) |
| **section2** | `bottom: 50%, left: 85%` | Right side (content) |
| **section2To3** | `bottom: 50%, left: 50%` | Center (transition) |
| **section3** | `bottom: 50%, left: 50%` | Center (content) |
| **section3To4** | `bottom: 50%, left: 50%` | Center (fade out) |

## Usage Examples

### **Basic Usage**
```javascript
import { getVideoPosition, getGSAPPosition } from './config/videoPositionConfig';

// Get position for section 2 on desktop
const position = getVideoPosition('section2', 'desktop');
console.log(position);
// Output: { bottom: '50%', left: '80%', transform: 'translate(-50%, 50%)', zIndex: 40 }

// Get GSAP-compatible position
const gsapPosition = getGSAPPosition('section2', 'desktop');
console.log(gsapPosition);
// Output: { bottom: '50%', left: '80%', x: '-50%', y: '50%', zIndex: 40 }
```

### **GSAP Animations**
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

### **Responsive Positioning**
```javascript
import { getResponsivePosition } from './config/videoPositionConfig';

// Get position based on current device
const position = getResponsivePosition('section2');
// Automatically detects device and returns appropriate position
```

### **Position Transitions**
```javascript
import { getPositionTransition } from './config/videoPositionConfig';

// Get transition between two sections
const transition = getPositionTransition('section1', 'section2', 'desktop');
console.log(transition);
// Output: { from: {...}, to: {...}, duration: 1, ease: "power2.inOut" }
```

## Helper Functions

### **Position Management**
| Function | Purpose | Example |
|----------|---------|---------|
| `getVideoPosition(section, device)` | Get position config | `getVideoPosition('section2', 'desktop')` |
| `getGSAPPosition(section, device)` | Get GSAP config | `getGSAPPosition('section2', 'desktop')` |
| `getResponsivePosition(section)` | Get current device position | `getResponsivePosition('section2')` |
| `getAllDevicePositions(section)` | Get all device positions | `getAllDevicePositions('section2')` |
| `getAllSectionPositions(device)` | Get all section positions | `getAllSectionPositions('desktop')` |

### **Position Updates**
| Function | Purpose | Example |
|----------|---------|---------|
| `updatePosition(section, device, newPos)` | Update position | `updatePosition('section2', 'desktop', {left: '75%'})` |
| `createCustomPosition(bottom, left, transform)` | Create custom position | `createCustomPosition('50%', '60%', 'translate(-50%, 50%)')` |
| `validatePosition(config)` | Validate position | `validatePosition(positionConfig)` |

### **Transitions**
| Function | Purpose | Example |
|----------|---------|---------|
| `getPositionTransition(from, to, device)` | Get transition | `getPositionTransition('section1', 'section2', 'desktop')` |
| `isPositionValidForDevice(section, device)` | Check validity | `isPositionValidForDevice('section2', 'mobile')` |

## Integration with Scroll Animations

### **Before (Hardcoded)**
```javascript
// Hardcoded position - not responsive
.to(videoRef.current, {
    bottom: '50%',
    left: '80%',
    x: '-50%',
    y: '50%',
    duration: 1
});
```

### **After (Configurable)**
```javascript
// Using position config - responsive
.to(videoRef.current, {
    ...getGSAPPosition('section1To2'),
    duration: 1
});
```

## Customization Examples

### **Change Section 2 Position for Mobile**
```javascript
import { updatePosition } from './config/videoPositionConfig';

// Move section 2 more to the right on mobile
updatePosition('section2', 'mobile', {
    left: '90%'
});
```

### **Create Custom Position**
```javascript
import { createCustomPosition } from './config/videoPositionConfig';

// Create custom position
const customPos = createCustomPosition('30%', '70%', 'translate(-50%, 50%)');
console.log(customPos);
// Output: { bottom: '30%', left: '70%', transform: 'translate(-50%, 50%)', zIndex: 40 }
```

### **Get All Positions for Section**
```javascript
import { getAllDevicePositions } from './config/videoPositionConfig';

// Get all device positions for section 2
const allPositions = getAllDevicePositions('section2');
console.log(allPositions);
// Output: { mobile: {...}, tablet: {...}, desktop: {...} }
```

## Benefits

### **1. Centralized Management**
- All positions in one file
- Easy to find and modify
- Consistent across the app

### **2. Responsive Design**
- Different positions for each device
- Automatic device detection
- Easy to customize per device

### **3. Easy Maintenance**
- Clear structure and naming
- Helper functions for common tasks
- Validation and error checking

### **4. Developer Friendly**
- TypeScript-like intellisense
- Clear function names
- Comprehensive documentation

## Migration from Hardcoded Positions

### **Step 1: Import the config**
```javascript
import { getGSAPPosition } from './config/videoPositionConfig';
```

### **Step 2: Replace hardcoded positions**
```javascript
// Before
.to(videoRef.current, {
    bottom: '50%',
    left: '80%',
    x: '-50%',
    y: '50%',
    duration: 1
});

// After
.to(videoRef.current, {
    ...getGSAPPosition('section1To2'),
    duration: 1
});
```

### **Step 3: Test on all devices**
- Check mobile positions
- Check tablet positions
- Check desktop positions

This system makes it incredibly easy to manage video positions across all sections and devices! 🚀
