import TopBar from './TopBar';
import Dock from './Dock';
import Window from './Window';
import { useOS } from '../../context/OSContext';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import DiscordStatus from '../DiscordStatus';
import CalendarWidget from '../CalendarWidget';
import WorldClockWidget from '../WorldClockWidget';

const Desktop = () => {
    const { windows, isSleeping, isShutDown, wake } = useOS();

    // Handle waking up from sleep
    useEffect(() => {
        if (!isSleeping) return;

        const handleWake = () => {
            wake();
        };

        window.addEventListener('mousemove', handleWake);
        window.addEventListener('keydown', handleWake);
        window.addEventListener('click', handleWake);

        return () => {
            window.removeEventListener('mousemove', handleWake);
            window.removeEventListener('keydown', handleWake);
            window.removeEventListener('click', handleWake);
        };
    }, [isSleeping, wake]);

    const darkWallpaper = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop';

    if (isShutDown) {
        return (
            <div style={{
                width: '100vw',
                height: '100vh',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#333',
                zIndex: 99999
            }}>
                {/* Completely black screen for shutdown */}
            </div>
        );
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: `url("${darkWallpaper}") center/cover no-repeat`,
            position: 'relative',
            overflow: 'hidden',
            transition: 'background 0.5s ease'
        }}>
            {/* Sleep Overlay */}
            {isSleeping && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: '#000',
                    zIndex: 100000,
                    cursor: 'none'
                }} />
            )}

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

