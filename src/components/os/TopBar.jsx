import { useState, useEffect } from 'react';
import { Wifi, Search } from 'lucide-react';
import BatteryStatus from './BatteryStatus';
import ControlCenter from './ControlCenter';
import { useOS } from '../../context/OSContext';

const TopBar = () => {
    const [time, setTime] = useState(new Date());
    const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const { openApp, sleep, shutDown } = useOS();

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

    const handleMenuAction = (action) => {
        switch (action) {
            case 'Sleep':
                sleep();
                break;
            case 'Restart...':
                window.location.reload();
                break;
            case 'Shut Down...':
                shutDown();
                break;
            case 'About This Mac':
                openApp('about', 'About This Mac');
                break;
            case 'System Settings...':
                openApp('settings', 'System Settings');
                break;
            default:
                console.log('Menu action:', action);
        }
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
            <div className="glass" style={{
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
                borderRadius: 0,
                border: 'none',
                borderBottom: '1px solid var(--glass-border)'
            }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', height: '100%' }}>
                    {Object.keys(menuItems).map((item, index) => (
                        <div
                            key={item}
                            style={{ position: 'relative', cursor: 'default', height: '100%', display: 'flex', alignItems: 'center' }}
                            onMouseEnter={() => activeMenu && setActiveMenu(item)}
                            onClick={() => setActiveMenu(activeMenu === item ? null : item)}
                        >
                            {index === 0 ? (
                                // Custom Logo for first item
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    marginLeft: '0.5rem'
                                }}>
                                    <img
                                        src="/assets/logo.png"
                                        alt="Logo"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            ) : (
                                <span style={{ fontWeight: item === 'Portfolio' ? 'bold' : 'normal', padding: '0 0.5rem' }}>{item}</span>
                            )}
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
                                        <div
                                            key={subItem}
                                            style={{ padding: '0.2rem 1rem', cursor: 'default', color: '#fff' }}
                                            className="menu-item"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleMenuAction(subItem);
                                                setActiveMenu(null);
                                            }}
                                        >
                                            {subItem}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <BatteryStatus size={18} />
                    <Wifi size={18} />
                    <Search size={18} />

                    {/* Control Center Toggle */}
                    <div
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        onClick={() => {
                            setIsControlCenterOpen(!isControlCenterOpen);
                        }}
                    >
                        <div style={{ width: '18px', height: '18px', border: '1px solid #fff', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '12px', height: '1px', background: '#fff', transform: 'translateY(-2px)' }}></div>
                            <div style={{ width: '12px', height: '1px', background: '#fff', position: 'absolute', transform: 'translateY(2px)' }}></div>
                        </div>
                    </div>

                    {/* Date/Time Display (No Click Action) */}
                    <div
                        style={{ cursor: 'default', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                    >
                        <span>{formatDate(time)}</span>
                        <span>{formatTime(time)}</span>
                    </div>
                </div>
            </div>

            {/* Overlay to close menus */}
            {(activeMenu || isControlCenterOpen) && (
                <div
                    style={{ position: 'fixed', top: '30px', left: 0, width: '100vw', height: '100vh', zIndex: 9998 }}
                    onClick={() => {
                        setActiveMenu(null);
                        setIsControlCenterOpen(false);
                    }}
                />
            )}

            <ControlCenter isOpen={isControlCenterOpen} onClose={() => setIsControlCenterOpen(false)} />
        </>
    );
};

export default TopBar;
