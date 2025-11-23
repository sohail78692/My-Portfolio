import TopBar from './TopBar';
import Dock from './Dock';
import Window from './Window';
import { useOS } from '../../context/OSContext';
import { AnimatePresence } from 'framer-motion';

const Desktop = () => {
    const { windows } = useOS();

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop") center/cover no-repeat',
            position: 'relative'
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
