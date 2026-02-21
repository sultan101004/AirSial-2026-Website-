import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion'; // Keep AnimatePresence for Preloader
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Footer from './components/Footer';
import AmbientBackground from './components/AmbientBackground';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';

// Sections
import HeroSection from './components/sections/HeroSection';
import ExperienceSection from './components/sections/ExperienceSection';
import DestinationsSection from './components/sections/DestinationsSection';

// Pages (Lazy Loaded for Performance)
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Careers = React.lazy(() => import('./pages/Careers'));
const Destinations = React.lazy(() => import('./pages/Destinations'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const FlightStatus = React.lazy(() => import('./pages/FlightStatus'));
const ManageBooking = React.lazy(() => import('./pages/ManageBooking'));
const Loyalty = React.lazy(() => import('./pages/Loyalty'));
const Services = React.lazy(() => import('./pages/Services'));
const Feedback = React.lazy(() => import('./pages/Feedback'));
const AgencyEnrollment = React.lazy(() => import('./pages/AgencyEnrollment'));

// Context
import { LiteModeProvider, useLiteMode } from './context/LiteModeContext';

// --- Routing Components ---

const Home = ({ onBookClick }) => {
    const { setIsMobileMenuOpen } = useOutletContext();
    return (
        <>
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
                        <Suspense fallback={
                            <div className="min-h-screen flex items-center justify-center bg-black">
                                <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-accent animate-spin"></div>
                            </div>
                        }>
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
                        </Suspense>
                    )}

                    <BookingModal
                        isOpen={isBookingModalOpen}
                        onClose={() => setIsBookingModalOpen(false)}
                    />

                    {/* Agency Branding Badge */}
                    <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-2 px-3 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all group cursor-pointer">
                        {/* MYK Studio Inline SVG Logo */}
                        <svg className="w-5 h-5 shrink-0 drop-shadow-md" viewBox="20 20 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="mykGradient1" x1="20" y1="80" x2="50" y2="20" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#AF67E9" />
                                    <stop offset="100%" stopColor="#4A3482" />
                                </linearGradient>
                                <linearGradient id="mykGradient2" x1="50" y1="80" x2="80" y2="20" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#4A3482" />
                                    <stop offset="100%" stopColor="#A464DF" />
                                </linearGradient>
                                <filter id="shadow" x="0" y="0" width="120" height="120" filterUnits="userSpaceOnUse">
                                    <feDropShadow dx="-2" dy="2" stdDeviation="1" floodOpacity="0.3" />
                                </filter>
                            </defs>

                            {/* Left M Pillar */}
                            <path d="M25 75 C25 79 31 79 31 75 L31 45 C32 45 40 55 41 57 C42 59 44 59 45 57 L55 45 L55 75 C55 79 61 79 61 75 L61 30 C61 27 57 25 55 28 C55 28 44 42 43 43 C42 44 40 42 40 42 L29 28 C26 25 25 27 25 30 Z" fill="url(#mykGradient1)" />

                            {/* Right K Shape */}
                            <path d="M53 75 C53 79 59 79 59 75 L59 58 C65 65 73 75 75 77 C77 80 81 78 79 75 L67 55 L79 35 C81 32 77 30 75 33 L62 48 L59 45 L59 30 C59 26 53 26 53 30 Z" fill="url(#mykGradient2)" filter="url(#shadow)" />
                        </svg>
                        <span className="text-white/90 text-[8px] md:text-[9px] leading-none tracking-[0.15em] uppercase font-bold group-hover:text-white transition-colors whitespace-nowrap">
                            Prototype by MYK STUDIO
                        </span>
                    </div>
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
