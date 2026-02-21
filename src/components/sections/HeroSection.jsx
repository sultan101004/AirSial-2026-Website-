import React, { useRef } from 'react';
import { useScroll, useSpring, useTransform, motion } from 'framer-motion';
import { ASSETS } from '../../constants';
import TextReveal from '../TextReveal';

const HeroSection = React.memo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // We use useSpring to smooth out the scroll input on desktop
    // On mobile, we bypass this to avoid perceived "sloppy" lag
    const springProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 200,
        damping: 25,
        restDelta: 0.001
    });

    const smoothProgress = isMobile ? scrollYProgress : springProgress;

    // 1. Exterior Animation (Zoom in & Fade out)
    const scale = useTransform(smoothProgress, [0, 0.45], [1, 2.8]); // Slightly reduced scale for sharpness
    const opacity = useTransform(smoothProgress, [0.35, 0.5], [1, 0]);

    // 2. Interior Animation (Slow Zoom & Text Reveal)
    const scaleInterior = useTransform(smoothProgress, [0, 1], [1, 1.15]); // More subtle
    const interiorTextOpacity = useTransform(smoothProgress, [0.45, 0.65], [0, 1]); // Appear earlier
    const interiorTextY = useTransform(smoothProgress, [0.45, 0.65], [30, 0]);

    // 3. Initial Hero Text (Fades out quickly)
    const textOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
    const textY = useTransform(smoothProgress, [0, 0.2], [0, -50]); // Add upward movement for premium feel

    return (
        <div ref={containerRef} className="h-[200vh] md:h-[250vh] relative bg-primary transition-colors duration-500"> {/* Use standard vh for the scroll path to avoid dynamic shift */}
            <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center">

                {/* Layer 1: Interior (Revealed after zoom) */}
                <motion.div
                    style={{ scale: scaleInterior }}
                    className="absolute inset-0 z-0 bg-primary flex items-center justify-center will-change-transform transition-none transform-gpu"
                >
                    {/* Desktop Image */}
                    <img
                        src={ASSETS.heroInterior}
                        alt="Cabin Interior"
                        className="hidden md:block w-full h-full object-cover opacity-60"
                        loading="eager"
                        decoding="sync"
                    />
                    {/* Mobile Image */}
                    <img
                        src={ASSETS.heroInteriorMobile}
                        alt="Cabin Interior"
                        className="block md:hidden w-full h-[110%] absolute top-[-5%] object-cover opacity-80 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    {/* NEW: Interior Welcome Text */}
                    <motion.div
                        style={{ opacity: interiorTextOpacity, y: interiorTextY }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-6"
                    >
                        <h2 className="text-4xl md:text-6xl text-white font-serif italic mb-2 drop-shadow-lg">
                            Welcome Aboard
                        </h2>
                        <p className="text-accent tracking-[0.2em] text-sm md:text-lg uppercase font-semibold drop-shadow-md">
                            Experience the Luxury
                        </p>
                    </motion.div>
                </motion.div>

                {/* Layer 2: Exterior (Front - Zooms & Fades) */}
                <motion.div style={{ opacity, scale }} className="absolute inset-0 z-10 origin-center bg-black flex items-center justify-center will-change-transform transition-none transform-gpu">
                    {/* Desktop Image */}
                    <img
                        src={ASSETS.heroExterior}
                        alt="Plane Exterior"
                        className="hidden md:block w-full h-full object-cover"
                        loading="eager"
                        decoding="sync"
                        fetchpriority="high"
                    />
                    {/* Mobile Image */}
                    <img
                        src={ASSETS.heroExteriorMobile}
                        alt="Plane Exterior"
                        className="block md:hidden w-full h-[110%] absolute top-[-5%] object-cover will-change-transform"
                        loading="eager"
                        decoding="sync"
                        fetchpriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </motion.div>

                {/* Mobile Logo removed as Navbar now handles mobile logo */}

                {/* Hero Text (Initial) */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="absolute bottom-20 left-0 w-full px-6 text-center z-20 md:bottom-20 md:left-20 md:text-left md:w-auto md:px-0 will-change-transform"
                >
                    <TextReveal className="text-4xl md:text-6xl text-white font-serif drop-shadow-2xl leading-none md:leading-tight gap-x-2 md:gap-x-4 justify-center md:justify-start">
                        The Pride of Pakistan
                    </TextReveal>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mt-6 md:mt-6 text-accent text-sm md:text-xl tracking-[0.3em] uppercase font-medium"
                    >
                        AirSial 2026
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;
