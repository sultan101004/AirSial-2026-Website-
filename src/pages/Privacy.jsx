import { motion } from 'framer-motion';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-primary transition-colors duration-500 pt-32 px-6 pb-20">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-gray-300"
                >
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-12">Privacy Commitment</h1>
                    <div className="space-y-6 text-lg leading-relaxed">
                        <section>
                            <h2 className="text-accent font-serif text-2xl mb-4 italic">Your Trust, Our Priority</h2>
                            <p>
                                At AirSial, we recognize the importance of your personal information. This policy outlines our commitment to protecting your data while providing you with a world-class travel experience.
                            </p>
                        </section>
                        <section className="bg-white/5 p-8 rounded-2xl border border-white/5">
                            <p className="text-sm text-gray-500 italic">
                                Note: This is a high-fidelity prototype version of the AirSial 2026 website. The legal text provided here is for layout demonstration purposes only and will be replaced with official documentation in the production release.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
