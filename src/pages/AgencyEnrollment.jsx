import React from 'react';
import { motion } from 'framer-motion';

const AgencyEnrollment = () => {
    return (
        <div className="min-h-screen bg-primary transition-colors duration-500 pt-32 px-6 pb-20">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <h1 className="text-4xl md:text-6xl font-serif text-accent mb-8">Partner with AirSial</h1>
                    <div className="space-y-8 text-gray-300">
                        <p className="text-lg leading-relaxed">
                            Join our prestigious network of travel partners and bring the pride of Pakistan to travelers around the globe. Our agency portal provides comprehensive tools to manage bookings and serve your clients better.
                        </p>

                        <div className="border-t border-white/10 pt-8 mt-8">
                            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 md:p-8">
                                <h3 className="text-accent font-serif text-2xl mb-4">Enrollment Notification</h3>
                                <p className="text-sm text-gray-400 mb-0">
                                    Our digital enrollment system is currently being upgraded to ensure a smoother onboarding experience. Please check back soon or contact our corporate office for physical documentation.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AgencyEnrollment;
