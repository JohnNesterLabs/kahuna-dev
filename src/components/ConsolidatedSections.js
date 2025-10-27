import React from 'react';

const ConsolidatedSections = () => {
    return (
        <>
            {/* Section 1 - Hero */}
            <div className="section-wrapper neon-border" id="section1Wrapper">
                <div className="section-content hero-bg">
                    <div className="text-top hero-content">
                        <p className="section1-paragraph1 hero-paragraph1">
                            Future of Technical Product Support
                        </p>
                        <p className="section1-paragraph2 hero-paragraph2">
                            A Productivity Leap for Your Frontline
                        </p>
                        <p className="section1-paragraph3 hero-paragraph3">

                        </p>
                    </div>
                </div>
            </div>

            {/* Section 2 - Smooth Scrolling */}
            <div className="section-wrapper neon-border" id="section2Wrapper">
                <div className="section-content smooth-bg">
                    <div className="text-left section-content-padding">
                        <p className="section2-paragraph1 smooth-paragraph1 opacity-0">
                            Support Landscape is vast &<br />
                            intricate. Your customer have  an <br />
                            endless spectrum of realities
                        </p>
                        <p className="section2-paragraph2 smooth-paragraph2 opacity-0">
                            Laborious, outdated and <br />
                            fragmented knowledge cripples<br />
                            frontline actions.
                        </p>
                        <p className="section2-paragraph3 smooth-paragraph3 opacity-0">
                            <br />
                            <br />

                        </p>
                    </div>
                </div>
            </div>

            {/* Section 3 - Interactive */}
            <div className="section-wrapper neon-border" id="section3Wrapper">
                <div className="section-content interactive-bg">
                    <div className="section3-content">
                        <h2 className="section3-title">
                            Meet Kahuna AI
                        </h2>
                    </div>
                    {/* Word Loop Container */}
                    <div className="word-loop-container">
                        <div className="word-loop-item" id="word-secure">Secure</div>
                        <div className="word-loop-item" id="word-private">Private</div>
                        <div className="word-loop-item" id="word-enterprise">Enterprise Grade</div>
                        <div className="word-loop-item" id="word-comprehensive">Comprehensive</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConsolidatedSections;