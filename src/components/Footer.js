import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
        "Auto-Create Knowledge Articles",
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
        "Turnkey Solution",
        "AI Infused Within Your Current Tools",
        "Outcome Based Pricing"
    ];
    const footerRef = useRef(null);
    const wordLoopRef = useRef(null);
    const idxRef = useRef(0);
    const timeoutRef = useRef(null);
    const isVisibleRef = useRef(false);

    const visibleMs = 2000;     // time each text stays visible
    const transitionMs = 450;   // must match --duration in CSS

    // Helper function to create word span
    const makeSpan = (text, cls = '') => {
        const span = document.createElement('span');
        span.className = 'word ' + cls;
        span.textContent = text;
        return span;
    };

    // Next step in the animation
    const nextStep = () => {
        if (!wordLoopRef.current || !isVisibleRef.current) return;

        const container = wordLoopRef.current;
        const current = container.querySelector('.word.in-place');
        const nextIndex = (idxRef.current + 1) % carouselTexts.length;
        const next = makeSpan(carouselTexts[nextIndex], 'below');

        container.appendChild(next);

        // Force reflow so transitions run reliably
        void next.offsetWidth;

        // Animate: current slides up, next slides into place
        if (current) {
            current.classList.remove('in-place');
            current.classList.add('slide-up');
        }

        next.classList.remove('below');
        next.classList.add('in-place');

        // Cleanup after animation: remove old slide-up element
        timeoutRef.current = setTimeout(() => {
            const old = container.querySelectorAll('.word.slide-up');
            old.forEach(o => o.remove());
            idxRef.current = nextIndex;

            if (isVisibleRef.current) {
                timeoutRef.current = setTimeout(nextStep, visibleMs);
            }
        }, transitionMs + 20);
    };

    // Initialize word loop
    const initWordLoop = () => {
        if (!wordLoopRef.current) return;

        // Clear any existing words
        wordLoopRef.current.innerHTML = '';

        // Place first word only
        const first = makeSpan(carouselTexts[0], 'in-place');
        wordLoopRef.current.appendChild(first);
        idxRef.current = 0;

        // Start the loop
        timeoutRef.current = setTimeout(nextStep, visibleMs);
    };

    // Resume loop if it's not running
    const resumeLoop = useCallback(() => {
        if (!wordLoopRef.current || !isVisibleRef.current) return;

        // If loop is already running, don't restart
        if (timeoutRef.current) return;

        // If there's a word in place, continue from current index
        const currentWord = wordLoopRef.current.querySelector('.word.in-place');
        if (currentWord) {
            // Loop is already set up, just resume it
            timeoutRef.current = setTimeout(nextStep, visibleMs);
        } else {
            // No words, initialize fresh
            initWordLoop();
        }
    }, []);

    // Intersection Observer to detect when footer comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    isVisibleRef.current = true;
                    // Resume the loop when footer becomes visible
                    resumeLoop();
                } else {
                    isVisibleRef.current = false;
                    // Stop the loop when footer is not visible
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                        timeoutRef.current = null;
                    }
                }
            },
            {
                threshold: 0.3, // Start when 30% of footer is visible
                rootMargin: '0px 0px -100px 0px' // Start a bit before footer is fully visible
            }
        );
        const currentFooterRef = footerRef.current;
        if (currentFooterRef) {
            observer.observe(currentFooterRef);
        }
        return () => {
            if (currentFooterRef) {
                observer.unobserve(currentFooterRef);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [resumeLoop]);
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
                                <div className="word-loop" ref={wordLoopRef}></div>
                            </div>
                        </div>
                    </div>
                    {/* Links Section */}
                    <div className="footer-links">
                        <div className="footer-links-container">

                              {/* Company Column */}
                              <div className="footer-column">
                                <h3 className="footer-column-title">COMPANY</h3>
                                <ul className="footer-link-list">
                                    <li><Link to="/blog" className="footer-link">Blog</Link></li>
                                    <li><a href="mailto:info@kahunalabs.ai"
                                        className="footer-link"
                                        onClick={(e) => {
                                            console.log('Contact link clicked');
                                            e.preventDefault();
                                            window.location.href = 'mailto:info@kahunalabs.ai';
                                        }}>Contact us</a></li>
                                    <li><a href="mailto:careers@kahunalabs.ai"
                                        className="footer-link"
                                        onClick={(e) => {
                                            console.log('Careers link clicked');
                                            e.preventDefault();
                                            window.location.href = 'mailto:careers@kahunalabs.ai';
                                        }}>Careers</a></li>
                                </ul>
                            </div>
                            {/* Technology Column */}
                            <div className="footer-column">
                                <h3 className="footer-column-title">TECHNOLOGY</h3>
                                <ul className="footer-link-list">
                                    {/* <li><a href="#" className="footer-link">Frontline Productivity</a></li> */}
                                    <li><a href="https://form.jotform.com/251278392049160"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer-link"
                                        onClick={(e) => {
                                            console.log('Form link clicked');
                                            e.preventDefault();
                                            window.open('https://form.jotform.com/251278392049160', '_blank');
                                        }}>How Complex is Your Support?</a></li>
                                </ul>
                            </div>
            
                            {/* Social Media */}
                            <div className="footer-column">
                                <a href="https://linkedin.com/company/kahuna-labs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-social-link"
                                    onClick={(e) => {
                                        console.log('LinkedIn link clicked');
                                        e.preventDefault();
                                        window.open('https://linkedin.com/company/kahuna-labs', '_blank');
                                    }}>
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
                        Kahuna AI, Troubleshooting Map and its components are trademarks of Kahuna Labs.
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
