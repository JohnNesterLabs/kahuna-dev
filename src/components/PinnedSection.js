import React, { useEffect, useRef, useState, useCallback } from 'react';

// Device detection utility
const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) ||
           window.innerWidth <= 768 ||
           ('ontouchstart' in window);
};

const PinnedSection = () => {
    const frameContainerRef = useRef(null);
    const [currentFrame, setCurrentFrame] = useState(1);
    const framePoolRef = useRef(new Map()); // Frame pool for memory management
    const loadedFramesRef = useRef(new Set()); // Track loaded frames
    
    // Device-specific frame configuration
    const isMobile = isMobileDevice();
    const totalFrames = isMobile ? 97 : 134;
    const frameFolder = isMobile ? '/frames-full-mobile/' : '/frames-desktop-webp/';
    
    // Frame pooling configuration for mobile optimization
    const POOL_SIZE = isMobile ? 3 : 8; // Keep only 3 frames in memory on mobile (reduced from 5)
    const PRELOAD_RANGE = isMobile ? 1 : 2; // Preload only 1 frame ahead/behind on mobile (reduced from 2)

    // Create frame element with optimizations
    const createFrameElement = useCallback((frameIndex) => {
        const img = document.createElement('img');
        img.className = 'frame';
        img.id = `frame-${frameIndex}`;
        img.alt = `Frame ${frameIndex}`;
        
        // iOS Safari optimizations
        img.style.willChange = 'opacity, transform';
        img.style.webkitTransform = 'translateZ(0)';
        img.style.transform = 'translateZ(0)';
        img.style.backfaceVisibility = 'hidden';
        img.style.webkitBackfaceVisibility = 'hidden';
        
        // Set src with device-specific path and loading optimization
        const frameNumber = frameIndex.toString().padStart(4, '0');
        img.src = `${frameFolder}frame_${frameNumber}.webp`;
        
        // All frames start visible
        img.style.opacity = '1';
        
        // Set initial visibility - all frames visible
        if (window.gsap) {
            window.gsap.set(img, { 
                autoAlpha: 1, // All frames are visible
                force3D: true,
                willChange: 'opacity, transform'
            });
        }
        
        // Mobile Safari memory optimizations
        if (isMobile) {
            img.loading = 'lazy'; // Lazy load images
            img.decoding = 'async'; // Async decoding
            img.style.imageRendering = 'optimizeSpeed'; // Faster rendering
            img.style.imageRendering = '-webkit-optimize-contrast'; // iOS optimization
        }
        
        return img;
    }, [frameFolder]);

    // Frame pooling management with advanced lazy loading
    const manageFramePool = useCallback((currentFrameIndex) => {
        if (!frameContainerRef.current) return;

        const pool = framePoolRef.current;
        const loadedFrames = loadedFramesRef.current;
        
        // Calculate frame range to keep in memory - more conservative on mobile
        const startFrame = Math.max(1, currentFrameIndex - PRELOAD_RANGE);
        const endFrame = Math.min(totalFrames, currentFrameIndex + PRELOAD_RANGE);
        
        // Remove frames outside the range
        const framesToRemove = [];
        pool.forEach((element, frameIndex) => {
            if (frameIndex < startFrame || frameIndex > endFrame) {
                framesToRemove.push(frameIndex);
            }
        });
        
        // Remove out-of-range frames with aggressive cleanup for mobile
        framesToRemove.forEach(frameIndex => {
            const element = pool.get(frameIndex);
            if (element && element.parentNode) {
                // Clear image source to free memory on mobile
                if (isMobile) {
                    element.src = '';
                    element.removeAttribute('src');
                    // Clear any GSAP properties
                    if (window.gsap) {
                        window.gsap.set(element, { clearProps: "all" });
                    }
                }
                element.parentNode.removeChild(element);
            }
            pool.delete(frameIndex);
            loadedFrames.delete(frameIndex);
        });
        
        // Force garbage collection on mobile if available
        if (isMobile && window.gc) {
            setTimeout(() => window.gc(), 50); // More frequent GC on mobile
        }
        
        // Add frames within range that aren't loaded yet - with delay for mobile
        const loadFrame = (frameIndex) => {
            if (!pool.has(frameIndex)) {
                const frameElement = createFrameElement(frameIndex);
                frameContainerRef.current.appendChild(frameElement);
                pool.set(frameIndex, frameElement);
                loadedFrames.add(frameIndex);
            }
        };
        
        // Load frames immediately without delays to prevent blinking
        if (isMobile) {
            // Load current frame immediately
            loadFrame(currentFrameIndex);
            
            // Preload adjacent frames immediately
            if (startFrame < currentFrameIndex) loadFrame(startFrame);
            if (endFrame > currentFrameIndex) loadFrame(endFrame);
        } else {
            // Load all frames at once on desktop
            for (let i = startFrame; i <= endFrame; i++) {
                loadFrame(i);
            }
        }
    }, [createFrameElement, totalFrames, PRELOAD_RANGE, isMobile]);

    // Initialize with first few frames
    useEffect(() => {
        if (frameContainerRef.current) {
            // Clear existing frames
            frameContainerRef.current.innerHTML = '';
            framePoolRef.current.clear();
            loadedFramesRef.current.clear();

            // Initialize with first frame and preload range
            manageFramePool(1);
        }
    }, [manageFramePool]);

    // Memory monitoring for mobile devices
    const checkMemoryUsage = useCallback(() => {
        if (isMobile && 'memory' in performance) {
            const memory = performance.memory;
            const usedMB = memory.usedJSHeapSize / 1024 / 1024;
            const totalMB = memory.totalJSHeapSize / 1024 / 1024;
            const usagePercent = (usedMB / totalMB) * 100;
            
            // If memory usage is high, be more aggressive with cleanup
            if (usagePercent > 70) {
                const pool = framePoolRef.current;
                const currentSize = pool.size;
                
                // Reduce pool size if memory is high
                if (currentSize > 2) {
                    const framesToRemove = Array.from(pool.keys()).slice(0, currentSize - 2);
                    framesToRemove.forEach(frameIndex => {
                        const element = pool.get(frameIndex);
                        if (element && element.parentNode) {
                            element.src = '';
                            element.removeAttribute('src');
                            element.parentNode.removeChild(element);
                        }
                        pool.delete(frameIndex);
                    });
                }
                
                // Force garbage collection
                if (window.gc) {
                    window.gc();
                }
            }
        }
    }, [isMobile]);

    // Expose frame pool management to parent components
    useEffect(() => {
        // Store the manageFramePool function globally so useScrollAnimations can access it
        window.manageFramePool = manageFramePool;
        window.checkMemoryUsage = checkMemoryUsage;
        
        // Monitor memory usage on mobile
        let memoryInterval;
        if (isMobile) {
            memoryInterval = setInterval(checkMemoryUsage, 2000); // Check every 2 seconds
        }
        
        // Ensure all frames are visible
        const ensureFrameVisibility = () => {
            const firstFrame = document.querySelector('#frame-1');
            if (firstFrame) {
                // Set opacity to 1 to make frame-1 visible
                firstFrame.style.opacity = '1';
                
                // Force GSAP properties
                if (window.gsap) {
                    window.gsap.set(firstFrame, { 
                        autoAlpha: 1,
                        opacity: 1,
                        force3D: true,
                        willChange: 'opacity, transform'
                    });
                }
            }
        };
        
        // Ensure frames have correct visibility after a short delay
        setTimeout(ensureFrameVisibility, 300);
        
        // Continuous monitoring to ensure frame-1 stays visible
        const frame1Monitor = setInterval(ensureFrameVisibility, 100); // Check every 100ms
        
        return () => {
            // Cleanup
            delete window.manageFramePool;
            delete window.checkMemoryUsage;
            if (memoryInterval) {
                clearInterval(memoryInterval);
            }
            if (frame1Monitor) {
                clearInterval(frame1Monitor);
            }
        };
    }, [manageFramePool, checkMemoryUsage, isMobile]);

    return (
        <div className="pinned-section" id="section4Wrapper">
            <div className="pinned-inner">
                {/* Frame container for animated frames - now full width */}
                <div className="pinned-left full-width">
                    <div className="frame-container" id="frame-container" ref={frameContainerRef}>
                        {/* Frames will be dynamically loaded here */}
                    </div>
                    <div className="section-label" id="section-label">
                        Pinned Content Area
                    </div>
                </div>
                {/* New text that fades in when section 3 bottom reaches center */}
                <div className="section4-text-overlay" id="section4-text-overlay">
                <p className="section4-main-text">
                        AI that automatically <br className="mobile-only" />
                        builds and nurtures your <br className="mobile-only" />
                        Troubleshooting Map
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PinnedSection;
