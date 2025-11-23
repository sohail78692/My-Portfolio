import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" style={{ alignItems: 'flex-start' }}>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    About Me
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    I'm a creative developer with a passion for building immersive digital experiences.
                    I specialize in JavaScript, React, and WebGL, blending technical expertise with
                    an eye for design.
                </motion.p>
                <motion.p
                    style={{ marginTop: '1rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    My journey started with a curiosity for how things work on the web, and it has
                    evolved into a career of crafting pixel-perfect, performant, and accessible
                    applications.
                </motion.p>
            </motion.div>
        </section>
    );
};

export default About;

