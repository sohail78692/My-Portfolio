import { useState } from 'react';
import { Wifi, Bluetooth, Moon, Sun, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ControlCenter = ({ isOpen, onClose }) => {
    const [wifi, setWifi] = useState(true);
    const [bluetooth, setBluetooth] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            style={{
                position: 'fixed',
                top: '35px',
                right: '10px',
                width: '320px',
                background: 'rgba(30, 30, 30, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: '15px',
                padding: '1rem',
                zIndex: 10000,
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
        >
            {/* Connectivity Block */}
            <div style={{
                gridColumn: '1 / span 2',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                        onClick={() => setWifi(!wifi)}
                        style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            background: wifi ? '#007aff' : '#444',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            cursor: 'pointer', transition: 'background 0.3s'
                        }}
                    >
                        <Wifi size={18} color="#fff" />
                    </div>
                    <div>
                        <div style={{ fontWeight: '500' }}>Wi-Fi</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{wifi ? 'Portfolio Network' : 'Off'}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                        onClick={() => setBluetooth(!bluetooth)}
                        style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            background: bluetooth ? '#007aff' : '#444',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            cursor: 'pointer', transition: 'background 0.3s'
                        }}
                    >
                        <Bluetooth size={18} color="#fff" />
                    </div>
                    <div>
                        <div style={{ fontWeight: '500' }}>Bluetooth</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{bluetooth ? 'On' : 'Off'}</div>
                    </div>
                </div>
            </div>

            {/* Display & Sound */}
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <Sun size={24} />
                <span style={{ fontSize: '0.8rem' }}>Display</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <Volume2 size={24} />
                <span style={{ fontSize: '0.8rem' }}>Sound</span>
            </div>

            {/* Focus Mode */}
            <div style={{
                gridColumn: '1 / span 2',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <Moon size={20} />
                <div style={{ flex: 1 }}>Focus</div>
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Do Not Disturb</span>
            </div>
        </motion.div>
    );
};

export default ControlCenter;
