import { Search, ArrowLeft, ArrowRight, RotateCw, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const projects = [
    {
        id: 1,
        title: 'Expense Mate',
        description: 'A smart expense tracker to manage your finances efficiently.',
        tags: ['Next.js', 'React', 'TailwindCSS'],
        image: 'https://github.com/sohail78692/ExpenseMate/blob/main/expensemate.png?raw=true',
        liveLink: 'https://expense-mate-beta.vercel.app',
        repoLink: 'https://github.com/sohail78692/ExpenseMate'
    },
    {
        id: 2,
        title: 'Playground Code',
        description: 'A modern online code editor with real-time preview functionality.',
        tags: ['React', 'Vite', 'Monaco Editor'],
        image: 'https://github.com/sohail78692/CodePlayground---Modern-Code-Editor/blob/main/Webview.png?raw=true',
        liveLink: 'https://playgroundcode.netlify.app/',
        repoLink: 'https://github.com/sohail78692/CodePlayground---Modern-Code-Editor'
    },
    {
        id: 3,
        title: 'Mood Music',
        description: 'Discover music that matches your current mood.',
        tags: ['React', 'API', 'Framer Motion'],
        image: 'https://github.com/sohail78692/Mood-Music/blob/main/mood-music.png?raw=true',
        liveLink: 'https://mood-music-sigma.vercel.app',
        repoLink: 'https://github.com/sohail78692/Mood-Music'
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
                                    display: 'flex',
                                    flexDirection: 'column'
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
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                                        lineHeight: '1.6',
                                        flex: 1
                                    }}>
                                        {project.description}
                                    </p>
                                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
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

                                    <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '8px',
                                                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                                color: isDark ? '#fff' : '#000',
                                                textDecoration: 'none',
                                                fontSize: '0.9rem',
                                                fontWeight: '500',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
                                        >
                                            <ExternalLink size={16} />
                                            Live Demo
                                        </a>
                                        <a
                                            href={project.repoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '8px',
                                                background: 'transparent',
                                                color: isDark ? '#aaa' : '#666',
                                                textDecoration: 'none',
                                                fontSize: '0.9rem',
                                                fontWeight: '500',
                                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = isDark ? '#fff' : '#000';
                                                e.currentTarget.style.color = isDark ? '#fff' : '#000';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
                                                e.currentTarget.style.color = isDark ? '#aaa' : '#666';
                                            }}
                                        >
                                            <Github size={16} />
                                            Code
                                        </a>
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
