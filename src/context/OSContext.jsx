import { createContext, useContext, useState } from 'react';
import Finder from '../apps/Finder';
import Terminal from '../apps/Terminal';
import Safari from '../apps/Safari';
import Mail from '../apps/Mail';
import Photos from '../apps/Photos';

const APP_COMPONENTS = {
    finder: Finder,
    terminal: Terminal,
    safari: Safari,
    mail: Mail,
    photos: Photos,
};

const OSContext = createContext();

export const OSProvider = ({ children }) => {
    const [windows, setWindows] = useState([]);
    const [activeWindowId, setActiveWindowId] = useState(null);
    const [zIndexMap, setZIndexMap] = useState({});

    const focusApp = (appId) => {
        setActiveWindowId(appId);
        setZIndexMap((prev) => {
            const maxZ = Math.max(0, ...Object.values(prev));
            return { ...prev, [appId]: maxZ + 1 };
        });
    };

    const openApp = (appId, title) => {
        const existingWindow = windows.find((w) => w.id === appId);

        if (existingWindow) {
            if (existingWindow.isMinimized) {
                setWindows(windows.map((w) =>
                    w.id === appId ? { ...w, isMinimized: false } : w
                ));
            }
            focusApp(appId);
            return;
        }

        // Cascade new windows
        const offset = windows.length * 30;
        const newWindow = {
            id: appId,
            title,
            component: APP_COMPONENTS[appId],
            isMinimized: false,
            isMaximized: false,
            x: 100 + offset,
            y: 100 + offset,
        };

        setWindows([...windows, newWindow]);
        focusApp(appId);
    };

    const closeApp = (appId) => {
        setWindows(windows.filter((w) => w.id !== appId));
        if (activeWindowId === appId) {
            setActiveWindowId(null);
        }
    };

    const minimizeApp = (appId) => {
        setWindows(
            windows.map((w) =>
                w.id === appId ? { ...w, isMinimized: !w.isMinimized } : w
            )
        );
    };

    const maximizeApp = (appId) => {
        setWindows(
            windows.map((w) =>
                w.id === appId ? { ...w, isMaximized: !w.isMaximized } : w
            )
        );
    };

    const updateWindowPosition = (appId, x, y) => {
        setWindows(
            windows.map((w) =>
                w.id === appId ? { ...w, x, y } : w
            )
        );
    };

    return (
        <OSContext.Provider
            value={{
                windows,
                activeWindowId,
                zIndexMap,
                openApp,
                closeApp,
                focusApp,
                minimizeApp,
                maximizeApp,
                updateWindowPosition,
            }}
        >
            {children}
        </OSContext.Provider>
    );
};

export const useOS = () => useContext(OSContext);
