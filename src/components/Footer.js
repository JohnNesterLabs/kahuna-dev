import React, { useState, useEffect, useRef } from 'react';
const Footer = () => {
    // Array of all the text items from the screenshot
    const carouselTexts = [
        "Troubleshoot Complex Issues",
        "Recommendations at Every Ticket Progression",
        "Customer Configuration Context",
        "Product Version Awareness",
        "80%+ Recommendations Accuracy",
        "Automated Diagnostic Collection",
        "First Response with Probing Questions",
        "Integrated With Your Product Backend",
        "APIs and MCP Servers",
        "Ticket Contextual Search",
        "Maximized Self Service",
        "Auto-create Knowledge Article",
        "In-Product Support",
        "Auto Resolve",
        "Predictive Alerts Handling",
        "Predictive Tier Advancement",
        "Ticket Lifecycle Management",
        "Queue Management",
        "Backlog Management",
        "Educate Support Engineers",
        "QC Before Every Response",
        "Real Time Customer Sentiment",
        "Predict Escalations",
        "Hyper Care for New Release",
        "Hyper Care for New Customer",
        "Hyper Care for New Product",
        "CAP Management",
        "Lab Equipment Management",
        "Hiring Plans with What-if Scenarios",
        "Duty Charts",
        "Troubleshooting Map for Service Partners",
        "Strategic Intelligence",
        "Deployed Within Your VPC",
        "Your Own Local LLM",
        "Turnkey Solution"
    ];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [animationPhase, setAnimationPhase] = useState('normal'); // 'normal', 'slide-out', 'slide-in'
    const footerRef = useRef(null);
    // Intersection Observer to detect when footer comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.3, // Start when 30% of footer is visible
                rootMargin: '0px 0px -100px 0px' // Start a bit before footer is fully visible
            }
        );
        if (footerRef.current) {
            observer.observe(footerRef.current);
        }
        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);
    // Continuous carousel effect - only runs when footer is visible
    useEffect(() => {
        if (!isVisible) return;
        const interval = setInterval(() => {
            // Phase 1: Slide current text up and out
            setAnimationPhase('slide-out');
            // Phase 2: After slide-out completes, change text and start from bottom
            setTimeout(() => {
                setCurrentTextIndex((prevIndex) =>
                    (prevIndex + 1) % carouselTexts.length
                );
                setAnimationPhase('slide-in');
                // Phase 3: After slide-in completes, return to normal
                setTimeout(() => {
                    setAnimationPhase('normal');
                }, 400); // Wait for slide-in animation to complete
            }, 300); // Wait for slide-out animation to complete
        }, 3000); // Change text every 3 seconds
        return () => clearInterval(interval);
    }, [isVisible, carouselTexts.length]);
    return (
        <div className="footer-section" id="footerWrapper" ref={footerRef}>
            {/* Large Abstract Logo - Top Half Cut */}
            <div className="footer-abstract-logo">
                <img src="/final-logo-128.svg" alt="Abstract Logo" />
            </div>
            
            <div className="footer-container">
                {/* Main Content Area */}
                <div className="footer-main">
                    {/* Hero Text */}
                    <div className="footer-hero">
                        <h1 className="footer-hero-title">
                            <span className="footer-hero-line">Secure. Private.</span>
                            <span className="footer-hero-line">Comprehensive.</span>
                            <span className="footer-hero-line">Enterprise Grade.</span>
                        </h1>
                        {/* CTA Box */}
                        <div className="footer-cta-box">
                            <div className="carousel-container">
                                <p className={`footer-cta-text ${animationPhase === 'slide-out' ? 'slide-out-up' :
                                    animationPhase === 'slide-in' ? 'slide-in-from-bottom' :
                                        'normal'
                                    }`}>
                                    {carouselTexts[currentTextIndex]}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Links Section */}
                    <div className="footer-links">
                        <div className="footer-links-container">
                              {/* Technology Column */}
                        <div className="footer-column">
                            <h3 className="footer-column-title">TECHNOLOGY</h3>
                            <ul className="footer-link-list">
                                {/* <li><a href="#" className="footer-link">Frontline Productivity</a></li> */}
                                <li><a     href="https://form.jotform.com/251278392049160"
                    target="_blank"
                    rel="noopener noreferrer"  className="footer-link">How Complex is Your Support?</a></li>
                            </ul>
                        </div>
                        {/* Company Column */}
                        <div className="footer-column">
                            <h3 className="footer-column-title">COMPANY</h3>
                            <ul className="footer-link-list">
                                <li><a href="mailto:info@kahunalabs.ai" className="footer-link">Contact us</a></li>
                                <li><a href="mailto:careers@kahunalabs.ai" className="footer-link">Careers</a></li>
                            </ul>
                        </div>
                        {/* Social Media */}
                        <div className="footer-column">
                            <a   href="https://linkedin.com/company/kahuna-labs"
                target="_blank"
                rel="noopener noreferrer" className="footer-social-link">
                                <div className="footer-linkedin-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </div>
                                <span>LinkedIn</span>
                            </a>
                        </div>
                        </div>
                      
                        <div className="footer-logo">
                            <img src="/light-logo.svg" alt="Kahuna Labs" />
                        </div>
                    </div>
                </div>
                {/* Bottom Section */}
                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <p className="footer-legal-text">
                            Kahuna AI and its components are trademarks of Kahuna Labs.
                        </p>
                        <p className="footer-legal-text">
                            The proprietary technology of Kahuna AI is protected by multiple issued and pending U.S. and international patents owned by Kahuna Labs.
                        </p>
                    </div>
                    <div className="footer-bottom-right">
                        <p className="footer-rights-text">All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Footer;
