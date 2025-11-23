import { Search, ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';
import Projects from '../components/Projects'; // Reusing the Projects component

const Safari = () => {
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
            {/* Browser Toolbar */}
            <div style={{
                height: '40px',
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                padding: '0 1rem',
                gap: '1rem',
                borderBottom: '1px solid #ddd'
            }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <ArrowLeft size={16} color="#888" />
                    <ArrowRight size={16} color="#888" />
                    <RotateCw size={16} color="#888" />
                </div>
                <div style={{
                    flex: 1,
                    background: '#fff',
                    borderRadius: '5px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: '#555',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                    <Search size={12} style={{ marginRight: '0.5rem' }} />
                    portfolio.com/projects
                </div>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, overflow: 'auto', background: '#050505' }}>
                <Projects />
            </div>
        </div>
    );
};

export default Safari;
