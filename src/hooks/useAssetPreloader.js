import { useState, useEffect, useCallback, useRef } from 'react';

// Global image cache for preloaded images
if (typeof window !== 'undefined') {
    window.preloadedImages = window.preloadedImages || new Map();
}

// Device detection utility
const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) ||
           window.innerWidth <= 768 ||
           ('ontouchstart' in window);
};

// PNG frame generation removed - not used in current implementation

// Get device-specific assets to preload
const getAssetsToPreload = () => {
    const isMobile = isMobileDevice();
    // Keep base assets lightweight; do not preload large videos to avoid
    // duplicate range requests while the <video> element streams them.
    const baseAssets = [
        '/hero4.mp4',
        '/Ticket 1 Final (Compressed).mp4',
        '/Logo-color.svg',
        '/kahuna-logo-3.svg',
        '/LinkedIn-Icon.png',
    ];

    if (isMobile) {
        return [
            ...baseAssets,
            ...generateWebPMobileFramePaths(97, '/frames-full-mobile/')
        ];
    } else {
        return [
            ...baseAssets,
            ...generateWebPDesktopFramePaths(134, '/frames-desktop-webp/')
        ];
    }
};

// Generate WebP mobile frame paths
const generateWebPMobileFramePaths = (totalFrames = 97, folderPath = '/frames-full-mobile/') => {
    const frames = [];
    for (let i = 1; i <= totalFrames; i++) {
        const frameNumber = i.toString().padStart(4, '0');
        frames.push(`${folderPath}frame_${frameNumber}.webp`);
    }
    return frames;
};

// Generate WebP desktop frame paths for section4 animation
const generateWebPDesktopFramePaths = (totalFrames = 134, folderPath = '/frames-desktop-webp/') => {
    const frames = [];
    for (let i = 1; i <= totalFrames; i++) {
        const frameNumber = i.toString().padStart(4, '0');
        frames.push(`${folderPath}frame_${frameNumber}.webp`);
    }
    return frames;
};

// Assets are now loaded dynamically based on device type using getAssetsToPreload()

