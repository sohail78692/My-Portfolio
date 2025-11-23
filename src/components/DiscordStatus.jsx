import { useState, useEffect } from "react";
import { Music, Gamepad2, Circle, Activity, User } from "lucide-react";

const DiscordStatus = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDark, setIsDark] = useState(true);

    // detect theme
    useEffect(() => {
        const checkTheme = () => {
            setIsDark(!document.documentElement.classList.contains("light"));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    // fetch Discord presence
    useEffect(() => {
        const discordId = import.meta.env.VITE_DISCORD_USER_ID;

        if (!discordId) {
            setError("Discord ID not configured");
            setLoading(false);
            return;
        }

        const fetchStatus = async () => {
            try {
                const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
                const data = await res.json();

                if (data.success) {
                    setStatus(data.data);
                    setError(null);
                } else setError("Failed to fetch status");
            } catch (e) {
                setError("API Error");
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 15000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = () => {
        if (!status) return "#747f8d";
        switch (status.discord_status) {
            case "online":
                return "#43b581";
            case "idle":
                return "#faa61a";
            case "dnd":
                return "#f04747";
            default:
                return "#747f8d";
        }
    };

    const spotify = status?.spotify;
    const activities = status?.activities || [];
    const customStatus = activities.find((a) => a.type === 4);
    const mainActivity = activities.find((a) => a.type !== 4 && a.name !== "Spotify");

    const avatar = status?.discord_user;
    const avatarUrl =
        avatar?.avatar &&
        `https://cdn.discordapp.com/avatars/${avatar.id}/${avatar.avatar}.${
            avatar.avatar.startsWith("a_") ? "gif" : "png"
        }?size=128`;

    // macOS widget background
    const cardStyle = {
        borderRadius: "20px",
        padding: "1.2rem",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        background: isDark
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.05)",
        border: isDark
            ? "1px solid rgba(255,255,255,0.12)"
            : "1px solid rgba(0,0,0,0.12)",
        boxShadow: isDark
            ? "0 4px 18px rgba(0,0,0,0.45)"
            : "0 4px 18px rgba(0,0,0,0.12)",
    };

    if (loading)
        return <div style={{ ...cardStyle, textAlign: "center" }}>Loading Discord status...</div>;

    if (error)
        return <div style={{ ...cardStyle, textAlign: "center", color: "#f04747" }}>Discord status unavailable</div>;

    return (
        <div style={cardStyle}>
            {/* Top Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ position: "relative" }}>
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                border: `3px solid ${getStatusColor()}`,
                                boxShadow: `0 0 10px ${getStatusColor()}60`,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: isDark ? "#333" : "#eee",
                                border: `3px solid ${getStatusColor()}`,
                            }}
                        >
                            <User size={30} />
                        </div>
                    )}

                    <Circle
                        size={18}
                        fill={getStatusColor()}
                        color={getStatusColor()}
                        style={{
                            position: "absolute",
                            bottom: "-3px",
                            right: "-3px",
                            borderRadius: "50%",
                            background: isDark ? "#1e1e1e" : "#fff",
                        }}
                    />
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "700", color: isDark ? "#fff" : "#000", fontSize: "1rem" }}>
                        {avatar?.username}
                        {avatar?.discriminator !== "0" && `#${avatar?.discriminator}`}
                    </div>

                    <div style={{ color: getStatusColor(), fontWeight: "600" }}>{status.discord_status}</div>

                    <div style={{ color: isDark ? "#aaa" : "#666", fontSize: "0.85rem" }}>
                        ID: {avatar?.id}
                    </div>
                </div>

                <Activity size={22} color={isDark ? "#999" : "#555"} />
            </div>

            {/* Custom Status */}
            {customStatus?.state && (
                <div
                    style={{
                        padding: "0.8rem",
                        borderRadius: "14px",
                        background: isDark ? "rgba(88,101,242,0.2)" : "rgba(88,101,242,0.1)",
                        marginBottom: "1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    {customStatus.emoji && <span>{customStatus.emoji.name}</span>}
                    <span style={{ fontStyle: "italic" }}>"{customStatus.state}"</span>
                </div>
            )}

            {/* Spotify */}
            {spotify && (
                <div
                    style={{
                        padding: "1rem",
                        borderRadius: "16px",
                        background: isDark ? "rgba(30,215,96,0.18)" : "rgba(30,215,96,0.1)",
                        marginBottom: "1rem",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Music size={18} color="#1DB954" />
                        <span style={{ color: "#1DB954", fontWeight: "600" }}>Listening on Spotify</span>
                    </div>

                    <div style={{ marginTop: "0.6rem" }}>
                        <div style={{ fontWeight: "700", fontSize: "0.95rem" }}>{spotify.song}</div>
                        <div style={{ color: isDark ? "#ddd" : "#555" }}>{spotify.artist}</div>
                        <div style={{ color: isDark ? "#aaa" : "#777" }}>{spotify.album}</div>
                    </div>
                </div>
            )}

            {/* Main Activity */}
            {mainActivity && (
                <div
                    style={{
                        padding: "1rem",
                        borderRadius: "16px",
                        background: isDark ? "rgba(88,101,242,0.2)" : "rgba(88,101,242,0.1)",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Gamepad2 size={18} color="#5865F2" />
                        <span style={{ color: "#5865F2", fontWeight: "600" }}>
                            {mainActivity.type === 0 && "Playing"}
                            {mainActivity.type === 1 && "Streaming"}
                            {mainActivity.type === 2 && "Listening"}
                            {mainActivity.type === 3 && "Watching"}
                            {mainActivity.type === 5 && "Competing"}
                        </span>
                    </div>

                    <div style={{ marginTop: "0.6rem", fontWeight: "700" }}>{mainActivity.name}</div>
                    {mainActivity.details && <div style={{ color: isDark ? "#ccc" : "#555" }}>{mainActivity.details}</div>}
                    {mainActivity.state && <div style={{ color: isDark ? "#aaa" : "#666" }}>{mainActivity.state}</div>}
                </div>
            )}

            {/* Nothing active */}
            {!spotify && !mainActivity && !customStatus && (
                <div
                    style={{
                        padding: "1rem",
                        textAlign: "center",
                        borderRadius: "14px",
                        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                        color: isDark ? "#999" : "#666",
                        marginTop: "0.5rem",
                    }}
                >
                    No current activity
                </div>
            )}
        </div>
    );
};

export default DiscordStatus;
