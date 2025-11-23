import { motion } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: 'Neon City',
        description: 'A cyberpunk-inspired 3D city explorer built with Three.js.',
        tags: ['React', 'Three.js', 'WebGL'],
    },
    {
        id: 2,
        title: 'E-Commerce Dashboard',
        description: 'A modern, responsive dashboard for managing online stores.',
        tags: ['Next.js', 'Tailwind', 'Chart.js'],
    },
    {
        id: 3,
        title: 'AI Chat Interface',
        description: 'An intuitive chat interface for interacting with LLMs.',
        tags: ['React', 'OpenAI API', 'Framer Motion'],
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
                        }}
                        whileHover={{
                            y: -10,
                            borderColor: '#64ffda',
                            rotateX: 5,
                            rotateY: 5,
                            boxShadow: '0px 10px 30px -10px rgba(100, 255, 218, 0.3)'
                        }}
                    >
                        <h3 style={{ marginBottom: '0.5rem', transform: 'translateZ(20px)' }}>{project.title}</h3>
                        <p style={{ fontSize: '0.9rem', marginBottom: '1rem', transform: 'translateZ(10px)' }}>{project.description}</p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', transform: 'translateZ(15px)' }}>
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
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
