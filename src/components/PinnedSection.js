import React, { useEffect, useRef, useState } from 'react';

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
    
    // Device-specific frame configuration
    const isMobile = isMobileDevice();
    const totalFrames = isMobile ? 97 : 134;
    const frameFolder = isMobile ? '/frames-full-mobile/' : '/frames-desktop-webp/';

    // Create frame elements and preload all frames
    useEffect(() => {
        if (frameContainerRef.current) {
            // Clear existing frames
            frameContainerRef.current.innerHTML = '';

            // Create all frame elements with device-specific src
            for (let i = 1; i <= totalFrames; i++) {
                const img = document.createElement('img');
                img.className = 'frame';
                img.id = `frame-${i}`;
                img.alt = `Frame ${i}`;
                
                // Set src with device-specific path - frames are preloaded by useAssetPreloader
                const frameNumber = i.toString().padStart(4, '0');
                img.src = `${frameFolder}frame_${frameNumber}.webp`;
                img.style.opacity = i === 1 ? '1' : '0';
                
                frameContainerRef.current.appendChild(img);
            }
        }
    }, [totalFrames, frameFolder]);

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
                        AI that automatically builds and nurtures your Troubleshooting Map
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PinnedSection;