export const useAssetPreloader = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedAssets, setLoadedAssets] = useState(new Set());
    const [error, setError] = useState(null);
    
    // Use refs to track assets without causing re-renders
    const loadedAssetsRef = useRef(new Set());
    // Track requested assets to prevent duplicate fetches across re-renders
    const requestedAssetsRef = useRef((typeof window !== 'undefined' && window.__requestedAssetsRef) || new Set());
    if (typeof window !== 'undefined') {
        window.__requestedAssetsRef = requestedAssetsRef.current;
    }

    const preloadAsset = useCallback((src) => {
        return new Promise((resolve, reject) => {
            // Dedupe: if request already in-flight or completed, resolve immediately
            if (requestedAssetsRef.current.has(src) || loadedAssetsRef.current.has(src)) {
                return resolve(src);
            }
            requestedAssetsRef.current.add(src);
            // Determine asset type
            const isVideo = src.includes('.mp4');
            const isImage = src.includes('.jpg') || src.includes('.png') || src.includes('.gif') || src.includes('.svg') || src.includes('.webp');
            // PNG frame detection removed - no longer used
            const isWebPFrame = src.includes('/frames-mobile-30fps/mobile_frame_');

            if (isVideo) {
                // Skip preloading large videos; let the visible <video> element load them once.
                // Resolving immediately keeps the progress accurate without extra network usage.
                resolve(src);
            } else if (isImage) {
                const img = new Image();
                img.onload = () => {
                    // Store the loaded image in global cache
                    if (typeof window !== 'undefined' && window.preloadedImages) {
                        window.preloadedImages.set(src, img);
                    }

                    if (isWebPFrame) {
                        console.log(`✓ WebP mobile frame loaded: ${src}`);
                    } else {
                        console.log(`✓ Image loaded: ${src}`);
                    }
                    resolve(src);
                };
                img.onerror = () => {
                    console.warn(`✗ Failed to load image: ${src}`);
                    reject(new Error(`Failed to load image: ${src}`));
                };
                img.src = src;
            } else {
                // For other assets (SVG, etc.), try to fetch them
                fetch(src)
                    .then(response => {
                        if (response.ok) {
                            console.log(`✓ Asset loaded: ${src}`);
                            resolve(src);
                        } else {
                            console.warn(`✗ Failed to load asset: ${src}`);
                            reject(new Error(`Failed to load asset: ${src}`));
                        }
                    })
                    .catch(error => {
                        console.warn(`✗ Network error loading: ${src}`, error);
                        reject(error);
                    });
            }
        });
    }, []); // Empty deps - uses refs which don't change

    const preloadAssets = useCallback(async () => {
        setIsLoading(true);
        setProgress(0);
        setError(null);
        loadedAssetsRef.current = new Set();
        setLoadedAssets(new Set());

        const assetsToPreload = getAssetsToPreload();
        const totalAssets = assetsToPreload.length;
        let loadedCount = 0;

        try {

            // Separate critical assets from frame sequences
            const criticalAssets = assetsToPreload.slice(0, 8); // First 8 are critical (videos + logos)
            const frameAssets = assetsToPreload.slice(8); // Rest are frame sequences

            // Load critical assets first
            for (const asset of criticalAssets) {
                try {
                    await preloadAsset(asset);
                    loadedCount++;
                    loadedAssetsRef.current.add(asset);
                    setLoadedAssets(prev => new Set([...prev, asset]));
                    setProgress(Math.round((loadedCount / totalAssets) * 100));
                } catch (error) {
                    console.warn(`Failed to preload critical asset ${asset}:`, error);
                    loadedCount++;
                    setProgress(Math.round((loadedCount / totalAssets) * 100));
                }
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            // Load frame sequences in batches for better performance
            const batchSize = 20; // Load 20 frames at a time
            const totalBatches = Math.ceil(frameAssets.length / batchSize);

            for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
                const startIndex = batchIndex * batchSize;
                const endIndex = Math.min(startIndex + batchSize, frameAssets.length);
                const batch = frameAssets.slice(startIndex, endIndex);

                // Load batch in parallel
                const batchPromises = batch.map(async (asset) => {
                    try {
                        await preloadAsset(asset);
                        return { success: true, asset };
                    } catch (error) {
                        console.warn(`Failed to preload frame ${asset}:`, error);
                        return { success: false, asset, error };
                    }
                });

                // Wait for all promises in batch to complete
                const batchResults = await Promise.allSettled(batchPromises);

                // Update progress for each completed asset
                let batchLoadedCount = 0;
                const batchLoadedAssets = [];

                batchResults.forEach((result) => {
                    batchLoadedCount++;
                    if (result.status === 'fulfilled' && result.value.success) {
                        batchLoadedAssets.push(result.value.asset);
                        loadedAssetsRef.current.add(result.value.asset);
                    }
                });

                // Update counters
                loadedCount += batchLoadedCount;
                setLoadedAssets(prev => new Set([...prev, ...batchLoadedAssets]));
                setProgress(Math.round((loadedCount / totalAssets) * 100));

                // Small delay between batches to prevent overwhelming the network
                if (batchIndex < totalBatches - 1) {
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
            }

            // Ensure progress reaches 100%
            setProgress(100);

            // Small delay before completing to show 100% briefly
            await new Promise(resolve => setTimeout(resolve, 500));

            setIsLoading(false);
        } catch (error) {
            console.error('Asset preloading failed:', error);
            setError(error);
            setIsLoading(false);
        }
    }, [preloadAsset]);

    // Start preloading when hook is first used
    useEffect(() => {
        preloadAssets();
    }, [preloadAssets]);

    return {
        progress,
        isLoading,
        loadedAssets,
        error,
        retry: preloadAssets,
        totalAssets: getAssetsToPreload().length,
        loadedCount: loadedAssets.size
    };
};

