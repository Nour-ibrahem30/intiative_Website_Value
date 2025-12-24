import { useEffect, useRef, useState } from 'react';
import '../styles/Investors.css';

// safe dynamic image loader (Vite)
const images = import.meta.glob('../Images/*', { eager: true, as: 'url' });
const findImage = (needle) => {
  if (!needle) return null;
  needle = needle.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const [path, url] of Object.entries(images)) {
    const file = path.split('/').pop().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (file.includes(needle)) return url;
  }
  return null;
};

export default function Investors() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const investors = [
    {  img: findImage('oven') },
    { img: findImage('wg') },
    { img: findImage('value') }
  ];

  return (
    <section className="section_investors" ref={sectionRef}>
      <div className="padding-global">
        <div className="container-1280">
          <div className="investors_wrapper">
            <div className={`investors_title ${isVisible ? 'visible' : ''}`}>
              <h2>Sponsored by</h2>
            </div>

            <div className="investors_grid">
              {investors.map((investor, index) => (
                <div className={`investor_item ${isVisible ? 'visible' : ''}`} key={index}>
                  <div className="corner_dot top"></div>
                  <div className="corner_dot bottom"></div>
                  <div className="investor_name">{investor.name}</div>
                  {investor.img && (
                    <div className="investor_logo">
                      <img src={investor.img} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
