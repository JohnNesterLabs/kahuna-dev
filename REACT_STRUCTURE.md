# React Project Structure

This document outlines the React project structure created from the original `demo.html` file.

## Project Structure

```
src/
├── components/
│   ├── Navigation.js          # Navigation dots component
│   ├── FloatingVideo.js       # Floating video placeholder
│   ├── HeroSection.js         # Welcome/hero section
│   ├── SmoothScrollingSection.js  # Smooth scrolling section
│   ├── InteractiveSection.js  # Interactive content section
│   ├── PinnedSection.js       # Pinned section with frame animation
│   └── Footer.js              # Footer section
├── hooks/
│   ├── useNavigation.js       # Navigation state management
│   └── useScrollAnimations.js # GSAP scroll animations
├── styles/
│   └── globals.css            # Global styles and animations
├── App.js                     # Main app component
└── index.js                   # Entry point
```

## Key Features

### Components
- **Navigation**: Interactive navigation dots with smooth scrolling
- **FloatingVideo**: Animated video placeholder that moves during scroll
- **HeroSection**: Welcome section with animated text
- **SmoothScrollingSection**: Second section with smooth scrolling effects
- **InteractiveSection**: Third section with interactive content
- **PinnedSection**: Complex pinned section with frame-by-frame animation
- **Footer**: Thank you section

### Custom Hooks
- **useNavigation**: Manages active section state and navigation clicks
- **useScrollAnimations**: Handles all GSAP scroll-triggered animations

### Dependencies
- **React 19.2.0**: Latest React version
- **GSAP 3.12.2**: Animation library for scroll effects
- **Tailwind CSS**: Utility-first CSS framework

## Animation Features

1. **Sequential Text Animation**: Each section's text appears sequentially
2. **Floating Video Movement**: Video moves from bottom to right to center
3. **Frame Animation**: 428 frames animate based on scroll position
4. **Navigation State**: Active section updates based on scroll position
5. **Smooth Scrolling**: Click navigation dots for smooth scrolling
6. **Neon Border Effects**: Animated neon borders on all sections

## Usage

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Open browser to `http://localhost:3000`

## File Organization

The original monolithic HTML file has been broken down into:
- **Modular Components**: Each section is its own React component
- **Reusable Hooks**: Animation and navigation logic is separated
- **Organized Styles**: CSS is organized in a single global file
- **Clean Architecture**: Separation of concerns for maintainability

## Browser Compatibility

- Modern browsers with ES6+ support
- GSAP ScrollTrigger plugin for scroll animations
- CSS Grid and Flexbox for layout
- CSS Custom Properties for theming
