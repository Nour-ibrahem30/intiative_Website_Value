import { useEffect, useRef, useState } from 'react';
import '../styles/CTA.css';

export default function CTA({ onApplyClick }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section_cta" ref={sectionRef}>
      <div className="padding-global">
        <div className="container-1280">
          <div className={`cta_wrapper ${isVisible ? 'visible' : ''}`}>
            <div className="cta_pattern"></div>
            <div className="cta_light"></div>
            <div className="cta_content">
              <div className="cta_text">
                <div className="cta_overline">READY TO GROW?</div>
                <h2 className="cta_title">Let's discuss your marketing goals.</h2>
              </div>
              <button 
                className="cta_button"
                onClick={() => onApplyClick?.()}
              >
                <span>Apply With Us</span>
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
