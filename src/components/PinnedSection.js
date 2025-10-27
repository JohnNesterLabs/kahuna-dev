import React, { useEffect, useRef, useState } from 'react';

const PinnedSection = () => {
    const frameContainerRef = useRef(null);
    const [currentFrame, setCurrentFrame] = useState(1);
    const totalFrames = 428;

    // Create frame elements dynamically
    useEffect(() => {
        if (frameContainerRef.current) {
            // Clear existing frames
            frameContainerRef.current.innerHTML = '';

            // Create all frame elements (without src initially)
            for (let i = 1; i <= totalFrames; i++) {
                const img = document.createElement('img');
                img.className = 'frame';
                img.id = `frame-${i}`;
                img.alt = `Frame ${i}`;
                // Don't set src initially - will be loaded dynamically
                img.style.opacity = i === 1 ? '1' : '0';
                frameContainerRef.current.appendChild(img);
            }

            // Load the first frame
            const firstFrame = document.getElementById('frame-1');
            if (firstFrame) {
                firstFrame.src = '/frames-desktop-webp/frame_0001.webp';
            }
        }
    }, [totalFrames]);

    return (
        <div className="pinned-section neon-border" id="section4Wrapper">
            <div className="pinned-inner">
                {/* Left: Frame container for animated frames */}
                <div className="pinned-left">
                    <div className="frame-container" id="frame-container" ref={frameContainerRef}>
                        {/* Frames will be dynamically loaded here */}
                    </div>
                    <div className="section-label" id="section-label">
                        Pinned Content Area
                    </div>
                </div>
                {/* Right: Single image used for all sections */}
                <div className="pinned-right">
                    <div className="image-wrap" id="the-image">
                        <div className="placeholder-image">
                            Pinned Visual
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PinnedSection;
