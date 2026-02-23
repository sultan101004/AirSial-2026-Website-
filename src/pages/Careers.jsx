import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import TextReveal from '../components/TextReveal';
import { ArrowRight } from 'lucide-react';

const Careers = React.memo(() => {
    const jobs = useMemo(() => [
        { title: "First Officer (A320)", location: "Karachi", type: "Flight Operations" },
        { title: "Cabin Crew", location: "Lahore / Islamabad", type: "In-Flight Services" },
        { title: "Aircraft Engineer (B1/B2)", location: "Sialkot", type: "Engineering" },
        { title: "Customer Service Officer", location: "Karachi", type: "Ground Operations" },
    ], []);

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <TextReveal className="text-4xl md:text-6xl text-white font-serif mb-6 justify-center gap-x-3">
                    Careers at AirSial
                </TextReveal>
                <p className="text-gray-400 text-lg">Come Fly With Us. Join the family that takes pride in excellence.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {jobs.map((job, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-2xl flex justify-between items-center group hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                            <div className="flex gap-4 text-sm text-gray-400">
                                <span>{job.location}</span>
                                <span>•</span>
                                <span className="text-accent">{job.type}</span>
                            </div>
                        </div>
                        <ArrowRight className="text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </motion.div>
                ))}
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-12 text-center">
                <h3 className="text-2xl text-white font-serif mb-4">Don&apos;t see a role for you?</h3>
                <p className="text-gray-400 mb-8">We are always looking for talent. Send your CV to careers@airsial.com</p>
                <button className="bg-accent text-black px-8 py-3 rounded-full font-bold hover:bg-white transition-colors">
                    Upload Resume
                </button>
            </div>
        </div>
    );
});

Careers.displayName = 'Careers';
export default Careers;
