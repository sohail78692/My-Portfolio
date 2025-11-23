import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BootScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1; // Adjust speed here
            });
        }, 30);
        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            color: '#fff'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                style={{ marginBottom: '2rem' }}
            >
                {/* Custom Logo in Circle */}
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid rgba(255,255,255,0.3)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#1a1a1a'
                }}>
                    <img
                        src="/assets/logo.png"
                        alt="Logo"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </motion.div>

            <div style={{
                width: '200px',
                height: '6px',
                background: '#333',
                borderRadius: '3px',
                overflow: 'hidden'
            }}>
                <motion.div
                    style={{
                        height: '100%',
                        background: '#fff',
                        width: `${progress}%`
                    }}
                />
            </div>
        </div>
    );
};

export default BootScreen;
