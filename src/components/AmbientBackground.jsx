import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLiteMode } from '../context/LiteModeContext';
import { motion } from 'framer-motion';

const AmbientBackground = () => {
    const { theme } = useTheme();
    const { isLiteMode } = useLiteMode();
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-primary transition-colors duration-500">
            {/* Background Effects */}
            {isLiteMode ? (
                /* Lite Mode: Static subtle gradient (Premium & Minimalist) */
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-blue-900/5" />
            ) : (
                /* High-End Mode: Animated Orbs */
                <>
                    <motion.div
                        animate={{
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-accent/5 rounded-full blur-[80px] will-change-transform"
                    />
                    <motion.div
                        animate={{
                            x: [0, -50, 0],
                            y: [0, -30, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/5 rounded-full blur-[100px] will-change-transform"
                    />
                </>
            )}

            {/* Floating Particles (Stardust) - Reduced Count */}
            <div className="absolute inset-0 opacity-20">
                {[...Array(isLiteMode ? 5 : 20)].map((_, i) => ( // Reduced from 20 to 8, now dynamic
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        animate={{
                            y: [0, -50],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 15,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                        className={`absolute w-1 h-1 bg-white rounded-full will-change-transform ${isLiteMode ? '' : 'blur-xl'}`}
                    />
                ))}
            </div>

            {/* Noise Overlay for Texture - Optimized opacity */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
    );
};

export default AmbientBackground;
