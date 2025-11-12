import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.getElementById('footerWrapper');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const isFooterVisible = footerRect.top <= 0;
                setIsVisible(!isFooterVisible);
            }
        };

        // Initial check
        handleScroll();

        // Add scroll listener
        window.addEventListener('scroll', handleScroll);
        
        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <header className="main-header">
            <div className="header-container">
                {/* Logo and Company Name */}
                <Link to="/" className="header-left" style={{ textDecoration: 'none' }}>
                    <div className="header-logo">
                        <img src="/kahuna-logo-3.svg" alt="Kahuna Labs" />
                    </div>
                </Link>

                {/* Call to Action Button */}
                <div className="header-right">
                    <a href="mailto:info@kahunalabs.ai" className="header-cta-button">
                        <span>Let's Talk</span>  
                        <img src="/arrow right icon.png" alt="Arrow Right" className="arrow-right-icon" />
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
