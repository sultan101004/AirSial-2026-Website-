import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import TextReveal from '../components/TextReveal';

const Contact = () => {
    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <TextReveal className="text-4xl md:text-6xl text-white font-serif mb-6 justify-center gap-x-3">
                    Contact Us
                </TextReveal>
                <p className="text-gray-400 text-lg">We are here to assist you 24/7.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-2xl text-accent font-serif mb-6">Head Office</h3>
                        <div className="flex items-start gap-4 text-gray-300">
                            <MapPin className="text-accent shrink-0" />
                            <p>
                                Corporate Office, Murray College Road,<br />
                                Sialkot, Pakistan.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-2xl text-accent font-serif mb-6">Call Center</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-300">
                                <Phone className="text-accent" />
                                <p className="text-xl font-bold">021-111-AIR-SIAL (247-742)</p>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <Mail className="text-accent" />
                                <p>info@airsial.com</p>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <Clock className="text-accent" />
                                <p>Available 24 Hours a Day</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 p-8 rounded-2xl border border-white/10 h-full">
                    <h3 className="text-2xl text-accent font-serif mb-6">Send us a Message</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none" />
                            <input type="text" placeholder="Last Name" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none" />
                        </div>
                        <input type="email" placeholder="Email Address" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none" />
                        <input type="tel" placeholder="Phone Number" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none" />
                        <textarea rows="4" placeholder="Your Message" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none"></textarea>
                        <button className="w-full bg-accent text-black font-bold py-4 rounded-lg hover:bg-white transition-colors">
                            SendMessage
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
