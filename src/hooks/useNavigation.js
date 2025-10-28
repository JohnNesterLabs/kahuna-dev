import { useState } from 'react';

export const useNavigation = () => {
    const [activeSection, setActiveSection] = useState(0);

    return {
        activeSection,
        setActiveSection
    };
};
