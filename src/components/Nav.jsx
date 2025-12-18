import { useState, useEffect } from 'react';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav_component {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav_component.scrolled {
          background: rgba(6, 9, 10, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .nav_container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1280px;
          margin: 0 auto;
          padding: 1.25rem 2.5rem;
          transition: padding 0.3s ease;
        }
        
        .nav_component.scrolled .nav_container {
          padding: 0.875rem 2.5rem;
        }
        
        .nav_brand {
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
        }
        
        .nav_brand:hover {
          transform: scale(1.05);
        }
        
        .nav_logo {
          width: auto;
          height: 2rem;
          transition: height 0.3s ease;
        }
        
        .nav_component.scrolled .nav_logo {
          height: 1.75rem;
        }
        
        .nav_menu {
          display: flex;
          align-items: center;
          gap: 3rem;
        }
        
        .nav_links_wrapper {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }
        
        .nav-link {
          color: #fff;
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 400;
          position: relative;
          padding: 0.5rem 0;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #FF0137, #ff6b6b);
          transition: width 0.3s ease;
          border-radius: 1px;
        }
        
        .nav-link:hover {
          color: #FF0137;
          opacity: 1;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .nav_cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #FF0137 0%, #06090A 100%);
          border-radius: 0.5rem;
          color: #fff;
          font-weight: 500;
          font-size: 0.875rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          text-decoration: none;
        }
        
        .nav_cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #ff1a4a 0%, #1a1a1a 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .nav_cta span {
          position: relative;
          z-index: 1;
        }
        
        .nav_cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(255, 1, 55, 0.4);
          opacity: 1;
        }
        
        .nav_cta:hover::before {
          opacity: 1;
        }
        
        .nav_button {
          display: none;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0.5rem;
          transition: transform 0.3s ease;
        }
        
        .nav_button:hover {
          transform: scale(1.1);
        }
        
        .nav_button svg {
          width: 24px;
          height: 24px;
        }
        
        @media (max-width: 768px) {
          .nav_container {
            padding: 1rem 1.25rem;
          }
          
          .nav_menu {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(6, 9, 10, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            padding: 2rem;
            gap: 2rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .nav_menu.active {
            opacity: 1;
            visibility: visible;
          }
          
          .nav_links_wrapper {
            flex-direction: column;
            gap: 2rem;
          }
          
          .nav-link {
            font-size: 1.5rem;
            font-weight: 500;
          }
          
          .nav_cta {
            padding: 1rem 2rem;
            font-size: 1rem;
          }
          
          .nav_button {
            display: block;
            z-index: 1001;
          }
        }
      `}</style>
      
      <nav className={`nav_component ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav_container">
          <a href="/" className="nav_brand">
            <img 
              src="https://cdn.prod.website-files.com/68946a7f9dd4e558382abd0f/6894d99e4c33d996091e62ff_32e54c129a2d219d7db73c0460dbaf8f_logo-mokn.svg" 
              alt="MokN Logo" 
              className="nav_logo"
            />
          </a>
          
          <div className={`nav_menu ${menuOpen ? 'active' : ''}`}>
            <div className="nav_links_wrapper">
              <a href="#section-features" className="nav-link" onClick={() => setMenuOpen(false)}>Baits</a>
              <a href="#section-lantern" className="nav-link" onClick={() => setMenuOpen(false)}>Lantern</a>
              <a href="#section-faq" className="nav-link" onClick={() => setMenuOpen(false)}>About us</a>
            </div>
            <a href="#contact" className="nav_cta" onClick={() => setMenuOpen(false)}>
              <span>Contact us</span>
            </a>
          </div>
          
          <button className="nav_button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M18 18L6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
