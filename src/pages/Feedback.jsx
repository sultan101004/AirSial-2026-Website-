import { motion } from 'framer-motion';

const Feedback = () => {
    return (
        <div className="min-h-screen bg-primary transition-colors duration-500 pt-32 px-6 pb-20">
            <div className="container mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-serif text-accent mb-8 italic">Your Voice Matters</h1>
                    <p className="text-gray-300 text-lg mb-12">
                        We are committed to excellence. Share your thoughts and help us reach new heights in Pakistani hospitality.
                    </p>

                    <div className="bg-white/5 border border-white/5 rounded-2xl p-8 text-left">
                        <p className="text-accent tracking-widest uppercase text-xs font-bold mb-4">Coming Soon</p>
                        <h3 className="text-white text-xl font-serif mb-2">Interactive Feedback System</h3>
                        <p className="text-gray-400 text-sm">
                            We are building a seamless way for you to rate your journey and share suggestions directly with our management team.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Feedback;
