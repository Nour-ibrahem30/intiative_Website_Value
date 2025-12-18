import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';

export default function Ball3D({ position, rotationSpeed = 0.5, color = '#FF0137' }) {
  const ballRef = useRef();
  const innerBallRef = useRef();

  // Rotate and animate the ball
  useFrame((state, delta) => {
    if (ballRef.current) {
      ballRef.current.rotation.x += delta * rotationSpeed;
      ballRef.current.rotation.y += delta * rotationSpeed * 0.7;
      ballRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
    if (innerBallRef.current) {
      innerBallRef.current.rotation.x -= delta * rotationSpeed * 1.2;
      innerBallRef.current.rotation.y -= delta * rotationSpeed * 0.9;
    }
  });

  // Ball material with glow effect
  const material = useMemo(() => {
    return new MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.1,
    });
  }, [color]);

  const innerMaterial = useMemo(() => {
    return new MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 1.2,
      metalness: 0.95,
      roughness: 0.05,
      transparent: true,
      opacity: 0.6,
    });
  }, [color]);

  return (
    <group position={position}>
      <group ref={ballRef}>
        {/* Outer Ball */}
        <mesh material={material}>
          <sphereGeometry args={[1, 64, 64]} />
        </mesh>
        
        {/* Inner Ball */}
        <mesh ref={innerBallRef} material={innerMaterial}>
          <sphereGeometry args={[0.7, 64, 64]} />
        </mesh>
        
        {/* Core Glow */}
        <mesh material={new MeshStandardMaterial({ 
          color: color, 
          emissive: color, 
          emissiveIntensity: 2,
          transparent: true,
          opacity: 0.8
        })}>
          <sphereGeometry args={[0.4, 32, 32]} />
        </mesh>
        
        {/* Glow effect */}
        <pointLight position={[0, 0, 0]} color={color} intensity={4} distance={8} decay={2} />
        <pointLight position={[0, 0, 0]} color={color} intensity={2} distance={12} decay={3} />
        
        {/* Ring around ball */}
        <mesh rotation={[Math.PI / 2, 0, 0]} material={new MeshStandardMaterial({ 
          color: color, 
          emissive: color, 
          emissiveIntensity: 0.5,
          transparent: true,
          opacity: 0.3
        })}>
          <torusGeometry args={[1.2, 0.05, 16, 100]} />
        </mesh>
      </group>
    </group>
  );
}

