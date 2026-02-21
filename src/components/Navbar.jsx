import { useState } from 'react';
import { ASSETS } from '../constants';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLiteMode } from '../context/LiteModeContext';

const Navbar = ({ onBookClick }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState(null); // Mobile click state
    const { isLiteMode } = useLiteMode();

    const toggleMobileDropdown = (name) => {
        if (activeMobileDropdown === name) {
            setActiveMobileDropdown(null);
        } else {
            setActiveMobileDropdown(name);
        }
    };

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
        <nav className="absolute top-0 left-0 w-full px-6 py-5 md:p-8 z-[100] pointer-events-none">
            <div className="flex w-full items-center justify-between relative pt-4 md:pt-0">
                {/* Left: Logo */}
                <div className="flex-1 flex justify-start z-50 pointer-events-auto">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)} className="block">
                        <img src={ASSETS.brandLogo} alt="AirSial" className="h-16 sm:h-24 md:h-32 w-auto object-contain drop-shadow-lg" />
                    </Link>
                </div>

                {/* Center: Navigation Links */}
                <div className="hidden xl:flex flex-1 justify-center gap-3 xl:gap-6 pointer-events-auto">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group shrink-0">
                            <Link to={link.path} className="text-white hover:text-accent transition-colors text-xs xl:text-xs uppercase tracking-widest font-medium py-2 block whitespace-nowrap">
                                {link.name}
                            </Link>

                            {link.dropdown && (
                                <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                                    <div className={`${isLiteMode ? 'bg-black/95' : 'bg-black/90 backdrop-blur-md'} border border-white/10 rounded-lg p-2 shadow-xl`}>
                                        {link.dropdown.map((item) => (
                                            <Link key={item.label} to={item.path} className="block px-4 py-2 text-gray-100 hover:text-white hover:bg-white/10 rounded text-xs uppercase tracking-wider transition-colors">
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right: Actions Container */}
                <div className="flex-1 flex gap-4 items-center justify-end z-[100] pointer-events-auto">
                    {/* Mobile Actions */}
                    <div className="xl:hidden flex items-center gap-3">
                        <button onClick={onBookClick} className="px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest bg-[#C0985A]/20 border border-[#C0985A]/50 text-[#C0985A] rounded-full backdrop-blur-md flex items-center justify-center whitespace-nowrap">
                            Book Now
                        </button>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-1 hover:text-accent transition-colors shrink-0">
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden xl:flex items-center gap-4">
                        {/* Live Status Pill */}
                        <Link to="/flight-status" className="flex shrink-0 items-center gap-2 px-4 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 text-white text-[11px] uppercase tracking-widest font-bold rounded-full hover:bg-white/20 transition-all cursor-pointer">
                            <div className="shrink-0 w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="whitespace-nowrap">PF-121 to LHE • On Time</span>
                        </Link>

                        {/* Book Flight */}
                        <button onClick={onBookClick} className="shrink-0 whitespace-nowrap px-6 py-2 backdrop-blur-md bg-white/10 border border-white/20 text-white text-[11px] uppercase tracking-widest font-bold rounded-full hover:bg-white/20 transition-all">
                            Book Flight
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className={`xl:hidden fixed inset-0 z-40 ${isLiteMode ? 'bg-black' : 'bg-black/95 backdrop-blur-xl'} pt-24 px-6 flex flex-col gap-4 overflow-y-auto animate-in fade-in slide-in-from-top-5 pointer-events-auto`}>
                    {/* Note: Redundant X button removed as per user request */}

                    {navLinks.map((link) => (
                        <div key={link.name} className="border-b border-white/10 pb-2">
                            {link.dropdown ? (
                                <div>
                                    <button
                                        onClick={() => toggleMobileDropdown(link.name)}
                                        className="w-full flex justify-between items-center text-white text-xl font-serif hover:text-accent transition-colors py-2"
                                    >
                                        <span>{link.name}</span>
                                        {activeMobileDropdown === link.name ? (
                                            <ChevronUp size={20} className="text-accent" />
                                        ) : (
                                            <ChevronDown size={20} className="text-white/50" />
                                        )}
                                    </button>

                                    {/* Collapsible Content */}
                                    <div className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === link.name ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                        <div className="pl-4 space-y-3 pb-2 border-l border-white/10 ml-2">
                                            {link.dropdown.map((item) => (
                                                <Link
                                                    key={item.label}
                                                    to={item.path}
                                                    className="block text-gray-300 text-sm hover:text-white transition-colors"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    to={link.path}
                                    className="text-white text-xl font-serif hover:text-accent transition-colors block py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}

                    {/* Mobile Live Status Pill */}
                    <Link
                        to="/flight-status"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-4 flex items-center justify-center gap-3 px-4 py-3 rounded-full backdrop-blur-xl bg-[#111518]/60 border border-white/10 shadow-lg active:bg-[#111518]/80 transition-colors w-full"
                    >
                        <div className="shrink-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-white/90 tracking-widest uppercase font-medium whitespace-nowrap">
                            PF-121 to LHE • On Time
                        </span>
                    </Link>

                    <button
                        onClick={() => {
                            onBookClick();
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-full py-4 bg-accent text-black font-bold text-lg rounded-full mt-4 mb-4"
                    >
                        Book Flight
                    </button>

                </div>
            )}
        </nav>
    );
};

export default Navbar;
