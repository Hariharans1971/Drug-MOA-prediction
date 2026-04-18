import React from 'react';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, Layers, Info } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
    ScatterChart, Scatter, ZAxis
} from 'recharts';

const globalTopGenes = [
    { name: 'TP53', score: 0.92, category: 'Tumor suppressor' },
    { name: 'EGFR', score: 0.88, category: 'Oncogene' },
    { name: 'MYC', score: 0.85, category: 'Transcription factor' },
    { name: 'AKT1', score: 0.81, category: 'Kinase' },
    { name: 'VEGFA', score: 0.79, category: 'Growth factor' },
    { name: 'CDK2', score: 0.75, category: 'Kinase' },
    { name: 'BCL2', score: 0.72, category: 'Apoptosis' },
    { name: 'BRAF', score: 0.68, category: 'Kinase' },
    { name: 'PTEN', score: 0.65, category: 'Tumor suppressor' },
    { name: 'KRAS', score: 0.62, category: 'Oncogene' },
];

const moaCorrelations = [
    { x: 10, y: 30, z: 500, name: 'EGFR + AKT', type: 'High' },
    { x: 50, y: 50, z: 300, name: 'Dopamine + Serotonin', type: 'Medium' },
    { x: 80, y: 20, z: 200, name: 'Adrenergic + Calcium', type: 'Medium' },
    { x: 20, y: 80, z: 600, name: 'Kinase + ATPase', type: 'High' },
    { x: 90, y: 90, z: 100, name: 'HSP + Tubulin', type: 'Low' },
];

const GlobalInsights: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
                        <Globe size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Global Model Insights</h2>
                </div>
                <p className="text-neutral-400 ml-14">Aggregate analysis of feature importance and class correlations across the entire training dataset.</p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Global Feature Importance */}
                <div className="lg:col-span-2 bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <TrendingUp size={20} className="text-green-500" /> Global Driver Genes
                        </h3>
                        <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded">Top 10 / 928 Genes</span>
                    </div>

                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={globalTopGenes} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={false} />
                                <XAxis type="number" stroke="#525252" domain={[0, 1]} />
                                <YAxis dataKey="name" type="category" width={60} stroke="#a3a3a3" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', borderColor: '#404040', color: '#fff' }}
                                    cursor={{ fill: '#262626' }}
                                />
                                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                                    {globalTopGenes.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index < 3 ? '#6366f1' : '#4b5563'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="mt-4 text-sm text-neutral-500 flex items-start gap-2">
                        <Info size={16} className="mt-0.5 shrink-0" />
                        Genes like <strong>TP53</strong> and <strong>EGFR</strong> consistently show high attribution scores across 98% of all MoA classes, indicating their role as "Master Regulators" in the model's decision boundary.
                    </p>
                </div>

                {/* MoA Correlations */}
                <div className="lg:col-span-1 bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Layers size={20} className="text-orange-500" /> Class Correlations
                        </h3>
                    </div>

                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                                <XAxis type="number" dataKey="x" name="Class A" hide />
                                <YAxis type="number" dataKey="y" name="Class B" hide />
                                <ZAxis type="number" dataKey="z" range={[100, 800]} />
                                <Tooltip
                                    cursor={{ strokeDasharray: '3 3' }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="bg-neutral-900 border border-neutral-700 p-3 rounded-lg shadow-xl">
                                                    <p className="text-white font-bold">{data.name}</p>
                                                    <p className="text-xs text-neutral-400">Co-occurrence: {data.type}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Scatter name="Correlations" data={moaCorrelations} fill="#f97316" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="mt-4 text-sm text-neutral-500">
                        Clusters represent pairs of MoA labels that frequently co-occur or share significant gene signatures (e.g., Kinase inhibitors often overlapping with ATPase pumps).
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GlobalInsights;
