import { motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useOS } from '../../context/OSContext';

const Window = ({ window }) => {
    const { closeApp, focusApp, minimizeApp, maximizeApp, zIndexMap, activeWindowId, updateWindowPosition } = useOS();
    const isActive = activeWindowId === window.id;

    if (window.isMinimized) return null;

    return (
        <motion.div
            drag={!window.isMaximized}
            dragMomentum={false}
            onDragEnd={(e, info) => {
                if (!window.isMaximized) {
                    updateWindowPosition(window.id, window.x + info.offset.x, window.y + info.offset.y);
                }
            }}
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{
                scale: window.isMaximized ? 1 : 1,
                opacity: 1,
                width: window.isMaximized ? '100vw' : '600px',
                height: window.isMaximized ? 'calc(100vh - 30px)' : '400px',
                x: window.isMaximized ? 0 : (window.x || 0),
                y: window.isMaximized ? 30 : (window.y || 0),
            }}
            exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: zIndexMap[window.id] || 1,
                borderRadius: window.isMaximized ? 0 : '10px',
                overflow: 'hidden',
                boxShadow: isActive ? '0 20px 50px rgba(0,0,0,0.5)' : '0 5px 15px rgba(0,0,0,0.2)',
            }}
            onMouseDown={() => focusApp(window.id)}
            className="glass-dark"
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
                        onClick={(e) => { e.stopPropagation(); closeApp(window.id); }}
                        style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <X size={8} color="#000" style={{ opacity: 0, transition: 'opacity 0.2s' }} className="icon" />
                    </div>
                    <div
                        onClick={(e) => { e.stopPropagation(); minimizeApp(window.id); }}
                        style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Minus size={8} color="#000" style={{ opacity: 0, transition: 'opacity 0.2s' }} className="icon" />
                    </div>
                    <div
                        onClick={(e) => { e.stopPropagation(); maximizeApp(window.id); }}
                        style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Maximize2 size={8} color="#000" style={{ opacity: 0, transition: 'opacity 0.2s' }} className="icon" />
                    </div>
                </div>
                <span style={{ marginLeft: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>{window.title}</span>
            </div>

            {/* Window Content */}
            <div style={{ height: 'calc(100% - 30px)', overflow: 'auto', background: '#1e1e1e' }}>
                {window.component && <window.component />}
            </div>
        </motion.div>
    );
};

export default Window;
