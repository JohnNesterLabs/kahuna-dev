import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './BlogDetail.css';

const BlogDetail = () => {
    const [searchParams] = useSearchParams();
    const [article, setArticle] = useState(null);
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const FEED_APIS = [
        {
            // Try to get more posts by adding posts_per_page parameter to WordPress feed
            url: "https://api.rss2json.com/v1/api.json?rss_url=" +
                encodeURIComponent("https://mytestblog2025.wordpress.com/feed/?posts_per_page=20") +
                "&_=" + Date.now(), // Cache busting to get fresh data
            author: "team"
        }
    ];

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);

                const guidParam = searchParams.get("guid");
                const authorParam = searchParams.get("author");
                const idParam = searchParams.get("id");

                if (!guidParam && !idParam) {
                    setError("Missing article identifier.");
                    return;
                }

                // Fetch all feeds and combine results
                const allPosts = await Promise.all(
                    FEED_APIS.map(async (feedConfig) => {
                        try {
                            const response = await fetch(feedConfig.url);
                            const data = await response.json();

                            if (!data || !Array.isArray(data.items)) return [];

                            return data.items
                                .map(item => ({ ...item, authorName: feedConfig.author }));
                        } catch (err) {
                            console.error("Error fetching feed:", err);
                            return [];
                        }
                    })
                );

                // Flatten all posts from both feeds
                const posts = allPosts.flat();

                let foundArticle = null;

                if (guidParam) {
                    const target = decodeURIComponent(guidParam);
                    // If author is specified, filter by author first
                    if (authorParam) {
                        const authorPosts = posts.filter(p => p.authorName === authorParam);
                        foundArticle = authorPosts.find(a => (a.guid || a.link) === target);
                    } else {
                        // Search in all posts
                        foundArticle = posts.find(a => (a.guid || a.link) === target);
                    }
                }

                if (!foundArticle && idParam) {
                    const idx = parseInt(idParam, 10);
                    if (!Number.isNaN(idx)) foundArticle = posts[idx];
                }

                if (!foundArticle) {
                    throw new Error("Article not found");
                }

                setArticle(foundArticle);
                setAllPosts(posts);
            } catch (err) {
                console.error(err);
                setError("Sorry, this article could not be loaded.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [searchParams]);

    const stripHtml = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return (div.textContent || div.innerText || "").trim();
    };

    const extractImageFromContent = (content) => {
        if (!content) return null;
        const div = document.createElement("div");
        div.innerHTML = content;
        const img = div.querySelector("img");
        if (img && img.src) {
            return img.src;
        }
        return null;
    };

    const getThumbnail = (post) => {
        if (post.thumbnail) {
            return post.thumbnail;
        }
        if (post.enclosure && post.enclosure.link && post.enclosure.type && post.enclosure.type.startsWith('image/')) {
            return post.enclosure.link;
        }
        const contentImage = extractImageFromContent(post.content || post.description);
        if (contentImage) {
            return contentImage;
        }
        return null;
    };

    const getCategory = (post) => {
        let category = "Agentic AI";
        if (post.categories && post.categories.length > 0) {
            category = post.categories[0];
            if (category.toLowerCase() === "uncategorized") {
                category = "Agentic AI";
            }
        }
        return category;
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
        const readingTime = Math.ceil(wordCount / 200);
        return readingTime || 1;
    };

    const sanitizeBasic = (html) => {
        return html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
    };

    // Get related posts (exclude current article, get first 3)
    const getRelatedPosts = () => {
        if (!article || !allPosts.length) return [];
        const currentGuid = article.guid || article.link;
        return allPosts
            .filter(post => (post.guid || post.link) !== currentGuid)
            .slice(0, 3);
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="blog-detail-container">
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
                <div className="blog-detail-container">
                    <div className="error-message">
                        <h2>Article Not Found</h2>
                        <p>{error}</p>
                        <Link to="/blog" className="back-link">
                            ← Back to Blogs
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!article) {
        return (
            <>
                <Header />
                <div className="blog-detail-container">
                    <div className="error-message">
                        <h2>Article Not Found</h2>
                        <p>The requested article could not be found.</p>
                        <Link to="/blog" className="back-link">
                            ← Back to Blogs
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const contentHtml = sanitizeBasic(article.content || article.description || "");
    const category = getCategory(article);
    const readingTime = calculateReadingTime(article.content || article.description);
    const description = stripHtml(article.description || article.content).split(/\s+/).slice(0, 30).join(" ") + "...";
    const relatedPosts = getRelatedPosts();

    return (
        <>
            <Header />
            <div className="blog-detail-container">
                {/* Background Gradient Divs */}
                <div className="gradient-bg-top"></div>
                <div className="gradient-bg-bottom"></div>
                
                <div className="article-wrap">
                    {/* Back Link */}
                    <Link to="/blog" className="blog-back-link">
                        <img src="/arrow left icon.png" alt="Back" className="back-arrow-icon" width="16" height="16" />
                        <span>Back</span>
                    </Link>

                    {/* Category Tag */}
                    <span className="post-category-tag">{category}</span>

                    {/* Title */}
                    <h1 className="post-title">{article.title}</h1>

                    {/* Description */}
                    <p className="post-description">{description}</p>

                    {/* Meta Information */}
                    <div className="post-meta">
                        <div className="meta-item">
                            <img src="/icon.svg" alt="Calendar" className="meta-icon" width="16" height="16" />
                            <span>{formatDate(article.pubDate)}</span>
                        </div>
                        <span className="meta-separator">•</span>
                        <div className="meta-item">
                            <img src="/clock icon.svg" alt="Clock" className="meta-icon" width="16" height="16" />
                            <span>{readingTime} min read</span>
                        </div>
                        <span className="meta-separator">•</span>
                        <div className="meta-item">
                            <img src="/icon (1).svg" alt="Profile" className="meta-icon" width="16" height="16" />
                            <span>{article.author || article.authorName || "Team"}</span>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div
                        className="post-content"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                </div>

                {/* Related Blogs Section */}
                {relatedPosts.length > 0 && (
                    <section className="related-blogs-section">
                        <h2 className="related-blogs-title">Related Blogs</h2>
                        <div className="related-blogs-carousel">
                            {relatedPosts.map((relatedPost, index) => {
                                const excerpt = stripHtml(relatedPost.description || relatedPost.content)
                                    .split(/\s+/)
                                    .slice(0, 25)
                                    .join(" ") + "...";
                                const img = getThumbnail(relatedPost);
                                const guid = encodeURIComponent(relatedPost.guid || relatedPost.link);
                                const readingTime = calculateReadingTime(relatedPost.content || relatedPost.description);
                                const category = getCategory(relatedPost);

                                return (
                                    <Link
                                        key={index}
                                        className="related-blog-card"
                                        to={`/blog-detail?guid=${guid}&author=${relatedPost.authorName}`}
                                    >
                                        <div className="related-blog-image-wrapper">
                                            <img
                                                src={img || "/image.png"}
                                                alt={relatedPost.title}
                                                className="related-blog-image"
                                                onError={(e) => {
                                                    e.target.src = "/image.png";
                                                }}
                                            />
                                            <span className="related-blog-category">{category}</span>
                                        </div>
                                        <div className="related-blog-content">
                                            <h3 className="related-blog-title">{relatedPost.title}</h3>
                                            <p className="related-blog-excerpt">{excerpt}</p>
                                            <div className="related-blog-meta">
                                                <div className="related-meta-item">
                                                    <img src="/icon.svg" alt="Calendar" className="related-meta-icon" width="16" height="16" />
                                                    <span>{formatDate(relatedPost.pubDate)}</span>
                                                </div>
                                                <span className="related-meta-separator">•</span>
                                                <div className="related-meta-item">
                                                    <img src="/clock icon.svg" alt="Clock" className="related-meta-icon" width="16" height="16" />
                                                    <span>{readingTime} min read</span>
                                                </div>
                                                <span className="related-meta-separator">•</span>
                                                <div className="related-meta-item">
                                                    <img src="/icon (1).svg" alt="Profile" className="related-meta-icon" width="16" height="16" />
                                                    <span>{relatedPost.author || relatedPost.authorName || "Team"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>
            <Footer />
        </>
    );
};

export default BlogDetail;
