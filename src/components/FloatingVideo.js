import React, { forwardRef } from 'react';

const FloatingVideo = forwardRef(({ isVisible = true }, ref) => {
    if (!isVisible) return null;

    return (
        <div className="floating-video" id="floatingVideo" ref={ref}>
            <video
                autoPlay
                muted
                loop
                playsInline
                className="floating-video-element"
            >
                <source src="/hero4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
});

FloatingVideo.displayName = 'FloatingVideo';

export default FloatingVideo;
