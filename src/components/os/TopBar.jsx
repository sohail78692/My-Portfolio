import { useState, useEffect, useRef } from 'react';
import { Wifi, Battery, Search, Command } from 'lucide-react';
import ControlCenter from './ControlCenter';

const TopBar = () => {
    const [time, setTime] = useState(new Date());
    const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    const menuItems = {
        '': ['About This Mac', 'System Settings...', 'Sleep', 'Restart...', 'Shut Down...'],
        'Portfolio': ['About Portfolio', 'Preferences...'],
        'File': ['New Window', 'New Folder', 'Close Window'],
        'Edit': ['Undo', 'Redo', 'Cut', 'Copy', 'Paste'],
        'View': ['As Icons', 'As List', 'As Columns'],
        'Go': ['Applications', 'Desktop', 'Downloads'],
        'Window': ['Minimize', 'Zoom', 'Bring All to Front'],
        'Help': ['Portfolio Help']
    };

    return (
        <>
            <div className="glass-dark" style={{
                height: '30px',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 1rem',
                fontSize: '0.85rem',
                fontWeight: '500',
                position: 'fixed',
                top: 0,
                zIndex: 9999,
                color: '#fff'
            }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', height: '100%' }}>
                    {Object.keys(menuItems).map((item) => (
                        <div
                            key={item}
                            style={{ position: 'relative', cursor: 'default', height: '100%', display: 'flex', alignItems: 'center' }}
                            onMouseEnter={() => activeMenu && setActiveMenu(item)}
                            onClick={() => setActiveMenu(activeMenu === item ? null : item)}
                        >
                            <span style={{ fontWeight: item === '' || item === 'Portfolio' ? 'bold' : 'normal', padding: '0 0.5rem' }}>{item}</span>
                            {activeMenu === item && (
                                <div style={{
                                    position: 'absolute',
                                    top: '30px',
                                    left: 0,
                                    background: 'rgba(30, 30, 30, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '5px',
                                    padding: '0.5rem 0',
                                    minWidth: '200px',
                                    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    zIndex: 10000
                                }}>
                                    {menuItems[item].map((subItem) => (
                                        <div key={subItem} style={{ padding: '0.2rem 1rem', cursor: 'default', color: '#fff' }} className="menu-item">
                                            {subItem}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Battery size={18} />
                    <Wifi size={18} />
                    <Search size={18} />
                    <div
                        style={{ cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                        onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
                    >
                        <div style={{ width: '18px', height: '18px', border: '1px solid #fff', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '12px', height: '1px', background: '#fff', transform: 'translateY(-2px)' }}></div>
                            <div style={{ width: '12px', height: '1px', background: '#fff', position: 'absolute', transform: 'translateY(2px)' }}></div>
                        </div>
                        <span>{formatDate(time)}</span>
                        <span>{formatTime(time)}</span>
                    </div>
                </div>
            </div>

            {/* Overlay to close menus */}
            {activeMenu && (
                <div
                    style={{ position: 'fixed', top: '30px', left: 0, width: '100vw', height: '100vh', zIndex: 9998 }}
                    onClick={() => setActiveMenu(null)}
                />
            )}

            <ControlCenter isOpen={isControlCenterOpen} onClose={() => setIsControlCenterOpen(false)} />
        </>
    );
};

export default TopBar;
