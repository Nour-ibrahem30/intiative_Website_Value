import { useState, useEffect, useRef } from 'react';
import '../styles/Slider.css';

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const slides = [
    "Phishing, info-stealers, social engineering… One way or another, some credentials will always leak.",
    "Once in possession, attackers map the target's internet-exposed assets and quickly test the stolen credentials across them.",
    "MokN deploys defensive phishing pages with valid certs, ultra realistic behavior, and domains crafted to blend into the attack surface.",
    "When attackers try to use stolen credentials on the Bait, they're met with a \"login failed\" response.",
    "Behind the scenes, MokN agents check the credentials in real time, and valid ones instantly trigger a critical alert.",
    "The password is reset within minutes, stopping the attack early and providing immediate, actionable intelligence on the attackers."
  ];

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="section_slider" ref={sectionRef}>
      <div className="slider_bg"></div>
      <div className="padding-global">
        <div className="container-1280">
          <div className={`slider_wrapper ${isVisible ? 'visible' : ''}`}>
            <div className="slider_content">
              {slides.map((slide, index) => (
                <p 
                  key={index} 
                  className={`slider_text ${currentSlide === index ? 'active' : ''}`}
                >
                  {slide}
                </p>
              ))}
              <div className="slider_progress">
                <div 
                  className="slider_progress_bar" 
                  style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="slider_nav">
              <div className="slider_dots">
                {slides.map((_, index) => (
                  <div 
                    key={index}
                    className={`slider_dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
              
              <div className="slider_counter">
                <span>{String(currentSlide + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
              </div>
              
              <div className="slider_buttons">
                <button className="slider_button" onClick={prevSlide} aria-label="Previous slide">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="M13 15L8 10L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="slider_button primary" onClick={nextSlide} aria-label="Next slide">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
