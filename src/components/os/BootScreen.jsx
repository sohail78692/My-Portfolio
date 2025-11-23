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
                {/* Apple Logo Placeholder - using text for now, could be SVG */}
                <svg viewBox="0 0 24 24" width="80" height="80" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.61-.91.61.03 2.34.25 3.44 1.86-.09.06-2.06 1.2-2.04 3.57.01 2.83 2.48 3.77 2.51 3.78-.02.09-.39 1.35-.92 2.13zM13 5.1c-.66.8-1.58 1.25-2.53 1.21-.23-1.08.4-2.14 1.15-2.84.79-.74 2.1-1.25 3.09-1.21.19 1.12-.97 2.02-1.71 2.84z" />
                </svg>
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
