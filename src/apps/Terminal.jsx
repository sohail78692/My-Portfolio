import { useState, useRef, useEffect } from 'react';

const Terminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'output', content: 'Welcome to Portfolio OS v1.0.0' },
        { type: 'output', content: 'Type "help" to see available commands.' },
    ]);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
    }, [history]);

    const handleCommand = (cmd) => {
        const newHistory = [...history, { type: 'input', content: cmd }];

        switch (cmd.toLowerCase().trim()) {
            case 'help':
                newHistory.push({ type: 'output', content: 'Available commands: help, about, projects, clear, contact' });
                break;
            case 'about':
                newHistory.push({ type: 'output', content: 'I am a creative developer passionate about building immersive web experiences.' });
                break;
            case 'projects':
                newHistory.push({ type: 'output', content: 'Check out the Safari app to see my visual portfolio.' });
                break;
            case 'contact':
                newHistory.push({ type: 'output', content: 'Open the Mail app to send me a message.' });
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            default:
                newHistory.push({ type: 'output', content: `Command not found: ${cmd}` });
        }

        setHistory(newHistory);
        setInput('');
    };

    return (
        <div
            style={{
                height: '100%',
                background: '#1e1e1e',
                color: '#0f0',
                fontFamily: 'monospace',
                padding: '1rem',
                overflowY: 'auto'
            }}
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((line, i) => (
                <div key={i} style={{ marginBottom: '0.5rem', color: line.type === 'input' ? '#fff' : '#0f0' }}>
                    {line.type === 'input' ? '> ' : ''}{line.content}
                </div>
            ))}
            <div style={{ display: 'flex' }}>
                <span style={{ color: '#fff', marginRight: '0.5rem' }}>{'>'}</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontFamily: 'monospace',
                        flex: 1,
                        outline: 'none'
                    }}
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
};

export default Terminal;
