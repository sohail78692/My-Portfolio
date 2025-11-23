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
            className="glass"
            style={{
                position: 'fixed',
                top: '35px',
                right: '10px',
                width: '320px',
                borderRadius: '15px',
                padding: '1rem',
                zIndex: 10000,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
            }}
        >
            {/* Connectivity Block */}
            <div style={{
                gridColumn: '1 / span 2',
                background: 'var(--glass-border)',
                borderRadius: '12px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                        onClick={() => setWifi(!wifi)}
                        style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            background: wifi ? '#007aff' : 'rgba(128,128,128,0.3)',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            cursor: 'pointer', transition: 'background 0.3s'
                        }}
                    >
                        <Wifi size={16} color="#fff" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Wi-Fi</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{wifi ? 'Portfolio Network' : 'Off'}</div>
                    </div>
                </div>
                <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                        onClick={() => setBluetooth(!bluetooth)}
                        style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            background: bluetooth ? '#007aff' : 'rgba(128,128,128,0.3)',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            cursor: 'pointer', transition: 'background 0.3s'
                        }}
                    >
                        <Bluetooth size={16} color="#fff" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Bluetooth</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{bluetooth ? 'On' : 'Off'}</div>
                    </div>
                </div>
            </div>

            {/* Display & Sound */}
            <div style={{ gridColumn: '1 / span 2', background: 'var(--glass-border)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: '600' }}>
                        <Sun size={14} />
                        <span>Display</span>
                    </div>
                    <input
                        type="range"
                        min="10"
                        max="100"
                        defaultValue="100"
                        onChange={(e) => document.body.style.filter = `brightness(${e.target.value}%)`}
                        style={{ width: '100%', accentColor: 'var(--text-color)', height: '4px' }}
                    />
                </div>
                <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: '600' }}>
                        <Volume2 size={14} />
                        <span>Sound</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="80"
                        style={{ width: '100%', accentColor: 'var(--text-color)', height: '4px' }}
                    />
                </div>
            </div>

            {/* Dark Mode Toggle */}
            <div
                onClick={() => {
                    const newMode = !darkMode;
                    setDarkMode(newMode);
                    if (newMode) {
                        document.documentElement.classList.remove('light');
                    } else {
                        document.documentElement.classList.add('light');
                    }
                }}
                style={{
                    gridColumn: '1 / span 2',
                    background: 'var(--glass-border)',
                    borderRadius: '12px',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    cursor: 'pointer'
                }}
            >
                <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: darkMode ? 'rgba(255,255,255,0.2)' : '#f0f0f0',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    transition: 'background 0.3s'
                }}>
                    <Moon size={16} color={darkMode ? '#fff' : '#000'} />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Dark Mode</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{darkMode ? 'On' : 'Off'}</div>
                </div>
            </div>
        </motion.div>
    );
};

export default ControlCenter;
