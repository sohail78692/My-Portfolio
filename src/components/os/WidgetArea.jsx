import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Laptop, Headphones, Keyboard, MousePointer2, Calendar as CalendarIcon } from 'lucide-react';

const WidgetArea = () => {
    // Removed isOpen check to allow AnimatePresence to handle mounting/unmounting

    return (
        <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
                position: 'fixed',
                top: '35px',
                right: '10px',
                width: '340px',
                height: 'calc(100vh - 45px)',
                zIndex: 9998,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '0.5rem',
                overflowY: 'auto',
                scrollbarWidth: 'none' // Hide scrollbar for cleaner look
            }}
        >
            {/* Calendar & Events Widget */}
            <div className="glass" style={{
                borderRadius: '20px',
                padding: '1rem',
                display: 'flex',
                gap: '1rem',
            }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <EventItem title="Website update" time="09:00 - 10:00" color="#ff3b30" />
                    <EventItem title="Meeting" time="14:00 - 15:00" color="#007aff" />
                    <EventItem title="Dinner" time="18:00 - 19:00" color="#ff9500" />
                </div>
                <div style={{ width: '1px', background: '#eee' }}></div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.7rem', color: '#ff3b30', fontWeight: 'bold', marginBottom: '0.5rem' }}>FEBRUARY</div>
                    <MiniCalendar />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                {/* Weather Widget */}
                <div style={{
                    flex: 1,
                    background: 'linear-gradient(to bottom, #60a5fa, #3b82f6)',
                    borderRadius: '20px',
                    padding: '1rem',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}>
                    <div>
                        <div style={{ fontWeight: '600' }}>Nantes</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '300' }}>7°</div>
                    </div>
                    <div>
                        <CloudRain size={24} style={{ marginBottom: '0.5rem' }} />
                        <div style={{ fontSize: '0.7rem', lineHeight: '1.2' }}>Potential disruption due to flood</div>
                    </div>
                </div>

                {/* Analog Clock Widget */}
                <div style={{
                    flex: 1,
                    background: '#fff',
                    borderRadius: '20px',
                    position: 'relative',
                    aspectRatio: '1/1',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}>
                    <AnalogClock />
                </div>
            </div>

            {/* Batteries Widget */}
            <div className="glass" style={{
                borderRadius: '20px',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <BatteryItem icon={Laptop} percent={96} />
                <BatteryItem icon={Headphones} percent={97} />
                <BatteryItem icon={Keyboard} percent={75} />
                <BatteryItem icon={MousePointer2} percent={94} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <button style={{
                    background: 'rgba(0,0,0,0.5)',
                    border: 'none',
                    color: '#fff',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                }}>Edit Widgets</button>
            </div>
        </motion.div>
    );
};

const EventItem = ({ title, time, color }) => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ width: '3px', background: color, borderRadius: '2px' }}></div>
        <div>
            <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>{title}</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{time}</div>
        </div>
    </div>
);

const MiniCalendar = () => {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    // Mock grid for Feb
    const grid = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28]
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', opacity: 0.6 }}>
                {days.map(d => <span key={d}>{d}</span>)}
            </div>
            {grid.map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                    {row.map(d => (
                        <span key={d} style={{
                            width: '18px',
                            height: '18px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: d === 15 ? '#ff3b30' : 'transparent',
                            color: d === 15 ? '#fff' : 'inherit',
                            borderRadius: '50%',
                            fontWeight: d === 15 ? 'bold' : 'normal'
                        }}>{d}</span>
                    ))}
                </div>
            ))}
        </div>
    );
};

const AnalogClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const seconds = time.getSeconds() * 6;
    const minutes = time.getMinutes() * 6 + seconds / 60;
    const hours = (time.getHours() % 12) * 30 + minutes / 12;

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '50%', background: '#fff' }}>
            {/* Clock Face Details could go here */}
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', fontSize: '0.8rem', fontWeight: '600', color: '#000' }}>12</div>
            <div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', fontSize: '0.8rem', fontWeight: '600', color: '#000' }}>6</div>
            <div style={{ position: 'absolute', top: '50%', right: '20%', transform: 'translateY(-50%)', fontSize: '0.8rem', fontWeight: '600', color: '#000' }}>3</div>
            <div style={{ position: 'absolute', top: '50%', left: '20%', transform: 'translateY(-50%)', fontSize: '0.8rem', fontWeight: '600', color: '#000' }}>9</div>

            {/* Hands */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', width: '4px', height: '30%', background: '#000',
                transform: `translate(-50%, -100%) rotate(${hours}deg)`, transformOrigin: 'bottom center', borderRadius: '2px'
            }} />
            <div style={{
                position: 'absolute', top: '50%', left: '50%', width: '2px', height: '40%', background: '#000',
                transform: `translate(-50%, -100%) rotate(${minutes}deg)`, transformOrigin: 'bottom center', borderRadius: '1px'
            }} />
            <div style={{
                position: 'absolute', top: '50%', left: '50%', width: '1px', height: '45%', background: '#ff9500',
                transform: `translate(-50%, -100%) rotate(${seconds}deg)`, transformOrigin: 'bottom center'
            }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '8px', height: '8px', background: '#000', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
        </div>
    );
};

const BatteryItem = ({ icon: Icon, percent }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ position: 'relative', width: '40px', height: '40px' }}>
            <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eee" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray={`${percent}, 100`} />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Icon size={16} color="#000" />
            </div>
        </div>
        <div style={{ fontSize: '0.7rem', fontWeight: '600' }}>{percent}%</div>
    </div>
);

export default WidgetArea;
