import { useEffect, useRef, useState } from 'react';
import '../styles/Grid.css';

export default function Grid() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const sectionRef = useRef(null);

  const stats = [
    { number: 72, label: "creatives" },
    { number: 6, label: "consultation" },
    { number: 5, label: "Digital Platforms" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(stats.map(s => Math.round(s.number * eased)));

      if (step >= steps) clearInterval(timer);
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
              <h2>Why value?</h2>
            </div>

            <div className="stats_grid">
              {stats.map((stat, index) => (
                <div className={`stat_item ${isVisible ? 'visible' : ''}`} key={index}>
                  <div className="corner_dot top-left"></div>
                  <div className="corner_dot top-right"></div>
                  <div className="corner_dot bottom-left"></div>
                  <div className="corner_dot bottom-right"></div>
                  <div className="stat_number">
                    {counts[index]}
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
