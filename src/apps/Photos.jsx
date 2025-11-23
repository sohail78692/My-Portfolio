const Photos = () => {
    const photos = [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    ];

    return (
        <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#000' }}>Library</h2>
            </div>
            <div style={{ flex: 1, padding: '1rem', overflow: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                {photos.map((src, i) => (
                    <div key={i} style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: '5px' }}>
                        <img src={src} alt={`Photo ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Photos;
