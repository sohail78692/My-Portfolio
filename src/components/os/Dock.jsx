import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useOS } from '../../context/OSContext';
import { Folder, Terminal, Globe, Mail, Image } from 'lucide-react';

const apps = [
    { id: 'finder', title: 'Finder', icon: Folder, color: '#007aff' },
    { id: 'terminal', title: 'Terminal', icon: Terminal, color: '#333' },
    { id: 'safari', title: 'Safari', icon: Globe, color: '#00dcb4' },
    { id: 'mail', title: 'Mail', icon: Mail, color: '#5856d6' },
    { id: 'photos', title: 'Photos', icon: Image, color: 'linear-gradient(to bottom, #ff0000, #ff9900)' },
];

const Dock = () => {
    const mouseX = useMotionValue(Infinity);
    const { openApp } = useOS();

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="glass"
            style={{
                display: 'flex',
                gap: '1rem',
                padding: '0.8rem',
                borderRadius: '20px',
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                x: '-50%',
                height: '80px',
                alignItems: 'flex-end',
                zIndex: 100,
            }}
        >
            {apps.map((app) => (
                <DockIcon key={app.id} mouseX={mouseX} app={app} onClick={() => openApp(app.id, app.title)} />
            ))}
        </motion.div>
    );
};

const DockIcon = ({ mouseX, app, onClick }) => {
    const ref = useRef(null);
    const { windows } = useOS();
    const isOpen = windows.some((w) => w.id === app.id);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <motion.div
                ref={ref}
                style={{ width, height: width, cursor: 'pointer' }}
                onClick={onClick}
                whileHover={{ y: -10 }}
            >
                <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px',
                    background: app.color.includes('gradient') ? app.color : app.color,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                }}>
                    <app.icon size="60%" />
                </div>
            </motion.div>
            <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: isOpen ? 'var(--text-color)' : 'transparent',
                opacity: 0.8
            }} />
        </div>
    );
};

export default Dock;
