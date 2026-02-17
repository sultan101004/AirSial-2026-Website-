import React, { useState } from 'react';
import { ASSETS } from '../constants';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLiteMode } from '../context/LiteModeContext';

const Navbar = ({ onBookClick }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { isLiteMode } = useLiteMode();

    const handleLogoClick = () => {
        navigate('/');
        window.scrollTo(0, 0);
    }

    const navLinks = [
        {
            name: 'About Us',
            path: '/about',
            dropdown: [
                { label: 'Introduction', path: '/about#introduction' },
                { label: 'Vision & Mission', path: '/about#vision' },
                { label: 'Our Fleet', path: '/about#fleet' },
                { label: 'Management', path: '/about#management' },
                { label: 'Our Team', path: '/about#team' }
            ]
        },
        {
            name: 'Services',
            path: '/services',
            dropdown: [
                { label: 'Cargo', path: '/services#cargo' },
                { label: 'Flight Schedule', path: '/services#schedule' },
                { label: 'Baggage', path: '/services#baggage' },
                { label: 'Lounges', path: '/services#lounges' },
                { label: 'Special Needs', path: '/services#special-needs' }
            ]
        },
        { name: 'Destinations', path: '/destinations' },
        {
            name: 'Premium',
            path: '/loyalty', // Default to Loyalty
            dropdown: [
                { label: 'Sial Miles', path: '/loyalty' },
                { label: 'My Booking', path: '/manage-booking' },
                { label: 'Flight Status', path: '/flight-status' },
                { label: 'Agency Enrollment', path: '/agency-enrollment' }
            ]
        },
        { name: 'Contact', path: '/contact' },
        { name: 'Feedback', path: '/feedback' },
    ];

    return (
        <nav className="absolute top-12 left-0 w-full px-6 py-5 md:p-8 z-[100] pointer-events-none">
            <div className="flex justify-between items-center relative w-full">
                {/* Mobile Menu Button (Left) */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden text-white p-1 hover:text-accent transition-colors z-[100] pointer-events-auto"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop Logo */}
                <Link
                    to="/"
                    onClick={() => window.scrollTo(0, 0)}
                    className="hidden md:block relative z-50 pointer-events-auto"
                >
                    <img
                        src={ASSETS.brandLogo}
                        alt="AirSial"
                        className="h-8 md:h-12 w-auto object-contain drop-shadow-lg"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6 ml-auto pointer-events-auto">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative group"
                            onMouseEnter={() => setActiveDropdown(link.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                to={link.path}
                                className="text-white hover:text-accent transition-colors text-xs xl:text-xs uppercase tracking-widest font-medium py-2 block"
                            >
                                {link.name}
                            </Link>

                            {/* Dropdown */}
                            {link.dropdown && (
                                <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                                    <div className={`${isLiteMode ? 'bg-black/95' : 'bg-black/90 backdrop-blur-md'} border border-white/10 rounded-lg p-2 shadow-xl`}>
                                        {link.dropdown.map((item) => (
                                            <Link
                                                key={item.label}
                                                to={item.path}
                                                className="block px-4 py-2 text-gray-100 hover:text-white hover:bg-white/10 rounded text-xs uppercase tracking-wider transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Desktop Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 border border-white/20 ${isLiteMode ? 'bg-black/50' : 'backdrop-blur-md bg-white/5'} rounded-full text-white hover:bg-white/10 transition-colors ml-4`}
                        title={theme === 'dark' ? "Switch into Green Mode" : "Switch to Dark Mode"}
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button
                        onClick={onBookClick}
                        className={`px-6 py-2 border border-white/20 ${isLiteMode ? 'bg-black/50' : 'backdrop-blur-md bg-white/5'} rounded-full text-xs xl:text-xs hover:bg-white/10 transition-colors uppercase tracking-wider ml-2`}
                    >
                        Book Flight
                    </button>
                </div>

                {/* Mobile Theme Toggle (Right) */}
                <button
                    onClick={toggleTheme}
                    className="lg:hidden text-white p-1 pointer-events-auto"
                >
                    {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className={`lg:hidden fixed inset-0 z-40 ${isLiteMode ? 'bg-black' : 'bg-black/95 backdrop-blur-xl'} pt-24 px-6 flex flex-col gap-4 overflow-y-auto animate-in fade-in slide-in-from-top-5 pointer-events-auto`}>
                    {/* Extra Close Button for better UX */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-6 right-6 text-white/50 hover:text-white"
                    >
                        <X size={32} />
                    </button>
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            <Link
                                to={link.path}
                                className="text-white text-xl font-serif hover:text-accent transition-colors block"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                            {link.dropdown && (
                                <div className="pl-4 mt-2 border-l border-white/10 space-y-2">
                                    {link.dropdown.map((item) => (
                                        <Link
                                            key={item.label}
                                            to={item.path}
                                            className="block text-gray-200 text-sm hover:text-white transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            onBookClick();
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-full py-4 bg-accent text-black font-bold text-lg rounded-full mt-4 mb-8"
                    >
                        Book Flight
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
