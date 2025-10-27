import { useState, useCallback } from 'react';

export const useNavigation = () => {
    const [activeSection, setActiveSection] = useState(0);

    const handleSectionClick = useCallback((sectionId) => {
        const sectionMap = {
            0: 'section1Wrapper',
            1: 'section2Wrapper',
            2: 'section3Wrapper',
            3: 'section4Wrapper',
            4: 'footerWrapper'
        };

        const targetElement = document.getElementById(sectionMap[sectionId]);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return {
        activeSection,
        setActiveSection,
        handleSectionClick
    };
};
