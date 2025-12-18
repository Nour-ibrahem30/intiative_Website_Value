import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import Ball3D from './Ball3D';
import '../styles/HeroRobots.css';

export default function HeroRobots() {
  const [primaryColor, setPrimaryColor] = useState('#FF0137');

  useEffect(() => {
    const updateColor = () => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim() || '#FF0137';
      setPrimaryColor(color);
    };

    updateColor();
    
    // Update color when theme changes
    const interval = setInterval(updateColor, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="hero_robots_container">
      {/* Ball 1 */}
      <div className="hero_robot_wrapper hero_robot_1">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          className="hero_robot_canvas"
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <directionalLight position={[-5, -5, -5]} intensity={0.8} />
            <pointLight position={[0, 0, 0]} intensity={1} color={primaryColor} />
            <Ball3D 
              position={[0, 0, 0]} 
              rotationSpeed={0.4}
              color={primaryColor}
            />
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Ball 2 */}
      <div className="hero_robot_wrapper hero_robot_2">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          className="hero_robot_canvas"
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <directionalLight position={[-5, -5, -5]} intensity={0.8} />
            <pointLight position={[0, 0, 0]} intensity={1} color={primaryColor} />
            <Ball3D 
              position={[0, 0, 0]} 
              rotationSpeed={0.5}
              color={primaryColor}
            />
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

