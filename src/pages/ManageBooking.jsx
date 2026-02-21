import { useState } from 'react';
import { motion } from 'framer-motion';
import TextReveal from '../components/TextReveal';
import { Loader, Utensils, Luggage, Armchair, CheckCircle } from 'lucide-react';

const ManageBooking = () => {
    const [pnr, setPnr] = useState('');
    const [lastName, setLastName] = useState('');
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setBooking({
                pnr: pnr.toUpperCase(),
                passenger: "Mr. John Doe",
                flight: "PF-123",
                route: "KHI - ISB",
                date: "25 Oct 2026",
                status: "Confirmed",
                seats: "12A",
                meals: "Not Selected",
                baggage: "20kg"
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
                    Manage Booking
                </TextReveal>
                <p className="text-gray-400 text-lg">Enhance your journey with our premium services.</p>
            </motion.div>

            {!booking ? (
                <div className="max-w-md mx-auto bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                    <form onSubmit={handleSearch} className="flex flex-col gap-6">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">Booking Reference (PNR)</label>
                            <input
                                type="text"
                                value={pnr}
                                onChange={(e) => setPnr(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-accent"
                                placeholder="e.g. ABC123"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-accent"
                                placeholder="e.g. Doe"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent text-black py-4 rounded-xl font-medium uppercase tracking-widest hover:bg-white transition-colors flex justify-center items-center gap-2"
                        >
                            {loading ? <Loader className="animate-spin" size={20} /> : "Find Booking"}
                        </button>
                    </form>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Booking Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl text-white font-serif mb-1">{booking.route}</h3>
                                    <p className="text-accent">{booking.date}</p>
                                </div>
                                <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm uppercase font-medium flex items-center gap-1">
                                    <CheckCircle size={14} /> {booking.status}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 uppercase tracking-widest text-xs mb-1">Passenger</p>
                                    <p className="text-white">{booking.passenger}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 uppercase tracking-widest text-xs mb-1">Flight</p>
                                    <p className="text-white">{booking.flight}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 uppercase tracking-widest text-xs mb-1">Seat</p>
                                    <p className="text-white">{booking.seats}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 uppercase tracking-widest text-xs mb-1">Baggage</p>
                                    <p className="text-white">{booking.baggage}</p>
                                </div>
                            </div>
                        </div>

                        {/* Ancillaries / Upsells */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
                                <Armchair className="text-accent mb-4 group-hover:scale-110 transition-transform" size={32} />
                                <h4 className="text-lg text-white font-medium mb-1">Select Seat</h4>
                                <p className="text-gray-400 text-sm">Upgrade to extra legroom.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
                                <Utensils className="text-accent mb-4 group-hover:scale-110 transition-transform" size={32} />
                                <h4 className="text-lg text-white font-medium mb-1">Pre-order Meal</h4>
                                <p className="text-gray-400 text-sm">Valid for long haul only.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
                                <Luggage className="text-accent mb-4 group-hover:scale-110 transition-transform" size={32} />
                                <h4 className="text-lg text-white font-medium mb-1">Extra Baggage</h4>
                                <p className="text-gray-400 text-sm">Save up to 20% online.</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm h-fit">
                        <h4 className="text-xl text-white font-serif mb-6">Quick Actions</h4>
                        <div className="space-y-3">
                            <button className="w-full py-3 bg-accent text-black rounded-xl font-medium uppercase tracking-widest hover:bg-white transition-colors">
                                Web Check-In
                            </button>
                            <button className="w-full py-3 bg-white/10 text-white rounded-xl font-medium uppercase tracking-widest hover:bg-white/20 transition-colors">
                                Email Itinerary
                            </button>
                            <button className="w-full py-3 bg-white/10 text-red-400 rounded-xl font-medium uppercase tracking-widest hover:bg-red-500/20 transition-colors">
                                Cancel Booking
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ManageBooking;
