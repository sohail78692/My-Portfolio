const About = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            background: '#f5f5f7',
            color: '#000',
            padding: '2rem',
            textAlign: 'center'
        }}>
            <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <img
                    src="/assets/logo.png"
                    alt="Logo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: '600' }}>Portfolio OS</h2>
            <p style={{ margin: '0 0 1.5rem', color: '#666', fontSize: '0.9rem' }}>Version 1.0 (Poku)</p>

            <div style={{ fontSize: '0.85rem', color: '#444', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <p><strong>Processor</strong> 3.2 GHz P2 Pro</p>
                <p><strong>Memory</strong> 16 GB</p>
                <p><strong>Graphics</strong> Poku P2 Pro</p>
            </div>

            <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#888' }}>
                &copy; 2024 Sohail. All rights reserved.
            </div>
        </div>
    );
};

export default About;
