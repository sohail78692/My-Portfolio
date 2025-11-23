import { Mail as MailIcon, Star, Trash2, Send } from 'lucide-react';
import { useState, useEffect } from 'react';

const Mail = () => {
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
            display: 'flex',
            height: '100%',
            background: isDark ? '#1a1a1a' : '#ffffff',
            color: isDark ? '#fff' : '#000'
        }}>
            {/* Sidebar */}
            <div style={{
                width: '200px',
                background: isDark ? '#252525' : '#f5f5f7',
                borderRight: `1px solid ${isDark ? '#3a3a3a' : '#ddd'}`,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    padding: '1rem',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    color: isDark ? '#888' : '#666',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    Mailboxes
                </div>
                <div style={{
                    padding: '0.7rem 1rem',
                    background: isDark ? 'rgba(255,255,255,0.1)' : '#d1d1d6',
                    borderRadius: '8px',
                    margin: '0 0.5rem 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                    cursor: 'pointer'
                }}>
                    <MailIcon size={16} /> Inbox
                </div>
                <div style={{
                    padding: '0.7rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                    cursor: 'pointer',
                    margin: '0 0.5rem 0.5rem',
                    borderRadius: '8px'
                }}>
                    <Send size={16} /> Sent
                </div>
                <div style={{
                    padding: '0.7rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                    cursor: 'pointer',
                    margin: '0 0.5rem',
                    borderRadius: '8px'
                }}>
                    <Trash2 size={16} /> Trash
                </div>
            </div>

            {/* Message List */}
            <div style={{
                width: '280px',
                borderRight: `1px solid ${isDark ? '#3a3a3a' : '#ddd'}`,
                overflow: 'auto',
                background: isDark ? '#1f1f1f' : '#fafafa'
            }}>
                <div style={{
                    padding: '1.2rem',
                    borderBottom: `1px solid ${isDark ? '#3a3a3a' : '#eee'}`,
                    cursor: 'pointer'
                }}>
                    <div style={{ fontWeight: '600', marginBottom: '0.3rem' }}>Portfolio Inquiry</div>
                    <div style={{ fontSize: '0.85rem', color: isDark ? '#aaa' : '#666', marginBottom: '0.3rem' }}>
                        Get in touch with me
                    </div>
                    <div style={{ fontSize: '0.75rem', color: isDark ? '#888' : '#999' }}>
                        Use the form to send a message...
                    </div>
                </div>
            </div>

            {/* Reading Pane (Contact Form) */}
            <div style={{
                flex: 1,
                padding: '3rem 2rem',
                background: isDark ? '#0f0f0f' : '#fafafa',
                overflow: 'auto'
            }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '2rem',
                        marginBottom: '1rem',
                        color: isDark ? '#fff' : '#000'
                    }}>
                        Send Me a Message
                    </h2>
                    <p style={{
                        marginBottom: '2rem',
                        color: isDark ? '#aaa' : '#666',
                        lineHeight: '1.6'
                    }}>
                        I'd love to hear from you! Whether you have a question, project idea, or just want to connect.
                    </p>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '500',
                                fontSize: '0.9rem'
                            }}>
                                Name
                            </label>
                            <input
                                type="text"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    border: `1px solid ${isDark ? '#3a3a3a' : '#ddd'}`,
                                    background: isDark ? '#1a1a1a' : '#fff',
                                    color: isDark ? '#fff' : '#000',
                                    fontSize: '0.95rem'
                                }}
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '500',
                                fontSize: '0.9rem'
                            }}>
                                Email
                            </label>
                            <input
                                type="email"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    border: `1px solid ${isDark ? '#3a3a3a' : '#ddd'}`,
                                    background: isDark ? '#1a1a1a' : '#fff',
                                    color: isDark ? '#fff' : '#000',
                                    fontSize: '0.95rem'
                                }}
                                placeholder="your.email@example.com"
                            />
                        </div>
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '500',
                                fontSize: '0.9rem'
                            }}>
                                Message
                            </label>
                            <textarea
                                rows="6"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    border: `1px solid ${isDark ? '#3a3a3a' : '#ddd'}`,
                                    background: isDark ? '#1a1a1a' : '#fff',
                                    color: isDark ? '#fff' : '#000',
                                    fontSize: '0.95rem',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                                placeholder="Your message here..."
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                padding: '1rem 2rem',
                                background: '#007aff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Mail;
