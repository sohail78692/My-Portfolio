import { useState, useEffect } from 'react';

const BatteryStatus = ({ size = 18, color = 'currentColor' }) => {
    const [battery, setBattery] = useState({ level: 1, charging: false });
    const [supported, setSupported] = useState(true);

    useEffect(() => {
        let batteryManager = null;
        let isMounted = true;

        const updateBattery = () => {
            if (batteryManager && isMounted) {
                setBattery({
                    level: batteryManager.level,
                    charging: batteryManager.charging
                });
            }
        };

        const initBattery = async () => {
            if ('getBattery' in navigator) {
                try {
                    const manager = await navigator.getBattery();
                    if (!isMounted) return;

                    batteryManager = manager;
                    updateBattery();

                    manager.addEventListener('levelchange', updateBattery);
                    manager.addEventListener('chargingchange', updateBattery);
                } catch (e) {
                    console.error("Battery status API failed", e);
                    if (isMounted) setSupported(false);
                }
            } else {
                if (isMounted) setSupported(false);
            }
        };

        initBattery();

        return () => {
            isMounted = false;
            if (batteryManager) {
                batteryManager.removeEventListener('levelchange', updateBattery);
                batteryManager.removeEventListener('chargingchange', updateBattery);
            }
        };
    }, []);

    // Calculate fill width (max 18 for the inner rect)
    // The inner battery rect is usually around 14-16px wide in a 24px icon, 
    // but for a custom SVG we can define our own coordinate system.
    // Let's use a 24x24 viewBox for consistency with Lucide.

    // Lucide Battery icon structure:
    // <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
    // <line x1="22" x2="22" y1="11" y2="13" />

    // We will draw the outline and then a fill rect inside.

    const percentage = Math.round(battery.level * 100);
    const fillWidth = Math.max(0, Math.min(12, 12 * battery.level)); // Max width 12 inside the battery

    if (!supported) {
        // Fallback to static icon if not supported
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
                <line x1="22" x2="22" y1="11" y2="13" />
            </svg>
        );
    }

    return (
        <div title={`${percentage}%${battery.charging ? ' - Charging' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>{percentage}%</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {/* Battery Outline */}
                <rect width="16" height="10" x="2" y="7" rx="2" ry="2" stroke={battery.charging ? '#22c55e' : color} />
                <line x1="22" x2="22" y1="11" y2="13" stroke={battery.charging ? '#22c55e' : color} />

                {/* Battery Fill */}
                <rect
                    x="4"
                    y="9"
                    width={fillWidth}
                    height="6"
                    rx="1"
                    fill={battery.charging ? '#22c55e' : color}
                    stroke="none"
                />

                {/* Charging Bolt Overlay (Optional, but let's keep it simple with color for now, or add a small bolt) */}
                {battery.charging && (
                    <path
                        d="M13 3L10 10H14L11 17"
                        stroke="#22c55e"
                        strokeWidth="2"
                        fill="none"
                        transform="scale(0.6) translate(12, -4)"
                    />
                )}
            </svg>
        </div>
    );
};

export default BatteryStatus;
