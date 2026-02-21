import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail } from 'lucide-react';
import { ASSETS } from '../constants';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Footer = () => {
    return (
        <footer className="bg-primary pt-24 pb-12 relative overflow-hidden text-sm transition-colors duration-500">

            {/* Background Globe Effect */}
            <div className="absolute inset-0 z-0 opacity-80 pointer-events-none flex items-center justify-center bg-black">
                <motion.img
                    src={ASSETS.footerBackground}
                    alt=""
                    aria-hidden="true"
                    className="w-[180%] h-[180%] md:w-4/5 md:h-4/5 object-contain opacity-100 mix-blend-screen"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-12 mb-16 border-b border-white/10 pb-12">

                    {/* Column 1: Services & About Us (Merged) */}
                    <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
                        {/* Our Services */}
                        <div className="space-y-6">
                            <h4 className="text-accent text-sm font-bold uppercase tracking-widest mb-4">Our Services</h4>
                            <ul className="space-y-3">
                                {['Cargo', 'Flight Schedule', 'Tariff', 'Baggage', 'Lounges', 'Special Needs'].map((item) => (
                                    <li key={item}>
                                        <Link to={`/services#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-200 hover:text-white transition-colors block">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* About Us */}
                        <div className="space-y-6">
                            <h4 className="text-accent text-sm font-bold uppercase tracking-widest mb-4">About Us</h4>
                            <ul className="space-y-3">
                                {['Introduction', 'Vision & Mission', 'Our Fleet', 'Management', 'Our Team'].map((item) => (
                                    <li key={item}>
                                        <Link to={`/about#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-200 hover:text-white transition-colors block">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Column 3: Customer Service */}
                    <div className="space-y-6">
                        <h4 className="text-accent text-sm font-bold uppercase tracking-widest mb-4">Customer Service</h4>
                        <ul className="space-y-3">
                            <li><Link to="/contact" className="text-gray-200 hover:text-white transition-colors block">Contact Us</Link></li>
                            <li><Link to="/terms" className="text-gray-200 hover:text-white transition-colors block">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="text-gray-200 hover:text-white transition-colors block">Privacy Policy</Link></li>
                            <li><Link to="/loyalty" className="text-gray-200 hover:text-white transition-colors block">Sial Miles</Link></li>
                            <li><Link to="/terms" className="text-gray-200 hover:text-white transition-colors block">Air Passenger Rights</Link></li>
                            <li><Link to="/feedback" className="text-gray-200 hover:text-white transition-colors block">FAQs</Link></li>
                            <li><Link to="/feedback" className="text-gray-200 hover:text-white transition-colors block">Web Refund Request</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Policies & Apps */}
                    <div className="space-y-6">
                        <h4 className="text-accent text-sm font-bold uppercase tracking-widest mb-4">AirSial App</h4>
                        <p className="text-gray-200 text-xs">Download the AirSial App for seamless booking and management.</p>

                        <div className="flex gap-4">
                            {/* Mobile App Buttons (Placeholder Style) */}
                            <button className="bg-white/10 hover:bg-white/20 transition-colors border border-white/20 rounded-lg px-4 py-2 flex items-center gap-3">
                                <div className="text-left">
                                    <div className="text-[10px] uppercase text-gray-400">Download on the</div>
                                    <div className="text-sm font-bold text-white">App Store</div>
                                </div>
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 transition-colors border border-white/20 rounded-lg px-4 py-2 flex items-center gap-3">
                                <div className="text-left">
                                    <div className="text-[10px] uppercase text-gray-400">Get it on</div>
                                    <div className="text-sm font-bold text-white">Google Play</div>
                                </div>
                            </button>
                        </div>

                        <div className="pt-6">
                            <h4 className="text-accent text-sm font-bold uppercase tracking-widest mb-4">Secure Payment</h4>
                            <div className="flex gap-4 text-gray-400 grayscale opacity-70" aria-hidden="true">
                                {/* Placeholders for Payment Logos */}
                                <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center text-[10px]">VISA</div>
                                <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center text-[10px]">MC</div>
                                <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center text-[10px]">HBL</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-300">
                    <p>&copy; 2026 AirSial. All rights reserved.</p>
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-accent" />
                            <span>021-111-247-742</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-accent" />
                            <span>info@airsial.com</span>
                        </div>
                        <div className="flex gap-4 md:ml-4 mt-2 md:mt-0">
                            <a href="#" className="hover:text-white transition-colors" aria-label="Follow AirSial on Facebook"><Facebook size={16} /></a>
                            <a href="#" className="hover:text-white transition-colors" aria-label="Follow AirSial on Twitter"><Twitter size={16} /></a>
                            <a href="#" className="hover:text-white transition-colors" aria-label="Follow AirSial on Instagram"><Instagram size={16} /></a>
                            <a href="#" className="hover:text-white transition-colors" aria-label="Follow AirSial on LinkedIn"><Linkedin size={16} /></a>
                        </div>
                        {/* Theme Toggle */}
                        <div className="flex items-center md:ml-4 text-white/50 hover:text-white transition-colors">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
