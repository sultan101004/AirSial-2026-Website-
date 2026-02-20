import React, { useState, useEffect } from 'react';
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
