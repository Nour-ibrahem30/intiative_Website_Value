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
                We empower startups to stand out in competitive markets and turn ideas into profitable businesses.
              </h2>
              <p className={`lantern_description ${isVisible ? 'visible' : ''}`}>
                Our core services include a full, results-driven marketing strategy built to achieve profitability within six months.
              </p>
            </div>

            <div className={`lantern_image_wrapper ${isVisible ? 'visible' : ''}`}>
              <div className="lantern_particles">
                <div className="lantern_particle"></div>
                <div className="lantern_particle"></div>
                <div className="lantern_particle"></div>
                <div className="lantern_particle"></div>
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
