import { motion } from 'framer-motion';

const Hero = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
        <section id="hero">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.h1 variants={item}>
                    Creative <br /> Developer
                </motion.h1>
                <motion.p
                    variants={item}
                >
                    Building digital experiences that merge art and technology.
                </motion.p>
                <motion.button
                    variants={item}
                    style={{
                        marginTop: '2rem',
                        padding: '1rem 2rem',
                        fontSize: '1rem',
                        border: '1px solid #fff',
                        color: '#fff',
                        borderRadius: '50px',
                    }}
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: '#fff',
                        color: '#000',
                        boxShadow: '0px 0px 8px rgb(255,255,255)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                        default: { duration: 0.3 }
                    }}
                >
                    View Work
                </motion.button>
            </motion.div>
        </section>
    );
};

export default Hero;
