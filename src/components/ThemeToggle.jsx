import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLiteMode } from '../context/LiteModeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const { isLiteMode } = useLiteMode();

    return (
        <div className={`relative flex items-center p-1 rounded-full border border-white/20 ml-4 ${isLiteMode ? 'bg-black/10' : 'bg-white/5 backdrop-blur-md'}`}>
            {/* Sliding "Liquid" Background */}
            <motion.div
                layout
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/20 rounded-full shadow-inner z-0"
                initial={false}
                animate={{
                    x: theme === 'green' ? '100%' : '0%' // 'green' is Light mode (Sun), which is on the Right or Left? Let's clarify.
                    // Let's assume Left = Moon (Dark), Right = Sun (Light/Green)
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }}
            />

            {/* Dark Mode Button (Moon) - Left */}
            <button
                onClick={() => theme === 'green' && toggleTheme()}
                className={`relative z-10 p-2 rounded-full transition-colors flex items-center justify-center w-10 h-10 ${theme === 'dark' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                aria-label="Switch to Dark Mode"
            >
                <Moon size={18} />
            </button>

            {/* Light/Green Mode Button (Sun) - Right */}
            <button
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`relative z-10 p-2 rounded-full transition-colors flex items-center justify-center w-10 h-10 ${theme === 'green' ? 'text-accent' : 'text-white/50 hover:text-white/80'}`}
                aria-label="Switch to Light Mode"
            >
                <Sun size={18} />
            </button>
        </div>
    );
};

export default ThemeToggle;
