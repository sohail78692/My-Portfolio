import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarWidget = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(!document.documentElement.classList.contains("light"));
        };
        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        return { daysInMonth, startingDayOfWeek };
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const today = new Date();

    const isCurrentMonth =
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

    const monthNames = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
    ];
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

    const previousMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
    };

    const nextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
    };

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(<div key={`empty-${i}`} style={{ padding: "0.3rem" }} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = isCurrentMonth && day === today.getDate();

        days.push(
            <div
                key={day}
                style={{
                    padding: "0.28rem",
                    textAlign: "center",
                    fontSize: "0.65rem",
                    fontWeight: isToday ? "700" : "500",
                    color: isToday ? "#fff" : isDark ? "#ddd" : "#333",
                    background: isToday ? "#ff6b6b" : "transparent",
                    borderRadius: "50%",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    aspectRatio: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                    if (!isToday)
                        e.target.style.background = isDark
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                    if (!isToday) e.target.style.background = "transparent";
                }}
            >
                {day}
            </div>
        );
    }

    return (
        <div
            style={{
                background: isDark
                    ? "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))"
                    : "linear-gradient(135deg, rgba(0,0,0,0.08), rgba(0,0,0,0.03))",
                backdropFilter: "blur(20px)",
                border: `1px solid ${
                    isDark
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(0,0,0,0.15)"
                }`,
                borderRadius: "16px",
                padding: "0.8rem",
                width: "100%",
                maxWidth: "190px", // SAME AS WORLD CLOCK
                boxShadow: isDark
                    ? "0 8px 32px rgba(0,0,0,0.4)"
                    : "0 8px 32px rgba(0,0,0,0.12)",
            }}
        >
            {/* HEADER */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: "0.6rem",
                    borderBottom: `1px solid ${
                        isDark
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.1)"
                    }`,
                }}
            >
                <button
                    onClick={previousMonth}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: isDark ? "#fff" : "#000",
                        cursor: "pointer",
                        padding: "0.25rem",
                        borderRadius: "6px",
                    }}
                >
                    <ChevronLeft size={16} />
                </button>

                <div style={{ textAlign: "center", flex: 1 }}>
                    <div
                        style={{
                            fontSize: "0.8rem",
                            fontWeight: "700",
                            color: "#ff6b6b",
                        }}
                    >
                        {monthNames[currentDate.getMonth()]}
                    </div>
                    <div
                        style={{
                            fontSize: "0.6rem",
                            color: isDark ? "#aaa" : "#666",
                        }}
                    >
                        {currentDate.getFullYear()}
                    </div>
                </div>

                <button
                    onClick={nextMonth}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: isDark ? "#fff" : "#000",
                        cursor: "pointer",
                        padding: "0.25rem",
                        borderRadius: "6px",
                    }}
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* DAY LABELS */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "0.15rem",
                    marginTop: "0.4rem",
                    marginBottom: "0.4rem",
                }}
            >
                {dayNames.map((day, i) => (
                    <div
                        key={i}
                        style={{
                            textAlign: "center",
                            fontSize: "0.55rem",
                            fontWeight: "600",
                            color: isDark ? "#888" : "#777",
                        }}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* DAYS */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "0.12rem",
                }}
            >
                {days}
            </div>
        </div>
    );
};

export default CalendarWidget;
