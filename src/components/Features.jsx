import { useEffect, useRef, useState } from 'react';
import '../styles/Features.css';

export default function Features({ onApplyClick }) {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = sectionRef.current?.querySelectorAll('.feature_row, .implement_section');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.24 12.24a7.5 7.5 0 1 0-8.48 8.48 2.5 2.5 0 0 0 2.5-2.5 3.5 3.5 0 0 0-3.5-3.5 2 2 0 0 1 2-2h3a1.5 1.5 0 0 0 1.48-1.76z"/>
          <circle cx="7.5" cy="7.5" r="1.5"/>
          <circle cx="12" cy="6" r="1"/>
          <circle cx="16.5" cy="7.5" r="1"/>
        </svg>
      ),
      title: "Visual",
      highlight: "Identity Design",
      description: `While "Branding" is a company's overall strategy and reputation, "Visual Identity" is the specific visual look that supports that strategy.`
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="14" rx="2"/>
          <path d="M8 20h8"/>
          <circle cx="12" cy="11" r="3"/>
          <path d="M12 8v6M9 11h6"/>
        </svg>
      ),
      title: "Creating a Website",
      highlight: "for Every Company",
      description: "A website allows you to reach customers beyond your local area, opening doors to national and international markets."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <circle cx="8.5" cy="10.5" r="1.5"/>
          <circle cx="15.5" cy="10.5" r="1.5"/>
          <path d="M11 13.5c.5.7 1.5 1.2 2 1.2"/>
        </svg>
      ),
      title: "",
      highlight: "Social Media",
      titleEnd: "Management",
      description: "Is The Process Of Managing A Brand’s Online Presence Across Various Social Platforms Like Instagram, LinkedIn, X (Twitter), and TikTok."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <circle cx="8.5" cy="10.5" r="1.5"/>
          <circle cx="15.5" cy="10.5" r="1.5"/>
          <path d="M11 13.5c.5.7 1.5 1.2 2 1.2"/>
        </svg>
      ),
      title: "",
      highlight: "Photography",
      description: "Is The Art, Application, And Practice Of Creating Durable Images By Recording Light. In The Business World, High-Quality Photography Is A Powerful Tool For Visual Storytelling, Helping Brands Convey Their Identity And Showcase Their Products Or Services In The Best Possible Light."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <circle cx="8.5" cy="10.5" r="1.5"/>
          <circle cx="15.5" cy="10.5" r="1.5"/>
          <path d="M11 13.5c.5.7 1.5 1.2 2 1.2"/>
        </svg>
      ),
      title: "Analytics",
      highlight: "and Monitoring",
      description: "It is The Process Of Collecting, Reviewing, And Interpreting Data To Track The Performance Of A Business's Digital Activities."
    },
  ];

  return (
    <section id="section-features" className="section_features" ref={sectionRef}>
      <div className="padding-global">
        <div className="container-1280">
          <div className="features_wrapper">
            {features.map((feature, index) => (
              <div 
                className={`feature_row ${visibleItems.includes(index) ? 'visible' : ''}`} 
                key={index}
                data-index={index}
              >
                <div className="feature_img">
                  <div className="feature_img_glow"></div>
                  <div className="feature_img_inner">
                    <div className="feature_img_placeholder">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <div className="feature_content">
                  <div className="feature_icon_wrapper">
                    <div className="feature_icon">{feature.icon}</div>
                    <h3 className="feature_title">
                      {feature.title} <span className="highlight">{feature.highlight}</span> {feature.titleEnd}
                    </h3>
                  </div>
                  <p className="feature_description">{feature.description}</p>
                </div>
              </div>
            ))}
            
            <div 
              className={`implement_section ${visibleItems.includes(3) ? 'visible' : ''}`}
              data-index="3"
            >
              <div className="implement_pattern"></div>
              <h2 className="implement_title">
                <span>Ready to grow your business?</span><br />
                <span className="text-glow-red">Start Your Journey Today.</span>
              </h2>
              <p className="implement_description">
                No complicated processes. No hidden fees.<br />
                Get started with a free consultation and see results within weeks.
              </p>
              <button 
                className="implement_button"
                onClick={() => onApplyClick?.()}
              >
                <span>Apply Now</span>
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
