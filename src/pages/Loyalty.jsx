import { motion } from 'framer-motion';
import TextReveal from '../components/TextReveal';
import { Award, Crown, Zap, UserPlus } from 'lucide-react';

const Loyalty = () => {
    const tiers = [
        {
            name: "Silver",
            color: "text-gray-300",
            bg: "bg-gray-500/10",
            border: "border-gray-500/20",
            icon: <Award className="mb-4" size={40} />,
            benefits: ["Earn 5 miles per $1", "Priority Boarding", "5kg Extra Baggage"]
        },
        {
            name: "Gold",
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/20",
            icon: <Zap className="mb-4" size={40} />,
            benefits: ["Earn 8 miles per $1", "Lounge Access", "10kg Extra Baggage", "Free Seat Selection"]
        },
        {
            name: "Platinum",
            color: "text-accent",
            bg: "bg-amber-100/10",
            border: "border-accent/20",
            icon: <Crown className="mb-4" size={40} />,
            benefits: ["Earn 12 miles per $1", "First Class Check-in", "20kg Extra Baggage", "Guaranteed Seats", "Personal Concierge"]
        }
    ];

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <div className="uppercase tracking-[0.3em] text-accent text-sm font-medium mb-4">Introducing</div>
                <TextReveal className="text-5xl md:text-8xl text-white font-serif mb-6 justify-center gap-x-3">
                    Sial Miles
                </TextReveal>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                    More than just a journey. Unlock a world of exclusive privileges and rewards with Pakistan&apos;s most premium loyalty program.
                </p>
                <div className="mt-10 flex gap-4 justify-center">
                    <button className="bg-accent text-black px-8 py-3 rounded-full font-medium uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">
                        Join Now <UserPlus size={18} />
                    </button>
                    <button className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-full font-medium uppercase tracking-widest hover:bg-white/20 transition-colors">
                        Member Login
                    </button>
                </div>
            </motion.div>

            {/* Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                {tiers.map((tier, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className={`p-8 rounded-3xl backdrop-blur-sm border ${tier.border} ${tier.bg} relative group overflow-hidden`}
                    >
                        <div className={`absolute -right-10 -top-10 opacity-10 scale-[2] pointer-events-none transition-transform duration-700 group-hover:rotate-12 ${tier.color}`}>
                            {tier.icon}
                        </div>
                        <div className={`${tier.color}`}>
                            {tier.icon}
                        </div>
                        <h3 className={`text-3xl font-serif mb-2 ${tier.color}`}>{tier.name}</h3>
                        <div className="w-12 h-0.5 bg-current opacity-50 mb-6" />
                        <ul className="space-y-4">
                            {tier.benefits.map((benefit, i) => (
                                <li key={i} className="text-gray-300 flex items-center gap-3 text-sm">
                                    <div className={`w-1.5 h-1.5 rounded-full ${tier.color.replace('text-', 'bg-')}`} />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            {/* Banner */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-accent text-black rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
            >
                <div className="relative z-10 max-w-xl">
                    <h3 className="text-3xl md:text-4xl font-serif mb-4">Start earning miles on your very first flight.</h3>
                    <p className="text-black/70 mb-8 text-lg">Sign up today and receive a welcome bonus of 1,000 Sial Miles.</p>
                    <button className="bg-black text-white px-6 py-3 rounded-full font-medium uppercase tracking-widest hover:scale-105 transition-transform">
                        Register for Free
                    </button>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute right-[-10%] top-[-10%] w-[50%] h-[150%] bg-black rotate-12" />
                </div>
                <div className="z-10 bg-white/20 p-6 rounded-2xl backdrop-blur-md">
                    <div className="text-5xl font-serif font-bold mb-1">1,000</div>
                    <div className="uppercase tracking-widest font-medium text-sm">Bonus Miles</div>
                </div>
            </motion.div>
        </div>
    );
};

export default Loyalty;
