import { useEffect, useRef, useCallback } from 'react';
import { getCurrentDeviceType, getVideoConfig, applyVideoStyles } from '../config/videoConfig';

export const useVideoSizing = (videoRef, activeSection) => {
  const currentDeviceType = useRef(getCurrentDeviceType());
  const resizeTimeout = useRef(null);

  // Function to update video size based on current section and device
  const updateVideoSize = useCallback((section) => {
    if (!videoRef.current) return;

    const deviceType = getCurrentDeviceType();
    const config = getVideoConfig(section, deviceType);
    
    if (config) {
      applyVideoStyles(videoRef.current, config);
    }
  }, [videoRef]);

  // Function to handle device type changes
  const handleResize = useCallback(() => {
    // Debounce resize events
    if (resizeTimeout.current) {
      clearTimeout(resizeTimeout.current);
    }

    resizeTimeout.current = setTimeout(() => {
      const newDeviceType = getCurrentDeviceType();
      
      // Only update if device type actually changed
      if (newDeviceType !== currentDeviceType.current) {
        currentDeviceType.current = newDeviceType;
        updateVideoSize(activeSection);
      }
    }, 150);
  }, [activeSection, updateVideoSize]);

  // Update video size when active section changes
  useEffect(() => {
    updateVideoSize(activeSection);
  }, [activeSection, updateVideoSize]);

  // Set up resize listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
    };
  }, [handleResize]);

  // Return function to manually update video size
  return { updateVideoSize };
};
