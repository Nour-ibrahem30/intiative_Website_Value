import { useState } from 'react';
import "../styles/Footer.css";

// dynamically load any image that exists in /src/Images to avoid import errors
const images = import.meta.glob('../Images/*', { eager: true, as: 'url' });
const ovenImg = images['../Images/Oven-White.png'] || images['../Images/Oven White.png'] || images['../Images/oven-white.png'] || null;
const wgImg = images['../Images/WG-White.png'] || images['../Images/WG White.png'] || images['../Images/wg-white.png'] || null;
const valueImg = images['../Images/Value-Marketing-White.png'] || images['../Images/Value Marketing White.png'] || images['../Images/value-marketing-white.png'] || null;

export default function Footer({ onApplyClick }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitStatus === 'submitting') return;
    setSubmitStatus('submitting');
    setSubmitError('');
    const endpoint = import.meta.env.VITE_LEADS_ENDPOINT || '/api/leads';
    const payload = {
      name: form.name.trim(), email: form.email.trim(), message: form.message.trim(), pageUrl: window.location.href, createdAt: new Date().toISOString()
    };
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then(() => { setForm({ name: '', email: '', message: '' }); setSubmitStatus('success'); })
      .catch(() => { setSubmitStatus('error'); setSubmitError('حصلت مشكلة أثناء الإرسال. جرّب تاني أو ابعت على الإيميل مباشرة.'); });
  };

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
              <a href="#contact-form" className="footer_btn secondary"><span>Contact Us</span></a>
              <button className="footer_btn primary" onClick={() => { showExecutionModal(); onApplyClick?.(); }}>
                <span>Apply Now</span>
                <svg viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>

            <form id="contact-form" className="footer_contact_form" onSubmit={handleSubmit}>
              <div className="footer_form_grid">
                <label className="footer_field">
                  <span className="footer_label">Name</span>
                  <input className="footer_input" type="text" value={form.name} onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} placeholder="Your name" required autoComplete="name" disabled={submitStatus === 'submitting'} />
                </label>
                <label className="footer_field">
                  <span className="footer_label">Email</span>
                  <input className="footer_input" type="email" value={form.email} onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))} placeholder="you@company.com" required autoComplete="email" disabled={submitStatus === 'submitting'} />
                </label>
              </div>

              <label className="footer_field footer_field_full">
                <span className="footer_label">Message</span>
                <textarea className="footer_input footer_textarea" value={form.message} onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))} placeholder="Tell us about your goals…" required rows={5} disabled={submitStatus === 'submitting'} />
              </label>

              {submitStatus !== 'idle' && (
                <div className={`footer_notice ${submitStatus === 'success' ? 'success' : submitStatus === 'error' ? 'error' : ''}`} aria-live="polite">
                  {submitStatus === 'submitting' && 'Sending…'}
                  {submitStatus === 'success' && 'تم الإرسال بنجاح. هنتواصل معاك قريباً.'}
                  {submitStatus === 'error' && submitError}
                </div>
              )}

              <div className="footer_form_actions">
                <button type="submit" className="footer_btn primary" disabled={submitStatus === 'submitting'}>
                  <span>{submitStatus === 'submitting' ? 'Sending…' : 'Send Message'}</span>
                </button>
                <a href="mailto:contact@initiativevalue.com" className="footer_btn secondary"><span>contact@initiativevalue.com</span></a>
              </div>
            </form>
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
