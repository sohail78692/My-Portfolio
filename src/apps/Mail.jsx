import { Mail as MailIcon, Star, Trash2, Send } from 'lucide-react';
import Contact from '../components/Contact'; // Reusing Contact component

const Mail = () => {
    return (
        <div style={{ display: 'flex', height: '100%', background: '#fff', color: '#000' }}>
            {/* Sidebar */}
            <div style={{ width: '200px', background: '#f5f5f7', borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1rem', fontWeight: 'bold', color: '#888' }}>Mailboxes</div>
                <div style={{ padding: '0.5rem 1rem', background: '#d1d1d6', borderRadius: '5px', margin: '0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MailIcon size={16} /> Inbox
                </div>
                <div style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Send size={16} /> Sent
                </div>
                <div style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Trash2 size={16} /> Trash
                </div>
            </div>

            {/* Message List */}
            <div style={{ width: '250px', borderRight: '1px solid #ddd', overflow: 'auto' }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
                    <div style={{ fontWeight: 'bold' }}>Apple</div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Welcome to your new Mac</div>
                    <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.2rem' }}>Get started with...</div>
                </div>
            </div>

            {/* Reading Pane (Contact Form) */}
            <div style={{ flex: 1, padding: '2rem', background: '#050505', overflow: 'auto' }}>
                <Contact />
            </div>
        </div>
    );
};

export default Mail;
