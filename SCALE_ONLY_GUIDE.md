# Scale-Only Video Configuration Guide

This guide explains the new scale-only video configuration system that makes it much easier to control video sizing across all sections and devices.

## Overview

Instead of managing width, height, and scale separately, we now use:
- **One base size** per device (width, height, borderRadius)
- **Scale values** per section (applied to the base size)

This approach is much cleaner and easier to manage!

## Configuration Structure

### Base Sizes (One per device)
```javascript
baseSize: {
  mobile: {
    width: '200px',
    height: '112px',
    borderRadius: '12px'
  },
  tablet: {
    width: '240px',
    height: '135px',
    borderRadius: '14px'
  },
  desktop: {
    width: '700px',
    height: '394px',
    borderRadius: '16px'
  }
}
```

### Section Scales (Scale values only)
```javascript
sections: {
  section1: {
    mobile: { scale: 1 },
    tablet: { scale: 1 },
    desktop: { scale: 1 }
  },
  section2: {
    mobile: { scale: 0.8 },
    tablet: { scale: 0.8 },
    desktop: { scale: 0.8 }
  }
  // ... more sections
}
```

## Current Configuration

### Base Sizes
| Device | Width | Height | Border Radius |
|--------|-------|--------|---------------|
| **Mobile** | 200px | 112px | 12px |
| **Tablet** | 240px | 135px | 14px |
| **Desktop** | 700px | 394px | 16px |

### Section Scales
| Section | Mobile | Tablet | Desktop | Description |
|---------|--------|--------|---------|-------------|
| **section1** | 1.0 | 1.0 | 1.0 | Full size (hero) |
| **section1To2** | 0.9 | 0.9 | 0.9 | Slightly smaller (transition) |
| **section2** | 0.8 | 0.8 | 0.8 | Smaller (right side) |
| **section2To3** | 0.9 | 0.9 | 0.9 | Slightly larger (transition) |
| **section3** | 1.0 | 1.0 | 1.0 | Full size (center) |
| **section3To4** | 0.6 | 0.6 | 0.6 | Much smaller (fade out) |

## Usage Examples

### Basic Usage
```javascript
import { getVideoConfig, getGSAPConfig, getBaseSize, getSectionScale } from './config/videoConfig';

// Get complete config for section 2 on desktop
const config = getVideoConfig('section2', 'desktop');
console.log(config);
// Output: { width: '700px', height: '394px', borderRadius: '16px', scale: 0.8 }

// Get GSAP config for animations
const gsapConfig = getGSAPConfig('section2', 'desktop');
console.log(gsapConfig);
// Output: { width: '700px', height: '394px', borderRadius: '16px', scale: 0.8 }

// Get base size for desktop
const baseSize = getBaseSize('desktop');
console.log(baseSize);
// Output: { width: '700px', height: '394px', borderRadius: '16px' }

// Get scale for section 2
const scale = getSectionScale('section2', 'desktop');
console.log(scale);
// Output: 0.8
```

### GSAP Animations
```javascript
import { getGSAPConfig } from './config/videoConfig';
import { gsap } from 'gsap';

// Animate video to section 2 size
gsap.to(videoRef.current, {
  ...getGSAPConfig('section2'),
  duration: 1,
  ease: "power2.inOut"
});
```

### Dynamic Updates
```javascript
import { updateBaseSize, updateSectionScale } from './config/videoConfig';

// Update base size for desktop
updateBaseSize('desktop', {
  width: '800px',
  height: '450px'
});

// Update scale for section 2
updateSectionScale('section2', 'desktop', 0.7);
```

## Benefits

### ✅ **Much Simpler Management**
- Only one base size per device to manage
- Only scale values per section
- No more complex width/height calculations

### ✅ **Consistent Sizing**
- All sections use the same base dimensions
- Only scale changes between sections
- Perfect aspect ratio maintained

### ✅ **Easy Customization**
- Change base size once, affects all sections
- Adjust individual section scales easily
- Clear separation of concerns

### ✅ **Better Performance**
- GSAP handles scale transformations efficiently
- No complex width/height calculations
- Smoother animations

## How It Works

### 1. Base Size
The base size defines the "full size" video dimensions for each device:
- **Desktop**: 700×394px (16:9 aspect ratio)
- **Tablet**: 240×135px (16:9 aspect ratio)  
- **Mobile**: 200×112px (16:9 aspect ratio)

### 2. Section Scales
Each section applies a scale to the base size:
- **Scale 1.0**: Full size (700×394px on desktop)
- **Scale 0.8**: 80% size (560×315px on desktop)
- **Scale 0.6**: 60% size (420×236px on desktop)

### 3. GSAP Integration
GSAP applies the scale as a CSS transform:
```css
transform: scale(0.8);
```

## Customization Examples

### Change Base Size for All Sections
```javascript
// Make desktop video larger
updateBaseSize('desktop', {
  width: '900px',
  height: '506px'
});
// Now all desktop sections will be 900×506px scaled
```

### Adjust Section Scale
```javascript
// Make section 2 smaller
updateSectionScale('section2', 'desktop', 0.6);
// Now section 2 will be 60% of base size
```

### Add New Section
```javascript
// Add new section with custom scale
VIDEO_CONFIG.sections.section5 = {
  mobile: { scale: 0.5 },
  tablet: { scale: 0.5 },
  desktop: { scale: 0.5 }
};
```

## Helper Functions

| Function | Purpose | Example |
|----------|---------|---------|
| `getVideoConfig(section, device)` | Get complete config | `getVideoConfig('section2', 'desktop')` |
| `getGSAPConfig(section, device)` | Get GSAP config | `getGSAPConfig('section2', 'desktop')` |
| `getBaseSize(device)` | Get base size | `getBaseSize('desktop')` |
| `getSectionScale(section, device)` | Get scale only | `getSectionScale('section2', 'desktop')` |
| `updateBaseSize(device, newSize)` | Update base size | `updateBaseSize('desktop', {width: '800px'})` |
| `updateSectionScale(section, device, scale)` | Update scale | `updateSectionScale('section2', 'desktop', 0.7)` |

## Migration from Old System

### Before (Complex)
```javascript
section2: {
  mobile: { width: '160px', height: '90px', scale: 0.8 },
  tablet: { width: '200px', height: '113px', scale: 0.8 },
  desktop: { width: '700px', height: '394px', scale: 0.8 }
}
```

### After (Simple)
```javascript
// Base size
baseSize: {
  mobile: { width: '200px', height: '112px' },
  tablet: { width: '240px', height: '135px' },
  desktop: { width: '700px', height: '394px' }
}

// Section scale
section2: {
  mobile: { scale: 0.8 },
  tablet: { scale: 0.8 },
  desktop: { scale: 0.8 }
}
```

This new system is much cleaner and easier to manage! 🚀
