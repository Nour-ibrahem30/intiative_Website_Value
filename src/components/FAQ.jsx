import { useState, useEffect, useRef } from 'react';
import '../styles/FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  const faqs = [
    {
      question: "Is the application restricted to specific industries?",
      answer: ` No, applications are open to all industries..`
    },
    {
      question: "What are the eligibility criteria for the application?",
      answer: `Our company must have been operating in the market for a certain period, with a clear company profile and a solid, well-defined business model.`
    },
    {
      question: "Can the duration be extended beyond 6 months?",
      answer: `Yes, you can continue after the initial 6-month period, but it will incur a service fee`
    },
    {
      question: "Can I select specific services out of the five offered for my startup?",
      answer: `Yes, you can select specific services from our five core offerings to suit your startup's needs.`
    }
  ];

  return (
    <section id="section-faq" className="section_faq" ref={sectionRef}>
      <div className="padding-global">
        <div className="container-1280">
          <div className="faq_layout">
            <div className={`faq_sticky ${isVisible ? 'visible' : ''}`}>
              <h2>Still have questions? Let's clear things up.</h2>
              <p className="faq_sticky_text">
                Here are answers to the most common questions we hear from security leaders exploring MokN.
              </p>
              <a href="/contact" className="faq_button">
                <span>Contact us</span>
              </a>
            </div>
            
            <div className={`faq_list ${isVisible ? 'visible' : ''}`}>
              {faqs.map((faq, index) => (
                <div 
                  className={`faq_item ${openIndex === index ? 'open' : ''}`} 
                  key={index}
                >
                  <div 
                    className="faq_question"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <h3>{faq.question}</h3>
                    <div className="faq_icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="faq_answer">
                    <div className="faq_answer_content">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
