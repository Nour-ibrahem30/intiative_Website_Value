import { useEffect, useRef, useState } from 'react';
import '../styles/Investors.css';

export default function Investors() {
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

  const investors = [
    { name: "Moonfire", logo: "https://cdn.prod.website-files.com/68946a7f9dd4e558382abd0f/68a4746dd7b6e5e682dfe95b_74eb63032adb65f2ee864cd7b56e8854_Placeholder%20Logo.png" },
    { name: "OVNI", logo: "https://cdn.prod.website-files.com/68946a7f9dd4e558382abd0f/68cd54b08e7061269087ebc1_e583667ce8cc1a88334081460828146d_ovni.png" },
    { name: "Kima Ventures", logo: "https://cdn.prod.website-files.com/68946a7f9dd4e558382abd0f/68a478de27776b7d5ca5f7a4_007c1c5f38dd5c81bb4b0184889a7b73_Placeholder%20Logo.png" }
  ];

  return (
    <section className="section_investors" ref={sectionRef}>
      <div className="padding-global">
        <div className="container-1280">
          <div className="investors_wrapper">
            <div className={`investors_title ${isVisible ? 'visible' : ''}`}>
              <h2>Backed by strategic investors</h2>
            </div>
            
            <div className="investors_grid">
              {investors.map((investor, index) => (
                <div className={`investor_item ${isVisible ? 'visible' : ''}`} key={index}>
                  <div className="corner_dot top"></div>
                  <div className="corner_dot bottom"></div>
                  <img src={investor.logo} alt={investor.name} className="investor_logo" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
