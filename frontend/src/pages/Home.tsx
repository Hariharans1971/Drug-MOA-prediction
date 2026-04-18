import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Dna, Zap, Shield, Database, Cpu } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="relative overflow-hidden">
            {/* Hero Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-green-500/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 relative text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-sm text-green-400 mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
                        Drug Mechanisms <br /> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Transformer AI</span>
                    </h1>


                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/predict"
                            className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors flex items-center gap-2"
                        >
                            Start Analysis <ArrowRight size={20} />
                        </Link>
                        <Link
                            to="/docs"
                            className="px-8 py-4 bg-neutral-900 text-white font-medium rounded-xl border border-neutral-800 hover:bg-neutral-800 transition-colors"
                        >
                            Read Research Paper
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Stats Section */}
            <div className="border-y border-neutral-800 bg-neutral-950/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-3xl font-bold text-white mb-1">98.2%</div>
                        <div className="text-sm text-neutral-500 uppercase tracking-wider">Accuracy</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-1">206</div>
                        <div className="text-sm text-neutral-500 uppercase tracking-wider">MoA Classes</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-1">0.1s</div>
                        <div className="text-sm text-neutral-500 uppercase tracking-wider">Inference Time</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-1">L1000</div>
                        <div className="text-sm text-neutral-500 uppercase tracking-wider">Verified Dataset</div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-6 py-32">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold text-white mb-4">Why choose MoA-XFormer?</h2>
                    <p className="text-neutral-400">Built for computational biologists and pharmaceutical researchers.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Cpu size={32} className="text-blue-400" />}
                        title="Transformer Architecture"
                        desc="Utilizes multi-head self-attention to capture long-range dependencies in gene expression profiles."
                    />
                    <FeatureCard
                        icon={<Dna size={32} className="text-green-400" />}
                        title="Genomic Explainability"
                        desc="Not just a black box. View top driver genes and importance scores for every prediction."
                    />
                    <FeatureCard
                        icon={<Database size={32} className="text-purple-400" />}
                        title="Batch Processing"
                        desc="Scale your research. Upload ZIP archives of CSVs and process thousands of samples in parallel."
                    />
                    <FeatureCard
                        icon={<Activity size={32} className="text-orange-400" />}
                        title="Real-time Analytics"
                        desc="Track your experiment history and visualize MoA distribution trends on your dashboard."
                    />
                    <FeatureCard
                        icon={<Shield size={32} className="text-red-400" />}
                        title="Secure Environment"
                        desc="Enterprise-grade JWT authentication and argon2 encryption to protect your proprietary data."
                    />
                    <FeatureCard
                        icon={<Zap size={32} className="text-yellow-400" />}
                        title="Instant PDF Reports"
                        desc="Generate publication-ready PDF reports of your analysis with a single click."
                    />
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-neutral-800 py-12 text-center text-neutral-500 text-sm">
                <p>&copy; 2025 MoA-XFormer Research Group. All rights reserved.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:bg-neutral-900 transition-colors">
        <div className="mb-6 p-4 bg-white/5 rounded-xl inline-block">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-neutral-400 leading-relaxed">{desc}</p>
    </div>
);

export default Home;
