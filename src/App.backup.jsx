import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { ASSETS } from './constants';

const HeroSection = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Scroll 0px -> 500px maps to:
    // Opacity 1 -> 0
    // Scale 1 -> 3
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);
    const scale = useTransform(scrollY, [0, 500], [1, 3]);
    const textOpacity = useTransform(scrollY, [0, 200], [1, 0]);

    return (
        <div ref={containerRef} className="h-[200vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Layer 1: Interior (Bottom) - Fixed Full Screen */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={ASSETS.heroInterior}
                        alt="Cabin Interior"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" /> {/* Dim interior slightly for contrast if needed */}
                </div>

                {/* Layer 2: Exterior (Top) - Transforms */}
                <motion.div
                    style={{ opacity, scale }}
                    className="absolute inset-0 z-10 origin-center"
                >
                    <img
                        src={ASSETS.heroExterior}
                        alt="Plane Exterior"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </motion.div>

                {/* Hero Text */}
                <motion.div
                    style={{ opacity: textOpacity }}
                    className="absolute bottom-20 left-10 z-20"
                >
                    <h1 className="text-6xl md:text-8xl text-white font-serif drop-shadow-2xl">
                        The Pride <br /> of Pakistan
                    </h1>
                    <p className="mt-4 text-accent text-xl tracking-widest uppercase font-medium">
                        AirSial 2026
                    </p>
                </motion.div>

                {/* Navigation / Logo (Optional but defines the shell) */}
                <nav className="absolute top-0 left-0 w-full p-8 z-50 flex justify-between items-center">
                    <img src={ASSETS.brandLogo} alt="AirSial" className="h-12 md:h-16 drop-shadow-lg" />
                    <button className="px-6 py-2 border border-white/20 backdrop-blur-md bg-white/5 rounded-full text-sm hover:bg-white/10 transition-colors uppercase tracking-wider">
                        Book Flight
                    </button>
                </nav>
            </div>
        </div>
    );
};

const ExperienceSection = () => {
    const experiences = [
        { id: 1, image: ASSETS.crewImage, title: "Exemplary Crew", subtitle: "Service with a Smile" },
        { id: 2, image: ASSETS.foodImage, title: "Gourmet Dining", subtitle: "Taste the Skies" },
        { id: 3, image: ASSETS.seatImage, title: "Comfort Redefined", subtitle: "Relax & Unwind" },
        // Duplicate for horizontal scroll feel if needed, but 3 is requested
    ];

    return (
        <section className="py-24 px-4 md:px-12 bg-background relative z-30 -mt-[100vh]">
            {/* -mt-[100vh] to pull start of content over the 'spacer' created by 200vh hero if desired, 
           but simpler to just let it flow after the 200vh scroll container. 
           Actually, the Hero is 200vh tall, with sticky content. So scrolling 200vh height means 
           we pass the animation range.
      */}
            <div className="mb-12">
                <h2 className="text-4xl md:text-5xl text-accent mb-4">World Class Experience</h2>
                <p className="text-gray-400 max-w-xl">Curated for your absolute comfort and delight.</p>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-8">
                {experiences.map((item) => (
                    <div key={item.id} className="snap-center shrink-0 w-80 md:w-96 aspect-[4/5] relative group overflow-hidden rounded-2xl cursor-pointer">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
                        <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-2xl text-white font-serif italic mb-1">{item.title}</h3>
                            <p className="text-accent text-sm tracking-widest uppercase">{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const DestinationsSection = () => {
    const destinations = [
        { id: 'dxb', img: ASSETS.destDubai, code: 'DXB - Dubai' },
        { id: 'lhr', img: ASSETS.destLondon, code: 'LHR - London' },
        { id: 'jed', img: ASSETS.destJeddah, code: 'JED - Jeddah' },
        { id: 'ist', img: ASSETS.destIstanbul, code: 'IST - Istanbul' },
    ];

    return (
        <section className="py-24 px-4 md:px-12 bg-background">
            <div className="mb-12 flex items-end justify-between">
                <div>
                    <h2 className="text-4xl md:text-5xl text-accent mb-4">Global Destinations</h2>
                    <p className="text-gray-400">Connecting you to the world's major hubs.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destinations.map(dest => (
                    <div key={dest.id} className="aspect-video relative group overflow-hidden rounded-xl border border-white/5">
                        <img
                            src={dest.img}
                            alt={dest.code}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute bottom-0 left-0 p-6 backdrop-blur-sm w-full bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-3xl font-serif text-white">{dest.code}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

const Footer = () => {
    return (
        <footer className="py-32 bg-background flex flex-col items-center justify-center text-center relative overflow-hidden">

            {/* Glow effect behind globe */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 opacity-80 mb-8">
                <img
                    src={ASSETS.globeVideo}
                    alt="Global Connectivity"
                    className="w-64 h-64 md:w-80 md:h-80 object-contain blend-mode-screen"
                />
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
                Connecting Pakistan <br /> to the World.
            </h2>

            <div className="flex gap-4 mt-8">
                <button className="px-8 py-3 bg-accent text-background font-bold rounded-full hover:bg-white transition-colors">
                    Book Now
                </button>
            </div>

            <div className="mt-24 text-gray-600 text-sm">
                &copy; 2026 AirSial. All rights reserved.
            </div>
        </footer>
    )
}

function App() {
    return (
        <div className="bg-background min-h-screen text-white font-sans selection:bg-accent selection:text-black">
            <HeroSection />
            <ExperienceSection />
            <DestinationsSection />
            <Footer />
        </div>
    );
}

export default App;
