import { useState } from 'react';
import '../styles/Footer.css';

export default function Footer({ onApplyClick }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitStatus === 'submitting') return;

    const endpoint = import.meta.env.VITE_LEADS_ENDPOINT || '/api/leads';

    setSubmitStatus('submitting');
    setSubmitError('');

    const payload = {
      type: 'contact',
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      pageUrl: window.location.href,
      createdAt: new Date().toISOString()
    };

    const submit = async () => {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Request failed');

        setForm({ name: '', email: '', message: '' });
        setSubmitStatus('success');
      } catch {
        setSubmitStatus('error');
        setSubmitError('حصلت مشكلة أثناء الإرسال. جرّب تاني أو ابعت على الإيميل مباشرة.');
      }
    };

    void submit();
  };

  return (
    <footer className="footer" id="contact">
      <div className="padding-global">
        <div className="container-1280">
          <div className="footer_cta">
            <div className="footer_cta_bg">
              <div className="footer_cta_light"></div>
            </div>
            
            <div className="footer_floater">
              <div className="footer_floater_shape"></div>
              <div className="footer_floater_glow"></div>
            </div>
            
            <h2 className="footer_cta_title">
              Ready to Transform Your Business?<br />
              <span className="highlight">Let's Create Value Together.</span>
            </h2>
            <p className="footer_cta_text">
              Apply now and discover how our marketing strategies can help you 
              reach new customers, build brand loyalty, and achieve sustainable growth.
            </p>
            <div className="footer_cta_buttons">
              <a href="#contact-form" className="footer_btn secondary">
                <span>Contact Us</span>
              </a>
              <button 
                className="footer_btn primary"
                onClick={() => onApplyClick?.()}
              >
                <span>Apply Now</span>
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <form id="contact-form" className="footer_contact_form" onSubmit={handleSubmit}>
              <div className="footer_form_grid">
                <label className="footer_field">
                  <span className="footer_label">Name</span>
                  <input
                    className="footer_input"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                    disabled={submitStatus === 'submitting'}
                  />
                </label>

                <label className="footer_field">
                  <span className="footer_label">Email</span>
                  <input
                    className="footer_input"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="you@company.com"
                    required
                    autoComplete="email"
                    disabled={submitStatus === 'submitting'}
                  />
                </label>
              </div>

              <label className="footer_field footer_field_full">
                <span className="footer_label">Message</span>
                <textarea
                  className="footer_input footer_textarea"
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us about your goals…"
                  required
                  rows={5}
                  disabled={submitStatus === 'submitting'}
                />
              </label>

              {submitStatus !== 'idle' && (
                <div
                  className={`footer_notice ${
                    submitStatus === 'success' ? 'success' : submitStatus === 'error' ? 'error' : ''
                  }`}
                  aria-live="polite"
                >
                  {submitStatus === 'submitting' && 'Sending…'}
                  {submitStatus === 'success' && 'تم الإرسال بنجاح. هنتواصل معاك قريباً.'}
                  {submitStatus === 'error' && submitError}
                </div>
              )}

              <div className="footer_form_actions">
                <button type="submit" className="footer_btn primary" disabled={submitStatus === 'submitting'}>
                  <span>{submitStatus === 'submitting' ? 'Sending…' : 'Send Message'}</span>
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <a href="mailto:contact@initiativevalue.com" className="footer_btn secondary">
                  <span>contact@initiativevalue.com</span>
                </a>
              </div>
            </form>
          </div>
          
          <div className="footer_links">
            <div className="footer_links_wrapper">
              <div className="footer_brand">
                <span className="footer_logo_text">Initiative <span className="highlight">Value</span></span>
                <div className="footer_social">
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="social_link" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social_link" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social_link" aria-label="Twitter">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="footer_nav">
                <div className="footer_nav_col">
                  <h4>Services</h4>
                  <a href="#section-features">Brand Strategy</a>
                  <a href="#section-features">Digital Marketing</a>
                </div>
                <div className="footer_nav_col">
                  <h4>Company</h4>
                  <a href="#section-faq">About Us</a>
                  <a href="#contact">Apply Now</a>
                </div>
              </div>
            </div>
            
            <div className="footer_bottom">
              <div className="footer_copyright">© 2025 Initiative Value Marketing. All rights reserved.</div>
              <div className="footer_legal">
                <a href="/terms">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
