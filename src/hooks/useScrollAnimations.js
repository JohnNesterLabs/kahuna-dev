import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getVideoConfig, getGSAPConfig } from '../config/videoConfig';
import { getGSAPPosition } from '../config/videoPositionConfig';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = (activeSection, setActiveSection) => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Configure ScrollTrigger
        ScrollTrigger.config({
            ignoreMobileResize: true,
            syncInterval: 1
        });

        // Set initial video size and position for section 1
        const initialConfig = getGSAPConfig('section1');
        const initialPosition = getGSAPPosition('section1');
        if (initialConfig && videoRef.current) {
            gsap.set(videoRef.current, {
                ...initialConfig,
                ...initialPosition
            });
        }

        // Section 1: Hero section animations
        gsap.set(['.section1-line1', '.section1-line2', '.section1-line3'], {
            opacity: 0,
            y: 50
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: '#section1Wrapper',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    if (self.progress < 0.9) {
                        setActiveSection(0);
                    }
                }
            }
        })
            .to('.section1-line1', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
            .to('.section1-line2', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
            .to('.section1-line3', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });

        // Video movement from bottom to right (between Section 1 and 2)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#section1Wrapper',
                start: 'bottom center',
                end: 'bottom top',
                scrub: 1,
                onUpdate: (self) => {
                    // Smoothly transition size based on scroll progress
                    const progress = self.progress;
                    const section1Config = getGSAPConfig('section1');
                    const section1To2Config = getGSAPConfig('section1To2');
                    
                    if (videoRef.current) {
                        // Interpolate between section1 and section1To2 based on progress
                        const currentScale = section1Config.scale + (section1To2Config.scale - section1Config.scale) * progress;
                        
                        gsap.set(videoRef.current, {
                            scale: currentScale,
                            width: section1To2Config.width,
                            borderRadius: section1To2Config.borderRadius
                        });
                    }
                }
            }
        })
            .to(videoRef.current, {
                ...getGSAPPosition('section1To2'),
                duration: 1
            });

        // Section 2: Smooth scrolling animations
        gsap.set(['.section2-line1', '.section2-line2', '.section2-line3'], {
            opacity: 0,
            y: 50
        });

        // Section 2: Text animations only (no video size change)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#section2Wrapper',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    if (self.progress > 0.1 && self.progress < 0.9) {
                        setActiveSection(1);
                    }
                }
            }
        })
            .to('.section2-line1', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
            .to('.section2-line2', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
            .to('.section2-line3', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });

        // Video size and position change for section 2 (smooth forward and backward)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#section2Wrapper',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    // Smoothly transition size based on scroll progress
                    const progress = self.progress;
                    const section1To2Config = getGSAPConfig('section1To2');
                    const section2Config = getGSAPConfig('section2');
                    const section2Position = getGSAPPosition('section2');
                    
                    if (videoRef.current) {
                        // Interpolate between section1To2 and section2 based on progress
                        const currentScale = section1To2Config.scale + (section2Config.scale - section1To2Config.scale) * progress;
                        
                        gsap.set(videoRef.current, {
                            scale: currentScale,
                            width: section2Config.width,
                            borderRadius: section2Config.borderRadius,
                            ...section2Position // Use section2 position
                        });
                    }
                }
            }
        });

        // Video movement from right to center (between Section 2 and 3)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#section2Wrapper',
                start: 'bottom center',
                end: 'bottom top',
                scrub: 1,
                onUpdate: (self) => {
                    // Smoothly transition size based on scroll progress
                    const progress = self.progress;
                    const section2Config = getGSAPConfig('section2');
                    const section2To3Config = getGSAPConfig('section2To3');
                    
                    if (videoRef.current) {
                        // Interpolate between section2 and section2To3 based on progress
                        const currentScale = section2Config.scale + (section2To3Config.scale - section2Config.scale) * progress;
                        
                        gsap.set(videoRef.current, {
                            scale: currentScale,
                            width: section2To3Config.width,
                            borderRadius: section2To3Config.borderRadius
                        });
                    }
                }
            }
        })
            .to(videoRef.current, {
                ...getGSAPPosition('section2To3'),
                duration: 1
            });

        // Section 3: Interactive section animations
        gsap.set(['.section3-line1', '.section3-line2', '.section3-line3'], {
            opacity: 0,
            y: 50
        });

        // Section 3: Text animations only (no video size change)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#section3Wrapper',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    if (self.progress > 0.1) {
                        setActiveSection(2);
                    }
                }
            }
        })
            .to('.section3-line1', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
            .to('.section3-line2', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
            .to('.section3-line3', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });

        // Video size and position change for section 3 (smooth forward and backward)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#section3Wrapper',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    // Smoothly transition size based on scroll progress
                    const progress = self.progress;
                    const section2To3Config = getGSAPConfig('section2To3');
                    const section3Config = getGSAPConfig('section3');
                    const section3Position = getGSAPPosition('section3');
                    
                    if (videoRef.current) {
                        // Interpolate between section2To3 and section3 based on progress
                        const currentScale = section2To3Config.scale + (section3Config.scale - section2To3Config.scale) * progress;
                        
                        gsap.set(videoRef.current, {
                            scale: currentScale,
                            width: section3Config.width,
                            borderRadius: section3Config.borderRadius,
                            ...section3Position // Use section3 position
                        });
                    }
                }
            }
        });

        // Add transition trigger to ensure smooth transition to section 4
        ScrollTrigger.create({
            trigger: '#section3Wrapper',
            start: 'bottom top',
            end: 'bottom top',
            onEnter: () => {
                setActiveSection(3);
            },
            onLeave: () => {
                setActiveSection(3);
            }
        });

        // Hide video after section 3
        gsap.timeline({
            scrollTrigger: {
                trigger: '#section3Wrapper',
                start: 'bottom center',
                end: 'bottom top',
                scrub: 1
            }
        })
            .to(videoRef.current, { 
                opacity: 0, 
                ...getGSAPConfig('section3To4'),
                ...getGSAPPosition('section3To4'),
                duration: 0.5 
            });

        // Section 4: Pinned section with frame animation
        const totalFrames = 428;
        let currentFrameIndex = 0;

        // Initialize frames array for GSAP
        const frames = [];
        for (let i = 1; i <= totalFrames; i++) {
            frames.push(`#frame-${i}`);
        }

        // Set all frames as hidden initially
        gsap.set(frames, { autoAlpha: 0 });
        gsap.set('#frame-1', { autoAlpha: 1 });

        ScrollTrigger.create({
            trigger: '#section4Wrapper',
            start: 'top top',
            end: '+=2500%',
            scrub: 1,
            pin: true,
            onEnter: () => {
                setActiveSection(3);
            },
            onUpdate: (self) => {
                if (self.progress < 0.95) {
                    setActiveSection(3);
                } else {
                    setActiveSection(4);
                }

                // Calculate which frame should be shown
                const targetFrameIndex = Math.floor(self.progress * (totalFrames - 1));

                if (targetFrameIndex !== currentFrameIndex && targetFrameIndex >= 0 && targetFrameIndex < totalFrames) {
                    // Hide current frame
                    if (frames[currentFrameIndex]) {
                        gsap.set(frames[currentFrameIndex], { autoAlpha: 0 });
                    }

                    // Show new frame
                    const newFrameSel = frames[targetFrameIndex];
                    const frameElement = document.getElementById(`frame-${targetFrameIndex + 1}`);

                    // Load frame image if not already loaded
                    if (frameElement && !frameElement.src) {
                        const frameNumber = (targetFrameIndex + 1).toString().padStart(4, '0');
                        frameElement.src = `/frames-desktop-webp/frame_${frameNumber}.webp`;
                    }

                    gsap.set(newFrameSel, { autoAlpha: 1 });
                    currentFrameIndex = targetFrameIndex;
                }
            }
        });

        // Refresh ScrollTrigger after all animations are set up
        ScrollTrigger.refresh();

        // Additional refresh on window load for Safari/Firefox compatibility
        const handleLoad = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('load', handleLoad);

        // Handle resize events
        const handleResize = () => {
            ScrollTrigger.refresh();
            
            // Update video size based on current section and new device type
            if (videoRef.current) {
                const currentConfig = getGSAPConfig('section1'); // Default to section1
                gsap.set(videoRef.current, currentConfig);
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('load', handleLoad);
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [setActiveSection]);

    return { videoRef };
};
