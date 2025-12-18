import { useEffect, useRef, useState } from 'react';
import '../styles/Quote.css';

export default function Quote() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section_quote" ref={sectionRef}>
      <div className="padding-global">
        <div className="container-1280">
          <div className="quote_wrapper">
            <div className="quote_bg">
              <div className="quote_light"></div>
            </div>
            
            <div className={`quote_icon ${isVisible ? 'visible' : ''}`}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            
            <p className={`quote_text ${isVisible ? 'visible' : ''}`}>
              "Working with Initiative Value transformed our entire marketing approach. 
              Within 3 months, we saw a 150% increase in qualified leads and our brand awareness skyrocketed. 
              Their team truly understands how to deliver value and drive real results."
            </p>
            
            <div className={`quote_author ${isVisible ? 'visible' : ''}`}>
              <div className="quote_line"></div>
              CEO at a Leading Tech Startup
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
