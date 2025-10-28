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
            // Clear any existing GSAP transforms
            gsap.set(videoRef.current, { clearProps: "all" });

            // Set the initial position and size
            gsap.set(videoRef.current, {
                ...initialConfig,
                ...initialPosition
            });
        }

        // Section 1: Hero section animations
        gsap.set(['.section1-line1'], {
            opacity: 1,
            y: 0
        });
        gsap.set(['.section1-line2', '.section1-line3'], {
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
                        // Ensure video stays in section 1 position
                        const section1Position = getGSAPPosition('section1');
                        if (videoRef.current) {
                            gsap.set(videoRef.current, {
                                ...section1Position
                            });
                        }
                    }
                    // Show/hide SCROLL indicator based on 2nd paragraph visibility
                    const line2Element = document.querySelector('.section1-line2');
                    const scrollIndicator = document.querySelector('.section1-scroll-indicator');
                    const scrollOverlay = document.querySelector('.section1-scroll-overlay');
                    if (line2Element && scrollIndicator && scrollOverlay) {
                        const line2Opacity = gsap.getProperty(line2Element, 'opacity');
                        // Only show when 2nd paragraph is clearly visible (opacity > 0.8)
                        if (line2Opacity > 0.8) {
                            // 2nd paragraph is visible, show SCROLL indicator and overlay
                            scrollIndicator.classList.add('visible');
                            scrollOverlay.classList.add('visible');
                        } else {
                            // 2nd paragraph is not visible enough, hide SCROLL indicator and overlay
                            scrollIndicator.classList.remove('visible');
                            scrollOverlay.classList.remove('visible');
                        }
                    }
                }

            }
        })
            .to('.section1-line2', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
            .to('.section1-line3', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.1")
            // Fade out in sequence: line1, then line2, then line3
            .to('.section1-line1', { opacity: 0, y: -50, duration: 0.3, ease: "power2.out" }, "+=0.2")
            .to('.section1-line2', { opacity: 0, y: -50, duration: 0.3, ease: "power2.out" }, "-=0.1")
            .to('.section1-line3', { opacity: 0, y: -50, duration: 0.3, ease: "power2.out" }, "-=0.1");

        // Hide SCROLL indicator and overlay when entering section 2
        ScrollTrigger.create({
            trigger: '#section2Wrapper',
            start: 'top bottom',
            onEnter: () => {
                const scrollIndicator = document.querySelector('.section1-scroll-indicator');
                const scrollOverlay = document.querySelector('.section1-scroll-overlay');
                if (scrollIndicator) scrollIndicator.classList.remove('visible');
                if (scrollOverlay) scrollOverlay.classList.remove('visible');
            }
        });

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
            .to('.section2-line2', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.1")
            .to('.section2-line3', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.1")
            .to('.section2-line1', { opacity: 0, y: -50, duration: 0.3, ease: "power2.out" }, "+=0.2")
            .to('.section2-line2', { opacity: 0, y: -50, duration: 0.3, ease: "power2.out" }, "-=0.1")
            .to('.section2-line3', { opacity: 0, y: -50, duration: 0.3, ease: "power2.out" }, "-=0.1");

        // Video size and position change for section 2 (smooth forward and backward)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#section2Wrapper',
                start: 'top center',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    // Only run if we're actually in section 2
                    if (self.progress > 0.1) {
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
        gsap.set(['.section3-line1'], {
            opacity: 0,
            y: 50
        });
        gsap.set(['.word-secure', '.word-private', '.word-enterprise', '.word-comprehensive'], {
            opacity: 0,
            y: 0
        });

        // Section 3: Simple text and word animations
        gsap.timeline({
            scrollTrigger: {
                trigger: '#section3Wrapper',
                start: 'top center',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    if (self.progress > 0.1) {
                        setActiveSection(2);
                    }

                    const progress = self.progress;
                    const words = ['.word-secure', '.word-private', '.word-enterprise', '.word-comprehensive'];

                    // Reset all words
                    words.forEach(word => gsap.set(word, { opacity: 0 }));

                    // Show "Meet Kahuna AI" when reaching center of section
                    if (progress > 0.1 && progress < 0.9) {
                        gsap.set('.section3-line1', { opacity: 1, y: 0 });
                    } else if (progress >= 0.9) {
                        // "Meet Kahuna AI" fades out
                        const fadeOut = (progress - 0.9) / 0.1;
                        gsap.set('.section3-line1', { opacity: 1 - fadeOut });
                    } else {
                        gsap.set('.section3-line1', { opacity: 0, y: 50 });
                    }

                    // Word cycling - start after "Meet Kahuna AI" appears
                    if (progress > 0.1 && progress < 0.8) {
                        const wordProgress = (progress - 0.1) * 4 / 0.7; // 4 words over 70% of progress
                        const currentWordIndex = Math.floor(wordProgress);
                        if (currentWordIndex < 4) {
                            gsap.set(words[currentWordIndex], { opacity: 1 });
                        }
                    } else if (progress >= 0.8 && progress < 0.9) {
                        // "Comprehensive" fades out first
                        const fadeOut = (progress - 0.8) / 0.1;
                        gsap.set('.word-comprehensive', { opacity: 1 - fadeOut });
                    }
                }
            }
        });

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

        // Show section 4 text when section 3 bottom reaches center of viewport
        ScrollTrigger.create({
            trigger: '#section3Wrapper',
            start: 'bottom center',
            end: 'bottom center',
            onEnter: () => {
                const textOverlay = document.getElementById('section4-text-overlay');
                if (textOverlay) {
                    textOverlay.classList.add('visible');
                }
            },
            onLeave: () => {
                const textOverlay = document.getElementById('section4-text-overlay');
                if (textOverlay) {
                    textOverlay.classList.remove('visible');
                }
            },
            onEnterBack: () => {
                const textOverlay = document.getElementById('section4-text-overlay');
                if (textOverlay) {
                    textOverlay.classList.add('visible');
                }
            },
            onLeaveBack: () => {
                const textOverlay = document.getElementById('section4-text-overlay');
                if (textOverlay) {
                    textOverlay.classList.remove('visible');
                }
            }
        });


        // Hide video after section 3
        gsap.timeline({
            scrollTrigger: {
                trigger: '#section3Wrapper',
                start: 'bottom top',
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
        // Device detection for frame count
        const isMobileDevice = window.innerWidth <= 768 || /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent);
        const totalFrames = isMobileDevice ? 97 : 134;
        let currentFrameIndex = 0;

        // Initialize frames array for GSAP
        const frames = [];
        for (let i = 1; i <= totalFrames; i++) {
            frames.push(`#frame-${i}`);
        }

        // Set all frames as hidden initially
        gsap.set(frames, { autoAlpha: 0 });
        gsap.set('#frame-1', { autoAlpha: 1 });

        // Function to check if device is mobile
        const isMobile = () => window.innerWidth <= 768;
        // Function to get frame limit based on device
        const getFrameLimit = () => isMobile() ? 30 : 60; // Same for both, but can be customized
        // Function to control section 4 text visibility
        const controlSection4Text = (frameIndex) => {
            const textOverlay = document.getElementById('section4-text-overlay');
            if (!textOverlay) return;
            const frameLimit = getFrameLimit();
            if (frameIndex <= frameLimit) {
                textOverlay.classList.add('visible');
            } else {
                textOverlay.classList.remove('visible');
            }
        };

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

                    // Show new frame (no dynamic loading - frames are preloaded)
                    const newFrameSel = frames[targetFrameIndex];
                    gsap.set(newFrameSel, { autoAlpha: 1 });
                    currentFrameIndex = targetFrameIndex;
                }

                // Control section 4 text visibility based on current frame
                controlSection4Text(currentFrameIndex);
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
