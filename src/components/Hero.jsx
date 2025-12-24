import { useEffect, useState } from 'react';
import HeroRobots from './HeroRobots';
import '../styles/Hero.css';

export default function Hero({ onApplyClick }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="section_hero_home">
      <div className="hero_bg">
        <div className="hero_bg_gradient"></div>
        <div className="hero_bg_lines"></div>
        <HeroRobots />
      </div>

      <div className="hero_home_content_wrapper">
        <div className="padding-global">
          <div className="container-1280">
            <div className="hero_home_content">
              <div className={`home_hero_text ${isVisible ? 'visible' : ''}`}>
                <h1 className="hero_title">
                  <span className="text-glow-red">Building The Engine Of Your Growth.</span>
                </h1>
              </div>

              <p className={`hero_subtitle ${isVisible ? 'visible' : ''}`}>
                An Execution Hub that selects five startups to collaborate within a comprehensive, growth-driven marketing system, focused on real business goals and ongoing performance monitoring.
              </p>

              <button
                className={`hero_button ${isVisible ? 'visible' : ''}`}
                onClick={() => onApplyClick?.()}
              >
                <span>Apply With Us</span>
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hero_scroll_indicator">
        <div className="scroll_mouse">
          <div className="scroll_wheel"></div>
        </div>
        <span className="scroll_text">Scroll</span>
      </div>
    </section>
  );
}
