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
      question: "Why hasn't anyone done this before?",
      answer: `Because doing it right is hard.

Placing a decoy on the public internet means attackers have all the time in the world to inspect, fingerprint, and compare. If the setup doesn't feel real, it gets ignored.

The second challenge is what happens when it doesn't. Once a Bait is exposed, it faces constant traffic: scans, brute force, background noise. Extracting useful signals from that chaos is just as hard as building a convincing decoy.

We built Baits to solve both problems. Each instance is designed to replicate real services with extreme fidelity, and every alert is filtered and validated to remove false positives. The result is clean, confirmed signals tied to real credential misuse.`
    },
    {
      question: "How do we know the concept works?",
      answer: `Because it already does. Across organizations of all sizes.

From 200-employee companies to multinational groups, Baits have consistently uncovered high-value signals:
• Freshly compromised credentials actively tested by attackers
• Breaches in progress that had gone unnoticed
• Insights into attacker tactics and targeting patterns

Every deployment confirms the value. No noise, no guesswork. Just confirmed signals your team can act on.`
    },
    {
      question: "How do we make sure attackers actually fall for the Baits?",
      answer: `Because we know how they think.

Our team comes from years of offensive security and pentesting. We understand how attackers explore an external perimeter, what catches their eye, and how they choose targets. That's why every Bait is carefully contextualized to mimic your real assets, technologies, and domain naming conventions.

The result? High-fidelity traps that blend into your environment and naturally attract reconnaissance activity. No tricks, just realism.`
    },
    {
      question: "How are Baits different from traditional honeypots?",
      answer: `Realism and relevance.

Internal honeypots catch attackers already inside. At that point, they're rushing. They don't have time to analyze what's real or fake. That makes deception easier.

With Baits, it's a different game. They're exposed online, where attackers have time to probe, fingerprint, and compare. If something feels fake, they won't bite. That's why we invest serious effort in making Baits indistinguishable from your legitimate assets.

Baits aren't passive traps. They're an active way to detect attackers before they reach your systems.`
    },
    {
      question: "What's the value if we already monitor the dark web?",
      answer: `Dark web monitoring often comes too late. Most stolen credentials are used long before they're leaked or sold. Baits intercept compromised credentials at the source, as attackers actively test them. This gives your team time to neutralize the threat before it escalates.`
    },
    {
      question: "We already have MFA. Do we really need this?",
      answer: `Yes. MFA reduces risk, but attackers increasingly find ways around it. Tactics like push fatigue, token theft, and social engineering can still give them access. Baits catches attackers in the act of using stolen credentials, regardless of your MFA setup. It provides a safety net when MFA is bypassed or disabled.`
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
