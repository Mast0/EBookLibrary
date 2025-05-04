import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            padding: "6px 12px",
            borderRadius: "8px",
            border: "none",
            background: theme === "light" ? "#333" : "#eee",
            color: theme === "light" ? "#fff" : "#000",
            cursor: "pointer",
            zIndex: 999
        }}>
            {theme === "light" ? "🌙 Dark Theme" : "☀️ Light Theme"}
        </button>
    );
};

export default ThemeToggle