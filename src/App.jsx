import CanvasContainer from './components/CanvasContainer';
import Hero from './components/Hero';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Simple 3D object for the hero section
const Hero3DObject = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[2, 0, 0]} scale={1.5}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#64ffda" wireframe />
    </mesh>
  );
};

import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { useState } from 'react';
import { OSProvider } from './context/OSContext';
import Desktop from './components/os/Desktop';
import BootScreen from './components/os/BootScreen';

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      {booted && (
        <OSProvider>
          <Desktop />
        </OSProvider>
      )}
    </>
  );
}

export default App;
