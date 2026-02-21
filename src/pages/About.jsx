import { motion } from 'framer-motion';
import TextReveal from '../components/TextReveal';
import { ASSETS } from '../constants';

const About = () => {
    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <TextReveal className="text-4xl md:text-6xl text-white font-serif mb-6 justify-center gap-x-3">
                    The Pride of Pakistan
                </TextReveal>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    AirSial is more than just an airline; it is a collaborative triumph of the Sialkot business community, bringing world-class hospitality to the skies.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl font-serif text-accent">The Silver Triangle</h2>
                    <p className="text-gray-300 leading-relaxed">
                        AirSial is the brainchild of the Sialkot Chamber of Commerce & Industry. It represents the &quot;Silver Triangle&quot; of success:
                    </p>
                    <ul className="space-y-4 text-gray-400">
                        <li className="flex gap-4 items-start">
                            <span className="text-accent text-xl">•</span>
                            <span>Sialkot Chamber of Commerce & Industry (SCCI)</span>
                        </li>
                        <li className="flex gap-4 items-start">
                            <span className="text-accent text-xl">•</span>
                            <span>Sialkot International Airport Ltd (SIAL)</span>
                        </li>
                        <li className="flex gap-4 items-start">
                            <span className="text-accent text-xl">•</span>
                            <span>AirSial - The Wings of Sialkot</span>
                        </li>
                    </ul>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="rounded-2xl overflow-hidden border border-white/10"
                >
                    <img src={ASSETS.crewImage} alt="AirSial Crew" className="w-full object-cover h-96" />
                </motion.div>
            </div>

            <div className="bg-white/5 rounded-3xl p-12 text-center">
                <TextReveal className="text-3xl md:text-4xl text-white font-serif mb-8 justify-center gap-x-3">
                    Mission & Vision
                </TextReveal>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                        <h3 className="text-accent text-xl font-bold mb-4">Safety First</h3>
                        <p className="text-gray-400 text-sm">Adhering to the highest operational safety standards to ensure your peace of mind.</p>
                    </div>
                    <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                        <h3 className="text-accent text-xl font-bold mb-4">Service</h3>
                        <p className="text-gray-400 text-sm">Bringing the legendary Sialkoti hospitality to 30,000 feet with impeccable crew service.</p>
                    </div>
                    <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                        <h3 className="text-accent text-xl font-bold mb-4"> Innovation</h3>
                        <p className="text-gray-400 text-sm">Utilizing modern technology and a young fleet to redefine air travel in Pakistan.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
