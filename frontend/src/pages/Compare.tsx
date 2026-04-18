import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, ArrowRight } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const datasets: Record<string, any[]> = {
    'EXP-001': [
        { subject: 'EGFR', A: 120, fullMark: 150 },
        { subject: 'Dopamine', A: 98, fullMark: 150 },
        { subject: 'Bcl-2', A: 86, fullMark: 150 },
        { subject: 'Aurora', A: 99, fullMark: 150 },
        { subject: 'PI3K', A: 85, fullMark: 150 },
        { subject: 'mTOR', A: 65, fullMark: 150 },
    ],
    'EXP-002': [
        { subject: 'EGFR', A: 110 },
        { subject: 'Dopamine', A: 130 },
        { subject: 'Bcl-2', A: 130 },
        { subject: 'Aurora', A: 100 },
        { subject: 'PI3K', A: 90 },
        { subject: 'mTOR', A: 85 },
    ],
    'EXP-003': [
        { subject: 'EGFR', A: 60 },
        { subject: 'Dopamine', A: 80 },
        { subject: 'Bcl-2', A: 140 },
        { subject: 'Aurora', A: 110 },
        { subject: 'PI3K', A: 70 },
        { subject: 'mTOR', A: 95 },
    ]
};

const Compare: React.FC = () => {
    const [expA, setExpA] = useState('EXP-001');
    const [expB, setExpB] = useState('EXP-002');

    // Merge Data Dynamically
    const chartData = datasets['EXP-001'].map((item, i) => ({
        subject: item.subject,
        A: datasets[expA]?.[i]?.A || 0,
        B: datasets[expB]?.[i]?.A || 0, // Using 'A' prop from other dataset as 'B' value
        fullMark: 150
    }));

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                        <GitCompare size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Comparative Analysis</h2>
                </div>
                <p className="text-neutral-400 ml-14">Side-by-side evaluation of experimental Mechanism of Action profiles.</p>
            </motion.div>

            {/* Selection Controls */}
            <div className="grid md:grid-cols-2 gap-8 bg-neutral-900/30 p-6 rounded-xl border border-neutral-800">
                <div>
                    <label className="block text-sm font-medium text-purple-400 mb-2">Experiment A (Baseline)</label>
                    <select
                        value={expA}
                        onChange={(e) => setExpA(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500"
                    >
                        <option value="EXP-001">EXP-001: Carboplatin_24h</option>
                        <option value="EXP-002">EXP-002: Cisplatin_24h</option>
                        <option value="EXP-003">EXP-003: Paclitaxel_48h</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-blue-400 mb-2">Experiment B (Comparison)</label>
                    <select
                        value={expB}
                        onChange={(e) => setExpB(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg p-3 outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="EXP-001">EXP-001: Carboplatin_24h</option>
                        <option value="EXP-002">EXP-002: Cisplatin_24h</option>
                        <option value="EXP-003">EXP-003: Paclitaxel_48h</option>
                    </select>
                </div>
            </div>

            {/* Visual Comparison */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Radar Chart */}
                <div className="lg:col-span-1 bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 min-h-[400px]">
                    <h3 className="text-lg font-semibold text-white mb-6 text-center">MoA Signature Overlap</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                <PolarGrid stroke="#404040" />
                                <PolarAngleAxis dataKey="subject" stroke="#a3a3a3" tick={{ fontSize: 10 }} />
                                <PolarRadiusAxis stroke="#404040" angle={30} domain={[0, 150]} />
                                <Radar name="Exp A" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} />
                                <Radar name="Exp B" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                                <Legend />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', borderColor: '#404040', color: '#fff' }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Diff Table */}
                <div className="lg:col-span-2 bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Differential Gene Expression Top Hits</h3>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-neutral-500 text-sm border-b border-neutral-800">
                                <th className="pb-3 font-medium">Gene</th>
                                <th className="pb-3 font-medium text-right">Exp A (LogFC)</th>
                                <th className="pb-3 font-medium text-right">Exp B (LogFC)</th>
                                <th className="pb-3 font-medium text-right">Delta</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-neutral-800/50 hover:bg-neutral-800/30">
                                <td className="py-3 text-white font-mono">TP53</td>
                                <td className="py-3 text-right text-purple-400">-2.4</td>
                                <td className="py-3 text-right text-blue-400">-0.5</td>
                                <td className="py-3 text-right text-green-400 font-bold">+1.9</td>
                            </tr>
                            <tr className="border-b border-neutral-800/50 hover:bg-neutral-800/30">
                                <td className="py-3 text-white font-mono">MYC</td>
                                <td className="py-3 text-right text-purple-400">+4.1</td>
                                <td className="py-3 text-right text-blue-400">+4.3</td>
                                <td className="py-3 text-right text-neutral-600">+0.2</td>
                            </tr>
                            <tr className="border-b border-neutral-800/50 hover:bg-neutral-800/30">
                                <td className="py-3 text-white font-mono">BCL2</td>
                                <td className="py-3 text-right text-purple-400">+1.2</td>
                                <td className="py-3 text-right text-blue-400">-3.0</td>
                                <td className="py-3 text-right text-red-500 font-bold">-4.2</td>
                            </tr>
                            <tr>
                                <td className="py-3 text-white font-mono">EGFR</td>
                                <td className="py-3 text-right text-purple-400">0.0</td>
                                <td className="py-3 text-right text-blue-400">+2.5</td>
                                <td className="py-3 text-right text-red-500 font-bold">+2.5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Compare;
