import { useEffect, useRef, useState } from 'react';
import '../styles/Grid.css';

export default function Grid() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const sectionRef = useRef(null);

  const stats = [
    { number: 1000000000, suffix: "+", label: "Processed login attempts." },
    { number: 300, suffix: "+", label: "Compromised credentials unknown from the dark web." },
    { number: 960000, suffix: "+", label: "Users protected" }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(0) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'k';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
    return num.toString();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(stats.map(stat => Math.round(stat.number * eased)));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section className="section_grid" ref={sectionRef}>
      <div className="grid_bg"></div>
      <div className="padding-global">
        <div className="container-1280">
          <div className="grid_wrapper">
            <div className={`grid_title ${isVisible ? 'visible' : ''}`}>
              <h2>Why MokN?</h2>
            </div>
            
            <div className="stats_grid">
              {stats.map((stat, index) => (
                <div className={`stat_item ${isVisible ? 'visible' : ''}`} key={index}>
                  <div className="corner_dot top-left"></div>
                  <div className="corner_dot top-right"></div>
                  <div className="corner_dot bottom-left"></div>
                  <div className="corner_dot bottom-right"></div>
                  <div className="stat_number">
                    {formatNumber(counts[index])}{stat.suffix}
                  </div>
                  <div className="stat_label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
