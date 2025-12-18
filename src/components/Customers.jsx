import { useEffect, useRef, useState } from 'react';
import '../styles/Customers.css';

export default function Customers() {
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
    <section className="section_customers" ref={sectionRef}>
      <div className="padding-global">
        <div className="container-1280">
          <div className="customers_wrapper">
            <div className={`customers_title ${isVisible ? 'visible' : ''}`}>
              <h2>Our customers</h2>
            </div>
            
            <div className={`blurred_logos ${isVisible ? 'visible' : ''}`}>
              <div className="blurred_logos_bg"></div>
            </div>
            
            <div className="customers_content">
              <h3 className={`customers_subtitle ${isVisible ? 'visible' : ''}`}>
                Don't see any logos? That's intentional.
              </h3>
              <p className={`customers_text ${isVisible ? 'visible' : ''}`}>
                We've chosen to keep our clients anonymous. But to give you a sense of scale, 
                the combined annual revenue of organizations protected by MokN exceeds
              </p>
              <div className={`customers_revenue ${isVisible ? 'visible' : ''}`}>€410 billion.</div>
              <p className={`customers_tagline ${isVisible ? 'visible' : ''}`}>
                We don't showcase logos. We protect them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
