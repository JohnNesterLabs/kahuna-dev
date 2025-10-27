import React from 'react';

const Navigation = ({ activeSection, onSectionClick }) => {
    const sections = [
        { id: 0, name: 'Welcome' },
        { id: 1, name: 'Smooth Scrolling' },
        { id: 2, name: 'Interactive' },
        { id: 3, name: 'Pinned Content' },
        { id: 4, name: 'Thank You' }
    ];

    return (
        <div className="navigation-container">
            {sections.map((section) => (
                <div
                    key={section.id}
                    className={`nav-dot ${activeSection === section.id ? 'active' : ''}`}
                    data-section={section.id}
                    onClick={() => onSectionClick(section.id)}
                />
            ))}
        </div>
    );
};

export default Navigation;
