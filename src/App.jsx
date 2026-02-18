import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useSpring, useTransform, motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { ASSETS } from './constants';
import Navbar from './components/Navbar';
import FlightTicker from './components/FlightTicker';
import BookingModal from './components/BookingModal';
import Preloader from './components/Preloader';
import MagneticButton from './components/MagneticButton';
import Cursor from './components/Cursor';
import TextReveal from './components/TextReveal';
import { Plane, ChevronDown, MapPin, Search, Menu, X, Instagram, Twitter, Linkedin, Facebook, ArrowRight, Tag, Briefcase, Play, Phone, Mail, ArrowLeft } from 'lucide-react';
import Footer from './components/Footer';
import AmbientBackground from './components/AmbientBackground';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Destinations from './pages/Destinations';
import Privacy from './pages/Privacy';
import FlightStatus from './pages/FlightStatus';
import ManageBooking from './pages/ManageBooking';
import Loyalty from './pages/Loyalty';
import Services from './pages/Services';
import Feedback from './pages/Feedback';
import AgencyEnrollment from './pages/AgencyEnrollment';

// --- Components ---

const HeroSection = ({ onBookClick, onMenuClick }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Optimized Scroll Animation (Premium Feel)
    // We use useSpring to smooth out the scroll input, creating a "weighted" feel
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.5,
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

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
        <div ref={containerRef} className="h-[200vh] md:h-[250vh] relative bg-primary transition-colors duration-500"> {/* Kept height for scroll effect, but inner container handles view */}
            <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">

                {/* Layer 1: Interior (Revealed after zoom) */}
                <motion.div
                    style={{ scale: scaleInterior }}
                    className="absolute inset-0 z-0 bg-primary flex items-center justify-center will-change-transform"
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
                        className="block md:hidden w-full h-full object-cover opacity-80"
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
                <motion.div style={{ opacity, scale }} className="absolute inset-0 z-10 origin-center bg-black flex items-center justify-center will-change-transform">
                    {/* Desktop Image */}
                    <img
                        src={ASSETS.heroExterior}
                        alt="Plane Exterior"
                        className="hidden md:block w-full h-full object-cover"
                        loading="eager"
                        decoding="sync"
                    />
                    {/* Mobile Image */}
                    <img
                        src={ASSETS.heroExteriorMobile}
                        alt="Plane Exterior"
                        className="block md:hidden w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </motion.div>

                {/* Mobile Logo (Top-Center) - Kept as requested previously */}
                <motion.div
                    style={{ opacity: textOpacity }}
                    className="absolute top-5 left-1/2 -translate-x-1/2 z-50 md:hidden"
                >
                    <img
                        src={ASSETS.brandLogo}
                        alt="AirSial"
                        className="h-12 w-auto object-contain drop-shadow-md"
                    />
                </motion.div>

                {/* Hero Text (Initial) */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="absolute bottom-40 left-0 w-full px-6 text-center z-20 md:bottom-20 md:left-20 md:text-left md:w-auto md:px-0 will-change-transform"
                >
                    <TextReveal className="text-5xl md:text-6xl text-white font-serif drop-shadow-2xl leading-none md:leading-tight gap-x-2 md:gap-x-4 justify-center md:justify-start">
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
};

const ExperienceSection = () => {
    const experiences = [
        { id: 1, image: ASSETS.foodImage, title: "Inflight Meal & Beverages", subtitle: "Taste the Skies" },
        { id: 2, image: ASSETS.cargoImage, title: "Cargo", subtitle: "Reliable & Fast" },
        { id: 3, image: ASSETS.baggageImage, title: "Baggage", subtitle: "Generous Allowance" },
        { id: 4, image: ASSETS.crewImage, title: "Qualified Crew", subtitle: "Service with a Smile" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="py-20 md:py-32 px-6 md:px-20 bg-transparent relative z-30">
            <div className="mb-12 md:mb-20">
                <TextReveal className="text-4xl md:text-6xl text-accent mb-6 gap-x-3">
                    World Class Experience
                </TextReveal>
                <p className="text-gray-100 max-w-xl text-lg">Let's touch the SKY together. Experience the warmth of Pakistani hospitality.</p>

                {/* Mobile Swipe Hint */}
                <div className="md:hidden flex items-center gap-2 mt-4 text-accent/80 text-sm animate-pulse">
                    <ArrowRight size={16} />
                    <span>Swipe to explore</span>
                </div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 md:gap-8 pb-8 px-6 md:px-0"
            >
                {experiences.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={cardVariants}
                        whileHover={{ y: -10 }}
                        // Changed width to 85vw on mobile to allow "peeking" of the next card
                        className="snap-center shrink-0 w-[85vw] md:w-[400px] aspect-[4/5] relative group overflow-hidden rounded-2xl cursor-pointer shadow-lg shadow-black/50"
                    >
                        <motion.img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.7 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-2xl md:text-3xl text-white font-serif italic mb-2">{item.title}</h3>
                            <p className="text-accent text-xs md:text-sm tracking-widest uppercase">{item.subtitle}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

const DestinationsSection = () => {
    // Reordered so Islamabad is index 2 (Center if 5 items, or just default to it)
    const destinations = [
        { id: 'khi', img: ASSETS.destKarachi, code: 'KHI', city: 'Karachi', price: 'PKR 18,500', desc: 'The bustling metropolis and economic hub of Pakistan, offering a vibrant mix of culture and commerce.' },
        { id: 'lhe', img: ASSETS.destLahore, code: 'LHE', city: 'Lahore', price: 'PKR 22,000', desc: 'The cultural heart of Pakistan, known for its rich history, stunning Mughal architecture, and delicious food.' },
        { id: 'isb', img: ASSETS.destIslamabad, code: 'ISB', city: 'Islamabad', price: 'PKR 24,000', desc: 'The serene capital city, nestled against the Margalla Hills, famous for its lush greenery and peaceful environment.' },
        { id: 'skt', img: ASSETS.destSialkot, code: 'SKT', city: 'Sialkot', price: 'PKR 20,000', desc: 'A major industrial city, renowned globally for its sports goods and surgical instruments manufacturing.' },
        { id: 'jed', img: ASSETS.destJeddah, code: 'JED', city: 'Jeddah', price: 'PKR 85,000', desc: 'A vibrant Saudi Arabian port city on the Red Sea, serving as a gateway for pilgrims to Mecca and Medina.' },
        { id: 'mct', img: ASSETS.destMuscat, code: 'MCT', city: 'Muscat', price: 'PKR 45,000', desc: 'Oman\'s port capital, known for its stunning architecture, traditional souqs, and beautiful coastline.' },
    ];

    const [activeIndex, setActiveIndex] = useState(2); // Start at Islamabad (Index 2)

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1 < destinations.length ? prev + 1 : 0));
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : destinations.length - 1));
    };

    return (
        <section className="py-12 md:py-24 bg-transparent overflow-hidden relative">
            <div className="mb-12 md:mb-24 px-6 md:px-20 flex items-end justify-between relative z-10">
                <div>
                    <TextReveal className="text-4xl md:text-6xl text-accent mb-6 gap-x-3">
                        Global Destinations
                    </TextReveal>
                    <p className="text-gray-100 text-lg">Connecting Pakistan to the Middle East and beyond.</p>
                </div>

                {/* Desktop Controls */}
                <div className="hidden md:flex gap-4">
                    <button onClick={handlePrev} className="p-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors z-20 pointer-events-auto">
                        <ArrowLeft size={24} />
                    </button>
                    <button onClick={handleNext} className="p-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors z-20 pointer-events-auto">
                        <ArrowRight size={24} />
                    </button>
                </div>
            </div>

            {/* 3D Coverflow Container */}
            <div className="relative h-[400px] md:h-[500px] flex justify-center items-center perspective-1000">
                <AnimatePresence initial={false} mode='popLayout'>
                    {destinations.map((dest, index) => {
                        const offset = index - activeIndex;
                        const isActive = index === activeIndex;

                        return (
                            <motion.div
                                key={dest.id}
                                layout
                                initial={false}
                                animate={{
                                    x: offset * (window.innerWidth < 768 ? 60 : 280), // Increased spacing for landscape cards
                                    scale: isActive ? 1 : 0.85,
                                    opacity: isActive ? 1 : 0.4,
                                    zIndex: 50 - Math.abs(offset),
                                    rotateY: isActive ? 0 : offset * 5, // Subtle rotation
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = Math.abs(offset.x) * velocity.x;
                                    if (swipe < -100 || offset.x < -100) {
                                        handleNext();
                                    } else if (swipe > 100 || offset.x > 100) {
                                        handlePrev();
                                    }
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                                onClick={() => setActiveIndex(index)}
                                className={`absolute w-[85vw] md:w-[600px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border ${isActive ? 'border-accent/50 box-shadow-accent cursor-grab active:cursor-grabbing' : 'border-white/5 cursor-pointer'}`}
                                style={{
                                    boxShadow: isActive ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : 'none'
                                }}
                            >
                                <img src={dest.img} alt={dest.code} className="w-full h-full object-cover pointer-events-none" />
                                <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-60'}`} />

                                {/* Content Overlay - Only visible on active card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black via-black/80 to-transparent"
                                >
                                    <h3 className="text-2xl md:text-4xl font-serif text-white mb-2">{dest.city}</h3>
                                    <div className="flex gap-4 items-center">
                                        <p className="text-white flex items-center gap-2 text-sm md:text-lg"><Tag size={16} className="text-accent" /> {dest.price}</p>
                                    </div>
                                    <p className="text-white text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed">{dest.desc}</p>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden justify-center gap-6 pb-6 pt-0 relative z-20">
                <button onClick={handlePrev} className="p-4 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-sm active:bg-white/20">
                    <ArrowLeft size={20} />
                </button>
                <div className="w-px h-12 bg-white/10"></div>
                <button onClick={handleNext} className="p-4 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-sm active:bg-white/20">
                    <ArrowRight size={20} />
                </button>
            </div>
        </section>
    );
};

// --- Routing Components ---

const Home = ({ onBookClick }) => {
    const { setIsMobileMenuOpen } = useOutletContext();
    return (
        <>
            <FlightTicker />
            <HeroSection onBookClick={onBookClick} onMenuClick={() => setIsMobileMenuOpen(true)} />
            <ExperienceSection />
            <DestinationsSection />
        </>
    );
};

const Layout = ({ onBookClick }) => {
    const { pathname } = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false); // Close menu on route change
    }, [pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar
                onBookClick={onBookClick}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <main className="flex-grow">
                <Outlet context={{ setIsMobileMenuOpen }} />
            </main>
            <Footer onBookClick={onBookClick} />
        </div>
    );
};



// New Imports
import { LiteModeProvider, useLiteMode } from './context/LiteModeContext';

function AppContent() {
    const [loading, setLoading] = useState(true);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const { isLiteMode } = useLiteMode(); // Get Lite Mode state

    useEffect(() => {
        // Disable Lenis in Lite Mode
        if (isLiteMode) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [isLiteMode]); // Re-run if mode changes

    useEffect(() => {
        // Prevent scroll when loading
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [loading]);

    return (
        <ThemeProvider>
            <Router>
                <AmbientBackground />
                <div className="relative z-10 bg-transparent min-h-screen text-white font-sans selection:bg-accent selection:text-black">
                    <Cursor />
                    <AnimatePresence mode='wait'>
                        {loading && <Preloader onComplete={() => setLoading(false)} />}
                    </AnimatePresence>

                    {!loading && (
                        <Routes>
                            <Route path="/" element={<Layout onBookClick={() => setIsBookingModalOpen(true)} />}>
                                <Route index element={<Home onBookClick={() => setIsBookingModalOpen(true)} />} />
                                <Route path="about" element={<About />} />
                                <Route path="contact" element={<Contact />} />
                                <Route path="careers" element={<Careers />} />
                                <Route path="destinations" element={<Destinations />} />
                                <Route path="flight-status" element={<FlightStatus />} />
                                <Route path="manage-booking" element={<ManageBooking />} />
                                <Route path="loyalty" element={<Loyalty />} />
                                <Route path="privacy" element={<Privacy />} />
                                <Route path="terms" element={<Privacy />} />
                                <Route path="services" element={<Services />} />
                                <Route path="feedback" element={<Feedback />} />
                                <Route path="agency-enrollment" element={<AgencyEnrollment />} />
                                <Route path="*" element={<Home onBookClick={() => setIsBookingModalOpen(true)} />} />
                            </Route>
                        </Routes>
                    )}

                    <BookingModal
                        isOpen={isBookingModalOpen}
                        onClose={() => setIsBookingModalOpen(false)}
                    />
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default function App() {
    return (
        <LiteModeProvider>
            <AppContent />
        </LiteModeProvider>
    );
}
