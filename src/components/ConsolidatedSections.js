import React from 'react';

const ConsolidatedSections = () => {
    return (
        <>
            {/* Section 1 - Hero */}
            <div className="section-wrapper neon-border" id="section1Wrapper">
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
                </div>
            </div>

            {/* Section 2 - Smooth Scrolling */}
            <div className="section-wrapper neon-border" id="section2Wrapper">
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
            <div className="section-wrapper neon-border" id="section3Wrapper">
                <div className="section-content interactive-bg">
                    <div className="section-content-padding">
                        <p className="section3-line1 interactive-paragraph-1 opacity-0">
                            Meet kahuna AI
                        </p>
                    </div>
                    <div className="word-loop-container">
                        <div className="word-loop-wrapper">
                            <div className="word-item word-secure">Secure</div>
                            <div className="word-item word-private">Private</div>
                            <div className="word-item word-enterprise">Enterprise Grade</div>
                            <div className="word-item word-comprehensive">Comprehensive</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConsolidatedSections;
