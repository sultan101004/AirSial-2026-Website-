import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import TextReveal from '../components/TextReveal';
import { ASSETS } from '../constants';

const Destinations = React.memo(() => {
    // Memoize static destination array to avoid recreation on re-renders
    const destinations = useMemo(() => [
        { id: 'khi', img: ASSETS.destKarachi, city: 'Karachi', country: 'Pakistan', code: 'KHI', desc: "The City of Lights & AirSial's main hub." },
        { id: 'lhe', img: ASSETS.destLahore, city: 'Lahore', country: 'Pakistan', code: 'LHE', desc: "The Heart of Pakistan, rich in culture and history." },
        { id: 'isb', img: ASSETS.destIslamabad, city: 'Islamabad', country: 'Pakistan', code: 'ISB', desc: "The beautiful capital city nestled in the Margallas." },
        { id: 'skt', img: ASSETS.destSialkot, city: 'Sialkot', country: 'Pakistan', code: 'SKT', desc: "Home of AirSial. The city of export excellence." },
        { id: 'jed', img: ASSETS.destJeddah, city: 'Jeddah', country: 'Saudi Arabia', code: 'JED', desc: "Gateway to the Two Holy Mosques." },
        { id: 'mct', img: ASSETS.destMuscat, city: 'Muscat', country: 'Oman', code: 'MCT', desc: "A jewel of the Arabian Peninsula." },
    ], []);

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <TextReveal className="text-4xl md:text-6xl text-white font-serif mb-6 justify-center gap-x-3">
                    Our Network
                </TextReveal>
                <p className="text-gray-400 text-lg">Connecting Pakistan&apos;s major cities and the Middle East.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations.map((dest, idx) => (
                    <motion.div
                        key={dest.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
                    >
                        <img src={dest.img} alt={dest.city} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" decoding="async" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h2 className="text-4xl font-serif text-white mb-2">{dest.city}</h2>
                            <p className="text-accent uppercase tracking-widest text-sm mb-4">{dest.country} • {dest.code}</p>
                            <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{dest.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
});

Destinations.displayName = 'Destinations';
export default Destinations;
