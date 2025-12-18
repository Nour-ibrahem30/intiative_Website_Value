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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      title: "Strategic",
      highlight: "Brand Building",
      description: "Create a powerful brand identity that resonates with your audience and stands out in the market."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="8.5" cy="7" r="4"/>
          <path d="M20 8v6M23 11h-6"/>
        </svg>
      ),
      title: "Customer",
      highlight: "Acquisition",
      titleEnd: "& Retention",
      description: "Attract new customers and keep them coming back with data-driven marketing strategies."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      ),
      title: "",
      highlight: "Digital",
      titleEnd: "Marketing Excellence",
      description: "Leverage social media, SEO, and content marketing to maximize your online presence and engagement."
    }
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
