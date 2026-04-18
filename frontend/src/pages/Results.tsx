import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowLeft, Download, Share2, Activity, Dna } from 'lucide-react';
import { motion } from 'framer-motion';
import HeatmapVisualization from '../components/HeatmapVisualization';
import ExportReportButton from '../components/ExportReportButton';
import RelatedDrugsCard from '../components/RelatedDrugsCard';

import SensitivityAnalysis from '../components/SensitivityAnalysis';

const Results: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // State for interactive features
    const [moaData, setMoaData] = useState<any[]>([]);
    const [geneData, setGeneData] = useState<any[]>([]);
    const [originalMoaConfidence, setOriginalMoaConfidence] = useState<number>(0);

    useEffect(() => {
        if (location.state && location.state.data) {
            const rawMoa = location.state.data.moa_probabilities;
            const rawGenes = location.state.data.top_driver_genes;

            // Sort and set initial data
            const formattedMoa = Object.entries(rawMoa).map(([name, prob]) => ({
                name,
                prob: (prob as number) * 100
            })).sort((a, b) => b.prob - a.prob);

            const formattedGenes = rawGenes.map((g: any) => ({
                name: g.gene,
                score: g.score
            })).sort((a: any, b: any) => b.score - a.score);

            setMoaData(formattedMoa);
            setGeneData(formattedGenes);
            setOriginalMoaConfidence(formattedMoa[0].prob);
        }
    }, [location]);

    // Mock Simulation: Changing gene scores affects confidence
    const handleSimulation = (updatedGenes: any[]) => {
        setGeneData(updatedGenes);

        // Simple mock logic: If top gene score drops, confidence drops
        // In reality, this would query the model again
        const topGeneDiff = Math.abs(updatedGenes[0].score - (location.state.data.top_driver_genes[0].score || 0));
        const penalty = topGeneDiff * 20; // 20% penalty per unit change

        const updatedMoa = [...moaData];
        updatedMoa[0].prob = Math.max(0, originalMoaConfidence - penalty);
        // Normalize others roughly
        setMoaData(updatedMoa);
    };

    if (moaData.length === 0) {
        return (
            <div className="max-w-4xl mx-auto py-10 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">No Data Available</h2>
                <Link to="/predict" className="text-green-500 hover:underline">Return to Prediction</Link>
            </div>
        );
    }
    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link to="/predict" className="p-2 rounded-full hover:bg-neutral-800 transition-colors">
                        <ArrowLeft size={20} className="text-neutral-400" />
                    </Link>
                    <h2 className="text-3xl font-bold text-white">Analysis Results</h2>
                </div>
                <div className="flex gap-3">
                    <ExportReportButton targetId="results-content" filename={`MoA_Analysis_${new Date().toISOString().split('T')[0]}`} />
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white transition-colors">
                        <Share2 size={16} /> Share
                    </button>
                </div>
            </div>

            <div id="results-content">
                {/* MoA Probabilities */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Activity className="text-green-500" size={20} />
                        <h3 className="text-lg font-semibold text-white">MoA Class Probabilities</h3>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={moaData} layout="vertical" margin={{ left: 40, right: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#404040" horizontal={false} />
                                <XAxis type="number" domain={[0, 100]} stroke="#a3a3a3" tickFormatter={(val) => `${val}%`} />
                                <YAxis dataKey="name" type="category" width={120} stroke="#a3a3a3" style={{ fontSize: '12px' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', borderColor: '#404040', color: '#fff' }}
                                    cursor={{ fill: '#262626' }}
                                />
                                <Bar dataKey="prob" radius={[0, 4, 4, 0]} barSize={20}>
                                    {moaData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#22c55e' : '#525252'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Explainability / Top Genes */}
                {/* Explainability / Top Genes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Dna className="text-blue-500" size={20} />
                        <h3 className="text-lg font-semibold text-white">Top Driver Genes (XAI)</h3>
                    </div>

                    {/* Placeholder for Tabs (Table / Heatmap) - For now showing Heatmap above table or replacing? 
                        Let's Show Heatmap here as requested feature.
                    */}
                    <div className="mb-6">
                        <HeatmapVisualization data={geneData.map(g => ({ gene: g.name, value: g.score }))} />
                    </div>

                    <div className="h-[200px] w-full overflow-y-auto pr-2 custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-neutral-500 text-sm border-b border-neutral-800">
                                    <th className="pb-3 font-medium">Gene Symbol</th>
                                    <th className="pb-3 font-medium text-right">Importance Score</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {geneData.map((gene: any, idx: number) => (
                                    <tr key={idx} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                                        <td className="py-3 text-neutral-300 font-mono">{gene.name}</td>
                                        <td className="py-3 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <span className="text-neutral-400">{gene.score.toFixed(3)}</span>
                                                <div className="w-16 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500/80 rounded-full"
                                                        style={{ width: `${Math.min(gene.score * 100, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>


                <div className="mt-6 grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <SensitivityAnalysis topGenes={geneData} onSimulate={handleSimulation} />
                    </div>

                    <div className="md:col-span-1">
                        <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 h-full">
                            <h4 className="text-sm font-semibold text-neutral-400 mb-2">Model Confidence Analysis</h4>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                The model predicts <strong>{moaData[0]?.name}</strong> as the most likely mechanism of action with {moaData[0]?.prob.toFixed(1)}% confidence.
                                The top genes driving this prediction include {geneData.slice(0, 3).map((g: any) => g.name).join(', ')}.
                            </p>
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <RelatedDrugsCard moaClass={moaData[0]?.name} />
                    </div>
                </div>
            </div> {/* Close results-content */}
        </div>
    );
};

export default Results;
