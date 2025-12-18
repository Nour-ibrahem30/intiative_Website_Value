import { useState, useEffect } from 'react';
import '../styles/Loader.css';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.max(1, (100 - prev) / 10);
        return Math.min(100, prev + increment);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader_screen">
      <div className="loader_content">
        <div className="loader_logo">
          <div className="loader_logo_ring"></div>
          <div className="loader_logo_ring"></div>
          <div className="loader_logo_inner"></div>
        </div>
        <div className="loader_number">{Math.round(progress)}%</div>
        <div className="loader_bar_wrapper">
          <div className="loader_bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="loader_text">Loading experience</div>
      </div>
    </div>
  );
}
