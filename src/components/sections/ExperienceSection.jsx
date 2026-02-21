import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../../constants';
import TextReveal from '../TextReveal';

const ExperienceSection = () => {
    const experiences = [
        { id: 1, image: ASSETS.foodImage, title: "Inflight Meal & Beverages", subtitle: "Taste the Skies" },
        { id: 2, image: ASSETS.cargoImage, title: "Cargo", subtitle: "Reliable & Fast" },
        { id: 3, image: ASSETS.baggageImage, title: "Baggage", subtitle: "Generous Allowance" },
        { id: 4, image: ASSETS.crewImage, title: "Qualified Crew", subtitle: "Service with a Smile" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="py-20 md:py-32 px-6 md:px-20 bg-transparent relative z-30">
            <div className="mb-12 md:mb-20">
                <TextReveal className="text-4xl md:text-6xl text-accent mb-6 gap-x-3">
                    World Class Experience
                </TextReveal>
                <p className="text-gray-100 max-w-xl text-lg">Let&apos;s touch the SKY together. Experience the warmth of Pakistani hospitality.</p>

                {/* Mobile Swipe Hint */}
                <div className="md:hidden flex items-center gap-2 mt-4 text-accent/80 text-sm animate-pulse">
                    <ArrowRight size={16} />
                    <span>Swipe to explore</span>
                </div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 md:gap-8 pb-8 px-6 md:px-0"
            >
                {experiences.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={cardVariants}
                        whileHover={{ y: -10 }}
                        // Changed width to 85vw on mobile to allow "peeking" of the next card
                        className="snap-center shrink-0 w-[85vw] md:w-[400px] aspect-[4/5] relative group overflow-hidden rounded-2xl cursor-pointer shadow-lg shadow-black/50"
                    >
                        <motion.img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.7 }}
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-2xl md:text-3xl text-white font-serif italic mb-2">{item.title}</h3>
                            <p className="text-accent text-xs md:text-sm tracking-widest uppercase">{item.subtitle}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default ExperienceSection;
