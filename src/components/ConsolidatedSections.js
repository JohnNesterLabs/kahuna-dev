import React, { useEffect, useRef } from 'react';
const ConsolidatedSections = () => {
    // Word carousel for Section 3
    const carouselWords = [
        "Secure",
        "Private",
        "Enterprise Grade",
        "Comprehensive"
    ];
    const section3Ref = useRef(null);
    const wordLoopRef = useRef(null);
    const idxRef = useRef(0);
    const timeoutRef = useRef(null);
    const isVisibleRef = useRef(false);

    const visibleMs = 1800;     // time each word stays visible
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
        const nextIndex = (idxRef.current + 1) % carouselWords.length;
        const next = makeSpan(carouselWords[nextIndex], 'below');

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
        const first = makeSpan(carouselWords[0], 'in-place');
        wordLoopRef.current.appendChild(first);
        idxRef.current = 0;

        // Start the loop
        timeoutRef.current = setTimeout(nextStep, visibleMs);
    };

    // Resume loop if it's not running
    const resumeLoop = () => {
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
    };

    // Intersection Observer to detect when section 3 comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    isVisibleRef.current = true;
                    // Resume the loop when section becomes visible
                    resumeLoop();
                } else {
                    isVisibleRef.current = false;
                    // Stop the loop when section is not visible
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                        timeoutRef.current = null;
                    }
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px 0px 0px'
            }
        );

        if (section3Ref.current) {
            observer.observe(section3Ref.current);
        }

        return () => {
            if (section3Ref.current) {
                observer.unobserve(section3Ref.current);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return (
        <>
            {/* Section 1 - Hero */}
            <div className="section-wrapper" id="section1Wrapper">
                <div className="section-content hero-bg">
                    <div className="text-center hero-content">
                        <p className="section1-line1 hero-paragraph-1 opacity-0">
                            Future of Technical <br className="mobile-only" /> Product Support
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
                            Support Landscape is vast &<br />
                            intricate. Your customers have an <br />
                            endless spectrum of realities
                        </p>
                        <p className="section2-line2 smooth-paragraph-2 opacity-0">
                            Laborious, outdated and<br />
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
                            Meet Kahuna AI
                        </p>
                    </div>
                    {/* Word Carousel */}
                    <div className="word-carousel-container">
                        <div className="word-loop" ref={wordLoopRef}></div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ConsolidatedSections;
