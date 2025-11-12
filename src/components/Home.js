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
  const [showNavigationLoader, setShowNavigationLoader] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  // Expose setActiveSection to window for external navigation
  React.useEffect(() => {
    window.setActiveSection = setActiveSection;
    return () => {
      delete window.setActiveSection;
    };
  }, [setActiveSection]);

  // Handle video modal close
  const handleVideoModalClose = () => {
      setShowVideoModal(false);
      setIsVideoPlaying(true); // Reset video state when modal closes
      setVideoProgress(0); // Reset progress when modal closes
      setVideoDuration(0); // Reset duration when modal closes
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

  // Handle video time update
  const handleTimeUpdate = () => {
      if (videoRef.current) {
          const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
          setVideoProgress(progress || 0);
      }
  };

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
      if (videoRef.current) {
          setVideoDuration(videoRef.current.duration || 0);
      }
  };

  // Handle progress bar click to seek
  const handleProgressBarClick = (e) => {
      if (videoRef.current && videoDuration > 0) {
          const progressBar = e.currentTarget;
          const rect = progressBar.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const percentage = clickX / rect.width;
          const newTime = percentage * videoDuration;
          videoRef.current.currentTime = newTime;
          setVideoProgress(percentage * 100);
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

  // Check for navigation from BlogListing and show loader
  React.useEffect(() => {
    // Check if we're navigating from blog page
    const isNavigating = sessionStorage.getItem('navigatingToSection4') === 'true';
    const targetFrame = parseInt(sessionStorage.getItem('targetFrame') || '65', 10);
    
    if (isNavigating) {
      setShowNavigationLoader(true);
      // Clear the flag
      sessionStorage.removeItem('navigatingToSection4');
    }

    // Listen for navigation completion event
    const handleNavigationComplete = (event) => {
      // Wait a bit to ensure frame is visible, then hide loader
      setTimeout(() => {
        setShowNavigationLoader(false);
        sessionStorage.removeItem('navigationComplete');
        sessionStorage.removeItem('targetFrame');
      }, 500);
    };

    window.addEventListener('navigationComplete', handleNavigationComplete);
    
    // Also check if frame matches target frame (with some tolerance)
    const checkFrameMatch = () => {
      if (showNavigationLoader && Math.abs(currentFrame - targetFrame) <= 1) {
        setTimeout(() => {
          setShowNavigationLoader(false);
          sessionStorage.removeItem('navigationComplete');
          sessionStorage.removeItem('targetFrame');
        }, 500);
      }
    };

    if (showNavigationLoader) {
      const frameCheckInterval = setInterval(checkFrameMatch, 100);
      // Stop checking after 5 seconds max
      setTimeout(() => {
        clearInterval(frameCheckInterval);
        // Hide loader after max time even if frame not reached
        if (showNavigationLoader) {
          setShowNavigationLoader(false);
        }
      }, 5000);
      
      return () => clearInterval(frameCheckInterval);
    }

    return () => {
      window.removeEventListener('navigationComplete', handleNavigationComplete);
    };
  }, [currentFrame, showNavigationLoader]);

  return (
    <div className="app-container">
      {/* Navigation Loader Overlay - Shows when navigating from BlogListing */}
      {showNavigationLoader && (
        <div 
          className="navigation-loader-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            transition: 'opacity 0.3s ease'
          }}
        >
          <div 
            className="spinner" 
            style={{ 
              width: '50px',
              height: '50px',
              border: '3px solid #333',
              borderTop: '3px solid #FAFAFA',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          ></div>
        </div>
      )}

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
                        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                            <video
                                ref={videoRef}
                                className="video-modal-video"
                                src="/Ticket 1 Final (Compressed).mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                onClick={handleVideoClick}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                style={{ cursor: 'pointer', width: '100%', height: '100%', objectFit: 'contain' }}
                            >
                                Your browser does not support the video tag.
                            </video>
                            
                            {/* Interactive Progress Bar */}
                            <div
                                className="video-progress-bar"
                                onClick={handleProgressBarClick}
                            >
                                <div
                                    className="video-progress-bar-fill"
                                    style={{ width: `${videoProgress}%` }}
                                >
                                    {/* Progress indicator dot */}
                                    <div className="video-progress-bar-dot" />
                                </div>
                            </div>
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
                                        zIndex: 1000
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
        const frameRange = isMobile ? { min: 34, max: 43 } : { min: 65, max: 75 };
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
