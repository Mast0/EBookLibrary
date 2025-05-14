import { useTheme } from "../contexts/ThemeContext";
import { Lightbulb } from "@theme-toggles/react";
import '@theme-toggles/react/css/Lightbulb.css';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Lightbulb
            duration={750}
            toggled={theme === "dark"}
            onToggle={toggleTheme} 
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}  
            style={{
                fontSize: "3rem",
                background: "transperent",
                border: "none",
                outline: "none",
                padding: "4px",
                cursor: "pointer",
            }}
            className="theme-toggle-btn"
        />
    );
};

export default ThemeToggle