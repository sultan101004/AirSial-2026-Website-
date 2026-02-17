import React from 'react';
import { motion } from 'framer-motion';

const FlightTicker = () => {
    const flights = [
        "PF-121 KHI -> LHE: On Time",
        "PF-122 LHE -> KHI: Boarding",
        "PF-143 KHI -> ISB: Delayed 15m",
        "PF-144 ISB -> KHI: On Time",
        "PF-201 KHI -> DXB: Check-in Open",
        "PF-202 DXB -> KHI: Arrived"
    ];

    return (
        <div className="bg-accent/10 border-b border-white/5 backdrop-blur-sm h-8 flex items-center overflow-hidden relative z-40">
            <div className="bg-accent px-4 py-1 text-xs font-bold text-black uppercase tracking-wider h-full flex items-center shadow-lg z-10">
                Live Status
            </div>
            <motion.div
                className="flex gap-12 whitespace-nowrap px-4"
                animate={{ x: ["100%", "-100%"] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                {flights.map((flight, index) => (
                    <span key={index} className="text-xs text-white/80 font-mono">
                        {flight}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default FlightTicker;
