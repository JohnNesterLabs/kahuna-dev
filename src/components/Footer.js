import React from 'react';

const Footer = () => {
    return (
        <div className="footer-section" id="footerWrapper">
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
                            <p className="footer-cta-text">
                                Recommendations at Every<br />
                                Ticket Progression
                            </p>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="footer-links">
                        {/* Technology Column */}
                        <div className="footer-column">
                            <h3 className="footer-column-title">TECHNOLOGY</h3>
                            <ul className="footer-link-list">
                                <li><a href="#" className="footer-link">Frontline Productivity</a></li>
                                <li><a href="#" className="footer-link">How Complex is Your Support?</a></li>
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div className="footer-column">
                            <h3 className="footer-column-title">COMPANY</h3>
                            <ul className="footer-link-list">
                                <li><a href="#" className="footer-link">Contact us</a></li>
                                <li><a href="#" className="footer-link">Careers</a></li>
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div className="footer-column">
                            <a href="#" className="footer-social-link">
                                <div className="footer-linkedin-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </div>
                                <span>LinkedIn</span>
                            </a>
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
                        <div className="footer-logo">
                            <div className="footer-logo-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                            <span className="footer-logo-text">Kahuna Labs</span>
                        </div>
                        <p className="footer-rights-text">All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
