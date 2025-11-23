import { Folder, FileText, User } from 'lucide-react';
import { useState, useEffect } from 'react';

const Finder = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(!document.documentElement.classList.contains('light'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    return (
        <div style={{
            display: 'flex',
            height: '100%',
            background: isDark ? '#1a1a1a' : '#ffffff',
            color: isDark ? '#fff' : '#000'
        }}>
            {/* Sidebar */}
            <div style={{
                width: '180px',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                padding: '1rem',
                borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
            }}>
                <div style={{
                    marginBottom: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: isDark ? '#888' : '#666',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    Favorites
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                    marginBottom: '0.6rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    transition: 'background 0.2s'
                }}>
                    <Folder size={18} color="#007aff" />
                    <span style={{ fontSize: '0.9rem' }}>Desktop</span>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                    marginBottom: '0.6rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '6px'
                }}>
                    <Folder size={18} color="#007aff" />
                    <span style={{ fontSize: '0.9rem' }}>Documents</span>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                    marginBottom: '0.6rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '6px'
                }}>
                    <Folder size={18} color="#007aff" />
                    <span style={{ fontSize: '0.9rem' }}>Downloads</span>
                </div>
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                padding: '2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '2rem',
                alignContent: 'start'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.7rem',
                    cursor: 'pointer',
                    padding: '1rem',
                    borderRadius: '8px',
                    transition: 'background 0.2s'
                }}>
                    <User size={48} color={isDark ? '#888' : '#666'} />
                    <span style={{ fontSize: '0.85rem', textAlign: 'center' }}>About Me.txt</span>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.7rem',
                    cursor: 'pointer',
                    padding: '1rem',
                    borderRadius: '8px'
                }}>
                    <FileText size={48} color={isDark ? '#888' : '#666'} />
                    <span style={{ fontSize: '0.85rem', textAlign: 'center' }}>Resume.pdf</span>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.7rem',
                    cursor: 'pointer',
                    padding: '1rem',
                    borderRadius: '8px'
                }}>
                    <Folder size={48} color="#007aff" />
                    <span style={{ fontSize: '0.85rem', textAlign: 'center' }}>Skills</span>
                </div>
            </div>
        </div>
    );
};

export default Finder;
