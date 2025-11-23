import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense } from 'react';

const CanvasContainer = ({ children }) => {
    return (
        <div className="canvas-container">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={[1, 2]} // Handle high DPI screens
            >
                <Suspense fallback={null}>
                    <color attach="background" args={['#050505']} />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    {children}
                    {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
                </Suspense>
            </Canvas>
        </div>
    );
};

export default CanvasContainer;
