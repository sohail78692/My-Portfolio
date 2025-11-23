import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormState({ name: '', email: '', message: '' });
        }, 3000);
    };

    const inputVariants = {
        focus: { scale: 1.02, borderColor: '#64ffda', boxShadow: '0px 0px 8px rgba(100, 255, 218, 0.5)' }
    };

    return (
        <section id="contact">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                style={{ width: '100%', maxWidth: '600px' }}
            >
                <h2>Get In Touch</h2>
                <p style={{ marginBottom: '2rem' }}>
                    Have a project in mind or just want to say hi? I'm always open to new opportunities.
                </p>

                <AnimatePresence mode="wait">
                    {isSubmitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            style={{
                                padding: '2rem',
                                background: 'rgba(100, 255, 218, 0.1)',
                                borderRadius: '10px',
                                textAlign: 'center',
                                border: '1px solid #64ffda'
                            }}
                        >
                            <h3 style={{ color: '#64ffda' }}>Message Sent!</h3>
                            <p>Thanks for reaching out. I'll get back to you soon.</p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                        >
                            <motion.input
                                variants={inputVariants}
                                whileFocus="focus"
                                type="text"
                                placeholder="Name"
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                style={{
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '5px',
                                    color: '#fff',
                                    outline: 'none',
                                }}
                                required
                            />
                            <motion.input
                                variants={inputVariants}
                                whileFocus="focus"
                                type="email"
                                placeholder="Email"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                style={{
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '5px',
                                    color: '#fff',
                                    outline: 'none',
                                }}
                                required
                            />
                            <motion.textarea
                                variants={inputVariants}
                                whileFocus="focus"
                                placeholder="Message"
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                rows="5"
                                style={{
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '5px',
                                    color: '#fff',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                }}
                                required
                            />
                            <motion.button
                                type="submit"
                                style={{
                                    padding: '1rem',
                                    background: '#64ffda',
                                    color: '#050505',
                                    fontWeight: 'bold',
                                    borderRadius: '5px',
                                    marginTop: '1rem',
                                }}
                                whileHover={{ scale: 1.02, opacity: 0.9 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Send Message
                            </motion.button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default Contact;
