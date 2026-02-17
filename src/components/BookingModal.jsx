import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, Calendar, Users, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const BookingModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();

    if (!isOpen) return null;

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1500);
    };

    const isDark = theme === 'dark';

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className={`${isDark ? 'bg-[#1a1e21] border-white/10' : 'bg-white border-gray-200'} w-full max-w-lg rounded-2xl border overflow-hidden shadow-2xl transition-colors duration-300`}
                >
                    <div className={`${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'} p-6 border-b flex justify-between items-center transaction-colors duration-300`}>
                        <h3 className={`text-xl font-serif ${isDark ? 'text-white' : 'text-gray-900'}`}>Book Your Flight</h3>
                        <button onClick={onClose} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 md:p-8">
                        {step === 1 ? (
                            <form onSubmit={handleSearch} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-accent uppercase tracking-wider">From</label>
                                        <div className="relative group">
                                            <Plane className="absolute left-3 top-3 text-gray-400 group-focus-within:text-accent w-4 h-4" />
                                            <select className={`w-full ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent appearance-none transition-colors duration-300`}>
                                                <option>Karachi (KHI)</option>
                                                <option>Lahore (LHE)</option>
                                                <option>Islamabad (ISB)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-accent uppercase tracking-wider">To</label>
                                        <div className="relative group">
                                            <Plane className="absolute left-3 top-3 text-gray-400 group-focus-within:text-accent w-4 h-4 transform rotate-90" />
                                            <select className={`w-full ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent appearance-none transition-colors duration-300`}>
                                                <option>Dubai (DXB)</option>
                                                <option>Jeddah (JED)</option>
                                                <option>London (LHR)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-accent uppercase tracking-wider">Departure</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                            <input type="date" className={`w-full ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors duration-300`} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-accent uppercase tracking-wider">Passengers</label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                            <select className={`w-full ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent appearance-none transition-colors duration-300`}>
                                                <option>1 Adult</option>
                                                <option>2 Adults</option>
                                                <option>Family (2A + 2C)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-accent hover:bg-accent/90 text-black font-bold py-3 rounded-xl transition-all flex justify-center items-center gap-2"
                                >
                                    {loading ? (
                                        <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <>Search Flights <ArrowRight size={18} /></>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                                    <Plane size={32} />
                                </div>
                                <h4 className={`text-xl font-serif mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Prototype Mode</h4>
                                <p className="text-gray-400 mb-6">Real flight data integration would happen here.</p>
                                <button
                                    onClick={() => { setStep(1); onClose(); }}
                                    className="text-sm text-accent hover:underline"
                                >
                                    Close Preview
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BookingModal;
