import { useState, useEffect } from 'react';
import '../styles/ThemeSwitcher.css';

const themes = [
  {
    id: 'red',
    name: 'Red',
    colors: {
      primary: '#FF0137',
      primaryHover: '#ff1a4a',
      gradient: 'linear-gradient(135deg, #FF0137 0%, #06090A 100%)',
      glow: 'rgba(255, 1, 55, 0.6)'
    }
  },
  {
    id: 'blue',
    name: 'Blue',
    colors: {
      primary: '#0066FF',
      primaryHover: '#1a7aff',
      gradient: 'linear-gradient(135deg, #0066FF 0%, #06090A 100%)',
      glow: 'rgba(0, 102, 255, 0.6)'
    }
  },
  {
    id: 'purple',
    name: 'Purple',
    colors: {
      primary: '#9333EA',
      primaryHover: '#a855f7',
      gradient: 'linear-gradient(135deg, #9333EA 0%, #06090A 100%)',
      glow: 'rgba(147, 51, 234, 0.6)'
    }
  },
  {
    id: 'green',
    name: 'Green',
    colors: {
      primary: '#10B981',
      primaryHover: '#34d399',
      gradient: 'linear-gradient(135deg, #10B981 0%, #06090A 100%)',
      glow: 'rgba(16, 185, 129, 0.6)'
    }
  },
  {
    id: 'orange',
    name: 'Orange',
    colors: {
      primary: '#F97316',
      primaryHover: '#fb923c',
      gradient: 'linear-gradient(135deg, #F97316 0%, #06090A 100%)',
      glow: 'rgba(249, 115, 22, 0.6)'
    }
  },
  {
    id: 'cyan',
    name: 'Cyan',
    colors: {
      primary: '#06B6D4',
      primaryHover: '#22d3ee',
      gradient: 'linear-gradient(135deg, #06B6D4 0%, #06090A 100%)',
      glow: 'rgba(6, 182, 212, 0.6)'
    }
  },
  {
    id: 'pink',
    name: 'Pink',
    colors: {
      primary: '#EC4899',
      primaryHover: '#f472b6',
      gradient: 'linear-gradient(135deg, #EC4899 0%, #06090A 100%)',
      glow: 'rgba(236, 72, 153, 0.6)'
    }
  },
  {
    id: 'indigo',
    name: 'Indigo',
    colors: {
      primary: '#6366F1',
      primaryHover: '#818cf8',
      gradient: 'linear-gradient(135deg, #6366F1 0%, #06090A 100%)',
      glow: 'rgba(99, 102, 241, 0.6)'
    }
  },
  {
    id: 'teal',
    name: 'Teal',
    colors: {
      primary: '#14B8A6',
      primaryHover: '#2dd4bf',
      gradient: 'linear-gradient(135deg, #14B8A6 0%, #06090A 100%)',
      glow: 'rgba(20, 184, 166, 0.6)'
    }
  },
  {
    id: 'yellow',
    name: 'Yellow',
    colors: {
      primary: '#EAB308',
      primaryHover: '#facc15',
      gradient: 'linear-gradient(135deg, #EAB308 0%, #06090A 100%)',
      glow: 'rgba(234, 179, 8, 0.6)'
    }
  },
  {
    id: 'rose',
    name: 'Rose',
    colors: {
      primary: '#F43F5E',
      primaryHover: '#fb7185',
      gradient: 'linear-gradient(135deg, #F43F5E 0%, #06090A 100%)',
      glow: 'rgba(244, 63, 94, 0.6)'
    }
  },
  {
    id: 'violet',
    name: 'Violet',
    colors: {
      primary: '#8B5CF6',
      primaryHover: '#a78bfa',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #06090A 100%)',
      glow: 'rgba(139, 92, 246, 0.6)'
    }
  },
  {
    id: 'emerald',
    name: 'Emerald',
    colors: {
      primary: '#059669',
      primaryHover: '#10b981',
      gradient: 'linear-gradient(135deg, #059669 0%, #06090A 100%)',
      glow: 'rgba(5, 150, 105, 0.6)'
    }
  },
  {
    id: 'sky',
    name: 'Sky',
    colors: {
      primary: '#0EA5E9',
      primaryHover: '#38bdf8',
      gradient: 'linear-gradient(135deg, #0EA5E9 0%, #06090A 100%)',
      glow: 'rgba(14, 165, 233, 0.6)'
    }
  },
  {
    id: 'amber',
    name: 'Amber',
    colors: {
      primary: '#F59E0B',
      primaryHover: '#fbbf24',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #06090A 100%)',
      glow: 'rgba(245, 158, 11, 0.6)'
    }
  },
  {
    id: 'lime',
    name: 'Lime',
    colors: {
      primary: '#84CC16',
      primaryHover: '#a3e635',
      gradient: 'linear-gradient(135deg, #84CC16 0%, #06090A 100%)',
      glow: 'rgba(132, 204, 22, 0.6)'
    }
  },
  {
    id: 'fuchsia',
    name: 'Fuchsia',
    colors: {
      primary: '#D946EF',
      primaryHover: '#e879f9',
      gradient: 'linear-gradient(135deg, #D946EF 0%, #06090A 100%)',
      glow: 'rgba(217, 70, 239, 0.6)'
    }
  },
  {
    id: 'slate',
    name: 'Slate',
    colors: {
      primary: '#64748B',
      primaryHover: '#94a3b8',
      gradient: 'linear-gradient(135deg, #64748B 0%, #06090A 100%)',
      glow: 'rgba(100, 116, 139, 0.6)'
    }
  },
  {
    id: 'coral',
    name: 'Coral',
    colors: {
      primary: '#FF6B6B',
      primaryHover: '#ff8787',
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #06090A 100%)',
      glow: 'rgba(255, 107, 107, 0.6)'
    }
  },
  {
    id: 'mint',
    name: 'Mint',
    colors: {
      primary: '#00D9A5',
      primaryHover: '#1ae6b8',
      gradient: 'linear-gradient(135deg, #00D9A5 0%, #06090A 100%)',
      glow: 'rgba(0, 217, 165, 0.6)'
    }
  },
  {
    id: 'lavender',
    name: 'Lavender',
    colors: {
      primary: '#A78BFA',
      primaryHover: '#c4b5fd',
      gradient: 'linear-gradient(135deg, #A78BFA 0%, #06090A 100%)',
      glow: 'rgba(167, 139, 250, 0.6)'
    }
  },
  {
    id: 'turquoise',
    name: 'Turquoise',
    colors: {
      primary: '#40E0D0',
      primaryHover: '#5eead4',
      gradient: 'linear-gradient(135deg, #40E0D0 0%, #06090A 100%)',
      glow: 'rgba(64, 224, 208, 0.6)'
    }
  },
  {
    id: 'gold',
    name: 'Gold',
    colors: {
      primary: '#FFD700',
      primaryHover: '#ffed4e',
      gradient: 'linear-gradient(135deg, #FFD700 0%, #06090A 100%)',
      glow: 'rgba(255, 215, 0, 0.6)'
    }
  },
  {
    id: 'crimson',
    name: 'Crimson',
    colors: {
      primary: '#DC143C',
      primaryHover: '#e63950',
      gradient: 'linear-gradient(135deg, #DC143C 0%, #06090A 100%)',
      glow: 'rgba(220, 20, 60, 0.6)'
    }
  },
  {
    id: 'royal',
    name: 'Royal',
    colors: {
      primary: '#4169E1',
      primaryHover: '#5b7ce8',
      gradient: 'linear-gradient(135deg, #4169E1 0%, #06090A 100%)',
      glow: 'rgba(65, 105, 225, 0.6)'
    }
  },
  {
    id: 'neon',
    name: 'Neon',
    colors: {
      primary: '#00FF41',
      primaryHover: '#33ff66',
      gradient: 'linear-gradient(135deg, #00FF41 0%, #06090A 100%)',
      glow: 'rgba(0, 255, 65, 0.6)'
    }
  },
  {
    id: 'magenta',
    name: 'Magenta',
    colors: {
      primary: '#FF00FF',
      primaryHover: '#ff33ff',
      gradient: 'linear-gradient(135deg, #FF00FF 0%, #06090A 100%)',
      glow: 'rgba(255, 0, 255, 0.6)'
    }
  },
  {
    id: 'aqua',
    name: 'Aqua',
    colors: {
      primary: '#00FFFF',
      primaryHover: '#33ffff',
      gradient: 'linear-gradient(135deg, #00FFFF 0%, #06090A 100%)',
      glow: 'rgba(0, 255, 255, 0.6)'
    }
  },
  {
    id: 'peach',
    name: 'Peach',
    colors: {
      primary: '#FFB347',
      primaryHover: '#ffc266',
      gradient: 'linear-gradient(135deg, #FFB347 0%, #06090A 100%)',
      glow: 'rgba(255, 179, 71, 0.6)'
    }
  },
  {
    id: 'salmon',
    name: 'Salmon',
    colors: {
      primary: '#FA8072',
      primaryHover: '#fb998d',
      gradient: 'linear-gradient(135deg, #FA8072 0%, #06090A 100%)',
      glow: 'rgba(250, 128, 114, 0.6)'
    }
  },
  {
    id: 'plum',
    name: 'Plum',
    colors: {
      primary: '#DDA0DD',
      primaryHover: '#e6b8e6',
      gradient: 'linear-gradient(135deg, #DDA0DD 0%, #06090A 100%)',
      glow: 'rgba(221, 160, 221, 0.6)'
    }
  },
  {
    id: 'steel',
    name: 'Steel',
    colors: {
      primary: '#4682B4',
      primaryHover: '#6a9bc4',
      gradient: 'linear-gradient(135deg, #4682B4 0%, #06090A 100%)',
      glow: 'rgba(70, 130, 180, 0.6)'
    }
  },
  {
    id: 'copper',
    name: 'Copper',
    colors: {
      primary: '#B87333',
      primaryHover: '#c6894d',
      gradient: 'linear-gradient(135deg, #B87333 0%, #06090A 100%)',
      glow: 'rgba(184, 115, 51, 0.6)'
    }
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: {
      primary: '#228B22',
      primaryHover: '#3da33d',
      gradient: 'linear-gradient(135deg, #228B22 0%, #06090A 100%)',
      glow: 'rgba(34, 139, 34, 0.6)'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: {
      primary: '#006994',
      primaryHover: '#1a7aa4',
      gradient: 'linear-gradient(135deg, #006994 0%, #06090A 100%)',
      glow: 'rgba(0, 105, 148, 0.6)'
    }
  },
  {
    id: 'cherry',
    name: 'Cherry',
    colors: {
      primary: '#DE3163',
      primaryHover: '#e44d7a',
      gradient: 'linear-gradient(135deg, #DE3163 0%, #06090A 100%)',
      glow: 'rgba(222, 49, 99, 0.6)'
    }
  },
  {
    id: 'lilac',
    name: 'Lilac',
    colors: {
      primary: '#C8A2C8',
      primaryHover: '#d3b5d3',
      gradient: 'linear-gradient(135deg, #C8A2C8 0%, #06090A 100%)',
      glow: 'rgba(200, 162, 200, 0.6)'
    }
  }
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('red');
  const [opacity, setOpacity] = useState(0.6);

  useEffect(() => {
    // Load theme and opacity from localStorage
    const savedTheme = localStorage.getItem('siteTheme') || 'red';
    const savedOpacity = parseFloat(localStorage.getItem('themeOpacity')) || 0.6;
    setCurrentTheme(savedTheme);
    setOpacity(savedOpacity);
    applyTheme(savedTheme, savedOpacity);
  }, []);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const applyTheme = (themeId, opacityValue = opacity) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;

    const root = document.documentElement;
    const rgb = hexToRgb(theme.colors.primary);
    
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-primary-hover', theme.colors.primaryHover);
    root.style.setProperty('--gradient-primary', theme.colors.gradient);
    root.style.setProperty('--gradient-primary-hover', `linear-gradient(135deg, ${theme.colors.primaryHover} 0%, #1a1a1a 100%)`);
    root.style.setProperty('--opacity-value', (opacityValue * 100).toString());
    
    if (rgb) {
      // Apply opacity to glow - use the opacity value
      root.style.setProperty('--color-glow', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacityValue})`);
      root.style.setProperty('--color-glow-rgb', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}`);
    }
  };

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    applyTheme(themeId, opacity);
    localStorage.setItem('siteTheme', themeId);
    setIsOpen(false);
  };

  const handleOpacityChange = (e) => {
    const newOpacity = parseFloat(e.target.value);
    setOpacity(newOpacity);
    applyTheme(currentTheme, newOpacity);
    localStorage.setItem('themeOpacity', newOpacity.toString());
  };

  const currentThemeData = themes.find(t => t.id === currentTheme);

  return (
    <div className="theme_switcher">
      <button 
        className="theme_toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
        title="Change Theme"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
        <span className="theme_indicator" style={{ backgroundColor: currentThemeData?.colors.primary }}></span>
      </button>

      {isOpen && (
        <>
          <div className="theme_overlay" onClick={() => setIsOpen(false)}></div>
          <div className="theme_picker">
            <div className="theme_picker_header">
              <h3>Choose Theme</h3>
              <button 
                className="theme_close"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="theme_opacity_control">
              <label htmlFor="opacity-slider">
                <span>Color Intensity</span>
                <span className="opacity_value">{Math.round(opacity * 100)}%</span>
              </label>
              <div className="opacity_slider_wrapper">
                <input
                  type="range"
                  id="opacity-slider"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={opacity}
                  onChange={handleOpacityChange}
                  className="opacity_slider"
                  style={{
                    '--opacity-value': `${opacity * 100}%`
                  }}
                />
                <div 
                  className="opacity_slider_fill"
                  style={{
                    width: `${opacity * 100}%`,
                    backgroundColor: currentThemeData?.colors.primary || '#FF0137'
                  }}
                ></div>
              </div>
            </div>

            <div className="theme_grid">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  className={`theme_option ${currentTheme === theme.id ? 'active' : ''}`}
                  onClick={() => handleThemeChange(theme.id)}
                  style={{ '--theme-color': theme.colors.primary }}
                >
                  <div className="theme_preview" style={{ backgroundColor: theme.colors.primary }}>
                    <div className="theme_preview_dot" style={{ backgroundColor: theme.colors.primaryHover }}></div>
                  </div>
                  <span className="theme_name">{theme.name}</span>
                  {currentTheme === theme.id && (
                    <svg className="theme_check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
