import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const WorldClockWidget = () => {
    const [times, setTimes] = useState({});
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

    const timeZones = [
        { name: 'SF', zone: 'America/Los_Angeles', color: '#ffd93d' },
        { name: 'NY', zone: 'America/New_York', color: '#6bcf7f' },
        { name: 'LON', zone: 'Europe/London', color: '#ff6b9d' },
        { name: 'MUM', zone: 'Asia/Kolkata', color: '#4ecdc4' }
    ];

    useEffect(() => {
        const updateTimes = () => {
            const newTimes = {};
            timeZones.forEach(tz => {
                const time = new Date().toLocaleTimeString('en-US', {
                    timeZone: tz.zone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });
                newTimes[tz.name] = time;
            });
            setTimes(newTimes);
        };
        updateTimes();
        const interval = setInterval(updateTimes, 1000);
        return () => clearInterval(interval);
    }, []);

    const getClockHands = (time) => {
        if (!time) return { hour: 0, minute: 0, second: 0 };
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return {
            hour: ((hours % 12) * 30 + minutes * 0.5) - 90,
            minute: (minutes * 6 + seconds * 0.1) - 90,
            second: (seconds * 6) - 90
        };
    };

    return (
        <div style={{
            background: isDark
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)'
                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.03) 100%)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'}`,
            borderRadius: '16px',
            padding: '0.8rem',
            width: '100%',
            maxWidth: '190px',
            boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.4)' : '0 8px 32px rgba(0, 0, 0, 0.15)'
        }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem',
                paddingBottom: '0.6rem', borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
            }}>
                <Clock size={16} color={isDark ? '#fff' : '#000'} />
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: isDark ? '#fff' : '#000' }}>
                    World Clock
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
                {timeZones.map((tz) => {
                    const angles = getClockHands(times[tz.name]);
                    const isDarkClock = tz.name === 'SF' || tz.name === 'LON';

                    return (
                        <div key={tz.name} style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '65px', height: '65px', borderRadius: '50%',
                                background: isDarkClock
                                    ? 'linear-gradient(135deg, #2d3436 0%, #1e272e 100%)'
                                    : 'linear-gradient(135deg, #f5f6fa 0%, #dfe4ea 100%)',
                                position: 'relative', margin: '0 auto 0.4rem',
                                boxShadow: isDark
                                    ? '0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.1)'
                                    : '0 4px 12px rgba(0,0,0,0.15), inset 0 2px 4px rgba(0,0,0,0.05)',
                                border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                            }}>
                                {[12, 3, 6, 9].map((num, i) => (
                                    <div key={num} style={{
                                        position: 'absolute', fontSize: '0.55rem', fontWeight: '600',
                                        color: isDarkClock ? '#fff' : '#2d3436',
                                        ...(i === 0 && { top: '6%', left: '50%', transform: 'translateX(-50%)' }),
                                        ...(i === 1 && { right: '6%', top: '50%', transform: 'translateY(-50%)' }),
                                        ...(i === 2 && { bottom: '6%', left: '50%', transform: 'translateX(-50%)' }),
                                        ...(i === 3 && { left: '6%', top: '50%', transform: 'translateY(-50%)' })
                                    }}>
                                        {num}
                                    </div>
                                ))}
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%', width: '5px', height: '5px',
                                    borderRadius: '50%', background: tz.color, transform: 'translate(-50%, -50%)',
                                    zIndex: 3, boxShadow: `0 0 6px ${tz.color}`
                                }} />
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%', width: '28%', height: '2.5px',
                                    background: tz.color, transformOrigin: 'left center',
                                    transform: `translate(0, -50%) rotate(${angles.hour}deg)`, borderRadius: '2px',
                                    transition: 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                    boxShadow: `0 0 4px ${tz.color}80`
                                }} />
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%', width: '38%', height: '1.5px',
                                    background: tz.color, transformOrigin: 'left center',
                                    transform: `translate(0, -50%) rotate(${angles.minute}deg)`, borderRadius: '2px',
                                    transition: 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)', opacity: 0.9
                                }} />
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%', width: '42%', height: '1px',
                                    background: '#ff6b6b', transformOrigin: 'left center',
                                    transform: `translate(0, -50%) rotate(${angles.second}deg)`,
                                    transition: 'transform 0.1s linear'
                                }} />
                            </div>
                            <div style={{ fontSize: '0.7rem', fontWeight: '600', color: tz.color, marginBottom: '0.15rem' }}>
                                {tz.name}
                            </div>
                            <div style={{ fontSize: '0.6rem', color: isDark ? '#aaa' : '#666', fontFamily: 'monospace' }}>
                                {times[tz.name] || '--:--:--'}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WorldClockWidget;
