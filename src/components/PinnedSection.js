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

            // Create all frame elements
            for (let i = 1; i <= totalFrames; i++) {
                const frameNumber = i.toString().padStart(4, '0');
                const img = document.createElement('img');
                img.className = 'frame';
                img.id = `frame-${i}`;
                img.alt = `Frame ${i}`;
                img.src = `public/frames-desktop-webp/frame_${frameNumber}.webp`;
                img.style.opacity = i === 1 ? '1' : '0';
                frameContainerRef.current.appendChild(img);
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
                        <img src="public/new-model.png" alt="Pinned visual" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PinnedSection;
