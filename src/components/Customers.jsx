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
            <div className="customers_content">
              <h3 className={`customers_subtitle ${isVisible ? 'visible' : ''}`}>
                We help businesses maintain their competitive edge by delivering integrated marketing strategies that drive measurable, tangible success.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
