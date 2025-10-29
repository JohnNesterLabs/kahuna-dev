import React, { useState } from 'react';
import Header from './Header';
import FloatingVideo from './FloatingVideo';
import ConsolidatedSections from './ConsolidatedSections';
import PinnedSection from './PinnedSection';
import Footer from './Footer';
import { useNavigation, useScrollAnimations } from '../hooks';

const Home = () => {
  const { activeSection, setActiveSection } = useNavigation();
  const { videoRef } = useScrollAnimations(activeSection, setActiveSection);
  const [currentFrame, setCurrentFrame] = React.useState(1);
  const [isMobile, setIsMobile] = React.useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Handle video modal close
  const handleVideoModalClose = () => {
      setShowVideoModal(false);
      setIsVideoPlaying(true); // Reset video state when modal closes
  };

  // Handle video click to pause/play
  const handleVideoClick = () => {
      if (videoRef.current) {
          if (isVideoPlaying) {
              videoRef.current.pause();
              setIsVideoPlaying(false);
          } else {
              videoRef.current.play();
              setIsVideoPlaying(true);
          }
      }
  };


  // Mobile detection
  React.useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) ||
                    window.innerWidth <= 768 ||
                    ('ontouchstart' in window);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for frame changes from PinnedSection
  React.useEffect(() => {
    const handleFrameChange = (event) => {
      if (event.detail && typeof event.detail.frame === 'number') {
        setCurrentFrame(event.detail.frame);
      }
    };

    window.addEventListener('frameChanged', handleFrameChange);
    return () => window.removeEventListener('frameChanged', handleFrameChange);
  }, []);

  return (
    <div className="app-container">
      {/* Header - Visible in sections 1, 2, 3, 4 but not footer */}
      <Header />

      {/* Floating Video */}
      <FloatingVideo ref={videoRef} />

      {/* Consolidated Sections 1, 2, 3 */}
      <ConsolidatedSections />


      {showVideoModal && (
                <div 
                  className="video-modal-overlay" 
                  onClick={handleVideoModalClose}
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 999999,
                    pointerEvents: 'auto'
                  }}
                >
                    <div 
                      className="video-modal-content" 
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: 'relative',
                        width: '90vw',
                        maxWidth: '90vw',
                        height: '90vh',
                        maxHeight: '90vh',
                        backgroundColor: '#000',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        zIndex: 1000000,
                        pointerEvents: 'auto'
                      }}
                    >
                        <button
                            className="video-modal-close"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleVideoModalClose();
                            }}
                            aria-label="Close video"
                            type="button"
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                zIndex: 1002,
                                pointerEvents: 'auto'
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            </svg>
                        </button>
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <video
                                ref={videoRef}
                                className="video-modal-video"
                                src="/Ticket 1 Final (Compressed).mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                onClick={handleVideoClick}
                                style={{ cursor: 'pointer', width: '100%', height: '100%', objectFit: 'contain' }}
                            >
                                Your browser does not support the video tag.
                            </video>
                            {/* Play/Pause indicator overlay */}
                            {!isVideoPlaying && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        background: 'rgba(0, 0, 0, 0.7)',
                                        borderRadius: '50%',
                                        width: '80px',
                                        height: '80px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        zIndex: 10
                                    }}
                                    onClick={handleVideoClick}
                                >
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="white"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

      {/* Test Button - Only visible in Section 3 with frame range conditions, hidden when modal is open */}
      {(() => {
        const isInSection3 = activeSection === 3;
        const frameRange = isMobile ? { min: 45, max: 55 } : { min: 66, max: 76 };
        const isInFrameRange = currentFrame >= frameRange.min && currentFrame <= frameRange.max;
        const shouldShow = isInSection3 && isInFrameRange && !showVideoModal; // Hide when modal is open
        
        return (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 999999,
            pointerEvents: shouldShow ? 'auto' : 'none',
            opacity: shouldShow ? 1 : 0,
            visibility: shouldShow ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease'
          }}>
            <button 
              onClick={(e) => {
                if (!shouldShow) return;
                e.preventDefault();
                e.stopPropagation();
                setShowVideoModal(true);
              }}
              onMouseDown={(e) => {
                if (!shouldShow) return;
                // No visual changes for invisible button
              }}
              onMouseUp={(e) => {
                if (!shouldShow) return;
                // No visual changes for invisible button
              }}
              onMouseEnter={(e) => {
                if (!shouldShow) return;
                // No visual changes for invisible button
              }}
              onMouseLeave={(e) => {
                if (!shouldShow) return;
                // No visual changes for invisible button
              }}
              style={{
                background: 'transparent',
                color: 'transparent',
                border: 'none',
                borderRadius: '25px',
                padding: '15px 30px',
                fontSize: '16px',
                width: '700px',
                height: '500px',
                fontWeight: 'bold',
                cursor: shouldShow ? 'pointer' : 'default',
                boxShadow: 'none',
                transition: 'all 0.3s ease',
                pointerEvents: 'auto',
                zIndex: 999999,
                position: 'relative',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              🧪 Test Button (Section 3)
            </button>
          </div>
        );
      })()}

      {/* Section 4 - Pinned Section */}
      <PinnedSection />

      {/* Footer Section - Header hidden here */}
      <Footer />
    </div>
  );
};

export default Home;
