import React from "react";

const ThemeContext = React.createContext();

export function useThemeManager() {
    return React.useContext(ThemeContext);
}

export default function ThemeManager({ children }) {
    const [mode, setMode] = React.useState(
        localStorage.getItem("mode") || "day"
    );
    const [theme, setTheme] = React.useState(
        localStorage.getItem("theme") || "big-sur"
    );

    const ALL_THEMES = React.useMemo(() => {
        return ["big-sur", "mojave", "catalina", "sierras", "hallstatt"];
    }, []);

    const forceUpdate = useForceUpdate();

    function useForceUpdate() {
        const [, setstate] = React.useState(false);
        return () => {
            setstate((prev) => !prev);
        };
    }

    const update = () => {
        if (mode === "night") {
            localStorage.setItem("mode", "day");
        } else {
            localStorage.setItem("mode", "night");
        }
        forceUpdate();
    };

    React.useEffect(() => {
        let validLocalTheme = false;
        // remove any theme or mode strings not included in the functionality
        ALL_THEMES.forEach((validTheme) => {
            if (localStorage.getItem("theme") === validTheme) {
                validLocalTheme = true;
                return;
            }
        });
        if (!validLocalTheme) {
            localStorage.setItem("theme", "big-sur");
        }
        const currMode = localStorage.getItem("mode");
        if (currMode !== "day" && currMode !== "night") {
            localStorage.setItem("mode", "night");
        }
    }, [ALL_THEMES]);

    function toggleMode() {
        setMode((prevMode) => {
            return prevMode === "day" ? "night" : "day";
        });
        update();
    }

    const updateTheme = (theme) => {
        setTheme(theme);
        for (let i = 0; i < ALL_THEMES.length; i++) {
            if (theme === ALL_THEMES[i]) {
                localStorage.setItem("theme", theme);
                return;
            }
        }
    };

    const value = {
        toggleMode,
        mode,
        theme,
        updateTheme,
        forceUpdate,
        ALL_THEMES,
    };
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}
