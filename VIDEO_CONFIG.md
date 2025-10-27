# Video Configuration System

This document explains the dynamic video sizing system implemented for the floating video component.

## Overview

The video now dynamically changes its size as users scroll through different sections, with responsive sizing for mobile, tablet, and desktop devices.

## Configuration Structure

### Device Breakpoints
- **Mobile**: `max-width: 768px`
- **Tablet**: `769px - 1024px`
- **Desktop**: `min-width: 1025px`

### Section-Based Sizing

#### Section 1 (Hero Section)
- **Mobile**: 200px × 112px
- **Tablet**: 240px × 135px
- **Desktop**: 320px × 180px

#### Section 1 → 2 (Transition)
- **Mobile**: 180px × 101px (scale: 0.9)
- **Tablet**: 220px × 124px (scale: 0.9)
- **Desktop**: 280px × 158px (scale: 0.9)

#### Section 2 (Smooth Scrolling)
- **Mobile**: 160px × 90px (scale: 0.8)
- **Tablet**: 200px × 113px (scale: 0.8)
- **Desktop**: 256px × 144px (scale: 0.8)

#### Section 2 → 3 (Transition)
- **Mobile**: 180px × 101px (scale: 0.9)
- **Tablet**: 220px × 124px (scale: 0.9)
- **Desktop**: 280px × 158px (scale: 0.9)

#### Section 3 (Interactive)
- **Mobile**: 200px × 112px (scale: 1.0)
- **Tablet**: 240px × 135px (scale: 1.0)
- **Desktop**: 320px × 180px (scale: 1.0)

#### Section 3 → 4 (Fade Out)
- **Mobile**: 120px × 68px (scale: 0.6)
- **Tablet**: 140px × 79px (scale: 0.6)
- **Desktop**: 160px × 90px (scale: 0.6)

## Implementation Details

### Files Modified/Created

1. **`src/config/videoConfig.js`** - Main configuration file
2. **`src/hooks/useVideoSizing.js`** - Hook for managing video sizing
3. **`src/hooks/useScrollAnimations.js`** - Updated to use dynamic sizing
4. **`src/App.js`** - Integrated video sizing hook
5. **`src/styles/globals.css`** - Removed fixed sizing

### Key Features

- **Responsive Design**: Automatically detects device type and applies appropriate sizing
- **Smooth Transitions**: Video size changes smoothly as users scroll
- **Performance Optimized**: Debounced resize events and efficient style updates
- **Maintainable**: Centralized configuration makes it easy to adjust sizes

### Usage

The system works automatically once integrated. The video will:
1. Start with section 1 sizing on page load
2. Change size as users scroll through sections
3. Respond to window resize events
4. Maintain smooth animations throughout

### Customization

To modify video sizes, edit the `VIDEO_CONFIG` object in `src/config/videoConfig.js`:

```javascript
export const VIDEO_CONFIG = {
  sections: {
    section1: {
      mobile: { width: '200px', height: '112px', scale: 1 },
      tablet: { width: '240px', height: '135px', scale: 1 },
      desktop: { width: '320px', height: '180px', scale: 1 }
    },
    // ... other sections
  }
};
```

### Testing

Use the test utility in `src/utils/testVideoConfig.js` to verify configurations:

```javascript
import { testVideoConfig } from './utils/testVideoConfig';
testVideoConfig();
```

This will log the current device type and all section configurations to the console.
