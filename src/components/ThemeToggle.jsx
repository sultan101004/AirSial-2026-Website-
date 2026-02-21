import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLiteMode } from '../context/LiteModeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const { isLiteMode } = useLiteMode();

    return (
        <div className={`relative flex items-center p-0.5 rounded-full border border-white/20 ml-2 md:ml-4 ${isLiteMode ? 'bg-black/10' : 'bg-white/5 backdrop-blur-md'}`}>
            {/* Sliding "Liquid" Background */}
            <motion.div
                layout
                className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] bg-white/20 rounded-full shadow-inner z-0"
                initial={false}
                animate={{
                    x: theme === 'green' ? '100%' : '0%'
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
                className={`relative z-10 p-1.5 rounded-full transition-colors flex items-center justify-center w-7 h-7 ${theme === 'dark' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                aria-label="Switch to Dark Mode"
            >
                <Moon size={14} />
            </button>

            {/* Light/Green Mode Button (Sun) - Right */}
            <button
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`relative z-10 p-1.5 rounded-full transition-colors flex items-center justify-center w-7 h-7 ${theme === 'green' ? 'text-accent' : 'text-white/50 hover:text-white/80'}`}
                aria-label="Switch to Light Mode"
            >
                <Sun size={14} />
            </button>
        </div>
    );
};

export default ThemeToggle;
