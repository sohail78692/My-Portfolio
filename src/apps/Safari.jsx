import { Search, ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const projects = [
    {
        id: 1,
        title: 'Neon City',
        description: 'A cyberpunk-inspired 3D city explorer built with Three.js.',
        tags: ['React', 'Three.js', 'WebGL'],
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop',
        link: '#'
    },
    {
        id: 2,
        title: 'E-Commerce Dashboard',
        description: 'A modern, responsive dashboard for managing online stores.',
        tags: ['Next.js', 'Tailwind', 'Chart.js'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
        link: '#'
    },
    {
        id: 3,
        title: 'AI Chat Interface',
        description: 'An intuitive chat interface for interacting with LLMs.',
        tags: ['React', 'OpenAI API', 'Framer Motion'],
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
        link: '#'
    },
];

const Safari = () => {
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
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: isDark ? '#1a1a1a' : '#ffffff',
            color: isDark ? '#fff' : '#000'
        }}>
            {/* Browser Toolbar */}
            <div style={{
                height: '40px',
                background: isDark ? '#2a2a2a' : '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                padding: '0 1rem',
                gap: '1rem',
                borderBottom: `1px solid ${isDark ? '#3a3a3a' : '#e0e0e0'}`
            }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <ArrowLeft size={16} color={isDark ? '#888' : '#666'} style={{ cursor: 'pointer' }} />
                    <ArrowRight size={16} color={isDark ? '#888' : '#666'} style={{ cursor: 'pointer' }} />
                    <RotateCw size={16} color={isDark ? '#888' : '#666'} style={{ cursor: 'pointer' }} />
                </div>
                <div style={{
                    flex: 1,
                    background: isDark ? '#1a1a1a' : '#fff',
                    borderRadius: '8px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '0.8rem',
                    fontSize: '0.85rem',
                    color: isDark ? '#aaa' : '#666',
                    border: `1px solid ${isDark ? '#3a3a3a' : '#ddd'}`
                }}>
                    <Search size={14} style={{ marginRight: '0.5rem' }} />
                    portfolio.com/projects
                </div>
            </div>

            {/* Content Area */}
            <div style={{
                flex: 1,
                overflow: 'auto',
                background: isDark ? '#0f0f0f' : '#fafafa',
                padding: '3rem 2rem'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            marginBottom: '1rem',
                            background: isDark
                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        Featured Projects
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{
                            fontSize: '1.1rem',
                            marginBottom: '3rem',
                            color: isDark ? '#aaa' : '#666',
                            maxWidth: '600px'
                        }}
                    >
                        Explore my latest work in web development, 3D graphics, and AI integration.
                    </motion.p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2rem'
                    }}>
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                style={{
                                    background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    height: '200px',
                                    background: `url(${project.image}) center/cover`,
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: isDark
                                            ? 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)'
                                            : 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.9) 100%)'
                                    }} />
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        fontWeight: '600',
                                        marginBottom: '0.8rem',
                                        color: isDark ? '#fff' : '#000'
                                    }}>
                                        {project.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.95rem',
                                        marginBottom: '1.2rem',
                                        color: isDark ? '#aaa' : '#666',
                                        lineHeight: '1.6'
                                    }}>
                                        {project.description}
                                    </p>
                                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                style={{
                                                    fontSize: '0.8rem',
                                                    color: isDark ? '#64ffda' : '#667eea',
                                                    background: isDark
                                                        ? 'rgba(100, 255, 218, 0.1)'
                                                        : 'rgba(102, 126, 234, 0.1)',
                                                    padding: '0.3rem 0.8rem',
                                                    borderRadius: '20px',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Safari;
