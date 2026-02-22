import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [textIndex, setTextIndex] = useState(0);
    const words = ["Comfort", "Luxury", "Elegance", "AirSial"];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex(prev => {
                if (prev === words.length - 1) {
                    clearInterval(interval);
                    setTextIndex(words.length - 1);
                    setTimeout(onComplete, 800); // Wait on "AirSial" for extra impact
                    return prev;
                }
                return prev + 1;
            });
        }, 800); // Balanced sequence (3.2s total word time)

        return () => clearInterval(interval);
    }, [onComplete, words.length]);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }} // Smoother exit
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
            <div className="flex flex-col items-center">
                <div className="h-24 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={textIndex}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.5, ease: "easeOut" }} // Smoother text fade
                            className="text-white text-4xl md:text-6xl font-serif tracking-widest uppercase text-center"
                        >
                            {words[textIndex]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "200px" }}
                    transition={{ duration: 3.2, ease: "linear" }} // Synced with total word time
                    className="mt-8 h-0.5 bg-accent"
                />
            </div>
        </motion.div>
    );
};

export default Preloader;
