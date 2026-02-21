import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const urlTheme = params.get('theme');
        return urlTheme === 'green' || urlTheme === 'light' ? 'green' : 'dark';
    });

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'green' : 'dark'));
    };

    useEffect(() => {
        const root = window.document.documentElement;
        // Remove previous class
        root.classList.remove('theme-green', 'theme-dark');
        // Add new class
        root.classList.add(`theme-${theme}`);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
