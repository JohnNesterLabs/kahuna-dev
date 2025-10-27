import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = (activeSection, setActiveSection) => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Configure ScrollTrigger
        ScrollTrigger.config({
            ignoreMobileResize: true,
            syncInterval: 1
        });

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
                scrub: 1
            }
        })
            .to(videoRef.current, {
                bottom: '50%',
                left: '80%',
                x: '-50%',
                y: '50%',
                scale: 1,
                duration: 1
            });

        // Section 2: Smooth scrolling animations
        gsap.set(['.section2-line1', '.section2-line2', '.section2-line3'], {
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
                }
            }
        })
            .to('.section2-line1', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
            .to('.section2-line2', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
            .to('.section2-line3', { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });

        // Video movement from right to center (between Section 2 and 3)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#section2Wrapper',
                start: 'bottom center',
                end: 'bottom top',
                scrub: 1
            }
        })
            .to(videoRef.current, {
                bottom: '50%',
                left: '50%',
                x: '-50%',
                y: '50%',
                scale: 1.1,
                duration: 1
            });

        // Section 3: Interactive section animations
        gsap.set(['.section3-line1', '.section3-line2', '.section3-line3'], {
            opacity: 0,
            y: 50
        });

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

        // Hide video after section 3
        gsap.timeline({
            scrollTrigger: {
                trigger: '#section3Wrapper',
                start: 'bottom center',
                end: 'bottom top',
                scrub: 1
            }
        })
            .to(videoRef.current, { opacity: 0, scale: 0.8, duration: 0.5 });

        // Section 4: Pinned section with frame animation
        const totalFrames = 428;
        let currentFrameIndex = 0;

        ScrollTrigger.create({
            trigger: '#section4Wrapper',
            start: 'top top',
            end: '+=2500%',
            scrub: 1,
            pin: true,
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
                    const currentFrame = document.getElementById(`frame-${currentFrameIndex + 1}`);
                    if (currentFrame) {
                        gsap.set(currentFrame, { autoAlpha: 0 });
                    }

                    // Show new frame
                    const newFrame = document.getElementById(`frame-${targetFrameIndex + 1}`);
                    if (newFrame) {
                        gsap.set(newFrame, { autoAlpha: 1 });
                        currentFrameIndex = targetFrameIndex;
                    }
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
