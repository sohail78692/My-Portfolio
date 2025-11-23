import { Folder, FileText, User } from 'lucide-react';

const Finder = () => {
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            {/* Sidebar */}
            <div style={{ width: '150px', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ marginBottom: '1rem', fontSize: '0.8rem', color: '#888' }}>Favorites</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                    <Folder size={16} color="#007aff" /> Desktop
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                    <Folder size={16} color="#007aff" /> Documents
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                    <Folder size={16} color="#007aff" /> Downloads
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '1rem', alignContent: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <User size={40} color="#888" />
                    <span style={{ fontSize: '0.8rem' }}>About Me.txt</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <FileText size={40} color="#888" />
                    <span style={{ fontSize: '0.8rem' }}>Resume.pdf</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <Folder size={40} color="#007aff" />
                    <span style={{ fontSize: '0.8rem' }}>Skills</span>
                </div>
            </div>
        </div>
    );
};

export default Finder;
