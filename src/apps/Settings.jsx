import { useState } from 'react';
import { Wifi, Battery, Bluetooth, Monitor, Volume2, Lock, User, Bell } from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('Appearance');

    const sidebarItems = [
        { name: 'Wi-Fi', icon: Wifi },
        { name: 'Bluetooth', icon: Bluetooth },
        { name: 'Network', icon: Wifi }, // Placeholder
        { name: 'Notifications', icon: Bell },
        { name: 'Sound', icon: Volume2 },
        { name: 'Focus', icon: User }, // Placeholder
        { name: 'Screen Time', icon: Monitor },
        { name: 'General', icon: User }, // Placeholder
        { name: 'Appearance', icon: Monitor },
        { name: 'Accessibility', icon: User }, // Placeholder
        { name: 'Control Center', icon: User }, // Placeholder
        { name: 'Siri & Spotlight', icon: User }, // Placeholder
        { name: 'Privacy & Security', icon: Lock },
    ];

    return (
        <div style={{
            display: 'flex',
            height: '100%',
            background: '#f5f5f7',
            color: '#000',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }}>
            {/* Sidebar */}
            <div style={{
                width: '220px',
                borderRight: '1px solid #ddd',
                padding: '1rem 0.5rem',
                overflowY: 'auto',
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ padding: '0 0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ccc', overflow: 'hidden' }}>
                        <img src="/assets/logo.png" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Sohail</div>
                        <div style={{ fontSize: '0.75rem', color: '#666' }}>Apple ID</div>
                    </div>
                </div>

                <div style={{ height: '1px', background: '#ddd', margin: '0.5rem 0.5rem 1rem' }}></div>

                {sidebarItems.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => setActiveTab(item.name)}
                        style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            background: activeTab === item.name ? '#007aff' : 'transparent',
                            color: activeTab === item.name ? '#fff' : '#000',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            fontSize: '0.85rem',
                            marginBottom: '2px'
                        }}
                    >
                        <item.icon size={16} />
                        {item.name}
                    </div>
                ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{activeTab}</h2>

                {activeTab === 'Appearance' && (
                    <div>
                        <div style={{ marginBottom: '1rem', fontWeight: '500' }}>Appearance</div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                                <div style={{ width: '80px', height: '50px', background: '#e0e0e0', borderRadius: '6px', marginBottom: '0.5rem', border: '2px solid transparent' }}></div>
                                <span style={{ fontSize: '0.8rem' }}>Light</span>
                            </div>
                            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                                <div style={{ width: '80px', height: '50px', background: '#333', borderRadius: '6px', marginBottom: '0.5rem', border: '2px solid transparent' }}></div>
                                <span style={{ fontSize: '0.8rem' }}>Dark</span>
                            </div>
                            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                                <div style={{ width: '80px', height: '50px', background: 'linear-gradient(90deg, #e0e0e0 50%, #333 50%)', borderRadius: '6px', marginBottom: '0.5rem', border: '2px solid #007aff' }}></div>
                                <span style={{ fontSize: '0.8rem' }}>Auto</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab !== 'Appearance' && (
                    <div style={{ color: '#888', fontStyle: 'italic' }}>
                        Settings for {activeTab} are not available in this demo.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
