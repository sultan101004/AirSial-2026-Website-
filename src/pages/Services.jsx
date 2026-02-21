import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
    return (
        <div className="min-h-screen bg-primary transition-colors duration-500 pt-32 px-6 pb-20">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <h1 className="text-4xl md:text-6xl font-serif text-accent mb-8">Elevated Services</h1>
                    <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                        <p>
                            At AirSial, we are redefining the standards of hospitality in the skies. From seamless cargo solutions to a generous baggage policy, every service is designed with your comfort in mind.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                            {[
                                { title: "Sky Freight", desc: "Global cargo solutions with local care." },
                                { title: "Guest Care", desc: "Personalized assistance at every touchpoint." },
                                { title: "In-Flight Magic", desc: "Curated experiences for the discerning traveler." },
                                { title: "Priority Fly", desc: "Exclusive perks for our loyalty members." }
                            ].map((item, idx) => (
                                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/30 transition-colors">
                                    <h3 className="text-accent font-serif text-xl mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Services;
