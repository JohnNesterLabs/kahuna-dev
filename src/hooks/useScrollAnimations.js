import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getVideoConfig, getGSAPConfig } from '../config/videoConfig';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = (activeSection, setActiveSection) => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Configure ScrollTrigger
        ScrollTrigger.config({
            ignoreMobileResize: true,
            syncInterval: 1
        });

        // Set initial video size for section 1
        const initialConfig = getGSAPConfig('section1');
        if (initialConfig && videoRef.current) {
            gsap.set(videoRef.current, initialConfig);
        }

        // Section 1: Hero section animations with 1st paragraph always visible
        gsap.set(['.section1-paragraph2', '.section1-paragraph3'], {
            opacity: 0,
            y: 50
        });

        // Set first paragraph to always be visible
        gsap.set('.section1-paragraph1', {
            opacity: 1,
            y: 0
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

                    const progress = self.progress;

                    // Fade in sequence (0-0.4): 2nd → 3rd (1st stays visible)
                    if (progress >= 0 && progress < 0.4) {
                        const fadeInProgress = progress / 0.4;

                        // 2nd paragraph fades in first (0-0.5 of fade in phase)
                        if (fadeInProgress >= 0 && fadeInProgress < 0.5) {
                            const p2Progress = fadeInProgress / 0.5;
                            gsap.set('.section1-paragraph2', {
                                opacity: p2Progress,
                                y: 50 - (50 * p2Progress)
                            });
                        } else if (fadeInProgress >= 0.5) {
                            gsap.set('.section1-paragraph2', { opacity: 1, y: 0 });
                        }

                        // 3rd paragraph fades in second (0.5-1 of fade in phase)
                        if (fadeInProgress >= 0.5) {
                            const p3Progress = (fadeInProgress - 0.5) / 0.5;
                            gsap.set('.section1-paragraph3', {
                                opacity: p3Progress,
                                y: 50 - (50 * p3Progress)
                            });
                        }
                    }

                    // Hold all visible (0.4-0.6)
                    else if (progress >= 0.4 && progress < 0.6) {
                        gsap.set(['.section1-paragraph1', '.section1-paragraph2', '.section1-paragraph3'], {
                            opacity: 1,
                            y: 0
                        });
                    }

                    // Fade out sequence (0.6-1): 2nd → 3rd (1st stays visible)
                    else if (progress >= 0.6) {
                        const fadeOutProgress = (progress - 0.6) / 0.4;

                        // 2nd paragraph fades out first (0-0.5 of fade out phase)
                        if (fadeOutProgress >= 0 && fadeOutProgress < 0.5) {
                            const p2Progress = Math.max(0, 1 - (fadeOutProgress / 0.5));
                            gsap.set('.section1-paragraph2', {
                                opacity: p2Progress,
                                y: -(50 * (1 - p2Progress))
                            });
                        } else {
                            gsap.set('.section1-paragraph2', { opacity: 0, y: -50 });
                        }

                        // 3rd paragraph fades out second (0.5-1 of fade out phase)
                        if (fadeOutProgress >= 0.5) {
                            const p3Progress = Math.max(0, 1 - ((fadeOutProgress - 0.5) / 0.5));
                            gsap.set('.section1-paragraph3', {
                                opacity: p3Progress,
                                y: -(50 * (1 - p3Progress))
                            });
                        } else {
                            gsap.set('.section1-paragraph3', { opacity: 0, y: -50 });
                        }
                    }
                }
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
                bottom: '50%',
                left: '80%',
                x: '-50%',
                y: '50%',
                duration: 1
            });

        // Section 2: Smooth scrolling animations with sequential fade in/out
        gsap.set(['.section2-paragraph1', '.section2-paragraph2', '.section2-paragraph3'], {
            opacity: 0,
            y: 50
        });

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

                    const progress = self.progress;

                    // Fade in sequence (0-0.6): 1st → 2nd → 3rd (slower)
                    if (progress >= 0 && progress < 0.6) {
                        const fadeInProgress = progress / 0.6;

                        // 1st paragraph fades in first (0-0.33 of fade in phase)
                        if (fadeInProgress >= 0 && fadeInProgress < 0.33) {
                            const p1Progress = (fadeInProgress - 0) / 0.33;
                            gsap.set('.section2-paragraph1', {
                                opacity: p1Progress,
                                y: 50 - (50 * p1Progress)
                            });
                        } else if (fadeInProgress >= 0.33) {
                            gsap.set('.section2-paragraph1', { opacity: 1, y: 0 });
                        }

                        // 2nd paragraph fades in second (0.33-0.66 of fade in phase)
                        if (fadeInProgress >= 0.33 && fadeInProgress < 0.66) {
                            const p2Progress = (fadeInProgress - 0.33) / 0.33;
                            gsap.set('.section2-paragraph2', {
                                opacity: p2Progress,
                                y: 50 - (50 * p2Progress)
                            });
                        } else if (fadeInProgress >= 0.66) {
                            gsap.set('.section2-paragraph2', { opacity: 1, y: 0 });
                        }

                        // 3rd paragraph fades in third (0.66-1 of fade in phase)
                        if (fadeInProgress >= 0.66) {
                            const p3Progress = (fadeInProgress - 0.66) / 0.34;
                            gsap.set('.section2-paragraph3', {
                                opacity: p3Progress,
                                y: 50 - (50 * p3Progress)
                            });
                        }
                    }

                    // Hold all visible (0.6-0.7)
                    else if (progress >= 0.6 && progress < 0.7) {
                        gsap.set(['.section2-paragraph1', '.section2-paragraph2', '.section2-paragraph3'], {
                            opacity: 1,
                            y: 0
                        });
                    }

                    // Fade out sequence (0.7-1): 1st → 2nd → 3rd
                    else if (progress >= 0.7) {
                        const fadeOutProgress = (progress - 0.7) / 0.3;

                        // 1st paragraph fades out first (0-0.33)
                        if (fadeOutProgress >= 0 && fadeOutProgress < 0.33) {
                            const p1Progress = 1 - (fadeOutProgress / 0.33);
                            gsap.set('.section2-paragraph1', { opacity: p1Progress, y: -(50 * (1 - p1Progress)) });
                            gsap.set('.section2-paragraph2', { opacity: 1, y: 0 });
                            gsap.set('.section2-paragraph3', { opacity: 1, y: 0 });
                        }
                        // 2nd paragraph fades out second (0.33-0.66)
                        else if (fadeOutProgress >= 0.33 && fadeOutProgress < 0.66) {
                            gsap.set('.section2-paragraph1', { opacity: 0, y: -50 });
                            const p2Progress = 1 - ((fadeOutProgress - 0.33) / 0.33);
                            gsap.set('.section2-paragraph2', { opacity: p2Progress, y: -(50 * (1 - p2Progress)) });
                            gsap.set('.section2-paragraph3', { opacity: 1, y: 0 });
                        }
                        // 3rd paragraph fades out third (0.66-1)
                        else if (fadeOutProgress >= 0.66) {
                            gsap.set('.section2-paragraph1', { opacity: 0, y: -50 });
                            gsap.set('.section2-paragraph2', { opacity: 0, y: -50 });
                            const p3Progress = 1 - ((fadeOutProgress - 0.66) / 0.34);
                            gsap.set('.section2-paragraph3', { opacity: p3Progress, y: -(50 * (1 - p3Progress)) });
                        }
                    }
                }
            }
        });

        // Video size change for section 2 (smooth forward and backward)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#section2Wrapper',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    // Smoothly transition size based on scroll progresss
                    const progress = self.progress;
                    const section1To2Config = getGSAPConfig('section1To2');
                    const section2Config = getGSAPConfig('section2');

                    if (videoRef.current) {
                        // Interpolate between section1To2 and section2 based on progress
                        const currentScale = section1To2Config.scale + (section2Config.scale - section1To2Config.scale) * progress;

                        gsap.set(videoRef.current, {
                            scale: currentScale,
                            width: section2Config.width,
                            borderRadius: section2Config.borderRadius
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
                bottom: '50%',
                left: '50%',
                x: '-50%',
                y: '50%',
                duration: 1
            });

        // Section 3: Interactive section animations with sequential fade in/out
        gsap.set(['.section3-title'], {
            opacity: 0,
            y: 50
        });

        // Set initial state for word loop items
        gsap.set(['#word-secure', '#word-private', '#word-enterprise', '#word-comprehensive'], {
            opacity: 0,
            y: 100
        });

        // Section 3: Title animation with sequential fade in/out
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

                    const progress = self.progress;

                    // Fade in sequence (0-0.6): Title fades in (slower)
                    if (progress >= 0 && progress < 0.6) {
                        const fadeInProgress = progress / 0.6;
                        const titleProgress = fadeInProgress;
                        gsap.set('.section3-title', {
                            opacity: titleProgress,
                            y: 50 - (50 * titleProgress)
                        });
                    }

                    // Hold visible (0.6-0.7)
                    else if (progress >= 0.6 && progress < 0.7) {
                        gsap.set('.section3-title', {
                            opacity: 1,
                            y: 0
                        });
                    }

                    // Fade out sequence (0.7-1): Title fades out (slower)
                    else if (progress >= 0.7) {
                        const fadeOutProgress = (progress - 0.7) / 0.3;
                        const titleProgress = 1 - fadeOutProgress;
                        gsap.set('.section3-title', {
                            opacity: titleProgress,
                            y: -(50 * (1 - titleProgress))
                        });
                    }
                }
            }
        });

        // Word Loop Animation with fade out
        const words = ['#word-secure', '#word-private', '#word-enterprise', '#word-comprehensive'];

        gsap.timeline({
            scrollTrigger: {
                trigger: '#section3Wrapper',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;

                    // Word loop phase (0-0.8): Show words sequentially (slower)
                    if (progress >= 0 && progress < 0.8) {
                        const wordProgress = progress / 0.8;
                        const wordIndex = Math.floor(wordProgress * words.length);
                        const currentWordIndex = Math.min(wordIndex, words.length - 1);

                        // Hide all words first
                        words.forEach((word, index) => {
                            const element = document.querySelector(word);
                            if (element) {
                                if (index === currentWordIndex) {
                                    // Show current word
                                    gsap.set(element, {
                                        opacity: 1,
                                        y: 0,
                                        className: 'word-loop-item active'
                                    });
                                } else if (index < currentWordIndex) {
                                    // Slide up previous words
                                    gsap.set(element, {
                                        opacity: 0,
                                        y: -100,
                                        className: 'word-loop-item slide-up'
                                    });
                                } else {
                                    // Hide future words
                                    gsap.set(element, {
                                        opacity: 0,
                                        y: 100,
                                        className: 'word-loop-item'
                                    });
                                }
                            }
                        });
                    }

                    // Fade out phase (0.8-1): All words fade out (slower)
                    else if (progress >= 0.8) {
                        const fadeOutProgress = (progress - 0.8) / 0.2;

                        words.forEach((word, index) => {
                            const element = document.querySelector(word);
                            if (element) {
                                // Fade out all words with slight delay for "Comprehensive"
                                const delay = index === words.length - 1 ? 0.1 : 0; // "Comprehensive" fades out last
                                const adjustedProgress = Math.max(0, fadeOutProgress - delay);
                                const opacity = 1 - adjustedProgress;

                                gsap.set(element, {
                                    opacity: opacity,
                                    y: -(100 * (1 - opacity)),
                                    className: 'word-loop-item slide-up'
                                });
                            }
                        });
                    }
                }
            }
        });

        // Video size change for section 3 (smooth forward and backward)
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

                    if (videoRef.current) {
                        // Interpolate between section2To3 and section3 based on progress
                        const currentScale = section2To3Config.scale + (section3Config.scale - section2To3Config.scale) * progress;

                        gsap.set(videoRef.current, {
                            scale: currentScale,
                            width: section3Config.width,
                            borderRadius: section3Config.borderRadius
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
