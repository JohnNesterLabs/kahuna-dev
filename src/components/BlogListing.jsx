import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './Header';
import Footer from './Footer';
import './BlogListing.css';

// Feed API configuration (moved outside component to avoid dependency issues)
const FEED_APIS = [
    {
        // Base URL without cache-busting (cache-busting added in fetch)
        url: "https://api.rss2json.com/v1/api.json?rss_url=" +
            encodeURIComponent("https://mytestblog2025.wordpress.com/feed/?posts_per_page=20"),
        author: "team"
    }
];

const BlogListing = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [navigating, setNavigating] = useState(false);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);

                // Fetch all feeds and combine results
                const allPosts = await Promise.all(
                    FEED_APIS.map(async (feedConfig) => {
                        // Add cache-busting parameter here to get fresh data
                        const urlWithCacheBust = feedConfig.url + "&_=" + Date.now();
                        try {
                            const response = await fetch(urlWithCacheBust);
                            const data = await response.json();

                            // Debug: Log the response to see what we're getting
                            console.log("RSS Feed Response:", data);
                            console.log("Number of items received:", data?.items?.length || 0);

                            if (!data || !Array.isArray(data.items)) {
                                console.warn("Invalid feed data or no items array");
                                console.warn("Data received:", data);
                                return [];
                            }

                            const posts = data.items.map(item => ({ ...item, authorName: feedConfig.author }));
                            console.log("Posts after mapping:", posts.length);
                            // Log each post title to debug
                            posts.forEach((post, idx) => {
                                console.log(`Post ${idx + 1}:`, post.title || 'No title', '| GUID:', post.guid || post.link);
                            });
                            return posts;
                        } catch (err) {
                            console.error("Error fetching feed:", err);
                            return [];
                        }
                    })
                );

                // Flatten all posts from both feeds
                const combinedPosts = allPosts.flat();
                console.log("Total combined posts:", combinedPosts.length);

                // Log all post titles before setting state
                console.log("All posts that will be displayed:");
                combinedPosts.forEach((post, idx) => {
                    console.log(`${idx + 1}. "${post.title}" - Published: ${post.pubDate}`);
                });

                // Sort by date (newest first)
                combinedPosts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

                setPosts(combinedPosts);
                console.log("Posts set in state. Count:", combinedPosts.length);
            } catch (err) {
                console.error(err);
                setError("Sorry, articles could not be loaded right now.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // FEED_APIS is constant, no need to include in deps

    const stripHtml = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return (div.textContent || div.innerText || "").trim();
    };

    const extractImageFromContent = (content) => {
        if (!content) return null;
        
        // Create a temporary div to parse HTML
        const div = document.createElement("div");
        div.innerHTML = content;
        
        // Find the first img tag
        const img = div.querySelector("img");
        if (img && img.src) {
            return img.src;
        }
        
        return null;
    };

    const getThumbnail = (post) => {
        // First try thumbnail field (common in RSS feeds)
        if (post.thumbnail) {
            return post.thumbnail;
        }
        
        // Try enclosure field (RSS feeds sometimes use this for images)
        if (post.enclosure && post.enclosure.link && post.enclosure.type && post.enclosure.type.startsWith('image/')) {
            return post.enclosure.link;
        }
        
        // Try to extract from content/description HTML
        const contentImage = extractImageFromContent(post.content || post.description);
        if (contentImage) {
            return contentImage;
        }
        
        // Fallback to null (will use default image)
        return null;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };

    const calculateReadingTime = (content) => {
        const text = stripHtml(content || '');
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
        const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
        return readingTime || 1;
    };

    const getCategory = (post) => {
        let category = "Agentic AI";
        if (post.categories && post.categories.length > 0) {
            category = post.categories[0];
            // Replace "Uncategorized" (case-insensitive) with "Agentic AI"
            if (category.toLowerCase() === "uncategorized") {
                category = "Agentic AI";
            }
        }
        return category;
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="blog-listing-container">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="blog-listing-container">
                    <div className="blog-header">
                        <h1>Blogs</h1>
                        <p>Latest insights and articles from our team</p>
                    </div>
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    // Get featured post (first post only)
    const featuredPost = posts.length > 0 ? posts[0] : null;
    // Get all posts (including the featured post)
    const allPosts = [...posts];

    return (
        <>
            <Header />
            <div className="blog-listing-container">
                {/* Background Gradient Divs */}
                <div className="gradient-bg-top"></div>
                <div className="gradient-bg-bottom"></div>
                
                {/* Header Section */}
                <div className="insights-header">
                    <h1 className="insights-title">Insights and Updates</h1>
                    <p className="insights-description">
                        Welcome to the official blog of Kahuna Labs. Here, we share our technical deep dives, architectural insights, and the engineering principles that power our Troubleshooting Map.
                    </p>
                </div>

                {/* Featured Post Section */}
                {featuredPost && (
                    <section className="featured-posts-section">
                        <h2 className="featured-posts-title">Featured Post</h2>
                        <div className="featured-posts-grid">
                            {(() => {
                                const excerpt = stripHtml(featuredPost.description || featuredPost.content)
                                    .split(/\s+/)
                                    .slice(0, 20)
                                    .join(" ") + "...";
                                const img = getThumbnail(featuredPost);
                                const guid = encodeURIComponent(featuredPost.guid || featuredPost.link);
                                const readingTime = calculateReadingTime(featuredPost.content || featuredPost.description);
                                const category = getCategory(featuredPost);

                                return (
                                    <Link
                                        className="featured-post-card"
                                        to={`/blog-detail?guid=${guid}&author=${featuredPost.authorName}`}
                                    >
                                        <div className="featured-post-image-wrapper">
                                            <img
                                                src={img || "/image.png"}
                                                alt={featuredPost.title}
                                                className="featured-post-image"
                                                onError={(e) => {
                                                    e.target.src = "/image.png";
                                                }}
                                            />
                                            <span className="featured-post-category">{category}</span>
                                        </div>
                                        <div className="featured-post-content-wrapper">
                                            <h3 className="featured-post-card-title">{featuredPost.title}</h3>
                                            <p className="featured-post-card-description">{excerpt}</p>
                                            <div className="featured-post-card-meta">
                                                <div className="meta-row">
                                                    <div className="meta-item">
                                                        <img src="/icon.svg" alt="Calendar" className="meta-icon" width="16" height="16" />
                                                        <span>{formatDate(featuredPost.pubDate)}</span>
                                                    </div>
                                                    <span className="meta-separator">•</span>
                                                    <div className="meta-item">
                                                        <img src="/clock icon.svg" alt="Clock" className="meta-icon" width="16" height="16" />
                                                        <span>{readingTime} min read</span>
                                                    </div>
                                                    <span className="meta-separator">•</span>
                                                    <div className="meta-item">
                                                        <img src="/icon (1).svg" alt="Profile" className="meta-icon" width="16" height="16" />
                                                        <span>{featuredPost.author || featuredPost.authorName || "Team"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })()}
                        </div>
                    </section>
                )}

                {allPosts.length > 0 && (
                    <>
                        {/* Blog Posts Section */}
                        <section className="blog-library-section">
                            <h2 className="all-posts-title">All Posts</h2>

                            <div className="all-posts-grid">
                                {allPosts.map((article, index) => {
                                        const excerpt = stripHtml(article.description || article.content)
                                            .split(/\s+/)
                                            .slice(0, 25)
                                            .join(" ") + "...";

                                        const img = getThumbnail(article);
                                        const guid = encodeURIComponent(article.guid || article.link);
                                        const readingTime = calculateReadingTime(article.content || article.description);
                                        const category = getCategory(article);

                                        return (
                                            <Link
                                                key={index}
                                                className="all-posts-card"
                                                to={`/blog-detail?guid=${guid}&author=${article.authorName}`}
                                            >
                                                <div className="all-posts-card-image-wrapper">
                                                    <img
                                                        src={img || "/image.png"}
                                                        alt={article.title}
                                                        className="all-posts-card-image"
                                                        onError={(e) => {
                                                            e.target.src = "/image.png";
                                                        }}
                                                    />
                                                    <span className="all-posts-card-category">{category}</span>
                                                </div>
                                                <div className="all-posts-card-content">
                                                    <h3 className="all-posts-card-title">{article.title}</h3>
                                                    <p className="all-posts-card-excerpt">{excerpt}</p>
                                                    <div className="all-posts-card-meta">
                                                        <div className="all-posts-meta-item">
                                                            <img src="/icon.svg" alt="Calendar" className="all-posts-meta-icon" width="16" height="16" />
                                                            <span>{formatDate(article.pubDate)}</span>
                                                        </div>
                                                        <span className="all-posts-meta-separator">•</span>
                                                        <div className="all-posts-meta-item">
                                                            <img src="/clock icon.svg" alt="Clock" className="all-posts-meta-icon" width="16" height="16" />
                                                            <span>{readingTime} min read</span>
                                                        </div>
                                                        <span className="all-posts-meta-separator">•</span>
                                                        <div className="all-posts-meta-item">
                                                            <img src="/icon (1).svg" alt="Profile" className="all-posts-meta-icon" width="16" height="16" />
                                                            <span>{article.author || article.authorName || "Team"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                        </section>
                    </>
                )}

                {/* Separator Line */}
                <div className="blog-section-separator"></div>

                {/* Promotional Section */}
                <section className="blog-promotional-section">
                    <div className="promotional-background">
                        <img src="/image2.png" alt="Background" className="promotional-bg-image" />
                        <div className="promotional-overlay"></div>
                    </div>
                    <div className="promotional-content">
                        <div className="promotional-text-container">
                            <p className="promotional-subtitle">Evaluate Our Core Offering</p>
                            <h2 className="promotional-title">
                                <span className="promotional-title-line1">Explore Prescriptive</span>
                                <span className="promotional-title-line2">AI Troubleshooting Map</span>
                            </h2>
                            <button 
                            onClick={() => {
                                // Show loader immediately
                                setNavigating(true);
                                
                                // Store navigation intent in sessionStorage for Home page
                                const isMobileDevice = window.innerWidth <= 768;
                                const targetFrame = isMobileDevice ? 36 : 65; // Frame 36 for mobile, 65 for desktop
                                sessionStorage.setItem('navigatingToSection4', 'true');
                                sessionStorage.setItem('targetFrame', targetFrame.toString());
                                const totalFrames = isMobileDevice ? 97 : 134;
                                
                                // Calculate progress for target frame
                                // Formula: targetFrameIndex = Math.floor(progress * (totalFrames - 1)) + 1
                                // So: progress = (targetFrameIndex - 1) / (totalFrames - 1)
                                const targetProgress = (targetFrame - 1) / (totalFrames - 1);
                                
                                console.log(`=== Navigating to Section 4, Frame ${targetFrame} ===`);
                                console.log('Target Progress:', targetProgress);
                                console.log('Total Frames:', totalFrames);
                                console.log('Is Mobile:', isMobileDevice);
                                
                                // Navigate to home page first
                                navigate('/');
                                
                                // Wait for navigation and page to load, then execute scroll logic
                                setTimeout(() => {
                                    if (!gsap || !ScrollTrigger) {
                                        console.error('GSAP or ScrollTrigger not available');
                                        console.log('gsap available:', !!gsap);
                                        console.log('ScrollTrigger available:', !!ScrollTrigger);
                                        return;
                                    }
                                    
                                    // Refresh ScrollTrigger
                                    ScrollTrigger.refresh();
                                    
                                    // Get all triggers and log them
                                    const allTriggers = ScrollTrigger.getAll();
                                    console.log('Total ScrollTriggers found:', allTriggers.length);
                                    
                                    // Find ScrollTrigger for section 4 - try multiple ways
                                    const section4Element = document.getElementById('section4Wrapper');
                                    console.log('Section4 Element found:', !!section4Element);
                                    
                                    let scrollTrigger = null;
                                    
                                    // Try to find by trigger element
                                    for (const trigger of allTriggers) {
                                        const triggerElement = trigger.trigger || trigger.vars?.trigger;
                                        console.log('Checking trigger:', {
                                            hasTrigger: !!triggerElement,
                                            triggerId: triggerElement?.id,
                                            triggerSelector: typeof triggerElement === 'string' ? triggerElement : null,
                                            varsTrigger: trigger.vars?.trigger
                                        });
                                        
                                        if (
                                            trigger.vars?.trigger === '#section4Wrapper' ||
                                            (triggerElement && triggerElement.id === 'section4Wrapper') ||
                                            (section4Element && triggerElement === section4Element)
                                        ) {
                                            scrollTrigger = trigger;
                                            console.log('✅ ScrollTrigger MATCHED!', trigger);
                                            break;
                                        }
                                    }
                                    
                                    if (scrollTrigger) {
                                        // Get scroll trigger bounds
                                        const start = scrollTrigger.start;
                                        const end = scrollTrigger.end;
                                        const scrollDistance = end - start;
                                        const targetScrollPosition = start + (scrollDistance * targetProgress);
                                        
                                        console.log('✅ ScrollTrigger found!');
                                        console.log('Start:', start);
                                        console.log('End:', end);
                                        console.log('Scroll Distance:', scrollDistance);
                                        console.log('Target Scroll Position:', targetScrollPosition);
                                        console.log('Current Scroll:', window.pageYOffset || document.documentElement.scrollTop);
                                        
                                        // Scroll to calculated position
                                        window.scrollTo({
                                            top: targetScrollPosition,
                                            behavior: 'smooth'
                                        });
                                        
                                        console.log('Scrolling to:', targetScrollPosition);
                                        
                                        // After scroll, ensure frame is set
                                        setTimeout(() => {
                                            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                                            console.log('After scroll, current position:', currentScroll);
                                            
                                            // Ensure frame pool has the frame
                                            if (window.manageFramePool) {
                                                window.manageFramePool(targetFrame);
                                                console.log('Called manageFramePool for frame:', targetFrame);
                                            } else {
                                                console.warn('manageFramePool not available');
                                            }
                                            
                                            // Set active section - need to access it from window or trigger it differently
                                            // Since we're on Home page now, we can dispatch an event or use window
                                            if (window.setActiveSection) {
                                                window.setActiveSection(4);
                                            }
                                            console.log('Set activeSection to 4');
                                            
                                            // Force update and refresh
                                            scrollTrigger.update();
                                            ScrollTrigger.refresh();
                                            
                                            // Check current frame
                                            const frameElement = document.querySelector(`#frame-${targetFrame}`);
                                            console.log('Frame element found:', !!frameElement);
                                            if (frameElement) {
                                                console.log('Frame element style:', {
                                                    opacity: frameElement.style.opacity,
                                                    display: window.getComputedStyle(frameElement).display,
                                                    visibility: window.getComputedStyle(frameElement).visibility
                                                });
                                            }
                                            
                                            console.log('✅ Navigation complete. Frame should be:', targetFrame);
                                            
                                            // Hide loader after navigation is complete
                                            // Store completion in sessionStorage for Home page to check
                                            sessionStorage.setItem('navigationComplete', 'true');
                                            sessionStorage.setItem('targetFrame', targetFrame.toString());
                                            
                                            // Dispatch event to hide loader
                                            window.dispatchEvent(new CustomEvent('navigationComplete', { 
                                                detail: { frame: targetFrame } 
                                            }));
                                        }, 2000);
                                    } else {
                                        console.error('❌ ScrollTrigger for section4Wrapper not found');
                                        console.log('All triggers:', allTriggers.map(t => ({
                                            trigger: t.trigger?.id || t.vars?.trigger,
                                            start: t.start,
                                            end: t.end
                                        })));
                                        
                                        // Fallback: scroll to section 4 element
                                        if (section4Element) {
                                            console.log('Using fallback method');
                                            const viewportHeight = window.innerHeight;
                                            const scrollMultiplier = isMobileDevice ? 8 : 15;
                                            const scrollDistance = viewportHeight * scrollMultiplier;
                                            const targetScrollPosition = section4Element.offsetTop + (scrollDistance * targetProgress);
                                            
                                            console.log('Fallback scroll position:', targetScrollPosition);
                                            
                                            window.scrollTo({
                                                top: targetScrollPosition,
                                                behavior: 'smooth'
                                            });
                                            
                                            setTimeout(() => {
                                                if (window.manageFramePool) {
                                                    window.manageFramePool(targetFrame);
                                                }
                                                if (window.setActiveSection) {
                                                    window.setActiveSection(4);
                                                }
                                                
                                                // Hide loader after navigation is complete
                                                sessionStorage.setItem('navigationComplete', 'true');
                                                sessionStorage.setItem('targetFrame', targetFrame.toString());
                                                window.dispatchEvent(new CustomEvent('navigationComplete', { 
                                                    detail: { frame: targetFrame } 
                                                }));
                                                
                                                console.log('Fallback navigation complete');
                                            }, 2000);
                                        } else {
                                            console.error('Section4 element not found!');
                                        }
                                    }
                                }, 1000); // Wait for page navigation to complete
                            }}
                            className="promotional-cta-button"
                        >
                            Take me there <img src="/arrow right icon.svg" alt="Arrow" style={{ width: '14px', height: '14px', marginLeft: '4px' }} />
                        </button>
                        </div>
                        
                        {/* Navigation Loader Overlay */}
                        {navigating && (
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
                                <div className="spinner"></div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default BlogListing;
