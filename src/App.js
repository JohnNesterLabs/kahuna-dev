import './App.css';
import Home from './components/Home';
import BlogListing from './components/BlogListing';
import BlogDetail from './components/BlogDetail';
import Loader from './components/Loader/Loader';
import { useAssetPreloader } from './hooks/useAssetPreloader';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  const [showLoader, setShowLoader] = useState(true);
  const [loaderFadeOut, setLoaderFadeOut] = useState(false);
  const { progress, isLoading, error, loadedCount, totalAssets } = useAssetPreloader();

  // Handle loader completion
  const handleLoaderComplete = () => {
    console.log('🎉 Loader completed, transitioning to main app...');
    setLoaderFadeOut(true);
    // Wait for fade out animation to complete
    setTimeout(() => {
      setShowLoader(false);
    }, 500);
  };

  // Auto-complete loader when assets are loaded
  useEffect(() => {
    if (!isLoading && progress === 100 && !error) {
      console.log(`✅ All assets loaded: ${loadedCount}/${totalAssets}`);
      // Show 100% for a moment before auto-completing
      setTimeout(() => {
        handleLoaderComplete();
      }, 800);
    }
  }, [isLoading, progress, error, loadedCount, totalAssets]);

  // Handle errors by allowing user to skip
  useEffect(() => {
    if (error) {
      console.warn('⚠️ Asset loading error, allowing user to skip:', error);
    }
  }, [error]);
  return (
    <BrowserRouter>
      <div className="App">
        {showLoader && (
          <Loader
            progress={progress}
            onComplete={handleLoaderComplete}
            fadeOut={loaderFadeOut}
            loadedCount={loadedCount}
            totalAssets={totalAssets}
            error={error}
          />
        )}

        {!showLoader && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogListing />} />
            <Route path="/blog-detail" element={<BlogDetail />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;

