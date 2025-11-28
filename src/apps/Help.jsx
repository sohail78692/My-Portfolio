import { useState } from 'react';
import { MousePointer, LayoutGrid, Command, Info } from 'lucide-react';

const Help = () => {
    const [activeSection, setActiveSection] = useState('navigation');

    const sections = [
        { id: 'navigation', label: 'Navigation', icon: MousePointer },
        { id: 'apps', label: 'Apps & Features', icon: LayoutGrid },
        { id: 'shortcuts', label: 'Shortcuts', icon: Command },
        { id: 'about', label: 'About', icon: Info },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'navigation':
                return (
                    <div className="help-content">
                        <h3>Navigating the Portfolio</h3>
                        <p>Welcome to my interactive portfolio! This website is designed to mimic a desktop operating system.</p>
                        <ul>
                            <li><strong>Dock:</strong> Use the dock at the bottom to open applications like Finder, Terminal, and Safari.</li>
                            <li><strong>Top Bar:</strong> Access the system menu, check the time, and control system settings.</li>
                            <li><strong>Windows:</strong> You can drag, resize, minimize, and maximize windows just like a real OS.</li>
                            <li><strong>Desktop:</strong> Right-click on the desktop (coming soon) or use widgets for quick info.</li>
                        </ul>
                    </div>
                );
            case 'apps':
                return (
                    <div className="help-content">
                        <h3>Apps & Features</h3>
                        <div className="feature-grid">
                            <div className="feature-item">
                                <strong>Finder</strong>
                                <p>Explore my projects, skills, and resume in a file system interface.</p>
                            </div>
                            <div className="feature-item">
                                <strong>Terminal</strong>
                                <p>For the tech-savvy, use the terminal to navigate and run custom commands.</p>
                            </div>
                            <div className="feature-item">
                                <strong>Safari</strong>
                                <p>Browse the web (simulated) and view my live projects.</p>
                            </div>
                            <div className="feature-item">
                                <strong>Photos</strong>
                                <p>View my photography portfolio in a gallery layout.</p>
                            </div>
                            <div className="feature-item">
                                <strong>Mail</strong>
                                <p>Contact me directly through the built-in email client.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'shortcuts':
                return (
                    <div className="help-content">
                        <h3>Keyboard Shortcuts</h3>
                        <p>Boost your productivity with these shortcuts:</p>
                        <table className="shortcut-table">
                            <tbody>
                                <tr>
                                    <td><kbd>Esc</kbd></td>
                                    <td>Close full-screen views (like Photos)</td>
                                </tr>
                                <tr>
                                    <td><kbd>Alt</kbd> + <kbd>F4</kbd></td>
                                    <td>Close active window (Simulated)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            case 'about':
                return (
                    <div className="help-content">
                        <h3>About This Portfolio</h3>
                        <p>This portfolio was built using React, Vite, and Framer Motion.</p>
                        <p>It showcases my skills in frontend development, UI/UX design, and creative coding.</p>
                        <p><strong>Version:</strong> 1.0.0</p>
                        <p><strong>Developer:</strong> Sohail</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex', height: '100%', background: '#fff', color: '#333' }}>
            {/* Sidebar */}
            <div style={{
                width: '200px',
                background: '#f5f5f7',
                borderRight: '1px solid #e5e5e5',
                padding: '1rem 0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }}>
                {sections.map((section) => (
                    <div
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            background: activeSection === section.id ? '#e5e5e5' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            fontSize: '0.9rem',
                            fontWeight: activeSection === section.id ? '600' : '400'
                        }}
                    >
                        <section.icon size={18} />
                        {section.label}
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                {renderContent()}
            </div>

            <style>{`
                .help-content h3 {
                    margin-top: 0;
                    margin-bottom: 1.5rem;
                    font-size: 1.8rem;
                    font-weight: 600;
                }
                .help-content ul {
                    padding-left: 1.5rem;
                    line-height: 1.6;
                }
                .help-content li {
                    margin-bottom: 0.8rem;
                }
                .feature-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 1.5rem;
                }
                .feature-item {
                    background: #f9f9f9;
                    padding: 1rem;
                    borderRadius: 8px;
                    border: 1px solid #eee;
                }
                .feature-item strong {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #007aff;
                }
                .feature-item p {
                    margin: 0;
                    font-size: 0.9rem;
                    color: #666;
                }
                .shortcut-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .shortcut-table td {
                    padding: 0.8rem 0;
                    border-bottom: 1px solid #eee;
                }
                kbd {
                    background: #eee;
                    padding: 0.2rem 0.4rem;
                    border-radius: 4px;
                    font-family: monospace;
                    font-size: 0.9rem;
                    border: 1px solid #ccc;
                }
            `}</style>
        </div>
    );
};

export default Help;
