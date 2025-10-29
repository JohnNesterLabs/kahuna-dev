import React, { useState, useEffect, useRef } from 'react';
const ConsolidatedSections = () => {
    // Word carousel for Section 3
    const carouselWords = [
        "Secure",
        "Private",
        "Enterprise Grade",
        "Comprehensive"
    ];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [animationPhase, setAnimationPhase] = useState('normal');
    const section3Ref = useRef(null);
    // Intersection Observer to detect when section 3 comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    console.log('Section 3 is visible, starting carousel');
                    setIsVisible(true);
                } else {
                    console.log('Section 3 is not visible, stopping carousel');
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.1, // Lower threshold to start earlier
                rootMargin: '0px 0px 0px 0px' // No margin
            }
        );
        if (section3Ref.current) {
            observer.observe(section3Ref.current);
        }
        return () => {
            if (section3Ref.current) {
                observer.unobserve(section3Ref.current);
            }
        };
    }, []);
    // Start carousel immediately for testing
    useEffect(() => {
        console.log('Component mounted, starting carousel immediately');
        setIsVisible(true);
    }, []);
    // Continuous carousel effect - only runs when section 3 is visible
    useEffect(() => {
        if (!isVisible) return;
        console.log('Carousel starting, isVisible:', isVisible);
        const interval = setInterval(() => {
            console.log('Carousel tick, current word:', carouselWords[currentWordIndex]);
            // Phase 1: Slide current word up and out
            setAnimationPhase('slide-out');
            // Phase 2: After slide-out completes, change word and start from bottom
            setTimeout(() => {
                setCurrentWordIndex((prevIndex) => {
                    const newIndex = (prevIndex + 1) % carouselWords.length;
                    console.log('Changing word from', carouselWords[prevIndex], 'to', carouselWords[newIndex]);
                    return newIndex;
                });
                setAnimationPhase('slide-in');
                // Phase 3: After slide-in completes, return to normal
                setTimeout(() => {
                    setAnimationPhase('normal');
                }, 400);
            }, 300);
        }, 2000); // Change word every 2 seconds (faster for testing)
        return () => clearInterval(interval);
    }, [isVisible, carouselWords.length, currentWordIndex]);
    return (
        <>
            {/* Section 1 - Hero */}
            <div className="section-wrapper" id="section1Wrapper">
                <div className="section-content hero-bg">
                    <div className="text-center hero-content">
                        <p className="section1-line1 hero-paragraph-1 opacity-0">
                            Future of Technical Product Support
                        </p>
                        <p className="section1-line2 hero-paragraph-2 opacity-0">
                            A Productivity Leap for Your Frontline
                        </p>
                        <p className="section1-line3 hero-paragraph-3 opacity-0">
                        </p>
                    </div>
                    <div className="section1-scroll-indicator">
                        <div className="scroll-text">SCROLL</div>
                        <img className="scroll-arrow" src="/arrow.png" alt="Scroll arrow" />
                    </div>
                    <div className="section1-scroll-overlay"></div>
                </div>
            </div>
            {/* Section 2 - Smooth Scrolling */}
            <div className="section-wrapper" id="section2Wrapper">
                <div className="section-content smooth-bg">
                    <div className="section-content-padding">
                        <p className="section2-line1 smooth-paragraph-1 opacity-0">
                            Support landscape is vast &<br />
                            intricate. Your customer have an <br />
                            endless spectrum of realities.
                        </p>
                        <p className="section2-line2 smooth-paragraph-2 opacity-0">
                            Loborious, outdated and<br />
                            fragmented knowledge cripples<br />
                            frontline actions.
                        </p>
                        <p className="section2-line3 smooth-paragraph-3 opacity-0">
                            <br />
                            <br />
                        </p>
                    </div>
                </div>
            </div>
            {/* Section 3 - Interactive */}
            <div className="section-wrapper" id="section3Wrapper" ref={section3Ref}>
                <div className="section-content interactive-bg">
                    <div className="section-content-padding">
                        <p className="section3-line1 interactive-paragraph-1 opacity-0">
                            Meet kahuna AI
                        </p>
                    </div>
                    {/* Word Carousel */}
                    <div className="word-carousel-container">
                        <p className={`word-carousel-text ${animationPhase === 'slide-out' ? 'slide-out-up' :
                            animationPhase === 'slide-in' ? 'slide-in-from-bottom' :
                                'normal'
                            }`}>
                            {carouselWords[currentWordIndex]}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ConsolidatedSections;
