import React, { useState, useEffect } from 'react';

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
                <div className="header-left">
                    <div className="header-logo">
                        <img src="/kahuna-logo-3.svg" alt="Kahuna Labs" />
                    </div>
                </div>

                {/* Call to Action Button */}
                <div className="header-right">
                    <button className="header-cta-button">
                        <a href="mailto:info@kahunalabs.ai">
                        Let's Talk
                            </a>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
