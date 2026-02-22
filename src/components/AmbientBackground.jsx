import React from 'react';
import { useLiteMode } from '../context/LiteModeContext';
import { motion } from 'framer-motion';

const AmbientBackground = () => {
    const { isLiteMode } = useLiteMode();
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const particles = React.useMemo(() => {
        const count = isMobile ? 2 : (isLiteMode ? 4 : 12); // Further reduced for performance
        return [...Array(count)].map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 10 + 20, // Slower, more elegant
            delay: Math.random() * 5
        }));
    }, [isLiteMode, isMobile]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-primary transition-colors duration-500">
            {/* Background Effects */}
            {(isLiteMode || isMobile) ? (
                /* Mobile/Lite Mode: Static subtle gradient (Ultra-Performance) */
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

            {/* Floating Particles (Stardust) - Reduced Count on mobile */}
            <div className="absolute inset-0 opacity-20">
                {particles.map((particle, i) => ( // Minimal particles for mobile
                    <motion.div
                        key={i}
                        initial={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                        }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: particle.delay
                        }}
                        className={`absolute w-1 h-1 bg-white rounded-full will-change-transform ${isLiteMode ? '' : 'blur-sm'}`} // Reduced blur for performance
                    />
                ))}
            </div>

            {/* Noise Overlay for Texture - Optimized opacity */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
    );
};

export default AmbientBackground;
