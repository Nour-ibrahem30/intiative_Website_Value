import { useState } from 'react';
import "../styles/Footer.css";

// dynamically load any image that exists in /src/Images to avoid import errors
const images = import.meta.glob('../Images/*', { eager: true, as: 'url' });
const ovenImg = images['../Images/Oven-White.png'] || images['../Images/Oven White.png'] || images['../Images/oven-white.png'] || null;
const wgImg = images['../Images/WG-White.png'] || images['../Images/WG White.png'] || images['../Images/wg-white.png'] || null;
const valueImg = images['../Images/Value-Marketing-White.png'] || images['../Images/Value Marketing White.png'] || images['../Images/value-marketing-white.png'] || null;

export default function Footer({ onApplyClick }) {
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [showFallbackModal, setShowFallbackModal] = useState(false);

  const showExecutionModal = () => {
    const el = document.getElementById('executionModal');
    if (el && window.bootstrap && typeof window.bootstrap.Modal === 'function') {
      const modal = new window.bootstrap.Modal(el);
      modal.show();
    } else {
      setShowFallbackModal(true);
    }
  };
  const closeFallbackModal = () => setShowFallbackModal(false);

  return (
    <footer className="footer" id="contact">
      <div className="padding-global">
        <div className="container-1280">
          <div className="footer_cta">
            <h2 className="footer_cta_title">
              Ready to Transform Your Business?<br />
              <span className="highlight">Let's Create Value Together.</span>
            </h2>
            <p className="footer_cta_text">
              Apply now and discover how our marketing strategies can help you reach new customers, build brand loyalty, and achieve sustainable growth.
            </p>
            <div className="footer_cta_buttons">
              <a href="mailto:contact@initiativevalue.com" className="footer_btn secondary">
                <span>Contact Us</span>
              </a>
              <button
                className="footer_btn primary"
                onClick={() => { showExecutionModal(); onApplyClick?.(); }}
              >
                <span>Apply Now</span>
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* contact form removed */}
          </div>

          <div className="footer_links">
            <div className="footer_links_wrapper">
              <div className="footer_brand">
                <span className="footer_logo_text">Initiative <span className="highlight">Value</span></span>
              </div>

              <div className="footer_nav">
                <div className="footer_nav_col">
                  <h4>Services</h4>
                  <a href="#section-features">Visual Identity Design</a>
                  <a href="#section-features">Creating a Website for Every Company</a>
                  <a href="#section-features">Social Media Management</a>
                  <a href="#section-features">Photography</a>
                  <a href="#section-features">Analytics and Monitoring</a>
                </div>
                <div className="footer_nav_col">
                  <h4>Company</h4>
                  <a href="#section-faq" onClick={(e) => { e.preventDefault(); showExecutionModal(); }}>About Us</a>
                  <a href="#contact">Apply Now</a>
                </div>
              </div>
            </div>

            <div className="footer_bottom">
              <div className="footer_copyright">© 2025 Initiative Value Marketing. All rights reserved.</div>
              <div className="footer_legal"><a href="/terms">Terms of Service</a></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
