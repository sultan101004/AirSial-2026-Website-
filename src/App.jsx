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
                    <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-3 pl-2 pr-5 py-2.5 backdrop-blur-xl bg-[#111518]/80 border border-white/10 rounded-full shadow-lg hover:bg-[#111518]/90 transition-all group">
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-br from-[#7e22ce] to-[#581c87] shadow-inner">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white">
                                <path d="M4 19V5L12 13L20 5V19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="text-white/60 text-[10px] leading-none tracking-[0.2em] uppercase font-semibold group-hover:text-white/90 transition-colors">
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
