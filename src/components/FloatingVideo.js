import React, { forwardRef } from 'react';

const FloatingVideo = forwardRef(({ isVisible = true }, ref) => {
    if (!isVisible) return null;

    return (
        <div className="floating-video" id="floatingVideo" ref={ref}>
            <div className="video-placeholder">
                Video Placeholder
            </div>
        </div>
    );
});

FloatingVideo.displayName = 'FloatingVideo';

export default FloatingVideo;
