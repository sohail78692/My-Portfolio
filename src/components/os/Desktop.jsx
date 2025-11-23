import TopBar from './TopBar';
import Dock from './Dock';
import Window from './Window';
import { useOS } from '../../context/OSContext';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Desktop = () => {
    const { windows } = useOS();
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(!document.documentElement.classList.contains('light'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const darkWallpaper = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop';
    const lightWallpaper = 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2070&auto=format&fit=crop';

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: `url("${isDark ? darkWallpaper : lightWallpaper}") center/cover no-repeat`,
            position: 'relative',
            overflow: 'hidden',
            transition: 'background 0.5s ease'
        }}>
            <TopBar />

            {/* Desktop Area */}
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <AnimatePresence>
                    {windows.map((window) => (
                        <Window key={window.id} window={window} />
                    ))}
                </AnimatePresence>
            </div>

            <Dock />
        </div>
    );
};

export default Desktop;
