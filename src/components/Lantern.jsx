import { useEffect, useRef, useState } from 'react';
import '../styles/Lantern.css';

export default function Lantern() {
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
    <section id="section-lantern" className="section_lantern" ref={sectionRef}>
      <div className="padding-global">
        <div className="container-1280">
          <div className="lantern_wrapper">
            <div className="lantern_content">
              <h2 className={`lantern_title ${isVisible ? 'visible' : ''}`}>
                We have <span className="highlight">way more</span> to offer:<br />
                monitor your attack surface with Lantern
              </h2>
              <p className={`lantern_description ${isVisible ? 'visible' : ''}`}>
                Combine credential deception with external attack surface management for full-spectrum protection.
              </p>
              <a href="/lantern" className={`lantern_button ${isVisible ? 'visible' : ''}`}>
                <span>Learn more about Lantern</span>
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            
            <div className={`lantern_image_wrapper ${isVisible ? 'visible' : ''}`}>
              <div className="lantern_particles">
                <div className="lantern_particle"></div>
                <div className="lantern_particle"></div>
                <div className="lantern_particle"></div>
                <div className="lantern_particle"></div>
              </div>
              <div className="lantern_image">
                <img 
                  src="https://cdn.prod.website-files.com/68946a7f9dd4e558382abd0f/68952e1432ec4a0ac84b2d16_fbda059d238e442cca2c6f682522f144_Section_Lantern.webp" 
                  alt="Lantern"
                />
              </div>
              <div className="lantern_glow"></div>
              <div className="lantern_mask"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
