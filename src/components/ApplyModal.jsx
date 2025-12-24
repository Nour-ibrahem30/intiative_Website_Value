import { useEffect, useState } from 'react';
import '../styles/ApplyModal.css';

export default function ApplyModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    document.body.classList.toggle('modal-locked', isOpen);
    return () => document.body.classList.remove('modal-locked');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus('submitting');
    setSubmitError('');
    
    const endpoint = import.meta.env.VITE_LEADS_ENDPOINT || '/api/leads';

    const payload = {
      type: 'apply',
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      message: formData.message.trim(),
      pageUrl: window.location.href,
      createdAt: new Date().toISOString()
    };

    const fallbackMailto = () => {
      const subject = encodeURIComponent('New application from Initiative Value website');
      const body = encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nCompany: ${payload.company}\n\n${payload.message}`.trim()
      );

      window.location.href = `mailto:contact@initiativevalue.com?subject=${subject}&body=${body}`;
    };

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Request failed');
      } else {
        fallbackMailto();
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitStatus('idle');
        onClose?.();
      }, 1200);
    } catch {
      setSubmitStatus('error');
      setSubmitError('حصلت مشكلة أثناء الإرسال. جرّب تاني أو ابعت على الإيميل مباشرة.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <button className="modal_close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="modal_header">
          <h2 className="modal_title">Apply With Us</h2>
          <p className="modal_subtitle">Fill out the form below and we'll get back to you soon</p>
        </div>

        <form className="modal_form" onSubmit={handleSubmit}>
          <div className="form_group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              disabled={isSubmitting}
            />
          </div>

          <div className="form_group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              disabled={isSubmitting}
            />
          </div>

          <div className="form_group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              disabled={isSubmitting}
            />
          </div>

          <div className="form_group">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company name"
              disabled={isSubmitting}
            />
          </div>

          <div className="form_group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your marketing needs..."
              disabled={isSubmitting}
            ></textarea>
          </div>

          {submitStatus !== 'idle' && (
            <div
              className={`form_notice ${
                submitStatus === 'success' ? 'success' : submitStatus === 'error' ? 'error' : ''
              }`}
              aria-live="polite"
            >
              {submitStatus === 'submitting' && 'Submitting…'}
              {submitStatus === 'success' && 'تم الإرسال بنجاح. هنتواصل معاك قريباً.'}
              {submitStatus === 'error' && submitError}
            </div>
          )}

          <button type="submit" className="form_submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Application</span>
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
