import { motion } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: 'Expense Mate',
        description: 'A smart expense tracker to manage your finances efficiently.',
        tags: ['Next.js', 'React', 'TailwindCSS'],
        liveLink: 'https://expense-mate-beta.vercel.app',
        repoLink: 'https://github.com/sohail78692/ExpenseMate'
    },
    {
        id: 2,
        title: 'Playground Code',
        description: 'A modern online code editor with real-time preview functionality.',
        tags: ['React', 'Vite', 'Monaco Editor'],
        liveLink: 'https://playgroundcode.netlify.app/',
        repoLink: 'https://github.com/sohail78692/CodePlayground---Modern-Code-Editor'
    },
    {
        id: 3,
        title: 'Mood Music',
        description: 'Discover music that matches your current mood.',
        tags: ['React', 'API', 'Framer Motion'],
        liveLink: 'https://mood-music-sigma.vercel.app',
        repoLink: 'https://github.com/sohail78692/Mood-Music'
    },
];

const Projects = () => {
    return (
        <section id="projects">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Selected Works
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%' }}>
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30, rotateX: 10 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2, type: 'spring' }}
                        viewport={{ once: true }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '2rem',
                            borderRadius: '10px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            transformStyle: 'preserve-3d',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                        whileHover={{
                            y: -10,
                            borderColor: '#64ffda',
                            rotateX: 5,
                            rotateY: 5,
                            boxShadow: '0px 10px 30px -10px rgba(100, 255, 218, 0.3)'
                        }}
                    >
                        <div>
                            <h3 style={{ marginBottom: '0.5rem', transform: 'translateZ(20px)' }}>{project.title}</h3>
                            <p style={{ fontSize: '0.9rem', marginBottom: '1rem', transform: 'translateZ(10px)' }}>{project.description}</p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', transform: 'translateZ(15px)', marginBottom: '1.5rem' }}>
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        style={{
                                            fontSize: '0.8rem',
                                            color: '#64ffda',
                                            background: 'rgba(100, 255, 218, 0.1)',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '20px',
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', transform: 'translateZ(20px)' }}>
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: '#64ffda',
                                    textDecoration: 'none',
                                    border: '1px solid #64ffda',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '5px',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(100, 255, 218, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'transparent';
                                }}
                            >
                                Live Demo
                            </a>
                            <a
                                href={project.repoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                    border: '1px solid rgba(255,255,255,0.5)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '5px',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.borderColor = '#fff';
                                    e.target.style.background = 'rgba(255,255,255,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.borderColor = 'rgba(255,255,255,0.5)';
                                    e.target.style.background = 'transparent';
                                }}
                            >
                                GitHub Repo
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
