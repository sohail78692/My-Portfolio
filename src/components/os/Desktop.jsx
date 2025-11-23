import TopBar from './TopBar';
import Dock from './Dock';
import Window from './Window';
import { useOS } from '../../context/OSContext';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import DiscordStatus from '../DiscordStatus';
import CalendarWidget from '../CalendarWidget';
import WorldClockWidget from '../WorldClockWidget';

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

    const darkWallpaper = '/wallpapers/dark-abstract.jpg';
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
                {/* Widgets Container */}
                <div style={{
                    position: 'absolute',
                    top: '70px',
                    right: '15px',
                    zIndex: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                    width: '400px'
                }}>
                    <DiscordStatus />
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.8rem'
                    }}>
                        <CalendarWidget />
                        <WorldClockWidget />
                    </div>
                </div>

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

