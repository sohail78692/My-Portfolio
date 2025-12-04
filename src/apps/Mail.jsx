import { Mail as MailIcon, Star, Trash2, Send, Menu, ArrowLeft, Inbox } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Mail = () => {
    const [isDark, setIsDark] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');
    const [containerWidth, setContainerWidth] = useState(1000);
    const containerRef = useRef(null);
    const [activeView, setActiveView] = useState('compose'); // 'sidebar', 'list', 'compose'
    const [activeMailbox, setActiveMailbox] = useState('inbox'); // 'inbox', 'sent', 'trash'

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(!document.documentElement.classList.contains('light'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        // Resize Observer for responsive layout
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
            resizeObserver.disconnect();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all fields');
            return;
        }

        setStatus('sending');

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    to_name: "Portfolio Owner",
                    from_email: formData.email,
                    email: formData.email,
                    name: formData.name,
                    user_name: formData.name,
                    user_email: formData.email,
                    reply_to: formData.email,
                    subject: "New Message from Portfolio",
                    message: formData.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const isSmall = containerWidth < 600;
    const isMedium = containerWidth < 800;

    const getSidebarItemStyle = (mailbox) => ({
        padding: '0.7rem 1rem',
        background: activeMailbox === mailbox ? (isDark ? 'rgba(255,255,255,0.1)' : '#d1d1d6') : 'transparent',
        borderRadius: '8px',
        margin: '0 0.5rem 0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        cursor: 'pointer',
        color: isDark ? '#fff' : '#000',
        transition: 'background 0.2s'
    });

    return (
        <div ref={containerRef} style={{
            display: 'flex',
            height: '100%',
            background: isDark ? '#1a1a1a' : '#ffffff',
            color: isDark ? '#fff' : '#000',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Sidebar */}
            <div style={{
                width: isSmall ? '100%' : '200px',
                background: isDark ? '#252525' : '#f5f5f7',
                borderRight: `1px solid ${isDark ? '#3a3a3a' : '#ddd'}`,
                display: isSmall && activeView !== 'sidebar' ? 'none' : 'flex',
                flexDirection: 'column',
                position: isSmall ? 'absolute' : 'relative',
                height: '100%',
                zIndex: 2
            }}>
                <div style={{
                    padding: '1rem',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    color: isDark ? '#888' : '#666',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <span>Mailboxes</span>
                    {isSmall && (
                        <button
                            onClick={() => setActiveView('compose')}
                            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div
                    style={getSidebarItemStyle('inbox')}
                    onClick={() => {
                        setActiveMailbox('inbox');
                        if (isSmall) setActiveView('compose');
                    }}
                >
                    <Inbox size={16} /> Inbox
                </div>

                <div
                    style={getSidebarItemStyle('sent')}
                    onClick={() => {
                        setActiveMailbox('sent');
                        if (isSmall) setActiveView('compose');
                    }}
                >
                    <Send size={16} /> Sent
                </div>

                <div
                    style={getSidebarItemStyle('trash')}
                    onClick={() => {
                        setActiveMailbox('trash');
                        if (isSmall) setActiveView('compose');
                    }}
                >
                    <Trash2 size={16} /> Trash
                </div>
            </div>

            {/* Message List */}
            <div style={{
                width: isSmall ? '100%' : '280px',
                borderRight: `1px solid ${isDark ? '#3a3a3a' : '#ddd'}`,
                overflow: 'auto',
                background: isDark ? '#1f1f1f' : '#fafafa',
                display: isMedium && !isSmall ? 'none' : (isSmall && activeView !== 'list' ? 'none' : 'block')
            }}>
                {activeMailbox === 'inbox' ? (
                    <div style={{
                        padding: '1.2rem',
                        borderBottom: `1px solid ${isDark ? '#3a3a3a' : '#eee'}`,
                        cursor: 'pointer',
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                    }} onClick={() => isSmall && setActiveView('compose')}>
                        <div style={{ fontWeight: '600', marginBottom: '0.3rem' }}>Portfolio Inquiry</div>
                        <div style={{ fontSize: '0.85rem', color: isDark ? '#aaa' : '#666', marginBottom: '0.3rem' }}>
                            Get in touch with me
                        </div>
                        <div style={{ fontSize: '0.75rem', color: isDark ? '#888' : '#999' }}>
                            Use the form to send a message...
                        </div>
                    </div>
                ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: isDark ? '#666' : '#999' }}>
                        No messages
                    </div>
                )}
            </div>

            {/* Reading Pane (Contact Form) */}
            <div style={{
                flex: 1,
                padding: isSmall ? '1.5rem 1rem' : '3rem 2rem',
                background: isDark ? '#0f0f0f' : '#fafafa',
                overflow: 'auto',
                display: isSmall && activeView !== 'compose' ? 'none' : 'block'
            }}>
                {isSmall && (
                    <button
                        onClick={() => setActiveView('sidebar')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: isDark ? '#fff' : '#000',
                            cursor: 'pointer',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Menu size={20} /> Menu
                    </button>
                )}

                {activeMailbox === 'inbox' ? (
                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <h2 style={{
                            fontSize: isSmall ? '1.5rem' : '2rem',
                            marginBottom: '1rem',
                            color: isDark ? '#fff' : '#000',
                            lineHeight: 1.2
                        }}>
                            Send Me a Message
                        </h2>
                        <p style={{
                            marginBottom: '2rem',
                            color: isDark ? '#aaa' : '#666',
                            lineHeight: '1.6',
                            fontSize: isSmall ? '0.9rem' : '1rem'
                        }}>
                            I'd love to hear from you! Whether you have a question, project idea, or just want to connect.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isSmall ? '1rem' : '1.5rem' }}>
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
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
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
                                    required
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
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    required
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
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={isSmall ? "4" : "6"}
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
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                style={{
                                    padding: '1rem 2rem',
                                    background: status === 'success' ? '#34c759' : status === 'error' ? '#ff3b30' : '#007aff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: status === 'sending' ? 'wait' : 'pointer',
                                    transition: 'all 0.2s',
                                    opacity: status === 'sending' ? 0.7 : 1
                                }}
                            >
                                {status === 'sending' ? 'Sending...' :
                                    status === 'success' ? 'Message Sent!' :
                                        status === 'error' ? 'Failed to Send' : 'Send Message'}
                            </button>
                        </form>

                        {/* Contact Links Section */}
                        <div style={{
                            marginTop: '3rem',
                            paddingTop: '2rem',
                            borderTop: `1px solid ${isDark ? '#3a3a3a' : '#ddd'}`
                        }}>
                            <h3 style={{
                                fontSize: isSmall ? '1.2rem' : '1.5rem',
                                marginBottom: '1rem',
                                color: isDark ? '#fff' : '#000',
                                textAlign: 'center'
                            }}>
                                Connect With Me
                            </h3>
                            <p style={{
                                marginBottom: '1.5rem',
                                color: isDark ? '#aaa' : '#666',
                                textAlign: 'center',
                                fontSize: isSmall ? '0.85rem' : '0.95rem'
                            }}>
                                Let's stay connected! Find me on these platforms
                            </p>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isSmall ? '1fr' : 'repeat(2, 1fr)',
                                gap: '1rem'
                            }}>
                                {/* Gmail */}
                                <a
                                    href="mailto:sohail786akh@gmail.com"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        background: isDark ? 'rgba(234, 67, 53, 0.1)' : 'rgba(234, 67, 53, 0.05)',
                                        border: `1px solid ${isDark ? 'rgba(234, 67, 53, 0.3)' : 'rgba(234, 67, 53, 0.2)'}`,
                                        borderRadius: '12px',
                                        textDecoration: 'none',
                                        color: isDark ? '#fff' : '#000',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(234, 67, 53, 0.2)';
                                        e.currentTarget.style.background = isDark ? 'rgba(234, 67, 53, 0.15)' : 'rgba(234, 67, 53, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.background = isDark ? 'rgba(234, 67, 53, 0.1)' : 'rgba(234, 67, 53, 0.05)';
                                    }}
                                >
                                    <span style={{ fontSize: '2rem' }}>📧</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600', marginBottom: '0.2rem' }}>Email</div>
                                        <div style={{ fontSize: '0.85rem', color: isDark ? '#aaa' : '#666' }}>sohail786akh@gmail.com</div>
                                    </div>
                                </a>

                                {/* GitHub */}
                                <a
                                    href="https://github.com/sohail78692"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        background: isDark ? 'rgba(88, 166, 255, 0.1)' : 'rgba(88, 166, 255, 0.05)',
                                        border: `1px solid ${isDark ? 'rgba(88, 166, 255, 0.3)' : 'rgba(88, 166, 255, 0.2)'}`,
                                        borderRadius: '12px',
                                        textDecoration: 'none',
                                        color: isDark ? '#fff' : '#000',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(88, 166, 255, 0.2)';
                                        e.currentTarget.style.background = isDark ? 'rgba(88, 166, 255, 0.15)' : 'rgba(88, 166, 255, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.background = isDark ? 'rgba(88, 166, 255, 0.1)' : 'rgba(88, 166, 255, 0.05)';
                                    }}
                                >
                                    <span style={{ fontSize: '2rem' }}>💻</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600', marginBottom: '0.2rem' }}>GitHub</div>
                                        <div style={{ fontSize: '0.85rem', color: isDark ? '#aaa' : '#666' }}>@sohail78692</div>
                                    </div>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href="https://www.linkedin.com/in/sohail-akhtar-49229032a/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        background: isDark ? 'rgba(10, 102, 194, 0.1)' : 'rgba(10, 102, 194, 0.05)',
                                        border: `1px solid ${isDark ? 'rgba(10, 102, 194, 0.3)' : 'rgba(10, 102, 194, 0.2)'}`,
                                        borderRadius: '12px',
                                        textDecoration: 'none',
                                        color: isDark ? '#fff' : '#000',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(10, 102, 194, 0.2)';
                                        e.currentTarget.style.background = isDark ? 'rgba(10, 102, 194, 0.15)' : 'rgba(10, 102, 194, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.background = isDark ? 'rgba(10, 102, 194, 0.1)' : 'rgba(10, 102, 194, 0.05)';
                                    }}
                                >
                                    <span style={{ fontSize: '2rem' }}>💼</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600', marginBottom: '0.2rem' }}>LinkedIn</div>
                                        <div style={{ fontSize: '0.85rem', color: isDark ? '#aaa' : '#666' }}>Sohail Akhtar</div>
                                    </div>
                                </a>

                                {/* Twitter */}
                                <a
                                    href="https://twitter.com/sohail786akh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        background: isDark ? 'rgba(29, 161, 242, 0.1)' : 'rgba(29, 161, 242, 0.05)',
                                        border: `1px solid ${isDark ? 'rgba(29, 161, 242, 0.3)' : 'rgba(29, 161, 242, 0.2)'}`,
                                        borderRadius: '12px',
                                        textDecoration: 'none',
                                        color: isDark ? '#fff' : '#000',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(29, 161, 242, 0.2)';
                                        e.currentTarget.style.background = isDark ? 'rgba(29, 161, 242, 0.15)' : 'rgba(29, 161, 242, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.background = isDark ? 'rgba(29, 161, 242, 0.1)' : 'rgba(29, 161, 242, 0.05)';
                                    }}
                                >
                                    <span style={{ fontSize: '2rem' }}>🐦</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600', marginBottom: '0.2rem' }}>Twitter</div>
                                        <div style={{ fontSize: '0.85rem', color: isDark ? '#aaa' : '#666' }}>@sohail786akh</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: isDark ? '#666' : '#999'
                    }}>
                        {activeMailbox === 'sent' ? <Send size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} /> : <Trash2 size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />}
                        <h3>{activeMailbox === 'sent' ? 'No Sent Messages' : 'Trash is Empty'}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mail;
