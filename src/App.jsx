import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Loader from './components/Loader';
import Hero from './components/Hero';
import Features from './components/Features';
import Slider from './components/Slider';
import Grid from './components/Grid';
import Customers from './components/Customers';
import Quote from './components/Quote';
import Investors from './components/Investors';
import CTA from './components/CTA';
import Events from './components/Events';
import Lantern from './components/Lantern';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ApplyModal from './components/ApplyModal';
import ThemeSwitcher from './components/ThemeSwitcher';
import './styles/App.css';

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // Scroll animations
  useEffect(() => {
    if (showLoader) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.animate-on-scroll');
    animatableElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [showLoader]);

  if (showLoader) {
    return <Loader />;
  }

  return (
    <div className="page-wrapper">
      <Nav onApplyClick={() => setIsModalOpen(true)} />
      <main className="main-wrapper">
        <Hero onApplyClick={() => setIsModalOpen(true)} />
        <Features onApplyClick={() => setIsModalOpen(true)} />
        <Slider />
        <Grid />
        <Customers />
        <Quote />
        <Investors />
        <CTA onApplyClick={() => setIsModalOpen(true)} />
        <Events />
        <Lantern />
        <FAQ />
        <Footer onApplyClick={() => setIsModalOpen(true)} />
      </main>
      <BackToTop />
      <ThemeSwitcher />
      <ApplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
