import { useEffect, useRef, useState } from 'react';
import '../styles/Events.css';

export default function Events() {
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
    <section className="section_events" ref={sectionRef}>
      <div className="padding-global">
        <div className="container-1280">
          <div className="events_wrapper">
            <div className={`events_globe ${isVisible ? 'visible' : ''}`}>
              <div className="globe_outer">
                <div className="globe_gradient"></div>
                <div className="globe_grid"></div>
                <div className="globe_dots">
                  <div className="globe_dot"></div>
                  <div className="globe_dot"></div>
                  <div className="globe_dot"></div>
                  <div className="globe_dot"></div>
                </div>
                <div className="globe_icon">🌍</div>
              </div>
            </div>
            
            <div className={`events_content ${isVisible ? 'visible' : ''}`}>
              <h2>Let's meet at our next event</h2>
              <p className="events_description">
                Meeting Mokn at the upcoming event promises to be a memorable experience. 
                Get ready to exchange ideas and discover new perspectives. 
                Don't miss this opportunity to connect with us!
              </p>
              <p className="events_description" style={{ marginBottom: '1rem' }}>Our next events:</p>
              <div className="events_list">
                <div className="event_item">
                  <div className="event_dot"></div>
                  <span className="event_text">Cyber/IA Expo 2026 - Paris, France / Feb 3, 2026</span>
                </div>
                <div className="event_item">
                  <div className="event_dot"></div>
                  <span className="event_text">RSAC 2026 - San Francisco, USA / Mar 23-26, 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
