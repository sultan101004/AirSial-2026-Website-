import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { ASSETS } from '../../constants';
import TextReveal from '../TextReveal';

const DestinationsSection = () => {
    // Reordered so Islamabad is index 2 (Center if 5 items, or just default to it)
    const destinations = [
        { id: 'khi', img: ASSETS.destKarachi, code: 'KHI', city: 'Karachi', price: 'PKR 18,500', desc: 'The bustling metropolis and economic hub of Pakistan, offering a vibrant mix of culture and commerce.' },
        { id: 'lhe', img: ASSETS.destLahore, code: 'LHE', city: 'Lahore', price: 'PKR 22,000', desc: 'The cultural heart of Pakistan, known for its rich history, stunning Mughal architecture, and delicious food.' },
        { id: 'isb', img: ASSETS.destIslamabad, code: 'ISB', city: 'Islamabad', price: 'PKR 24,000', desc: 'The serene capital city, nestled against the Margalla Hills, famous for its lush greenery and peaceful environment.' },
        { id: 'skt', img: ASSETS.destSialkot, code: 'SKT', city: 'Sialkot', price: 'PKR 20,000', desc: 'A major industrial city, renowned globally for its sports goods and surgical instruments manufacturing.' },
        { id: 'jed', img: ASSETS.destJeddah, code: 'JED', city: 'Jeddah', price: 'PKR 85,000', desc: 'A vibrant Saudi Arabian port city on the Red Sea, serving as a gateway for pilgrims to Mecca and Medina.' },
        { id: 'mct', img: ASSETS.destMuscat, code: 'MCT', city: 'Muscat', price: 'PKR 45,000', desc: 'Oman\'s port capital, known for its stunning architecture, traditional souqs, and beautiful coastline.' },
    ];

    const [activeIndex, setActiveIndex] = useState(2); // Start at Islamabad (Index 2)

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1 < destinations.length ? prev + 1 : 0));
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : destinations.length - 1));
    };

    return (
        <section className="py-12 md:py-24 bg-transparent overflow-hidden relative">
            <div className="mb-12 md:mb-24 px-6 md:px-20 flex items-end justify-between relative z-10">
                <div>
                    <TextReveal className="text-4xl md:text-6xl text-accent mb-6 gap-x-3">
                        Global Destinations
                    </TextReveal>
                    <p className="text-gray-100 text-lg">Connecting Pakistan to the Middle East and beyond.</p>
                </div>

                {/* Desktop Controls */}
                <div className="hidden md:flex gap-4">
                    <button onClick={handlePrev} className="p-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors z-20 pointer-events-auto">
                        <ArrowLeft size={24} />
                    </button>
                    <button onClick={handleNext} className="p-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors z-20 pointer-events-auto">
                        <ArrowRight size={24} />
                    </button>
                </div>
            </div>

            {/* 3D Coverflow Container */}
            <div className="relative h-[400px] md:h-[500px] flex justify-center items-center perspective-1000">
                <AnimatePresence initial={false} mode='popLayout'>
                    {destinations.map((dest, index) => {
                        const offset = index - activeIndex;
                        const isActive = index === activeIndex;

                        return (
                            <motion.div
                                key={dest.id}
                                layout
                                initial={false}
                                animate={{
                                    x: offset * (window.innerWidth < 768 ? 60 : 280), // Increased spacing for landscape cards
                                    scale: isActive ? 1 : 0.85,
                                    opacity: isActive ? 1 : 0.4,
                                    zIndex: 50 - Math.abs(offset),
                                    rotateY: isActive ? 0 : offset * 5, // Subtle rotation
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = Math.abs(offset.x) * velocity.x;
                                    if (swipe < -100 || offset.x < -100) {
                                        handleNext();
                                    } else if (swipe > 100 || offset.x > 100) {
                                        handlePrev();
                                    }
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                                onClick={() => setActiveIndex(index)}
                                className={`absolute w-[85vw] md:w-[600px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border ${isActive ? 'border-accent/50 box-shadow-accent cursor-grab active:cursor-grabbing' : 'border-white/5 cursor-pointer'}`}
                                style={{
                                    boxShadow: isActive ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : 'none'
                                }}
                            >
                                <img src={dest.img} alt={dest.code} className="w-full h-full object-cover pointer-events-none" loading="lazy" decoding="async" />
                                <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-60'}`} />

                                {/* Content Overlay - Only visible on active card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black via-black/80 to-transparent"
                                >
                                    <h3 className="text-2xl md:text-4xl font-serif text-white mb-2">{dest.city}</h3>
                                    <div className="flex gap-4 items-center">
                                        <p className="text-white flex items-center gap-2 text-sm md:text-lg"><Tag size={16} className="text-accent" /> {dest.price}</p>
                                    </div>
                                    <p className="text-white text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed">{dest.desc}</p>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden justify-center gap-6 pb-6 pt-0 relative z-20">
                <button onClick={handlePrev} className="p-4 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-sm active:bg-white/20">
                    <ArrowLeft size={20} />
                </button>
                <div className="w-px h-12 bg-white/10"></div>
                <button onClick={handleNext} className="p-4 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-sm active:bg-white/20">
                    <ArrowRight size={20} />
                </button>
            </div>
        </section>
    );
};

export default DestinationsSection;
