import { motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useOS } from '../../context/OSContext';

const Window = ({ window: appWindow }) => {
    const { closeApp, focusApp, minimizeApp, maximizeApp, zIndexMap, activeWindowId, updateWindowPosition } = useOS();
    const isActive = activeWindowId === appWindow.id;

    if (appWindow.isMinimized) return null;

    return (
        <motion.div
            drag={!appWindow.isMaximized}
            dragMomentum={false}
            dragConstraints={{ left: 0, top: 0, right: globalThis.innerWidth - 100, bottom: globalThis.innerHeight - 100 }}
            onDragEnd={(e, info) => {
                if (!appWindow.isMaximized) {
                    updateWindowPosition(appWindow.id, appWindow.x + info.offset.x, appWindow.y + info.offset.y);
                }
            }}
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{
                scale: appWindow.isMaximized ? 1 : 1,
                opacity: 1,
                width: appWindow.isMaximized ? '100vw' : 'min(600px, 90vw)',
                height: appWindow.isMaximized ? 'calc(100vh - 30px)' : 'min(400px, 80vh)',
                x: appWindow.isMaximized ? 0 : (appWindow.x || 0),
                y: appWindow.isMaximized ? 30 : (appWindow.y || 0),
            }}
            exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: zIndexMap[appWindow.id] || 1,
                borderRadius: appWindow.isMaximized ? 0 : '10px',
                overflow: 'hidden',
                boxShadow: isActive ? '0 20px 50px rgba(0,0,0,0.5)' : '0 5px 15px rgba(0,0,0,0.2)',
            }}
            onMouseDown={() => focusApp(appWindow.id)}
            className="glass"
        >
            {/* Window Header */}
            <div
                className="window-header"
                style={{
                    height: '30px',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 0.5rem',
                    cursor: 'grab'
                }}
                onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
            >
                <div style={{ display: 'flex', gap: '0.5rem' }} className="traffic-lights">
                    <div
                        onClick={(e) => { e.stopPropagation(); closeApp(appWindow.id); }}
                        style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <X size={8} color="#000" style={{ opacity: 0, transition: 'opacity 0.2s' }} className="icon" />
                    </div>
                    <div
                        onClick={(e) => { e.stopPropagation(); minimizeApp(appWindow.id); }}
                        style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Minus size={8} color="#000" style={{ opacity: 0, transition: 'opacity 0.2s' }} className="icon" />
                    </div>
                    <div
                        onClick={(e) => { e.stopPropagation(); maximizeApp(appWindow.id); }}
                        style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Maximize2 size={8} color="#000" style={{ opacity: 0, transition: 'opacity 0.2s' }} className="icon" />
                    </div>
                </div>
                <span style={{ marginLeft: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>{appWindow.title}</span>
            </div>

            {/* Window Content */}
            <div style={{ height: 'calc(100% - 30px)', overflow: 'auto', background: '#1e1e1e' }}>
                {appWindow.component && <appWindow.component />}
            </div>
        </motion.div>
    );
};

export default Window;
