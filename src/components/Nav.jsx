import { useMemo, useState, useEffect } from 'react';
import '../styles/Nav.css';

export default function Nav({ onApplyClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-locked', menuOpen);
    return () => document.body.classList.remove('nav-locked');
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = useMemo(
    () => [
      { id: 'section-features', label: 'Initiative' },
      { id: 'section-faq', label: 'Benefits' },
      { id: 'contact-form', label: 'Apply' },
      { a: 'https://valueims.com/', label: 'Value' }
    ],
    []
  );

  useEffect(() => {
    const elements = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries[0]?.target?.id) setActiveSection(visibleEntries[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navLinks]);

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const nav = document.querySelector('.nav_component');
    const navHeight = nav?.offsetHeight ?? 0;
    const top = element.getBoundingClientRect().top + window.scrollY - navHeight - 8;

    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleNavClick = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <nav className={`nav_component ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav_container">
          <a
            href="#top"
            className="nav_brand"
            onClick={(event) => {
              event.preventDefault();
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Initiative Value"
          >
            <span className="nav_logo_text">
              Initiative <span className="highlight">Value</span>
            </span>
          </a>
          
          <div id="nav-menu" className={`nav_menu ${menuOpen ? 'active' : ''}`}>
            <div className="nav_links_wrapper">
              {navLinks.map((link) => {
                const key = link.id || link.a;
                if (link.a) {
                  return (
                    <a
                      key={key}
                      href={link.a}
                      className="nav-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  );
                }

                return (
                  <a
                    key={key}
                    href={`#${link.id}`}
                    className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                    aria-current={activeSection === link.id ? 'page' : undefined}
                    onClick={(event) => handleNavClick(event, link.id)}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
            <button
              type="button"
              className="nav_cta"
              onClick={() => {
                setMenuOpen(false);
                onApplyClick?.();
              }}
            >
              <span>Apply Now</span>
            </button>
          </div>
          
          <button
            className="nav_button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
          >
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
