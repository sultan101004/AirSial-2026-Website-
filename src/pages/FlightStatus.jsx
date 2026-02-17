import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TextReveal from '../components/TextReveal';
import { Search, Plane, AlertTriangle, CheckCircle } from 'lucide-react';

const FlightStatus = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusResult, setStatusResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusResult(null);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            // Mock result
            setStatusResult({
                flight: searchQuery.toUpperCase() || 'PF-123',
                route: 'Karachi (KHI) to Islamabad (ISB)',
                status: 'On Time',
                departure: '14:00',
                arrival: '16:00',
                gate: 'A4'
            });
        }, 1500);
    };

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <TextReveal className="text-4xl md:text-6xl text-white font-serif mb-6 justify-center gap-x-3">
                    Flight Status
                </TextReveal>
                <p className="text-gray-400 text-lg">Real-time updates on your journey.</p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSearch} className="relative mb-12">
                    <input
                        type="text"
                        placeholder="Enter Flight Number (e.g. PF-123)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-8 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 bg-accent text-black p-2.5 rounded-full hover:bg-white transition-colors"
                    >
                        {loading ? <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full" /> : <Search size={20} />}
                    </button>
                </form>

                {statusResult && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-3xl font-serif text-white mb-2">{statusResult.flight}</h3>
                                <p className="text-gray-400">{statusResult.route}</p>
                            </div>
                            <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${statusResult.status === 'On Time' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {statusResult.status === 'On Time' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                                <span className="uppercase tracking-wider text-sm font-medium">{statusResult.status}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-8">
                            <div className="text-center p-4 bg-white/5 rounded-2xl">
                                <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Departure</p>
                                <p className="text-2xl text-white font-serif">{statusResult.departure}</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <Plane className="text-accent rotate-90" size={32} />
                            </div>
                            <div className="text-center p-4 bg-white/5 rounded-2xl">
                                <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Arrival</p>
                                <p className="text-2xl text-white font-serif">{statusResult.arrival}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-white/10">
                            <div>
                                <p className="text-gray-500 text-sm">Gate</p>
                                <p className="text-white text-xl">{statusResult.gate}</p>
                            </div>
                            <button className="text-accent hover:text-white transition-colors text-sm uppercase tracking-widest">
                                Get Notifications
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default FlightStatus;
