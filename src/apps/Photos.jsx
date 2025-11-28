import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const Photos = () => {
    const [columnWidth, setColumnWidth] = useState(150);
    const [gap, setGap] = useState('0.5rem');
    const [padding, setPadding] = useState('1rem');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const containerRef = useRef(null);

    const photos = [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop',
    ];

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                const width = entry.contentRect.width;
                // Adjust layout based on container width
                if (width < 350) {
                    setColumnWidth(80);
                    setGap('0.25rem');
                    setPadding('0.5rem');
                } else if (width < 500) {
                    setColumnWidth(100);
                    setGap('0.5rem');
                    setPadding('0.75rem');
                } else {
                    setColumnWidth(150);
                    setGap('1rem');
                    setPadding('1rem');
                }
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedPhoto(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const getThumbnailUrl = (url) => {
        return url.replace(/w=\d+/, 'w=500');
    };

    return (
        <div ref={containerRef} style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ padding: padding, borderBottom: '1px solid #eee', transition: 'padding 0.3s' }}>
                <h2 style={{ margin: 0, fontSize: columnWidth < 100 ? '1.2rem' : '1.5rem', color: '#000' }}>Photos</h2>
            </div>
            <div style={{
                flex: 1,
                padding: padding,
                overflow: 'auto',
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, minmax(${columnWidth}px, 1fr))`,
                gap: gap,
                alignContent: 'start',
                transition: 'padding 0.3s, gap 0.3s'
            }}>
                {photos.map((src, i) => (
                    <div key={i} style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: '4px', background: '#eee' }}>
                        <img
                            src={getThumbnailUrl(src)}
                            alt={`Photo ${i}`}
                            className="photo-grid-item"
                            loading="lazy"
                            decoding="async"
                            onClick={() => setSelectedPhoto(src)}
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox Overlay */}
            {selectedPhoto && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100,
                    animation: 'fadeIn 0.2s ease'
                }} onClick={() => setSelectedPhoto(null)}>
                    <button
                        onClick={() => setSelectedPhoto(null)}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#fff',
                            zIndex: 101
                        }}
                    >
                        <X size={20} />
                    </button>
                    <img
                        src={selectedPhoto}
                        alt="Full screen"
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90%',
                            objectFit: 'contain',
                            borderRadius: '4px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                    />
                </div>
            )}
            <style>{`
                .photo-grid-item {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                    cursor: pointer;
                }
                .photo-grid-item:hover {
                    transform: scale(1.1);
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Photos;
